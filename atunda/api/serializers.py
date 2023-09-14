from rest_framework import serializers
from api.models import videoUpload, userPermissions
from django.contrib.auth.models import User

class VideoUploadSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')
    owner_id = serializers.ReadOnlyField(source='owner.id')
    path = serializers.FileField(required=True)
    pose_path = serializers.FileField()

    class Meta:
        model = videoUpload
        fields = ['id', 'owner', 'owner_id', 'title', 'path', 'pose_path', 'tags', 'created', 'is_pose_processing']

class UserSerializer(serializers.ModelSerializer):
    videoUploads = serializers.PrimaryKeyRelatedField(many=True, queryset=videoUpload.objects.all())

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            videoUploads = [],
        )
        user.save()
        return user

    class Meta:
        model = User
        fields = ['username', 'password', 'videoUploads']

class CreateUserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        user.save()
        return user
    
    class Meta:
        model = User
        fields = ['username', 'password']

class UserPermissionsSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')
    user_id = serializers.ReadOnlyField(source='user.id')
    class Meta:
        model = userPermissions
        fields = ['user', 'user_id','allow_for_model', 'allow_for_dataset']