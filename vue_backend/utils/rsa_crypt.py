import base64

from Crypto import Random
from Crypto.Cipher import PKCS1_v1_5
from Crypto.PublicKey import RSA
from rest_framework.throttling import UserRateThrottle


def creat_key():
    """
    生成密钥对
    :return:
    """
    # 伪随机数的方式生成RSA公私钥对
    random_generator = Random.new().read
    rsa = RSA.generate(1024, random_generator)
    # 私钥
    pri_key = rsa.exportKey().decode('utf-8')
    # 公钥
    pub_key = rsa.publickey().exportKey().decode('utf-8')

    # 以列表形式返回密钥对
    return pri_key, pub_key


def decrypt_data(input_data, key):
    """
    解密数据
    :param input_data:
    :param key:
    :return:
    """
    try:
        # 分组解密默认长度128
        default_length = 128
        # 创建私钥对象
        pri_key = RSA.importKey(key.encode('utf-8'))
        cipher = PKCS1_v1_5.new(pri_key)
        # 现将base64编码格式的数据解码，然后解密，并用decode转成str
        input_data_b64 = base64.b64decode(input_data.encode('utf-8'))
        # 获取密文长度
        length = len(input_data_b64)
        # 直接解密
        if length < default_length:
            output_data = cipher.decrypt(input_data_b64, sentinel='error').decode('utf-8')
        # 分组解密
        else:
            offset = 0
            res = []
            while length - offset > 0:
                if length - offset > default_length:
                    res.append(cipher.decrypt(input_data_b64[offset: offset + default_length], sentinel='error'))
                else:
                    res.append(cipher.decrypt(input_data_b64[offset:], 'error'))
                offset += default_length
            output_data = b''.join(res)
            output_data = output_data.decode('utf-8')

        return output_data
    except Exception as e:
        return e