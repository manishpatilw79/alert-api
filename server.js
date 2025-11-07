import express from "express";
import twilio from "twilio";

const app = express();
app.use(express.json());

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post("/alert", async (req, res) => {
  try {
    const call = await client.calls.create({
      to: process.env.TWILIO_TO,
      from: process.env.TWILIO_FROM,
      url: "http://demo.twilio.com/docs/voice.xml",
    });
    res.json({ success: true, sid: call.sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
