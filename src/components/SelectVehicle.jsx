import React, { Fragment, useState, useEffect } from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { getVehicle } from "../services/vehicle"

export function SelectVehicle({ setVehicleSelected, organizationId, startsAt, endsAt, isRequired }) {
  const [vehicles, setVehicles] = useState([])
  const [vehicle, setVehicle] = useState("")
  const [organizationSelected] = useState(organizationId)
  const [disabled, setDisabled] = useState(true)

  const handleVehicle = (event) => {
    setVehicle(event.target.value)
    setVehicleSelected(event.target.value)
  }

  useEffect(() => {
    setDisabled(true)
    getVehicle(organizationSelected, startsAt, endsAt)
      .then((response) => {
        if (response && response.vehicle) {
          setVehicles(response.vehicle)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setDisabled(false))
  }, [organizationSelected, startsAt, endsAt])

  return (
    <Fragment>
      <FormControl sx={{ minWidth: 120 }}>
        <FormHelperText>Vehiculo: </FormHelperText>
        <InputLabel id="demo-simple-select-helper-label"></InputLabel>
        <Select error={!vehicle && isRequired} disabled={!startsAt || !endsAt || disabled} labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={vehicle} label="Organización" onChange={handleVehicle}>
          {vehicles.map((row, index) => (
            <MenuItem key={index} value={row.vehicle_id}>
              {row.plate}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Fragment>
  )
}
