from django.core.cache import cache
from rest_framework.authentication import BaseAuthentication


class UserTokenAuthentication(BaseAuthentication):

	def authenticate(self, request):
		token = request.data.get('token')
		user = cache.get(token)
		if user:
			return user, token


class GetTokenAuthentication(BaseAuthentication):

	def authenticate(self, request):
		token = request.query_params.get('token')
		user = cache.get(token)
		if user:
			return user, token

