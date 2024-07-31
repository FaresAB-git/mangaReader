import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 7200 }); // TTL de 10 minutes

export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const cachedData = cache.get('lastUpdatedManga');
  
    if (cachedData) {
      return res.status(200).json({ data: cachedData });
    }
  
    try {
      const response = await fetch('https://api.mangadex.org/manga?limit=20&contentRating[]=safe&contentRating[]=suggestive&order[latestUploadedChapter]=desc&includes[]=author&includes[]=artist&includes[]=cover_art&includes[]=chapter&includes[]=manga&availableTranslatedLanguage[]=en');
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
  
      // Stocker les résultats dans le cache
      cache.set('lastUpdatedManga', filteredManga);
  
      res.status(200).json({ data: filteredManga });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from MangaDex' });
    }
  }