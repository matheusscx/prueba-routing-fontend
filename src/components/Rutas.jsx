import React, { useEffect, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { getRoute, deleteRoute } from "../services/rutas"
import { UpdateRoute } from "./UpdateRoute"

export function Rutas({ organizationSelected = "Todos", newRoute }) {
  const [route, setRoute] = useState([])
  const [update, setUpdate] = useState({})
  useEffect(() => {
    getRoute(organizationSelected)
      .then((response) => {
        setRoute(response.route)
      })
      .catch((error) => {
        console.log("error", error)
      })
  }, [organizationSelected, newRoute, update])

  const handleDelete = (routeId) => {
    if (routeId) {
      deleteRoute(routeId)
        .then((response) => {
          if (response && response.route) {
            setRoute(route.filter((value) => value.route_id !== response.route[0].route_id))
          }
        })
        .catch((error) => {
          console.log("error", error)
        })
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Hora</TableCell>
            <TableCell align="right">Tiempo</TableCell>
            <TableCell align="right">
              <LocationOnIcon />
            </TableCell>
            <TableCell align="right">Acción</TableCell>
            <TableCell align="right">Asignación</TableCell>
            <TableCell align="right">Vehículo</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {route.map((row, index) => (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                {row.starts_at} / {row.ends_at}
              </TableCell>
              <TableCell align="right">{row.travel_time}</TableCell>
              <TableCell align="right">{row.total_stops}</TableCell>
              <TableCell align="right">{row.action_name}</TableCell>
              <TableCell align="right">
                {row.driver_name} {row.last_name}
              </TableCell>
              <TableCell align="right">{row.plate}</TableCell>
              <TableCell align="right">
                <IconButton id={row.route_id} onClick={() => handleDelete(row.route_id)}>
                  <DeleteIcon />
                </IconButton>
                <UpdateRoute state={row} organizationSelected={row.organization_id} setUpdate={setUpdate}></UpdateRoute>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
