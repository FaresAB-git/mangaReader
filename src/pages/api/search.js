// pages/api/search.js
export default async function handler(req, res) {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const response = await fetch(`https://api.mangadex.org/manga?title=${title}&limit=30`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const mangaResults = await Promise.all(data.data
            .filter(manga => !manga.attributes.tags.some(tag => tag.attributes.name.en === 'Doujinshi' || tag.attributes.name.en === 'Fan-Made'))
            .map(async (manga) => {
                const coverArt = manga.relationships.find(rel => rel.type === 'cover_art');

                if (coverArt) {
                    const coverResponse = await fetch(`https://api.mangadex.org/cover/${coverArt.id}`);
                    const coverData = await coverResponse.json();
                    const coverFileName = coverData.data.attributes.fileName;
                    const imageUrl = `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}`;
                    return {
                        id: manga.id,
                        title: manga.attributes.title.en || manga.attributes.title['ja'],
                        imageUrl
                    };
                }

                return {
                    id: manga.id,
                    title: manga.attributes.title.en || manga.attributes.title['ja'],
                    imageUrl: '' // default or placeholder image if no cover art
                };
            })
        );

        res.status(200).json(mangaResults);
    } catch (error) {
        console.error('Failed to fetch manga search results:', error);
        res.status(500).json({ error: 'Failed to fetch manga search results' });
    }
}
