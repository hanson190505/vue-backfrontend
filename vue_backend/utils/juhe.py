# #!/usr/bin/python
# # -*- coding: utf-8 -*-
# import json
# from urllib.parse import urlencode
# from urllib.request import urlopen
# # 人民币牌价
# def get_Ex_Rate(m="GET"):
#     url = "http://web.juhe.cn:8080/finance/exchange/rmbquot"
#     params = {
#         "key": '8dfa7e97055db445f88c00f22ea5bef3',  # APP Key
#         "type": "",  # 两种格式(0或者1,默认为0)
#
#     }
#     params = urlencode(params)
#     if m == "GET":
#         f = urlopen("%s?%s" % (url, params))
#     else:
#         f = urlopen(url, params)
#
#     content = f.read()
#     res = json.loads(content)
#     if res:
#         error_code = res["error_code"]
#         if error_code == 0:
#             # 成功请求
#             return res["result"][0]
#         else:
#             return {'data1': {'name': '美元', 'fBuyPri': 'NaN', 'bankConversionPri': 'NaN'}, 'data2': {'name': '美元', 'fBuyPri': 'NaN', 'bankConversionPri': 'NaN'}, 'data3': {'name': '美元', 'fBuyPri': 'NaN', 'bankConversionPri': 'NaN'}}
#     else:
#         return {'data1': {'name': '美元', 'fBuyPri': 'NaN', 'bankConversionPri': 'NaN'}, 'data2': {'name': '美元', 'fBuyPri': 'NaN', 'bankConversionPri': 'NaN'}, 'data3': {'name': '美元', 'fBuyPri': 'NaN', 'bankConversionPri': 'NaN'}}
#
