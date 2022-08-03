
var search = '';
let autocomplete;
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let labelIndex = 0;

var tempLocations = []
var map;
var temp;

const initMap = () => {
  
  const memphis = new google.maps.LatLng(35.149815, -90.049556);

  map = new google.maps.Map(document.getElementById("map"), {
    center: memphis,
    zoom: 13,
    mapTypeId: "roadmap",
  });


  
  google.maps.event.addListener(map, "click", (event) => {

    // var lat = this.position.lat();
    
    // console.log(map);
    addMarker(event.latLng, map);
    console.log(event.LatLng)

  });

  const addMarker = (location, map) => {
    var newMarker = new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map,
    })

    temp = newMarker.getMap();
    // console.log(newMarker.getMap())
    tempLocations.push(location)
    console.log(tempLocations)
    return newMarker;
  }


  const input = document.getElementById("search");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

 
  // // Listen for the event fired when the user selects a prediction and retrieve
  // // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

  //   // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

  //   // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

  //     // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

export {temp, map};
window.initMap = initMap;



