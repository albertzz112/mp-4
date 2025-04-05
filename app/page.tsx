'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
    const router = useRouter();
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/artwork?title=${encodeURIComponent(title)}`);
    };

    return (
        <main className="container">
            <h1>Search Artwork</h1>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter artwork title"
                    required
                />
                <button type="submit">Search</button>
            </form>
        </main>
    );
}
