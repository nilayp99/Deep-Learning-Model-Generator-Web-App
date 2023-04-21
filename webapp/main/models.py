from django.db import models
from django.core.files.storage import FileSystemStorage

# Create your models here.

# fs = FileSystemStorage(location='/media/photos')

class database(models.Model):
	title = models.CharField(max_length=50)
	# file = models.FileField()
	# file = models.FileField(storage=fs)
