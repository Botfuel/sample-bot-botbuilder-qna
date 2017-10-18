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
