# Generated by Django 5.0.3 on 2024-03-24 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Monument',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('place', models.CharField(max_length=300)),
                ('Img', models.ImageField(upload_to='images/')),
                ('desc', models.CharField(max_length=1024)),
            ],
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stateName', models.CharField(max_length=50)),
                ('capitalOfState', models.CharField(max_length=50)),
                ('frontImg', models.ImageField(upload_to='images/')),
                ('innerImg', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('desc', models.CharField(max_length=1024)),
            ],
        ),
    ]
