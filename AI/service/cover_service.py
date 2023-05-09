import io
import requests
import json
import base64
import os
from dotenv import load_dotenv
from PIL import Image


load_dotenv()
REST_API_KEY = os.getenv("REST_API_KEY")

# Base64 디코딩 및 변환
def stringToImage(base64_string, mode='RGBA'):
    imgdata = base64.b64decode(str(base64_string))
    img = Image.open(io.BytesIO(imgdata)).convert(mode)
    return img


# 이미지 생성하기 요청
def t2i(text, batch_size=1):
    r = requests.post(
        'https://api.kakaobrain.com/v1/inference/karlo/t2i',
        json = {
            'prompt': {
                'text': text,
                'batch_size': batch_size
            }
        },
        headers = {
            'Authorization': f'KakaoAK {REST_API_KEY}',
            'Content-Type': 'application/json'
        }
    )
    # 응답 JSON 형식으로 변환
    response = json.loads(r.content)
    return response

def make_cover_image(text):
    response =  t2i(text)
    Img = stringToImage(response.get("images")[0].get("image"), mode='RGB')
    return Img