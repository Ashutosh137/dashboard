import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function Datagrid({ rows }) {
  const columns = [
    // { field: "title", headerName: "ID", width: 70 },
    { field: "added", headerName: "Added", width: 200 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "end_year", headerName: "End Year", width: 100 },
    { field: "impact", headerName: "Impact", width: 70 },
    { field: "insight", headerName: "Insight", width: 200 },
    { field: "intensity", headerName: "Intensity", width: 80 },
    { field: "likelihood", headerName: "Likelihood", width: 80 },
    { field: "pestle", headerName: "PESTLE", width: 100 },
    { field: "published", headerName: "Published", width: 200 },
    { field: "region", headerName: "Region", width: 100 },
    { field: "relevance", headerName: "Relevance", width: 120 },
    { field: "sector", headerName: "Sector", width: 150 },
    { field: "source", headerName: "Source", width: 150 },
    { field: "start_year", headerName: "Start Year", width: 150 },
    { field: "title", headerName: "Title", width: 400 },
    { field: "topic", headerName: "Topic", width: 150 },
    {
      field: "url",
      headerName: "URL",
      width: 400,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
  ];
  return (
    <>
      {rows && (
        <DataGrid
          getRowId={(row) => `${row.country}-${row.added}`}
          rows={rows}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{ padding: 3 }}
          slots={{ toolbar: GridToolbar }}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[50, 100, 150, 200]}
          disableRowSelectionOnClick
        />
      )}
    </>
  );
}

export default Datagrid;
