const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

// GET /api/recommend-slots?date=2026-01-25
router.get("/recommend-slots", async (req, res) => {
  const selectedDate = req.query.date;

  if (!selectedDate) {
    return res.status(400).json({ error: "Date is required" });
  }

  try {
    // Run Python script
    const python = spawn("py", [
      "./ml/recommend_slots.py",
      selectedDate, // ← sent to python
    ]);

    let output = "";
    python.stdout.on("data", (data) => {
      output += data.toString();
      console.log(output);
    });

    python.stderr.on("data", (data) => {
      console.error("Python Error:", data.toString());
    });

    python.on("close", () => {
      try {
        const parsed = JSON.parse(output);

        // Convert to simple list → ["10-12", "12-14", "16-18"]
        const recommended = parsed.map((obj) => obj.slot);

        res.json({
          date: selectedDate,
          recommendedSlots: recommended,
        });
      } catch (err) {
        console.error("JSON parse error:", err);
        res.status(500).json({ error: "AI model output invalid" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
