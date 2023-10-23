import L from "leaflet";

export function useMap(){
    let redIcon = L.icon({
        iconUrl: "./src/assets/RedMapPinIcon.svg",
        iconSize:[32, 32], // size of the icon
    })
    let greenIcon = L.icon({
        iconUrl: "./src/assets/GreenMapPin.svg",
        iconSize:[32, 32], // size of the icon
    })
    
    let yellowIcon = L.icon({
        iconUrl: "./src/assets/YellowMapPinIcon.svg",
        iconSize:[32, 32], // size of the icon
    })
    const createMap = (map, latitude, longitude, data) => {
        map = L.map("mapContainer").setView([latitude, longitude], 5);

        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
    
        L.tileLayer.wms("https://data.bmkg.go.id/gempabumi/", {
            attribution: `Data Gempa © ${data.source} 2023`
        }).addTo(map);
    
        const yourPos = L.marker([latitude, longitude], {icon: greenIcon}).addTo(map)
        yourPos.bindPopup("Posisi Mu Ada didaerah sini");
       
        const gempaDiraskan = L.layerGroup().addTo(map)
        const gempaTerkini = L.layerGroup().addTo(map)
        let overLays = {
            "Dirasakan (Pin Merah)" : gempaDiraskan,
            "Terbaru M 5.0+ (Pin Kuning)": gempaTerkini,
            "Posisimu (Pin Hijau)": yourPos
        }
        
        L.control.layers(null, overLays).addTo(map);
    
        // Example array of coordinates
        // map pin untuk gempa dirasakan
        data.gempa_dirasakan.forEach((item) => {
            const [latitude, longitude] = item.coordinates.split(',').map(parseFloat)
            const marker = L.marker([latitude, longitude], {icon: redIcon}).addTo(gempaDiraskan)
            marker.bindPopup(item.dirasakan).addTo(gempaDiraskan);
    
            let radius = 10 * Math.pow(10, item.magnitude / 4)
            const circle = L.circle([latitude, longitude], {
                color: 'red',
                fillColor: '#ff5e74',
                fillOpacity: 0.5,
                radius: radius * 1000
            }).addTo(gempaDiraskan);
            circle.bindPopup(`Radius Gempa ${radius} Km`).addTo(gempaDiraskan)
        })
    
    
    
        data.gempa_terkini.forEach((item) => {
            const [latitude, longitude] = item.coordinates.split(',').map(parseFloat)
            const marker = L.marker([latitude, longitude], {icon: yellowIcon}).addTo(gempaTerkini)
            marker.bindPopup(item.wilayah).addTo(gempaTerkini);
    
            let radius = 10 * Math.pow(10, item.magnitude / 4)
            const circle = L.circle([latitude, longitude], {
                color: '#d7db95',
                fillColor: '#eff598',
                fillOpacity: 0.5,
                radius: radius * 1000
            }).addTo(gempaTerkini);
            circle.bindPopup(`Radius Gempa ${radius} Km`).addTo(gempaTerkini)
        })
    }
    return{
        createMap
    }
    
}