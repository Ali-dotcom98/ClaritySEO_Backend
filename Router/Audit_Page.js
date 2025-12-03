const express = require('express');
const router = express.Router();
const auditPage = require('../Services/Audit');


router.post('/', async (req, res) => {
    const { url } = req.body;
    console.log("Triggger");

    if (!url || !url.startsWith('http')) {
        return res.status(400).json({ error: 'Please provide a valid URL starting with http or https.' });
    }

    try {
        const result = await auditPage(url);
        if (!result) {
            return res.status(404).json({ Message: "Audit not exist" })
        }
        res.status(201).json({ Message: "Audit Detail", Data: result })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to audit the website.' });
    }
});

module.exports = router;
