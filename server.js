const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'AURA-ADMIN-2026';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '/')));

let animeList = [];

app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD || password === '[AURA-ADMIN-2026]') {
        return res.json({ success: true, token: 'aura-secure-admin-token' });
    }
    return res.status(401).json({ success: false, message: 'Invalid password' });
});

app.get('/api/anime', (req, res) => {
    res.json(animeList);
});

app.post('/api/anime', (req, res) => {
    const anime = req.body;
    const index = animeList.findIndex(a => a.id === anime.id);
    if (index >= 0) {
        animeList[index] = anime;
    } else {
        animeList.unshift(anime);
    }
    res.json({ success: true, anime });
});

app.delete('/api/anime/:id', (req, res) => {
    const { id } = req.params;
    animeList = animeList.filter(a => a.id !== id);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Aura Anime Server running on port ${PORT}`);
});
