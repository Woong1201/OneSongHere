import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
model = "gpt-3.5-turbo"
base_query = "Tell me exactly the list of 6 English words centered on adjectives and nouns, don't respond other than the list of words. Based on the following sentence, imagine the appearance that will go into the album cover, and let me know the list of 6 English words separated by comma. "
messages = [
    {
        "role": "system",
        "content": "You are an assistant who is good at creating prompts for image creation."
    }
]

def create_text(query):
    messages.append(
    {
        "role": "user", 
        "content": base_query + query + ", concept art" + ", music" + ", album"
    })

    response = openai.ChatCompletion.create(
    model=model,
    messages=messages
    )
    return response['choices'][0]['message']['content']

