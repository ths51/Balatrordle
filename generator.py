import random 
import json
import os 
import time

FILEPATH = 'src/backing_data/daily_jokers.json'

random.seed(time.time())

if (os.path.exists(FILEPATH)):
    f = open(FILEPATH, 'r')
    data: dict[str: str] = json.load(f)
    cur_day = int(time.time() / (60 * 60 * 24))
    remove = 0
    while str(cur_day-remove-1) in data.keys():
        remove += 1
    for i in range(remove):
        data[str(cur_day-remove+365+i)] = str(random.randint(0, 149))
    f.close()
    f = open(FILEPATH, 'w')
    json.dump(data, f, indent=2)
    f.close()
else:
    f = open(FILEPATH, 'w')
    cur_day = int(time.time() / (60 * 60 * 24))
    data: dict[str: str] = {}
    for i in range(365):
        data[str(cur_day+i)] = str(random.randint(0, 149))
    json.dump(data, f, indent=2)
    f.close()