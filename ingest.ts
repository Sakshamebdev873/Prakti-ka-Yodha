import { JSONLoader } from 'langchain/document_loaders/fs/json';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import dotenv from 'dotenv'

import * as fs from 'fs';
import * as path from 'path';
dotenv.config()
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

    console.log(process.env.GOOGLE_API_KEY,"sghfjksdbfjksdb");
    console.log(`Found ${files.length} JSON file(s). Loading content...`);

    for (const file of files) {
        const filePath = path.join(SOURCE_DATA_PATH, file);
        // The JSONLoader can handle both single objects and lists of objects
        // The '/content' is a JSON Path expression to extract the value of the "content" key.
        const loader = new JSONLoader(filePath, '/content'); 
        
        const loadedDocs = await loader.load();
        docs.push(...loadedDocs);
    }

    console.log(`Loaded a total of ${docs.length} document(s)/records.`);

    // 2. Split Text into Chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
    });
    const splitDocs = await textSplitter.splitDocuments(docs);
    console.log(`Split documents into ${splitDocs.length} chunks.`);
    // 3. Initialize the Embedding Model
    const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
      model: 'embedding-001',
    });
    console.log('Google Generative AI Embeddings model loaded.');

    // 4. Create and Persist the ChromaDB Vector Store
    console.log(`Connecting to ChromaDB at ${CHROMA_URL} and adding documents to collection '${CHROMA_COLLECTION_NAME}'...`);
    
    // This will connect to your running Chroma instance and add the documents.
    // The persistence is handled by the Docker volume.
    await Chroma.fromDocuments(splitDocs, embeddings, {
      collectionName: CHROMA_COLLECTION_NAME,
      url: CHROMA_URL,
    });

    console.log('--- Ingestion Process Finished Successfully ---');

  } catch (error) {
    console.error('An error occurred during ingestion:', error);
    process.exit(1); // Exit with an error code
  }
};

run();