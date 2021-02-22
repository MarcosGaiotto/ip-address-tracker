const getIpUrl = "https://api.ipify.org/?format=json";
const ipInfoUrl = "https://geo.ipify.org/api/v1?apiKey=at_sqv03k9OV44yHWiJD3xgvJymtDzAr&ipAddress="

let ipInfo = {
    ip: "",
    country: "",
    region: "",
    city: "",
    latitude: "",
    longitude: "",
    timeZone: "",
    isp: ""
}

let ipAddress = document.getElementById("ip-address");
let locationCity = document.getElementById("location");
let timezone = document.getElementById("timezone");
let isp = document.getElementById("isp");

getIp().then(() => {
    getIpInfo(ipInfoUrl, ipInfo.ip).then(() => {
        ipAddress.innerHTML = ipInfo.ip;
        locationCity.innerHTML = ipInfo.region + ', ' + ipInfo.city;
        timezone.innerHTML = ipInfo.timeZone;
        isp.innerHTML = ipInfo.isp;
        mymap = L.map('mapid').setView([ipInfo.latitude, ipInfo.longitude], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mymap);
        marker = L.marker([ipInfo.latitude, ipInfo.longitude]).addTo(mymap);
        let markerIcon = document.getElementsByClassName("leaflet-marker-icon")[0];
        markerIcon.src = "./assets/images/icon-location.svg";
        markerIcon.style.width = "30px";
    });
});




function getIp() {
    return fetch(getIpUrl)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            ipInfo.ip = data.ip;
        });
}


function getIpInfo(url, ip) {
    return fetch(url+ip)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            ipInfo.ip = data.ip;
            ipInfo.country = data.location.country;
            ipInfo.region = data.location.region;
            ipInfo.city = data.location.city;
            ipInfo.latitude = data.location.lat;
            ipInfo.longitude = data.location.lng;
            ipInfo.timeZone = "UTC "+ data.location.timezone;
            ipInfo.isp = data.isp;
        })
}

