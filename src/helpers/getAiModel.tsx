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
    model: type === "pro" ? "gemini-2.0-flash" : "gemini-2.0-flash",
}, {baseUrl: api});

