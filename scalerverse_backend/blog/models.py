from django.db import models
from django.utils import timezone

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    
    def __str__(self):
        return self.title