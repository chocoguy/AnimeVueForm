<template>
    <div class="header">
        <h2 class="align-left">{{Title}}</h2>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
    name: 'Header',
    props: {
        Title: String
    },
    data(){
        return {

        }
    },
    created(){

    },
    methods: {

    },
})
</script>