# Generated by Django 3.0 on 2020-02-02 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='suborder',
            name='is_account',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='suborder',
            name='is_purchase',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='suborder',
            name='is_ship',
            field=models.IntegerField(default=1),
        ),
    ]