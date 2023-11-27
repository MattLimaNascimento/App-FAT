# from __future__ import absolute_import, unicode_literals
# import os

# from celery import Celery
# from django.conf import settings


# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djoserauthapi.settings')

# app = Celery('djoserauthapi')
# app.conf.enable_utc = False

# app.conf.update(timezone='UTC') 
# app.config_from_object(settings, namespace='CELERY')

# # celery beat Settings
# app.conf.beat_schedule = {
    
# }

# app.autodiscover_tasks()

# @app.task(bind=True)
# def debug_task(self):
#     print(f'Request : {self.request!r}')