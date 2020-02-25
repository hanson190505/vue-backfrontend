from datetime import datetime
import os
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from upload.models import Image
from upload.serializer import ImageSerializer
from user.authentications import UploadTokenAuthentication, GetTokenAuthentication
from utils import juhe
from utils.image_upload import get_file_extension, is_allow_size, is_allowed_image_type, calculate_md5
from vuebackend.settings import MEDIA_ROOT


class ImageUploadVieSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    parser_class = (MultiPartParser, FormParser)
    serializer_class = ImageSerializer
    authentication_classes = UploadTokenAuthentication,

    def create(self, request, *args, **kwargs):
        file = request.data['file']
        owner = request.data['owner']
        order_number = request.data['order_number']
        year = str(datetime.now().year)
        month = str(datetime.now().month)
        ext = get_file_extension(file)
        file.name = order_number + '.{}'.format(ext)
        sub_path = owner + '/{}-{}/'.format(year, month)
        path = MEDIA_ROOT + sub_path
        md5 = calculate_md5(file)
        upload_img = Image.get_image_md5(md5)
        if not is_allow_size(file.size):
            return Response({'status': 1001})
        if not is_allowed_image_type(ext):
            return Response({'status': 1002})
        if upload_img:
            return Response({'file': upload_img.path, 'status': 1003})
        else:
            # 保存图片
            if os.path.exists(path):
                with open(path+file.name, "wb+") as f:
                    for chunk in file.chunks():
                        f.write(chunk)
            else:
                os.makedirs(path)
                with open(path+file.name, "wb+") as f:
                    for chunk in file.chunks():
                        f.write(chunk)
            upload_img = Image()
            upload_img.md5 = md5
            upload_img.path = sub_path+file.name
            upload_img.owner = owner
            upload_img.save()
        return Response({'file': upload_img.path, 'status': 1000}, status=status.HTTP_201_CREATED)


class getExrateApiview(APIView):
    authentication_classes = GetTokenAuthentication,

    def get(self,request, *args, **kwargs):
        data = juhe.get_Ex_Rate()
        return Response(data)
