

class Item {

    constructor(name,sellValue) {
        //"encapsulation attempt"
        this._itemname = name;
        this._sellValue = Math.round(sellValue);

        // above, set up item, to include a counter



}

get GetItemName() {
        return this._itemname;
}
get sellValue() {
        return Math.round(this._sellValue);
}



}

class Character {
    constructor(name,level) {
        this._name = name;
        this._level = level;

    }
name() {

        return this._name;

}

set Level(hardLevel) {
        this._level +=hardLevel;
}

get Level() {
        return this._level;
}

}

class PlayableCharacter extends Character {
constructor(name) {
    super(name,1);
    this._currentExperience = 1;
    this._skillPoints = [];
    this._skillPoints.push(12);
    this._skillPoints.push(2);
    this._skillPoints.push(2);
    this._skillPoints.push(1);
    this._skillPoints.push(1);
    this._inventory = [];

}
set SetExperience(pointsToAdd) {
    this._currentExperience+=Math.round(pointsToAdd);


}
get GetExperience() {
    return this._currentExperience;
}

get SkillPoints() {
    return this._skillPoints;
}
set SkillPoints(value) {
    this._skillPoints=value;
}



    SkillPointUpdate() {
    // Add skill points based on level
    if(super.Level < 5) {
        this._skillPoints[0] += 5;

        this._skillPoints[1] += 1;
        this._skillPoints[2] += 2;

        console.log('You have reached level '+super.Level+'! Your new stats are as follows:');
        console.log("Hit Points: "+this._skillPoints[0]);
        console.log("Defense: "+this._skillPoints[1]);
        console.log("Attack Power: "+this._skillPoints[2]);



    }else {
        let newSkillPoints = 7;
        if(super.Level === 5) {
            console.log("Congratulations on your Level 5 accomplishment. You have the ability to add bonuses to skill point steps. We have also added two new skill points types.");
            console.log("The Gathering Bonus will allow your character to have a higher chance of finding the item they are assigned in a gathering quest.");
            console.log("The Fighting Bonus will give your character more experience when they win a fight.");

            newSkillPoints+=5;
        }

        if(super.Level % 5 === 0) {
            // get another bonus
            newSkillPoints+=5;
            console.log("In honor of your accomplishment, you have been awarded "+newSkillPoints+" skill points instead of the normal 7 to spend.");
        }

        // while the user can award points to skills, ask them what they would like to award to.
        while(newSkillPoints>0) {
            let intParam = 0;
            console.log("Available Skills: ");
            let message = "1 Hit Points: "+this._skillPoints[0]+"\n2 Defense: "+this._skillPoints[1]+"\n3 Attack Power: "+this._skillPoints[2];
            if(super.Level<5) {
                intParam = 3;

            }else {
                intParam=5;
                message+="\n4 Gathering Bonus: "+this._skillPoints[3]+"\n5 Fighting Bonus: "+this._skillPoints[4];
            }
            message+="\nChoose an option by number: ";
            let choice = VerifyInt(0,intParam,message);
            let pointsToAdd = VerifyInt(1,newSkillPoints,"How many points would you like to add? You can add up to "+newSkillPoints+" points: ");
            // add the points to the section they selected.
            this._skillPoints[Number(choice)-1] += Number(pointsToAdd);
            console.log("You've added the skill points successfully");
            newSkillPoints-=pointsToAdd;


        }


    }
}
get Inventory() {
    return this._inventory;

}

}

class Quest {
    constructor(xpAward) {
        this._xpAward = xpAward;
    }
    get XP() {
        return this._xpAward;
    }
}

class Gathering extends Quest {
    constructor(xpAward, itemAmount) {
        super(xpAward);
        this._itemAmount = itemAmount;
    }
    get ItemAmount() {
        return this._itemAmount;
    }
}