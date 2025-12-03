module.exports = function calculateScore(data) {
    const breakdown = {};
    let totalScore = 100;

    // Scoring weights
    const weights = {
        missingTitle: 10,
        missingViewport: 10,
        missingAltText: 5,
        noRobotsTxt: 5,
        noSitemapXml: 5
    };

    // Title tag
    if (!data.metaTags.title) {
        breakdown.title = -weights.missingTitle;
        totalScore -= weights.missingTitle;
    } else {
        breakdown.title = 0;
    }

    // Mobile viewport
    if (!data.mobileFriendly?.hasViewport) {
        breakdown.viewport = -weights.missingViewport;
        totalScore -= weights.missingViewport;
    } else {
        breakdown.viewport = 0;
    }

    // Alt text
    if (data.imageAltData?.missingAlt > 0) {
        breakdown.altText = -weights.missingAltText;
        totalScore -= weights.missingAltText;
    } else {
        breakdown.altText = 0;
    }

    // robots.txt
    if (!data.robotData?.robots?.exists) {
        breakdown.robotsTxt = -weights.noRobotsTxt;
        totalScore -= weights.noRobotsTxt;
    } else {
        breakdown.robotsTxt = 0;
    }

    // sitemap.xml
    if (!data.robotData?.sitemap?.exists) {
        breakdown.sitemapXml = -weights.noSitemapXml;
        totalScore -= weights.noSitemapXml;
    } else {
        breakdown.sitemapXml = 0;
    }

    return {
        totalScore: Math.max(totalScore, 0),
        breakdown
    };
};
