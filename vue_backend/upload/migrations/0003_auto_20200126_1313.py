# Generated by Django 3.0 on 2020-01-26 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('upload', '0002_image_up_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='file',
            field=models.ImageField(upload_to='orderpic/%Y-%m/'),
        ),
    ]