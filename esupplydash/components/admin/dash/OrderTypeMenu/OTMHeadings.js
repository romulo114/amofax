import React from "react";
import GenerateButtons from "./OTMHeadings/GenerateButtons";
import GenerateButtons2x3 from "./OTMHeadings/GenerateButtons2x3";
import { Box, Select, MenuItem } from "@material-ui/core";

const styles = {
  Box: {
    justifyContent: "space-around",
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  Box2: {
    justifyContent: "space-around",
    width: "62%",
    display: "inline-flex",
    alignItems: "center",
    height: "100%",
  },
  Box3: {
    gridArea: "select",
    marginLeft: "20px",
  },
  Select: {
    background: "white",
    width: "120px",
    height: "23px",
  },
};

export default function OTMHeadings() {
  return (
    <Box style={styles.Box}>
      <Box style={styles.Box2}>
        <GenerateButtons />
        <Select
          defaultValue="Sort By"
          className="ap-dhs-custom"
          style={styles.Select}
        >
          <MenuItem value="Sort By">Sort By</MenuItem>
        </Select>
      </Box>
      <Box className="grid-buttons">
        <GenerateButtons2x3 />
        <Box style={styles.Box3}>
          <Select
            defaultValue="Time Zone"
            className="ap-dhs-custom"
            style={styles.Select}
          >
            <MenuItem value="Time Zone">Time Zone</MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
}
