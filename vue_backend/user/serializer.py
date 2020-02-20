from rest_framework import serializers
from user.models import UserInfo


class UserInfoSerializer(serializers.ModelSerializer):

	class Meta:
		model = UserInfo
		fields = '__all__'


class UserLoginSerializer(serializers.ModelSerializer):

	class Meta:
		model = UserInfo
		exclude = ['u_password']


class PostUserInfoSerializer(serializers.ModelSerializer):

	class Meta:
		model = UserInfo
		fields = '__all__'


