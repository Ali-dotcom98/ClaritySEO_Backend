module.exports = async function getLoadTime(page) {
    return await page.evaluate(() => {
        const [nav] = performance.getEntriesByType('navigation');
        return { firstContentfulPaint: nav.responseStart - nav.requestStart };
    });
};
