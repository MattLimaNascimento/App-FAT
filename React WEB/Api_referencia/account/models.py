from django.utils.translation import gettext_lazy as _
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from rest_framework import serializers
import os
# Custom User Manager
def upload_path(instance,filename):
    return filename

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
        #         raise serializers.ValidationError({'cnh': 'CNH deve conter 11 dígitos!'})
        if not email:
            raise ValueError('User must have an email address')
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
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=255)
    is_active=models.BooleanField(default=True)
    is_admin=models.BooleanField(default=False)
    placa_carro = models.CharField(max_length=8, blank=True)
    cnh = models.IntegerField(null=True,blank=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    diretorio = models.ImageField(_('Image'), default='posts/default.jpg', upload_to=upload_path)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=['name', 'is_admin', 
                    'placa_carro',
                    'cnh',
                    'diretorio'
                    ]

    def __str__(self):
        return self.email

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