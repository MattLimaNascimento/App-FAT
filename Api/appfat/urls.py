from django.contrib import admin
from django.urls import path, include
<<<<<<< HEAD
from django.conf.urls.static import static
from django.conf import settings
=======
from rides.api.views import get_routes
>>>>>>> origin/Pedro-Branch

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('account.urls')),
    path('anuncios/', include('anuncios.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)