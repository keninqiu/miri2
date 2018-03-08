var answer = '(你|您|妳)(|们)(|在)(星期|礼拜|周)二(|的时候|时)有没有(时间|空)';
var userAnswer = '您周二有没有时间';
var re = new RegExp(answer);
var match = re.test(userAnswer);
console.log('match=' + match);