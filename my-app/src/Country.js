import Navbar from './Navbar';
import axios from "axios";
import { useState,  useEffect } from "react";
import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';

import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ReactHTMLTableTOEXCEL from "react-html-table-to-excel";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name,flag, calories, fat) {
  return { name,flag, calories, fat };
}
//  const rows=[createData('Pakistan','PKR', 224.8984)];

function descendingComparator(a,b, orderby){
  if(b[orderby] < a[orderby]){
    return -1
  }
  if(b[orderby] > a[orderby]){
    return 1
  }
  return 0
}

function getcomaparator(order, orderby){
  return order ==="desc"
  ?(a,b) => descendingComparator(a,b, orderby)
  :(a,b) => -descendingComparator(a,b, orderby)
}

const sortRowInformation = (rowArray, comparator) =>{
  const stabilizedRowArray = rowArray.map((el, index)=> [el, index])
  stabilizedRowArray.sort((a,b)=> {
    const order= comparator(a[0], b[0])
    if(order !==0) return order
    return a[1] - b[1]
  })
  return stabilizedRowArray.map((el) => el[0])
}


export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0); 
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const[orderDirection, setOrderDirection] =React.useState('asc');
  const[valueToOrderBy, setvalueToOrderBy] =React.useState('name');
  const [rows, setRows] =useState([]);
  const [search, setSearch] = useState(" ");
  const [filterCountries, setFilterCountries] = useState([]);
  const [items, setItems] = useState([]);
  const [con, setcon] =useState({});
       
const name=() =>{  axios.get(`http://localhost:5000/TestAPI/name`)       
.then((result) =>{
  let $data=[];
  for(let r of result.data)
  {
    $data[r.AlphabeticCode]=r.Entity;
  }
  // console.log($data);
    setcon($data); 
},
 (error)=> {
  console.log(error);
});}

const callback=() =>{  axios.get(`http://localhost:5000/TestAPI/country`)       
.then((result) =>{
  
  let $data=[]
  .sort((a, b) => (a.calories < b.calories ? -1 : 1));;
  for(let item in result.data.conversion_rates){

    let a=createData(con[item],<img src={`https://fxtop.com/ico/${item}.gif`} alt="" />, item, result.data.conversion_rates[item]);
    $data.push(a);  
  }
  
  setRows($data);
  setFilterCountries($data);
  setItems(result.data);

},
 (error)=> {
  console.log(error);
});}
useEffect(()=>{
  //callback(); 
  name();
},[]);
useEffect(()=>{
  //name();
  callback(); 
},[con]);
useEffect(()=>{

  const result = rows.filter((row) =>{
   // console.log(row.name?.toLowerCase(),"==",search?.toLowerCase(),">>",row.name?.toLowerCase().trim().includes(search?.toLowerCase().trim()));
    return (row.name?.toLowerCase().trim().includes(search?.toLowerCase().trim()) ? row : null)
  });
  console.log(result);
  // if(search!=""){
    setFilterCountries(result);
  // }else{
  //   setFilterCountries(rows);
  // }
  
},[search])
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 const handleRequestSort= (event, property) =>{
  const isAscending = (valueToOrderBy === property && orderDirection === 'asc');
  setvalueToOrderBy(property);
  setOrderDirection(isAscending ? 'desc' : 'asc');
 };

 const createSortHandler =(property) => (event)=>{
  handleRequestSort(event, property);
 }

  return (
    <>
     <Navbar/>
     <div className="coun">
     <h3>umer</h3>
     <div id='top'>
     <h6>USD : {items.conversion_rates?.USD}</h6>
     <h6>PAK : {items.conversion_rates?.PKR}</h6>
     <ReactHTMLTableTOEXCEL
     className="btn btn-info"
     table="down"
     filename="INFO"
     sheet="sheet"
     buttonText="Download File"
     />
     <input className='search' type="text" placeholder='Search here...' value={search} onChange= {(e) => setSearch(e.target.value)} />
     </div>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" id="down">
      <TableHead>
          <TableRow>
            <TableCell key="name">
              <TableSortLabel 
              active={valueToOrderBy==="name"}
              direction={valueToOrderBy=== "name" ? orderDirection: 'asc'}
              onClick= {createSortHandler("name")}
              >
              <b><h5>COUNTRY</h5></b>
              </TableSortLabel>
              </TableCell>
            <TableCell><b><h5>Flag</h5></b></TableCell>
            <TableCell key="calories" align="right">
              <TableSortLabel 
              active={valueToOrderBy==="calories"}
              direction={valueToOrderBy=== "calories" ? orderDirection: 'asc'}
              onClick= {createSortHandler("calories")}
              >
              <b><h5>Currency</h5></b>
              </TableSortLabel>
              </TableCell>
            <TableCell align="right" key="fat">
            <TableSortLabel 
              active={valueToOrderBy==="fat"}
              direction={valueToOrderBy=== "fat" ? orderDirection: 'desc'}
              onClick= {createSortHandler("fat")}
              >
             <b><h5>Value</h5></b>
              </TableSortLabel>
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {
          sortRowInformation(filterCountries, getcomaparator(orderDirection, valueToOrderBy),
          //  (rowsPerPage > 0
          //   ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          //   : rows )
            ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((rows, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {rows.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {rows.flag}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {rows.calories}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {rows.fat}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={filterCountries.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
    </>
  );
}

