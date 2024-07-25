// pages/api/proxyImage.js
export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        console.log('Fetching URL:', url);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Afficher les en-têtes de la réponse
        response.headers.forEach((value, name) => {
            console.log(`${name}: ${value}`);
        });

        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const arrayBuffer = await response.arrayBuffer(); // Utiliser arrayBuffer() pour obtenir les données sous forme de tampon

        const buffer = Buffer.from(arrayBuffer); // Convertir arrayBuffer en Buffer

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Length', buffer.length);
        res.end(buffer); // Utiliser res.end pour envoyer la réponse
    } catch (error) {
        console.error('Failed to fetch image:', error);
        res.status(500).json({ error: 'Failed to fetch image' });
    }
}

