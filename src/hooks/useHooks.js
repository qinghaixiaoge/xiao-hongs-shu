import { reactive } from "vue";
function useState() {
    const state = reactive({
        isRefresh: false
    })
    const changeRefresh = (val) => {
        state.isRefresh = val
    }
    return {
        state,
        changeRefresh
    }
}

export default useState()