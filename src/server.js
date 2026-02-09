import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { bars, reviews, liveReports } from "./data.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/bars", (req, res) => {
  const { vibe, priceRange } = req.query;
  let results = [...bars];

  if (priceRange) {
    results = results.filter((bar) => bar.priceRange === priceRange);
  }

  if (vibe) {
    results = results.filter((bar) => bar.vibeTags.includes(vibe));
  }

  res.json({ data: results });
});

app.get("/api/bars/:id", (req, res) => {
  const bar = bars.find((item) => item.id === req.params.id);
  if (!bar) {
    res.status(404).json({ error: "Bar not found" });
    return;
  }
  res.json({ data: bar });
});

app.get("/api/bars/:id/reviews", (req, res) => {
  const barReviews = reviews.filter((review) => review.barId === req.params.id);
  res.json({ data: barReviews });
});

app.get("/api/bars/:id/reports", (req, res) => {
  const barReports = liveReports.filter((report) => report.barId === req.params.id);
  res.json({ data: barReports });
});

app.get("/api/compare", (req, res) => {
  const ids = (req.query.ids || "").split(",").filter(Boolean);
  const comparison = bars.filter((bar) => ids.includes(bar.id));
  res.json({ data: comparison });
});

app.listen(port, () => {
  console.log(`BarScout MVP running on http://localhost:${port}`);
});
