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

from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers

from api.views import OrdersViewSet, CustomerViewSet, SubOrderViewSet, PurchaseOrderViewSet, PurchaseDetailViewSet, \
    ShipOrderViewSet, ShipDetailViewSet
from upload.views import ImageUploadVieSet
from user.views import UserApiViewSet
from vuebackend import settings
from webapi.views import ProductsViewSet, ProductTypeViewSet

router = routers.DefaultRouter()
router.register('orders', OrdersViewSet)
router.register('customers', CustomerViewSet)
router.register('suborders', SubOrderViewSet)
router.register('purchases', PurchaseOrderViewSet)
router.register('purchasedetails', PurchaseDetailViewSet)
router.register('shiporders', ShipOrderViewSet)
router.register('shipdetails', ShipDetailViewSet)
router.register('staffs', UserApiViewSet)
router.register('upload', ImageUploadVieSet)
router.register('products', ProductsViewSet)
router.register('product_type', ProductTypeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)