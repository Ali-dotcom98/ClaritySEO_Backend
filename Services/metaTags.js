// services/metaTags.js
module.exports = async function getMetaTags(page) {
    return await page.evaluate(() => {
        const pick = sel => document.querySelector(sel)?.content || null;

        const title = document.title || null;
        const description = pick('meta[name="description"]');
        const canonical = document.querySelector('link[rel="canonical"]')?.href || null;
        const charset = document.querySelector('meta[charset]')?.getAttribute('charset') || null;
        const viewport = pick('meta[name="viewport"]');
        const robotsMeta = pick('meta[name="robots"]');
        const ogTitle = pick('meta[property="og:title"]');
        const ogDesc = pick('meta[property="og:description"]');
        const twitterCard = pick('meta[name="twitter:card"]');
        const lang = document.documentElement.lang || null;
        const titleLengthOK = title && title.length >= 50 && title.length <= 60;
        const descriptionLengthOK = description && description.length >= 140 && description.length <= 160;

        return {
            title,
            description,
            canonical,
            charset,
            viewport,
            robotsMeta,
            ogTitle,
            ogDesc,
            twitterCard,
            lang,
            checks: {
                titleLengthOK,
                descriptionLengthOK
            }
        };
    });
};
