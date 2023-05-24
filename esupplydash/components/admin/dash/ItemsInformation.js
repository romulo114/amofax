import React from "react";
import Table from "./ItemsInformation/Table";
import TableRecordInformations from "./ItemsInformation/TableRecordInformations";
// import Pagination from "./ItemsInformation/Pagination";
import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  Container: {
    display: "flex",
    backgroundColor: "#E3E4EA",
  },
  Box: {
    width: "38%",
  },
  Box2: {
    width: "68%",
    position: "relative",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function createData(store, condition, brand, mpn, desc) {
  return { store, condition, brand, mpn, desc };
}

const rows = [
  createData("01Cupcake", 305, 3.7, 67, 4.3),
  createData("02Donut", 452, 25.0, 51, 4.9),
  createData("03Eclair", 262, 16.0, 24, 6.0),
  createData("04Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("05Gingerbread", 356, 16.0, 49, 3.9),
  createData("06Honeycomb", 408, 3.2, 87, 6.5),
  createData("07Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("08Jelly Bean", 375, 0.0, 94, 0.0),
  createData("09KitKat", 518, 26.0, 65, 7.0),
  createData("10Lollipop", 392, 0.2, 98, 0.0),
  createData("11Marshmallow", 318, 0, 81, 2.0),
  createData("12Nougat", 360, 19.0, 9, 37.0),
  createData("13Oreo", 431, 18.0, 63, 4.0),
  createData("14vCupcadke", 35, 1.7, 57, 14.3),
  createData("15jDoncut", 245, 2.0, 31, 43.9),
  createData("16eEzclair", 326, 6.0, 14, 64.0),
  createData("17cvFrozen", 419, 64.0, 34, 41.0),
  createData("18erGingerbread", 36, 13.0, 9, 63.9),
  createData("19xvcb", 640, 33.2, 71, 61.5),
  createData("20virt", 277, 91.0, 7, 41.3),
  createData("21vbwep", 735, 14.0, 24, 8.0),
  createData("22vcbew", 418, 21.0, 65, 4.0),
  createData("23vyry", 292, 3.2, 9, 5.0),
  createData("24jyrt", 318, 5.56, 81, 21.0),
  createData("25vbruk", 160, 11.0, 29, 7.0),
  createData("26Popo", 327, 13.0, 6, 9.0),
];

export default function ItemsInformation() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("store");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.store);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, store) => {
    const selectedIndex = selected.indexOf(store);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, store);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (store) => selected.indexOf(store) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const pageCount =
    rows.length % rowsPerPage > 0
      ? parseInt(rows.length / rowsPerPage + 1)
      : rows.length / rowsPerPage;
  const handlePageChange = (e, value) => {
    setPage(value - 1);
  };

  return (
    <>
      <Box style={styles.Container}>
        <Box style={styles.Box2}>
          <Table
            rows={rows}
            isSelected={isSelected}
            rowsPerPage={rowsPerPage}
            emptyRows={emptyRows}
            selected={selected}
            handleSelectAllClick={handleSelectAllClick}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleRequestSort={handleRequestSort}
            handleClick={handleClick}
            order={order}
            orderBy={orderBy}
            page={page}
          />
          {/* <Pagination /> */}
          <Pagination
            count={pageCount}
            defaultPage={6}
            siblingCount={0}
            boundaryCount={2}
            page={page + 1}
            color="secondary"
            onChange={handlePageChange}
            className="table-pagination"
          />
        </Box>
        <Box style={styles.Box}>
          <TableRecordInformations
            columns={["Vendor", "Price", "QT", "S", "PFR", "$"]}
          />
          <TableRecordInformations
            columns={["Vendor", "RFB", "OB", "Store", "URL", "Remove"]}
          />
          <TableRecordInformations columns={["Price", "History"]} />
        </Box>
      </Box>
    </>
  );
}
