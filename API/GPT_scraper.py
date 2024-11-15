from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from time import sleep
import random
import emoji
import re

def scraping(tweets):
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
 
    options = webdriver.ChromeOptions()
    options.add_argument('--user-agent=' + user_agent)
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)
    
    driver.get("https://copilot.microsoft.com/")
    sleep(5)
    # テキストエリアの要素をCSSセレクタで特定
    input_text = f"以下の内容に関連する論文をリンクだけ教えてください。「{tweets}」"

    first_layer = driver.find_element(By.CSS_SELECTOR, '#b_sydConvCont > cib-serp').shadow_root
    second_layer = first_layer.find_element(By.CSS_SELECTOR, '#cib-action-bar-main').shadow_root
    third_layer = second_layer.find_element(By.CSS_SELECTOR, 'div > div.main-container > div > div.input-row > cib-text-input').shadow_root
    fourth_layer = third_layer.find_element(By.CSS_SELECTOR, '#searchbox')
    fourth_layer.send_keys(input_text)
    sleep(2)
    # fourth_layer.send_keys(tweets);
    fourth_layer.send_keys(Keys.ENTER)
    sleep(15)
    # 受け取った結果をスクレイピング
    res_second_layer = first_layer.find_element(By.CSS_SELECTOR, '#cib-conversation-main').shadow_root
    res_third_layer = res_second_layer.find_element(By.CSS_SELECTOR, '#cib-chat-main > cib-chat-turn:nth-child(4)').shadow_root
    res_fourth_layer = res_third_layer.find_element(By.CSS_SELECTOR, 'cib-message-group.response-message-group').shadow_root
    res_fifth_layer = res_fourth_layer.find_element(By.CSS_SELECTOR, 'cib-message').shadow_root
    res_sixth_layer = res_fifth_layer.find_element(By.CSS_SELECTOR, 'cib-shared')
    res_seventh_layer = res_sixth_layer.find_element(By.CLASS_NAME, 'ac-textBlock')
    try:
        res_text = res_seventh_layer.find_element(By.TAG_NAME, 'p').text
        res_text_emoji_removed = emoji.replace_emoji(res_text)
    except:
        driver.close()
        return {"text": "Error", "link": "Error"}
    
    try:
        res_link = res_seventh_layer.find_element(By.TAG_NAME, 'a').get_attribute("href")
    except:
        driver.close()
        return {"text": res_text_emoji_removed, "link": "No match. "}
    # with open("scraping_test_log.txt", "w") as f:
    #     f.write(str(res_sixth_layer.get_attribute("innerHTML")))
    driver.close()
    return {"text": res_text_emoji_removed, "link": res_link}

# On Pytnonanywhere delete the __name__ == "__main__"