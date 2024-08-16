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


class RaiseChatRequestSerializer(serializers.ModelSerializer):
    opt_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = ChatInterestUser
        fields = ['opt_user']