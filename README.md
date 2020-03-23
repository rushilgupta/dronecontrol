# Drexa
Drone control via Alexa. An alexa skill to control a parrot minidrone through voice commands.

See it here in action:

[![IMAGE ALT TEXT](http://img.youtube.com/vi/Fl01-RQXWUQ/0.jpg)](https://www.youtube.com/watch?v=6DZXsEvR2TE "Drexa")

## Hardware requirements
- A parrot minidrone like Cargo/Mambo that connects over bluetooth.
- A raspberry pi to bridge AWS to minidrone.

## Software requirements
- Configure an alexa skill like DroneControl. See section on `alexa skill`.
- Configure lambda to bridge alexa voice commands to AWS. See section on `lambda`.
- Install this kickass library (created by @amymcgovern) on raspberry pi: https://github.com/amymcgovern/pyparrot. This library offers python-api to connect drone over bluetooth.

## How does it work
- Skill calls the AWS lambda function, which receives the intent request and sends events to queue (AWS SQS).
- DroneService on Raspberry pi polls SQS and processes event.
- DroneService sends movement instructions to Parrot drone over Bluetooth.

## Limitations/Future work
- Queue should have only one consumer and one publisher. It won't work for multiple raspberry-pis polling same queue.
- Add facial recognition in pi to support "ask drone control to come to me" type of usecase.
- Support inter drone communication.


## Alexa skill
- This skill supports 6 types of utterances:
  - TakeOffDroneIntent: drone takes off
  - LandDroneIntent: drone lands
  - RotateDroneIntent: drone rotates by +90 or -90 degrees.
    - Slot: RotationType (2 values: `[+90, -90]`)
    - Resolution: "clockwise" -> 90, "counterclockwise" -> -90.
  - DroneMovementIntent: drone moves in 6 possible directions.
    - Slot: DirectionType (6 values: `["up", "down", "left", "right", "forward", "backward"]`)
  - HoverDroneIntent: drone hovers around one time.
  - FlightPlanIntent: drone calls a hard coded flight plan in `flight_plan`
- Build model to point various utterances to this intents.
- Set endpoint of this skill as AWS Lambda ARN (that we'll create in next step).


## Lamda
- Create a lambda file index.js based on provided `index.js`.
- The code maps each intent to an actionable handler code. This code extracts slots and creates a JSON payload to be sent to SQS.
  - Lambda also sends out an appropriate voice reply.

## SQS
 - A simple queue. Since only one drone is in the play, this queue doesn't need any fancy setup to handle ~10 events per minute.

## Drone service
Drone service is a inifintely looping program that does the following:
- Polls SQS.
- If a message is available, then extracts payload and calls the corresponding method. For example: `"TakeOffDroneIntent" -> takeOff()`
- The method calls `pyparrot` library to execute drone movement like `"Move Up", "Move Down", "Land"`.
