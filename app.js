/**
 * Copyright (c) 2017 - present, Botfuel (https://www.botfuel.io).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const restify = require('restify');
const builder = require('botbuilder');
const QnA = require('botfuel-qna-sdk');
const { Spellchecking } = require('botfuel-nlp-sdk');
const {
  isGreetings,
  isGoodbye,
  BOT_DID_NOT_UNDERSTAND_MESSAGE,
  BOT_SAY_HI,
  BOT_SAY_GOODBYE,
  BOT_ASK_FOR_SELECT_ACTION,
  BOT_RECALL_USER_QUESTION,
  DEFAULT_MESSAGE,
} = require('./messages');

// Botfuel App credentials
const appId = '<YOUR_APP_ID>';
const appKey = '<YOUR_APP_KEY>';

const spellchecker = new Spellchecking({ appId, appKey });
const QnAClient = new QnA({ appId, appKey });

/**
 * Answer the user message using Botfuel QnA service
 * 
 * @param {Object} session the BotBuilder session
 * @param {String} sentence the user sentence
 * @callback callback a callback function, if specific action is required for bot answering
 */
const answerWithQnA = (session, sentence, callback) => {
  spellchecker.compute({ sentence, key: 'FR_1' }).then(response => {
    QnAClient.getMatchingQnas({
      sentence: response.correctSentence,
    }).then(response => {
      let message;
      if (response.length === 1) {
        // If only one intent is returned, answer with it.
        message = response[0].answer;
      } else if (response.length > 1) {
        // If multiple intents are returned, enter `ambiguousDialog` dialog
        session.replaceDialog('ambiguousQuestion', response);
      } else {
        // Else, send the default message.
        message = DEFAULT_MESSAGE;
      }
      if (!(response.length > 1)) {
        callback ? callback(message) : session.send(message);
      }
    });
  });
};

// Create a server
const server = restify.createServer();
server.listen(3978, () => {
  console.log('%s listening to %s', server.name, server.url);
});

// Instantiate the Bot builder connector and bot
const connector = new builder.ChatConnector({
  // can be left undefined when testing with emulator
  appId: process.env.MICROSOFT_APP_ID,
  // can be left undefined when testing with emulator
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
});
const bot = new builder.UniversalBot(connector);

// Create route /api/messages to communicate with your chat interface
server.post('/api/messages', connector.listen());

// Dialogs
//////////

bot.dialog('/', session => {
  // Root dialog, says hi and goodbye, or ask QnA service
  console.log(session.message);
  if (isGreetings(session.message.text)) {
    session.send(BOT_SAY_HI);
  } else if (isGoodbye(session.message.text)) {
    session.send(BOT_SAY_GOODBYE);
  } else {
    answerWithQnA(session, session.message.text);
  }
});

bot.dialog('ambiguousQuestion', (session, response) => {
  // `ambiguousQuestion` dialog, to use when multiple intents are returned.
  // Use BotBuilder postBack to address the issue.
  if (response) {
    // In this case, the dialog was called by root dialog: we expect actions to be displayed
    const msg = new builder.Message(session)
      .text(BOT_ASK_FOR_SELECT_ACTION)
      .suggestedActions(
        builder.SuggestedActions.create(
          session,
          response.map(answer =>
            builder.CardAction.postBack(
              session,
              `${BOT_RECALL_USER_QUESTION} "${answer
                .questions[0]}"\n\n -- \n\n${answer.answer}`,
              answer.questions[0]
            )
          )
        )
      );
    session.send(msg);
  } else {
    // In this case, the dialog was called by itself: we expect selected question to be answered.
    session.send(session.message.text);
    session.endConversation();
  }
});
