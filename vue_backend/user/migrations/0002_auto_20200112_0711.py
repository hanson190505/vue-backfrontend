# Generated by Django 3.0 on 2020-01-12 07:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userinfo',
            old_name='_u_password',
            new_name='u_password',
        ),
    ]
