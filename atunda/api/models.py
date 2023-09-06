from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

# Create your models here.

def upload_to(instance, filename):
    return f'videos/{filename}'
class videoUpload(models.Model):
    # associated with specific user that made api request
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listings")
    title = models.CharField(max_length=100, blank=False, null=False)
    
    # path of file location is atunda/media/videos/{filename}
    path = models.FileField(upload_to=upload_to, blank=True, null=True)
    
    # associated dance tags for ml model training
    # need to be uploaded in the form of tag1,tag2,tag3,tag4,...,tagn
    tags = models.CharField(max_length=200, blank=False, null=False)
    created = models.DateTimeField(auto_now_add=True)


class userPermissions(models.Model):
    # Each permission set is associated with one user
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Permission for allowing videos to be used in AI model training
    allow_for_model = models.BooleanField(default=False)
    # Permission for allowing videos to be published in the dataset
    allow_for_dataset = models.BooleanField(default=False)