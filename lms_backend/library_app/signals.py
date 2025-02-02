# library_app/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import BorrowingRecord, Reservation

@receiver(post_save, sender=BorrowingRecord)
def notify_reservation(sender, instance, **kwargs):
    if instance.returned_date and instance.book.available_copies > 0:
        reservations = Reservation.objects.filter(book=instance.book)
        for reservation in reservations:
            print(f"Notify user: {reservation.book} is now available.")