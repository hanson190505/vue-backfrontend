from django.db import models
from datetime import datetime
from user.models import UserInfo
from django.contrib.postgres.fields import HStoreField, ArrayField


class Customers(models.Model):
    """
    客户表
    """
    CS_STATUS = (
        (1, '合作'),
        (2, '终止'),
        (3, '开发'),
    )
    CS_TYPE = (
        (1, '采购商'),
        (2, '供应商'),
        (3, '采购&供应'),
    )
    type = models.IntegerField('客户类别', choices=CS_TYPE)
    name = models.CharField('公司名称', max_length=100, default='选填')
    lite_name = models.CharField(
        '公司简称', max_length=32, primary_key=True, help_text='如无公司则填联系人或CEO名称')
    address = models.CharField('公司地址', max_length=200, default='选填')
    phone = models.CharField('公司电话', max_length=40, default='选填')
    website = models.URLField('网址', max_length=200, default='https://example.com')
    business = models.CharField('主营业务', max_length=64)
    ceo = models.CharField('CEO', max_length=50, default='选填')
    email = models.EmailField('CEO邮箱', max_length=100,
                              default='example@email.com')
    ceo_phone = models.CharField('CEO电话', max_length=20, default='选填')
    contact_name = models.CharField('联系人', max_length=100)
    contact_email = models.EmailField('联系人邮箱', max_length=100)
    contact_phone = models.CharField('联系人电话', max_length=50)
    status = models.IntegerField('合作状态', choices=CS_STATUS)
    sales = models.ForeignKey(UserInfo, verbose_name='业务',
                              on_delete=models.CASCADE, null=True, blank=True)
    line_credits = models.DecimalField(
        '信用额度', default=0, max_digits=10, decimal_places=2)
    input_time = models.DateField('添加日期', auto_now_add=True)
    text = models.CharField('备注', max_length=480, default='选填')
    is_delete = models.IntegerField(default=0)
    # 让模型代码用objects能自动补全
    objects = models.Manager()

    class Meta:
        verbose_name = '客户信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.lite_name


class OrderCatalog(models.Model):
    """
    订单目录
    """
    ORDER_STATUS = (
        (0, '正常'),
        (1, '紧急'),
    )
    customer = models.ForeignKey(
        Customers, verbose_name='客户', on_delete=models.CASCADE)
    order_number = models.CharField(
        "订单编号", max_length=64, null=False, primary_key=True)
    order_date = models.DateField("下单日期", default=datetime.now)
    deliver_date = models.DateField("订单交期")
    sales = models.ForeignKey(UserInfo, verbose_name='业务',
                              on_delete=models.CASCADE, null=True, blank=True)
    input_date = models.DateField("录入日期", auto_now=datetime.now)
    ex_rate = models.DecimalField("汇率", max_digits=10, decimal_places=2)
    order_amount = models.DecimalField("金额", max_digits=20, decimal_places=4)
    order_pic = models.CharField(max_length=128, null=True, blank=True)
    is_done = models.IntegerField('状态', choices=ORDER_STATUS, default=0)
    text = models.CharField('备注', max_length=480, default='选填')
    ship_addr = models.CharField('出货地点', max_length=200, default='暂无')
    is_delete = models.IntegerField(default=0)
    objects = models.Manager()

    class Meta:
        verbose_name = '订单目录'
        verbose_name_plural = '订单目录'

    def __str__(self):
        return self.order_number


class SubOrder(models.Model):
    """订单明细"""
    PRO_ITEM = [
        (1, '硅胶'),
        (2, '五金'),
        (3, 'USB'),
        (4, '移动电源'),
        (5, '其他')
    ]
    pro_name = models.CharField("产品名称", max_length=50)
    pro_item = models.IntegerField('产品类别', choices=PRO_ITEM)
    pro_size = models.CharField('产品尺寸', max_length=64, default=0)
    # pro_color = models.CharField('产品颜色', max_length=64, default='color')
    # 产品颜色重构
    pro_color = models.CharField(max_length=1024, blank=True)
    pro_pack = models.CharField('产品包装', max_length=64, default='无')
    pro_desc = models.CharField("详细描述", max_length=400)
    pro_qt = models.DecimalField(
        verbose_name='数量(个)', max_digits=20, decimal_places=1)
    pro_price = models.DecimalField(
        verbose_name='单价($)', max_digits=20, decimal_places=4)
    pro_weight = models.DecimalField(
        verbose_name='单重(g)', max_digits=20, decimal_places=1)
    order_number = models.ForeignKey(OrderCatalog, on_delete=models.CASCADE, verbose_name='订单编号',
                                     related_name='sub_orders')
    sales = models.ForeignKey(UserInfo, verbose_name='业务',
                              on_delete=models.CASCADE, null=True, blank=True)
    sub_amount = models.DecimalField(
        '订单金额($)', default=0, max_digits=10, decimal_places=2)
    sub_input_date = models.DateField("录入日期", auto_now=datetime.now)
    is_delete = models.IntegerField(default=0)
    is_purchase = models.IntegerField(default=0)
    is_ship = models.IntegerField(default=0)
    is_account = models.IntegerField(default=0)
    is_reconciliation = models.IntegerField(default=0)
    status = models.IntegerField(default=1)
    objects = models.Manager()

    def __str__(self):
        return '%s-%s' % (self.pro_name, self.order_number)

    class Meta:
        verbose_name = '订单明细'
        verbose_name_plural = '订单明细'


