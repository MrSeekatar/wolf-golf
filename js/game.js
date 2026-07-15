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

    }
    else{

        this.players=[];
        this.bet=.25;
        this.hole=1;
        this.history=[];
        this.currentWolf=null;

    }

}



setup(names,bet){

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

    this.history=[];

    this.setWolf();

    this.save();

}



setWolf(){

    let index;


    if(this.hole<=16){

        index=
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

    if(this.hole<=18){

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

    return this.hole>18;

}



save(){

    saveGame(this);

}


}