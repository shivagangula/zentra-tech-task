from django.urls import path
from .views import  LoginApiView, SignupApiView

urlpatterns = [
	path('login/', LoginApiView.as_view(), name='login'),
	path('signup/', SignupApiView.as_view(), name='signup'),
]
