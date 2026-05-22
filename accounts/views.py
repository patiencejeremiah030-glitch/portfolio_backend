from django.contrib.auth import authenticate, get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import RegisterSerializer, UserSerializer
from .services import record_user_visit

User = get_user_model()


def _auth_response(user, *, is_login=False):
    record_user_visit(user, is_login=is_login)
    token, _ = Token.objects.get_or_create(user=user)
    return {
        "token": token.key,
        "user": UserSerializer(user).data,
    }


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            _auth_response(user, is_login=True),
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        identifier = (request.data.get("username") or "").strip()
        password = request.data.get("password") or ""

        if not identifier or not password:
            return Response(
                {"detail": "Username/email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        username = identifier
        if "@" in identifier:
            try:
                username = User.objects.get(email__iexact=identifier).username
            except User.DoesNotExist:
                pass

        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response(
                {"detail": "Invalid username/email or password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(_auth_response(user, is_login=True))


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        Token.objects.filter(user=request.user).delete()
        return Response({"detail": "Logged out successfully."})


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        record_user_visit(request.user, is_login=False)
        return Response(UserSerializer(request.user).data)
