import React from "react"

export default function GoogleMaps() {
  return (
    <div className="mapouter">
      <div className="gmap_canvas">
        <iframe title="GoogleMaps" width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=chile%20santiago&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
      </div>
    </div>
  )
}
