from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from nltk import ngrams
from nltk.tokenize import word_tokenize
import json
# Create your views here.
def say_hello(request):
    return HttpResponse("say Aksh")

@csrf_exempt
def compare_ngrams(request):
    body_unicode = request.body.decode('utf-8')
    if request.method == 'POST':
        data = json.loads(body_unicode)
        text1 = data.get('text1', '')
        text2 = data.get('text2', '')
        n = int(data.get('n', 2))
        print(text1 , text2,n)
        tokens1 = word_tokenize(text1)
        tokens2 = word_tokenize(text2)

        ngrams1 = list(ngrams(tokens1, n))
        ngrams2 = list(ngrams(tokens2, n))

        common_ngrams = set(ngrams1).intersection(ngrams2)

        response = {
            'common_ngrams': list(common_ngrams),
            'count': len(common_ngrams)
        }
        return JsonResponse(response)
    else:
        return JsonResponse({'error': 'Invalid request method.'})

@csrf_exempt
def gettingNgrams(request):
    body_unicode = request.body.decode('utf-8')
    if request.method == 'POST':
        data = json.loads(body_unicode)
        text1 = data.get('text1', '')
        text2 = data.get('text2', '')
        n = int(data.get('n', 2))
        
        tokens1 = word_tokenize(text1)
        tokens2 = word_tokenize(text2)

        ngrams1 = list(ngrams(tokens1, n))
        ngrams2 = list(ngrams(tokens2, n))
        response = {
            "Ngram for 1st String" : list(ngrams1),
            "Ngram for 2st String" : list(ngrams2) 
        }
        return JsonResponse(response)
    else:
        return JsonResponse({'error': 'Invalid request method.'})
