import React, { useState } from 'react'
import { FormControl, FormHelperText, Link, MenuItem, Select } from "@mui/material"
import './Sort.scss'
const Sort = (props) => {

  const {sort, handleChange, sortBy} = props

  return (
    <div className="sortby">
            <FormControl sx={{marginLeft: "auto", }}>
              <Select
                defaultValue={sort}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {sortBy.map((item, index)=>
                {
                    return(<MenuItem key={index} value={item.name}>{item.value}</MenuItem>)
                })}
              </Select>
            </FormControl>
          </div>
  )
}

export default Sort