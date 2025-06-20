const express = require('express');
const youtube = require('youtube-search-api');
const app = express();

app.get('/search', async (req, res) => {
    const q = req.query.q || 'mu cang chai';
    const limit = parseInt(req.query.limit) || 10;

    const data = await youtube.GetListByKeyword(q, false, limit);

    const videos = data.items
        .filter(item => item.type === "video")
        .map(item => ({
            title: item.title,
            videoId: item.id,
            duration: item.length.simpleText,
            thumbnail: item.thumbnail.thumbnails?.[0]?.url || '',
            link: `https://www.youtube.com/watch?v=${item.id}`
        }));

    res.json(videos);
});

app.listen(3002, () => {
    console.log('YouTube Search API running on http://localhost:3002');
});
