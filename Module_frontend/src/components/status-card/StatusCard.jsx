import React from 'react'

import './statuscard.scss'

const StatusCard = (props) => {
    const {icon, title, description} = props;
    return (
        <div className='status-card'>
            <div className="status-card-icon">
                <i className={icon}></i>
            </div>
            <div className="status-card-title">
                <b>{title}</b>
            </div>
            <div className="status-card-desc">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default StatusCard
