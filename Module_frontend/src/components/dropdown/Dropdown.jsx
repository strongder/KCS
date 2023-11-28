import React, { useRef,useEffect, useState } from "react";

import "./Dropdown.scss";

const Dropdown = (props) => {
    const [isActive, setIsActive] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      // Function to handle clicks outside the dropdown
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsActive(false);
        }
      };
  
      // Add click event listener to the document
      document.addEventListener("click", handleClickOutside);
  
      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [dropdownRef]);
  
    return (
      <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown__toggle" onClick={(e)=>setIsActive(!isActive)}>
        {props.icon ? <i className={props.icon}></i> : ""}
        {props.badge ? (
          <span className="dropdown__toggle-badge">{props.badge}</span>
        ) : (
          ""
        )}
        {props.customToggle ? props.customToggle() : console.log("null")}
      </button>
      {isActive && (<div className="dropdown__content" onClick={(e)=>setIsActive(!isActive)}>
        {props.contentData && props.renderItems
          ? props.contentData.map((item, index) =>
              props.renderItems(item, index)
            )
          : console.log("check")}
        {props.renderFooter ? (
          <div className="dropdown__footer">{props.renderFooter()}</div>
        ) : (
          ""
        )}
      </div>)}
    </div>
  );
};

export default Dropdown;
