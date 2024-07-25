// pages/api/popularManga.js
export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    try {
      const response = await fetch('https://api.mangadex.org/manga?order[followedCount]=desc&limit=10');
      const data = await response.json();
  
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
  
      res.status(200).json({ data: filteredManga });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from MangaDex' });
    }
  }
  