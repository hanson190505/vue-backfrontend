import uuid

import qiniu
from django.core.cache import cache
from rest_framework import generics, status
from rest_framework.response import Response

from api.serializer import OrdersSerializer, CustomersSerializer, SubOrderSerializer
from api.models import OrderCatalog, Customers, SubOrder
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework import mixins

from middleware.pagenation import SubOrderPagination
from user.authentications import GetTokenAuthentication
from vuebackend import settings


# 获取两个日期之间的查询参数
def get_search_date(self):
    start = self.request.query_params.get('start_date', None)
    end = self.request.query_params.get('end_date', None)
    argument = self.request.query_params.get('argument', None)
    return start, end, argument


class OrdersViewSet(ModelViewSet):
    queryset = OrderCatalog.objects.filter(
        is_delete=1).order_by('-order_date')
    serializer_class = OrdersSerializer
    filterset_fields = ['order_number', 'order_date', 'is_done',
                        'ship_addr', 'text', 'customer', 'deliver_date', 'ex_rate']
    authentication_classes = GetTokenAuthentication,

    def perform_create(self, serializer):
        serializer.save(sales=self.request.user)

    def get_queryset(self):
        start, end, argument = get_search_date(self)
        if start and end and argument == 'order_date':
            return self.queryset.filter(order_date__gte=start).filter(order_date__lte=end)
        return self.queryset

    def list(self, request, *args, **kwargs):
        # 自定义list时,不能取消下面这段代码,否则前端不能及时获取新增数据
        queryset = self.filter_queryset(self.get_queryset())
        st = self.request.query_params.get('st')
        if st == 'addorder':
            subtoken = uuid.uuid4().hex
            cache.set(subtoken, 'addorder', 60*60*24)
            data = {
                'msg': 'addorder',
                'status': 200,
                'subtoken': subtoken
            }
            return Response(data)
        else:
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        subtoken = self.request.query_params.get('subtoken')
        if not subtoken:
            data = {
                'msg': '无效的提交,请刷新重试',
                'status': 440
            }
            return Response(data)
        else:
            print(request.data)
            print(type(request.data))
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CustomerViewSet(ModelViewSet):
    queryset = Customers.objects.filter(is_delete=1).order_by('status')
    serializer_class = CustomersSerializer
    authentication_classes = GetTokenAuthentication,

    def perform_create(self, serializer):
        serializer.save(sales=self.request.user)

    def list(self, request, *args, **kwargs):
        # 自定义list时,不能取消下面这段代码,否则前端不能及时获取新增数据
        queryset = self.filter_queryset(self.get_queryset())
        st = self.request.query_params.get('st')
        if st == 'addcustomer':
            subtoken = uuid.uuid4().hex
            cache.set(subtoken, 'addcustomer', 60*60*24)
            data = {
                'msg': 'addcustomer',
                'status': 200,
                'subtoken': subtoken
            }
            return Response(data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SubOrderViewSet(ModelViewSet):
    queryset = SubOrder.objects.filter(is_delete=1).order_by('status')
    serializer_class = SubOrderSerializer
    authentication_classes = GetTokenAuthentication,
    pagination_class = SubOrderPagination

    def perform_create(self, serializer):
        serializer.save(sales=self.request.user)

    def get_queryset(self):
        param = self.request.query_params.get('param')
        print(param)
        if param:
            return self.queryset.filter(order_number__order_number__contains=param)
        else:
            return self.queryset

    def create(self, request, *args, **kwargs):
        subtoken = self.request.query_params.get('subtoken')
        if not subtoken:
            data = {
                'msg': '无效的提交,请刷新重试',
                'status': 440
            }
            return Response(data)
        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        order_number = self.request.query_params.get('order_number')
        page = self.paginate_queryset(queryset)
        if order_number:
            sub_order_list = self.queryset.filter(order_number=order_number).all()
            serializer = self.get_serializer(sub_order_list, many=True)
            return Response(serializer.data)
        elif page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        else:
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
