import React, { useEffect, useReducer, useState } from "react";
import DashHeader from "../../components/admin/dash/DashHeader";
import OrderTypeMenu from "../../components/admin/dash/OrderTypeMenu";
import FiltersMenu from "../../components/admin/dash/FiltersMenu";
import ItemsInformation from "../../components/admin/dash/ItemsInformation";
import Head from "next/head";
import { DashContext, reducer } from "../../components/admin/dash/DashContext";
import { getPrintersProd, getTonersProd, getZohotoken } from "../../lib";

function Dash({ printers, toners }) {
  const stateDefault = {
    buttonList: [],
    headingList: [],
    headingList2x3: [],
    activeButton: 0,
    activeHeading: -1,
  };

  const [dash, setDash] = useReducer(reducer, stateDefault);

  useEffect(() => {}, []);

  return (
    <DashContext.Provider value={{ dash, setDash }}>
      <Head>
        <title>Amofax | Dash</title>
        {/* <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v6.0.0/css/all.css"
          integrity="sha384-3B6NwesSXE7YJlcLI9RpRqGf2p/EgVH8BgoKTaUrmKNDkHPStTQ3EyoYjCGXaOTS"
          crossOrigin="anonymous"
        /> */}
      </Head>
      <DashHeader />
      <OrderTypeMenu />
      <ItemsInformation />
      <FiltersMenu />
    </DashContext.Provider>
  );
}

export async function getServerSideProps(context) {
  // const [printers, toners] = await Promise.all([
  // 	getPrintersProd(),
  // 	getTonersProd()
  // ])
  // const [token] = await Promise.all([getZohotoken()]);
  // console.log(token);
  return { props: {} };
}

export default Dash;
