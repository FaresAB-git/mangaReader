// pages/api/mangaScans.js
export default async function handler(req, res) {
    const { chapterId } = req.query;

    if (!chapterId) {
        return res.status(400).json({ error: 'Chapter ID is required' });
    }

    try {
        const response = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch manga scans:', error);
        res.status(500).json({ error: 'Failed to fetch manga scans' });
    }
}
