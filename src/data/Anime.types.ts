export type Anime = {
    Id: string
    IdMal?: number,
    Title: string,
    PosterLink?: string,
    Start?: Date,
    End?: Date,
    Description?: string,
    MalScore?: number,
    MediaType: string,
    AiringStatus?: string,
    EpisodeCount: number,
    Year: number,
    Season: string,
    Source?: string,
    Rating?: number,
    Studios?: [string],
    StartWatch?: Date,
    EndWatch?: Date,
    //Watching, EndWatch null
    //Not Started, StartWatch EndWatch null
    //Stalled
    //Dropped
    //Finished, StatWatch EndWatch filled
    WatchStatus?: String,
    LastWatched?: Date
}