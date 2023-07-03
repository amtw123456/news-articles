from django.urls import path
from .views import *

urlpatterns = [
    path('', get_routes),
    path('get-all-articles', get_all_articles),
    path('delete-article/<str:pk>/', delete_article),
    path('delete-multiple-articles/', delete_multiple_articles)
]