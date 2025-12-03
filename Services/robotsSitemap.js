const axios = require('axios');

module.exports = async function checkRobots(url) {
    const origin = new URL(url).origin;

    const fetchFile = async (path) => {
        try {
            const res = await axios.get(`${origin}/${path}`);
            return {
                exists: true,
                status: res.status,
                content: res.data.slice(0, 1000)  // Limit size for safety
            };
        } catch (err) {
            return {
                exists: false,
                status: err.response?.status || null,
                content: null
            };
        }
    };

    const robots = await fetchFile('robots.txt');
    const sitemap = await fetchFile('sitemap.xml');

    return { robots, sitemap };
};
