# library_app/serializers.py
from rest_framework import serializers
from .models import Book, BorrowingRecord, Reservation

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BorrowingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowingRecord
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'