import subprocess
from scrape_content import scrape_article_content, save_content_to_file
from fetch_dataset import fetch_and_format_sciq_data

def run_content_pipeline(url_to_scrape: str):
    """
    Orchestrates the content pipeline:
    1. Tries to scrape a URL.
    2. If scraping fails, fetches from a fallback dataset.
    3. Runs the ingestion script to update the vector database.
    4.test it again
    """
    print("--- Starting Content Pipeline ---")
    try:
        # Step 1: Attempt to scrape the primary source
        scraped_content = scrape_article_content(url_to_scrape)
        save_content_to_file(url_to_scrape, scraped_content)
        print("Scraping successful.")

    except Exception as e:
        # Step 2: If any error occurs in scraping, use the fallback
        print(f"\nScraping failed with error: {e}. Executing fallback plan.\n")
        try:
            # --- THIS IS THE KEY FIX ---
            # Explicitly call the function with the desired number of samples.
            fetch_and_format_sciq_data(num_samples=100)
            # --- END OF FIX ---
            print("Fallback data fetched successfully.")
        except Exception as dataset_error:
            print(f"CRITICAL ERROR: Both scraping and fallback failed. Could not fetch dataset: {dataset_error}")
            return # Exit if both fail

    # Step 3: Run the ingestion script to update the vector DB with the new content
    print("\n--- Running ingestion to update vector database ---")
    try:
        # This calls 'python ingest.py' as a command line process
        subprocess.run(["python", "ingest.py"], check=True)
        print("--- Content Pipeline Finished Successfully ---")
    except FileNotFoundError:
        print("ERROR: 'ingest.py' not found. Make sure you are in the correct directory.")
    except subprocess.CalledProcessError as e:
        print(f"ERROR: Ingestion script failed with error: {e}")

if __name__ == "__main__":
    # Example Usage with an India-Specific URL
    TARGET_URL = "https://www.downtoearth.org.in/news/water/yamuna-continues-to-be-severely-polluted-delhi-govt-report-reveals-little-progress-94262"
    
    run_content_pipeline(TARGET_URL)