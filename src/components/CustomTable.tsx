import {
  DataGrid,
  GridColDef,
  GridValueGetterParams, 
  GridToolbar,
  GridLocaleText,
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import {
  Box, 
  IconButton,
  Typography 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { i18n } from 'next-i18next';

const GRID_DEFAULT_LOCALE_TEXT: GridLocaleText = {

  // Root
  noRowsLabel: i18n?.t('customTable.noRowsLabel') || 'No rows',
  noResultsOverlayLabel: i18n?.t('customTable.noResultsOverlayLabel') || 'No results found.',
  errorOverlayDefaultLabel: i18n?.t('customTable.errorOverlayDefaultLabel') || 'An error occurred.',

  // Density selector toolbar button text
  toolbarDensity: i18n?.t('customTable.toolbarDensity') || 'Density',
  toolbarDensityLabel: i18n?.t('customTable.toolbarDensityLabel') || 'Density',
  toolbarDensityCompact: i18n?.t('customTable.toolbarDensityCompact') || 'Compact',
  toolbarDensityStandard: i18n?.t('customTable.toolbarDensityStandard') || 'Standard',
  toolbarDensityComfortable: i18n?.t('customTable.toolbarDensityComfortable') || 'Comfortable',

  // Columns selector toolbar button text
  toolbarColumns: i18n?.t('customTable.toolbarColumns') || 'Columns',
  toolbarColumnsLabel: i18n?.t('customTable.toolbarColumnsLabel') || 'Select columns',

  // Filters toolbar button text
  toolbarFilters: i18n?.t('customTable.toolbarFilters') || 'Filters',
  toolbarFiltersLabel: i18n?.t('customTable.toolbarFiltersLabel') || 'Show filters',
  toolbarFiltersTooltipHide: i18n?.t('customTable.toolbarFiltersTooltipHide') || 'Hide filters',
  toolbarFiltersTooltipShow: i18n?.t('customTable.toolbarFiltersTooltipShow') || 'Show filters',
  toolbarFiltersTooltipActive: (count) => (count !== 1 ? (i18n?.t('customTable.toolbarFiltersTooltipActive', { count }) || `${count} active filters`) 
    : (i18n?.t('customTable.toolbarFiltersTooltipActiveMany', { count }) || `${count} active filter`)),

  // Export selector toolbar button text
  toolbarExport: i18n?.t('customTable.toolbarExport') || 'Export',
  toolbarExportLabel: i18n?.t('customTable.toolbarExportLabel') || 'Export',
  toolbarExportCSV: i18n?.t('customTable.toolbarExportCSV') || 'Download as CSV',
  toolbarExportPrint: i18n?.t('customTable.toolbarExportPrint') || 'Print',

  // Columns panel text
  columnsPanelTextFieldLabel: i18n?.t('customTable.columnsPanelTextFieldLabel') || 'Find column',
  columnsPanelTextFieldPlaceholder: i18n?.t('customTable.columnsPanelTextFieldPlaceholder') || 'Column title',
  columnsPanelDragIconLabel: i18n?.t('customTable.columnsPanelDragIconLabel') || 'Reorder column',
  columnsPanelShowAllButton: i18n?.t('customTable.columnsPanelShowAllButton') || 'Show all',
  columnsPanelHideAllButton: i18n?.t('customTable.columnsPanelHideAllButton') || 'Hide all',

  // Filter panel text
  filterPanelAddFilter: i18n?.t('customTable.filterPanelAddFilter') || 'Add filter',
  filterPanelDeleteIconLabel: i18n?.t('customTable.filterPanelDeleteIconLabel') || 'Delete',
  filterPanelLinkOperator: i18n?.t('customTable.filterPanelLinkOperator') || 'Logic operator',
  filterPanelOperators: i18n?.t('customTable.filterPanelOperators') || 'Operator',
  filterPanelOperatorAnd: i18n?.t('customTable.filterPanelOperatorAnd') || 'And',
  filterPanelOperatorOr: i18n?.t('customTable.filterPanelOperatorOr') || 'Or',
  filterPanelColumns: i18n?.t('customTable.filterPanelColumns') || 'Columns',
  filterPanelInputLabel: i18n?.t('customTable.filterPanelInputLabel') || 'Value',
  filterPanelInputPlaceholder: i18n?.t('customTable.filterPanelInputPlaceholder') || 'Filter value',

  // Filter operators text
  filterOperatorContains: i18n?.t('customTable.filterOperatorContains') || 'contains',
  filterOperatorEquals: i18n?.t('customTable.filterOperatorEquals') || 'equals',
  filterOperatorStartsWith: i18n?.t('customTable.filterOperatorStartsWith') || 'starts with',
  filterOperatorEndsWith: i18n?.t('customTable.filterOperatorEndsWith') || 'ends with',
  filterOperatorIs: i18n?.t('customTable.filterOperatorIs') || 'is',
  filterOperatorNot: i18n?.t('customTable.filterOperatorNot') || 'is not',
  filterOperatorAfter: i18n?.t('customTable.filterOperatorAfter') || 'is after',
  filterOperatorOnOrAfter: i18n?.t('customTable.filterOperatorOnOrAfter') || 'is on or after',
  filterOperatorBefore: i18n?.t('customTable.filterOperatorBefore') || 'is before',
  filterOperatorOnOrBefore: i18n?.t('customTable.filterOperatorOnOrBefore') || 'is on or before',
  filterOperatorIsEmpty: i18n?.t('customTable.filterOperatorIsEmpty') || 'is empty',
  filterOperatorIsNotEmpty: i18n?.t('customTable.filterOperatorIsNotEmpty') || 'is not empty',
  filterOperatorIsAnyOf: i18n?.t('customTable.filterOperatorIsAnyOf') || 'is any of',

  // Filter values text
  filterValueAny: i18n?.t('customTable.filterValueAny') || 'any',
  filterValueTrue: i18n?.t('customTable.filterValueTrue') || 'true',
  filterValueFalse: i18n?.t('customTable.filterValueFalse') || 'false',

  // Column menu text
  columnMenuLabel: i18n?.t('customTable.columnMenuLabel') || 'Menu',
  columnMenuShowColumns: i18n?.t('customTable.columnMenuShowColumns') || 'Show columns',
  columnMenuFilter: i18n?.t('customTable.columnMenuFilter') || 'Filter',
  columnMenuHideColumn: i18n?.t('customTable.columnMenuHideColumn') || 'Hide',
  columnMenuUnsort: i18n?.t('customTable.columnMenuUnsort') || 'Unsort',
  columnMenuSortAsc: i18n?.t('customTable.columnMenuSortAsc') || 'Sort by ASC',
  columnMenuSortDesc: i18n?.t('customTable.columnMenuSortDesc') || 'Sort by DESC',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) => (count !== 1 ? (i18n?.t('customTable.columnHeaderFiltersTooltipActive', { count }) || `${count} active filters`) 
    : (i18n?.t('customTable.columnHeaderFiltersTooltipActiveMany', { count }) || `${count} active filter`)),
  columnHeaderFiltersLabel: i18n?.t('customTable.columnHeaderFiltersLabel') || 'Show filters',
  columnHeaderSortIconLabel: i18n?.t('customTable.columnHeaderSortIconLabel') || 'Sort',

  // Rows selected footer text
  footerRowSelected: (count) => (count !== 1
    ? (i18n?.t('customTable.footerRowSelecteds', { count }) || `${count.toLocaleString()} rows selected`)
    : (i18n?.t('customTable.footerRowSelected', { count }) || `${count.toLocaleString()} row selected`)),

  // Total row amount footer text
  footerTotalRows: i18n?.t('customTable.footerTotalRows') || 'Total Rows:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => i18n?.t('customTable.footerTotalVisibleRows', { visibleCount, totalCount }) 
  || `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: i18n?.t('customTable.checkboxSelectionHeaderName') || 'Checkbox selection',
  checkboxSelectionSelectAllRows: i18n?.t('customTable.checkboxSelectionSelectAllRows') || 'Select all rows',
  checkboxSelectionUnselectAllRows: i18n?.t('customTable.checkboxSelectionUnselectAllRows') || 'Unselect all rows',
  checkboxSelectionSelectRow: i18n?.t('customTable.checkboxSelectionSelectRow') || 'Select row',
  checkboxSelectionUnselectRow: i18n?.t('customTable.checkboxSelectionUnselectRow') || 'Unselect row',

  // Boolean cell text
  booleanCellTrueLabel: i18n?.t('customTable.booleanCellTrueLabel') || 'yes',
  booleanCellFalseLabel: i18n?.t('customTable.booleanCellFalseLabel') || 'no',

  // Actions cell more text
  actionsCellMore: i18n?.t('customTable.actionsCellMore') || 'more',

  // Column pinning text
  pinToLeft: i18n?.t('customTable.pinToLeft') || 'Pin to left',
  pinToRight: i18n?.t('customTable.pinToRight') || 'Pin to right',
  unpin: i18n?.t('customTable.unpin') || 'Unpin',

  // Tree Data
  treeDataGroupingHeaderName: i18n?.t('customTable.treeDataGroupingHeaderName') || 'Group',
  treeDataExpand: i18n?.t('customTable.treeDataExpand') || 'see children',
  treeDataCollapse: i18n?.t('customTable.treeDataCollapse') || 'hide children',

  // Grouping columns
  groupingColumnHeaderName: i18n?.t('customTable.groupingColumnHeaderName') || 'Group',
  groupColumn: (name) => i18n?.t('customTable.groupColumn', { name }) || `Group by ${name}`,
  unGroupColumn: (name) => i18n?.t('customTable.unGroupColumn', { name }) || `Stop grouping by ${name}`,

  // Master/detail
  expandDetailPanel: i18n?.t('customTable.expandDetailPanel') || 'Expand',
  collapseDetailPanel: i18n?.t('customTable.collapseDetailPanel') || 'Collapse',

  // Used core components translation keys
  MuiTablePagination: {
    labelRowsPerPage: i18n?.t('customTable.labelRowsPerPage') || 'Rows per page:'
  },
};

const ActionComponent = styled('div')(() => ({
  display: 'flex', 
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%' 
}));

const columns: GridColDef[] = [
  {
    field: 'id',
    hide: true,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    flex: 1 
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    flex: 1 
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
  },
  {
    field: 'Actions',
    headerName: 'İşlemler',
    renderCell: () => (
      <ActionComponent>
            
        <Tooltip title={i18n?.t('delete') || 'delete'}>
          <IconButton>
            <DeleteIcon color="secondary" />
          </IconButton>
        </Tooltip>
              
        <Tooltip title={i18n?.t('edit') || 'edit'}>
          <IconButton>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>

      </ActionComponent>
    )

  },
];

const rows = [
  {
    id: 1222, lastName: 'Snow', firstName: 'Jon', age: 35 
  },
  {
    id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 
  },
  {
    id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 
  },
  {
    id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 
  },
  {
    id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null 
  },
  {
    id: 6, lastName: 'Melisandre', firstName: null, age: 150 
  },
  {
    id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 
  },
  {
    id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 
  },
  {
    id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 
  },
  {
    id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 
  },
  {
    id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 
  },
  {
    id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65 
  },
  {
    id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65 
  },
];

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

export default function CustomTable() {
    
  const onSelectionModelChange = (selectionModel: any, details: any) => {

    console.log(selectionModel, details);
  
  };
    
  const onPageChange = (page: number) => {

    console.log(page);
  
  };

  return (
    <Box>

      <Typography variant="h5">
        Table Title
      </Typography>
   
      <AntDesignStyledDataGrid
        components={{ Toolbar: GridToolbar, }}
        rows={rows?.slice(0, 10)}
        rowCount={rows.length}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        disableColumnFilter
        onSelectionModelChange={onSelectionModelChange}
        pageSize={10}
        autoHeight
        rowsPerPageOptions={[10, 25, 50]}
        sx={{ border: 'none' }}
        onPageChange={onPageChange}
        paginationMode="server"
        localeText={GRID_DEFAULT_LOCALE_TEXT}
      />

    </Box>
  );

}
