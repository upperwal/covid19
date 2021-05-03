
var LocationServices = function() {
    this.getLocation = function(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(res) {
                callback(res.coords)
            });
        } else {
            console.log("Geolocation is not supported by this browser.")
        }
    }

    this.getDistrict = function(callback) {
        this.getLocation(function(locationObject) {
            fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+locationObject.longitude+','+locationObject.latitude+'.json?types=district&access_token=pk.eyJ1IjoidXBwZXJ3YWwiLCJhIjoiY2lxNmVvcGo4MDA3MGZ2bTY1b255OW14dSJ9.h18VG_xCO7yQXMajIqKyHg')
            .then(res => res.json())
            .then(res => {
                callback({
                    locationObject: locationObject,
                    district: res.features[0].text
                })
                console.log(res.features[0].text)
            })
        })
        
    }
}

export default LocationServices
