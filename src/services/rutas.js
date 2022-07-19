const { urlApi } = require("../config/config")

function getRoute(organizationSelected) {
  const url = `${urlApi}/api/route?organization_id=`
  return new Promise((resolve, reject) => {
    fetch(`${url}${organizationSelected}`)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.log("Error service getRoute", error)
        reject(error)
      })
  })
}

function createRoute(body) {
  const url = `${urlApi}/api/route`
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.log("Error service createRoute", error)
        reject(error)
      })
  })
}

function deleteRoute(routeId) {
  const url = `${urlApi}/api/route?routeId=${routeId}`
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.log("Error service createRoute", error)
        reject(error)
      })
  })
}

function updateRoute(body) {
  const url = `${urlApi}/api/route`
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.log("Error service updateRoute", error)
        reject(error)
      })
  })
}

exports.createRoute = createRoute
exports.getRoute = getRoute
exports.deleteRoute = deleteRoute
exports.updateRoute = updateRoute
