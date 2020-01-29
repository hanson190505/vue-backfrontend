from rest_framework import serializers
from api.models import Customers, OrderCatalog, SubOrder


class CustomersSerializer(serializers.ModelSerializer):
    sales = serializers.StringRelatedField()

    class Meta:
        model = Customers
        exclude = ['is_delete']


class OrdersSerializer(serializers.ModelSerializer):
    sales = serializers.StringRelatedField()

    class Meta:
        model = OrderCatalog
        exclude = ['is_delete']


class SubOrderSerializer(serializers.ModelSerializer):
    sales = serializers.StringRelatedField()

    class Meta:
        model = SubOrder
        # exclude = ['is_delete']
        fields = "__all__"
        depth = 1

