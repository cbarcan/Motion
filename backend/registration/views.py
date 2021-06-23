from django.contrib.auth import get_user_model
# from django.core.mail import send_mail
from django.http import HttpResponse
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.response import Response

from registration.models import Registration
from registration.serializers import RegistrationSerializer, ValidationSerializer

User = get_user_model()


# class RegisterUserView(CreateAPIView):
#     send_mail(
#         'Subject here',
#         'Here is the message.',
#         'from@example.com',
#         ['to@example.com'],
#         fail_silently=False,
#     )

class RegistrationView(CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        new_user = User(email=request.data['email'], username='username', is_active=False)
        new_user.save()
        new_registration = Registration(user=new_user)
        new_registration.save()
        return HttpResponse(status=201)


class ValidationView(UpdateAPIView):
    serializer_class = ValidationSerializer
    permission_classes = []

    def get_object(self):
        return User.objects.get(email=self.request.data['email'])

    def patch(self, request, *args, **kwargs):
        if request.data['email'] in [elem.email for elem in User.objects.all()]:
            if User.objects.get(email=request.data['email']).registration.code == request.data['code']:
                user = self.get_object()
                user.username = request.data['username']
                if request.data['password'] == request.data['password_confirmation']:
                    user.set_password(request.data['password'])
                else:
                    return Response({'detail': 'password did not match'}, status=404)
                if request.data['first_name']:
                    user.first_name = request.data['first_name']
                if request.data['last_name']:
                    user.last_name = request.data['last_name']
                user.is_active = True
                user.save()
                registration = user.registration
                registration.is_used = True
                registration.save()
                serializer = self.get_serializer(user)
                return Response(serializer.data)
            else:
                return Response({'detail': 'code is not correct'}, status=404)
        else:
            return Response({'detail': 'email is not correct'}, status=404)
