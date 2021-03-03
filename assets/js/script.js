const ipIdentificator = "https://api.ipify.org/?format=json";
const informationsTracker = "https://geo.ipify.org/api/v1?apiKey=at_sqv03k9OV44yHWiJD3xgvJymtDzAr&ipAddress="

let ipInformations = {
    ip: "",
    country: "",
    region: "",
    city: "",
    latitude: "",
    longitude: "",
    timeZone: "",
    isp: ""
}

const ipAddress = document.getElementById("ip-address");
const locationCity = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");


document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-btn");
    const searchInput = document.getElementById("ip");

    getIp().then(() => {
        getIpInformations(informationsTracker, ipInformations.ip).then(() => {
            setInformationsOnDocument();
            generateMap(ipInformations.latitude, ipInformations.longitude);
            searchInput.disabled = false;
        });
    });

    searchButton.addEventListener('click', () => {
        let ipToLocate = searchInput.value;
        if (ipToLocate !== "") {
            getIpInformations(informationsTracker, ipToLocate).then(() => {
                setInformationsOnDocument();
                setNewLocationOnMap(ipInformations.latitude, ipInformations.longitude);
                ipToLocate = "";
            });
        }
    });
});


function getIp() {
    return fetch(ipIdentificator)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            ipInformations.ip = data.ip;
        });
}


function getIpInformations(api, ip) {
    return fetch(api+ip)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            ipInformations.ip = data.ip;
            ipInformations.country = data.location.country;
            ipInformations.region = data.location.region;
            ipInformations.city = data.location.city;
            ipInformations.latitude = data.location.lat;
            ipInformations.longitude = data.location.lng;
            ipInformations.timeZone = "UTC "+ data.location.timezone;
            ipInformations.isp = data.isp;
        })
}

function setInformationsOnDocument() {
    ipAddress.innerHTML = ipInformations.ip;
    locationCity.innerHTML = ipInformations.region + ', ' + ipInformations.city;
    timezone.innerHTML = ipInformations.timeZone;
    isp.innerHTML = ipInformations.isp;
}

function generateMap(latitude, longitude) {
    mymap = L.map('mapid').setView([latitude, longitude], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);

    let myIcon = L.icon({
        iconUrl: "./assets/images/icon-location.svg",
        iconSize: [28, 35]
    });
    
    L.marker([latitude, longitude], {icon: myIcon}).addTo(mymap);
   

    //let markerIcon = document.getElementsByClassName("leaflet-marker-icon")[0];
    // markerIcon.src = "./assets/images/icon-location.svg";
    // markerIcon.style.width = "28px";
}

function setNewLocationOnMap(latitude, longitude) {
    mymap.setView([latitude, longitude], 13);
    let myIcon = L.icon({
        iconUrl: "./assets/images/icon-location.svg",
        iconSize: [28, 35]
    });
    L.marker([latitude, longitude], {icon: myIcon}).addTo(mymap);
    
}