from datetime import datetime
from django.db import models
from ckeditor.fields import RichTextField


class ProductsType(models.Model):
    TYPE = (
        (1, '硅胶产品'),
        (2, '五金产品'),
        (3, '电子产品'),
        (4, '塑胶产品'),
        (5, '木制产品'),
        (6, '其他产品'),
    )
    type = models.IntegerField('产品大类', choices=TYPE)
    sub_type = models.CharField(
        '产品子类', unique=True, help_text='用英文填写产品子类', max_length=32)
    pub_date = models.DateField('添加日期', auto_now=datetime.now)
    is_delete = models.IntegerField(default=0)

    class Meta:
        verbose_name = '产品类别'
        verbose_name_plural = '产品类别'

    def __str__(self):
        return '{}-{}'.format(self.type, self.sub_type)


class Products(models.Model):
    sub_type = models.ForeignKey(
        ProductsType, null=False, blank=False, max_length=32, verbose_name='产品子类', on_delete=models.CASCADE)
    seo_title = models.CharField(max_length=128, default='china good gifts')
    seo_desc = models.CharField(max_length=256, default='china good gifts')
    pub_date = models.DateField('添加日期', auto_now=datetime.now)
    pro_number = models.CharField('产品编号', unique=True, max_length=32)
    pro_name = models.CharField('产品名称', max_length=30, default='product')
    pro_size = models.CharField('产品尺寸', max_length=64, default='custom made')
    pro_model = models.CharField('产品型号', max_length=64, default='custom made')
    pro_pack = models.CharField('产品包装', max_length=64, default='custom made')
    pro_color = models.CharField(max_length=1024, blank=True)
    pro_weight = models.DecimalField(verbose_name='单重(g)', max_digits=10, decimal_places=2, default=0)
    pro_pic = models.CharField(max_length=1024, blank=True)
    pro_desc = RichTextField()
    is_delete = models.IntegerField(default=0)
    is_edit = models.IntegerField(default=0)

    class Meta:
        verbose_name = '产品目录'
        verbose_name_plural = '产品目录'

    def __str__(self):
        return '{}-{}'.format(self.pro_number, self.pro_name)

