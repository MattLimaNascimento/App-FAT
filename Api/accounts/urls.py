from django.urls import path, include
from .views import (
                    ProfileDetailAPIView,
                    ProfilesAPIView
                    )
                 
# create your routes here !

urlpatterns = [
    path('profiles/', ProfilesAPIView.as_view(), name='profiles'),
    path('profiles/<int:pk>', ProfileDetailAPIView.as_view(), name='profile'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls.authtoken')),
]