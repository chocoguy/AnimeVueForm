<template>
    <div class="schedule">
        <Navbar />
        <h1>Schedule</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton, NDataTable, DataTableColumn, useMessage, NDropdown} from 'naive-ui';
import Navbar from '../components/Navbar.vue';

export default defineComponent({
    name: 'Schedule',
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