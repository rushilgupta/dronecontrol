{
    "interactionModel": {
        "languageModel": {
            "invocationName": "drone control",
            "intents": [
                {
                    "name": "AMAZON.FallbackIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.CancelIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.HelpIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.StopIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.NavigateHomeIntent",
                    "samples": []
                },
                {
                    "name": "TakeOffDroneIntent",
                    "slots": [],
                    "samples": [
                        "take off",
                        "fly"
                    ]
                },
                {
                    "name": "LandDroneIntent",
                    "slots": [],
                    "samples": [
                        "land my drone",
                        "land"
                    ]
                },
                {
                    "name": "RotateDroneIntent",
                    "slots": [
                        {
                            "name": "RotationType",
                            "type": "RotationType"
                        }
                    ],
                    "samples": [
                        "rotate {RotationType}"
                    ]
                },
                {
                    "name": "DroneMovementIntent",
                    "slots": [
                        {
                            "name": "DirectionType",
                            "type": "Direction"
                        }
                    ],
                    "samples": [
                        "move to {DirectionType}",
                        "move {DirectionType}"
                    ]
                },
                {
                    "name": "HoverDroneIntent",
                    "slots": [],
                    "samples": [
                        "circle",
                        "hover"
                    ]
                },
                {
                    "name": "FlightPlanIntent",
                    "slots": [],
                    "samples": [
                        "execute flight plan"
                    ]
                }
            ],
            "types": [
                {
                    "name": "Direction",
                    "values": [
                        {
                            "name": {
                                "value": "backward"
                            }
                        },
                        {
                            "name": {
                                "value": "forward"
                            }
                        },
                        {
                            "name": {
                                "value": "right"
                            }
                        },
                        {
                            "name": {
                                "value": "left"
                            }
                        },
                        {
                            "name": {
                                "value": "down"
                            }
                        },
                        {
                            "name": {
                                "value": "up"
                            }
                        }
                    ]
                },
                {
                    "name": "RotationType",
                    "values": [
                        {
                            "id": "-90",
                            "name": {
                                "value": "counterclockwise",
                                "synonyms": [
                                    "anticlockwise",
                                    "anti clockwise"
                                ]
                            }
                        },
                        {
                            "id": "90",
                            "name": {
                                "value": "clockwise"
                            }
                        }
                    ]
                }
            ]
        }
    }
}
