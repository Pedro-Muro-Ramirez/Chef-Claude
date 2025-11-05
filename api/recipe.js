// api/recipe.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { ingredients } = req.body || {};
    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: "Invalid ingredients format" });
    }

    // Lazy import to keep cold starts small
    const { default: Anthropic } = await import("@anthropic-ai/sdk");

    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_ACCESS_TOKEN, // <-- stays private on Vercel
    });

    const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

    const msg = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `I have ${ingredients.join(", ")}. Please give me a recipe you'd recommend I make!`,
        },
      ],
    });

    return res.status(200).json({ recipe: msg.content?.[0]?.text ?? "" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
