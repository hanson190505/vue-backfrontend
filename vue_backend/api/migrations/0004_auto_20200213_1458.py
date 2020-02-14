# Generated by Django 3.0 on 2020-02-13 14:58

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200212_0720'),
    ]

    operations = [
        migrations.AddField(
            model_name='shiporder',
            name='input_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='ordercatalog',
            name='is_done',
            field=models.IntegerField(choices=[(1, '未完成'), (2, '已完成'), (3, '已超期'), (4, '紧急')], default=1, verbose_name='完成状态'),
        ),
        migrations.AlterField(
            model_name='purchasedetail',
            name='purchase_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=20, verbose_name='采购单价(¥)'),
        ),
        migrations.AlterField(
            model_name='purchasedetail',
            name='sub_order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchases', to='api.SubOrder', verbose_name='订单明细'),
        ),
        migrations.AlterField(
            model_name='shipdetail',
            name='sub_order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ships', to='api.SubOrder', verbose_name='订单明细'),
        ),
        migrations.AlterField(
            model_name='suborder',
            name='pro_qt',
            field=models.DecimalField(decimal_places=1, max_digits=20, verbose_name='数量(个)'),
        ),
        migrations.AlterField(
            model_name='suborder',
            name='pro_weight',
            field=models.DecimalField(decimal_places=1, max_digits=20, verbose_name='单重(g)'),
        ),
    ]
