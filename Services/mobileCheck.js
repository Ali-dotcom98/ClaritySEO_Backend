module.exports = async function checkMobile(page) {
    return await page.evaluate(() => {
        const viewportTag = document.querySelector('meta[name="viewport"]');
        const content = viewportTag?.getAttribute('content') || null;

        const isResponsive = content?.includes('width=device-width') && content.includes('initial-scale=1');

        return {
            hasViewport: !!viewportTag,
            content,
            isResponsive
        };
    });
};
