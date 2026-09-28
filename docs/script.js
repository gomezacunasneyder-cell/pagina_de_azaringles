const T={
"Collective nouns":["A ___ of wolves hunted at night.|pack|school|swarm","A ___ of fish swam past us.|school|pack|flock","A ___ of bees lives in that hive.|swarm|herd|team"],
"Indefinite pronouns":["I didn't see ___ at the party.|anybody|somebody|nobody","There is ___ in the box; it's empty.|nothing|something|anything","___ loves music; it's universal.|Everybody|Nobody|Somebody"],
"Relative pronouns":["The man ___ lives next door is a doctor.|who|which|whose","This is the book ___ I told you about.|that|who|whose","She is the girl ___ father is a pilot.|whose|who|which"],
"Simple past review (I)":["Yesterday I ___ a movie.|watched|watch|have watched","She ___ to Bogotá last year.|went|goes|has gone","They ___ football on Sunday.|didn't play|don't played|didn't played"],
"Simple past review (II)":["___ you see him last night?|Did|Have|Do","He ___ a new phone last week.|bought|buyed|has bought","We ___ at home yesterday.|were|was|are"],
"Present perfect (I)":["I ___ here for five years.|have lived|lived|am living","She ___ her homework.|has finished|have finished|finish","They ___ that film.|haven't seen|didn't seen|hasn't seen"],
"Present perfect (II)":["___ you ever eaten sushi?|Have|Did|Has","He ___ visited Spain.|has never|have never|never has","We ___ done the exercise.|have already|already has|did already"],
"Present perfect (III)":["I have lived here ___ 2020.|since|for|from","She has worked here ___ three years.|for|since|during","He has ___ arrived.|just|yet|since"],
"Present perfect (IV)":["Have you finished ___?|yet|just|since","I ___ my keys. I can't find them.|have lost|am losing|was lose","She ___ her arm, so she can't write.|has broken|have broken|breaked"],
"Present perfect (V)":["It's the best movie I have ___ seen.|ever|never|yet","How long ___ you known her?|have|did|had","This is the first time he ___ .|has flown|flew|had flown"],
"Past perfect (I)":["When I arrived, the film ___ started.|had already|has already|was already","She ___ dinner before he called.|had finished|has finished|have finished","They ___ eaten when we came.|hadn't|haven't|didn't"],
"Past perfect (II)":["___ you seen her before the party?|Had|Have|Did","He said he ___ Paris.|had visited|has visited|have visited","I realized I ___ my wallet.|had forgotten|have forgotten|forgetted"],
"Past perfect (III)":["After she ___ , she left.|had eaten|has eaten|have eaten","I was tired because I ___ .|hadn't slept|haven't slept|didn't slept","The bus ___ when we got there.|had left|has left|have left"],
"Past perfect (IV)":["By the time he came, we ___ .|had gone|have gone|has gone","She ___ there before she moved.|had worked|has worked|have worked","If I ___ , I would have helped.|had known|have known|knew"],
"Past perfect (V)":["He was sad because his team ___ .|had lost|has lost|have lost","We ___ sat down when the phone rang.|had just|have just|has just","I wish I ___ more.|had studied|have studied|studied"],
"Used to":["I ___ play football when I was a kid.|used to|use to|am used to","She ___ live in Cali, but now she lives in Bogotá.|used to|use to|is used to","He ___ like coffee.|didn't use to|didn't used to|not used to"],
"Check your knowledge":["She has ___ to Japan twice.|been|be|was","The dog ___ I found is friendly.|that|who|whose","By 10 pm, they ___ left.|had already|have already|already had"]};
let S={p:[],sel:{},custom:{},rounds:5};
try{Object.assign(S,JSON.parse(localStorage.getItem("pe2")||"{}"))}catch(e){}
const sv=()=>{try{localStorage.setItem("pe2",JSON.stringify(S))}catch(e){}};
const $=i=>document.getElementById(i);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const TIPS=["Cash out in time: risking too much can cost you everything.","If the balloon pops, a correct answer triples your bet.","Review your English topics while you play.","The player with the most points wins!"];
let lp=0,mute=false,AC,RT="",musicTimer=null,musicStep=0;
const li=setInterval(()=>{lp=Math.min(100,lp+Math.random()*9+3);$("lbar").style.width=lp+"%";$("lpct").textContent="Loading "+Math.floor(lp)+"%";$("ltip").textContent="💡 "+TIPS[Math.min(3,Math.floor(lp/26))];if(lp>=100){clearInterval(li);$("lpct").textContent="Ready!";$("lgo").style.display=""}},150);
function enter(){$("load").classList.add("hide");snd("ok")}
function tone(f,d,ty,v,st,f2){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime+(st||0);o.type=ty||"sine";o.frequency.setValueAtTime(f,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);g.gain.setValueAtTime(v||.15,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(AC.destination);o.start(n);o.stop(n+d)}catch(e){}}
function snd(k){if(mute)return;
 if(k=="pump")tone(300+pumps*60,.12,"triangle",.2,0,500+pumps*80);
 else if(k=="boom"){tone(180,.6,"sawtooth",.3,0,30);tone(90,.5,"square",.2,0,20)}
 else if(k=="cash")[660,880,1180].forEach((f,i)=>tone(f,.15,"square",.1,i*.08));
 else if(k=="ok")[523,659,784,1047].forEach((f,i)=>tone(f,.18,"triangle",.18,i*.1));
 else if(k=="no"){tone(220,.3,"sawtooth",.2,0,110);tone(160,.4,"sawtooth",.2,.25,80)}
 else if(k=="win")[523,659,784,1047,784,1047,1319].forEach((f,i)=>tone(f,.22,"triangle",.2,i*.13));
 else if(k=="click")tone(600,.05,"square",.08)}
