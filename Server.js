
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors")



app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['POST', 'GET', 'OPTIONS'],
    })
);

const AuditRoutes = require('./Router/Audit_Page');
const Lighthouse = require("./Router/Lighthouse")
const BrokenLink = require("./Router/BrokenLinks");
const PromptRoute = require("./Router/Prompt")

app.use('/audit', AuditRoutes);
app.use("/lighthouse", Lighthouse)
app.use("/BD", BrokenLink)
app.use("/prompt", PromptRoute)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
