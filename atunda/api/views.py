from django.shortcuts import render
from api.models import videoUpload, userPermissions
from rest_framework import generics
from django.contrib.auth.models import User, Permission
from rest_framework import permissions
from api.serializers import UserSerializer,CreateUserSerializer, VideoUploadSerializer, UserPermissionsSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
import moviepy.editor as moviepy
from api.pose_detection import get_pose_array

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
        # if file_type != "mp4":
        #     video_path = str(settings.BASE_DIR)[:-6] + 'atunda/media/'
        #     print(video_path)
        #     mp4_path = str(new_file.path)[:extension_index+1] + "mp4"
            
        #     # Video conversion commented out for testing purposes. 
        #     clip = moviepy.VideoFileClip(video_path + str(new_file.path))
        #     clip.write_videofile(video_path + mp4_path)
            
        #     new_file.path = mp4_path
        #     new_file.save()
    
class UpdateVideoTitle(APIView):
    
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk, format=None):

        # Attempts to get the video object associated with that pk
        try:
          video = videoUpload.objects.get(pk=pk)
        except videoUpload.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # If the owner of that video is not the user making the request returns error
        if video.owner != self.request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Only allows edits to title or tags properties
        if "path" in request.data or "owner" in request.data or "owner_id" in request.data or "created" in request.data:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Updates the title/tags properties
        serialzer = VideoUploadSerializer(video, data=request.data, partial=True)

        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data)
        return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteVideo(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # Retrieves the video with the input id (pk) and deletes if the request user and video owner match
    def delete(self, request, pk, format=None):
        try:
          video = videoUpload.objects.get(pk=pk)
        except:
          return Response(status=status.HTTP_404_NOT_FOUND)

        if video.owner != self.request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        try:
            video.delete()
            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# # class Temp(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         user_permissions = user.user_permissions.all()
#         permission_names = [permissions.name for permission in user_permissions]
#         return Response({'permissions': permission_names}, status=status.HTTP_200_OK)

#     def post(self, request):
#         user = request.user
#         codenames = request.codenames
#         for codename in codenames:
#             curr_permission = Permission.objects.get(codename=codename)
#             user.user_permissions.add(curr_permission)
#         return Response({'permissions': codenames}, status=status.HTTP_201_CREATED)


class UserPermissions(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # Gets the permissions model for the request's user
    def get(self, request):
        user = request.user
        user_permissions = userPermissions.objects.filter(user=user)[0]
        permissions_serializer = UserPermissionsSerializer(user_permissions)
        return Response(permissions_serializer.data, status=status.HTTP_200_OK)

    # Sets the permissions for the request's user
    def post(self, request):
        user = request.user
        data = request.data
        user_permissions = userPermissions.objects.get_or_create(user=user)[0]
        user_permissions.allow_for_model = True if data['allow_for_model'] == "true" else False
        user_permissions.allow_for_dataset = True if data['allow_for_dataset'] == "true" else False
        user_permissions.save()

        permissions_serializer = UserPermissionsSerializer(user_permissions)

        return Response(permissions_serializer.data, status=status.HTTP_201_CREATED)

class AddPoseDetection(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data
        video = videoUpload.objects.filter(path=f"videos/{data['input']}")

        if len(video) == 0:
            return Response(status=status.HTTP_404_NOT_FOUND)
        video = video[0]

        if video.owner != user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        video.is_pose_processing = True
        video.save()

        temp = get_pose_array(f"./media/{video.path}", f"./media/pose/{data['output']}", "./api/pose_landmarks/pose_landmarker.task")

        video.is_pose_processing = False
        video.save()

        return Response(status=status.HTTP_201_CREATED)
        
