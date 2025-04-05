import { getArtworkByTitle } from '../lib/harvard';
import Image from 'next/image';

export default async function ArtworkPage({
                                              searchParams,
                                          }: {
    searchParams: { title: string };
}) {
    const title = searchParams.title;

    let artwork;
    try {
        artwork = await getArtworkByTitle(title);
    } catch (e) {
        return <div className="error">Error fetching artwork: {(e as Error).message}</div>;
    }

    if (!artwork) {
        return <div className="error">This is not a valid artwork.</div>;
    }

    return (
        <main className="container">
            <h1>{artwork.title}</h1>
            {artwork.imageUrl && (
                <Image
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    width={300}
                    height={300}
                />
            )}
            <p>{artwork.description || 'No description available.'}</p>
        </main>
    );
}
