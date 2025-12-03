module.exports = async function getImageAlts(page) {
    return await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));

        const totalImages = images.length;
        const missingAltImages = [];
        const emptyAltImages = [];

        images.forEach(img => {
            const alt = img.getAttribute('alt');
            const src = img.getAttribute('src');

            if (!alt || alt.trim() === '') {
                missingAltImages.push({ src, alt });
            } else if (alt.trim() === '') {
                emptyAltImages.push({ src, alt });
            }
        });

        const missingAlt = missingAltImages.length;
        const emptyAlt = emptyAltImages.length;
        const percentMissing = totalImages ? Math.round((missingAlt / totalImages) * 100) : 0;

        return {
            totalImages,
            missingAlt,
            emptyAlt,
            percentMissing,
            missingAltImages,
            checks: {
                hasMissingAlts: missingAlt > 0,
                tooManyMissing: percentMissing > 20
            }
        };
    });
};
