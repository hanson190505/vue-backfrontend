from django.contrib.auth.hashers import make_password, check_password
from django.db import models


class UserInfo(models.Model):
    u_name = models.CharField(max_length=32, unique=True)
    u_password = models.CharField(max_length=256)
    creat_time = models.DateTimeField(auto_now_add=True)
    is_delete = models.BooleanField(default=False)
    is_use = models.BooleanField(default=False)

    def __str__(self):
        return self.u_name

    # @property
    # def u_password(self, password):
    #     pass
    #
    # @u_password.setter
    # def u_password(self, password):
    #     self._u_password = make_password(password)
    #
    def verify_password(self, password):
        return check_password(password, self.u_password)
    
    # """Model definition for UserInfo."""

    # class Meta:
    #     """Meta definition for UserInfo."""

    #     verbose_name = 'UserInfo'
    #     verbose_name_plural = 'UserInfos'

    # def __str__(self):
    #     """Unicode representation of UserInfo."""
    #     pass

    # def save(self):
    #     """Save method for UserInfo."""
    #     pass

    # def get_absolute_url(self):
    #     """Return absolute url for UserInfo."""
    #     return ('')


