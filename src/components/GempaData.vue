<template>
    <div class="w-full">
        <DataTable :columns="columns" :data="data.gempa" :options="options" />
        <div class="flex flex-col items-center mt-4">
            <p>Total Item: {{ data.total_data_gempa }}</p>
            <div class="flex">
                <button @click="loadPreviousPage" :disabled="data.current_page === 1"
                    class="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    :class="{ 'cursor-not-allowed': data.current_page === 1 }">Previous</button>
                <span class="mx-4">Page {{ data.current_page }}</span>
                <button @click="loadNextPage" :disabled="data.current_page === (data.total_pages / 2)"
                    class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    :class="{ 'cursor-not-allowed': data.current_page === (data.total_pages / 2) }">Next</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
import { useFetch } from '../composable/useFetch'
import { onMounted, reactive, watch } from 'vue';


DataTable.use(DataTablesCore);

const { tryFetchingPage } = useFetch()
const data = reactive({
    current_page: 1,
    per_page: 5,
    total_data_gempa: '',
    total_gempa_dirasakan: '',
    total_gempa_terkini: '',
    total_pages: '',
    gempa: [],
    source: ''
})
const handleFetching = async () => {
    const result = await tryFetchingPage(import.meta.env.VITE_BASEURL_API + '/api/gempa/paginate', data.current_page, data.per_page)
    const gempa = [...result.data.gempa_dirasakan, ...result.data.gempa_terkini]

    
    const formattedGempa = gempa.map(item => {
        const date = new Date(item.dateTime); // Assuming the property name is 'dateTime'
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        // Create a new object with the formatted date and other existing data
        return { ...item, formattedDate };
    });

    formattedGempa.sort((a, b) => {
        const dateA = new Date(a.formattedDate);
        const dateB = new Date(b.formattedDate);
        return dateA - dateB;
    });

    data.current_page = result.data.current_page
    data.gempa = formattedGempa
    data.per_page = result.data.per_page
    data.source = result.data.source
    data.total_data_gempa = result.data.total_data_gempa
    data.total_gempa_dirasakan = result.data.total_gempa_dirasakan
    data.total_gempa_terkini = result.data.total_gempa_terkini
    data.total_pages = result.data.total_pages

}
const options = {
    responsive: true,
    select: true,
    paging: false,
    info: false,
    searching: false
};

const columns = [
    { data: 'wilayah', title: 'Wilayah' },
    { data: 'coordinates', title: 'Coordinates' },
    { data: 'jam', title: 'Jam' },
    { data: 'formattedDate', title: 'Tanggal' },
    { data: 'kedalaman', title: 'Kedalaman' },
    { data: 'magnitude', title: 'Magnitude' },
];

const loadPreviousPage = () => {
    if (data.current_page > 1) {
        data.current_page--;
        handleFetching();
    }
};

const loadNextPage = () => {
    if (data.current_page < data.total_pages) {
        data.current_page++;
        handleFetching();
    }

};

onMounted(() => [
    handleFetching()
])

</script>

<style>
@import 'datatables.net-dt';
</style>