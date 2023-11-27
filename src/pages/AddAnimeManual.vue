<template>
    <n-space vertical size="large">
        <n-layout has-sider>
            <n-layout-sider>
                <Navbar />
            </n-layout-sider>
            <n-layout-content>
                <Header v-bind:Title="'Add Anime'" />
                <div class="add-anime-manual">

                    <div class="add-anime-input-container">
                        <p>Title</p>                 
                        <n-input v-model:value="newAnime.Title" placeholder="Konosuba" type="text"  />
                    </div>
                    
                    <div class="add-anime-input-container">
                        <p>Episodes</p>
                        <n-input-number v-model:value="newAnime.EpisodeCount" placeholder="Episodes" :min="1" />
                    </div>

                    <div class="add-anime-input-container">
                        <p>Year</p>
                        <n-input-number v-model:value="newAnime.Year" placeholder="Year" :min="1980" :max="2030" />
                    </div>

                    <div class="add-anime-input-container">
                        <p>Year</p>
                        <n-select v-model:value="newAnime.Season" :options="seasonOptions" />
                    </div>

                    <div class="add-anime-input-container">
                        <p>Media Type</p>
                        <n-select v-model:value="newAnime.MediaType" :options="mediaTypeOptions" />
                    </div>

                    <div class="add-anime-input-container">
                        <p>Source</p>
                        <n-select v-model:value="newAnime.Source" :options="sourceOptions" />
                    </div>
                    
                </div>

                <n-button @click="AddAnime()">Add</n-button>

            </n-layout-content>
        </n-layout>
    </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton, NSpace, NLayout, NLayoutSider, NLayoutContent, NLayoutHeader, NInput, NInputNumber, NSelect} from 'naive-ui';
import { Anime } from '../data/Anime.types';
//import {AnimeSmall} from '../data/AnimeSmall.types'
import { Episode } from '../data/Episode.types';
import { IndexDbService } from '../data/IndexDbService';
import Navbar from '../components/Navbar.vue';
import Header from '../components/Header.vue';
import shortUuid from 'short-uuid';




export default defineComponent({
    name: 'AddAnimeManual',
    data(){
        //let newAnimev3 : Anime = {}
        let newAnime : Anime = {Id: shortUuid().new(), Title: "", EpisodeCount: 12, Year: 2024, Season: "Winter", MediaType: "TV"}
        const seasonOptions: {}[] = [
            {
                label: "Winter",
                value: "Winter"
            },
            {
                label: "Spring",
                value: "Spring"
            },
            {
                label: "Summer",
                value: "Summer"
            },
            {
                label: "Fall",
                value: "Fall"
            }
        ]

        const yearOptions: {}[] = []

        const mediaTypeOptions: {}[] = [
            {
                label: "Unknown",
                value: "Unknown"
            },
            {
                label: "TV",
                value: "TV"
            },
            {
                label: "OVA",
                value: "OVA"
            },
            {
                label: "Movie",
                value: "Movie"
            },
            {
                label: "Special",
                value: "Special"
            },
            {
                label: "ONA",
                value: "ONA"
            },
            {
                label: "Music",
                value: "Music"
            }
        ]

        const sourceOptions: {}[] = [
            {
                label: "Manga",
                value: "Manga"
            },
            {
                label: "Original",
                value: "Original"
            },
            {
                label: "Light Novel",
                value: "Light Novel"
            },
            {
                label: "Game",
                value: "Game"
            },
            {
                label: "Visual Novel",
                value: "Visual Novel"
            }
        ]



        return {
            //newAnime: Object as () => Anime,
            newAnime,
            seasonOptions,
            yearOptions,
            mediaTypeOptions,
            sourceOptions
        }
    },
    created(){     
        for (var i = 1985; i < 2027; i++) {
            this.yearOptions.push({
                label: i.toString(),
                value: i
            })
        }



    },
    methods: {
        printAnime(){
            console.log(this.newAnime.Title);
        },

        AddAnime(){
            console.log(this.newAnime)
            this.newAnime.IdMal = 0;
            this.newAnime.PosterLink = "";
            


            //It's being stupid. for some reason IDBIndex wont taket the this.newAnime so have to redefine
            let newAnimeFormatted  : Anime = { 
                Id : this.newAnime.Id, 
                IdMal: this.newAnime.IdMal, 
                Title: this.newAnime.Title, 
                PosterLink: null,
                //new Date("1972-12-12T00:00:00")
                Start: null,
                End: null,
                Description: null,
                MalScore: null,
                MediaType: this.newAnime.MediaType,
                AiringStatus: null,
                EpisodeCount: this.newAnime.EpisodeCount, 
                Year: this.newAnime.Year,
                Season: this.newAnime.Season, 
                Source: null,
                Rating: null,
                Studios: null,
                StartWatch: null,
                EndWatch: null,
                WatchStatus: "Not Started",
                LastWatched: null            
            }

            IndexDbService.WriteAnime(newAnimeFormatted)
            for(var i = 1; i < this.newAnime.EpisodeCount; i++){
                let newEpisode : Episode = { Id: shortUuid().new(), AnimeId: this.newAnime.Id, Episode: i, WatchStatus: "Not Started"  }
                IndexDbService.WriteEpisode(newEpisode);
            }
            this.$router.push('/')

        }
    },
    components: {
        Navbar,
        NButton,
        NSpace,
        NLayout,
        NLayoutSider,
        NLayoutContent,
        NLayoutHeader,
        Header,
        NInput,
        NInputNumber,
        NSelect
    }
})
</script>