import {BaseParams, GoogleGenerativeAI} from "@google/generative-ai";
import {globalConfig} from "../config/global";

export type AiType = "pro" | "vision";

const { keys, api } = globalConfig;
export const getAiModel = (
    ai: GoogleGenerativeAI,
    type: AiType = "pro",
    options?: BaseParams,
) => ai.getGenerativeModel({
    ...options,
    model: type === "pro" ? "gemini-1.5-flash-latest" : "gemini-1.5-flash-latest",
}, {baseUrl: api});

