const { TwitterClient } = require("twitter-api-client");

export default async function handler(req, res) {
  const twitterClient = new TwitterClient({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  });

  try {
    const { id } = req.query;

    const { user, text, entities } = await twitterClient.tweets.statusesShow({
      id: id,
    });

    const { statuses } = await twitterClient.tweets.search({
      q: `from:${user.screen_name} to:${user.screen_name} conversation_id:${id}`,
      count: 100,
    });

    let blog_text = `{% twitter ${id} %}\n`;

    statuses
      .reverse()
      .slice(0, 6)
      .forEach((s) => (blog_text += `{% twitter ${s.id_str} %}\n`));

    blog_text += `\n this article is generated using ${process.env.NEXT_PUBLIC_URL}`;

    res.status(200).json({
      title: text.slice(0, 80).replace(/\n/g, " "),
      body_markdown: blog_text,
      tags: entities.hashtags,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}
