
import json
import requests as r
import os
directory = 'public/cities/'
with open('public/city.list.json', 'r',encoding='utf8') as f:
    raw =  f.read()
# countries = r.get('localhost:3000/city.list.json');
countries = json.loads(raw)
chunks = [countries[x:x+2000] for x in range(0, len(countries), 2000)]

if not os.path.exists(directory):
    os.makedirs(directory)

for index, chunk in  enumerate(chunks):
    with open(os.path.join(directory, '{}.json'.format(str(index))), 'w',encoding='utf8') as f:
        f.write(json.dumps(chunk))



pass