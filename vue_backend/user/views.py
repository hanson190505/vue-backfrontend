import uuid
from django.contrib.auth.hashers import make_password
from django.core.cache import cache
from rest_framework import exceptions
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.response import Response
from user.models import UserInfo
from user.permissions import UserTokenPermission
from user.serializer import UserInfoSerializer


# class UserInfoApiView(CreateAPIView, ListAPIView):
#     queryset = UserInfo.objects.all()
#     serializer_class = UserInfoSerializer
#
#     def get(self, request, *args, **kwargs):
#         password = ''
#         return self.list(request, password, **kwargs)
#
#     def post(self, request, *args, **kwargs):
#         action = request.query_params.get('action')
#         username = request.data.get('username')
#         password = request.data.get('password')
#         if action == 'register':
#             self.queryset.create(u_name=username, u_password=password)
#             data = {
#                 'msg': '注册成功',
#                 'status': 201,
#                 'username': username
#             }
#             return Response(data)
#         elif action == 'login':
#             users = self.queryset.filter(u_name=username)
#             if not users.exists():
#                 raise exceptions.ValidationError(detail='用户不存在')
#             user = users.first()
#             if not user.verify_password(password):
#                 raise exceptions.ValidationError(detail='password err')
#             if not user.is_use:
#                 raise exceptions.ValidationError(detail='用户审核未通过')
#             token = uuid.uuid4().hex
#             cache.set(token, user, 60*60*24*7)
#             data = {
#                 'msg': '登录成功',
#                 'status': 200,
#                 'token': token
#             }
#             return Response(data)
#         elif action == 'logout':
#             cache.delete(request.data.get('token'))
#             data = {
#                 'msg': '退出成功',
#                 'status': 200,
#             }
#             return Response(data)


class UserInfoApiView(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all().order_by('id')
    serializer_class = UserInfoSerializer
    permission_classes = []
    authentication_classes = []

    @action(detail=True, method=['post'])
    def log(self, request, pk=None):
        # ac = request.query_params.get('ac')
        ac = request.data['ac']
        username = request.data['username']
        password = make_password(request.data['password'])
        if ac == 'register':
            self.queryset.create(u_name=username, u_password=password)
            data = {
                'msg': '注册成功',
                'status': 201,
                'username': username
            }
            return Response(data)
        elif ac == 'login':
            users = self.queryset.filter(u_name=username)
            user = users.first()
            if not users.exists():
                data = {
                    'msg': '用户不存在',
                    'status': 410,
                }
                return Response(data)
            elif not user.verify_password(request.data.get('password')):
                data = {
                    'msg': '密码错误',
                    'status': 411,
                }
                return Response(data)
            elif not user.is_use:
                data = {
                    'msg': '用户审核中',
                    'status': 412,
                }
                return Response(data)
            else:
                token = uuid.uuid4().hex
                cache.set(token, user, 60*60*24*7)
                data = {
                    'msg': '登录成功',
                    'status': 2000,
                    'token': token,
                    'name': username
                }
                return Response(data)
        elif ac == 'logout':
            cache.delete(request.data.get('token'))
            data = {
                'msg': '退出成功',
                'status': 210,
            }
            return Response(data)

    @action(detail=False)
    def recent_users(self, request):
        self.permission_classes = UserTokenPermission,
        recent_users = UserInfo.objects.all()

        page = self.paginate_queryset(recent_users)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(recent_users, many=True)
        return Response(serializer.data)

