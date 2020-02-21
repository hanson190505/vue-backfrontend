"""vue_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os

from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers

from api.views import OrdersViewSet, CustomerViewSet, SubOrderViewSet, PurchaseOrderViewSet, PurchaseDetailViewSet, \
    ShipOrderViewSet, ShipDetailViewSet
from user.views import UserApiViewSet

router = routers.DefaultRouter()
router.register('orders', OrdersViewSet)
router.register('customers', CustomerViewSet)
router.register('suborders', SubOrderViewSet)
router.register('purchases', PurchaseOrderViewSet)
router.register('purchasedetails', PurchaseDetailViewSet)
router.register('shiporders', ShipOrderViewSet)
router.register('shipdetails', ShipDetailViewSet)
router.register('staffs', UserApiViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/upload/', include('upload.urls')),
]