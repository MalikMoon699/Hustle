import {
  ELEVENLABS_API_KEY,
  CLAUDE_API_KEY,
  ASSEMBLYAI_API_KEY,
  REPLICATE_API_KEY,
  PEXELS_API_KEY,
  RUNWAY_API_KEY,
  DREAM_MACHINE_API_KEY,
  FAL_AI_API_KEY,
} from "../config/env.js";
import { promptConcept } from "../utils/constants.js";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { AssemblyAI } from "assemblyai";
import Replicate from "replicate";
import fetch from "node-fetch";
import Video from "../models/video.model.js";
import { uploadMedia } from "./media.controller.js";
import RunwayML from "@runwayml/sdk";

export const genPrompt = async (req, res) => {
  const { prompt, style, duration, language } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const scriptPrompt = promptConcept({
    topic: prompt,
    style: style,
    duration: duration,
    language: language,
  });

  if (!prompt || prompt.trim() === "")
    return res.status(400).json({ error: "Prompt is required" });
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: scriptPrompt,
          },
        ],
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Failed to useClaude:", err);
    res.status(500).json({ error: "Claude request failed" });
  }
};

const elevenlabs = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

export const genVoice = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const audioStream = await elevenlabs.textToSpeech.convert(
      "kPzsL2i3teMYv0FxEYQ6",
      // "JBFqnCBsd6RMkjVDRZzb",
      {
        text,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128",
      },
    );

    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);

    req.file = {
      originalname: `voice_${Date.now()}.mp3`,
      mimetype: "audio/mpeg",
      size: audioBuffer.length,
      buffer: audioBuffer,
    };

    await uploadMedia(req, res);
  } catch (err) {
    console.error("Error generating voice:", err);
    res.status(500).json({ error: "Failed to generate voice" });
  }
};

const client = new AssemblyAI({
  apiKey: ASSEMBLYAI_API_KEY,
});

export const genCaption = async (req, res) => {
  try {
    const { audioUrl } = req.body;

    if (!audioUrl) {
      return res.status(400).json({ error: "Audio URL is required" });
    }

    const params = {
      audio: audioUrl,
      language_detection: true,
      speech_models: ["universal-3-pro", "universal-2"],
    };

    const transcript = await client.transcripts.transcribe(params);

    return res.status(200).json({
      success: true,
      text: transcript.text,
      fullResponse: transcript,
    });
  } catch (error) {
    console.error("Caption generation error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to generate captions",
    });
  }
};

const replicate = new Replicate({
  auth: REPLICATE_API_KEY,
});