class PurchaseOrder(models.Model):
    """采购订单"""

    purchaser = models.ForeignKey(
        Customers, verbose_name='供应商', on_delete=models.CASCADE)
    sales = models.ForeignKey(UserInfo, verbose_name='业务',
                              on_delete=models.CASCADE, null=True, blank=True)
    purchase_date = models.DateField('采购日期', default=datetime.now)
    deliver_date = models.DateField("采购交期")
    # 采购单号default直接调用create_purchase_number函数
    purchase_number = models.CharField(
        '采购单号', max_length=50, primary_key=True)
    input_date = models.DateTimeField(auto_now_add=True)
    text = models.CharField('备注', max_length=400, default='选填')
    # purchase_amount = models.DecimalField('采购金额', max_digits=10, decimal_places=2, default=0)
    is_delete = models.IntegerField(default=0)
    objects = models.Manager()

    class Meta:
        verbose_name = '采购订单'
        verbose_name_plural = '采购订单'

    def __str__(self):
        return self.purchase_number


class PurchaseDetail(models.Model):
    """采购明细"""
    purchase_number = models.ForeignKey(
        PurchaseOrder, on_delete=models.CASCADE, verbose_name='采购单号')
    sub_order = models.ForeignKey(
        SubOrder, on_delete=models.CASCADE, related_name='purchases', verbose_name='订单明细')
    purchase_price = models.DecimalField(
        '采购单价(¥)', max_digits=20, decimal_places=2, default=0)
    purchase_qt = models.DecimalField(
        '采购数量(个)', max_digits=20, decimal_places=2, default=0)
    purchase_amount = models.DecimalField(
        '采购金额($)', max_digits=20, decimal_places=4, default=0)
    text = models.CharField('备注', max_length=400, default='选填')
    is_delete = models.IntegerField(default=0)
    objects = models.Manager()

    class Meta:
        verbose_name = '采购明细'
        verbose_name_plural = '采购明细'

    def __str__(self):
        return '%s-%s' % (self.purchase_number, self.id)


class ShipOrder(models.Model):
    """订单出货"""
    SHIP_PLAN = PRO_ITEM = [
        ('国际快递', (
            (1, 'UPS'),
            (2, 'FedEx'),
            (3, 'DHL'),
        )
        ),
        (4, '国内快递'),
        (5, '船运'),
        (6, '自提'),
        (7, '第三方'),
        (8, '其他')
    ]
    ship_plan = models.IntegerField('出货方式', choices=SHIP_PLAN)
    ship_customer = models.ForeignKey(
        Customers, on_delete=models.CASCADE, verbose_name='货代')
    ship_number = models.CharField('出货单号', max_length=50)
    ship_date = models.DateField('出货日期', default=datetime.now)
    ship_cost = models.DecimalField('出货费用(¥)', max_digits=20, decimal_places=4)
    ship_weight = models.DecimalField(
        '重量(kg)', max_digits=10, decimal_places=2)
    sales = models.ForeignKey(UserInfo, verbose_name='业务',
                              on_delete=models.CASCADE, null=True, blank=True)
    text = models.CharField('备注', max_length=480, default='选填')
    destination = models.CharField(max_length=32, default='American')
    is_delete = models.IntegerField(default=0)
    input_date = models.DateTimeField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = '出货记录'
        verbose_name_plural = '出货记录'

    def __str__(self):
        return self.ship_number


class ShipDetail(models.Model):
    """出货明细"""
    ship_number = models.ForeignKey(
        ShipOrder, on_delete=models.CASCADE, verbose_name='出货单号')
    sub_order = models.ForeignKey(
        SubOrder, on_delete=models.CASCADE, related_name='ships', verbose_name='订单明细')
    ship_cost = models.DecimalField(
        '出货费用(¥)', max_digits=10, decimal_places=2, default=0)
    ship_weight = models.DecimalField(
        '出货重量(kg)', max_digits=8, decimal_places=2, default=0)
    is_delete = models.IntegerField(default=0)
    objects = models.Manager()

    class Meta:
        verbose_name = '出货明细'
        verbose_name_plural = '出货明细'

    def __str__(self):
        return '%s-%s' % (self.ship_number, self.id)


