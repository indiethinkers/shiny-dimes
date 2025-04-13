import json
import csv

# Read the JSON file
with open('/Users/danielkhunter/CascadeProjects/shiny-dimes/chrome-extension/stories.js', 'r') as file:
    # Remove the "const stories = " prefix and read the JSON data
    content = file.read().replace('const stories = ', '').strip()
    stories = json.loads(content)

# Define the fields we want to extract
fields = ['id', 'title', 'author', 'url', 'summary', 'quote', 'slug']

# Write to CSV
with open('/Users/danielkhunter/CascadeProjects/shiny-dimes/data/stories.csv', 'w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=fields)
    writer.writeheader()
    
    for story in stories:
        # Create a new dict with only the fields we want
        row = {field: story.get(field, '') for field in fields}
        writer.writerow(row)
