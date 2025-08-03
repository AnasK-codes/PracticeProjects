const { nanoid } = require('nanoid');
const URL = require('../models/url');


async function handleGenerateNewShortURL(req, res) {
  const { redirectURL } = req.body;
  const shortId = nanoid(8);
  if (!redirectURL) {
    return res.status(400).json({ error: 'Redirect URL is required' });
  }
  try {
    const newURL = await URL.create({ shortId, redirectURL, visitHistory: [] });
    return res.status(201).json(newURL);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function handleGetAnalytics(req, res) {
  const { shortId } = req.params;
  try {
    const entry = await URL.findOne({
      shortId,
    });
    if (!entry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    return res.json({
      shortId: entry.shortId,
      redirectURL: entry.redirectURL,
      visitHistory: entry.visitHistory,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};