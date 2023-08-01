from rest_framework import serializers
from api.models import videoUpload
from django.contrib.auth.models import User

class VideoUploadSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    owner_id = serializers.ReadOnlyField(source='owner.id')
    path = serializers.FileField(required=False)

    class Meta:
        model = videoUpload
        fields = ['id', 'owner', 'owner_id', 'title', 'path', 'tags', 'created']

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