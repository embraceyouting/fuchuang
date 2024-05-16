import { ref } from "vue";
import { defineStore } from "pinia";

export const useCoverStore = defineStore("cover", () => {
    const coverMap = ref({})

    function get(url) {
        return coverMap.value[url]
    }

    function set(url, cover) {
        coverMap.value[url] = cover
    }

    function remove(url) {
        delete coverMap.value[url]
    }

    return { get, set, remove }
})