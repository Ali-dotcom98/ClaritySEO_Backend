// services/aiPrompt.js  (OpenAI version)
const { OpenAI } = require("openai");
const dotenv = require("dotenv")
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Ask GPT about a webpage.
 * @param {string} prompt      – User prompt.
 * @param {string} html        – Raw HTML.
 * @param {string} visibleTxt  – Visible text.
 * @returns {string}           – GPT answer.
 */
module.exports = async function askOpenAI(prompt, html, visibleTxt) {
    const combined = `
User question: "${prompt}"

----- HTML (trimmed) -----
${html.slice(0, 6000)}

----- VISIBLE TEXT (trimmed) -----
${visibleTxt.slice(0, 2500)}
  `;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",          // swap to gpt-4o or gpt-3.5-turbo if desired
        temperature: 0.3,
        messages: [
            { role: "system", content: "You are an expert SEO analyst." },
            { role: "user", content: combined }
        ]
    });

    return completion.choices[0].message.content.trim();
};
