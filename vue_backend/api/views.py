from api.serializer import OrdersSerializer, CustomersSerializer
from api.models import OrderCatalog, Customers
from rest_framework.viewsets import ModelViewSet


class OrdersViewSet(ModelViewSet):
    queryset = OrderCatalog.objects.filter(is_delete=False).order_by('-order_date')
    serializer_class = OrdersSerializer

    def perform_create(self, serializer):
        serializer.save(sales=self.request.user)


class CustomerViewSet(ModelViewSet):
    queryset = Customers.objects.filter(is_delete=False).order_by('status')
    serializer_class = CustomersSerializer

    def perform_create(self, serializer):
        serializer.save(sales=self.request.user)
