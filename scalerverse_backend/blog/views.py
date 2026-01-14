from django.shortcuts import render, get_object_or_404
from .models import BlogPost

# হোমপেজ ভিউ
def home(request):
    return render(request, 'index.html')

# টিম পেজ ভিউ (লিংক ঠিক রাখার জন্য)
def team(request):
    return render(request, 'team.html')

# ব্লগ লিস্ট ভিউ
def blog_list(request):
    posts = BlogPost.objects.all().order_by('-date_posted')
    return render(request, 'blog.html', {'posts': posts})

# ব্লগ ডিটেইলস ভিউ
def blog_detail(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    return render(request, 'blog_detail.html', {'post': post})