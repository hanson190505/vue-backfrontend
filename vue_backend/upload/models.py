from django.db import models


class Image(models.Model):
    file = models.ImageField(upload_to='static/image/%Y-%m/', blank=False, null=False)
    up_date = models.DateTimeField(auto_now_add=True)
    md5 = models.CharField(max_length=128)
    type = models.CharField(max_length=32, default='order')
    name = models.CharField(max_length=32)

    # 我们还定义了通过文件md5值获取模型对象的类方法
    @classmethod
    def get_image_md5(cls, md5):
        try:
            return Image.objects.filter(md5=md5).first()
        except Exception as e:
            return None
    # 获取本图片的url，我们可以通过这个url在浏览器访问到这个图片
    # 其中settings.WEB_HOST_NAME 是常量配置，指你的服务器的域名
    # settings.WEB_IMAGE_SERVER_PATH 也是常量配置，指你的静态图片资源访问路径
    # 这些配置项我在Django项目的settings.py文件中进行配置

    def get_image_url(self):
        filename = self.file
        url = 'https://www.chinagoodgifts.com/' + filename
        return url

    # 获取本图片在本地的位置，即你的文件系统的路径，图片会保存在这个路径下

    def __str__(self):
        return self.file