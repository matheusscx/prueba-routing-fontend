import React, { Fragment, useState, useEffect } from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { getDriver } from "../services/driver"

export function SelectDriver({ setDriverSelected, organizationId, startsAt, endsAt, isRequired }) {
  const [drivers, setDrivers] = useState([])
  const [driver, setDriver] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [organizationSelected] = useState(organizationId)
  

  const handleDriver = (event) => {
    setDriver(event.target.value)
    setDriverSelected(event.target.value)
  }

  useEffect(() => {
    setDisabled(true)
    getDriver(organizationSelected, startsAt, endsAt)
      .then((response) => {
        if (response && response.driver) {
          setDrivers(response.driver)
        }
      })
      .catch((error) => {
        console.log(error)
      }).finally(()=>{
        setDisabled(false)
      })
  }, [organizationSelected, startsAt, endsAt])

  return (
    <Fragment>
      <FormControl sx={{ minWidth: 120 }}>
        <FormHelperText>Asignación: </FormHelperText>
        <InputLabel id="demo-simple-select-helper-label"></InputLabel>
        <Select error={!driver && isRequired} disabled={!startsAt || !endsAt || disabled} labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={driver} label="Organización" onChange={handleDriver}>
          {drivers.map((row, index) => (
            <MenuItem key={index} value={row.driver_id}>
              {row.name} {row.last_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Fragment>
  )
}
