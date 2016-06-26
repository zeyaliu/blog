var data=[];

var dataStr="1. Aurora<br>\
<br>\
Genius only means hard-working all one's life. (Mendeleyev  Russian chemist)<br>\
<br>\
<br>\
2. Better not don this on a train<br>\
<br>\
The man who has made up his mind to win will never say 'impossible '. (Bonaparte Napoleon ,French emperor )<br>\
<br>\
<br>\
3. Beyond the cloud<br>\
<br>\
The greatest test of courage on earth is to bear defeat without losing heart.<br>\
<br>\
<br>\
4. Draw a yellow line<br>\
<br>\
Only they who fulfill their duties in everyday matters will fulfill them on  great occasions.<br>\
<br>\
<br>\
5. From a different view<br>\
<br>\
The shortest way to do many things is to only one thing at a time.<br>\
<br>\
<br>\
6. Girl on the river<br>\
<br>\
There's only one corner of the universe you can be sure of improving, and that's your own self.<br>\
<br>\
<br>\
7. Hello, nice to meet you!<br>\
<br>\
Don't aim for success if you want it; just do what you love and believe in, and it will come naturally.<br>\
<br>\
<br>\
8. I think we need to talk...<br>\
<br>\
Never underestimate your power to change yourself!<br>\
<br>\
<br>\
9. I'm totally fine!<br>\
<br>\
Live a noble and honest life. Reviving past times in your old age will help you to enjoy your life again.<br>\
<br>\
<br>\
10. Sad, I'm broken<br>\
<br>\
You cannot improve your past, but you can improve your future. Once time is wasted, life is wasted.<br>\
<br>\
<br>\
11. The portrait of a girl<br>\
<br>\
Living without an aim is like sailing without a compass.<br>\
<br>\
<br>\
12. Two ways to look at a fish<br>\
<br>\
Between two stools one falls to the ground.<br>\
<br>\
<br>\
13. Yes, I'm an eye!<br>\
<br>\
You're uinique, nothing can replace you.<br>\
<br>\
<br>\
14. Can you drink<br>\
<br>\
At twenty years of age , the will reigns; at thirty , the wit ; and at forty , the judgment .(Benjamin Franklin ,American president)<br>\
<br>\
<br>\
15. Spring<br>\
<br>\
Shallow men believe in luck.Self-trust is the first secret of success.<br>\
";

var d=dataStr.split("<br><br><br>")
for(var i=0; i<d.length;i++){
	var c=d[i].split("<br><br>");
	data.push({
		img:c[0].split('. ')[1]+'.jpg',
		caption:c[0].split('. ')[1],
		desc:c[1]
	});
	console.log(c[0].replace('*. ','')+'jpg');
}