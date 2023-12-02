import React from "react";
import { Button } from "@mui/material";
import "./HeaderListSchedule.css"


const HeaderListSchedule = () => {
    return (
        <div className="listTimeLine_header">
            <Button variant="contained">Contained</Button>
            <div className="div_search">
                <i class='bx bx-search'></i>
                <input className="search_input" placeholder="Search here"></input>
            </div>
        </div>
    )
}

export default HeaderListSchedule;