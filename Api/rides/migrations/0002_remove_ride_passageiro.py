# Generated by Django 4.2 on 2023-09-20 17:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rides', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ride',
            name='passageiro',
        ),
    ]
