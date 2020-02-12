from django.core.cache import cache
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication
from rest_framework.response import Response


class UserTokenAuthentication(BaseAuthentication):

	def authenticate(self, request):
		token = request.data.get('token')
		user = cache.get(token)
		if user:
			return user, token


class GetTokenAuthentication(BaseAuthentication):

	def authenticate(self, request):
		# print(request.headers)
		# for i in request.headers:
		# 	print(i, request.headers[i])
		# token = request.query_params.get('token')
		token = request.headers['authorization']
		user = cache.get(token)
		if user:
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