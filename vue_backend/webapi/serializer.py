from rest_framework import serializers
from webapi.models import ProductsType, Products


class ProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Products
        fields = '__all__'


class ProductTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductsType
        fields = '__all__'
