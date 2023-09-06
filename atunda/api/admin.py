from django.contrib import admin
from .models import videoUpload, userPermissions

# Register your models here.
admin.site.register(videoUpload)
admin.site.register(userPermissions)