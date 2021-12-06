# coding: utf-8
from UrlManager import UrlManager
from HtmlDownloader import HtmlDownloader
from HtmlParser import HtmlParser
from DataOutput import DataOutput

new_urls = set()
data = {}

class SpiderMan(object):
    def __init__(self):
        #调度器内包含其它四个元件，在初始化调度器的时候也要建立四个元件对象的实例
        self.manager = UrlManager()
        self.downloader = HtmlDownloader()
        self.parser = HtmlParser()
        self.output = DataOutput()

    def spider(self, origin_url):
        #添加初始url

        self.manager.add_new_url(origin_url)
        #下面进入主循环，暂定爬取页面总数小于100
        num = 0
        # 2. 修改循环次数限制
        while(self.manager.has_new_url() and self.manager.old_url_size()<100):
            try:
                num = num + 1
                print("正在处理第{}个链接".format(num))
                #从新url仓库中获取url
                new_url = self.manager.get_new_url()
                #调用html下载器下载页面
                html = self.downloader.download(new_url)
                #调用解析器解析页面，返回新的url和data
                try:
                    new_urls, data = self.parser.parser(new_url, html)
                except:
                    print('error: 解析下载地址出错')
                for url in new_urls:
                    self.manager.add_new_url(url)
                #将已经爬取过的这个url添加至老url仓库中
                self.manager.add_old_url(new_url)
                #将返回的数据存储至文件
                try:
                    self.output.store_data(data)
                    print("store data succefully")
                except:
                    print('error: 保存结果失败')
                print("第{}个链接已经抓取完成".format(self.manager.old_url_size()))
            except:
                print('error: while循环出错')
        #爬取循环结束的时候将存储的数据输出至文件
        self.output.output_html()