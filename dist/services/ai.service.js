"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChallengeFromTopic = void 0;
const chroma_1 = require("@langchain/community/vectorstores/chroma");
const google_genai_1 = require("@langchain/google-genai");
const google_genai_2 = require("@langchain/google-genai");
const prompts_1 = require("@langchain/core/prompts");
const runnables_1 = require("@langchain/core/runnables");
const output_parsers_1 = require("@langchain/core/output_parsers");
const document_1 = require("langchain/util/document");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// --- CONFIGURATION ---
const VECTOR_STORE_PATH = './contentGeneration/chroma_db'; // Must match the path from ingest.ts
const COLLECTION_NAME = 'ecolearn_content';
// Initialize the models and vector store once
const embeddings = new google_genai_1.GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: 'embedding-001',
});
const vectorStore = new chroma_1.Chroma(embeddings, {
    collectionName: COLLECTION_NAME,
    url: 'http://localhost:8000', // URL of your running ChromaDB instance
});
const llm = new google_genai_2.ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: 'gemini-2.5-pro',
    temperature: 0.7,
});
const retriever = vectorStore.asRetriever(3); // Retrieve top 3 documents
// The prompt template for generating the challenge
const promptTemplate = `
You are an expert instructional designer for an eco-learning platform.
Your task is to generate a challenge based on the provided context and topic.
The response MUST be ONLY a single, valid JSON object with the keys: "title", "description", "type", and "points". Do not include any other text or markdown formatting like \`\`\`json.

CONTEXT:
{context}

TOPIC: "{topic}"

Based on the context, create a challenge of type: {challenge_type}
The 'points' should be an integer between 10 and 50, reflecting the difficulty.

JSON RESPONSE:
`;
const prompt = prompts_1.PromptTemplate.fromTemplate(promptTemplate);
// Define the RAG chain using the newer LangChain Expression Language (LCEL)
console.log(VECTOR_STORE_PATH, process.env.GOOGLE_API_KEY);
const ragChain = runnables_1.RunnableSequence.from([
    {
        context: (input) => retriever.invoke(input.topic).then(document_1.formatDocumentsAsString),
        topic: (input) => input.topic,
        challenge_type: (input) => input.challenge_type,
    },
    prompt,
    llm,
    new output_parsers_1.StringOutputParser(),
]);
// The main service function to be called from the controller
const generateChallengeFromTopic = async (input) => {
    console.log(`Generating challenge for topic: "${input.topic}"`);
    const result = await ragChain.invoke({
        topic: input.topic,
        challenge_type: input.challenge_type,
    });
    try {
        // The chain returns a JSON string, so we parse it
        return JSON.parse(result);
    }
    catch (error) {
        console.error('Failed to parse JSON from LLM output:', result);
        throw new Error('Failed to generate a valid challenge structure from the AI model.');
    }
};
exports.generateChallengeFromTopic = generateChallengeFromTopic;
