# Generated by Django 4.2.6 on 2023-11-18 03:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anuncios', '0002_remove_ride_data_saida_ride_hora_saida'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ride',
            name='veiculo',
            field=models.TextField(choices=[('Carro', 'Carro'), ('Moto', 'Moto')], default='Veiculo.CARRO', max_length=10),
        ),
    ]