from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    path('users/create/', views.CreateUser.as_view(), name='create_user'),
    path('video/update/<int:pk>/', views.UpdateVideoTitle.as_view(), name='update_video'),
    path('video/', views.VideoUploadViewSet.as_view(), name='video_viewset'),
]

urlpatterns = format_suffix_patterns(urlpatterns)