from django.contrib.auth.hashers import check_password
from django.db import models


class UserInfo(models.Model):
    """
    permissions[0-无任何权限,1-系统管理员,2-总经理,3-业务经理,4-业务,5-采购经理,6-采购
    7-货运经理,8-货运员,9-财务经理,10-财务]
    """
    u_name = models.CharField(max_length=32, unique=True)
    u_password = models.CharField(max_length=256)
    creat_time = models.DateTimeField(auto_now_add=True)
    is_delete = models.IntegerField(default=0)
    is_use = models.IntegerField(default=0)
    permissions = models.IntegerField(default=0)

    def __str__(self):
        return self.u_name

    def verify_password(self, password):
        return check_password(password, self.u_password)

    @property
    def is_authenticated(self):
        """
        Always return True. This is a way to tell if the user has been
        authenticated in templates.
        """
        return True

