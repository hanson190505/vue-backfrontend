from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.authentication import BaseAuthentication
from rest_framework import serializers
from rest_framework.viewsets import ModelViewSet
# 为用户登录验证抛出异常
from rest_framework import exceptions
from api import models


def md5token(user):
	"""
	:param user:
	:return:
	根据用户名和当前时间戳生成token值
	"""
	import hashlib
	import time
	c_time = str(time.time())
	m = hashlib.md5(bytes(user, encoding='utf-8'))
	m.update(bytes(c_time, encoding='utf-8'))
	return m.hexdigest()


class UserAuth(APIView):
	# 自定义认证,空列表即表示不需要认证
	authentication_classes = []

	def post(self, request, *args, **kwargs):
		ret = {'code': 1000, 'msg': ''}
		print(request)
		try:
			user = request._request.POST.get('username')
			pwd = request._request.POST.get('password')
			obj = models.UserInfo.objects.filter(username=user, password=pwd).first()
			if not obj:
				ret['code'] = 1002
				ret['msg'] = '请输入用户名和密码'

			token = md5token(user)
			models.UserToken.objects.update_or_create(user=obj, defaults={'token': token})
			ret['token'] = token
			ret['msg'] = '登录成功'

		except Exception as e:
			ret['code'] = 1004
			ret['msg'] = '请求异常'

		return JsonResponse(ret)

	def get(self, request, *args, **kwargs):

		ret = {'code': 1000, 'msg': ''}

		return JsonResponse(ret)


class OrderView(APIView):

	def get(self, request, *args, **kwargs):
		# # 查看源码
		# self.dispatch()
		# ret = {'code': 1000, 'msg': ''}
		# token = request._request.GET.get('token')
		# if not token:
		# 	ret['code'] = 1003
		# 	ret['msg'] = '请先登录'
		print(request.user)
		print(request.auth)

		order_number = request._request.GET.get('order_number')
		obj = models.OrderCatalog.objects.filter(order_number=order_number).first()
		print(obj.__dict__)

		return HttpResponse(obj.__dict__)