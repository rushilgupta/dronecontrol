from pyparrot.Minidrone import Mambo
import boto3
import json
import time

mamboAddr = "e0:14:0c:c5:3d:a9"

rotation_constant = 90
movement_constant = 30

mambo = Mambo(mamboAddr, use_wifi=False)

print("trying to connect")
success = mambo.connect(num_retries=3)
print("connected: %s", success)

def takeoff():
	print("take off")
	mambo.safe_takeoff(5)

def land():
	print("land")
	mambo.safe_land(5)

def hover():
	print("hover")
	mambo.fly_direct(roll=25, pitch=0, yaw=50, vertical_movement=0, duration=3)

def move(directionType):
	if(directionType == 'forward'):
		print("forward")
		mambo.fly_direct(roll=0, pitch=movement_constant, yaw=0, vertical_movement=0, duration=1)
	elif(directionType == 'backward'):
		print("backward")
		mambo.fly_direct(roll=0, pitch=-movement_constant, yaw=0, vertical_movement=0, duration=1)
	elif(directionType == 'right'):
		print("right")
		mambo.fly_direct(roll=movement_constant, pitch=0, yaw=0, vertical_movement=0, duration=1)
	elif(directionType == 'left'):
		print("left")
		mambo.fly_direct(roll=-movement_constant, pitch=0, yaw=0, vertical_movement=0, duration=1)
	if(directionType == 'down'):
		print("down")
		mambo.fly_direct(roll=0, pitch=0, yaw=0, vertical_movement=-movement_constant, duration=1)
	elif(directionType == 'up'):
		print("up")
		mambo.fly_direct(roll=0, pitch=0, yaw=0, vertical_movement=movement_constant, duration=1)

def rotate(clockwise):
	if clockwise:
		print("clockwise 90")
		mambo.turn_degrees(rotation_constant)
	else:
		print("anti-clock 90")
		mambo.turn_degrees(-rotation_constant)

def flight_plan():
	mambo.fly_direct(roll=0, pitch=0, yaw=0, vertical_movement=40, duration=1)
	mambo.fly_direct(roll=0, pitch=60, yaw=0, vertical_movement=0, duration=2)
	mambo.turn_degrees(-90)
	mambo.fly_direct(roll=0, pitch=60, yaw=0, vertical_movement=0, duration=2)
	mambo.turn_degrees(-90)
	mambo.fly_direct(roll=0, pitch=60, yaw=0, vertical_movement=0, duration=2)
	mambo.turn_degrees(-90)
	mambo.fly_direct(roll=0, pitch=60, yaw=0, vertical_movement=0, duration=2)
	land()
	
sqs = boto3.client('sqs', region_name='us-east-1')
queue_url = 'https://sqs.us-east-1.amazonaws.com/*****'
while True:
	resp = sqs.receive_message(QueueUrl=queue_url, MaxNumberOfMessages=1, WaitTimeSeconds=0)
	if 'Messages' in resp:
		for message in resp['Messages']:
			payload = json.loads(message['Body'])
			#sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=message['ReceiptHandle'])

			if(payload['intent'] == "TakeOff"):
				takeoff()
			if(payload['intent'] == "Land"):
				land()
			if(payload['intent'] == "Move"):
				move(payload['directionType'])
			if(payload['intent'] == "Rotate"):
				rotate(payload['rotationType'] == "90")
			if(payload['intent'] == 'Hover'):
				hover()
			if(payload['intent'] == 'Flight'):
				flight_plan()
			sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=message['ReceiptHandle'])


