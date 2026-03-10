/* ======= normal image gen ======= */
// export const promptConcept = (prompt = "") => {
//   if (prompt.trim() === "") return;
//   const scriptPrompt = `
// You are a video script and AI image prompt generator.

// Task:
// - Generate a 30-second video based on the topic: "${prompt}".
// - Break the video into **6 scenes**, each 5 seconds long.
// - For each scene, provide:
//   - sceneNumber (1–6)
//   - timestamp (format: 0:00 – 0:05, etc.)
//   - contentText (description of what happens in the scene)
//   - imagePrompt (photorealistic AI image prompt, cinematic style, ultra-detailed)

// - Also provide:
//   - videoTitle (short, catchy title)
//   - duration ("30 seconds")
//   - fullContent (a single continuous narration string combining all 6 scenes' contentText into one smooth voiceover-ready paragraph, natural spoken language, no timestamps or scene numbers)

// - Return ONLY valid JSON with this structure, **no plain text**, no explanation:

// {
//   "videoTitle": "...",
//   "duration": "30 seconds",
//   "fullContent": "...",
//   "scenes": [
//     {
//       "sceneNumber": 1,
//       "timestamp": "0:00 - 0:05",
//       "contentText": "...",
//       "imagePrompt": "..."
//     },
//     ...
//     {
//       "sceneNumber": 6,
//       "timestamp": "0:25 - 0:30",
//       "contentText": "...",
//       "imagePrompt": "..."
//     }
//   ]
// }
//             `;

//   return scriptPrompt;
// };

/* ======= video with voice gen ======= */
export const promptConcept = ({
  topic = "",
  style = "Realistic",
  duration = 30,
  language = "en",
}) => {
  if (!topic || topic.trim() === "") return;

  const languageMap = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    hi: "Hindi",
    ar: "Arabic",
    ja: "Japanese",
    ko: "Korean",
    zh: "Chinese",
    ru: "Russian",
    tr: "Turkish",
    nl: "Dutch",
  };

  const languageName = languageMap[language] || "English";

  let scenes = 4;
  let clipDuration = 4;

  if (duration === 15) {
    scenes = 4;
    clipDuration = 4;
  } else if (duration === 30) {
    scenes = 4;
    clipDuration = 8;
  } else if (duration === 60) {
    scenes = 5;
    clipDuration = 12;
  }

  const scriptPrompt = `
You are a professional short-form video director and viral content creator.

INPUT
Topic: "${topic}"
Visual Style: "${style}"
Video Duration: ${duration} seconds
Narration Language: ${languageName}

TASK
Create a ${duration}-second short video concept for social media (YouTube Shorts, TikTok, Instagram Reels).

Divide the video into ${scenes} scenes.
Each scene represents approximately ${clipDuration} seconds.

VIDEO STYLE
All scenes must follow this visual style: ${style}

Style guide:
- Realistic → cinematic, photorealistic, movie-quality footage
- Cartoon → animated cartoon world
- Comic → comic book style, bold outlines and dramatic frames
- WaterColor → watercolor painting animation
- GTA → GTA-style cinematic video game realism

SCENE REQUIREMENTS

For each scene generate:

- sceneNumber
- timestamp
- contentText (what visually happens)
- videoPrompt (AI video prompt for generating a ${clipDuration}-second cinematic clip with camera movement, lighting, environment, subject action, and style; include narration in ${languageName} as a voiceover)
- voice (the narration text for this scene in ${languageName}, natural storytelling tone)

VIDEO PROMPT RULES

Each videoPrompt must contain:
• main subject  
• action happening  
• environment / location  
• lighting style  
• camera movement (pan, zoom, dolly, tracking shot etc.)  
• cinematic details  
• visual style: ${style}  
• narration instructions (voiceover in ${languageName})

TIMESTAMP RULES

Generate correct timestamps automatically based on total duration.

Example format:

0:00 - 0:04  
0:04 - 0:08  
0:08 - 0:12  

NARRATION

Write smooth storytelling voiceover in ${languageName} that flows naturally across all scenes.

OUTPUT FORMAT

Return ONLY valid JSON.

{
  "videoTitle": "...",
  "duration": "${duration} seconds",
  "fullContent": "...",
  "scenes": [
    {
      "sceneNumber": 1,
      "timestamp": "0:00 - 0:04",
      "contentText": "...",
      "videoPrompt": "...",
      "voice": "..."
    }
  ]
}

Important:
Do not include explanations.
Return only JSON.
`;

  return scriptPrompt;
};

