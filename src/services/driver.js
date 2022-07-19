const { urlApi } = require("../config/config")

function getDriver(organizationId, startsAt, endsAt) {
  const urlDriver = `${urlApi}/api/driver?organizationId=${organizationId}&startsAt=${startsAt}&endsAt=${endsAt}`
  return new Promise((resolve, reject) => {
    fetch(urlDriver)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.log("Error service driver: ", error)
        reject(error)
      })
  })
}

exports.getDriver = getDriver
