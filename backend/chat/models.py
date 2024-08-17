from django.db import models
from django.contrib.auth.models import User

class ChatInterestUser(models.Model):
    STATUS_CHOICES = [
        (0, 'Pending'),
        (1, 'Rejected'),
        (2, 'Accepted'),
        (3,'Raised')
    ]

    raised_user = models.ForeignKey(User, related_name="int_raised_user", on_delete=models.CASCADE)
    opt_user = models.ForeignKey(User, related_name="int_opt_user", on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS_CHOICES)
    message = models.CharField(max_length=500, null=True,blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.raised_user.first_name} | {self.opt_user.first_name}"
