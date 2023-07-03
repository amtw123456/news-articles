from django.urls import path
from .views import *

urlpatterns = [
    path('', get_routes),
    path('get-all-articles', get_all_articles),
]