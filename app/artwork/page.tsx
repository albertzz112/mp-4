'use client'; // Client-side component

import { useSearchParams } from 'next/navigation'; // For fetching query parameters
import { useEffect, useState } from 'react'; // Hooks for state and side effects
import { getArtworkByTitle } from '../lib/harvard'; // Data fetching function
import Image from 'next/image';

// Define the structure of artwork data
interface Artwork {
    title: string;
    imageUrl?: string;
    description?: string;
}

export default function ArtworkPage() {
    const searchParams = useSearchParams(); // Get search params
    const title = searchParams.get('title'); // Extract 'title' from the URL query string

    const [artwork, setArtwork] = useState<Artwork | null>(null); // Store the fetched artwork
    const [error, setError] = useState<string | null>(null); // For error handling

    useEffect(() => {
        if (!title) return; // If no title, skip fetching

        const fetchArtwork = async () => {
            try {
                const result = await getArtworkByTitle(title); // Fetch the artwork based on title
                if (!result) {
                    setError('This is not a valid artwork.'); // Handle case where artwork is not found
                } else {
                    setArtwork(result); // Set fetched artwork
                }
            } catch (e) {
                setError('Error fetching artwork: ' + (e as Error).message); // Handle fetch error
            }
        };

        fetchArtwork();
    }, [title]); // Fetch artwork whenever 'title' changes

    // If there's an error, display the error message
    if (error) {
        return <div className="error">{error}</div>;
    }

    // If artwork is not yet loaded, show loading message
    if (!artwork) {
        return <div className="error">Loading...</div>;
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