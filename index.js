
/**
 * AWS Lambda invokes your Lambda function via a {handler} object. 
 * A handler represents the name of your Lambda function (and serves as the entry point that AWS Lambda uses to execute your function code
 */

/**
 * 
 * @param {event} - will provide information about the originating request
 * @param {context} - contains meta information about the request / running Lambda instance / function's execution 
 * @param {callback} - is used to send information back to the caller and signal that your Lambda invocation is complete
 */
exports.handler = (event, context, callback) => {

  // this intent should be the intent name that you provided in the Voice User Interface
  const INTENT_NAME = "HelloWorld"

  // this message should hold the value that you want Alexa to speak when the intent is invoked with one of the utterances 
  const MESSAGE = "Hello World"

  switch (event.request.type) {
    case "LaunchRequest":
      context.succeed(generateResponse(buildSpeechletResponse("Welcome to IT Academy. Let's start coding", false)))
      break;
    case "IntentRequest":
      switch (event.request.intent.name) {
        case INTENT_NAME: {
          context.succeed(generateResponse(buildSpeechletResponse(MESSAGE), false))
          break;
        }

      }
      break;
  }
}

/**
 * this function will specify the output that Alexa will eventually speak, in the form of plain text. 
 * It also takes another variable, shouldEndSession, which specifies whether Alexa should end the session after the response or not.
 */
const buildSpeechletResponse = (outputText, shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText,
    },
    shouldEndSession: shouldEndSession
  }
}

// this function will generate the response returned by the Lambda function using the {buildSpeechletResponse} function
const generateResponse = (speechletResponse) => {
  return {
    version: "1.0",
    response: speechletResponse
  }
}

/**
 * AWS Lambda invokes your Lambda function via a {handler} object. 
 * A handler represents the name of your Lambda function (and serves as the entry point that AWS Lambda uses to execute your function code
 */

/**
 * 
 * @param {event} - will provide information about the originating request
 * @param {context} - contains meta information about the request / running Lambda instance / function's execution 
 * @param {callback} - is used to send information back to the caller and signal that your Lambda invocation is complete
 */
exports.handler = (event, context, callback) => {

  // this intent should be the intent name that you provided in the Voice User Interface
  const INTENT_NAME = "HelloWorld"


  switch (event.request.type) {
    case "LaunchRequest":
      context.succeed(generateResponse(buildSpeechletResponse("Welcome to IT Academy. Let's start coding", false)))
      break;
    case "IntentRequest":
      switch (event.request.intent.name) {
        case INTENT_NAME: {
          let shouldEndSession = false;

          // this message should hold the value that you want Alexa to speak when the intent is invoked with one of the utterances 
          const MESSAGE = "Hello World"
          context.succeed(generateResponse(buildSpeechletResponse(MESSAGE), shouldEndSession))

          break;
        }

        case 'GetCurrencyIntent': {
          const fetch = require('node-fetch');
          const currentCurrency = event.request.intent.slots.Currency.value;

          const currenciesMap = {
            euro: "EUR",
            dollar: "USD",
            pound: "GBP"
          };

          fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR,GBP', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          })
            .then(res => res.json())
            .then(json => {
              const speechOutput = `One bitcoin values as much as ${json[currenciesMap[currentCurrency]]} ${currentCurrency}s`;
              callback(null, buildResponse({}, buildSpeechletResponse(speechOutput, false)))
            });

          break;
        }

      }
      break;
  }
}

/**
 * this function will specify the output that Alexa will eventually speak, in the form of plain text. 
 * It also takes another variable, shouldEndSession, which specifies whether Alexa should end the session after the response or not.
 */
const buildSpeechletResponse = (outputText, shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText,
    },
    shouldEndSession: shouldEndSession
  }
}

// this function will generate the response returned by the Lambda function using the {buildSpeechletResponse} function
const generateResponse = (speechletResponse) => {
  return {
    version: "1.0",
    response: speechletResponse
  }
}

const buildResponse = (sessionAttributes, speechletResponse) => {
  return {
    version: '1.0',
    sessionAttributes,
    response: speechletResponse,
  };
}