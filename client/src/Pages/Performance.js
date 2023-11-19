// @ts-nocheck
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "Components/Header";
import { useGetUserPerformanceQuery } from "Services/JsonServerApi";
import { useSelector } from "react-redux";

export default function Performance() {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "userId",
      headerName: "user ID",
      width: 220,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 220,
    },
    {
      field: "products",
      headerName: "Products",
      width: 110,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      width: 130,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
  ];
  return (
    <Box m="1rem">
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales performance here."
      />
      <Box
        m="auto"
        mt="40px"
        height="75vh"
        width="100%"
        maxWidth="918px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
}
