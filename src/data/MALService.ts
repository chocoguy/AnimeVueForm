import axios from 'axios';
import { Anime } from './Anime.types';


//REMOVE BEFORE COMMIT
var client_id: string = ""
//REMOVE BEFORE COMMIT

const MALService = axios.create({
    baseURL: "https://corsproxy.io/?https://api.myanimelist.net/v2",
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "X-MAL-Client-ID": client_id,
    }
})

export default {
    async SearchAnime(query: string, limit: number = 6) {
        const response = await MALService.get(`/anime?q=${query}&limit=${limit}`);
        return response.data.data;
    },

    async GetAnime(id: string) {
        const response = await MALService.get(`/anime/${id}?fields=id,title,main_picture,start_date,end_date,synopsis,mean,media_type,status,num_episodes,start_season,broadcast,source,rating,studios`);
        return response.data;
    }

}

