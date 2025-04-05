'use server';

const API_KEY = process.env.HARVARD_API_KEY;
const BASE_URL = 'https://api.harvardartmuseums.org/object';

type ArtworkRecord = {
    title: string;
    primaryimageurl?: string;
    description?: string;
};

type HarvardAPIResponse = {
    records: ArtworkRecord[];
};

export async function getArtworkByTitle(title: string) {
    const url = `${BASE_URL}?apikey=${API_KEY}&q=${encodeURIComponent(title)}&hasimage=1`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
    }

    const data: HarvardAPIResponse = await res.json();

    const obj = data.records?.find(
        (record) => record.primaryimageurl && record.description
    );

    if (!obj) return null;

    return {
        title: obj.title,
        imageUrl: obj.primaryimageurl,
        description: obj.description,
    };
}
