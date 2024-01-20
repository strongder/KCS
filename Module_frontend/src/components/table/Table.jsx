import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './table.scss';

const Table = (props) => {
  const [dataShow, setDataShow] = useState([]);
  const [pages, setPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    const calculatePages = () => {
      const totalPages = Math.ceil(props.bodyData.length / Number(props.limit));
      setPages(totalPages);
    };

    const updateDataShow = () => {
      const start = Number(props.limit) * (currPage - 1);
      const end = start + Number(props.limit);
      setDataShow(props.bodyData.slice(start, end));

    };

    calculatePages();
    updateDataShow();
  }, [props.bodyData, props.limit, currPage]);

  const selectPage = (event, page) => {
    setCurrPage(page);
  };

  return (
    <div>
      <div className="table-wrapper">
        <table>
          {props.headData && props.renderHead ? (
            <thead>
              <tr>{props.headData.map((item, index) => props.renderHead(item, index))}</tr>
            </thead>
          ) : null}
          {props.bodyData && props.renderBody ? (
            <tbody>{dataShow.map((item, index) => props.renderBody(item, index))}</tbody>
          ) : null}
        </table>
      </div>
      {pages > 1 ? (
        <div className="table__pagination">
          <Stack spacing={2}>
            <Pagination count={pages} page={currPage} onChange={selectPage} />
          </Stack>
        </div>
      ) : null}
    </div>
  );
};

export default Table;
