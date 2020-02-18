from time import time

from django.core.cache import cache
from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin


class UserMiddleware(MiddlewareMixin):

    def process_request(self, request):
        # print(request.method)
        # print(request.path)
        # print(request.META.get('CONTENT_TYPE'))
        # print(request.POST.get('username'))
        # print(request.body)
        # meta = request.META
        # for k,v in meta.items():
        #     print(k)
        #     print('----------')
        #     print(v)

        # 访问频率控制
        ip = request.META.get('REMOTE_ADDR')
        if cache.get(ip):
            if cache.get(ip) >= time()-10:
                return HttpResponse('登录过于频繁,请稍后重试')
        else:
            cache.set(ip, time(), 10)
