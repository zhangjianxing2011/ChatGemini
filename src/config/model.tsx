import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import superb from "superb";

// Get random stop sequences from superb
const stopSequences = superb.random().split(" ");

// Model configuration
// https://ai.google.dev/docs/concepts#model_parameters
export const modelConfig = {
    generationConfig: {
        stopSequences,
        maxOutputTokens: 5000,
    },
    //https://ai.google.dev/gemini-api/docs/safety-settings?hl=zh-cn#node.js
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ],
};
