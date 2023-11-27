<template>
    <div class="mal-digest">
        <Navbar />
        <h1>mal</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton, NDataTable, DataTableColumn, useMessage, NDropdown} from 'naive-ui';
import Navbar from '../components/Navbar.vue';

export default defineComponent({
    name: 'Digest',
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