from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import *
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util




class UserRegistrationSerializer(serializers.ModelSerializer):
    # we are writing this because we need confirm password field in our Registration Request
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    class Meta:
        model = User
        fields=['email', 'name', 'password', 'password2', 'tc']
        extra_kwargs={
            'password':{'write_only': True}
        }
    # Validating password and confirm password while registration
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError('Password and Confirm Password Fields Must Match')
        return attrs
    
    def create(self, validate_data):
        return User.objects.create_user(**validate_data)


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=225)
    class Meta:
        model = User
        fields = ['email', 'password']



class MonumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monument
        fields = ['id', 'name', 'place', 'Img', 'desc']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']



class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    
    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        
        if password != password2:
            raise serializers.ValidationError('Password and Confirm Password Fields Must Match')
        
        user.set_password(password)
        user.save()
        
        return attrs

    


class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

    def create(self, validated_data):
        # Dummy create method that just returns the validated data
        return validated_data

    def validate(self, attrs):
        email = attrs.get('email')

        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError('You are not a registered user.')

        user = User.objects.get(email=email)
        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        # link = f'http://localhost:3000/reset/{uid}/{token}'
        # link = f'http://localhost:3000/reset-password/{uid}/{token}'

        # body = f'Click the following link to reset your password: {link}'
        # body = 'Click the following link to reset your password: ' + link 

        link = f'http://localhost:5173/reset-password/{uid}/{token}'
        body = f'Click the following link to reset your password: <a href="{link}">reset your password</a>'
        



        data = {
            'subject': 'Reset Your Password',
            'body': body,
            'to_email': user.email
        }

        Util.send_email(data)  # Assuming Util.send_email() sends the email
        return attrs





class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']


    def create(self, validated_data):
        # Dummy create method that just returns the validated data
        return validated_data

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')

            if password != password2:
                raise serializers.ValidationError('Password and Confirm Password Fields Must Match')
            
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError('Token is not valid or expired')

            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError:
            raise serializers.ValidationError('Token is not valid or expired.')

