from django.urls import path
from .views import ( AvailableUsers, 
                    InterestedUsers, 
                    RaiseChatRequestAPIView,
                    UpdateChatRequestStatusAPIView,
                    RecivedRequestUsers)

urlpatterns = [
	path('available-users/', AvailableUsers.as_view(), name='availableUsersList'),
	path('intrested-users/', InterestedUsers.as_view(), name='MyIntrestedUsersList'),
	
	path('recived-requests-users/', RecivedRequestUsers.as_view(), name='MyPendingUsersList'),
 
 path('raise-request/', RaiseChatRequestAPIView.as_view(), name='raiseChatRequest'),
    path('update-request-status/', UpdateChatRequestStatusAPIView.as_view(), name='updateChatRequestStatus'),
]
