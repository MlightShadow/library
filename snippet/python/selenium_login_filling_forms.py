from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import time

driver = webdriver.Chrome(executable_path="./driver/chromedriver_v73.exe")
driver.get("http://websit.url")
txtUname = driver.find_element(By.XPATH, '//*[@id="uname"]')
txtUname.clear()
txtUname.send_keys("account")
txtPassword = driver.find_element(By.XPATH, '//*[@id="j_password_i"]')
txtPassword.clear()
txtPassword.send_keys("password")

time.sleep(20)

txtPassword.send_keys(Keys.RETURN)

# 点击日志计划 
btn0 = driver.find_element(By.XPATH, '//*[@id="leftMenuTree_1_a"]')
btn0.click()
WebDriverWait(driver, 100).until(
    EC.presence_of_element_located((By.XPATH, '//*[@id="leftMenuTree_4_span"]'))
)

# 点击每日日志 

btn1 = driver.find_element(By.XPATH, '//*[@id="leftMenuTree_4_span"]')
btn1.click()

WebDriverWait(driver, 100).until(
    EC.presence_of_element_located((By.XPATH, '//*[@id="e4e44804626b152201626b337bcc028eframe"]'))
)
driver.switch_to_frame(driver.find_element(By.XPATH, '//*[@id="e4e44804626b152201626b337bcc028eframe"]'))
# 点到 新增 
btn2 = driver.find_element(By.XPATH, '//*[@id="ext-gen17"]')
btn2.click()

driver.switch_to_default_content()

driver.switch_to_frame(driver.find_element(By.XPATH, '//*[@id="content"]/iframe[3]'))

# 填写日期 
txtdate = driver.find_element(By.XPATH, '//*[@id="layoutDiv"]/table[3]/tbody/tr[1]/td[2]/input')
# txtdate.clear()

driver.execute_script('document.getElementById(arguments[0]).setAttribute("value","2019-11-09")', txtdate.get_attribute('id'))
#alert = driver.switch_to_alert()
#alert.accept()

# 写日志

txtlog = driver.find_element(By.XPATH, '//*[@id="oTRe4e44804626a4b9f01626a90b6590659"]/td[4]/textarea')
txtlog.clear()
txtlog.send_keys("日志内容")

# driver.close()