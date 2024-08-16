from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializers import (
	UserSerializer, LoginSerializer, SignupSerializer
)
class UserView(ListAPIView):
    """
    API view to list all users ordered by joined date.
    """    
    queryset = User.objects.filter(is_staff=False).order_by('date_joined')
    serializer_class = UserSerializer


class LoginApiView(TokenObtainPairView):
    """
    API view for user login to obtain JWT tokens.
    """    
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer


class SignupApiView(CreateAPIView):
    """
    API view for user signup.
    """    
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = SignupSerializer
