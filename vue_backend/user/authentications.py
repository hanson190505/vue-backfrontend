from django.core.cache import cache
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication
from rest_framework.response import Response


class UserTokenAuthentication(BaseAuthentication):

	def authenticate(self, request):
		token = request.headers['authorization']
		user = cache.get(token)
		if user.u_name == 'admin':
			return user, token
		else:
			msg = 'Invalid basic header. Credentials string should not contain spaces.'
			raise exceptions.AuthenticationFailed(msg)


class GetTokenAuthentication(BaseAuthentication):

	def authenticate(self, request):
		# 这个request是drf封装之后的request
		token = request.headers['authorization']
		user = cache.get(token)
		if user.is_use == 1:
			return user, token
		else:
			msg = 'Invalid basic header. Credentials string should not contain spaces.'
			raise exceptions.AuthenticationFailed(msg)


class UploadTokenAuthentication(BaseAuthentication):

	def authenticate(self, request):
		token = request.data.get('token')
		user = cache.get(token)
		if user:
			return user, token