// services/headings.js
module.exports = async function getHeadings(page) {
    return await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(el => ({
            tag: el.tagName.toLowerCase(),
            text: el.innerText.trim()
        }));


        const counts = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 };
        headings.forEach(h => counts[h.tag]++);


        let previousLevel = 0;
        let skippedLevels = false;

        headings.forEach(({ tag }) => {
            const level = Number(tag.slice(1));
            if (previousLevel && level > previousLevel + 1) skippedLevels = true;
            previousLevel = level;
        });
        const multipleH1 = counts.h1 > 1;
        const missingH1 = counts.h1 === 0;

        return {
            counts,
            headings,
            checks: {
                multipleH1,
                missingH1,
                skippedLevels
            }
        };
    });
};
