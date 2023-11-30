import React from "react";
import Table from "../components/table/Table";
import customerList from "../assets/JsonData/customers-list.json";
import NavCard from "../components/navcard/NavCard";


const customerTableHead = ["", "name", "email", "phone"];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    
    <td 
      style ={{display: "flex", gap: "10px"}}>
        <div style={{width: "60%"}}>

       {item.phone}
        </div>
        <div>
           <i style={{padding: "0 5px", cursor:"pointer"}}class='bx bx-dots-vertical'></i>
        </div>
   
    </td>
  </tr>
);

const Users = () => {
  return (
    <div>
      <h2 className="page-header">customers</h2>
      <div className="row" >
        <div className="col-10" style={{ margin: "auto"}}>
          <div className="card" >
            <div className="card-header">
              <NavCard></NavCard>
            </div>
            <div style={{margin:"0 40px"}}className="card__body">
              <Table
                limit="6"
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={customerList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
