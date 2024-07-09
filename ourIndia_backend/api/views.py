from distutils import errors
from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from .models import *

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from api.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from django.http import JsonResponse
from .utils import Util




# Create your views here.

# generate token manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }




class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializers = UserRegistrationSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        user = serializers.save()
        token = get_tokens_for_user(user)
        return Response({'token':token, 'msg':'Registration Successful'},
        status=status.HTTP_201_CREATED)
        
    

class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            return Response({'token':token, 'msg':'Login Success'},status=status.HTTP_200_OK)
        else:
            return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}},status=status.HTTP_404_NOT_FOUND)




class AllMonumentView(generics.ListAPIView):
    queryset = Monument.objects.all()
    serializer_class = MonumentSerializer

class MonumentDetailView(generics.RetrieveAPIView):
    queryset = Monument.objects.all()
    serializer_class = MonumentSerializer


class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)



class UserChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            # Password has already been changed by the serializer's validate method
            return Response({'msg': 'Password Changed Successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



        
    

class SendPasswordResetEmailView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response({'msg': 'Password reset email has been sent.'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

       
    


class UserPasswordResetView(APIView):
    def post(self, request, uidb64, token, *args, **kwargs):
        serializer = UserPasswordResetSerializer(data=request.data, context={'uid': uidb64, 'token': token})
        if serializer.is_valid():
            try:
                serializer.save()  # Not necessary in this case since validation already updates the user
                return Response({'msg': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    