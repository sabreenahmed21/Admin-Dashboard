// @ts-nocheck
import { useGetSalesQuery } from "Services/JsonServerApi";
import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

export default function ChartBreakdown() {
  const theme = useTheme();
  const { data } = useGetSalesQuery();
  if (!data) return "loading";
  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[600],
    theme.palette.secondary[300],
    theme.palette.secondary[400],
  ];
  const formattedData = Object.entries(
    data?.data.overall[0].salesByCategory
  ).map(([category, sales], i) => ({
    id: category,
    label: category,
    value: sales,
    color: colors[i],
  }));
  return (
    <>
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        colors={{ datum: "data.color" }}
        sortByValue={true}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLabels={true}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.neutral[300]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 88,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="45%"
        left="50%"
        color={theme.palette.neutral[300]}
        textAlign="center"
        sx={{ translate: "-50%" }}
      >
        <Typography variant="h6">
          {`Total: ${data?.data.overall[0].yearlySalesTotal}`}
        </Typography>
      </Box>
    </>
  );
}
