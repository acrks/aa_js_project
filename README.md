# aa_js_project
Proposal

Like many, I am plagued by slow typing and improper typing form. Is there any remedy?

Not any good ones. Maybe typing a phrase as many times as possible onto a cold, boring website that features no color or any incentive to do well, and a timer that only stops after one minute and lets you know your typing wasn't that fast. 
My program aims to flip this concept on it's head, and become a driving force for proper touch typing while providing the user (or player in this case) with a fun, interactive interface that frames the normally practice as a fun game the user can compete against themselves in, and hopefully, against friends. 
Based on WarioWare, a collection of mini-games featuring original characters and a unique artistic style, TypeTricks will be based on primarily a collection of three games designed to exercise the brain and keystrokes. Through clever tricks and a time-based scoring system, TypeTricks will increase your typing and reaction speed to have you compete with Harvard level typers. The idea is that the games will have such a degree of difficulty to keep the player invested while forcing them to look at the screen during turns, and trust their hands to cooperate with their brain and complete the challenges on time.

In TypeTricks, users will be able to:
Compete against a clock to score points
Practice their speed and accuracy while typing by completing complex brain teasers
Post their score to their social media feed
Compete against their friends by recording their score into a leaderboard

The types of games:
The first game I will develop will have a word on the screen and a key to the side of the game.
So the user will be asked to type the word "Dog", but the key to the side will have different characters to the side. For example, "D" = "B", "O" = "Q", "G" = "V", so the user will actually have to type BQV to complete the mini game

The second game is a simple typing test where the player must type a word.

The third game will have an equation on the screen and the user must type out the answer.

In addition, this project will include:
Users are afforded three lives, and must complete the challenges perfectly. Otherwise, a life will be lost.

If the challenge is completed in the given time frame, the user will be awarded points based on their ability to finish early. 

https://wireframe.cc/EFaPrQ

Technologies, Libraries, APIs

For this project I am planning to use Merriam Webster Dictionary API. The largest potential drawback I see from this is the sheer volume of words from it will be difficult to have accompanying visual aids for all, and for the more basic words that I would like to have the players starting off with ("Dog", "Cat, "Frog", for example) it may be difficult to guarantee these words are selected first. I think though that if this game was to truly fulfil it's mission of creating better touch typers, it would follow that users should become familiar with many different words, and drawing inspiration from the WarioWare games, making the game too easy would not challenge the users and make them want to return the game to see if they could beat their own score.

Another API I am considering is the Web Audio API to flesh out the game and add sound effects when a turn is completed successfully, when a key stroke is made, when time is up/in the final moments, etc. One potential downside I see with this is some experience with audio engineering is required if I was to try and build out the game with backing music while the player is playing the mini-games, but this is a potential issue with any game, and given the short turnaround time, I think it would be better to focus on this at a later moment, and focus primarily on building the game before working on the window-dressing.

Implementation Timeline

Friday Afternoon & Weekend
Work out the games and how they will be presented on the page
Monday
Style the website
Tuesday
Create/implement timer to score the game
Wednesday
Add more games for a wider range of variety in the mini games
Thursday Morning
Deploy to GitHub and Heroku

Potential Backend

Another aspect I am considering is a scoreboard which would require some backend to store/display all users scores. Ergo, this would require players to create a user profile, and for me to implement a log in system.

While I believe this could be done given how much experience we have had with these systems in App Academy, and only displaying the high scores would only benefit a player if someone were to access their account, it is still a time constraint that needs to be taken into account and possibly not implemented in the event of a time crunch.
