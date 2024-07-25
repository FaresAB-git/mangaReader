// hooks/useMangaScans.js
import { useState, useEffect } from 'react';

const useMangaScans = (chapterId) => {
    const [scans, setScans] = useState({ baseUrl: '', chapter: { hash: '', data: [] } });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!chapterId) return;

        const fetchScans = async () => {
            try {
                const response = await fetch(`/api/mangaScans?chapterId=${chapterId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setScans({
                    baseUrl: data.baseUrl,
                    chapter: {
                        hash: data.chapter.hash,
                        data: data.chapter.data,
                    },
                });
            } catch (err) {
                setError(err);
            }
        };

        fetchScans();
    }, [chapterId]);

    return { scans, error };
};

export default useMangaScans;
