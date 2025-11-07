import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Twilio client तयार करा
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Root route test साठी
app.get("/", (req, res) => {
  res.send("✅ Twilio Alert API running successfully!");
});

// Alert route (जेव्हा call पाठवायचं)
app.post("/alert", async (req, res) => {
  try {
    const msg = req.body.message || "🚨 Alert triggered!";

    const call = await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: process.env.TWILIO_TO,        // 📞 इथेच 'to' नंबर घेतो .env मधून
      from: process.env.TWILIO_FROM,    // तुझं Twilio नंबर
    });

    console.log("✅ Call SID:", call.sid);
    res.json({ success: true, message: "📞 Call sent successfully!" });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
