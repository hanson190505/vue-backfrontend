from django.urls import path

from upload.views import FileUploadView

urlpatterns = [
    # ...
    path('', FileUploadView.as_view())
]