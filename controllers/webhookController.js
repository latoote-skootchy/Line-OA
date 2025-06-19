exports.handleWebhook = async (req, res) => {
  const events = req.body.events;

  for (const event of events) {
    const userId = event.source.userId;
    const message = event.message?.text || '';

    // 🔁 ตรงนี้คุณจะส่งข้อความกลับ หรือเก็บ userId ลง MongoDB ก็ได้
    console.log(`[EVENT] User ${userId} ส่ง: ${message}`);
  }

  res.status(200).send('OK');
};
