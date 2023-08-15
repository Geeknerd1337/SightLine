import sys
import json

def increment_counter(num):
    return num + 1

while True:
    line = sys.stdin.readline()
    if not line:
        break

    data = json.loads(line)
    
    num = data['num']
    result = increment_counter(num)

    response = {'incremented': result}
    json.dump(response, sys.stdout)
    sys.stdout.write('\n')
    sys.stdout.flush()