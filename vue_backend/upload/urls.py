from django.urls import path

from upload.views import FileUploadView, getExrateApiview

urlpatterns = [
    # ...
    path('', FileUploadView.as_view()),
    path('exrate/', getExrateApiview.as_view())
]