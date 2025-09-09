import os
import hashlib
import json  # <-- Import the json library
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

SAVE_DIR = "data/"
os.makedirs(SAVE_DIR, exist_ok=True)

def scrape_article_content(url: str) -> str:
    """Scrapes the main textual content from a given URL using Playwright."""
    print(f"Attempting to scrape: {url}")
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url, timeout=60000)

            selectors_to_try = [
                'article', 'main', '[role="main"]', '.post-content', 
                '.article-body', '#main-content'
            ]
            
            content_html = ""
            for selector in selectors_to_try:
                try:
                    page.wait_for_selector(selector, timeout=5000)
                    content_html = page.locator(selector).first.inner_text()
                    print(f"Successfully found content with selector: '{selector}'")
                    break
                except PlaywrightTimeoutError:
                    continue
            
            browser.close()
            if not content_html:
                raise ValueError("Could not find a suitable content container.")

            lines = content_html.split('\n')
            cleaned_lines = [line.strip() for line in lines if line.strip()]
            return "\n".join(cleaned_lines)

    except Exception as e:
        print(f"An error occurred during scraping: {e}")
        raise

def save_content_to_file(url: str, content: str) -> str:
    """
    Saves the scraped content to a structured JSON file.
    """
    filename = hashlib.md5(url.encode()).hexdigest() + ".json"  # <-- Changed extension to .json
    filepath = os.path.join(SAVE_DIR, filename)
    
    # --- MODIFIED: Create a structured dictionary ---
    data_to_save = {
        "source_url": url,
        "content": content
    }
    
    # --- MODIFIED: Save as a JSON file ---
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data_to_save, f, indent=4, ensure_ascii=False)
        
    print(f"Content from {url} saved to {filepath}")
    return filepath