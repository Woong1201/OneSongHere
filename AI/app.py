from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from service.s3_service import *
from service.cover_service import *
from service.chatgpt import *
from schema import *
import uvicorn
import datetime
import os

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    global s3, bucket, models
    s3 = s3_connection()
    bucket = os.getenv("bucket_name")


@app.post("/ai-api/v1/createCover")
def creat_cover(request: CoverImage):
    
    text = create_text(request.text)

    if(len(text) > 255):
        text = "Moonlit angel, nostalgic notes, childhood memories, delicate vocals, retro reimagining, dreamlike atmosphere."
    try:
        text.split(", ")
    except:
        text = "Moonlit angel, nostalgic notes, childhood memories, delicate vocals, retro reimagining, dreamlike atmosphere."

    cover_image = make_cover_image(text)

    if not os.path.exists("./cover"):
        os.makedirs("./cover")

    now = str(datetime.datetime.now()).replace(" ", "_").replace(":", "-")[:-7]

    file_name = f"{request.user_id}_{now}" + ".png"
    cover_image.save(f"./cover/{file_name}", 'png')

    upload_file(s3, f"./cover/{file_name}", bucket, file_name)

    obj = make_object(bucket, file_name)
    url = get_object_url(s3, obj)

    return url


if __name__ == '__main__':
    uvicorn.run("app:app", reload=True, host='0.0.0.0', port=8081)
