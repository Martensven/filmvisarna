export interface Genre {
    _id: string;
    title: string;
}

export interface Actor {
    _id: string;
    name: string;
}

export interface Director {
    _id: string;
    name: string;
}

export interface Distributor {
    _id: string;
    name: string;
}

export interface Theme {
    _id: string;
    themeDesc: string;
}

export interface MovieInput {
    title: string;
    imageSrc: string;
    releaseYear: number;
    age: number;
    length: number;
    description: string;
    youtubeTrailers: string;
    genres: string[];
    actors: string[]; 
    directors: string[];
    distributors: string[];
    themes: string;
    scheduleType: "smallTheater" | "bigTheater";
}