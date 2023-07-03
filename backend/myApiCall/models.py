from django.db import models

# Create your models here.
class Article(models.Model):
    id = models.IntegerField(primary_key=True)
    author = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    content = models.TextField()
    date = models.DateField()