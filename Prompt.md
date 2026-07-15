Create a static web page app that can be hosted by GitHub that keeps track of wolf game scores. The rules for it are below. At the start, you will prompt for the number of players (3 or 4), their names, and the amount to bet for each hole. Default to 4 players and $0.25 per hole.

At each hole show who is the wolf
At each hole allow selecting the wolf's partner and the others, or the lone-wolf scenario.

For the final remainder of holes, when the total number of holes does not divide evenly by the number of players, instead of using the rotation, the wolf will be the player who has the lowest score.

At the end of the 18 holes, show the scores and amount each payer owes or receives.

The UI should be mainly designed for use on a phone, and should be modern design with a nice wolf logo.

Ask if you have any questions.

Rules
Wolf is a thrilling, strategic 4-player golf game. On each hole, one player is the "Wolf". The Wolf watches the other players' tee shots and can immediately choose to partner with one of them to play a 2v2 best-ball hole, or go it alone against the other three to score extra points.

The Setup

- **The Order:** Establish a strict teeing order (e.g., Players 1, 2, 3, and 4).
- **The Rotation:** The order rotates each hole so everyone gets a turn to be the Wolf. For example, on hole 1, Player 1 is the Wolf and hits last. On hole 2, Player 2 is the Wolf and hits last.
- **The Wolf:** The player designated as the Wolf for the hole always tees off last.

How the Play Works

1. **Tee Off:** The first three players hit their drives.

Scoring

- **2v2 Play:** The two teams play their own balls or discs. The lowest net score wins the hole. Each member of the winning team earns 1 point.
- **Lone Wolf Win:** If the Wolf's score is lower than the best score of the other three players, the Wolf wins 3 points (and the opponents get nothing).
- **Lone Wolf Loss:** If the Lone Wolf fails to beat the best score of the opponents, each of the other three players gets 1 point.