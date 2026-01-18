from django.shortcuts import render, get_object_or_404
from .models import BlogPost, Project

def home(request):
    recent_posts = BlogPost.objects.all().order_by('-date_posted')[:3]
    featured_projects = Project.objects.all().order_by('-created_at')[:4]
    return render(request, 'index.html', {
        'recent_posts': recent_posts, 
        'featured_projects': featured_projects
    })

def all_projects(request):
    projects = Project.objects.all().order_by('-created_at')
    return render(request, 'projects.html', {'projects': projects})

def blog_detail(request, post_id):
    post = get_object_or_404(BlogPost, id=post_id)
    return render(request, 'blog_detail.html', {'post': post})

def team(request):
    return render(request, 'team.html')

def all_blogs(request):
    posts = BlogPost.objects.all().order_by('-date_posted')
    return render(request, 'blog.html', {'posts': posts})