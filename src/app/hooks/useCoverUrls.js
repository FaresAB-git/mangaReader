import { useState, useEffect } from 'react';

// Fonction pour obtenir les informations de couverture via l'API interne
const fetchCoverFileName = async (coverId) => {
    try {
        const response = await fetch(`/api/covers?coverId=${coverId}`);
        const coverData = await response.json();
        return coverData.fileName;
    } catch (error) {
        console.error('Failed to fetch cover file name:', error);
        return null;
    }
};

const useCoverUrls = (popularManga) => {
    const [coverUrls, setCoverUrls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoverUrls = async () => {
            if (!popularManga || !Array.isArray(popularManga)) {
                setCoverUrls([]);
                setLoading(false);
                return;
            }

            const urls = await Promise.all(popularManga.map(async (manga) => {
                const coverRelation = manga.relationships.find(rel => rel.type === 'cover_art');
                if (coverRelation) {
                    const coverFileName = await fetchCoverFileName(coverRelation.id);
                    if (coverFileName) {
                        return `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}`;
                    }
                }
                return '/default-cover.png'; // URL par défaut si aucune couverture n'est trouvée
            }));

            setCoverUrls(urls);
            setLoading(false);
        };

        fetchCoverUrls();
    }, [popularManga]);

    return { coverUrls, loading };
};

export default useCoverUrls;
