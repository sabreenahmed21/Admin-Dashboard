// @ts-nocheck
import { Box, useTheme } from "@mui/material";
import { useGetTransactionsQuery } from "../Services/JsonServerApi.js";
import Header from "Components/Header.js";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import DataGridCustomToolbar from "../Components/DataGridCustomToolbar";

export default function Transactions() {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    search,
  });
  const columns = [
    {
      field: "userId",
      headerName: "userId",
      width: 230,
    },
    {
      field: "cost",
      headerName: "cost",
      width: 120,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
    {
      field: "products",
      headerName: "products",
      width: 120,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 220,
    },
    {
      field: "updatedAt",
      headerName: "updatedAt",
      width: 220,
    },
  ];
  console.log(data?.data.transaction);
  return (
    <Box m="1rem">
      <Header title="TRANSACTION" subtitle="List of Transaction." />
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
            // @ts-ignore
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            // @ts-ignore
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
          rows={data?.data.transaction || []}
          columns={columns}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { setSearchInput, searchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
}
