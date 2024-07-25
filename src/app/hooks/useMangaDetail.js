// hooks/useMangaDetail.js
import { useState, useEffect } from 'react';

export default function useMangaDetail(id) {
    const [mangaData, setMangaData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        async function getMangaDetail() {
            try {
                const response = await fetch(`/api/mangaDetail?id=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMangaData(data);
                console.log(data)
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch manga details:", error);
                setError(error);
                setLoading(false);
            }
        }

        getMangaDetail();
    }, [id]);
    console.log(mangaData)

    return { mangaData, loading, error };
}
