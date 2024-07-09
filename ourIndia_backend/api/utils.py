# from django.core.mail import EmailMessage
# import os

# class Util:
#     @staticmethod
#     def send_email(data):
#         email = EmailMessage(
#             subject=data['subject'],
#             body=data['body'],
#             from_email=os.environ.get('EMAIL_FROM'),
#             to=[data['to_email']]
#         )
#         email.send()



# utils.py
from django.core.mail import EmailMessage
import os

class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data['subject'],
            body=data['body'],
            from_email=os.environ.get('EMAIL_FROM'),
            to=[data['to_email']]
        )
        try:
            email.send()
            print("Email sent successfully")
        except Exception as e:
            print(f"Failed to send email: {e}")
            raise e
