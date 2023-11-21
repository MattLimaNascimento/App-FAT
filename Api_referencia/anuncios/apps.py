# # anuncios/apps.py
# from django.apps import AppConfig

# class AnunciosConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'anuncios'

#     def ready(self):
#         from . import tasks  # Importa o módulo de tarefas
#         from django_celery_beat.models import PeriodicTask, CrontabSchedule

#         # Cria uma tarefa periódica que executa a cada dia às 2h
#         crontab, created = CrontabSchedule.objects.get_or_create(
#             minute=0,
#             hour=2,
#             day_of_week='*',
#             day_of_month='*',
#             month_of_year='*',
#         )
#         task, created = PeriodicTask.objects.get_or_create(
#             name='Delete Expired Rides',
#             task='anuncios.tasks.delete_expired_rides',
#             crontab=crontab,
#         )

