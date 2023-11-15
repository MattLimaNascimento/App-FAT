from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
<<<<<<< HEAD
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
import os
from .validators import cnh_valido
=======
from rides.api.validators import cnh_valido
from django.core.validators import MaxValueValidator
import os

>>>>>>> Pedro-Branch



def upload_path(instance, filename):
    base_filename, file_extension = os.path.splitext(filename)
    return f'static/img/{base_filename}{file_extension}'


class UserManager(BaseUserManager):
    def create_user(self, email, name,
                    diretorio,
                    placa_carro,
                    cnh,
                    is_admin=False, password=None):
        """
        Creates and saves a User with the given email, name and password.
        """
        # if(cnh != None):
        #     if len(str(cnh)) != 11:
        #         raise serializers.ValidationError({'cnh':'deve conter 11 dígitos!'})
        if not email:
            raise ValueError('User must have an email address')
        cnh_valido(cnh)
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            cnh=cnh,
            placa_carro=placa_carro,
            diretorio=diretorio,
            is_admin=is_admin
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name,
                         #  diretorio,
                         is_admin=True, password=None):
        """
        Creates and saves a Superuser with the given email, name and password.
        """
        user = self.create_user(
            email=email,
            password=password,
            name=name,
            is_admin=is_admin
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

# Custom User Model.

<<<<<<< HEAD

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    placa_carro = models.CharField(max_length=8, blank=True)
    cnh = models.CharField(max_length=11, blank=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    diretorio = models.ImageField(
        _('Image'), default='posts/default.jpg', upload_to=upload_path)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'is_admin',
                       'placa_carro',
                       'cnh',
                       'diretorio'
                       ]

    def __str__(self):
        return self.name

    def get_full_name(self):
        return self.name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
=======
    user = mo.OneToOneField(User,on_delete=mo.CASCADE)
    nome = mo.CharField(max_length=20)
    ativo = mo.BooleanField(default=True)
    email = mo.EmailField(max_length=50)
    placa_carro = mo.CharField(max_length=8, null=True, blank=True)
<<<<<<< HEAD
    cnh = mo.CharField(blank=True,max_length=11,null=True,validators=[cnh_valido])
    diretorio = mo. ImageField(blank=False,
                               upload_to=upload_path)
    senha = mo.CharField(max_length=50, default='')
    # gender = mo.CharField(
    #     max_length=12, choices=Genero.choices, default='Genero.M')
    # tipos = mo.CharField(max_length=12, choices=Tipos.choices,
    #                      default='Tipos.Passageiro')
    # matricula = mo.IntegerField()
    # idade = mo.IntegerField()

class CustomUser(mo.Model):
    user = mo.OneToOneField(User,on_delete=mo.CASCADE,related_name='customuser')
    diretorio = mo.ImageField(blank=False,upload_to=upload_path)
    username = mo.CharField(max_length=50)
    email =mo.EmailField(max_length=50)
    
=======
    cnh = mo.CharField(max_length=11 , blank=True, default='')
    diretorio = mo. ImageField(blank=False,
                               upload_to=upload_path)
    senha = mo.CharField(max_length=50, default='*********')

    def __str__(self):
        return self.nome
>>>>>>> origin/Matheus-Branch
>>>>>>> Pedro-Branch
