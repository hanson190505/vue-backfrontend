from django.db import models


class Image(models.Model):
    file = models.ImageField(upload_to='orderpic/%Y-%m/', blank=False, null=False)
    # file = models.ImageField(blank=False, null=False)
    up_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.file.name