'''
DataOutput
'''
import codecs

class DataOutput(object):
    def __init__(self):
        self.datas = []  #可以将数据暂存在这个列表里
    #每个循环调用一次此函数，暂存数据
    def store_data(self, data):
        if data is None:
            print("data is None")
            return
        self.datas.append(data)
    #全部页面爬取结束后调用此函数，写入文件
    def output_html(self):
        fout=codecs.open('baike.html', 'w', encoding='utf-8')
        fout.write("<html><head><meta charset='utf-8'></head><body><table>")
        #将data中的三个数据写成表格的一行
        for data in self.datas:
            fout.write("<tr>")
            fout.write("<td>%s</td>" % data["url"])
            fout.write("<td>%s</td>" % data["title"])
            fout.write("</tr>")
        fout.write("</table></body></html>")
        fout.close()
        self.datas = []    #清空表格，释放内存