function speak(x){try{if(mute||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(x);const v=speechSynthesis.getVoices().find(z=>z.lang.toLowerCase().startsWith("en"));if(v)u.voice=v;u.lang=v?v.lang:"en-US";u.rate=.95;speechSynthesis.speak(u)}catch(e){}}
function toggleM(){mute=!mute;$("mt").textContent=mute?"🔇":"🔊";if(mute){stopMusic();try{speechSynthesis.cancel()}catch(e){}}else if(!$('game').classList.contains('hide'))startMusic()}
function musicNote(f,d,v,type,when){
 const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,when);
 g.gain.setValueAtTime(.001,when);g.gain.exponentialRampToValueAtTime(v,when+.025);g.gain.setValueAtTime(v,when+d*.55);g.gain.exponentialRampToValueAtTime(.001,when+d);
 o.connect(g);g.connect(AC.destination);o.start(when);o.stop(when+d+.02);
}
function musicBeat(){
 if(mute||!AC)return;
 const melody=[659,784,988,784,587,740,880,740,523,659,784,659,587,740,988,880];
 const beat=musicStep%16,when=AC.currentTime+.04;
 musicNote(melody[beat],.23,.045,"triangle",when);
 if(beat%4===0)musicNote([131,147,110,123][Math.floor(beat/4)],.65,.075,"sine",when);
 musicStep++;
}
function startMusic(){
 if(mute||musicTimer)return;
 try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume();musicStep=0;musicBeat();musicTimer=setInterval(musicBeat,260)}catch(e){}
}
function stopMusic(){if(musicTimer){clearInterval(musicTimer);musicTimer=null}}
for(let i=0;i<9;i++){const s=document.createElement("span");s.textContent=["🎈","⭐","✨"][i%3];s.style.cssText=`left:${i*11+Math.random()*6}%;font-size:${22+Math.random()*30}px;animation-duration:${9+Math.random()*10}s;animation-delay:-${Math.random()*10}s`;$("bgb").appendChild(s)}
function render(){
 $("plist").innerHTML=S.p.map((n,i)=>`<span class="chip">${esc(n)}<button onclick="delP(${i})">✕</button></span>`).join("");
 $("rlist").innerHTML=[3,5,8].map(r=>`<span class="chip ${S.rounds==r?"on":""}" onclick="S.rounds=${r};sv();render()">${r} rounds</span>`).join("");
 $("tlist").innerHTML=Object.keys(T).map(k=>`<span class="chip ${S.sel[k]?"on":""}" onclick="tog(this.dataset.k)" data-k="${esc(k)}">${esc(k)} (${T[k].length+(S.custom[k]||[]).length})</span>`).join("");
 $("xt").innerHTML=Object.keys(T).map(k=>`<option>${esc(k)}</option>`).join("");
}
function addP(){const v=$("pn").value.trim();if(v){S.p.push(v);$("pn").value="";sv();render()}}
$("pn").addEventListener("keydown",e=>{if(e.key==="Enter")addP()});
function delP(i){S.p.splice(i,1);sv();render()}
function tog(k){S.sel[k]=!S.sel[k];sv();render()}
function selAll(v){Object.keys(T).forEach(k=>S.sel[k]=!!v);sv();render()}
function addEx(){const k=$("xt").value,s=$("xs").value.trim(),a=$("xa").value.trim(),w1=$("xw1").value.trim(),w2=$("xw2").value.trim();
 if(!s||!a||!w1||!w2){$("xmsg").textContent="Fill in the sentence and all 3 options";return}
 (S.custom[k]=S.custom[k]||[]).push([s,a,w1,w2].join("|"));["xs","xa","xw1","xw2"].forEach(i=>$(i).value="");$("xmsg").textContent="Added!";sv();render()}
