import requests,bs4
res = requests.get('http://www.baidu.com')
res.raise_for_status()
noStarchSoup = bs4.BeautifulSoup(res.text)
type(noStaechSoup)