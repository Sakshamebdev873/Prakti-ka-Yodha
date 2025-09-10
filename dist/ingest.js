"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("langchain/document_loaders/fs/json");
const text_splitter_1 = require("langchain/text_splitter");
const chroma_1 = require("@langchain/community/vectorstores/chroma");
const google_genai_1 = require("@langchain/google-genai");
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
dotenv_1.default.config();
// --- CONFIGURATION ---
// The path to your source content files
const SOURCE_DATA_PATH = './contentGeneration/chroma_db';
// The URL of your running ChromaDB server (from docker-compose)
const CHROMA_URL = 'http://localhost:8000';
// The name of the collection within Chroma where the data will be stored
const CHROMA_COLLECTION_NAME = 'ecolearn_content';
/**
 * The main function to run the ingestion process.
 */
const run = async () => {
    try {
        console.log('--- Starting Ingestion Process ---');
        // 1. Load Documents from JSON files using a robust method
        const docs = [];
        const files = fs.readdirSync(SOURCE_DATA_PATH).filter(file => file.endsWith('.json'));
        if (files.length === 0) {
            console.log('No JSON documents found in the data directory. Exiting.');
            return;
        }
        console.log(process.env.GOOGLE_API_KEY, "sghfjksdbfjksdb");
        console.log(`Found ${files.length} JSON file(s). Loading content...`);
        for (const file of files) {
            const filePath = path.join(SOURCE_DATA_PATH, file);
            // The JSONLoader can handle both single objects and lists of objects
            // The '/content' is a JSON Path expression to extract the value of the "content" key.
            const loader = new json_1.JSONLoader(filePath, '/content');
            const loadedDocs = await loader.load();
            docs.push(...loadedDocs);
        }
        console.log(`Loaded a total of ${docs.length} document(s)/records.`);
        // 2. Split Text into Chunks
        const textSplitter = new text_splitter_1.RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 100,
        });
        const splitDocs = await textSplitter.splitDocuments(docs);
        console.log(`Split documents into ${splitDocs.length} chunks.`);
        // 3. Initialize the Embedding Model
        const embeddings = new google_genai_1.GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GOOGLE_API_KEY,
            model: 'embedding-001',
        });
        console.log('Google Generative AI Embeddings model loaded.');
        // 4. Create and Persist the ChromaDB Vector Store
        console.log(`Connecting to ChromaDB at ${CHROMA_URL} and adding documents to collection '${CHROMA_COLLECTION_NAME}'...`);
        // This will connect to your running Chroma instance and add the documents.
        // The persistence is handled by the Docker volume.
        await chroma_1.Chroma.fromDocuments(splitDocs, embeddings, {
            collectionName: CHROMA_COLLECTION_NAME,
            url: CHROMA_URL,
        });
        console.log('--- Ingestion Process Finished Successfully ---');
    }
    catch (error) {
        console.error('An error occurred during ingestion:', error);
        process.exit(1); // Exit with an error code
    }
};
run();
