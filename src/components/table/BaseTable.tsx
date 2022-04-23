/* eslint-disable react/no-unstable-nested-components */
import { DataGrid, GridLocaleText, DataGridProps, } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { i18n } from 'next-i18next';
import { IBaseTableToolBar } from '@assets/types/IBaseTableToolBar';
import CustomToolbar from './BaseToolbar';

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

interface IBaseTable extends DataGridProps {
  toolBar?: IBaseTableToolBar,
}

export default function BaseTable({ toolBar, ...props } : IBaseTable) {
    
  const GRID_DEFAULT_LOCALE_TEXT: GridLocaleText = {

    // Root
    noRowsLabel: i18n?.t('baseTable.noRowsLabel') || 'No rows',
    noResultsOverlayLabel: i18n?.t('baseTable.noResultsOverlayLabel') || 'No results found.',
    errorOverlayDefaultLabel: i18n?.t('baseTable.errorOverlayDefaultLabel') || 'An error occurred.',
  
    // Density selector toolbar button text
    toolbarDensity: i18n?.t('baseTable.toolbarDensity') || 'Density',
    toolbarDensityLabel: i18n?.t('baseTable.toolbarDensityLabel') || 'Density',
    toolbarDensityCompact: i18n?.t('baseTable.toolbarDensityCompact') || 'Compact',
    toolbarDensityStandard: i18n?.t('baseTable.toolbarDensityStandard') || 'Standard',
    toolbarDensityComfortable: i18n?.t('baseTable.toolbarDensityComfortable') || 'Comfortable',
  
    // Columns selector toolbar button text
    toolbarColumns: i18n?.t('baseTable.toolbarColumns') || 'Columns',
    toolbarColumnsLabel: i18n?.t('baseTable.toolbarColumnsLabel') || 'Select columns',
  
    // Filters toolbar button text
    toolbarFilters: i18n?.t('baseTable.toolbarFilters') || 'Filters',
    toolbarFiltersLabel: i18n?.t('baseTable.toolbarFiltersLabel') || 'Show filters',
    toolbarFiltersTooltipHide: i18n?.t('baseTable.toolbarFiltersTooltipHide') || 'Hide filters',
    toolbarFiltersTooltipShow: i18n?.t('baseTable.toolbarFiltersTooltipShow') || 'Show filters',
    toolbarFiltersTooltipActive: (count) => (count !== 1 ? (i18n?.t('baseTable.toolbarFiltersTooltipActive', { count }) || `${count} active filters`) 
      : (i18n?.t('baseTable.toolbarFiltersTooltipActiveMany', { count }) || `${count} active filter`)),
  
    // Export selector toolbar button text
    toolbarExport: i18n?.t('baseTable.toolbarExport') || 'Export',
    toolbarExportLabel: i18n?.t('baseTable.toolbarExportLabel') || 'Export',
    toolbarExportCSV: i18n?.t('baseTable.toolbarExportCSV') || 'Download as CSV',
    toolbarExportPrint: i18n?.t('baseTable.toolbarExportPrint') || 'Print',
  
    // Columns panel text
    columnsPanelTextFieldLabel: i18n?.t('baseTable.columnsPanelTextFieldLabel') || 'Find column',
    columnsPanelTextFieldPlaceholder: i18n?.t('baseTable.columnsPanelTextFieldPlaceholder') || 'Column title',
    columnsPanelDragIconLabel: i18n?.t('baseTable.columnsPanelDragIconLabel') || 'Reorder column',
    columnsPanelShowAllButton: i18n?.t('baseTable.columnsPanelShowAllButton') || 'Show all',
    columnsPanelHideAllButton: i18n?.t('baseTable.columnsPanelHideAllButton') || 'Hide all',
  
    // Filter panel text
    filterPanelAddFilter: i18n?.t('baseTable.filterPanelAddFilter') || 'Add filter',
    filterPanelDeleteIconLabel: i18n?.t('baseTable.filterPanelDeleteIconLabel') || 'Delete',
    filterPanelLinkOperator: i18n?.t('baseTable.filterPanelLinkOperator') || 'Logic operator',
    filterPanelOperators: i18n?.t('baseTable.filterPanelOperators') || 'Operator',
    filterPanelOperatorAnd: i18n?.t('baseTable.filterPanelOperatorAnd') || 'And',
    filterPanelOperatorOr: i18n?.t('baseTable.filterPanelOperatorOr') || 'Or',
    filterPanelColumns: i18n?.t('baseTable.filterPanelColumns') || 'Columns',
    filterPanelInputLabel: i18n?.t('baseTable.filterPanelInputLabel') || 'Value',
    filterPanelInputPlaceholder: i18n?.t('baseTable.filterPanelInputPlaceholder') || 'Filter value',
  
    // Filter operators text
    filterOperatorContains: i18n?.t('baseTable.filterOperatorContains') || 'contains',
    filterOperatorEquals: i18n?.t('baseTable.filterOperatorEquals') || 'equals',
    filterOperatorStartsWith: i18n?.t('baseTable.filterOperatorStartsWith') || 'starts with',
    filterOperatorEndsWith: i18n?.t('baseTable.filterOperatorEndsWith') || 'ends with',
    filterOperatorIs: i18n?.t('baseTable.filterOperatorIs') || 'is',
    filterOperatorNot: i18n?.t('baseTable.filterOperatorNot') || 'is not',
    filterOperatorAfter: i18n?.t('baseTable.filterOperatorAfter') || 'is after',
    filterOperatorOnOrAfter: i18n?.t('baseTable.filterOperatorOnOrAfter') || 'is on or after',
    filterOperatorBefore: i18n?.t('baseTable.filterOperatorBefore') || 'is before',
    filterOperatorOnOrBefore: i18n?.t('baseTable.filterOperatorOnOrBefore') || 'is on or before',
    filterOperatorIsEmpty: i18n?.t('baseTable.filterOperatorIsEmpty') || 'is empty',
    filterOperatorIsNotEmpty: i18n?.t('baseTable.filterOperatorIsNotEmpty') || 'is not empty',
    filterOperatorIsAnyOf: i18n?.t('baseTable.filterOperatorIsAnyOf') || 'is any of',
  
    // Filter values text
    filterValueAny: i18n?.t('baseTable.filterValueAny') || 'any',
    filterValueTrue: i18n?.t('baseTable.filterValueTrue') || 'true',
    filterValueFalse: i18n?.t('baseTable.filterValueFalse') || 'false',
  
    // Column menu text
    columnMenuLabel: i18n?.t('baseTable.columnMenuLabel') || 'Menu',
    columnMenuShowColumns: i18n?.t('baseTable.columnMenuShowColumns') || 'Show columns',
    columnMenuFilter: i18n?.t('baseTable.columnMenuFilter') || 'Filter',
    columnMenuHideColumn: i18n?.t('baseTable.columnMenuHideColumn') || 'Hide',
    columnMenuUnsort: i18n?.t('baseTable.columnMenuUnsort') || 'Unsort',
    columnMenuSortAsc: i18n?.t('baseTable.columnMenuSortAsc') || 'Sort by ASC',
    columnMenuSortDesc: i18n?.t('baseTable.columnMenuSortDesc') || 'Sort by DESC',
  
    // Column header text
    columnHeaderFiltersTooltipActive: (count) => (count !== 1 ? (i18n?.t('baseTable.columnHeaderFiltersTooltipActive', { count }) || `${count} active filters`) 
      : (i18n?.t('baseTable.columnHeaderFiltersTooltipActiveMany', { count }) || `${count} active filter`)),
    columnHeaderFiltersLabel: i18n?.t('baseTable.columnHeaderFiltersLabel') || 'Show filters',
    columnHeaderSortIconLabel: i18n?.t('baseTable.columnHeaderSortIconLabel') || 'Sort',
  
    // Rows selected footer text
    footerRowSelected: (count) => (count !== 1
      ? (i18n?.t('baseTable.footerRowSelecteds', { count }) || `${count.toLocaleString()} rows selected`)
      : (i18n?.t('baseTable.footerRowSelected', { count }) || `${count.toLocaleString()} row selected`)),
  
    // Total row amount footer text
    footerTotalRows: i18n?.t('baseTable.footerTotalRows') || 'Total Rows:',
  
    // Total visible row amount footer text
    footerTotalVisibleRows: (visibleCount, totalCount) => i18n?.t('baseTable.footerTotalVisibleRows', { visibleCount, totalCount }) 
    || `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,
  
    // Checkbox selection text
    checkboxSelectionHeaderName: i18n?.t('baseTable.checkboxSelectionHeaderName') || 'Checkbox selection',
    checkboxSelectionSelectAllRows: i18n?.t('baseTable.checkboxSelectionSelectAllRows') || 'Select all rows',
    checkboxSelectionUnselectAllRows: i18n?.t('baseTable.checkboxSelectionUnselectAllRows') || 'Unselect all rows',
    checkboxSelectionSelectRow: i18n?.t('baseTable.checkboxSelectionSelectRow') || 'Select row',
    checkboxSelectionUnselectRow: i18n?.t('baseTable.checkboxSelectionUnselectRow') || 'Unselect row',
  
    // Boolean cell text
    booleanCellTrueLabel: i18n?.t('baseTable.booleanCellTrueLabel') || 'yes',
    booleanCellFalseLabel: i18n?.t('baseTable.booleanCellFalseLabel') || 'no',
  
    // Actions cell more text
    actionsCellMore: i18n?.t('baseTable.actionsCellMore') || 'more',
  
    // Column pinning text
    pinToLeft: i18n?.t('baseTable.pinToLeft') || 'Pin to left',
    pinToRight: i18n?.t('baseTable.pinToRight') || 'Pin to right',
    unpin: i18n?.t('baseTable.unpin') || 'Unpin',
  
    // Tree Data
    treeDataGroupingHeaderName: i18n?.t('baseTable.treeDataGroupingHeaderName') || 'Group',
    treeDataExpand: i18n?.t('baseTable.treeDataExpand') || 'see children',
    treeDataCollapse: i18n?.t('baseTable.treeDataCollapse') || 'hide children',
  
    // Grouping columns
    groupingColumnHeaderName: i18n?.t('baseTable.groupingColumnHeaderName') || 'Group',
    groupColumn: (name) => i18n?.t('baseTable.groupColumn', { name }) || `Group by ${name}`,
    unGroupColumn: (name) => i18n?.t('baseTable.unGroupColumn', { name }) || `Stop grouping by ${name}`,
  
    // Master/detail
    expandDetailPanel: i18n?.t('baseTable.expandDetailPanel') || 'Expand',
    collapseDetailPanel: i18n?.t('baseTable.collapseDetailPanel') || 'Collapse',
  
    // Used core components translation keys
    MuiTablePagination: {
      labelRowsPerPage: i18n?.t('baseTable.labelRowsPerPage') || 'Rows per page:'
    },
  };
  
  return (
    <Box>

      {toolBar?.title && (
        <Typography variant="h5">
          {toolBar?.title}
        </Typography>
      ) }

      <AntDesignStyledDataGrid
        components={{ Toolbar: () => <CustomToolbar {...toolBar} data={props?.rows} />, }}
        checkboxSelection
        disableSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        pageSize={10}
        autoHeight
        rowsPerPageOptions={[10, 25, 50]}
        sx={{ border: 'none' }}
        paginationMode="server"
        localeText={GRID_DEFAULT_LOCALE_TEXT}
        {...props}
      />

    </Box>
  );

}
