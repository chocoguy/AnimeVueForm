<template>
    <div class="navbar">
        <n-layout has-sider>
            <n-layout-sider>
                <n-menu :options="menuOptions" />
            </n-layout-sider>
        </n-layout>
    </div>
</template>

<script lang="ts">
import { defineComponent, h,} from 'vue'
import { NMenu, NSpace, NLayout, NLayoutSider} from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router'

const menuOptions: MenuOption[] = [
    {
        label: () =>
      h(
        RouterLink,
        {
          to: "/"
        },
        { default: () => 'Home' }
      ),
        key: 'home'
    },
    {
        label: () => 
        h(
            RouterLink,
            {
                to: "/schedule"
            },
            { default: () => "Schedule" }
        ),
        key: "schedule"
    },
    {
        label: () => 
        h(
            RouterLink,
            {
                to: "/mal-digest"
            },
            { default: () => "MAL Digest" }
        ),
        key: "mal-digest"
    },
    {
        label: () => 
        h(
            RouterLink,
            {
                to: "/settings"
            },
            { default: () => "Settings" }
        ),
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
        NLayoutSider,
        RouterLink
    },
})

</script>