# Generated by Django 4.2.6 on 2023-11-02 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_alter_user_cnh'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='cnh',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]