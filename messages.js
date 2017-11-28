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

const GREETINGS = ['bjr', 'bonjour', 'bonsoir', 'hello', 'coucou', 'enchante'];
const GOODBYES = ['au revoir', 'bye', 'adieu', 'ciao'];

module.exports = {
  BOT_DID_NOT_UNDERSTAND_MESSAGE:
    'Je ne suis pas sur de comprendre. Pouvez-vous reformuler?',
  BOT_SAY_HI: 'Bonjour!',
  BOT_SAY_GOODBYE: 'Au revoir!',
  BOT_ASK_FOR_SELECT_ACTION:
    'Je ne suis pas sur de comprendre, aidez-moi à choisir:',
  BOT_RECALL_USER_QUESTION: 'Vous avez demandé:',
  DEFAULT_MESSAGE: 'Message par défaut',
  isGreetings: text => {
    return GREETINGS.some(word => word === text.toLowerCase());
  },

  isGoodbye: text => {
    return GOODBYES.some(word => word === text.toLowerCase());
  },
};
