from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    path('users/create/', views.CreateUser.as_view(), name='create_user'),
    path('video/delete/<int:pk>/', views.DeleteVideo.as_view(), name='delete_video'),
    path('video/update/<int:pk>/', views.UpdateVideoTitle.as_view(), name='update_video'),
    path('video/<int:pk>/', views.VideoDetail.as_view(), name='check_status'),
    path('video/', views.VideoUploadViewSet.as_view(), name='video_viewset'),
    path('permissions/', views.UserPermissions.as_view(), name='user_permissions'),
    path('pose/get/<int:pk>/', views.GetPoseLandmarks.as_view(), name='get_pose'),
    path('pose/<int:pk>/', views.AddPoseDetection.as_view(), name='add_pose'),
]

urlpatterns = format_suffix_patterns(urlpatterns)