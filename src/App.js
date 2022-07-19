import "./App.css"
import React, { useState, Fragment } from "react"
import { Rutas } from "./components/Rutas"
import { Organization } from "./components/Organization"
import { CreateRoute } from "./components/CreateRoute"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import GoogleMaps from "./components/GoogleMaps"
import Grid from "@mui/material/Grid"

function App() {
  const [organizationSelected, setOrganizationSelected] = useState("Todos")
  const [organizationName, setOrganizationName] = useState("")
  const [newRoute, setNewRoute] = useState("")
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#F5FAFA", height: "100vh", flexGrow: 1 }}>
          <Organization setOrganizationSelected={setOrganizationSelected} setOrganizationName={setOrganizationName}></Organization>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <CreateRoute organizationSelected={organizationSelected} setNewRoute={setNewRoute} organization={organizationName}></CreateRoute>
              <Rutas organizationSelected={organizationSelected} newRoute={newRoute}></Rutas>
            </Grid>
            <Grid item xs={5}>
              <GoogleMaps></GoogleMaps>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  )
}

export default App
