import React, { Fragment, useState, useEffect } from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

import { getOrganization } from "../services/organization"

export function Organization({ setOrganizationSelected, setOrganizationName }) {
  const [organizationSelected, setOrganization] = useState("Todos")
  const [organizations, setOrganizations] = useState([])
  const handleChange = (event) => {
    let aux = organizations.find(v => v.organization_id === event.target.value)
    setOrganization(event.target.value)
    setOrganizationSelected(event.target.value)
    setOrganizationName(aux.name.toLowerCase())
  }

  useEffect(() => {
    getOrganization()
      .then((response) => {
        if (response && response.organization) {
          setOrganizations(response.organization)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Fragment>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <FormHelperText>Organización: </FormHelperText>
        <InputLabel id="demo-simple-select-helper-label"></InputLabel>
        <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={organizationSelected} label="Organización" onChange={handleChange}>
          <MenuItem key="Todos" value="Todos">
            Todos
          </MenuItem>
          {organizations.map((row, index) => (
            <MenuItem key={index} value={row.organization_id}>
              {row.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Fragment>
  )
}
