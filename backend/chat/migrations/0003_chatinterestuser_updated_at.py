# Generated by Django 3.2.8 on 2024-08-16 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_auto_20240816_0939'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatinterestuser',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
