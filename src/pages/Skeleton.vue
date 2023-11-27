<template>
    <n-space vertical size="large">
        <n-layout has-sider>
            <n-layout-sider>
                <Navbar />
            </n-layout-sider>
            <n-layout-content>
                <div class="">
                    <p>Component content here</p>
                </div>
            </n-layout-content>
        </n-layout>
    </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton, NSpace, NLayout, NLayoutSider, NLayoutContent, NLayoutHeader} from 'naive-ui';
import Navbar from '../components/Navbar.vue';

export default defineComponent({
    name: 'Skeleton',
    data(){
        return {

        }
    },
    created(){

    },
    methods: {

    },
    components: {
        Navbar,
        NButton,
        NSpace,
        NLayout,
        NLayoutSider,
        NLayoutContent,
        NLayoutHeader
    }
})
</script>