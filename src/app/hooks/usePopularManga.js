import { useState, useEffect } from 'react';

const usePopularManga = (url) => {
  const [mangas, setMangas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularManga = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET', // Ajout explicite de la méthode GET
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data from API:", data); // Ajout de ce log pour vérifier les données
        setMangas(data.data);
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
