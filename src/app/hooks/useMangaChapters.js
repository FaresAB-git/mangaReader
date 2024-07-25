// hooks/useMangaChapters.js
import { useState, useEffect } from 'react';

export default function useMangaChapters(id) {
    const [chapterList, setChapterList] = useState(null);

    useEffect(() => {
        if (!id) return;

        async function getAllMangaChapters() {
            const limit = 100; // Nombre maximum de chapitres par requête
            let offset = 0;
            let allChapters = [];
            let hasMore = true;

            while (hasMore) {
                const apiUrl = `https://api.mangadex.org/manga/${id}/feed?translatedLanguage[]=en&limit=${limit}&offset=${offset}`;
                try {
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();
                    allChapters = allChapters.concat(data.data);

                    // Vérifier s'il y a plus de chapitres à récupérer
                    hasMore = data.total > allChapters.length;
                    offset += limit; // Passer à la page suivante
                } catch (error) {
                    console.error('Failed to fetch manga chapters:', error);
                    hasMore = false; // Arrêter en cas d'erreur
                }
            }

            allChapters.sort((a, b) => {
                const chapterA = parseFloat(a.attributes.chapter);
                const chapterB = parseFloat(b.attributes.chapter);

                if (isNaN(chapterA)) return 1;
                if (isNaN(chapterB)) return -1;

                return chapterB - chapterA;
            });

            setChapterList(allChapters);
            console.log(allChapters)
        }

        getAllMangaChapters();
    }, [id]);

    return chapterList;
}
