import React from "react";
import OTMHeadings from "./OrderTypeMenu/OTMHeadings";
import { Box } from "@material-ui/core";

export default function OrderTypeMenu(){
    return (
        <Box className="ap-otm-container">
            <OTMHeadings/>
        </Box>
    )
}