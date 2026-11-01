from django.urls import path
from .views import send_email, verify_otp

urlpatterns = [
    path('receiveEmailOTP/', send_email, name='send_email'),
    path('verifyOTP/', verify_otp, name='verify_otp'),
]
