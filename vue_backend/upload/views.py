from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from upload.serializer import ImageSerializer
from user.authentications import UploadTokenAuthentication, GetTokenAuthentication
from utils import juhe


class FileUploadView(APIView):
    parser_class = (MultiPartParser, FormParser)
    authentication_classes = UploadTokenAuthentication,

    def post(self, request, *args, **kwargs):
        # print(request.data)
        allow_suffix = ['jpg', 'jpeg', 'png']
        file_serializer = ImageSerializer(data=request.data)
        file_name = request.data['file'].name
        file_suffix = file_name.split('.')[-1]
        # print(file_suffix)
        if file_suffix not in allow_suffix:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # print(type(request.data['file']))
        # a = 'hanson.jpg'
        # a.lstrip('.')
        # request.data['file'].name = 'hanson.jpg'
        # print(type(request.data['file'].name))

        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class getExrateApiview(APIView):
    authentication_classes = GetTokenAuthentication,

    def get(self,request, *args, **kwargs):
        data = juhe.get_Ex_Rate()
        return Response(data)
