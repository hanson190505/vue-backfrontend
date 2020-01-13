from rest_framework import serializers
from api.models import Customers, OrderCatalog


class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = "__all__"


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderCatalog
        fields = "__all__"
