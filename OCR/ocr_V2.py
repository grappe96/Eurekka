import requests
import uuid
import time
import base64
import json

api_url = "https://9a7628d86bf0452baf2f41e51ab24c63.apigw.ntruss.com/custom/v1/8540/ee25c7072bab80eac31e1e20d588e9fced98bd094ba1932b2da186cf7c7af0eb/general"
secret_key = "Z3RTSXFMb2dxRGtVcFh0WXF3aHNIQUtvT3ZXSmpzQ3Y="
# image_url = 'YOUR_IMAGE_URL'
image_file = './sample.jpg'
with open(image_file,'rb') as f:
    file_data = f.read()

request_json = {
    'images': [
        {
            'format': 'jpg',
            'name': 'demo',
            'data': base64.b64encode(file_data).decode()
            # 'url': image_url
        }
    ],
    'requestId': str(uuid.uuid4()),
    'version': 'V2',
    'timestamp': int(round(time.time() * 1000))
}

payload = json.dumps(request_json).encode('UTF-8')
headers = {
  'X-OCR-SECRET': secret_key,
  'Content-Type': 'application/json'
}

response = requests.request("POST", api_url, headers=headers, data = payload)

print(response.text)
