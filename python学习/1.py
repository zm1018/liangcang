from http import HttpResponse
from shortcuts import render

def fa_get(request):
    return (render(request, '../js学习/js语法/交互/p1.html'))
def receive_get(request):
    date= {
        username: request.GET.get("username"),
        age: request.Get.get("age"),
        password: request.GET.get("password")
    }
    return HttpResponse(date)

