<template>
    <n-dialog-provider>
    <div class="home">
        <Navbar />
        <p>Home</p>
        <p>Under Construction</p>
        <n-data-table
            :columns="animeGridColumns"
            :data="currentAnime"
            :pagination="false"
            :bordered="true"
        />  
        <n-button @click="initAnimeAdd">Add Anime</n-button>
        <!--grid-->
    </div>
    </n-dialog-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton, NDataTable, DataTableColumn, useMessage, useDialog, NDialogProvider} from 'naive-ui';
import Navbar from '../components/Navbar.vue';
import { Anime } from '../data/Anime.types';
import { IndexDbService } from '../data/IndexDbService';


export default defineComponent({
    name: 'Home',
    data(){
        return {
            currentAnime: [] as Anime[],
            animeGridColumns: [] as DataTableColumn[]
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
        ]

    },
    setup(){
            //const message = useMessage();
            const dialog = useDialog();
            return {
                initAnimeAdd(){
            dialog.warning({
                title: "Add Anime",
                content: "How would you like to add an anime?",
                positiveText: "Search MAL",
                negativeText: "Manual Entry",
                onPositiveClick: () => {
                    console.log("MAL")
                },
                onNegativeClick: () => {
                    console.log("Manual")
                }
            })
        }
            }
    },
    methods: {
        async getAnime() {
            var animeIDB: Anime[] = await IndexDbService.GetAnimes();
            this.currentAnime = animeIDB;
            // var newAnime: any = await MALService.GetAnime("50265");
            // console.log('get anime')
            // console.log(newAnime)
        },
    },
    components: {
        NButton,
        NDataTable,
        useMessage,
        useDialog,
        NDialogProvider,
        Navbar
    },
})

</script>