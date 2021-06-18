# Generated by Django 3.2 on 2021-06-11 11:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True,
                                           serialize=False,
                                           verbose_name='ID')),
                ('content', models.TextField(max_length=500)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(default=1,
                                           on_delete=django.db.models.deletion.
                                           PROTECT,
                                           related_name='Posts',
                                           to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
