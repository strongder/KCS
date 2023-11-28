import React from "react";
import StatusCard from "../components/status-card/StatusCard";
import statusCards from "../../src/assets/JsonData/status-card-data.json";
import './css/Managerment.scss'
const Managerment = () => {
  return (
    <div className="managerment">
      {statusCards.map((item, index) => (
        <div className="card-item" key={index}>
          <StatusCard
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        </div>
      ))}
    </div>
  );
};

export default Managerment;
