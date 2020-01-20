from rest_framework import serializers
from api.models import Customers, OrderCatalog, SubOrder


class CustomersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customers
        fields = "__all__"


class OrdersSerializer(serializers.ModelSerializer):
    sales = serializers.StringRelatedField()

    class Meta:
        model = OrderCatalog
        exclude = ['is_delete']


class SubOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubOrder
        exclude = ['is_delete']