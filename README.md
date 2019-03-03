Drexa: Drone control via Alexa
An alexa skill to control a parrot minidrone over voice.

What do you need:
- Configure a skill like DroneControl. (TODO: add info about intents, slots and utterances)
- A parrot minidrone like Cargo/Mambo that connects over bluetooth.
- A raspberry pi to connect AWS SQS queue to minidrone.
- This kickass library installed on raspberry pi created by Amy https://github.com/amymcgovern/pyparrot. This library offers python-api to connect drone over bluetooth.

How does it work:
- Skill publishes events on SQS.
- DroneService on Raspberry pi polls SQS and processes event.
- Instructions to Parrot drone is sent over Bluetooth.

Limitations:
- Queue should have only one consumer. It won't work for multiple consumers polling same queue.
