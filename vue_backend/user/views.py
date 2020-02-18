import uuid
from django.contrib.auth.hashers import make_password
from django.core.cache import cache
from rest_framework import status, exceptions
from rest_framework.decorators import action
from rest_framework import viewsets, generics
from rest_framework.response import Response
from user.models import UserInfo
from user.serializer import UserInfoSerializer, PostUserInfoSerializer
from user.authentications import GetTokenAuthentication, UserTokenAuthentication
from middleware.pagenation import SubOrderPagination
from django_filters.rest_framework import DjangoFilterBackend


class getStoreStateViewSet(generics.RetrieveAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer
    authentication_classes = GetTokenAuthentication,
    filterset_fields = ['u_name']

    def retrieve(self, request, *args, **kwargs):
        print(request.user)
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class UserApiViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all().order_by('id')
    serializer_class = UserInfoSerializer
    authentication_classes = UserTokenAuthentication,
    pagination_class = SubOrderPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['u_name']

    def perform_create(self, serializer):
        serializer.save(u_password=make_password(self.request.data['u_password']))

    def create(self, request, *args, **kwargs):
        serializer = PostUserInfoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        else:
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)


class UserInfoApiView(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all().order_by('id')
    serializer_class = UserInfoSerializer
    permission_classes = []
    authentication_classes = []
    lookup_url_kwarg = 'id'

    @action(detail=True, method=['post'])
    def log(self, request, pk=None):
        # ac = request.query_params.get('ac')
        ac = request.data['ac']
        username = request.data['username']
        password = make_password(request.data['password'])
        if ac == 'register':
            is_use = request.data['is_use']
            permissions = request.data['permissions']
            self.queryset.create(u_name=username, u_password=password, is_use=is_use, permissions=permissions)
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
            elif user.u_name != 'admin' and not user.verify_password(request.data.get('password')):
                data = {
                    'msg': '密码错误',
                    'status': 411,
                }
                return Response(data)
            elif user.is_use == 1:
                data = {
                    'msg': '用户审核中',
                    'status': 412,
                }
                return Response(data)
            elif user.u_name == 'admin' and user.u_password == request.data.get('password'):
                token = uuid.uuid4().hex
                cache.set(token, user, 60*60*24*7)
                data = {
                    'msg': '登录成功',
                    'status': 2000,
                    'token': token,
                    'name': username,
                    'permissions': user.permissions,
                    'id': user.id
                }
                return Response(data)
        elif ac == 'logout':
            cache.delete(request.data.get('token'))
            data = {
                'msg': '退出成功',
                'status': 210,
            }
            return Response(data)
