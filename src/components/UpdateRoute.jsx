import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import Tooltip from "@mui/material/Tooltip"
import moment from "moment"
import { SelectAction } from "./SelectAction"
import { SelectDriver } from "./SelectDriver"
import { SelectVehicle } from "./SelectVehicle"
import { updateRoute } from "../services/rutas"

export function UpdateRoute({ organizationSelected, state, setUpdate }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [startsAt, setStartsAt] = useState("")
  const [endsAt, setEndsAt] = useState("")
  const [totalStops, setTotalStops] = useState("")
  const [action, setAction] = useState("")
  const [driver, setDriver] = useState("")
  const [vehicle, setVehicle] = useState("")

  useEffect(() => {
    setName(state.name)
    setStartsAt(state.starts_at)
    setEndsAt(state.ends_at)
    setTotalStops(state.total_stops)
  }, [state])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleUpdate = () => {
    let body = {
      name,
      startsAt,
      endsAt,
      totalStops,
      action,
      driver,
      vehicle,
      route_id: state.route_id,
    }

    updateRoute(body)
      .then((response) => {
        if (response && response.route && response.route.length) {
          setUpdate(response.route[0])
        }
      })
      .catch((error) => {
        console.log("Error", error)
      })
      .finally(() => setOpen(false))
  }

  const handleSetName = (event) => {
    setName(event.target.value)
  }

  const handleSetStartsAt = (event) => {
    setStartsAt(event.target.value)
  }

  const handleSetendsAt = (event) => {
    setEndsAt(event.target.value)
  }

  const handleTotalStops = (event) => {
    setTotalStops(event.target.value)
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Actualizar ruta</DialogTitle>
        <DialogContent>
          <DialogContentText>Para actualizar esta ruta debe completar el siguiente formulario.</DialogContentText>
          <TextField error={!name} value={name} onChange={handleSetName} autoFocus margin="dense" id="name" label="Nombre de la ruta" type="text" fullWidth variant="standard" />
          <label>Hora de inicio</label>
          <Tooltip title="La hora de inicio debe ser menor a la hora de llegada.">
            <TextField error={!startsAt || moment(startsAt, "HH:mm").isAfter(moment(endsAt, "HH:mm"))} value={startsAt} onChange={handleSetStartsAt} autoFocus margin="dense" id="starts_at" label="" type="time" fullWidth variant="standard" />
          </Tooltip>
          <label>Hora de llegada</label>
          <Tooltip title="La hora de llegada debe ser mayor a la hora de inicio.">
            <TextField error={!endsAt || moment(startsAt, "HH:mm").isAfter(moment(endsAt, "HH:mm"))} value={endsAt} onChange={handleSetendsAt} autoFocus margin="dense" id="ends_at" label="" type="time" fullWidth variant="standard" />
          </Tooltip>
          <TextField error={!totalStops} value={totalStops} onChange={handleTotalStops} autoFocus margin="dense" id="total_stops" label="N° de paradas" type="number" fullWidth variant="standard" />
          <SelectAction setActionSelected={setAction} isRequired={true}></SelectAction>
          <SelectDriver organizationId={organizationSelected} setDriverSelected={setDriver} startsAt={startsAt} endsAt={endsAt} isRequired={true}></SelectDriver>
          <SelectVehicle organizationId={organizationSelected} setVehicleSelected={setVehicle} startsAt={startsAt} endsAt={endsAt} isRequired={true}></SelectVehicle>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!name || !startsAt || !endsAt || !totalStops || !action || !driver || !vehicle || moment(startsAt, "HH:mm").isAfter(moment(endsAt, "HH:mm"))} onClick={handleUpdate}>
            Asignar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
