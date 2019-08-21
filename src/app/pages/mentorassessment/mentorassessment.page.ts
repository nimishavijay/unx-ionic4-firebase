import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

@Component({
  selector: 'app-mentorassessment',
  templateUrl: './mentorassessment.page.html',
  styleUrls: ['./mentorassessment.page.scss'],
})
export class MentorassessmentPage implements OnInit {

	response: string = "Describe here in text format like above on how you'll address the specific case. It need not be as lengthy as the above sample. And provide an estimate on how long you'd need to complete the session";
	exampleSummary: string = "The user's mental state is good, there's no need of medical intervention. The student is uncertain about career choices in his future, needs guidance to figure out his options and explore his interests.";
	exampleApproach: string = "Understand background of the user. Flesh out the problem and figure out what is needed. Suggest possible solutions and ways to tackle the problem; break it into smaller pieces and take iy one step a time. Suggest possible places or media to explore (if relevant). End on a positive note, complimenting on how the user has made progress and summarize. Encourage user to come back for further sessions and spread the word about UNX.";
	
	card: number = 0;
	chat0 = [
		"UNX Mentor: Hi User, I'm Coach (your preferred mentor nickname), I'm here to help you figure out things that maybe troubling you like your career, relationships, health... we can start by identifying these things first, tell me things you have doubts about",
		"User: Hi Coach! I'm mainly concerned about my career path right now",
		"UNX Mentor: Ok, tell me a bit about your academic background. And what are you looking for in terms of prospects",
		"User: I'm currently an electrical engineering student, but I'm not exactly passionate about my current stream. I'm not sure which direction to head in as I didn't have proper exposure to a lot of areas",
		"UNX Mentor: What year are you in now?",
		"User: Going into third year",
		"UNX Mentor: You've time there's no urgency to decide something at this point, being confused in college is good it also means you're thinking of different things from various angles. Have you done any internships?",
		"User: Not yet, I'm not sure I want to be pursuing a career in electrical",
		"UNX Mentor: That's fine, you don't have to restrict yourself to electrical. Internships are useful more so to understand the atmosphere and the people you'll be working with, no need to stick to electrical alone. Are there any profs in your college whose work interests you?",
		"User: Research seems like something I'd be interested in, and I'm more interested in CS than electrical, but again, I don't know what area specifically, and I haven't had any experience in research either",
		"UNX Mentor: Ok so let's start there then. I want you to lookup the people in your college who're doing work related to CS and see if you like something. Just go to their labs, see their posters, talk to their students, talk to the PI if possible",
		"User: Not particularly. I seem to interesting in everything at the surface level",
		"UNX Mentor: See you make decisions based on available information, you cannot predict the future. For now you're feeling that research may suit you so you should try it. You don't have to restrict yourself to your college either. Faculty at IISc and other places are quite approachable and interning there will be a valuable experience and good for your cv. Lookup their website and see their work and read some papers they've published. Shoot them a nice mail they do respond. Thing is you'll have to plan a bit in advance if you want to do summer or winter internships as there'll be many constraints they'll need to consider.  You've to start somewhere, surface level interest is still interest. Rome wasn't built in a day.",
		"User: I don't have much experience in CS, or EEE either, actually. It feels like a shot in the dark approaching them",
		"UNX Mentor: You don't have much to lose at this point. You haven't established yourself, you're still a student who's exploring things. Don't worry, you're just trying things out, if they work great if not there are other things to try",
		"User: And I'm very indecisive about which area to focus on. Like I said, everything seems interesting at this point",
		"UNX Mentor: That's precisely why I'm telling you to intern in a lab. Once you're there you'll learn a lot of things and get to know what you like and what you'd want to focus on at the very least you can cross off some things saying they don't suit you",
		"User: That does make sense. There's also pressure of having to get a 'conventional' job that I'm not sure how to deal with. I'm not saying I hate it, but I'm not sure I'll like it either",
		"UNX Mentor: Take things 1 step at a time. It's ok to do trial and error, it's your life no one's going to live it for you. There are no perfect answers. Take risks, you're young, you've some security nets that you can fall back on. At this point as you said it is a shot in the dark but once you go there you'll light it up, then you can make a call whether you want to continue there or change",
		"User: Yes, I'll look into it. It just felt like there were too many options at this point",
		"UNX Mentor: Yes it can be overwhelming. Start small, lookup the work that people are doing in your college for now. It's close by and you can talk to them in person. Even if you find 10 things you don't like that is 10 options less. Let's start there. If you end up feeling that you're liking everything, go to some other department maybe like biotech and you may not like it there. Among the things you like join one of the labs. Once you're inside in few months you'll figure out what's what and you can switch and make a more informed choice",
		"User: I don't know if I'll have the time to do all that, I mean I'm already done with half my college life, but you're absolutely right about starting somewhere",
		"UNX Mentor: Tbh now is the right time to start looking up things. In the first 2 years you wouldn't have finished the required coursework and taking rest and having fun is equally important. Look them up and let me know what you find, timings and all are secondary concerns. 1 step at a time",
		"User: Alright, that sounds good. Thank you!",
		"UNX Mentor: It was my pleasure. Let me know if you need any help again, just contact the unx team. We're just starting out so let you friends and family know about us too. Good luck, take care.",
	]

