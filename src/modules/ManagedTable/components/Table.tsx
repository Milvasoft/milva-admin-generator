/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useEffect, } from 'react';
import {
  DataGrid, 
  GridColumns, 
  GridLocaleText, 
  DataGridProps 
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '@utils/store';
import { useDispatch } from 'react-redux';
import { Result as ApiResult } from '@utils/network/networkParams';
import CancelablePromise from '@utils/CancelablePromise';
import { Typography } from '@mui/material';
import getQueryParams from '@helpers/getQueryParams';
import { useRouter } from 'next/router';
import { IDataInfo } from '@src/modules/App/types/IDataInfo';
import { IPaginationDTO } from '@src/modules/App/types/IPaginationDTO';
import { resetTable, updateTableData, updateTableLoadingWithInfo } from '../redux/slice';
import ToolBar from './ToolBar';
import { IManagedTableToolBar } from '../types/IManagedTableToolBar';

const AntDesignStyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-cell': {
    color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-cell': {
      color:
          theme.palette.mode === 'light'
            ? 'rgba(0,0,0,.85)'
            : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${
        theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
      }`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0,
    },
  },
}));
  
type props ={
    columns : GridColumns<any>, 
    fetchPaginationData?: (data:IDataInfo<any>) => CancelablePromise<ApiResult<IPaginationDTO<any>>>,
    fetchData?: () => CancelablePromise<ApiResult<any[]>>,
    toolBar?: IManagedTableToolBar,
    dataGridProps?: Omit<DataGridProps, 'columns' | 'rows'>
}
  
const defaultDataInfo = {
  pageIndex: 1,
  requestedItemCount: 10,
};

export default function Table({
  columns, 
  toolBar,
  fetchData, 
  dataGridProps,
  fetchPaginationData
}:props) {

  const [pageSize, setPageSize] = React.useState<number>(10);

  const [page, setPage] = React.useState<number>(0);

  const data = useAppSelector((s) => s?.managedTable?.data);

  const dataInfo = useAppSelector((s) => s?.managedTable?.dataInfo);
  
  const loading = useAppSelector((s) => s?.managedTable?.loading);
  
  const router = useRouter();

  const dispatch = useDispatch();

  const { t } = useTranslation();
      
  const GRID_DEFAULT_LOCALE_TEXT: GridLocaleText = {

    // Root
    noRowsLabel: t('baseTable.noRowsLabel') || 'No rows',
    noResultsOverlayLabel: t('baseTable.noResultsOverlayLabel') || 'No results found.',
    errorOverlayDefaultLabel: t('baseTable.errorOverlayDefaultLabel') || 'An error occurred.',
      
    // Density selector toolbar button text
    toolbarDensity: t('baseTable.toolbarDensity') || 'Density',
    toolbarDensityLabel: t('baseTable.toolbarDensityLabel') || 'Density',
    toolbarDensityCompact: t('baseTable.toolbarDensityCompact') || 'Compact',
    toolbarDensityStandard: t('baseTable.toolbarDensityStandard') || 'Standard',
    toolbarDensityComfortable: t('baseTable.toolbarDensityComfortable') || 'Comfortable',
      
    // Columns selector toolbar button text
    toolbarColumns: t('baseTable.toolbarColumns') || 'Columns',
    toolbarColumnsLabel: t('baseTable.toolbarColumnsLabel') || 'Select columns',
      
    // Filters toolbar button text
    toolbarFilters: t('baseTable.toolbarFilters') || 'Filters',
    toolbarFiltersLabel: t('baseTable.toolbarFiltersLabel') || 'Show filters',
    toolbarFiltersTooltipHide: t('baseTable.toolbarFiltersTooltipHide') || 'Hide filters',
    toolbarFiltersTooltipShow: t('baseTable.toolbarFiltersTooltipShow') || 'Show filters',
    toolbarFiltersTooltipActive: (count) => (count !== 1 ? (t('baseTable.toolbarFiltersTooltipActive', { count }) || `${count} active filters`) 
      : (t('baseTable.toolbarFiltersTooltipActiveMany', { count }) || `${count} active filter`)),
      
    // Export selector toolbar button text
    toolbarExport: t('baseTable.toolbarExport') || 'Export',
    toolbarExportLabel: t('baseTable.toolbarExportLabel') || 'Export',
    toolbarExportCSV: t('baseTable.toolbarExportCSV') || 'Download as CSV',
    toolbarExportPrint: t('baseTable.toolbarExportPrint') || 'Print',
      
    // Columns panel text
    columnsPanelTextFieldLabel: t('baseTable.columnsPanelTextFieldLabel') || 'Find column',
    columnsPanelTextFieldPlaceholder: t('baseTable.columnsPanelTextFieldPlaceholder') || 'Column title',
    columnsPanelDragIconLabel: t('baseTable.columnsPanelDragIconLabel') || 'Reorder column',
    columnsPanelShowAllButton: t('baseTable.columnsPanelShowAllButton') || 'Show all',
    columnsPanelHideAllButton: t('baseTable.columnsPanelHideAllButton') || 'Hide all',
      
    // Filter panel text
    filterPanelAddFilter: t('baseTable.filterPanelAddFilter') || 'Add filter',
    filterPanelDeleteIconLabel: t('baseTable.filterPanelDeleteIconLabel') || 'Delete',
    filterPanelLinkOperator: t('baseTable.filterPanelLinkOperator') || 'Logic operator',
    filterPanelOperators: t('baseTable.filterPanelOperators') || 'Operator',
    filterPanelOperatorAnd: t('baseTable.filterPanelOperatorAnd') || 'And',
    filterPanelOperatorOr: t('baseTable.filterPanelOperatorOr') || 'Or',
    filterPanelColumns: t('baseTable.filterPanelColumns') || 'Columns',
    filterPanelInputLabel: t('baseTable.filterPanelInputLabel') || 'Value',
    filterPanelInputPlaceholder: t('baseTable.filterPanelInputPlaceholder') || 'Filter value',
      
    // Filter operators text
    filterOperatorContains: t('baseTable.filterOperatorContains') || 'contains',
    filterOperatorEquals: t('baseTable.filterOperatorEquals') || 'equals',
    filterOperatorStartsWith: t('baseTable.filterOperatorStartsWith') || 'starts with',
    filterOperatorEndsWith: t('baseTable.filterOperatorEndsWith') || 'ends with',
    filterOperatorIs: t('baseTable.filterOperatorIs') || 'is',
    filterOperatorNot: t('baseTable.filterOperatorNot') || 'is not',
    filterOperatorAfter: t('baseTable.filterOperatorAfter') || 'is after',
    filterOperatorOnOrAfter: t('baseTable.filterOperatorOnOrAfter') || 'is on or after',
    filterOperatorBefore: t('baseTable.filterOperatorBefore') || 'is before',
    filterOperatorOnOrBefore: t('baseTable.filterOperatorOnOrBefore') || 'is on or before',
    filterOperatorIsEmpty: t('baseTable.filterOperatorIsEmpty') || 'is empty',
    filterOperatorIsNotEmpty: t('baseTable.filterOperatorIsNotEmpty') || 'is not empty',
    filterOperatorIsAnyOf: t('baseTable.filterOperatorIsAnyOf') || 'is any of',
      
    // Filter values text
    filterValueAny: t('baseTable.filterValueAny') || 'any',
    filterValueTrue: t('baseTable.filterValueTrue') || 'true',
    filterValueFalse: t('baseTable.filterValueFalse') || 'false',
      
    // Column menu text
    columnMenuLabel: t('baseTable.columnMenuLabel') || 'Menu',
    columnMenuShowColumns: t('baseTable.columnMenuShowColumns') || 'Show columns',
    columnMenuFilter: t('baseTable.columnMenuFilter') || 'Filter',
    columnMenuHideColumn: t('baseTable.columnMenuHideColumn') || 'Hide',
    columnMenuUnsort: t('baseTable.columnMenuUnsort') || 'Unsort',
    columnMenuSortAsc: t('baseTable.columnMenuSortAsc') || 'Sort by ASC',
    columnMenuSortDesc: t('baseTable.columnMenuSortDesc') || 'Sort by DESC',
      
    // Column header text
    columnHeaderFiltersTooltipActive: (count) => (count !== 1 ? (t('baseTable.columnHeaderFiltersTooltipActive', { count }) || `${count} active filters`) 
      : (t('baseTable.columnHeaderFiltersTooltipActiveMany', { count }) || `${count} active filter`)),
    columnHeaderFiltersLabel: t('baseTable.columnHeaderFiltersLabel') || 'Show filters',
    columnHeaderSortIconLabel: t('baseTable.columnHeaderSortIconLabel') || 'Sort',
      
    // Rows selected footer text
    footerRowSelected: (count) => (count !== 1
      ? (t('baseTable.footerRowSelecteds', { count }) || `${count.toLocaleString()} rows selected`)
      : (t('baseTable.footerRowSelected', { count }) || `${count.toLocaleString()} row selected`)),
      
    // Total row amount footer text
    footerTotalRows: t('baseTable.footerTotalRows') || 'Total Rows:',
      
    // Total visible row amount footer text
    footerTotalVisibleRows: (visibleCount, totalCount) => t('baseTable.footerTotalVisibleRows', { visibleCount, totalCount }) 
        || `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,
      
    // Checkbox selection text
    checkboxSelectionHeaderName: t('baseTable.checkboxSelectionHeaderName') || 'Checkbox selection',
    checkboxSelectionSelectAllRows: t('baseTable.checkboxSelectionSelectAllRows') || 'Select all rows',
    checkboxSelectionUnselectAllRows: t('baseTable.checkboxSelectionUnselectAllRows') || 'Unselect all rows',
    checkboxSelectionSelectRow: t('baseTable.checkboxSelectionSelectRow') || 'Select row',
    checkboxSelectionUnselectRow: t('baseTable.checkboxSelectionUnselectRow') || 'Unselect row',
      
    // Boolean cell text
    booleanCellTrueLabel: t('baseTable.booleanCellTrueLabel') || 'yes',
    booleanCellFalseLabel: t('baseTable.booleanCellFalseLabel') || 'no',
      
    // Actions cell more text
    actionsCellMore: t('baseTable.actionsCellMore') || 'more',
      
    // Column pinning text
    pinToLeft: t('baseTable.pinToLeft') || 'Pin to left',
    pinToRight: t('baseTable.pinToRight') || 'Pin to right',
    unpin: t('baseTable.unpin') || 'Unpin',
      
    // Tree Data
    treeDataGroupingHeaderName: t('baseTable.treeDataGroupingHeaderName') || 'Group',
    treeDataExpand: t('baseTable.treeDataExpand') || 'see children',
    treeDataCollapse: t('baseTable.treeDataCollapse') || 'hide children',
      
    // Grouping columns
    groupingColumnHeaderName: t('baseTable.groupingColumnHeaderName') || 'Group',
    groupColumn: (name) => t('baseTable.groupColumn', { name }) || `Group by ${name}`,
    unGroupColumn: (name) => t('baseTable.unGroupColumn', { name }) || `Stop grouping by ${name}`,
      
    // Master/detail
    expandDetailPanel: t('baseTable.expandDetailPanel') || 'Expand',
    collapseDetailPanel: t('baseTable.collapseDetailPanel') || 'Collapse',
      
    // Used core components translation keys
    MuiTablePagination: {
      labelRowsPerPage: t('baseTable.labelRowsPerPage') || 'Rows per page:'
    },
  };
  
  const getData = useCallback((dataInfo:IDataInfo<any>) => {

    dispatch(updateTableLoadingWithInfo({ loading: true, dataInfo }));

    if (dataGridProps?.pagination) {

      fetchData?.()
        .then((res) => {

          dispatch(updateTableData({ dtoList: res?.result }));
  
        })
        .catch(() => {

          dispatch(updateTableData([]));
  
        });
    
    } else {

      fetchPaginationData?.(dataInfo)
        .then((res) => {
        
          setPageSize(Number(dataInfo?.requestedItemCount) || 10);

          setPage(Number(dataInfo?.pageIndex || 1) - 1);

          dispatch(updateTableData(res?.result));
    
        })
        .catch(() => {
          
          setPageSize(Number(dataInfo?.requestedItemCount) || 10);

          setPage(Number(dataInfo?.pageIndex) - 1);

          dispatch(updateTableData({ ...data, dtoList: [] }));
    
        });

    }
 
  
  }, [dispatch, dataGridProps?.pagination, fetchData, fetchPaginationData, data]);

  const onPageChange = useCallback((page: number) => {
  
    getData({ pageIndex: page + 1, requestedItemCount: dataInfo?.requestedItemCount });
  
  }, [dataInfo?.requestedItemCount, getData]);
  
  const onPageSizeChange = useCallback((pageSize: number,) => {
  
    if (dataGridProps && dataGridProps?.paginationMode === 'client') {

      setPageSize(pageSize);
    
    } else {

      getData({ pageIndex: dataInfo?.pageIndex, requestedItemCount: pageSize });
    
    }
  
  }, [dataGridProps, dataInfo?.pageIndex, getData]);

  const getInitialData = useCallback(() => {

    try {

      const filter = getQueryParams();

      if (Object.entries(filter).length !== 0) {

        if (filter?.spec)filter.spec = JSON.parse(filter.spec);

        getData(filter);
      
      } else {
  
        router.replace(router.route, { query: defaultDataInfo, });
        
        getData(defaultDataInfo);
      
      }
    
    } catch (e) {
    
      router.replace(router.route, { query: defaultDataInfo, });
      
      getData(defaultDataInfo);
        
    }  
  
  }, [getData, router]);
          
  useEffect(() => {

    getInitialData();

    return () => {

      dispatch(resetTable());
    
    };
        
  }, []);

  return (
    <>
    
      {toolBar?.title && (
        <Typography variant="h5">
          {toolBar?.title}
        </Typography>
      ) }

      <AntDesignStyledDataGrid 
        components={{ Toolbar: () => (<ToolBar {...toolBar} />), }}
        columns={columns}
        rows={data?.dtoList || []}
        rowCount={data?.dtoList?.length || 0} 
        page={page}
        loading={loading}      
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        paginationMode="server"
        localeText={GRID_DEFAULT_LOCALE_TEXT}   
        disableColumnFilter
        disableColumnMenu
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50]}
        sx={{ border: 'none', pb: 2 }}
        {...dataGridProps}
      />

    </>
  
  );
  
}
  
