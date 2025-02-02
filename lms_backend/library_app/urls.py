# library_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, BorrowingRecordViewSet, ReservationViewSet, AnalyticsView

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'borrowings', BorrowingRecordViewSet)
router.register(r'reservations', ReservationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('analytics/', AnalyticsView.as_view({'get': 'list'}), name='analytics'),
]