import hashlib
from filetype import filetype


# 检测文件类型
# 我们使用第三方的库filetype进行检测，而不是通过文件名进行判断
def get_file_extension(file):
    raw_data = bytearray()
    for c in file.chunks():
        raw_data += c
    try:
        ext = filetype.guess_extension(raw_data)
        return ext
    except Exception as e:
        # todo log
        return None


# 计算文件的md5
def calculate_md5(file):
    md5_0bj = hashlib.md5()
    for chunk in file.chunks():
        md5_0bj.update(chunk)
    return md5_0bj.hexdigest()


# 文件类型过滤 我们只允许上传常用的图片文件
def is_allowed_image_type(ext):
    if ext in ["png", "jpeg", "jpg"]:
        return True
    return False


def is_allow_size(size):
    return size < 500000