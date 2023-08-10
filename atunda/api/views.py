from django.shortcuts import render
from api.models import videoUpload
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
from api.serializers import UserSerializer,CreateUserSerializer, VideoUploadSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
import moviepy.editor as moviepy

# Create your views here.
class CreateUser(APIView):
    """
    API for creating a user. Attempts to serialize user json data into a user object.
    Returns a response of username/password if valid and HTTP 400 if invalid. 
    """
    
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, format=None):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def find_video_type(filename: str) -> (int, str):
    i = len(filename) - 1
    while filename[i] != '.':
      i -= 1
    return i, filename[i+1:]  

class VideoUploadViewSet(generics.ListCreateAPIView):
    
    serializer_class = VideoUploadSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user
        queryset = videoUpload.objects.filter(owner=user)
        return queryset

    def perform_create(self, serializer):
        new_file = serializer.save(owner=self.request.user)
        extension_index, file_type = find_video_type(str(new_file.path))
        if file_type != "mp4":
            video_path = str(settings.BASE_DIR)[:-6] + 'atunda/media/'
            print(video_path)
            mp4_path = str(new_file.path)[:extension_index+1] + "mp4"
            
            # Video conversion commented out for testing purposes. 
            clip = moviepy.VideoFileClip(video_path + str(new_file.path))
            clip.write_videofile(video_path + mp4_path)
            
            new_file.path = mp4_path
            new_file.save()
    
        