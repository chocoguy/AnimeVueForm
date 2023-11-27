<template>
    <n-space vertical size="large">
        <n-layout has-sider>
            <n-layout-sider>
                <Navbar />
            </n-layout-sider>
            <n-layout-content>
                <div class="home">
                    <p>Home</p>
                    <p>Under Construction</p>
                    <n-data-table :columns="animeGridColumns" :data="currentAnime" :pagination="false" :bordered="true" />
                    <n-dropdown trigger="hover" :options="addAnimeDropdownOptions" @select="addAnime">
                        <n-button @click="addAnime(99)">Add</n-button>
                    </n-dropdown>
                    <!--grid-->
                </div>
            </n-layout-content>
        </n-layout>
    </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton, NDataTable, DataTableColumn, useMessage, NDropdown, NSpace, NLayout, NLayoutSider, NLayoutContent, NLayoutHeader} from 'naive-ui';
import Navbar from '../components/Navbar.vue';
import { Anime } from '../data/Anime.types';
import { IndexDbService } from '../data/IndexDbService';



export default defineComponent({
    name: 'Home',
    data(){
        return {
            currentAnime: [] as Anime[],
            animeGridColumns: [] as DataTableColumn[],
            addAnimeDropdownOptions: [] as any[]
        }
    },
    created() {
        IndexDbService.InitTables();
        this.getAnime();

        //Define columns

        this.animeGridColumns = [
            {
                title: "Title",
                key: "Title"
            },
            {
                title: "Year",
                key: "Year"
            }
        ],

        this.addAnimeDropdownOptions = [
                {
                    label: "Add manually",
                    key: 1
                }
            ]

    },
    methods: {
        async getAnime() {
            var animeIDB: Anime[] = await IndexDbService.GetAnimes();
            this.currentAnime = animeIDB;
            // var newAnime: any = await MALService.GetAnime("50265");
            // console.log('get anime')
            // console.log(newAnime)
        },

        async addAnime(key: number) {
            if(key == 1){
                this.$router.push('/add-anime-manual');
            }else{            
            this.$router.push('/add-anime');
            }
        }
    },
    components: {
        NButton,
        NDataTable,
        useMessage,
        Navbar,
        NDropdown,
        NLayout,
        NLayoutSider,
        NSpace,
        NLayoutContent,
        NLayoutHeader
    },
})

</script>