
function LoadItems() {
    // create array to hold items

    let items = [];
    // cycle through item name list and create new items with it, add to array.
    // set up local storage by storing my first array.
    items.push(JSON.parse(localStorage.getItem('items')));
    localStorage.setItem('items', JSON.stringify(items));

    for (let i=0; i<itemNames.length;i++) {

        let sellValue = Math.floor(Math.random()*16+1);
        let SellValue = Math.round(sellValue);

        let thisItem = new Item(itemNames[i],SellValue);


        items.push(thisItem);

        localStorage.setItem('items',JSON.stringify(items));
    }


    return items;

}





/**
 * @return {string}
 */
function PrintMenu() {


    console.log("------------------------------------");
    console.log("\tMenu");
    console.log("------------------------------------");
    console.log("1                Character Screen");
    console.log("2                Adventure");
    console.log("3                Exit");



    return "1 Character Screen\n2 Adventure\n3 Exit\nChoose Option:";

}
let items = LoadItems();

let currentCharacter = new PlayableCharacter(null);

let programRunning = true;

while(programRunning) {
    let message = PrintMenu();
    let userChoice = VerifyString(message);
    let convertedUserOption = userChoice.toLowerCase().replace(" ","");
    // switch statement looks at user's converted response to see which menu option they picked.
    switch (convertedUserOption)
    {
        case "1":
        case "characterscreen":
        {

            // If they wanted to go to the character screen, it will send them to character select.
            currentCharacter = characterSelect();
            // the result from Character select will be stored in current character

        }
            break;
        case "2":
        case "adventure":
        {
            // only start adventure (main bulk of program) if a character is selected.
            if(currentCharacter.name()!=null)
                AdventureStart(currentCharacter);

            else
            {
                // if no character selected, tell user
                console.log("Please go to the character screen first.");

            }

        }break;
        case "3":
        case "exit":
        {
            // allows the program running loop to be broken
            console.log("You have chosen to exit the program.");
            WaitForKey();

            programRunning = false;

        }
            break;
        default:
        {
            // default switch, if they type something crazy.
            console.log("Invalid choice: "+userChoice);
            WaitForKey();
        }break;


    }

    LevelUp();
    // if a character is selected
    if(currentCharacter.name() !=null)
    {
        // check to see if they leveled up using LevelCheck method
        //LevelCheck();
        if (currentCharacter.Level === 50)
        {
            // if character is level 50, the game is over.
            alert("You have maxed out your character at level 50! The game will now exit!");

            programRunning = false;
        }

    }
}





//GetRandomItem();

function characterSelect() {

    return new PlayableCharacter(VerifyString("Please type in a name for the character: "));

}

function AdventureStart(currentCharacter) {
    let xp;
    if(currentCharacter.Level<5)
    {
        xp = currentCharacter.Level*2;
    } else if(currentCharacter.Level <10) {
        xp = currentCharacter.Level * 2.5;
    } else
    {
        xp = currentCharacter.Level * 3;
    }

    // At random, character will either do nothing, go on gather quest, or go on fighting quest
    let theChoice = Math.floor(Math.random()*3);

    if(theChoice === 1)
    {
        // Gather Quest



        // go to gather quest method.
        GatherQuest(xp,currentCharacter);
    } else if(theChoice === 2)
    {
        //FIGHTING QUEST


        // Fight Quest
        let fightWinOrLose = Math.floor(Math.random()*3);
        if(fightWinOrLose<2) {
            console.log("You lost the fight.")
        }else {
            let xpAward = Number(currentCharacter.Level)*20.5;
            if(currentCharacter.Level>4) {
                xpAward +=currentCharacter.SkillPoints[4];
            }
            console.log("You won the fight! You've earned some experience:"+xpAward);
            currentCharacter.SetExperience = xpAward;

        }
    }else
    {
        //Nothing Happens
        console.log('Nothing exciting happens to '+currentCharacter.name()+' on their adventure this date.');
    }

}

