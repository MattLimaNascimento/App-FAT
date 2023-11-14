from django.urls import path, include
from .views import RideDetailAPIView, RidesAPIView, ManagePassenger

urlpatterns = [
    path('rides/', RidesAPIView.as_view(), name='rides'),
    path('rides/<int:pk>/', RideDetailAPIView.as_view(), name='ride'),
    path('rides/passenger/<int:ride_id>/', ManagePassenger.as_view(), name='adicionar_passageiro'),
]