
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
    prompt = request.data.get('text')
    prompt = "("+prompt+")"
    prompt+= " fix the sentence inside the bracket just fix the grammer and spelling mistakes and in response dont provide bracket"
    print(prompt)
    reqbody={"contents": [{"parts":[{"text": prompt}]}]}  
    corrected_text = call_external_ai_service('fix-grammar-endpoint', reqbody)
    print(corrected_text)
    responseValue = corrected_text[0]["content"]["parts"][0]["text"]
    
    #responseValue=responseValue[responseValue.find("</think>")+8:].strip()
    return Response({'correctedText': responseValue}, status=status.HTTP_200_OK)

@api_view(['POST'])
def adjust_tone(request):
    text = request.data.get('text')
    tone = request.data.get('tone')
    prompt = "(" +text+ ")" + " adjust the tone of the sentence to "+tone +" and dont add any styling for the words like bold or any other "
    print(prompt)
    reqbody={"contents": [{"parts":[{"text": prompt}]}]}  
    
   
    adjusted_text = call_external_ai_service('adjust-tone-endpoint', reqbody)
    print(adjusted_text)
    responseValue = adjusted_text[0]["content"]["parts"][0]["text"]
    print(responseValue)
    
    #responseValue=responseValue[responseValue.find("</think>")+8:].strip()
    return Response({'correctedText': responseValue}, status=status.HTTP_200_OK)


@api_view(['POST'])
def chatgpt_response(request):
    prompt = request.data.get('prompt')
    reqbody={"contents": [{"parts":[{"text": prompt}]}]}    
    corrected_text = call_external_ai_service('fix-grammar-endpoint', reqbody)
    print(corrected_text)
    responseValue = corrected_text[0]["content"]["parts"][0]["text"]
    
    #responseValue=responseValue[responseValue.find("</think>")+8:].strip()
    return Response({'correctedText': responseValue}, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_scripts(requests):
    title=requests.data.get('title')
    type=requests.data.get('type')
    genre=requests.data.get('genre')
    format=requests.data.get('format')
    language=requests.data.get('language')
    overview=requests.data.get('overview')
    charactersSetup=requests.data.get('charactersSetup')
    teaserDesc=requests.data.get('teaserDesc')
    actOneDesc=requests.data.get('actOneDesc')
    climaxDesc=requests.data.get('climaxDesc')
    typeDic={'1':"Feature Film",'2': "TV Show",'3':" Socail media"  }
    print(title,type,genre,format,language,overview,charactersSetup,teaserDesc,actOneDesc,climaxDesc)
    
    prompt = "write a script using the info i have provided make sure you create professional script with proper formatting and dialogues. Title" + title + "type" + typeDic[type]
    if genre:
        prompt+=" genre " + str(genre) 
    if format:
        prompt+=" format " + format
    if language:
        prompt+=" language " + language
    else:
        prompt+=" language " + "english"
    if overview:
        prompt+=" overview " + overview
    if charactersSetup:
        prompt+=" charactersSetup " + charactersSetup
    if teaserDesc:
        prompt+=" teaserDesc " + teaserDesc
    if actOneDesc:
        prompt+=" actOneDesc " + actOneDesc
    if climaxDesc:
        prompt+=" climaxDesc " + climaxDesc
    prompt+= " make sure the script contains teaser, add many acts and climax and make sure the script is in proper format and dialogues are written properly. and each act should be with bigger header and align center. And dont provide any comments i just want the whole script."
    reqbody={"contents": [{"parts":[{"text": prompt}]}]} 
    script = call_external_ai_service('create-script-endpoint', reqbody)
    responseValue = script[0]["content"]["parts"][0]["text"]
    
    return Response({'response': responseValue}, status=status.HTTP_200_OK)

def call_external_ai_service(endpoint, data):
    api_key = 'AIzaSyBJT3UQtp1zCJs0cxwkP-Rb03fSQhPLJzg'   
    headers = {
        'GEMINI_API_KEY': api_key,
        'Content-Type': 'application/json'
    }
    response = requests.post(f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key='+api_key, headers=headers, json=data)
    if response.status_code == 200:
 
        return response.json().get('candidates', 'No result')
    else:
        return f"Error: {response.status_code} - {response.text}"