import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function DataGridCustomToolbar({
  searchInput,
  setSearchInput,
  setSearch,
}) {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport/>
        </FlexBetween>
        <TextField
          label="Search for userId or cost ..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {
                  setSearch(searchInput)
                  setSearchInput("");
                }}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
}
