from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='spotifytoken',
            name='expires_in',
        ),
        migrations.AddField(
            model_name='spotifytoken',
            name='expires_in',
            field=models.DateTimeField(default='2026-01-01 00:00:00+00:00'),
            preserve_default=False,
        ),
    ]
