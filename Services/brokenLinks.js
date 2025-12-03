const axios = require("axios");
const { URL } = require("url");

module.exports = async function getBrokenLinks(page, baseUrl) {
    const links = await page.$$eval("a[href]", as =>
        as.map(a => a.href).filter(Boolean)
    );

    const origin = new URL(baseUrl).origin;

    const results = [];

    const uniqueLinks = [...new Set(links)];

    for (const link of uniqueLinks) {

        if (!link.startsWith(origin)) continue;

        try {
            const res = await axios.head(link, { timeout: 5000 });
            const status = res.status;
            if (status >= 400) {
                results.push({ url: link, status, ok: false });
            }
        } catch (err) {
            results.push({ url: link, status: "Request Failed", ok: false });
        }
    }

    return {
        totalChecked: uniqueLinks.length,
        broken: results.length,
        brokenLinks: results,
    };
};
