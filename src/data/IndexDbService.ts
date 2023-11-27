import { openDB } from 'idb';
import { Anime } from './Anime.types';
import { Episode } from './Episode.types';
import { Schedule } from './Schedule.types';
import { AnimeSmall } from './AnimeSmall.types';

export class IndexDbService {

    static async InitTables() {
        const db = openDB('anime-vue-form', 1, {
            upgrade(db) {
                if(!db.objectStoreNames.contains('anime')) {
                    const animeStore = db.createObjectStore('anime', { keyPath: 'Id' });
                    animeStore.createIndex('IdMal', 'IdMal', { unique: false });
                    animeStore.createIndex('Title', 'Title', { unique: false });
                    animeStore.createIndex("PosterLink", "PosterLink", { unique: false });
                    animeStore.createIndex("Start", "Start", { unique: false });
                    animeStore.createIndex("End", "End", { unique: false });
                    animeStore.createIndex("Description", "Description", { unique: false });
                    animeStore.createIndex("MalScore", "MalScore", { unique: false });
                    animeStore.createIndex("MediaType", "MediaType", { unique: false });
                    animeStore.createIndex("AiringStatus", "AiringStatus", { unique: false });
                    animeStore.createIndex("EpisodeCount", "EpisodeCount", { unique: false });
                    animeStore.createIndex("Year", "Year", { unique: false });
                    animeStore.createIndex("Season", "Season", { unique: false });
                    animeStore.createIndex("BroadcastDay", "BroadcastDay", { unique: false });
                    animeStore.createIndex("Source", "Source", { unique: false });
                    animeStore.createIndex("Rating", "Rating", { unique: false });
                    animeStore.createIndex("Studios", "Studios", { unique: false });
                    animeStore.createIndex("StartWatch", "StartWatch", { unique: false });
                    animeStore.createIndex("EndWatch", "EndWatch", { unique: false });

                }

                if(!db.objectStoreNames.contains('schedule')) {
                    const scheduleStore = db.createObjectStore('schedule', { keyPath: 'Id' });
                    scheduleStore.createIndex('Title', 'Title', { unique: false });
                    scheduleStore.createIndex('IsPrimary', 'IsPrimary', { unique: false });
                    scheduleStore.createIndex('Mon', 'Mon', { unique: false });
                    scheduleStore.createIndex('Tue', 'Tue', { unique: false });
                    scheduleStore.createIndex('Wed', 'Wed', { unique: false });
                    scheduleStore.createIndex('Thu', 'Thu', { unique: false });
                    scheduleStore.createIndex('Fri', 'Fri', { unique: false });
                    scheduleStore.createIndex('Sat', 'Sat', { unique: false });
                    scheduleStore.createIndex('Sun', 'Sun', { unique: false });
                }

                if(!db.objectStoreNames.contains('episode')) {
                    const episodeStore = db.createObjectStore('episode', { keyPath: 'Id' });
                    episodeStore.createIndex('AnimeId', 'AnimeId', { unique: false });
                    episodeStore.createIndex('Episode', 'Episode', { unique: false });
                    episodeStore.createIndex('WatchStatus', 'WatchStatus', { unique: false });
                }

            }
        })
    }


    //Write Methods

    static async WriteAnime(anime: Anime) {
        const db = await openDB('anime-vue-form', 1);
        const tx = db.transaction('anime', 'readwrite');
        const store = tx.objectStore('anime');
        await store.put(anime);
        await tx.done;
    }

    static async WriteSchedule(schedule: Schedule) {
        const db = await openDB('anime-vue-form', 1);
        const tx = db.transaction('schedule', 'readwrite');
        const store = tx.objectStore('schedule');
        await store.put(schedule);
        await tx.done;
    }

    static async WriteEpisode(episode: Episode) {
        const db = await openDB('anime-vue-form', 1);
        const tx = db.transaction('episode', 'readwrite');
        const store = tx.objectStore('episode');
        await store.put(episode);
        await tx.done;
    }


    //Get Methods

    static async GetAnime(id: string) {
        const db = await openDB('anime-vue-form', 1);
        const tx = db.transaction('anime', 'readonly');
        const store = tx.objectStore('anime');
        const anime = await store.get(id);
        await tx.done;
        return anime;
    }

    static async GetAnimes() {
        const db = await openDB('anime-vue-form', 1);
        const tx = db.transaction('anime', 'readonly');
        const store = tx.objectStore('anime');
        const animes = await store.getAll();
        await tx.done;
        return animes;
    }

    static async GetSchedule(id: string) {
        const db = await openDB('anime-vue-form', 1);
        const tx = db.transaction('schedule', 'readonly');
        const store = tx.objectStore('schedule');
        const schedule = await store.get(id);
        await tx.done;
        return schedule;
    }

    static async GetEpisode(id: string) {
        const db = await openDB('anime-vue-form', 1);
        const tx = db.transaction('episode', 'readonly');
        const store = tx.objectStore('episode');
        const episode = await store.get(id);
        await tx.done;
        return episode;
    }

    //! Make Efficent
    static async GetEpisodesForAnime(animeId: string) {
        const db = await openDB('anime-vue-form', 1);
        const tx = db.transaction('episode', 'readonly');
        const store = tx.objectStore('episode');
        const episodes = await store.getAll();
        await tx.done;
        episodes.filter(episode => episode.AnimeId == animeId);
        return episodes.sort((a, b) => a.Episode = b.Episode)
    }




    //Delete Methods

    static async DeleteAnime(id: string) {
        const db = await openDB('anime-vue-form', 1);
        const tx = db.transaction('anime', 'readwrite');
        const store = tx.objectStore('anime');
        await store.delete(id);
        await tx.done;
    }

    static async DeleteSchedule(id: string) {
        const db = await openDB('anime-vue-form', 1);
        const tx = db.transaction('schedule', 'readwrite');
        const store = tx.objectStore('schedule');
        await store.delete(id);
        await tx.done;
    }

    static async DeleteEpisode(id: string) {
        const db = await openDB('anime-vue-form', 1);
        const tx = db.transaction('episode', 'readwrite');
        const store = tx.objectStore('episode');
        await store.delete(id);
        await tx.done;
    }

    //! Make Efficent
    static async DeleteAnimeAndEpisodes(id: string) {
        const db = await openDB('anime-vue-form', 1);
        const tx = db.transaction('anime', 'readwrite');
        const store = tx.objectStore('anime');
        await store.delete(id);
        await tx.done;

        const tx2 = db.transaction('episode', 'readwrite');
        const store2 = tx2.objectStore('episode');
        const episodes = await store2.getAll();
        await tx2.done;

        const tx3 = db.transaction('episode', 'readwrite');
        const store3 = tx3.objectStore('episode');
        for(const episode of episodes) {
            if(episode.AnimeId == id) {
                await store3.delete(episode.Id);
            }
        }
        await tx3.done;
    }


}