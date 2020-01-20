from rest_framework.permissions import BasePermission
from user.models import UserInfo


class UserTokenPermission(BasePermission):
	def has_permission(self, request, view):
		return isinstance(request.user, UserInfo)

	# def has_object_permission(self, request, view, obj):
	# 	return obj.sales == request.user



