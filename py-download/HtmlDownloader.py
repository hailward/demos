'''
-----------------------------------------------------------------
HtmlDownloader
'''
import re
import requests
import os
from urllib.parse import urlparse, unquote


class HtmlDownloader(object):
    def download(self, url):
        print("start download")
        if url is None:
            return None
            print("url is None")
        user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36'
        headers = {'User-Agent':user_agent}
        print("start requests")
        parse_result = urlparse(url)
        full_path = parse_result.path
        base_path, filename = os.path.split(full_path)
        # 3. 修改正则匹配规则
        if (re.search(re.compile('\.png$'), filename)):
          file = requests.get(url, headers=headers)
          if (not os.path.exists('./files' + base_path)):
            os.makedirs('./files' + base_path);
          with open('./files/' + full_path, 'wb') as f:
            f.write(file.content)
          return None
        r = requests.get(url, headers=headers)
        #判断响应状态
        if r.status_code == 200:
            r.encoding = 'utf-8'
            print("该页面下载成功！{}".format(url))
            return r.text
        else:
            print("该页面下载失败！{}".format(url))
        return None