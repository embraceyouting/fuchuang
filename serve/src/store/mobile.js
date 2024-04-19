import { ref } from "vue";
import { defineStore } from "pinia";
import { debounce } from "@/utils/debounce";

export const useMobileStore = defineStore("mobile", () => {
    const isMobile = ref(false)

    const setMobile = () => {
        isMobile.value = window.innerWidth < 768
    }
    
    setMobile()

    window.addEventListener('resize', debounce(setMobile, 300))

    return { isMobile }
})