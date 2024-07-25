// src/pages/api/mangaDetail.js
export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Manga ID is required' });
    }

    try {
        const response = await fetch(`https://api.mangadex.org/manga/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch manga details:', error);
        res.status(500).json({ error: 'Failed to fetch manga details' });
    }
}
