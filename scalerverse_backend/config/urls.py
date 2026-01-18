from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from blog.views import home, blog_detail, all_projects, team, all_blogs

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('blog/<int:post_id>/', blog_detail, name='blog_detail'),
    path('projects/', all_projects, name='all_projects'),
    path('team/', team, name='team'),
    path('blog/', all_blogs, name='blog'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)