exports.getReply = function(message) {
  const msg = message.toLowerCase();

  if (msg.includes('depressed') || msg.includes('sad')) {
    return "I'm sorry you're feeling this way. You're not alone, and things can get better. Talking to someone you trust can really help.";
  } else if (msg.includes('anxious') || msg.includes('panic')) {
    return "Try to take deep breaths and ground yourself in the present. Would you like some relaxation techniques?";
  } else if (msg.includes('suicidal') || msg.includes('want to die')) {
    return "I'm deeply concerned. Please seek help immediately. You can contact a mental health helpline or talk to someone you trust.";
  } else if (msg.includes('hello') || msg.includes('hi')) {
    return "Hi there! I'm here to talk. How are you feeling today?";
  } else {
    return "I hear you. Can you tell me more about what you're going through?";
  }
};
