import {
saveGame,
loadGame
}
from "./storage.js";


import {
scoreHole
}
from "./scoring.js";


export class Game{


constructor(){

    const saved=loadGame();
    this.tieCarry = 0;

    if(saved){

        Object.assign(this,saved);
        this.holes = saved.holes ?? 18;

    }
    else{

        this.players=[];
        this.bet=.25;
        this.hole=1;
        this.holes=18;
        this.history=[];
        this.currentWolf=null;

    }

}



setup(names,bet,holes=18){

    const safeHoles = Math.min(30, Math.max(4, Number(holes) || 18));

    // Randomize player order at game start
    const shuffled = [...names];
    for(let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    this.players =
        shuffled.map(
            n => ({
                name: n,
                points: 0
            })
        );


    this.bet=bet;

    this.hole=1;
    this.holes=safeHoles;

    this.history=[];

    this.setWolf();

    this.save();

}



setWolf(){

    const remainder = this.holes % this.players.length;
    const useLowestScore = remainder > 0 && this.hole > this.holes - remainder;

    if(!useLowestScore){

        const index =
            (this.hole-1)
            %
            this.players.length;

        this.currentWolf =
            this.players[index].name;

    }
    else{

        const low =
            Math.min(
                ...this.players.map(
                    p=>p.points
                )
            );


        const choices =
            this.players.filter(
                p=>p.points===low
            );


        // If multiple players are tied for lowest, pick deterministically
        // (the first one in the current players order) rather than random.
        const pick = choices[0];

        this.currentWolf = pick.name;

    }


    this.save();

}



getPartners(){

    return this.players
    .filter(
        p=>p.name!==this.currentWolf
    );

}



completeHole(result){

    this.history.push({

        hole:this.hole,

        wolf:this.currentWolf,

        result,

        tieCarry:this.tieCarry

    });


    if(result.type === "tie"){

        this.tieCarry++;

    }
    else {

        scoreHole(
            this.players,
            result,
            this.tieCarry
        );

        this.tieCarry = 0;

    }


    this.hole++;

    if(this.hole<=this.holes){

        this.setWolf();

    }


    this.save();

}



leaderboard(){

    return [
        ...this.players
    ]
    .sort(
        (a,b)=>
        b.points-a.points
    );

}



isFinished(){

    return this.hole>this.holes;

}



save(){

    saveGame(this);

}


}