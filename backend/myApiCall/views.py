from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Article
from .serializers import ArticleSerializer

@api_view(['GET'])
def get_routes(request):
    return Response("HELLO")

@api_view(['GET'])
def get_all_articles(request):
    articles = Article.objects.all()
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_article(request, pk):
    article = Article.objects.get(pk=pk)
    article.delete()
    return Response(data={"message": "Successfully deleted article"})

@api_view(['POST'])
def delete_multiple_articles(request):
    # Get the list of article IDs from the request body
    
    article_ids = request.data.get('ids')
    print(article_ids)
    article_ids = [int(id) for id in article_ids]
    print(article_ids)
    Article.objects.filter(id__in=article_ids).delete()
    return Response({'message': 'Articles deleted successfully.'}, status=200)