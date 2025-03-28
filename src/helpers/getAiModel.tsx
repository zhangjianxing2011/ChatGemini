import {BaseParams, GoogleGenerativeAI} from "@google/generative-ai";
import {globalConfig} from "../config/global";

export type AiType = "pro" | "vision";

const { modal, api } = globalConfig;
export const getAiModel = (
    ai: GoogleGenerativeAI,
    type: AiType = "pro",
    options?: BaseParams,
) => ai.getGenerativeModel({
    ...options,
    model: modal ? modal : "gemini-2.0-flash",
}, {baseUrl: api});

