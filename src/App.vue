<script setup>

import Map from './components/Map.vue';
import GempaData from './components/GempaData.vue';
</script>

<template>
  <div class="bg-blue-600 text-white min-h-screen flex flex-col items-center justify-center">
    <h1
      class="text-4xl font-extrabold text-center p-4 rounded-md shadow-lg mb-8 mt-2 hover:bg-blue-800 hover:border-white">
      Selamat Datang di Aplikasi Peta Gempa BMKG!
    </h1>
    <Map />
    <section class="text-center mt-8 text-white mx-20 bg-blue-800 rounded-md p-4">
    
        <p class="text-2xl mt-2">Dengan sumber data dari Badan Meteorologi, Klimatologi, dan Geofisika (BMKG), kami memberikan akses ke data
          gempa
          terkini pada tanggal 17 Oktober 2023.
        </p>
      <p class="mt-4 underline mb-5">
        Data Gempa ini diambil pada Tanggal 17 Oktober 2023.
      </p>
      <section class="text-black bg-gray-200 p-2 rounded-md mt-10 mb-20">
        <h1 class="text-4xl text-center mt-4 mb-8">Data Gempa</h1>
        <GempaData />
      </section>

    </section>
  </div>
</template>




