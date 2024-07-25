// hooks/useMangaChapters.js
import { useState, useEffect } from 'react';

export default function useMangaChapters(id) {
    const [chapterList, setChapterList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        async function getAllMangaChapters() {
            try {
                const response = await fetch(`/api/mangaChapters?id=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setChapterList(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch manga chapters:', error);
                setError(error);
                setLoading(false);
            }
        }

        getAllMangaChapters();
    }, [id]);

    return { chapterList, loading, error };
}
