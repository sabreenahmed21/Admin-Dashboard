// @ts-nocheck
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDashboardQuery } from "Services/JsonServerApi";
import FlexBetween from "Components/FlexBetween";
import Overview from "Components/Overview";
import ChartBreakdown from "Components/ChartBreakdown";
import Header from "Components/Header";
import { StateBox } from "Components/StateBox";

function Dashboard() {
  const { data } = useGetDashboardQuery();
  const theme = useTheme();
  const columns = [
    {
      field: "userId",
      headerName: "userId",
      minWidth: 230,
    },
    {
      field: "cost",
      headerName: "cost",
      minWidth: 120,
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
      minWidth: 220,
    },
    {
      field: "updatedAt",
      headerName: "updatedAt",
      minWidth: 220,
    },
  ];
  return (
    <Box m="1rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Button
          sx={{
            backgroundColor: theme.palette.neutral[500],
            color: theme.palette.secondary[400],
          }}
        >
          <FileDownloadOutlinedIcon />
          <Typography variant="span">Download Report</Typography>
        </Button>
      </FlexBetween>

      <Grid container p="20px 0" gap="15px">
        <Grid xs={12} md={5.8}>
          <Grid container gap="10px">
            <Grid xs={12} md={5.8}>
              <StateBox
                title="Total Customers"
                value={data?.data.totalCustomers}
                increase="+14%"
                description="Since last month"
                icon={
                  <Email
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "26px",
                    }}
                  />
                }
              />
            </Grid>
            <Grid xs={12} md={5.8}>
              <StateBox
                title="Sales Today"
                value={data?.data.todayStats.totalSales}
                increase="+21%"
                description="Since last month"
                icon={
                  <PointOfSale
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "26px",
                    }}
                  />
                }
              />
            </Grid>
            <Grid xs={12} md={5.8}>
              <StateBox
                title="Monthly Sales"
                value={data?.data.thisMonthStats.totalSales}
                increase="+5%"
                description="Since last month"
                icon={
                  <PersonAdd
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "26px",
                    }}
                  />
                }
              />
            </Grid>
            <Grid xs={12} md={5.8}>
              <StateBox
                title="Yearly Sales"
                value={data?.data.yearlySalesTotal}
                increase="+43%"
                description="Since last month"
                icon={
                  <Traffic
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "26px",
                    }}
                  />
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={6}>
          <Box
            backgroundColor={theme.palette.background.alt}
            borderRadius="0.55rem"
            width="100%"
            height="353px"
          >
            <Overview view="sales" isDashboard={true} />
          </Box>
        </Grid>
        <Grid xs={12} md={7}>
          <Box
            width="100%"
            height="75vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                borderRadius: "5rem",
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
                backgroundColor: theme.palette.background.alt,
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
              loading={!data}
              getRowId={(row) => row._id}
              rows={data?.data.transactions || []}
              columns={columns}
            />
          </Box>
        </Grid>
        <Grid xs={12} md={4.8}>
          <Box
            backgroundColor={theme.palette.background.alt}
            borderRadius="0.55rem"
            p="10px"
          >
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary[100] }}
            >
              Sales By Category
            </Typography>
            <Box height="66vh" width="100%" position="relative">
              {" "}
              <ChartBreakdown />
            </Box>
            <Typography
              fontSize="0.8rem"
              sx={{ color: theme.palette.secondary[200] }}
            >
              Breakdown of real states and information via category for revenue
              made for this year and total sales.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Dashboard;
