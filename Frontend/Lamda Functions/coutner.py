import json

def lambda_handler(event, context):
    print("BIPPO BOPPO")
    print(event)
    print("BOPPO BIPPO")
    
    print('Request payload:', json.dumps(event))
    print("BAPPO BIPPO")
    http_method = event['httpMethod']
    if http_method == 'OPTIONS':
        print("HUHHHH?!?!")
        response = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            }
        }
        return response
    elif http_method == 'POST':
        # Set number by parsing the json of the request body
        print("--------")
        print(event['body'])
        print("--------")
        number = json.loads(event['body'])['number']
        incremented_number = number + 1
        response = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({'result': incremented_number})
        }
        
        return response