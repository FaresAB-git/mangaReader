// src/pages/api/cover.js
export default async function handler(req, res) {
    const { coverId } = req.query;

    if (!coverId) {
        return res.status(400).json({ error: 'Cover ID is required' });
    }

    try {
        const response = await fetch(`https://api.mangadex.org/cover/${coverId}`);
        const coverData = await response.json();

        if (!coverData.data) {
            return res.status(404).json({ error: 'Cover not found' });
        }

        res.status(200).json({ fileName: coverData.data.attributes.fileName });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cover data from MangaDex' });
    }
}
