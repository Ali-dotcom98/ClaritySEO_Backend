const chromeLauncher = require("chrome-launcher");

module.exports = async function runLighthouse(url) {
    const lighthouse = await import("lighthouse"); // <-- dynamic import

    const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

    const options = {
        logLevel: "info",
        output: "json",
        onlyCategories: ["performance", "accessibility", "seo", "best-practices"],
        port: chrome.port,
    };

    try {
        const runnerResult = await lighthouse.default(url, options);

        const scores = {
            performance: runnerResult.lhr.categories.performance.score * 100,
            accessibility: runnerResult.lhr.categories.accessibility.score * 100,
            seo: runnerResult.lhr.categories.seo.score * 100,
            bestPractices: runnerResult.lhr.categories["best-practices"].score * 100,
        };

        await chrome.kill();

        return {
            success: true,
            scores,
            fullReport: runnerResult.report,
        };
    } catch (err) {
        await chrome.kill();
        console.error("Lighthouse error:", err.message);
        return {
            success: false,
            error: "Lighthouse audit failed.",
        };
    }
};
