const fetch = require("node-fetch");

export default async function handler(req, res) {
  const { title, body_markdown, tags } = req.body;

  const token = req.headers.authorization.split(" ")[1];

  // remove emojis in cover image url
  let t = title.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    " "
  );

  // replace whitespace with %20
  const imgUrl = `https://og-image.vercel.app/${t.split(" ").join("%20")}.png`;

  try {
    const response = await fetch("https://dev.to/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": token,
      },
      body: JSON.stringify({
        article: {
          title: title,
          body_markdown: body_markdown,
          published: false,
          tags: tags,
          main_image: imgUrl,
        },
      }),
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}