const MULTS=[1,1.23,1.55,1.98,2.56,3.4,4.5,6,8,11];
let pts={},t=0,pumps=0,limit=0,busy=false;
const potNow=()=>pumps?Math.round(MULTS[pumps]*100):0;
function start(){
 if(S.p.length<1)return alert("Add at least one player");
 if(!Object.keys(T).some(k=>S.sel[k]))return alert("Choose at least one topic");
 $("box").style.textAlign="left";
 $("box").innerHTML=`<div style="text-align:center;font-size:30px;font-weight:900">📖 Game Rules</div>
 <p style="text-align:center;margin:6px 0 14px"><small>Goal: score more points than everyone else after ${S.rounds} rounds.</small></p>
 <ol style="line-height:1.55;padding-left:20px;margin:0">
 <li>Each round, every player gets <b>one turn</b>, in the order they were added.</li>
 <li>Press <b>🎈 Pump</b>: the balloon grows and the multiplier rises (1.23x, 1.55x…). Your bet grows with it.</li>
 <li>Press <b>💰 Cash out</b> before it pops: <b class="ok-t">you bank your bet with no questions</b> and the next player goes.</li>
 <li>The balloon pops <b class="bad">at random</b>, often early. If it pops, you get an A, B or C question:
  <br>✅ Correct: your bet <b>triples ×3</b>.
  <br>❌ Wrong: you lose the bet and score <b>0</b> this turn.</li>
 <li>Points add up turn by turn and the scoreboard shows each player's percentage.</li>
 <li>After the last round, <b>the player with the most points wins</b> 🏆.</li></ol>
 <p style="text-align:center;margin:14px 0 0"><small>Strategy: risking more earns more points, but cashing out in time secures your bet.</small></p>
 <div style="text-align:center;margin-top:14px"><button onclick="speak(RT)">🔊 Listen again</button> <button class="g" onclick="go()">Got it, let's play!</button></div>`;
 $("modal").classList.remove("hide");
 RT="Game rules. The goal is to score more points than everyone else after "+S.rounds+" rounds. One: each round, every player gets one turn. Two: press Pump to make the balloon grow and raise your bet. Three: press Cash out before it pops and you bank your bet with no questions. Four: the balloon pops at random. If it pops, you answer a question: if you get it right, your bet triples; if you get it wrong, you score zero this turn. Five: after the last round, the player with the most points wins. Good luck!";
 snd("click");speak(RT);
}
function go(){
 try{speechSynthesis.cancel()}catch(e){}snd("click");startMusic();$("box").style.textAlign="";$("modal").classList.add("hide");
 pts={};S.p.forEach(n=>pts[n]=0);t=0;
 $("menu").classList.add("hide");$("game").classList.remove("hide");newTurn();
}
function back(){stopMusic();$("game").classList.add("hide");$("menu").classList.remove("hide")}
function newTurn(){
 if(t>=S.p.length*S.rounds)return end();
 pumps=0;limit=1+Math.floor(Math.pow(Math.random(),1.3)*7);busy=false;
 $("bw").className="bw";$("bw").style.transform="scale(1)";$("ball").textContent="1.00x";ui();{const b=$("banner");b.textContent="🎯 "+S.p[t%S.p.length]+"'s turn";b.classList.remove("show");void b.offsetWidth;b.classList.add("show")}
}
function ui(){
 const n=S.p.length;$("rd").textContent=(Math.floor(t/n)+1)+" / "+S.rounds;$("who").textContent=S.p[t%n];
 $("pot").textContent=potNow();
 $("mults").innerHTML=MULTS.map((m,i)=>`<span class="${i===pumps?"cur":i<pumps?"done":""}">${m.toFixed(2)}x</span>`).join("");
 const tot=Object.values(pts).reduce((a,b)=>a+b,0)||1;
 $("sc").innerHTML=S.p.map(x=>`<div class="sc"><div><span>${esc(x)}</span><b>${pts[x]} · ${Math.round(pts[x]/tot*100)}%</b></div><i><u style="width:${pts[x]/tot*100}%"></u></i></div>`).join("");
 $("rk").style.width=(100-Math.min(100,pumps/6*100))+"%";$("hot").style.display=pumps>=3&&!busy?"block":"none";document.querySelector(".stage").classList.toggle("hot",pumps>=3&&!busy);$("pump").disabled=busy;$("stop").disabled=busy||!pumps;
}
function pump(){
 if(busy)return;pumps++;
 if(pumps>=limit)return boom();snd("pump");burst(["✨","⚡"],6);
 $("bw").style.transform=`scale(${1+pumps*.1})`;$("ball").textContent=MULTS[pumps].toFixed(2)+"x";
 $("bw").classList.toggle("tense",pumps>=3);ui();
}
function stop(){
 if(busy||!pumps)return;busy=true;const p=potNow(),name=S.p[t%S.p.length];
 pts[name]+=p;snd("cash");$("ball").textContent="💰 +"+p;ui();burst(["💰","✨","🪙"],18);
 setTimeout(()=>{t++;newTurn()},1300);
}
function boom(){
 busy=true;ui();$("bw").classList.add("pop");snd("boom");burst(["💥","🔥","🎈"],22);
 setTimeout(()=>ask("boom",Math.max(50,Math.round(MULTS[limit-1]*100))),650);
}
function ask(mode,base){
 const ks=Object.keys(T).filter(k=>S.sel[k]);const k=ks[Math.random()*ks.length|0];
 const pool=T[k].concat(S.custom[k]||[]);const q=pool[Math.random()*pool.length|0].split("|");
 const opts=[q[1],q[2],q[3]].map((x,i)=>({x,c:i===0})).sort(()=>Math.random()-.5);
 const name=S.p[t%S.p.length],b=mode==="stop"?2:3;
 $("box").innerHTML=(`<div class="bad" style="font-size:38px;font-weight:900">💥 BOOM!</div><small>Bet: ${base} pts. Answer correctly and it <b>triples ×3</b> (${base*3}); answer wrong and you lose it</small>`)+
 `<div style="margin-top:12px"><span class="tag">👤 ${esc(name)}</span> <span class="tag">📘 ${esc(k)}</span></div><div class="q">${esc(q[0])}</div><div id="ops">`+
 opts.map((o,i)=>`<button class="opt" data-i="${i}"><b>${"ABC"[i]}</b>${esc(o.x)}</button>`).join("")+`</div><div id="res"></div>`;
 $("modal").classList.remove("hide");
 document.querySelectorAll(".opt").forEach(bt=>bt.onclick=()=>{
  const ok=opts[bt.dataset.i].c;
  document.querySelectorAll(".opt").forEach((e,i)=>{e.disabled=true;const cl=opts[i].c?"ok":(e===bt?"no":"");if(cl)e.classList.add(cl);e.style.opacity=1});
  const gain=ok?base*b:0;pts[name]+=gain;
  snd(ok?"ok":"no");if(ok)burst(["🎉","⭐","✨","🎊"],26);
  $("res").innerHTML=`<div class="q ${ok?"ok-t":"bad"}">${ok?"You won "+gain+" points! 🎉":"Wrong: you score 0 this turn"}</div><button class="g" onclick="nextT()">Continue</button>`;
 });
}
function nextT(){$("modal").classList.add("hide");t++;newTurn()}
function end(){
 stopMusic();
 const tot=Object.values(pts).reduce((a,b)=>a+b,0)||1;
 const r=S.p.map(n=>[n,pts[n]]).sort((a,b)=>b[1]-a[1]);
 $("box").innerHTML=`<div style="font-size:52px">🏆</div><div class="q ok-t">${esc(r[0][0])} wins!</div>`+
 r.map((x,i)=>`<div class="sc"><div><span>${["🥇","🥈","🥉"][i]||i+1+"."} ${esc(x[0])}</span><b>${x[1]} pts · ${Math.round(x[1]/tot*100)}%</b></div><i><u style="width:${x[1]/tot*100}%"></u></i></div>`).join("")+
 `<button class="g" style="margin-top:16px" onclick="$('modal').classList.add('hide');back()">Back to menu</button>`;
 $("modal").classList.remove("hide");burst(["🎉","🏆","⭐","🎊"],50);snd("win");
}
function burst(e,n){for(let i=0;i<n;i++){const s=document.createElement("span");s.className="pt";s.textContent=e[i%e.length];
 s.style.cssText=`left:${45+Math.random()*10}%;top:40%;--x:${(Math.random()-.5)*700}px;--y:${(Math.random()-1)*450}px;font-size:${18+Math.random()*22}px`;
 document.body.appendChild(s);setTimeout(()=>s.remove(),1500)}}
render();
