<template>
    <div class="add-anime-auto">
        <Navbar />
        <h1>Add Anime Auto</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton, NDataTable, DataTableColumn, useMessage, NDropdown} from 'naive-ui';
import Navbar from '../components/Navbar.vue';

export default defineComponent({
    name: 'AddAnimeAuto',
    data(){
        return {

        }
    },
    created(){

    },
    methods: {

    },
    components: {
        Navbar
    }
})
</script>