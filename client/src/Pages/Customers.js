// @ts-nocheck
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "../Services/JsonServerApi.js";
import Header from "Components/Header.js";
import { DataGrid } from "@mui/x-data-grid";

export default function Customers() {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 200,
    },
    {
      field: "name",
      headerName: "Name",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      width: 130,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      width: 200,
    },
    {
      field: "role",
      headerName: "Role",
      width: 90,
    },
  ];
  return (
    <Box m="1rem">
      <Header title="CUSTOMERS" subtitle="List of Customers." />
      <Box
        m="auto"
        mt="40px"
        height="75vh"
        width="100%"
        maxWidth="1200px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            width: 0,
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
          rows={data?.data.customers || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
}
