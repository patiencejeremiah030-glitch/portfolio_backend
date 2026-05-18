from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny

from groq import Groq

from .serializers import ChatRequestSerializer


SYSTEM_PROMPT = (
    "You are a friendly portfolio assistant. "
    "Answer questions about the developer's projects, skills, "
    "experience, education, and how to contact them. "
    "Keep replies short, clear, and polite."
)


class ChatView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ChatRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_message = serializer.validated_data["message"]

        client = Groq(api_key=settings.GROQ_API_KEY)

        try:
            completion = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_message},
                ],
                temperature=0.5,
                max_tokens=512,
            )
            reply = completion.choices[0].message.content
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response({"reply": reply}, status=status.HTTP_200_OK)