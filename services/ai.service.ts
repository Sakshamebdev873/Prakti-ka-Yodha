import { Chroma } from '@langchain/community/vectorstores/chroma';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { formatDocumentsAsString } from 'langchain/util/document';
import dotenv from 'dotenv';
dotenv.config();

// --- CONFIGURATION ---
const VECTOR_STORE_PATH = './contentGeneration/chroma_db'; // Must match the path from ingest.ts
const COLLECTION_NAME = 'ecolearn_content';

// Initialize the models and vector store once
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: 'gemini-embedding-001',
});

// CORRECTED PART: The `embeddings` object is the first argument, 
// and the configuration is the second.
const vectorStore = new Chroma(embeddings, {
  collectionName: COLLECTION_NAME,
  url: 'http://localhost:8000', // This requires a separate ChromaDB server running
});

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: 'gemini-2.0-flash',
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

const prompt = PromptTemplate.fromTemplate(promptTemplate);

// Define the RAG chain using the newer LangChain Expression Language (LCEL)
const ragChain = RunnableSequence.from([
  {
    context: (input) => retriever.invoke(input.topic).then(formatDocumentsAsString),
    topic: (input) => input.topic,
    challenge_type: (input) => input.challenge_type,
  },
  prompt,
  llm,
  new JsonOutputParser(),
]);

interface GenerateChallengeInput {
  topic: string;
  challenge_type: 'DAILY' | 'WEEKLY' | 'PROJECT' | 'QUIZ';
}

// The main service function to be called from the controller
export const generateChallengeFromTopic = async (input: GenerateChallengeInput) => {
  console.log(`Generating challenge for topic: "${input.topic}"`);
  
  try {
    const result = await ragChain.invoke({
      topic: input.topic,
      challenge_type: input.challenge_type,
    });
    return result;
  } catch (error) {
    console.error('Error during RAG chain execution:', error);
    throw new Error('Failed to generate a valid challenge from the AI model.');
  }
};