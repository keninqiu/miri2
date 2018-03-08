var userAnswer = "你礼拜二有没有时间？";
var answer = "你周二有时间吗？;(你|您|妳)(|们)(|在)(星期|礼拜|周)二(|的时候|时)有没有(时间|空)？;(|在|当)(星期|礼拜|周)二(|的时候|时)(你|您|妳)(|们)有没有(时间|空)？;(你|您|妳)(|们)(|在)(星期|礼拜|周)二(|的时候|时)有(时间|空)(吗|么|)？;(|在|当)(星期|礼拜|周)二(|的时候|时)(你|您|妳)(|们)有(时间|空)(吗|么|)？";
//var answer1 = /[你|您|妳]在周二有没有空/g;

/*
answer = "[/的时候/时]*有没有[时间/空]";
var re = new RegExp(answer);
var match = re.test(userAnswer);
console.log('match=' + match);
*/

userAnswer = userAnswer.replace(/[,.?，。？]/g,'');
answer = answer.replace(/[,.?，。？]/g,'');
var answers = answer.split(';');


for(var i=0;i<answers.length;i++) {
	var answer = answers[i];
	var pattern = new RegExp(answer);
	var correct = pattern.test(userAnswer);
	if(correct) {
		break;
	}
}
