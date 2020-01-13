from time import time

from django.http import HttpResponse
# from django.utils.deprecation import MiddlewareMixin
#
#
# from django.utils.deprecation import MiddlewareMixin
#
#
# class UserMiddleware(MiddlewareMixin):
#
# 	def process_request(self, request):
# 		print(request.method)
# 		print(request.path)
# 		print(request.META.get('CONTENT_TYPE'))
# 		print(request.POST.get('username'))
# 		print(request.body)
		# meta = request.META
		# for k,v in meta.items():
		# 	print(k)
		# 	print('----------')
		# 	print(v)

		#
		# if request.path == '/three/blogs/':
		# 	return HttpResponse('给你返回去了,嘿嘿嘿')
		# 访问频率控制
		# ip = request.META.get('REMOTE_ADDR')
		# ac = AccessControl.objects
		# p = ac.filter(ip=ip).last()
		# if p.time >= time()-10:
		# 	return HttpResponse('登录过于频繁,请稍后重试')
		# else:
		# 	p1 = AccessControl()
		# 	p1.ip = ip
		# 	p1.time = time()
		# 	p1.save()

#
# 	def process_response(self, request, response):
# 		print(request.META.get('queryset'))
# 		print(response)
# 		return response