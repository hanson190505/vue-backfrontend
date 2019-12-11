# 为用户登录验证抛出异常
from rest_framework import exceptions
from api import models
from rest_framework.authentication import BaseAuthentication


class FirstAuthentication(BaseAuthentication):

	def authenticate(self, request):
		pass

	def authenticate_header(self, request):
		pass


class Authentication(BaseAuthentication):
	www_authenticate_realm = 'api'

	def authenticate(self, request):
		token = request._request.GET.get('token')
		token_obj = models.UserToken.objects.filter(token=token).first()
		if not token_obj:
			# 用户未登录即抛出这个错误,必须这样使用
			raise exceptions.AuthenticationFailed('用户认证失败')
		# 返回request.user和request.auth
		return (token_obj.user, token_obj)

	def authenticate_header(self, request):
		return 'Basic realm="%s"' % self.www_authenticate_realm