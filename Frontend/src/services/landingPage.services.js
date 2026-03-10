import API from "../utils/api";

export const genPromptHelper = async (prompt = "") => {
  if (prompt.trim() === "") return;
  try {
    const res = await API.post("/api/video/generate-prompt", prompt);
    return res?.data;
  } catch (err) {
    throw err;
  }
};

export const genVoiceHelper = async (text = "") => {
  if (text.trim() === "") return;
  try {
    const res = await API.post("/api/video/generate-voice", text);
    return res?.data;
  } catch (err) {
    throw err;
  }
};

export const genCaptionHelper = async (audioUrl = "") => {
  if (audioUrl.trim() === "") return;
  try {
    const res = await API.post("/api/video/generate-caption", audioUrl);
    return res?.data;
  } catch (err) {
    throw err;
  }
};

export const genImageHelper = async (prompt = "") => {
  if (prompt.trim() === "") return;
  try {
    const res = await API.post("/api/video/generate-image", prompt);
    return res?.data;
  } catch (err) {
    throw err;
  }
};

export const genVideoHelper = async (prompt = "") => {
  if (prompt.trim() === "") return;

  try {
    const promptRes = await genPromptHelper(prompt);
    if (!promptRes) throw new Error("Prompt response is empty");
    const voiceRes = await genVoiceHelper(promptRes.fullContent);
    const captionRes = await genCaptionHelper(voiceRes?.fileUrl);
    const imageResults = [];
    if (promptRes.scenes && promptRes.scenes.length > 0) {
      for (let scene of promptRes.scenes) {
        const imageUrl = await genImageHelper(scene.imagePrompt);
        imageResults.push({
          sceneNumber: scene.sceneNumber,
          timestamp: scene.timestamp,
          contentText: scene.contentText,
          imageUrl,
        });
      }
    }

    const videoData = {
      title: promptRes.videoTitle,
      duration: promptRes.duration,
      fullContent: promptRes.fullContent,
      voiceUrl: voiceRes,
      captions: captionRes,
      scenes: imageResults,
    };

    return videoData;
  } catch (err) {
    console.error("Video generation helper error:", err);
    throw err;
  }
};

export const uploadVideoDataHelper = async (data = null) => {
  if (!data) return;
  try {
    const res = await API.post("/api/video/upload-videoData", data);
    return res?.data;
  } catch (err) {
    throw err;
  }
};