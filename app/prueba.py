import json
import requests

if __name__ == '__main__': 
    r = requests.get('http://localhost:4000/api/test')
    print("aaa")
    r.text
    print(r.status_code)
    print(r.json())