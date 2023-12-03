import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { getAllSchedule } from '../../../redux/services/ScheduleService';
import { useEffect } from 'react';
import moment from 'moment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function ListSchedule() {

  const date = new Date();

  const scheduleList = useSelector((state) => state.schedule.schedule?.allTime);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllSchedule(dispatch)
  }, [])

  console.log(scheduleList) // been state deo co data
  //nhung goi api len co data ma
  //goi api cho nao, tao di dai phat
  //dmm


  // console.log(typeof(moment(date).format('DD/MM/YYYY HH:mm:ss')));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell style={{textAlign: 'center'}}>Trạng thái</StyledTableCell>
            <StyledTableCell style={{textAlign: 'center'}}>Nội dung</StyledTableCell>
            <StyledTableCell style={{textAlign: 'center'}}>Thời gian bắt đầu</StyledTableCell>
            <StyledTableCell style={{textAlign: 'center'}}>Thời gian kết thúc</StyledTableCell>
            <StyledTableCell style={{textAlign: 'center'}}>Xóa</StyledTableCell>
            <StyledTableCell style={{textAlign: 'center'}}>Thao tác</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scheduleList && scheduleList.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell style={{textAlign: 'center'}}>{row.id}</StyledTableCell>
              <StyledTableCell component="th" scope="row" style={{textAlign: 'center'}}>
                {(row.status) ? "Đi làm" : "Nghỉ"}
              </StyledTableCell>
              <StyledTableCell style={{textAlign: 'center'}}>{row.content}</StyledTableCell>
              <StyledTableCell style={{textAlign: 'center'}}>{row.timeStart}</StyledTableCell>
              <StyledTableCell style={{textAlign: 'center'}}>{row.timeEnd}</StyledTableCell>
              <StyledTableCell style={{textAlign: 'center'}}>{(row.isDelete) ? "Đã xóa" : "chưa xóa"}</StyledTableCell>
              <StyledTableCell style={{textAlign: 'center'}}>Thao tác</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}