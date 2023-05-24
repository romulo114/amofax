import asyncHandler from "express-async-handler";
import client from "../utils.js/client.js";

export const getOrders = asyncHandler(async (req, res) => {
  // console.log("called", req.headers);
  // console.log(req);
  const { headers } = req;
  try {
    const orders = await client("salesorders", {
      headers: {
        Authorization: `Zoho-oauthtoken ${headers.authorization}`,
      },
    });
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(error.status).send(error.data);
  }
});
