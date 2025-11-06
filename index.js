import express from "express";
import twilio from "twilio";

const app = express();
app.use(express.json());

// 🔹 Twilio credentials
const accountSid = "AC07b67072c61ca1651793c18c0a990a10";
const authToken = "20ad8376968010d468c1c11a85ba4b3b";
const fromNumber = "+12626841904"; // तुझा Twilio नंबर
const toNumber = "+917028217782"; // ज्याला कॉल करायचा तो नंबर

app.post("/alert", async (req, res) => {
  try {
    const client = twilio(accountSid, authToken);
    await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: toNumber,
      from: fromNumber,
    });
    res.json({ success: true, message: "📞 Call triggered!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("🚀 Server started on port 3000"));
