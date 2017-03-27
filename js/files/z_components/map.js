var map_contacts;
var map_marker = "../images/icon_map_marker.png";
var map_selector;

if ($('.map').hasClass('page_contacts')) {

    map_selector = '.map.page_contacts .google_map';
} else if ($('.map').hasClass('page_partners')) {
    map_selector = '.map.page_partners .google_map';

}

function initMap() {
    var mapOptions;
    if (window.innerWidth <= 850) {
        mapOptions = {
            zoom: 17,
            center: {
                lat: 48.409968,
                lng: 35.036143,
            },
            disableDefaultUI: true,            
        }
    } else {
        mapOptions = {
            zoom: 7,
            center: {
                lat: 49.605766,
                lng: 34.563408,
            },
            disableDefaultUI: true,
            styles: styleArray
        }
    }


    map_contacts = new google.maps.Map(document.querySelector(map_selector), mapOptions);

    var marker = new google.maps.Marker({
        position: {
            lat: 48.409968,
            lng: 35.036143
        },
        map: map_contacts,
        title: 'Intelli',
        icon: map_marker
    });

    // $('header').on('click', map_contacts.getCenter);
}




var styleArray = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
      }
    ]
  },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
      }
    ]
  },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
      }
    ]
  },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f5f5"
      }
    ]
  },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a6a6a6",
                "weight": 10,
      }
    ]
  },
    {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified",
                "color": "#000000"
      }
    ]
  },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
      }
    ]
  },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
      }
    ]
  },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
      }
    ]
  },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
      }
    ]
  },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
      }
    ]
  },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
      }
    ]
  },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
      }
    ]
  },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dadada"
      }
    ]
  },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
      }
    ]
  },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
      }
    ]
  },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
      }
    ]
  },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
      }
    ]
  },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9c9c9"
      }
    ]
  },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
      }
    ]
  }
]
