<template>
    <n-space vertical size="large">
        <n-layout has-sider>
            <n-layout-sider>
                <Navbar />
            </n-layout-sider>
            <n-layout-content>
                <Header v-bind:Title="currentAnime.Title" />
                <div class="anime">
                    <div>
                    <div>
                        <p>Episode: {{watchedEpisodes}}/{{currentAnime.EpisodeCount}} | Last Watched: {{currentAnime.LastWatched == null ? "" : currentAnime.LastWatched }} | Currently {{currentAnime.WatchStatus}}</p>
                        <div style="display: flex;">
                            <p>Started</p>
                            <p>{{currentAnime.StartWatch.toDateString()}}</p>
                            <!-- <n-date-picker v-model:value="currentAnime.StartWatch" type="date" :disabled="true" /> -->
                            <p>Ended</p>
                            <!-- <n-date-picker v-model:value="currentAnime.EndWatch" type="date" :disabled="true" /> -->
                            <p>{{currentAnime.EndWatch.toDateString()}}</p>
                            <hr />
                        </div>
                    </div>
                    <div class="anime">
                        <p>Season:</p>
                        <p>{{currentAnime.Season}} - {{currentAnime.Year}}</p>
                        <p>Start Airing:</p>
                        <p>{{currentAnime.Start == null ? "" : currentAnime.Start.toDateString()}}</p>
                        <p>End Airing:</p>
                        <p>{{currentAnime.End == null ? "" : currentAnime.End.toDateString()}}</p>
                        <p>MAL Score:</p>
                        <p>{{currentAnime.MalScore}}</p>
                        <p>Your Score:</p>
                        <p>{{currentAnime.Rating}}</p>
                        <p>Status:</p>
                        <p>{{currentAnime.AiringStatus}}</p>
                        <p>Media Type:</p>
                        <p>{{currentAnime.MediaType}}</p>
                        <p>Source:</p>
                        <p>{{currentAnime.Source}}</p>
                        <p>Studios:</p>
                        <p>{{studiosString()}}</p>
                        <div style="grid-column: 1/3;">
                            <n-button-group>
                                <n-button @click="watchEpisode()">Watch Episode</n-button>
                                <n-button @click="skipEpisode()">Skip Episode</n-button>
                                <n-button @click="editEpisode()">Edit Episode</n-button>
                            </n-button-group>
                        </div>
                    </div>
                    </div>

                    <div>
                        <div v-if="currentAnime.PosterLink != null">
                            <img :src="currentAnime.PosterLink" alt="poster" />
                        </div>
                    </div>
                </div>
            </n-layout-content>
        </n-layout>
    </n-space>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import { NButton, NSpace, NLayout, NLayoutSider, NLayoutContent, NLayoutHeader, NDatePicker, NButtonGroup} from 'naive-ui';
import { IndexDbService } from '../data/IndexDbService';
import { Anime } from '../data/Anime.types';
import { Episode } from '../data/Episode.types';
import Navbar from '../components/Navbar.vue';

export default defineComponent({
    name: 'Anime',
    props: ['id'],
    data(){
        let currentAnime : Anime = null
        let watchedEpisodes = 0;

        return {
            currentAnime,
            currentAnimeEpisodes: [] as Episode[],
            watchedEpisodes
        }
    },
    created(){
        this.loadData()
        this.computeWatchedEpisodes()
    },
    methods: {
        async loadData(){
            var currAnime = await IndexDbService.GetAnime(this.id)
            this.currentAnime = currAnime

            var currAnimeEpisodes = await IndexDbService.GetEpisodesForAnime(this.id)
            this.currentAnimeEpisodes = currAnimeEpisodes
        },

        computeWatchedEpisodes(){
            //status
            //Watched
            //Not Started
            //Skipped

            for(var i = 0; i < this.currentAnimeEpisodes.length; i++){
                if(this.currentAnimeEpisodes[i].WatchStatus != "Not Started"){
                    this.watchedEpisodes++
                }
            }

        },

        studiosString(){

            var studioString = ""

            if(this.currentAnime.Studios.length > 0){
                if(this.currentAnime.Studios.length > 1){
                    studioString = this.currentAnime.Studios[0]
                    for(var i = 1; i < this.currentAnime.Studios.length; i++){
                        studioString = studioString + " | " + this.currentAnime.Studios[i]
                    }
                    return studioString
                }else{
                    return this.currentAnime.Studios[0]
                }
            }else{
                return ""
            }
        },

        async watchEpisode(){
            var aniEpisodes = await IndexDbService.GetEpisodesForAnime(this.id)
            var aniEpisodeToWatch : Episode

            for(var i = 0; i < aniEpisodes.length; i++){
                if(aniEpisodes[i].WatchStatus == "Not Started"){
                    aniEpisodeToWatch = aniEpisodes[i]
                    aniEpisodeToWatch.WatchStatus = "Watched"
                    await IndexDbService.WriteEpisode(aniEpisodeToWatch)
                    return
                }
            }
        },

        async skipEpisode(){
            var aniEpisodes = await IndexDbService.GetEpisodesForAnime(this.id)
            var aniEpisodeToSkip : Episode

            for(var i = 0; i < aniEpisodes.length; i++){
                if(aniEpisodes[i].WatchStatus == "Not Started"){
                    aniEpisodeToSkip = aniEpisodes[i]
                    aniEpisodeToSkip.WatchStatus = "Skipped"
                    await IndexDbService.WriteEpisode(aniEpisodeToSkip)
                    return
                }
            }
        },

        async editEpisode(){

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
        NDatePicker,
        NButtonGroup
    }
})
</script>