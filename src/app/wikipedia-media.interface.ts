export interface Titles {
    canonical: string;
    normalized: string;
    display: string;
}

export interface Thumbnail {
    source: string;
    width: number;
    height: number;
    mime: string;
}

export interface Original {
    source: string;
    mime: string;
    width?: number;
    height?: number;
}

export interface Artist {
    html: string;
    name: string;
    user_page: string;
}

export interface License {
    type: string;
    url: string;
}

export interface Caption {
    html: string;
    text: string;
}

export interface Item {
    section_id: number;
    type: string;
    titles: Titles;
    thumbnail: Thumbnail;
    original: Original;
    file_page: string;
    artist: Artist;
    credit: string;
    license: License;
    description: string;
    audio_type: string;
    duration?: number;
    caption: Caption;
}

export interface WikipediaMedia {
    revision: string;
    tid: string;
    items: Item[];
}