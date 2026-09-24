from django.core.mail import send_mail as django_send_mail, get_connection
from django.conf import settings

def send_mail_to_client(recipient_list, otp):
    mailer_config = settings.MAILERS

    subject = "OTP from EventSewa"
    message = f"Following is the OTP for EventSewa login. Please enter the OTP below: {otp}"
    from_email = mailer_config['default']['OPTIONS']['username']
    print("This is from the from_email:", from_email)

    connection = get_connection(
        host = mailer_config['default']['OPTIONS']['host'],
        port = mailer_config['default']['OPTIONS']['port'],
        username = mailer_config['default']['OPTIONS']['username'],
        password = mailer_config['default']['OPTIONS']['password'],
        use_tls = mailer_config['default']['OPTIONS']['use_tls'],
    )
    django_send_mail(subject, message, from_email, recipient_list, connection=connection, fail_silently=False)

