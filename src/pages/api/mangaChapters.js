export default async function handler(req, res) {
    const { id } = req.query;
    const limit = 100; // Nombre maximum de chapitres par requête
    let offset = 0;
    let allChapters = [];
    let hasMore = true;

    if (!id) {
        return res.status(400).json({ error: 'Manga ID is required' });
    }

    try {
        while (hasMore) {
            const apiUrl = `https://api.mangadex.org/manga/${id}/feed?translatedLanguage[]=en&limit=${limit}&offset=${offset}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            allChapters = allChapters.concat(data.data);

            // Vérifier s'il y a plus de chapitres à récupérer
            hasMore = data.total > allChapters.length;
            offset += limit; // Passer à la page suivante
        }

        // Trier les chapitres par numéro de chapitre en ordre décroissant
        allChapters.sort((a, b) => {
            const chapterA = parseFloat(a.attributes.chapter);
            const chapterB = parseFloat(b.attributes.chapter);

            if (isNaN(chapterA)) return 1;
            if (isNaN(chapterB)) return -1;

            return chapterB - chapterA;
        });

        // Supprimer les doublons
        const uniqueChapters = [];
        const seenChapters = new Set();

        allChapters.forEach(chapter => {
            const chapterNumber = chapter.attributes.chapter;
            if (!seenChapters.has(chapterNumber)) {
                uniqueChapters.push(chapter);
                seenChapters.add(chapterNumber);
            }
        });

        //console.log(uniqueChapters);

        res.status(200).json({ data: uniqueChapters });
    } catch (error) {
        console.error('Failed to fetch manga chapters:', error);
        res.status(500).json({ error: 'Failed to fetch manga chapters' });
    }
}
