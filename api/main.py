import requests
from bs4 import BeautifulSoup
import json
import time


def get_garage_levels() -> dict:
    url = 'https://sjsuparkingstatus.sjsu.edu/'

    try: 
        response = requests.get(url, verify=False)
        if response.status_code == 200:
            html_content = response.text
        else:
            print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
            exit(1)
    except requests.exceptions.RequestException as e:
        print(f"An error occurred while fetching the webpage: {e}")
        exit(1)

    soup = BeautifulSoup(html_content, 'html.parser')
    garage_soup = soup.find('div', class_='garage')

    garages_levels = {}
    for child in garage_soup.children:
        full_tag = child.find('span', class_='garage__fullness')
        if full_tag:
            garages_levels[f"index: {len(garages_levels)}"]= {"fullness":(full_tag.text.strip())}

    index = 0
    for child in garage_soup.find_all('h2', class_='garage__name'):
        if child.text:
            garages_levels[f"index: {index}"]["name"] = child.text.strip()
            index+=1

    # with open('garages_levels.json', 'w') as f:
    #     json.dump(garages_levels, f, indent=2)  
    return garages_levels


if __name__ == "__main__":
    print(get_garage_levels())