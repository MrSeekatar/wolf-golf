export class UI {

constructor(game){

    this.game = game;
    this.app =
        document.getElementById("app");

}



showSetup(){

this.app.innerHTML = `

<div class="card">

<h2>🐺 New Wolf Game</h2>

<label>
Players
</label>

<select id="players">

<option value="4">
4 Players
</option>

<option value="3">
3 Players
</option>

</select>


<div id="names"></div>


<label>
Holes
</label>

<input
id="holes"
type="number"
min="4"
max="30"
step="1"
value="18">


<label>
Bet per point
</label>

<input
id="bet"
type="number"
step=".25"
value=".25">


<button id="start">
Mix & Start Game
</button>


</div>

`;


this.updateNames();


document
.getElementById("players")
.onchange =
()=>this.updateNames();



document
.getElementById("start")
.onclick =
()=>{

const count =
Number(
document
.getElementById("players")
.value
);

const holeCount = Math.min(
30,
Math.max(
4,
Number(
document
.getElementById("holes")
.value || 18
)
)
);

const names=[];


for(let i=1;i<=count;i++){

let value =
document
.getElementById(
"name"+i
)
.value
.trim();


if(!value)
value="Player "+i;


names.push(value);

}


this.game.setup(
names,
Number(
document
.getElementById("bet")
.value
),
holeCount
);


this.showHole();

};


}



updateNames(){

const count =
Number(
document
.getElementById("players")
.value
);


let html="";


for(let i=1;i<=count;i++){

html+=`

<input
id="name${i}"
placeholder="Player name">

`;

}


document
.getElementById("names")
.innerHTML=html;

}




showHole(){

if(this.game.isFinished()){

this.showFinal();

return;

}


const wolf =
this.game.currentWolf;


const progress =
((this.game.hole-1)/Math.max(1,this.game.holes))*100;


this.app.innerHTML=`

<div class="progress">
<div style="
width:${progress}%
"></div>
</div>


<div class="card currentWolf">

<div class="bigTitle">

Hole ${this.game.hole}

</div>


<h2>
🐺 Wolf:
${wolf}
</h2>

${this.game.tieCarry > 0 ?
`
<div class="card">
🤝 ${this.game.tieCarry} tied hole(s) carrying over
</div>
`
:
""
}

</div>


<div class="card">

<h3>
Leaderboard
</h3>

${this.leaderboardHTML()}

</div>


<div class="card">

<h3>
Choose Partner
</h3>

<div class="partnerGrid">


${this.game
.getPartners()
.map(p=>`

<button class="partner"
data-name="${p.name}">

${p.name}

</button>

`)
.join("")}


<button
class="secondary"
id="lone">

🐺 Lone Wolf

</button>


</div>

</div>

`;


document
.querySelectorAll(".partner")
.forEach(btn=>{

btn.onclick=()=>{

this.showWinnerChoice({

type:"team",

partner:
btn.dataset.name

});

};

});



document
.getElementById("lone")
.onclick=
()=>this.showWinnerChoice({

type:"lone"

});


}





showWinnerChoice(choice){

let html="";


if(choice.type==="team"){


const wolf =
this.game.currentWolf;


html=`

<div class="card">

<h2>
Hole Result
</h2>

<button id="team1">
${wolf} + ${choice.partner}
</button>

<button id="team2">
Other Team
</button>

<button class="secondary" id="tie">
🤝 Tie Hole
</button>

</div>

`;

}



else{


html=`

<div class="card">

<h2>
Lone Wolf Result
</h2>


<button id="win">

🐺 Wolf Won (+3)

</button>


<button id="loss">

Wolf Lost

</button>

<button class="secondary" id="tie">
🤝 Tie Hole
</button>

</div>

`;

}



this.app.innerHTML=html;



if(choice.type==="team"){


document
.getElementById("team1")
.onclick=
()=>{


this.game.completeHole({

type:"team",

winners:
[
this.game.currentWolf,
choice.partner
]


});


this.showHole();

};



document
.getElementById("team2")
.onclick=
()=>{


this.game.completeHole({

type:"team",

winners:
this.game.players
.filter(
p=>
p.name!==this.game.currentWolf &&
p.name!==choice.partner
)
.map(p=>p.name)


});


this.showHole();

};

document
.getElementById("tie")
.onclick =
()=>{

this.game.completeHole({

type:"tie"

});

this.showHole();

};

}



else{

document
.getElementById("tie")
.onclick =
()=>{

this.game.completeHole({

type:"tie"

});

this.showHole();

};

document
.getElementById("win")
.onclick=
()=>{

this.game.completeHole({

type:"lone",

wolf:this.game.currentWolf,

won:true

});


this.showHole();

};



document
.getElementById("loss")
.onclick=
()=>{

this.game.completeHole({

type:"lone",

wolf:this.game.currentWolf,

won:false

});


this.showHole();

};


}



}





leaderboardHTML(){

return this.game
.leaderboard()
.map((p,i)=>`

<div>

${i+1}.
${p.name}

<strong>
${p.points}
</strong>

</div>

`)
.join("");

}





showFinal(){


this.app.innerHTML=`

<div class="card">

<h1>
🏆 Final Results
</h1>


${this.leaderboardHTML()}


</div>


<div class="card">

<h2>
Payments
</h2>


${this.paymentHTML()}


</div>


<button id="new">

New Game

</button>

`;


document
.getElementById("new")
.onclick=()=>{

localStorage.clear();

location.reload();

};


}





paymentHTML(){

const avg =
this.game.players
.reduce(
(a,p)=>a+p.points,
0
)
/
this.game.players.length;


return this.game.players
.map(p=>{

const money =
((p.points-avg)
*
this.game.bet)
.toFixed(2);


return `

<div>

${p.name}: ${money>=0?"+":""}${money}

</div>

`;

})
.join("");

}


}