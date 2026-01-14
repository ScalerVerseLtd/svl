from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from blog import views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # নতুন লিংকগুলো এখানে:
    path('', views.home, name='home'),      # হোমপেজ (খালি লিংক)
    path('team/', views.team, name='team'), # টিম পেজ
    
    path('blog/', views.blog_list, name='blog'),
    path('blog/<int:pk>/', views.blog_detail, name='blog_detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)