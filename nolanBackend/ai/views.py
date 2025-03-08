# ai/views.py
import re
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests

@api_view(['POST'])
def generate_image(request):
    text = request.data.get('text')

    image_url = call_external_ai_service('generate-image-endpoint', {'text': text})
    return Response({'url': image_url}, status=status.HTTP_200_OK)

@api_view(['POST'])
def fix_grammar(request):
    text = request.data.get('text')
    text+= " fix grammar and in response just give me the fixed sentance without any other comments or words"
    print(text)
    reqbody={
        "model": "cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
        "messages": [
            
            {
                "role": "user",
                "content": text
            }
        ]
    }
    corrected_text = call_external_ai_service('fix-grammar-endpoint', reqbody)
    responseValue = corrected_text[0]['message']['content']
    return Response({'correctedText': responseValue}, status=status.HTTP_200_OK)

@api_view(['POST'])
def adjust_tone(request):
    text = request.data.get('text')
    tone = request.data.get('tone')
   
    adjusted_text = call_external_ai_service('adjust-tone-endpoint', {'text': text, 'tone': tone})
    return Response({'adjustedText': adjusted_text}, status=status.HTTP_200_OK)


@api_view(['POST'])
def chatgpt_response(request):
    prompt = request.data.get('prompt')
    prompt+=" only provide a short ans without any tags or comments"
    reqbody={
        "model": "cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
        "messages": [
            
            {
                "role": "user",
                "content": prompt
            }
        ]
    }
    corrected_text = call_external_ai_service('fix-grammar-endpoint', reqbody)
    responseValue = corrected_text[0]['message']['content']
    
    responseValue=responseValue[responseValue.find("</think>")+8:].strip()
    return Response({'correctedText': responseValue}, status=status.HTTP_200_OK)


def call_external_ai_service(endpoint, data):
    api_key = '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'   
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    response = requests.post(f'https://openrouter.ai/api/v1/chat/completions', headers=headers, json=data)
    if response.status_code == 200:
 
        return response.json().get('choices', 'No result')
    else:
        return f"Error: {response.status_code} - {response.text}"