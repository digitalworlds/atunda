from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
import json

client = Client()

class RetrieveJWTTest(TestCase):
    
    def setUp(self):
        self.testUser = {
            'username': 'testuser',
            'password': 'testing'
        }


    def test_login(self):
        user = User.objects.create_user(username=self.testUser['username'], password=self.testUser['password'])
        
        response = client.post(
            reverse('retrieve_jwt'),
            data = json.dumps(self.testUser),
            content_type='application/json'
        )
        print(response)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)