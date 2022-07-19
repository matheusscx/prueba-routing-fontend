import React, { Fragment, useState, useEffect } from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { getAction } from "../services/action"

export function SelectAction({ setActionSelected, isRequired }) {
  const [actions, setActions] = useState([])
  const [action, setAction] = useState('')
  
  const handleAction = (event) => {
    setAction(event.target.value)
    setActionSelected(event.target.value)
  }

  useEffect(() => {
    getAction()
      .then((response) => {
        if(response && response.action){
          setActions(response.action)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Fragment>
      <FormControl sx={{ minWidth: 120 }}>
        <FormHelperText>Acción: </FormHelperText>
        <InputLabel id="demo-simple-select-helper-label"></InputLabel>
        <Select error={!action && isRequired} labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={action} label="Organización" onChange={handleAction}>
          {actions.map((row, index) => (
            <MenuItem key={index} value={row.action_id}>
              {row.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Fragment>
  )
}
