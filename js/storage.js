const KEY = "wolfGolfGame";

export function saveGame(game){
    localStorage.setItem(KEY, JSON.stringify(game));
}

export function loadGame(){
    const data = localStorage.getItem(KEY);

    if(!data){
        return null;
    }

    return JSON.parse(data);
}

export function clearGame(){
    localStorage.removeItem(KEY);
}