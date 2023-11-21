from celery import shared_task
from .models import Ride
from datetime import timedelta
from django.utils import timezone

@shared_task(bind=True)
def test_func(self):
     # Remove caronas com mais de 24 horas
    rides_to_delete = Ride.objects.filter(data_saida__lt=timezone.now() - timedelta(hours=24))
    rides_to_delete.delete()
    return 'Feito'