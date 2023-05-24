import React, { useContext, useEffect } from "react";
import { DashContext } from "./DashContext";
import DashHeaderActions from "./DashHeader/DashHeaderActions.js";
import DashHeaderButtonMenu from "./DashHeader/DashHeaderButtonMenu.js";

export default function DashHeader() {
  let { dash, setDash } = useContext(DashContext);

  return (
    <div className="ap-header">
      <DashHeaderActions />
      <DashHeaderButtonMenu />
    </div>
  );
}
