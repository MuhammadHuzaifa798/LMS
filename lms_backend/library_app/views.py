# library_app/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Count, Q
from django.utils import timezone
from .models import Book, BorrowingRecord, Reservation
from .serializers import BookSerializer, BorrowingRecordSerializer, ReservationSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.query_params.get('q', '')
        if query:
            self.queryset = self.queryset.filter(
                Q(title__icontains=query) |
                Q(author__icontains=query) |
                Q(isbn__icontains=query)
            )
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

class BorrowingRecordViewSet(viewsets.ModelViewSet):
    queryset = BorrowingRecord.objects.all()
    serializer_class = BorrowingRecordSerializer

    def perform_create(self, serializer):
        book = serializer.validated_data['book']
        if book.available_copies > 0:
            book.available_copies -= 1
            book.save()
            serializer.save()
        else:
            raise ValueError("No available copies of this book.")

    def perform_update(self, serializer):
        instance = self.get_object()
        if instance.returned_date is None:
            book = instance.book
            book.available_copies += 1
            book.save()
            serializer.save(returned_date=serializer.validated_data.get('returned_date'))
        else:
            raise ValueError("This book has already been returned.")

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class AnalyticsView(viewsets.ViewSet):
    def list(self, request):
        popular_books = Book.objects.annotate(borrow_count=Count('borrowingrecord')).order_by('-borrow_count')[:5]
        overdue_books = BorrowingRecord.objects.filter(returned_date=None, due_date__lt=timezone.now().date())

        data = {
            'popular_books': BookSerializer(popular_books, many=True).data,
            'overdue_books': BorrowingRecordSerializer(overdue_books, many=True).data,
        }
        return Response(data)