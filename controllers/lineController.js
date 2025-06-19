const User = require('../models/lineUser'); // ตรวจว่าไฟล์นี้ชื่อจริงเป็น lineUser.js (ตัว l เล็ก) หรือไม่
const { replyText } = require('../services/lineService');

exports.handleWebhook = async (req, res) => {
  try {
    const event = req.body.events?.[0];
    if (!event || !event.message || !event.replyToken) {
      console.log("❌ Invalid event:", JSON.stringify(req.body, null, 2));
      return res.sendStatus(200); // ส่งกลับ 200 เพื่อไม่ให้ LINE หยุดยิง
    }

    const userId = event.source.userId;
    const message = event.message.text;

    const result = await User.findOneAndUpdate(
      { userId },
      { lastMessage: message, lastActive: new Date() },
      { upsert: true, new: true }
    );

    console.log("✅ Saved user:", result);

    await replyText(event.replyToken, `คุณพิมพ์ว่า: ${message}`);

    return res.sendStatus(200);
  } catch (e) {
    console.error('❌ Webhook Error:', e);
    return res.sendStatus(200); // ตอบกลับ LINE เสมอแม้พัง เพื่อไม่ให้ Webhook หยุดทำงาน
  }
}