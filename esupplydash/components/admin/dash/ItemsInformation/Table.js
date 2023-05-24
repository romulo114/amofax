import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Checkbox,
  Paper,
  TablePagination,
  // Toolbar,
  // Typography,
  // Tooltip,
  // IconButton,
  TableSortLabel,
  Box,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
// import DeleteIcon from "@material-ui/core/Icon";
// import FilterListIcon from "@material-ui/core/Icon";
// import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import React from "react";

const styles = {
  PaginationWrapper: {
    // display: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "store",
    numeric: false,
    disablePadding: true,
    label: "Store",
  },
  { id: "condition", numeric: true, disablePadding: false, label: "Condition" },
  { id: "brand", numeric: true, disablePadding: false, label: "Brand" },
  { id: "mpn", numeric: true, disablePadding: false, label: "MPN" },
  { id: "desc", numeric: true, disablePadding: false, label: "Description" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    console.log(property);
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
            style={styles.checkbox}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: "1 1 100%",
//   },
// }));

// const EnhancedTableToolbar = ({ numSelected }) => {
//   const classes = useToolbarStyles();
//   // const { numSelected } = props;

//   return (
//     <Toolbar
//       className={clsx(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           className={classes.title}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           className={classes.title}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}

//       {/* {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton aria-label="delete">
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton aria-label="filter list">
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )} */}
//     </Toolbar>
//   );
// };

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
    marginTop: "10px",
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

export default function Component({
  rows,
  handleSelectAllClick,
  handleRequestSort,
  isSelected,
  selected,
  order,
  orderBy,
  page,
  rowsPerPage,
  emptyRows,
  handleChangePage,
  handleChangeRowsPerPage,
  handleClick,
}) {
  const classes = useStyles();
  // const [order, setOrder] = React.useState("asc");
  // const [orderBy, setOrderBy] = React.useState("store");
  // const [selected, setSelected] = React.useState([]);
  // const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n) => n.store);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, store) => {
  //   const selectedIndex = selected.indexOf(store);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, store);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const isSelected = (store) => selected.indexOf(store) !== -1;

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // const handlePageChange = (e, value) => {
  //   setPage(value - 1);
  // };

  // const pageCount =
  //   rows.length % rowsPerPage > 0
  //     ? parseInt(rows.length / rowsPerPage + 1)
  //     : rows.length / rowsPerPage;
  return (
    <Paper>
      {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? "medium" : "small"}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.store);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.store)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.store}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        style={styles.checkbox}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.store}
                    </TableCell>
                    <TableCell align="right">{row.condition}</TableCell>
                    <TableCell align="right">{row.brand}</TableCell>
                    <TableCell align="right">{row.mpn}</TableCell>
                    <TableCell align="right">{row.desc}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box style={styles.PaginationWrapper}>
        {/* <Pagination
            count={pageCount}
            defaultPage={6}
            siblingCount={0}
            boundaryCount={2}
            page={page + 1}
            color="secondary"
            onChange={handlePageChange}
            className="table-pagination"
          /> */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  );
}

// const styles = {
//   TableContainer: {
//     paddingBottom: "20px",
//   },
// };
// export default function Component() {
//   let data = [
//     {
//       Store: "Lorem ipsum1",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum2",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum3",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum4",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum5",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum6",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum7",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum8",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum9",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum10",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum11",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum12",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum13",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum14",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum15",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum16",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum17",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum18",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//     {
//       Store: "Lorem ipsum19",
//       Condition: "New",
//       Brand: "Canon",
//       MPN: "5323423432",
//       Description: "Lorem Ipsum exd long",
//       QT: 2,
//       Price: 573.53,
//     },
//   ];
//   return (
//     <TableContainer style={styles.TableContainer}>
//       <Table>
//         <TableHead>
//           <TableRow className="table-header-row">
//             <TableCell> </TableCell>
//             <TableCell>Store</TableCell>
//             <TableCell>Condition</TableCell>
//             <TableCell>Brand</TableCell>
//             <TableCell>MPN</TableCell>
//             <TableCell>Description</TableCell>
//             <TableCell>QT.</TableCell>
//             <TableCell>Price</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((x, i) => {
//             return (
//               <TableRow key={i} className="table-body-row">
//                 <TableCell>
//                   <input type="radio" />
//                 </TableCell>
//                 <TableCell>{x.Store}</TableCell>
//                 <TableCell>{x.Condition}</TableCell>
//                 <TableCell>{x.Brand}</TableCell>
//                 <TableCell>{x.MPN}</TableCell>
//                 <TableCell>{x.Description}</TableCell>
//                 <TableCell>{x.QT}</TableCell>
//                 <TableCell>{x.Price}</TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
