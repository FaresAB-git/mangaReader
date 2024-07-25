// hooks/useMangaDetail.js
import { useState, useEffect } from 'react';

export default function useMangaDetail(id) {
    const [mangaData, setMangaData] = useState(null);

    useEffect(() => {
        if (!id) return;

        async function getMangaDetail() {
            try {
                const response = await fetch(`https://api.mangadex.org/manga/${id}`);
                const data = await response.json();
                setMangaData(data);
                console.log(data);
            } catch (error) {
                console.error("Failed to fetch manga details:", error);
            }
        }

        getMangaDetail();
    }, [id]);

    return mangaData;
}
