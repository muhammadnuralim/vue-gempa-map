import axios from 'axios'
import { onMounted } from 'vue'

export function useFetch(){
    const tryFetchingAll = (url) => {
        try{
            const res = axios.get(url)
            return res
        }catch(err){
            console.log(err)
        }
    }

    const tryFetchingPage = (url, page, per_page) => {
        try{
            const res = axios.get(url, {
                params:{
                    page:page,
                    per_page:per_page
                }
            })
            return res
        }catch(err){
            console.log(err)
        }
    }

    onMounted(() => {
        tryFetchingAll();
      });

    return{
        tryFetchingAll,
        tryFetchingPage
    }
}