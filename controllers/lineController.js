const User = require('../models/lineUser');
const { replyText } = require('../services/lineService');

exports.handleWebhook = async (req, res) => {
  try {
    console.log("✅ Webhook Triggered:", JSON.stringify(req.body, null, 2));

    const event = req.body.events?.[0];
    if (!event) {
      console.log("❌ No event found");
      return res.sendStatus(200);
    }

    const userId = event?.source?.userId;
    const message = event?.message?.text;
    const replyToken = event?.replyToken;

    if (!userId || !message || !replyToken) {
      console.log("❌ Missing data:", { userId, message, replyToken });
      return res.sendStatus(200);
    }

    console.log("📥 userId:", userId);
    console.log("📥 message:", message);

    const result = await User.findOneAndUpdate(
      { userId },
      { lastMessage: message, lastActive: new Date() },
      { upsert: true, new: true }
    );

    console.log("✅ User saved:", result);

    await replyText(replyToken, `คุณพิมพ์ว่า: ${message}`);

    return res.sendStatus(200);
  } catch (err) {
    console.error("❌ Webhook Error:", err?.message || err);
    return res.sendStatus(200);
  }
};