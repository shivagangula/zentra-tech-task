from rest_framework import serializers

from django.contrib.auth.models import User
from .models import ChatInterestUser

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']

class RequestedUserSerializer(serializers.ModelSerializer):
    """
    Serializer for the ChatInterestUser model with nested User fields.
    """
    user = UserSerializer(source='opt_user')  # Assuming 'opt_user' is the related User field
    
    class Meta:
        model = ChatInterestUser
        fields = ['id', 'message','raised_user', 'opt_user', 'status', 'user']  # Include other fields as needed



    

class RaiseChatRequestSerializer(serializers.ModelSerializer):
    opt_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = ChatInterestUser
        fields = ['opt_user']