from celery import shared_task
from .models import Ride
from datetime import timedelta
from django.utils import timezone
# import schedule
# import time


@shared_task(bind=True)
def test_func(self):
    for i in range(10):
         print(i)
         return 'Feito'    
    
    

     # Remove caronas com mais de 24 horas
#     rides_to_delete = Ride.objects.filter(data_saida__lt=timezone.now() - timedelta(hours=24))
#     rides_to_delete.delete()
#     return 'Feito'

# def schedule_job():
#     # Agende a tarefa para ser executada diariamente às 4:57 PM
#     schedule.every().day.at("16:57").do(test_func)

#     while True:
#         schedule.run_pending()
#         time.sleep(1)