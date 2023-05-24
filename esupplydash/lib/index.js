import client from "../util.js/client";

const PRINTER_PK = process.env.PRINTER_PK;
const TONER_PK = process.env.TONER_PK;

const getPrintersProd = () => {
  return client("get-printers-prod", {
    body: { PK: PRINTER_PK },
  });
};

const getTonersProd = () => {
  return client("get-toners-prod", {
    body: { PK: TONER_PK },
  });
};

const getZohotoken = () => {
  return client("get_zoho_token", {
    body: { PK: PRINTER_PK },
  });
};

export { getPrintersProd, getTonersProd, getZohotoken };
