const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const askGemini = require('../Services/aiPrompt');

router.post('/', async (req, res) => {
    const { url, prompt } = req.body;
    if (!url || !prompt) {
        return res.status(400).json({ error: 'URL and prompt are required.' });
    }

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        const html = await page.content();
        const text = await page.evaluate(() => document.body.innerText);

        const answer = await askGemini(prompt, html, text);

        await browser.close();
        res.json({ url, prompt, answer });
    } catch (err) {
        console.error('Prompt route error:', err.message);
        res.status(500).json({ error: 'Failed to process AI prompt.' });
    }
});

module.exports = router;
