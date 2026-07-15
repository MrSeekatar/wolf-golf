export function addPoints(players, winners, points = 1){

    winners.forEach(name=>{

        const player =
            players.find(p=>p.name===name);

        if(player){
            player.points += points;
        }

    });

}

export function scoreHole(players, result, tieCarry=0){

    /*
      result examples:

      {
        type:"team",
        winners:["Jim","Bob"]
      }

      {
        type:"lone",
        wolf:"Jim",
        won:true
      }

      {
        type:"tie"
      }
    */


    // Tie = no points
    if(result.type === "tie"){
        return;
    }


    if(result.type==="team"){

        addPoints(
            players,
            result.winners,
            1 + tieCarry
        );

    }


    if(result.type==="lone"){

        if(result.won){

            addPoints(
                players,
                [result.wolf],
                3 + (tieCarry * 3)
            );
        }
        else{

            players
            .filter(
                p=>p.name!==result.wolf
            )
            .forEach(
                p=>p.points += 1 + tieCarry
            );

        }

    }

}


export function money(players,bet){

    const total =
        players.reduce(
            (a,p)=>a+p.points,
            0
        );

    const average =
        total / players.length;


    return players.map(p=>({

        name:p.name,

        points:p.points,

        amount:
            (p.points-average)*bet

    }));

}
