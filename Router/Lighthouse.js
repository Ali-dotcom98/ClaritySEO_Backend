const express = require("express");
const router = express.Router();
const runLighthouse = require("../Services/lighthouseAudit");

router.post("/", async (req, res) => {
    const { url } = req.body;
    console.log(url);

    if (!url) return res.status(400).json({ error: "URL is required." });

    const result = await runLighthouse(url);
    if (!result) {
        return res.json({ Message: "Issues" })
    }
    res.json(result);
});

module.exports = router;
