# signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.template.loader import render_to_string

from .models import Ride

@receiver(post_save, sender=Ride)
def send_ride_notification_email(sender, instance, created, **kwargs):
    if created:
        # Envie um e-mail de notificação
        subject = 'Nova corrida'
        message = render_to_string('ride_notification_email.txt', {'ride': instance})
        from_email = 'seu@email.com'
        recipient_list = ['destinatario@email.com']

        send_mail(subject, message, from_email, recipient_list, fail_silently=False)
