import random
import json
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import send_mail_to_client
from django.views.decorators.cache import cache_page
from .models import Caching

# from django_redis import get_redis_connection

caching_data = []


# Create your views here.
@csrf_exempt
def receive_data(request):
    print("METHOD:", request.method)
    print("CONTENT-TYPE:", request.content_type)
    print("BODY:", request.body)
    print("POST:", request.POST)

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

    if request.method != "POST":
        return JsonResponse({"success": False, "message": "Invalid request method"})

    try:
        data = json.loads(request.body)

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return JsonResponse({
                "success": False,
                "message": "Missing required fields"
            })

        otp = random.randint(100000, 999999)

        send_mail_to_client([email], otp)

        record = Caching.objects.create(
            name=name,
            email=email,
            password=password,
            otp=otp,
            verified=False
        )

        return JsonResponse({
            "success": True,
            "message": "OTP sent successfully"
        })

    except Exception as e:
        print("Error:", e)

        return JsonResponse({
            "success": False,
            "message": str(e)
        })

@csrf_exempt
def verify_otp(request):

    if request.method != "POST":
        return JsonResponse({"success": False})

    try:
        data = json.loads(request.body)

        email = data.get("email")
        user_otp = data.get("otp")

        record = Caching.objects.filter(email=email).order_by('-id').first()

        if not record:
            return JsonResponse({
                "success": False,
                "message": "User not found"
            })

        if str(record.otp) == str(user_otp):

            record.verified = True
            record.save()

            return JsonResponse({
                "success": True,
                "message": "Email verified successfully"
            })

        return JsonResponse({
            "success": False,
            "message": "Invalid OTP"
        })

    except Exception as e:
        print("Verification error:", e)

        return JsonResponse({
            "success": False,
            "message": str(e)
        })