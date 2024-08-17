
from rest_framework.generics import ListAPIView
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .models import ChatInterestUser
from django.db.models import Q
from .serializers import (
    UserSerializer,RequestedUserSerializer
)


from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView


class AvailableUsers(ListAPIView):
    """
    API view to list all users ordered by joined date.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        exclude_users_list = ChatInterestUser.objects.filter(
            raised_user=self.request.user.id
        ).values_list('opt_user', flat=True)

        queryset = User.objects.filter(is_staff=False).exclude(
            id__in=exclude_users_list
        ).exclude(id=self.request.user.id).order_by('date_joined')

        return queryset


class InterestedUsers(ListAPIView):
    """
    API view to list all users ordered by joined date.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        chat_intrested_users = ChatInterestUser.objects.filter(
            raised_user=self.request.user.id,
            status=2
        ).values('opt_user')
        return User.objects.filter(
            is_staff=False,
            id__in=chat_intrested_users
        )

class RecivedRequestUsers(ListAPIView):
    """
    API view to list all ChatInterestUser objects with User fields.
    """
    serializer_class = RequestedUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ChatInterestUser.objects.filter(
            raised_user=self.request.user.id,
            status__in=[0,3]
        )

class RaiseChatRequestAPIView(APIView):
    """
    API view to raise a chat interest request.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        opt_user = request.data.get('opt_user')
        message = request.data.get('message')

        try:
            # Check if a request already exists for the current user
            ChatInterestUser.objects.get(
                raised_user_id=request.user.id, opt_user_id=opt_user)
            return Response({"detail": "Request already raised."}, status=status.HTTP_400_BAD_REQUEST)
        except ChatInterestUser.DoesNotExist:
            # If no request exists, proceed to create a new one
            ChatInterestUser.objects.get_or_create(
                raised_user_id=request.user.id, opt_user_id=opt_user, message=message, status=3)
            ChatInterestUser.objects.get_or_create(
                opt_user_id=request.user.id, raised_user_id=opt_user, message=message, status=0)
            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)


class UpdateChatRequestStatusAPIView(APIView):
    """
    API view to accept or reject a chat interest request.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        raised_user_id = request.data.get('raised_user_id')
        status_choice = request.data.get('status')

        try:
            chat_request_one_side = ChatInterestUser.objects.get(
                raised_user_id=raised_user_id, opt_user=request.user.id)
            chat_request_other_side = ChatInterestUser.objects.get(
                raised_user_id=request.user.id, opt_user=raised_user_id)

        except ChatInterestUser.DoesNotExist:
            return Response({'error': 'Chat request not found or you do not have permission to update it.'}, status=status.HTTP_404_NOT_FOUND)

        if status_choice not in [0, 1, 2]:
            return Response({'error': 'Invalid status choice.'}, status=status.HTTP_400_BAD_REQUEST)

        chat_request_one_side.status = status_choice
        chat_request_one_side.save()

        chat_request_other_side.status = status_choice
        chat_request_other_side.save()
        return Response({'message': 'Request updated successfully.'}, status=status.HTTP_200_OK)