	chat1 = [
		"UNX Mentor: Hello User1, Coach (mentor nickname) here. Tell me about yourself",
		"User: Hi Coach. Well, I am currently a student studying in engineering college.",
		"User: I'm mostly very a introverted person except around a few friends",
		"User: I like watching shows and movies in my spare time",
		"User: That's pretty much it should I add anything else?",
		"UNX Mentor: I'm here to help you figure out things that maybe troubling you like your career, relationships, health... we can start by identifying these things first, tell me things you have doubts about",
		"User: Alright I have problems in all those domains haha...I'm a very troubled child",
		"User: But I guess I'd like to start off about my work ethic in general",
		"User: I can't seem to manage my time very well while doing tasks",
		"User: Even when I make some sort of timetable to do things, I often either go behind schedule or get distracted and not work on anything",
		"User: It's obviously a thing that's become problematic now that I'm in college and can't get away with preparing last minute for things anymore",
		"User: I have classes from around 8 to 3:30 starting from next week until the end of June",
		"User: I'm not quite sure how much time I'll need to work on assignments and general studying given by said classes",
		"User: Besides that I have asked for work from a professor of mine in the summer",
		"User: And he's given me an assignment of sorts to work on",
		"User: I'm supposed to be meeting him like every day or every few days in a week but I've not met him in more than a week since I've procrastinating the work",
		"User: Outside of classes and work under my professor (if I haven't pissed him off already), I don't know how much time I'll have left, but I'd honestly like to manage these two things efficiently without procrastinating or losing much sleep so I don't get left behind",

	]

	chat2 = [
		"UNX Mentor: Hi User2, Coach (mentor nickname) here. Tell me about yourself",
		"User2: Hey Coach, I am a second year college student pursuin B.Tech right now.",
		"UNX Mentor: Nice, tell me more, what made you pursue B.Tech, what're your current interests? I'm here to help you figure out things that maybe troubling you like your career, relationships, health... we can start by identifying these things first, tell me things you have doubts about",
		"User2: So right now basically what I feel I am facing is issues with insecurity, which has led to me feel pretty alone.",
		"User2: I am aware of my issues. It's just I am not able to do anything about it is what I feel		",
		"UNX Mentor: Ok that's a good start, tell me more about this, what are the things that make you insecure? I can help you get some perspective on it and we could perhaps come up with some ways for you to feel better",
		"User2: That would help, yes. So basically, since a long time I have never felt very confident enough of myself.",
		"User2: I always feel I am not as good enough as someone else. And I have this unneccessary need to compare myself",
		"User2: and you know find out information with which I can say I am better than them.. Its very frustrating but very hard to control.",
	]

	chat3 = [
		"UNX Mentor: Hello User3, Coach (mentor nickname) here",
		"UNX Mentor: I'm here to help you figure out things that maybe troubling you like your career, relationships, health... we can start by identifying these things first, tell me things you have doubts about",
		"User3: I would like to take your guidance on self improvement.",
		"UNX Mentor: Ok what kind of self improvement are you looking for, you seem to have an idea in your mind, tell me about it",
		"User3: I would like to work on my impulsive nature and anger issues and need a few ways in which I can control them..",
		"UNX Mentor: Give me an example",
		"User3: Yesterday I had a fight with my partner which turned big just coz I didn't have the patience to deal with it. I want everything instantly done and in my way.. Which is annoying to others",
		"User3: And I react to things pretty fast.. For even small things",
		"User3: So I want to improve myself to be better than what I am today. Have patience to deal with things and to control anger. I also want to not react to situations around me",
		"User3: When I shout or get really angry,I have broken tv remotes a couple of times",
		"User3: I mostly get angry when things don't go my way",
		"User3: Or if a certain thing is not done the way I want it to be done",
		"User3: I still behave in a way that I would definitely regret later when the anger subsides"
	]

	chat4 = [
		"UNX Mentor: Hi User4, I'm Coach (mentor nickname)",
		"UNX Mentor: Tell me how may I help you",
		"User4: Hi",
		"User4: I came out of a 3 year relationship a few months back. It was a bad break up. I face unresolved issues",
		"User4: As to why some things were said in that relationship. And questions like was it really my fault",
		"User4: I dont see a future with that person anymore",
		"User4: I have forgiven him many a times in the past",
		"User4: I dont think i can do it again",
		"User4: But the things done and said during the course of the relationship has still left me shocked",
		"User4: But the thing is I still love him more than anything"
	]

	response1: any = {
		summary: null,
		approach: null,
		mentoring: null
	};
	response2: any = {
		summary: null,
		approach: null,
		mentoring: null
	};
	response3: any = {
		summary: null,
		approach: null,
		mentoring: null
	};
	response4: any = {
		summary: null,
		approach: null,
		mentoring: null
	};

	currentUser: string;

  constructor(
		private router: Router
	) { }

	ngOnInit() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				/* firebase.database().ref("/users" + firebase.auth().currentUser.uid).once("value", (snapshot) => {
					snapshot.forEach(data => {
						if (data.val().mentor === false) {
							if (data.val().mentee === false) {
								this.router.navigate(['/type'])
							} else this.router.navigate(["/getname"])			
						} else this.currentUser = data.key
					})
				}) */ this.currentUser = firebase.auth().currentUser.uid;
			} else this.router.navigate(["/signin"])
		})
  }

	nextCard() {
		++this.card;
	}

	previousCard() {
		--this.card;
	}

	async continue() {
		firebase.database().ref("mentors/" + this.currentUser + "/assessment").update({
			response1: {
				summary: this.response1.summary,
				approach: this.response1.approach,
				mentoring: this.response1.mentoring
			},
			response2: {
				summary: this.response2.summary,
				approach: this.response2.approach,
				mentoring: this.response2.mentoring
			},
			response3: {
				summary: this.response3.summary,
				approach: this.response3.approach,
				mentoring: this.response3.mentoring
			},
			response4: {
				summary: this.response4.summary,
				approach: this.response4.approach,
				mentoring: this.response4.mentoring
			}
		});
		this.router.navigate(['/mentorhome']);
	}

}
