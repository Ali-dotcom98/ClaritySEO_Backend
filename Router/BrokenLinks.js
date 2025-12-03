const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");
const getBrokenLinks = require("../Services/brokenLinks");

router.get("/", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

        const brokenLinkData = await getBrokenLinks(page, url);

        await browser.close();
        res.json(brokenLinkData);
    } catch (err) {
        console.error("Broken link check failed:", err.message);
        res.status(500).json({ error: "Failed to check broken links" });
    }
});

module.exports = router;
