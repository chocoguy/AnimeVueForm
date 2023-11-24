<template>
    <div class="navbar">
        <n-layout>
            <n-layout-sider>
                <n-menu :options="menuOptions" />
            </n-layout-sider>
        </n-layout>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NMenu, NSpace, NLayout, NLayoutSider } from 'naive-ui';
import type { MenuOption } from 'naive-ui';

const menuOptions: MenuOption[] = [
    {
        label: 'Home',
        key: 'home'
    },
    {
        label: "Schedule",
        key: "schedule"
    },
    {
        label: "MAL Digest",
        key: "mal-digest"
    },
    {
        label: "Settings",
        key: "settings"
    }
]


export default defineComponent({
    name: 'Navbar',
    data() {
        return {
            menuOptions: menuOptions
        }
    },
    components: {
        NMenu,
        NSpace,
        NLayout,
        NLayoutSider
    },
})

</script>