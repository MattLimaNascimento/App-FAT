# Generated by Django 4.2.6 on 2023-11-18 02:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anuncios', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ride',
            name='data_saida',
        ),
        migrations.AddField(
            model_name='ride',
            name='hora_saida',
            field=models.TimeField(default='00:00'),
        ),
    ]
