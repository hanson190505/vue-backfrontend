import uuid
from django.core.cache import cache
from django.db.models import Q
from rest_framework import status, exceptions
from rest_framework.response import Response
from api.serializer import OrdersSerializer, CustomersSerializer, SubOrderSerializer, PurchaseOrderSerializer, \
    PurchaseDetailSerializer, PostPurchaseOrderSerializer, PostSubOrderSerializer, PostOrdersSerializer, \
    PostPurchaseDetailSerializer, ShipOrderSerializer, ShipDetailSerializer, PostShipDetailSerializer
from api.models import OrderCatalog, Customers, SubOrder, PurchaseOrder, PurchaseDetail, ShipOrder, ShipDetail
from rest_framework.viewsets import ModelViewSet
from middleware.pagenation import SubOrderPagination
from user.authentications import GetTokenAuthentication


# 获取两个日期之间的查询参数
def get_search_date(self):
    start = self.request.query_params.get('start_date', None)
    end = self.request.query_params.get('end_date', None)
    argument = self.request.query_params.get('argument', None)
    return start, end, argument


class OrdersViewSet(ModelViewSet):
    queryset = OrderCatalog.objects.filter(
        is_delete=0).order_by('-order_date')
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
            serializer = PostOrdersSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CustomerViewSet(ModelViewSet):
    # todo:取消order_by会不会对前端获取数据产生影响,不会则取消order_by优化数据库访问速度
    queryset = Customers.objects.filter(is_delete=0).order_by('status')
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
    queryset = SubOrder.objects.filter(is_delete=0).order_by('status')
    serializer_class = SubOrderSerializer
    authentication_classes = GetTokenAuthentication,
    pagination_class = SubOrderPagination

    def perform_create(self, serializer):
        serializer.save(sales=self.request.user)

    def get_queryset(self):
        argument = self.request.query_params.get('argument')
        param = self.request.query_params.get('param')
        val = self.request.query_params.get('val')
        if param:
            # return self.queryset.filter(order_number__order_number__iexact=param).all()
            return self.queryset.filter(Q(order_number__order_number__icontains=param) |
                                        Q(order_number__customer__lite_name__icontains=param))
        elif argument:
            start, end, argument = get_search_date(self)
            return self.queryset.filter(Q(order_number__order_date__gte=start) &
                                        Q(order_number__order_date__lte=end))
        elif val:
            if val == 'purchase':
                return self.queryset.filter(is_purchase=1)
            elif val == 'ship':
                return self.queryset.filter(is_purchase=0).filter(is_ship=1)
            elif val == 'acount':
                return self.queryset.filter(is_purchase=0).filter(is_ship=0).filter(is_account=1)
            elif val == 'done':
                return self.queryset.filter(is_purchase=0).filter(is_ship=0).filter(is_account=0)
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
            serializer = PostSubOrderSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        order_number = self.request.query_params.get('order_number')
        page = self.paginate_queryset(queryset)
        if order_number:
            sub_order_list = self.queryset.filter(order_number_id=order_number)
            serializer = self.get_serializer(sub_order_list, many=True)
            return Response(serializer.data)
        elif page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        else:
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)


class PurchaseOrderViewSet(ModelViewSet):
    """采购单视图"""
    queryset = PurchaseOrder.objects.filter(is_delete=0).order_by('-input_date')
    serializer_class = PurchaseOrderSerializer
    authentication_classes = GetTokenAuthentication,
    pagination_class = SubOrderPagination

    def perform_create(self, serializer):
        serializer.save(sales=self.request.user)

    def create(self, request, *args, **kwargs):
        subtoken = self.request.query_params.get('subtoken')
        if not subtoken:
            raise exceptions.ValidationError
        else:
            serializer = PostPurchaseOrderSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PurchaseDetailViewSet(ModelViewSet):
    """采购明细视图"""
    queryset = PurchaseDetail.objects.filter(is_delete=0).order_by('id')
    serializer_class = PurchaseDetailSerializer
    authentication_classes = GetTokenAuthentication,
    pagination_class = SubOrderPagination

    def get_queryset(self):
        param = self.request.query_params.get('param')
        argument = self.request.query_params.get('argument')
        if param:
            return self.queryset.filter(Q(sub_order__order_number__order_number__icontains=param) |
                                        Q(sub_order__pro_name__icontains=param) |
                                        Q(sub_order__pro_desc__icontains=param))
        elif argument:
            start, end, argument = get_search_date(self)
            return self.queryset.filter(Q(purchase_number__purchase_date__gte=start) &
                                        Q(purchase_number__purchase_date__lte=end))
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
            # print(request.data)
            serializer = PostPurchaseDetailSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        purchase_number = self.request.query_params.get('purchase_number')
        page = self.paginate_queryset(queryset)
        if purchase_number:
            purchase_list = self.queryset.filter(purchase_number=purchase_number)
            serializer = self.get_serializer(purchase_list, many=True)
            return Response(serializer.data)
        elif page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        else:
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)


class ShipOrderViewSet(ModelViewSet):
    queryset = ShipOrder.objects.filter(is_delete=0).order_by('ship_date')
    serializer_class = ShipOrderSerializer
    authentication_classes = GetTokenAuthentication,
    pagination_class = SubOrderPagination

    def perform_create(self, serializer):
        serializer.save(sales=self.request.user)


class ShipDetailViewSet(ModelViewSet):
    queryset = ShipDetail.objects.filter(is_delete=0).order_by('id')
    serializer_class = ShipDetailSerializer
    authentication_classes = GetTokenAuthentication,
    pagination_class = SubOrderPagination

    def create(self, request, *args, **kwargs):
        subtoken = self.request.query_params.get('subtoken')
        if not subtoken:
            raise exceptions.ValidationError
        else:
            serializer = PostShipDetailSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        param = self.request.query_params.get('param')
        argument = self.request.query_params.get('argument')
        if param:
            return self.queryset.filter(Q(ship_number__ship_number__icontains=param) |
                                        Q(sub_order__order_number__order_number__icontains=param))
        elif argument:
            start, end, argument = get_search_date(self)
            return self.queryset.filter(Q(ship_number__ship_date__gte=start) &
                                        Q(ship_number__ship_date__lte=end))
        else:
            return self.queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        ship_number = self.request.query_params.get('ship_number')
        page = self.paginate_queryset(queryset)
        if ship_number:
            sub_order_list = self.queryset.filter(ship_number=ship_number)
            serializer = self.get_serializer(sub_order_list, many=True)
            return Response(serializer.data)
        elif page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        else:
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)