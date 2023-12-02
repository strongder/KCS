import React from 'react';
import HeaderListSchedule from './HeaderListSchedule/HeaderListSchedule';
import FilterListSchedule from './FilterListSchedule/FilterListSchedule';
import ListSchedule from './ListTimeline/ListSchedule';
import "./Schedule.css"


const Schedule = () => {
    // console.log("schedule")
    return (
        <div className='schedule'>
            <HeaderListSchedule />
            <FilterListSchedule />
            <ListSchedule />
        </div>
    )
}

export default Schedule;