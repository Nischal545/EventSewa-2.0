import random
import json
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import send_mail_to_client
from django.views.decorators.cache import cache_page
from django_redis import get_redis_connection
# Create your views here.

@csrf_exempt
def receive_data(request):

    try:
        data = json.loads(request.body) if request.body else {}
    except json.JSONDecodeError:
        data = {}

    name = data.get("name", None)
    email = data.get("email", None)
    password = data.get("password", None)
    phone_number = data.get("phone_number", None)

    print("Received from React: ", name, email, password, phone_number)
    return data

@csrf_exempt
def send_email(request):
    data = receive_data(request)

    email = data.get('email')

    if not email:
        return JsonResponse({"success": False, "message": "Email not provided"})

    otp = random.randint(1000, 9999)
    recipient_list = [email]

    try:
        send_mail_to_client(recipient_list, otp)
        return JsonResponse({
            "success": True,
            "message": "OTP sent successfully",
        })
    except Exception as e:
        print("Error sending email:", e)
        return JsonResponse({
            "success": False,
            "message": str(e),
        })

@cache_page(60 * 10)
def my_view(request):
    return HttpResponse("Hello, world.")

redis_connection = get_redis_connection("default")
redis_connection.set('my_key', 'my_value')
value = redis_connection.get('my_key')