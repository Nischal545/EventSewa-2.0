from django.urls import path
from .views import send_email

urlpatterns = [
    # path('receiveEmailOTP/', receive_data),
    path('receiveEmailOTP/', send_email),
    # path('receivePhoneOTP/', receive_data),
]
