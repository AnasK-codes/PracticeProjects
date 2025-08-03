/**
 * URL Shortener API
 * 
 * A simple and efficient URL shortening service built with Express and MongoDB.
 * Features:
 * - URL shortening with custom short IDs
 * - Analytics tracking for URL visits
 * - Clean and responsive UI
 * - Visit history tracking
 */

const express = require("express");
const app = express();
const path = require("path");
const { connectDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

connectDB("mongodb://localhost:27017/urlshortener")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/url', urlRoute);

app.get('/analytics/:shortId', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'analytics.html'));
});

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now()
          }
        }
      }
    );

    if (!entry) {
      return res.status(404).send('URL not found');
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});