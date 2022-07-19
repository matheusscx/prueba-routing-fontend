const { urlApi } = require("../config/config")

function getOrganization() {
  const urlOrganization = `${urlApi}/api/organization`
  return new Promise((resolve, reject) => {
    fetch(urlOrganization)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.log("Error service getOrganization: ", error)
        reject(error)
      })
  })
}

exports.getOrganization = getOrganization
