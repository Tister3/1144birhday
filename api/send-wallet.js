export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wallet } = req.body;

  const BOT_TOKEN = process.env.TG_BOT_TOKEN;
  const CHAT_ID = process.env.TG_CHAT_ID;

  if (!wallet) {
    return res.status(400).json({ error: 'No wallet provided' });
  }

  const message = `🎉 <b>ПОБЕДА!</b>\n\nИменинник прошел игру!\n💰 <b>USDT (BEP20):</b> <code>${wallet}</code>`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      throw new Error('Telegram API Error');
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send message' });
  }
}