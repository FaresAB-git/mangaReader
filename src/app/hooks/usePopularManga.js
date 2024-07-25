import { useState, useEffect } from 'react';

const usePopularManga = (url) => {
  const [mangas, setMangas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularManga = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Data from API:", data); // Ajout de ce log pour vérifier les données

        // Vérifier les chapitres disponibles pour chaque manga
        const mangaWithChapters = await Promise.all(
          data.data.map(async (manga) => {
            const feedResponse = await fetch(`https://api.mangadex.org/manga/${manga.id}/feed?translatedLanguage[]=en`);
            const feedData = await feedResponse.json();
            if (feedData.data.length > 0) {
              return manga;
            }
            return null;
          })
        );

        // Filtrer les mangas null (ceux sans chapitres disponibles)
        const filteredManga = mangaWithChapters.filter(manga => manga !== null);

        setMangas(filteredManga);
      } catch (error) {
        setError(error);
      }
    };

    fetchPopularManga();
  }, [url]);

  console.log("Returning from hook: ", { mangas, error }); // Log added here

  return { mangas, error };
};

export default usePopularManga;
