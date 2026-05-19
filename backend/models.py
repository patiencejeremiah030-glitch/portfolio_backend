from django.db import models

# Create your models here.
class Skil(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    proficiency = models.IntegerField()
    order = models.PositiveIntegerField(default=0)


    def __str__(self):
        return self.name

class Experience(models.Model):
    company_name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.role} - {self.company_name}"

class Education(models.Model):
    school_name = models.CharField(max_length=150)
    degree = models.CharField(max_length=150)
    field_of_study = models.CharField(max_length=150, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.degree} - {self.school_name}"

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    summary = models.TextField(max_length=255)
    description = models.TextField()
    tech_stack = models.CharField(max_length=255, )
    live_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='projects_pictures/', blank=True, null=True)
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.title
    
    
