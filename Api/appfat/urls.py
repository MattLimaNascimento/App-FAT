from django.contrib import admin
from django.urls import path, include
from rides.api.views import get_routes

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',get_routes,name='routes'),
    path('accounts/', include('accounts.urls')),
    path('rides/api/', include('rides.api.urls')),
]