export const genImage = async (req, res) => {
  try {
    const { prompt, aspect_ratio = "1:1" } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required",
      });
    }

    const input = {
      prompt,
      aspect_ratio,
      safety_filter_level: "block_medium_and_above",
    };

    const output = await replicate.run("google/imagen-4", { input });
    const imageUrl = output.url();

    return res.status(200).json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const uploadVideoData = async (req, res) => {
  try {
    const { title, duration, fullContent, voiceUrl, captions, scenes } =
      req.body;
    const newVideo = new Video({
      title: title || "",
      duration: duration || 0,
      fullContent: fullContent || "",
      voiceUrl: voiceUrl || "",
      captions: captions || {},
      scenes: scenes || [],
    });

    const savedVideo = await newVideo.save();

    res.status(201).json({
      message: "Video uploaded successfully",
      video: savedVideo,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Failed to upload video" });
  }
};

export const getVideoClips = async (req, res) => {
  const { topic } = req.query;
  try {
    const request = await fetch(
      `https://api.pexels.com/videos/search?query=${topic}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      },
    );
    const response = await request.json();
    const videoLink = response.videos?.[0]?.video_files?.find(
      (v) => v.quality === "hd",
    )?.link;
    if (!videoLink) {
      return res.status(404).json({ message: "No video found" });
    }
    return res.status(200).json({ video: videoLink });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getImageClips = async (req, res) => {
  const { topic } = req.query;

  try {
    const request = await fetch(
      `https://api.pexels.com/v1/search?query=${topic}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      },
    );

    const response = await request.json();

    const imageUrl = response.photos?.[0]?.src?.large;

    if (!imageUrl) {
      return res.status(404).json({ message: "No image found" });
    }

    return res.status(200).json({ image: imageUrl });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const generateVideoWithRunway = async (req, res) => {
  try {
    const { prompt, duration = 4, ratio = "1280:720", audio = true } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const client = new RunwayML({ apiKey: RUNWAY_API_KEY });
    let task;
    try {
      task = await client.textToVideo.create({
        model: "veo3.1",
        promptText: prompt,
        ratio,
        duration,
        audio,
      });
    } catch (apiError) {
      return res.status(apiError.status || 500).json({
        success: false,
        error: apiError.error?.error || "Runway API Error",
        docUrl: apiError.error?.docUrl,
      });
    }

    let outputTask;
    try {
      outputTask = await task.waitForTaskOutput();
    } catch (taskError) {
      return res.status(500).json({
        success: false,
        error: "Video generation task failed",
        details: taskError,
      });
    }

    const videoUrl = outputTask.output?.[0]?.url;

    if (!videoUrl) {
      return res.status(500).json({
        success: false,
        error: "Video generation failed — no output returned",
        task: outputTask,
      });
    }

    return res.status(200).json({
      success: true,
      taskId: outputTask.id,
      videoUrl,
      task: outputTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Unknown server error",
    });
  }
};

export const generateVideoWithDreamMachine = async (req, res) => {
  try {
    const API_KEY = DREAM_MACHINE_API_KEY;
    const baseUrl = "https://api.lumalabs.ai/api/v1";
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    const createRes = await fetch(`${baseUrl}/video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        aspect_ratio: "16:9",
        duration: 5,
      }),
    });

    if (!createRes.ok) {
      const errorText = await createRes.text();
      return res.status(500).json({ error: errorText });
    }

    const createJson = await createRes.json();
    const taskId = createJson?.data?.task_id || createJson?.task_id;

    if (!taskId) {
      return res.status(500).json({ error: "Task ID not returned" });
    }

    console.log(`Task created: ${taskId}`);
    const maxAttempts = 40;
    let attempts = 0;

    while (attempts < maxAttempts) {
      await new Promise((r) => setTimeout(r, 3000));
      attempts++;

      const statusRes = await fetch(`${baseUrl}/video/${taskId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json",
        },
      });

      if (!statusRes.ok) {
        const errorText = await statusRes.text();
        return res.status(500).json({ error: errorText });
      }

      const statusJson = await statusRes.json();
      const state = statusJson?.data?.state || statusJson?.state;

      console.log(`Status: ${state}`);

      if (state === "completed") {
        const videoUrl =
          statusJson?.data?.video_url || statusJson?.data?.result_url;

        return res.status(200).json({
          success: true,
          videoUrl,
          taskId,
        });
      }

      if (state === "failed") {
        return res.status(500).json({
          success: false,
          error: "Video generation failed",
        });
      }
    }

    return res.status(408).json({
      success: false,
      error: "Video generation timed out",
    });
  } catch (error) {
    console.error("Dream Machine Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const generateVideoWithFal = async (req, res) => {
  try {
    const API_KEY = FAL_AI_API_KEY;
    const modelEndpoint = "https://fal.run/fal-ai/kling-video";

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const createRes = await fetch(modelEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        duration: 5,
        aspect_ratio: "16:9",
      }),
    });

    if (!createRes.ok) {
      const errorText = await createRes.text();
      return res.status(500).json({ error: errorText });
    }

    const createJson = await createRes.json();

    if (createJson?.video?.url) {
      return res.status(200).json({
        success: true,
        videoUrl: createJson.video.url,
      });
    }

    const requestId = createJson?.request_id;

    if (!requestId) {
      return res.status(500).json({ error: "Request ID not returned" });
    }

    console.log("Fal Request ID:", requestId);

    const statusUrl = `${modelEndpoint}/requests/${requestId}`;
    const maxAttempts = 40;
    let attempts = 0;

    while (attempts < maxAttempts) {
      await new Promise((r) => setTimeout(r, 3000));
      attempts++;

      const statusRes = await fetch(statusUrl, {
        headers: {
          Authorization: `Key ${API_KEY}`,
        },
      });

      if (!statusRes.ok) {
        const errorText = await statusRes.text();
        return res.status(500).json({ error: errorText });
      }

      const statusJson = await statusRes.json();
      const state = statusJson?.status;

      console.log("Fal Status:", state);

      if (state === "completed") {
        const videoUrl = statusJson?.response?.video?.url;

        return res.status(200).json({
          success: true,
          videoUrl,
          requestId,
        });
      }

      if (state === "failed") {
        return res.status(500).json({
          success: false,
          error: "Video generation failed",
        });
      }
    }

    return res.status(408).json({
      success: false,
      error: "Video generation timed out",
    });
  } catch (error) {
    console.error("Fal Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
