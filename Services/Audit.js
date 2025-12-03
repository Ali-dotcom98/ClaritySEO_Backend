const puppeteer = require('puppeteer');
const getMetaTags = require('./metaTags');
const getHeadings = require('./headings');
const getImageAlts = require('./imageAlt');
const getLoadTime = require('./loadTime');
const checkMobile = require('./mobileCheck');
const checkRobots = require('./robotsSitemap');
const calculateScore = require('./calculateScore');
const getBrokenLinks = require("./brokenLinks");

async function auditPage(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    const [metaTags, headings, imageAltData, loadTime, mobileFriendly, robotData] = await Promise.all([
        getMetaTags(page),
        getHeadings(page),
        getImageAlts(page),
        getLoadTime(page),
        checkMobile(page),
        checkRobots(url)
    ]);

    const suggestions = [];

    if (!metaTags.title) suggestions.push("Missing title tag");
    if (!mobileFriendly.hasViewport) suggestions.push("Missing viewport meta tag");
    if (imageAltData.missingAlt > 0) suggestions.push("Some images are missing alt attributes");

    const score = calculateScore({
        metaTags,
        headings,
        imageAltData,
        loadTime,
        mobileFriendly,
        robotData
    });

    await browser.close();

    return {
        url,
        metaTags,
        headings,
        imageAltData,
        loadTime,
        mobileFriendly,
        robotData,
        suggestions,
        score
    };
}

module.exports = auditPage;
