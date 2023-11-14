from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
import json

client = Client()

class CreateUserTest(TestCase):
    
    def setUp(self):
        self.testUser = {
            'username': 'testuser',
            'password': 'testing',
        }
        self.invalidUser = {
            'username': '',
            'password': '',
        }
    
    def test_create_user(self):
        response = client.post(
            reverse('create_user'),
            data=json.dumps(self.testUser),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        user = User.objects.first()
        self.assertEqual(user.username, 'testuser')
        self.assertTrue(user.check_password('testing'))
    
    def test_invalid_user(self):
        response = client.post(
            reverse('create_user'),
            data=json.dumps(self.invalidUser),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login(self):
        user = User.objects.create_user(username=self.testUser['username'], password=self.testUser['password'])
        
        response = client.post(
            reverse('token_obtain_pair'),
            data = json.dumps(self.testUser),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
    
    def test_refresh(self):
        user = User.objects.create_user(username=self.testUser['username'], password=self.testUser['password'])
        
        response = client.post(
            reverse('token_obtain_pair'),
            data = json.dumps(self.testUser),
            content_type='application/json'
        )
        
        response_refresh_data = {"refresh": response.data['refresh']}
        response_refresh = client.post(
            reverse('token_refresh'),
            data = json.dumps(response_refresh_data),
            content_type='application/json'
        )

        self.assertEqual(response_refresh.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)



# class FileUploadTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()
    
#     def test_file_upload(self):
#         file_content = b"Sample file content"
#         file = SimpleUploadedFile("test_file.mp4", file_content, content_type="video/mp4")
#         response = self.client.post("/api/video/", {"file": file})
#         print(response)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
#         file.close()