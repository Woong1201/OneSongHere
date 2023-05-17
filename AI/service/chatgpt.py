import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
model = "gpt-3.5-turbo"
create_text__query = "Tell me exactly the list of 6 English words centered on adjectives and nouns, don't respond other than the list of words. Based on the following sentence, imagine the appearance that will go into the album cover, and let me know the list of 6 English words separated by comma. "
create_harmony_query = "Your task is to create note data that matches the given note data next to the music to be made with the note data I give you. Please provide the response format in the same format as the note data I provide. Answer only note data, don't give me the rest or chat"


def create_text(query):
    messages = [
    {
        "role": "system",
        "content": "You are an assistant who is good at creating prompts for image creation."
    }
    ]
    messages.append(
    {
        "role": "user", 
        "content": create_text__query + query + ", concept art" + ", music" + ", album"
    })

    response = openai.ChatCompletion.create(
    model=model,
    messages=messages
    )
    return response['choices'][0]['message']['content']

def create_harmony(query):
    messages = [
    {
        "role": "system",
        "content": "You are an assistant who is good at creating prompts for harmony creation."
    }]
    messages.append(
    {
        "role": "user", 
        "content": create_harmony_query + query
    })
    
    response = openai.ChatCompletion.create(
    model=model,
    messages=messages
    )
    return response['choices'][0]['message']['content']