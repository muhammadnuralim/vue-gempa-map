<template>
    <div id="mapContainer"></div>
</template>
  
<script setup>
import "leaflet/dist/leaflet.css";
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { useFetch } from '../composable/useFetch'
import {useMap} from '../composable/createMap'
// Object map
let map = null;

const {createMap} = useMap()

const { tryFetchingAll } = useFetch()
const data = reactive({
    gempa_dirasakan: [],
    gempa_terkini: [],
    source: ''
})



const handleFetching = async () => {
    const result = await tryFetchingAll(import.meta.env.VITE_BASEURL_API + '/api/gempa/all')
    data.gempa_dirasakan = result.data.gempa_dirasakan
    data.gempa_terkini = result.data.gempa_terkini
    data.source = result.data.source
    getLocation(data)
}


const isSupported = ref('geolocation' in navigator);
const coords = reactive({
    latitude: '',
    longitude: ''
});


const isShowPos = ref(false)
const getLocation = (data) => {
    if (isSupported.value) {
        // Get the user's current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                coords.latitude = position.coords.latitude,
                    coords.longitude = position.coords.longitude,
                    createMap(map, coords.latitude, coords.longitude, data)
            },
            (error) => {
                console.error(`Geolocation error: ${error.message}`);
            }
        );
    }
}

onMounted(() => {
    handleFetching()
});

onBeforeUnmount(() => {
    if (map) {
        map.remove();
    }
});
</script>
  
<style scoped>
#mapContainer {
    width: 80vw;
    height: 80vh;
}
</style>
  