function LevelUp() {
    // This function runs to see if the current character should level up.

    let experienceCap;

    // first if/else determines the experience requirement for leveling based on level. Level 1 has it easy.
    if(currentCharacter.Level === 1)
    {

        experienceCap = 50;
    } else
    {
        experienceCap = 100*currentCharacter.Level + currentCharacter.Level * 2;
    }

    let oldXP = Number(currentCharacter.GetExperience) - Number(currentCharacter.GetExperience)+1;
    if (currentCharacter.GetExperience >= experienceCap)
    {
        // If the character has enough experience to level up, level them up.
        console.log("You have leveled up!");
        // Reset current experience

        // level them up
        currentCharacter.Level = 1;

        currentCharacter.SetExperience = Number(oldXP);



        // add skill points for level
        currentCharacter.SkillPointUpdate();



    }else {
        console.log("Current Level: "+currentCharacter.Level);
        console.log("XP: "+currentCharacter.GetExperience+"/"+experienceCap);
    }
}

function GatherQuest(xpAward,currentCharacter) {

    console.log("---------------------------------------------");
    console.log("\tGATHERING QUEST STARTED");
    console.log("---------------------------------------------\n");
    // find highest number of items player will be asked to collect
    let numOfItemsHigh = currentCharacter.Level * 2 - 1;


    let numOfItems;
    // use random generator to determine how many we will ask for.
    if(numOfItemsHigh-2<=0)
    {
        numOfItems = 1;
    }else
    {
        numOfItems = Math.floor(Math.random()*3)+1;
    }
    // save variable for reward calculations
    let startNum = numOfItems;
    // instantiate quest
    let currentQuest = new Gathering(xpAward, numOfItems);
    console.log("You have started a gathering quest!");

    // choose reward item's index randomly.
    let rewardItemIndex = Math.floor(Math.random()*items.length - 1);
    if(rewardItemIndex = 38) {
        rewardItemIndex -=1;
    }
    // set the chance the reward item will be found.
    let gatherChance = 22;
    if (currentCharacter.Level>=5)
    {
        // add to this value if the character has leveled up to 5 by the value assigned to the buff.
        gatherChance += currentCharacter.SkillPoints[3];
    }


    // set quest item and temp remove from full list
    let questItem = items[rewardItemIndex];

    console.log("Your quest is to collect "+numOfItems+" "+questItem.GetItemName+"(s)");



        // this will start the quest with the true value of what they need
        let questActive = true;


        while (questActive)
        {

            // roll for if they will get nothing, get a random item, or get the quest item.
            let questOption = Math.floor(Math.random()*gatherChance+1);
            if (questOption < 20)
            {

                console.log("The traveler continues down the path, not seeing any new items.");


            }
            else
            {
                //chooses random quest item

                let randIndRandItem = Math.floor(Math.random()*items.length-1);
                let randItem = items[randIndRandItem];







                if(JSON.stringify(randItem) === JSON.stringify(questItem)) {

                    console.log("%cYou found one of the items requested!","color:green");
                    numOfItems=Number(numOfItems-1);
                }else {
                    console.log("%cInstead of the quest item, the traveler found a different item!","color:blue");
                    console.log("You've been awarded  1 experience for this item find as a consolation.");

                    currentCharacter.SetExperience = 1;


                }



            }


            // checks to see if the user has completed the quest
            if (numOfItems === 0)
            {
                // if the user collected everything, they will get their xp.
                console.log("%cYou have collected enough of the quest item.","color: green");
                let rewardEd;
                // sets the reward XP to either 5 times the base xp award if there are too many required or the number required times the base.
                if (startNum>4)
                {
                    rewardEd = xpAward * 5;
                }
                else
                {

                    rewardEd = xpAward * startNum;
                }
                console.log(currentCharacter.name()+" has been awarded "+rewardEd+" experience for completing the quest.");
                //award the points
                currentCharacter.SetExperience = rewardEd;
                // end the quest
                questActive = false;
            }


        }






}





