from rest_framework import serializers

from user.models import UserInfo


class UserInfoSerializer(serializers.ModelSerializer):

	class Meta:
		model = UserInfo
		fields = ['id', 'u_name', 'u_password']