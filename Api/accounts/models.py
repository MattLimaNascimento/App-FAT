from django.db import models as mo
from django.contrib.auth.models import User
from django.utils.translation import gettext as _


# Create your models here.


def upload_path(instance, filename):
    return f'static/img/{instance.user_id}/{filename}'

class Profile(mo.Model):
    class Genero(mo.TextChoices):
        M = 'M', _('Masculino')
        F = 'F', _('Feminino')

    class Tipos(mo.TextChoices):
        PASSAGEIRO = 'PASSAGEIRO', _('Passageiro')
        MOTORISTA = 'MOTORISTA', _('Motorista')

    user = mo.ForeignKey(User, on_delete=mo.CASCADE)
    nome = mo.CharField(max_length=20)
    email = mo.EmailField(max_length=50)
    placa_carro = mo.CharField(max_length=8, null=True, blank=True)
    cnh = mo.CharField(max_length=11 , blank=True, default='')
    diretorio = mo. ImageField(blank=False,
                               upload_to=upload_path)
    senha = mo.CharField(max_length=50, default='*********')

    def __str__(self):
        return self.nome