from django.urls import path
from . import views

urlpatterns = [
    path('' , views.say_hello),
    path("compare" , views.compare_ngrams ),
    path('ngrams', views.gettingNgrams)
]