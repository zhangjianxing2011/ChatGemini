import {BaseParams, GoogleGenerativeAI, RequestOptions} from "@google/generative-ai";

export type AiType = "pro" | "vision";

export const getAiModel = (
    ai: GoogleGenerativeAI,
    type: AiType = "pro",
    options?: BaseParams,
    baseUrl?: string,
) => ai.getGenerativeModel({
    ...options,
    model: type === "pro" ? "gemini-1.5-flash" : "gemini-1.5-flash-latest",
}, baseUrl ? {baseUrl: baseUrl} : {});


