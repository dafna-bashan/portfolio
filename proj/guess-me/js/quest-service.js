var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var STORAGE_KEY = 'tree';

function createQuestsTree() {
    var quests = loadFromStorage(STORAGE_KEY);
    if (!quests) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    } else gQuestsTree = quests;

    saveToStorage(STORAGE_KEY, gQuestsTree);
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt, yes = null, no = null) {
    return {
        txt,
        yes,
        no
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null);
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = gCurrQuest;
    gPrevQuest[lastRes] = newQuest;
    saveToStorage(STORAGE_KEY, gQuestsTree);
}

function getCurrQuest() {
    return gCurrQuest;
}

function restartGame() {
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}