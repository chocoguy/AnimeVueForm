<template>
    <div class="settings">
        <Navbar />
        <h1>Settings stuff</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton, NDataTable, DataTableColumn, useMessage, NDropdown} from 'naive-ui';
import Navbar from '../components/Navbar.vue';

export default defineComponent({
    name: 'Settings',
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