const { urlApi } = require("../config/config")

function getAction() {
  const urlOrganization = `${urlApi}/api/action`
  return new Promise((resolve, reject) => {
    fetch(urlOrganization)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.log("Error service action: ", error)
        reject(error)
      })
  })
}

exports.getAction = getAction