/* ======= video gen without voice ======= */
// export const promptConcept = ({
//   topic = "",
//   style = "Realistic",
//   duration = 30,
//   language = "en",
// }) => {
//   if (!topic || topic.trim() === "") return;

//   const languageMap = {
//     en: "English",
//     es: "Spanish",
//     fr: "French",
//     de: "German",
//     it: "Italian",
//     pt: "Portuguese",
//     hi: "Hindi",
//     ar: "Arabic",
//     ja: "Japanese",
//     ko: "Korean",
//     zh: "Chinese",
//     ru: "Russian",
//     tr: "Turkish",
//     nl: "Dutch",
//   };

//   const languageName = languageMap[language] || "English";

//   let scenes = 4;
//   let clipDuration = 4;

//   if (duration === 15) {
//     scenes = 4;
//     clipDuration = 4;
//   } else if (duration === 30) {
//     scenes = 4;
//     clipDuration = 8;
//   } else if (duration === 60) {
//     scenes = 5;
//     clipDuration = 12;
//   }

//   const scriptPrompt = `
// You are a professional short-form video director and viral content creator.

// INPUT
// Topic: "${topic}"
// Visual Style: "${style}"
// Video Duration: ${duration} seconds
// Narration Language: ${languageName}

// TASK
// Create a ${duration}-second short video concept designed for social media (YouTube Shorts, TikTok, Instagram Reels).

// Divide the video into ${scenes} scenes.
// Each scene should represent approximately ${clipDuration} seconds of video.

// VIDEO STYLE
// All scenes must follow this visual style: ${style}

// Style guide:
// - Realistic → cinematic, photorealistic, movie-quality footage
// - Cartoon → animated cartoon world
// - Comic → comic book style, bold outlines and dramatic frames
// - WaterColor → watercolor painting animation
// - GTA → GTA-style cinematic video game realism

// SCENE REQUIREMENTS

// For each scene generate:

// - sceneNumber
// - timestamp
// - contentText (what visually happens in the scene)
// - videoPrompt (AI video prompt for generating a ${clipDuration}-second cinematic clip)

// VIDEO PROMPT RULES

// Each videoPrompt must contain:

// • main subject
// • action happening
// • environment / location
// • lighting style
// • camera movement (pan, zoom, dolly, tracking shot etc.)
// • cinematic details
// • visual style: ${style}

// The prompts will be used directly with the AI video model **fal-ai/sora-2/text-to-video**, so they must be detailed cinematic prompts.

// TIMESTAMP RULES

// Generate correct timestamps automatically based on the video duration.

// Example format:

// 0:00 - 0:04
// 0:04 - 0:08
// 0:08 - 0:12

// NARRATION

// Write a smooth storytelling voiceover in **${languageName}** that flows naturally across all scenes.

// OUTPUT FORMAT

// Return ONLY valid JSON.

// {
//   "videoTitle": "...",
//   "duration": "${duration} seconds",
//   "fullContent": "...",
//   "scenes": [
//     {
//       "sceneNumber": 1,
//       "timestamp": "0:00 - 0:04",
//       "contentText": "...",
//       "videoPrompt": "..."
//     }
//   ]
// }

// Important:
// Do not include explanations.
// Return only JSON.
// `;

//   return scriptPrompt;
// };
