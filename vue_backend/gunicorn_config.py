from multiprocessing import cpu_count

bind = ["0.0.0.0:8000"]
daemon = False  # 是否开启守护进程
pidfile = 'logs/gunicorn.pid'

workers = cpu_count() * 2
worker_class = 'gevent'
worker_connections = 65535

keepalive = 60
timeout = 30
graceful_timeout = 10
forwarded_allow_ips = '*'

# 日志处理
capture_output = True
loglevel = 'info'
errorlog = 'logs/error.log'
