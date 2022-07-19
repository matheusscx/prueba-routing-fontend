const { urlApi } = require("../config/config")

function getVehicle(organizationId, startsAt, endsAt) {
  const urlVehicle = `${urlApi}/api/vehicle?organizationId=${organizationId}&startsAt=${startsAt}&endsAt=${endsAt}`
  return new Promise((resolve, reject) => {
    fetch(urlVehicle)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.log("Error service urlVehicle: ", error)
        reject(error)
      })
  })
}

exports.getVehicle = getVehicle
