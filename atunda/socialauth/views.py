from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google.auth.transport import requests
from google.oauth2 import id_token
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import permissions

class GoogleSignInView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        # Get the ID token from the POST data sent by the frontend
        id_token_data = request.data.get('id_token')

        if not id_token_data:
            return Response({"error": "ID token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify the ID token with Google
            print(id_token_data)
            id_info = id_token.verify_oauth2_token(id_token_data, requests.Request(), settings.GOOGLE_CLIENT_ID)

            if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Invalid issuer.')
            print(id_info)
            # Check if the user exists in your database based on the email received from Google
            user, created = User.objects.get_or_create(username=id_info['sub'])
            
            # Sets/updates user first_name, last_name, and email
            if user.first_name != id_info['given_name']:
                user.first_name = id_info['given_name']
            if user.last_name != id_info['family_name']:
                user.last_name = id_info['family_name']
            if user.email != id_info['email']:
                user.email = id_info['email']
            user.save()
            # Generate a refresh token for the user
            refresh = RefreshToken.for_user(user)

            # Return the refresh and access tokens to the frontend
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'email': str(user.email),
                'first_name': str(user.first_name),
                'last_name': str(user.last_name),
                'profile_pic': str(id_info['picture'])
            }, status=status.HTTP_200_OK)

        except ValueError:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
