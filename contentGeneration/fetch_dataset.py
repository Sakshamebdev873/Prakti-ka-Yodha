import os
import json
from datasets import load_dataset

SAVE_DIR = "data/"

def fetch_and_format_sciq_data(num_samples: int = 100) -> str: # <-- ENSURED THIS IS 100
    """
    Fetches random samples from the SciQ dataset and saves them as a structured JSON file.
    """
    print(f"Fallback initiated: Fetching {num_samples} samples from the SciQ dataset.")
    try:
        dataset = load_dataset("sciq", split="train")
        
        # Use a seed for reproducibility if needed, then select the number of samples
        random_samples = dataset.shuffle(seed=42).select(range(num_samples))
        
        formatted_data = []
        for i, sample in enumerate(random_samples):
            # Combine the context (support) and question/answer for rich content
            combined_content = (
                f"Context: {sample['support']}\n"
                f"Question: {sample['question']}\n"
                f"Correct Answer: {sample['correct_answer']}"
            )
            
            formatted_data.append({
                "source_url": f"sciq_dataset_sample_{i}", # Create a unique identifier
                "content": combined_content
            })
            
        # Save the list of dictionaries to a single JSON file
        filepath = os.path.join(SAVE_DIR, "fallback_dataset_content.json")
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(formatted_data, f, indent=4, ensure_ascii=False)
        
        print(f"Fallback data saved to {filepath}")
        return filepath

    except Exception as e:
        print(f"Failed to fetch or process the dataset: {e}")
        raise