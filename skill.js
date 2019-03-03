s sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
const AWS = require('aws-sdk');
const sqs = new AWS.SQS({region:'us-east-1'}); 

const APP_ID = undefined;

const SKILL_NAME = 'Drone Control';

const TAKE_OFF_MESSAGE = 'TakeOff';
const LAND_MESSAGE = 'Land';
const ROTATE_MESSAGE = 'Rotate';
const MOVEMENT_MESSAGE = 'Move';
const HOVER_MESSAGE = 'Hover'
const FLIGHT_PLAN_MESSAGE = 'Flight'

const ERROR_MESSAGE = "Something went wrong. Make sure drone service is running.";
const HELP_MESSAGE = 'This skills allow you to control the drone..To being, say take off';
const HELP_REPROMPT = 'To begin, say take off';
const STOP_MESSAGE = 'Goodbye!';
const QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/****';
const GROUP_ID = 'DRONE';


const handlers = {
    'LaunchRequest': function () {
        this.emit('TakeOffDroneIntent');
    },
    
    // take off 
    'TakeOffDroneIntent': function () {
        var payload={"intent":TAKE_OFF_MESSAGE};
        var sqsParams = {
            MessageBody: JSON.stringify(payload),
            QueueUrl: QUEUE_URL
        };
        // send event to SQS
        sqs.sendMessage(sqsParams, function(err, data) {
            if (err) {
                console.log('ERR', err);
            }
        });
        
        this.response.speak(TAKE_OFF_MESSAGE);
        this.emit(':responseReady');
    },
    
    // rotate
    'RotateDroneIntent': function () {
        var rotationType = this.event.request.intent.slots.RotationType.resolutions.resolutionsPerAuthority[0].values[0].value.id
        var payload={"intent":ROTATE_MESSAGE, "rotationType": rotationType};
        var sqsParams = {
            MessageBody: JSON.stringify(payload),
            QueueUrl: QUEUE_URL
        };
        // send event to SQS
        sqs.sendMessage(sqsParams, function(err, data) {
            if (err) {
                console.log('ERR', err);
            }
        });
        
        this.response.speak(ROTATE_MESSAGE + " " + this.event.request.intent.slots.RotationType.value);
        this.emit(':responseReady');
    },
    
    // hover
    'HoverDroneIntent': function () {
        var payload={"intent":HOVER_MESSAGE};
        var sqsParams = {
            MessageBody: JSON.stringify(payload),
            QueueUrl: QUEUE_URL
        };
        // send event to SQS
        sqs.sendMessage(sqsParams, function(err, data) {
            if (err) {
                console.log('ERR', err);
            }
        });
        
        this.response.speak(HOVER_MESSAGE);
        this.emit(':responseReady');
    },
    
    // movement
    'DroneMovementIntent': function () {
        var directionType = this.event.request.intent.slots.DirectionType.value
        var payload={"intent":MOVEMENT_MESSAGE, "directionType": directionType};
        var sqsParams = {
            MessageBody: JSON.stringify(payload),
            QueueUrl: QUEUE_URL
        };
        // send event to SQS
        sqs.sendMessage(sqsParams, function(err, data) {
            if (err) {
                console.log('ERR', err);
            }
        });
        
        this.response.speak(MOVEMENT_MESSAGE + " " + directionType);
        this.emit(':responseReady');
    },
    
    // fly away
    'FlightPlanIntent': function () {
        var payload={"intent":FLIGHT_PLAN_MESSAGE}
        var sqsParams = {
            MessageBody: JSON.stringify(payload),
            QueueUrl: QUEUE_URL
        };
        // send event to SQS
        sqs.sendMessage(sqsParams, function(err, data) {
            if (err) {
                console.log('ERR', err);
            }
        });
        
        this.response.speak(FLIGHT_PLAN_MESSAGE);
        this.emit(':responseReady');
    },
    
    // land
    'LandDroneIntent': function () {
        var payload={"intent":LAND_MESSAGE}
        var sqsParams = {
            MessageBody: JSON.stringify(payload),
            QueueUrl: QUEUE_URL
        };
        // send event to SQS
        sqs.sendMessage(sqsParams, function(err, data) {
            if (err) {
                console.log('ERR', err);
            }
        });
        
        this.response.speak(LAND_MESSAGE);
        this.emit(':responseReady');
    },
    
    
    // default intents
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};


