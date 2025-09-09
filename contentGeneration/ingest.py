import os
import shutil
import json
from langchain_community.document_loaders import JSONLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

# Define the path for the ChromaDB database and the source documents
CHROMA_PATH = "chroma_db"
DATA_PATH = "data/"

def metadata_func(record: dict, metadata: dict) -> dict:
    """Helper function to extract metadata from a JSON record."""
    metadata["source"] = record.get("source_url")
    return metadata

def create_vector_db():
    """
    Creates a ChromaDB vector database from JSON documents in the data directory.
    This version intelligently handles different JSON structures.
    """
    print("--- Starting JSON Document Ingestion Process with ChromaDB ---")
    
    all_documents = []

    print("Loading JSON files...")
    # Loop through all files in the data directory
    for filename in os.listdir(DATA_PATH):
        if filename.endswith(".json"):
            filepath = os.path.join(DATA_PATH, filename)
            
            # --- THIS IS THE KEY FIX ---
            # Determine the correct jq_schema by checking the JSON structure
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # If the file contains a list of objects, iterate over the list.
            # Otherwise, treat it as a single object.
            if isinstance(data, list):
                jq_schema = ".[]"
                print(f"Detected list structure in {filename}, using schema '.[]'")
            else:
                jq_schema = "."
                print(f"Detected single object structure in {filename}, using schema '.'")
            # --- END OF FIX ---
            
            # Now, create the loader with the correct schema
            loader = JSONLoader(
                file_path=filepath,
                jq_schema=jq_schema,
                content_key="content",
                metadata_func=metadata_func,
                text_content=False
            )
            all_documents.extend(loader.load())

    if not all_documents:
        print("No documents found. Please add JSON content to the 'data' directory.")
        return
            
    print(f"Loaded a total of {len(all_documents)} document(s)/records.")

    # 2. Split Text into Chunks (No changes here)
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100
    )
    texts = text_splitter.split_documents(all_documents)
    print(f"Split documents into {len(texts)} chunks.")

    # 3. Load the Embedding Model (No changes here)
    embeddings = HuggingFaceEmbeddings(
        model_name='sentence-transformers/all-MiniLM-L6-v2',
        model_kwargs={'device': 'cpu'}
    )
    print("Embedding model loaded.")

    # 4. Create and Persist the ChromaDB Database (No changes here)
    if os.path.exists(CHROMA_PATH):
        print(f"Clearing existing database at {CHROMA_PATH}")
        shutil.rmtree(CHROMA_PATH)

    db = Chroma.from_documents(
        documents=texts, 
        embedding=embeddings, 
        persist_directory=CHROMA_PATH
    )
    
    print(f"--- Vector store created and saved at: {CHROMA_PATH} ---")
    print(f"Number of vectors in the database: {db._collection.count()}")

if __name__ == "__main__":
    create_vector_db()