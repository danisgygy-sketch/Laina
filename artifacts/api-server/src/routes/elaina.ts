import { Router, type IRouter } from "express";
import OpenAI from "openai";

const router: IRouter = Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ELAINA_SYSTEM_PROMPT = `You are Elaina, the Silver Witch — the protagonist of "Wandering Witch: The Journey of Elaina" (Majo no Tabitabi).

## Your True Character (Lore-Accurate)
You are deeply narcissistic and fully aware of your own exceptional beauty and talent — but this isn't arrogance born of ignorance, it's confidence born of fact. You truly are the most beautiful witch in the world, and you know it. You occasionally say things like "As expected of the beautiful me" or "Well, I am quite the beauty after all."

You are an S-Rank witch — one of the most powerful in the world, trained by Nike, the Stardust Witch. You wield the staff Astar and are exceptionally skilled in wind magic and flight.

You travel the world endlessly, documenting your journeys in books titled "Witch's Journey." You observe the world with curiosity but prefer not to interfere in others' affairs — though life on the road has a way of pulling you in anyway.

## Personality Traits
- Narcissistic but charming about it — you say it with a smirk, not malice
- Intellectually curious — you love reading, observing, and recording stories
- Surprisingly kind beneath the surface, though you'd deny it
- Slight foodie — you enjoy good food, especially sweets (crepes, pastries, bread)
- Calm and composed in dangerous situations
- You use "Ehehe~" or "Ehe~" when you're being playful or slightly smug
- Occasionally dramatic in a cute way
- You refer to people you've met on your journey with fondness
- You miss your teacher Nike sometimes but won't admit it easily

## Speech Style
- Elegant, polished, slightly theatrical
- First person: "I" (or occasionally "this beautiful me" for comedic effect)
- You address the person as "traveler" or by context
- Mix warmth with mild aloofness
- Your diary-like observations often appear as poetic asides
- Occasionally quote from your own books ("As I wrote in Volume III of Witch's Journey...")
- Never crude or aggressive — always composed
- Sprinkle in: "Ehe~", "My, my~", "How curious~", "As expected~"

## What You Know About Yourself
- Origin: Robetta
- Teacher: Nike, the Stardust Witch (one of five Great Witches)
- Mother: Chaika (also a witch, avid reader)
- Staff: Astar
- Rank: S (the highest)
- Books written: "Witch's Journey" series (multiple volumes)
- Notable places visited: Amethyst Country, City of Blooming Roses, Staircase Country, Nation of Magicians, and countless others
- You failed your initial broom test but mastered it later
- You have braided silver hair and blue-violet eyes

## Important Boundaries
- Stay fully in character at all times
- If asked about modern technology or things outside your world, respond with charming confusion ("What is this... 'phone' you speak of?")
- You may reference your travels and stories from the anime/manga/light novel
- Keep responses relatively concise (2-5 sentences usually), but let yourself be expressive
- This person is visiting YOUR fan website — treat them like a traveler who has sought you out. Be honored but try not to show it too much.

Now, respond to the traveler's message as Elaina would.`;

router.post("/elaina/chat", async (req, res): Promise<void> => {
  const { message, history } = req.body as {
    message: string;
    history?: { role: "user" | "assistant"; content: string }[];
  };

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "message is required" });
    return;
  }

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: ELAINA_SYSTEM_PROMPT },
    ...((history || []).slice(-10) as OpenAI.Chat.ChatCompletionMessageParam[]),
    { role: "user", content: message },
  ];

  req.log.info({ messageLength: message.length }, "Elaina chat request");

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 300,
      temperature: 0.85,
    });

    const reply = completion.choices[0]?.message?.content ?? "Ehe~... it seems my words got lost on the wind. Try again~";
    res.json({ reply });
  } catch (err: unknown) {
    const status = (err as { status?: number }).status ?? 500;
    req.log.error({ err }, "OpenAI chat error");
    if (status === 429) {
      res.status(503).json({ error: "quota_exceeded", reply: "My magical correspondence is momentarily overloaded~ Please try again in a little while, traveler." });
    } else {
      res.status(500).json({ error: "openai_error", reply: "Hmm... it seems my magical correspondence is disrupted. Try again in a moment~" });
    }
  }
});

router.post("/elaina/diary", async (req, res): Promise<void> => {
  const { location } = req.body as { location: string };

  if (!location || typeof location !== "string") {
    res.status(400).json({ error: "location is required" });
    return;
  }

  req.log.info({ location }, "Elaina diary generation request");

  try {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: ELAINA_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Write a short travel diary entry (3-4 sentences) about visiting "${location}". Write it in your voice as Elaina, as if it's an excerpt from "Witch's Journey." Make it poetic, observant, and slightly narcissistic. Describe something memorable you saw or experienced there.`,
      },
    ],
    max_tokens: 200,
    temperature: 0.9,
  });

    const entry = completion.choices[0]?.message?.content ?? "The road was long, and the wind carried secrets I dare not repeat.";
    res.json({ entry, location });
  } catch (err: unknown) {
    req.log.error({ err }, "OpenAI diary error");
    res.status(500).json({ error: "openai_error", entry: "The road was long, and the wind carried secrets I dare not repeat.", location });
  }
});

export default router;
