/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "../Components/Header.js";

import Overview from "Components/Overview.js";
import { useState } from "react";

export default function Overall() {
  const [view, setView] = useState("sales");

  return (
    <Box m="1rem">
      <Header
        title="OVERVIEW"
        subtitle="Overview of general revenue  and profit"
      />
      <Box height="75vh" mt="20px">
        <FormControl>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>{" "}
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <Overview view={view} />
      </Box>
    </Box>
  );
}
