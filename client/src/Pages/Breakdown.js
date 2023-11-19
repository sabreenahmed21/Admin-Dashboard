// @ts-nocheck
import { Box } from "@mui/material";
import Header from "../Components/Header";
import ChartBreakdown from "Components/ChartBreakdown";

export default function Breakdown() {
  return (
    <Box m="1rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of sales by category" />
      <Box height="75vh" width="100%" position="relative">
        <ChartBreakdown />
      </Box>
    </Box>
  );
}
