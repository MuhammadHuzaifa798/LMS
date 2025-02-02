# library_app/models.py
from django.db import models
from datetime import timedelta

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)
    available_copies = models.PositiveIntegerField(default=0)
    

    def __str__(self):
        return self.title

class BorrowingRecord(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrowed_date = models.DateField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True)
    returned_date = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.due_date:
            self.due_date = self.borrowed_date + timedelta(days=14)  # Example: 14-day borrowing period
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.book} borrowed on {self.borrowed_date}"

class Reservation(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    reserved_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.book} reserved on {self.reserved_date}"