import express from "express";
import twilio from "twilio";

const app = express();
app.use(express.json());

// 🔹 Twilio credentials (इथे तुझे actual values टाक)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM;
const toNumber = process.env.TWILIO_TO;

app.post("/alert", async (req, res) => {
  try {
    const client = twilio(accountSid, authToken);

    await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: toNumber,
      from: fromNumber,
    });

    res.json({ success: true, message: "📞 Call sent successfully!" });
  } catch (err) {
    console.error("Twilio Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("✅ Alert API running!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
