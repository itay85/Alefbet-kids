/**
 * Brawl Letters – fixed build (no broken "if", stable handlers)
 * Notes:
 * - Fixes the SyntaxError caused by a truncated function + "if(...)" fragment.
 * - Adds missing defaults used elsewhere.
 * - Makes reward overlay clickable only once per question.
 * - Keeps your WORD_BANK + NIKKUD_MAP as-is.
 */
const BUILD = "v88";

const HEB_LETTERS = ["א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת"];

const WORD_BANK = {
  "א": [
    "אבא",
    "אמא",
    "אופניים",
    "אריה",
    "אבן",
    "אגס",
    "אור",
    "אוזן",
    "ארנב",
    "אוהל",
    "אוכל",
    "אבטיח"
  ],
  "ב": [
    "בובה",
    "בלון",
    "בננה",
    "בית",
    "ברווז",
    "ביסקוויט",
    "בקבוק",
    "ברזל",
    "בגדים",
    "בוץ",
    "במבה",
    "במיה"
  ],
  "ג": [
    "גלידה",
    "גמל",
    "גינה",
    "גביע",
    "גשר",
    "גרב",
    "גזר",
    "גיטרה",
    "גג",
    "גדר",
    "גולה",
    "גבינה"
  ],
  "ד": [
    "דג",
    "דלת",
    "דבש",
    "דינוזאור",
    "דובי",
    "דשא",
    "דף",
    "דוד",
    "דודה",
    "דגל",
    "דוד שמש",
    "דלעת"
  ],
  "ה": [
    "הר",
    "הגה",
    "הודו",
    "היפופוטם",
    "הגדה",
    "הדבקה",
    "הדפס",
    "הפסקה",
    "הצגה",
    "הפתעה",
    "הסעה",
    "הדלקה"
  ],
  "ו": [
    "וילון",
    "ורד",
    "וופל",
    "ווקי-טוקי",
    "ווקי",
    "וופלים",
    "וילונות",
    "וופלייה",
    "ורדים"
  ],
  "ז": [
    "זברה",
    "זית",
    "זנב",
    "זחל",
    "זהב",
    "זיקית",
    "זבוב",
    "זוג",
    "זכוכית",
    "זאב"
  ],
  "ח": [
    "חול",
    "חבל",
    "חלב",
    "חבר",
    "חתול",
    "חיפושית",
    "חולצה",
    "חגורה",
    "חלון",
    "חציל",
    "חנוכייה",
    "חמסה"
  ],
  "ט": [
    "טלוויזיה",
    "טיסה",
    "טבעת",
    "טיגון",
    "טיפת",
    "טיפה",
    "טיגריס",
    "טיל",
    "טלפון",
    "טוסט",
    "טירה",
    "טניס"
  ],
  "י": [
    "ילד",
    "ים",
    "יד",
    "יונה",
    "ירח",
    "יער",
    "יוגורט",
    "יומן",
    "יען",
    "יאכטה",
    "ינשוף",
    "ימין"
  ],
  "כ": [
    "כדור",
    "כובע",
    "כפית",
    "כוכב",
    "כיסא",
    "כרית",
    "כינור",
    "כדורגל",
    "כפכף",
    "כפפה",
    "כוס",
    "כף"
  ],
  "ל": [
    "לוח",
    "לחמניה",
    "לביאה",
    "לפיד",
    "לבן",
    "לשון",
    "להבה",
    "לול",
    "לימון",
    "ליצן",
    "לב",
    "לחם"
  ],
  "מ": [
    "מיטה",
    "מפתח",
    "מטוס",
    "מים",
    "ממתק",
    "מראה",
    "מכונית",
    "מגבת",
    "מזלג",
    "מנורה",
    "מוזיקה",
    "מגרש"
  ],
  "נ": [
    "נמר",
    "נר",
    "נעל",
    "נחש",
    "נוצה",
    "נעליים",
    "נייר",
    "נמלה",
    "נקר",
    "נגר",
    "נחל",
    "נשיקה"
  ],
  "ס": [
    "סוכר",
    "סבון",
    "סוס",
    "סירה",
    "ספר",
    "סנדוויץ'",
    "סלון",
    "ספל",
    "סוכריה",
    "סלט",
    "סולם",
    "סינר"
  ],
  "ע": [
    "עוגה",
    "עכבר",
    "ענן",
    "עץ",
    "עין",
    "עגלה",
    "עט",
    "עיפרון",
    "עגבנייה",
    "עוף",
    "עיר",
    "עורב"
  ],
  "פ": [
    "פיל",
    "פיתה",
    "פרח",
    "פנס",
    "פיצה",
    "פופקורן",
    "פטיש",
    "פינגווין",
    "פנקייק",
    "פרפר",
    "פעמון",
    "פסנתר"
  ],
  "צ": [
    "ציפור",
    "ציפורן",
    "צלחת",
    "צבע",
    "צוללת",
    "צחוק",
    "צמר",
    "צמיד",
    "צוות",
    "צ'יפס",
    "צל",
    "צפרדע"
  ],
  "ק": [
    "קוף",
    "קשת",
    "קובייה",
    "קופסה",
    "קיץ",
    "קרח",
    "קערה",
    "קקטוס",
    "קינוח",
    "קולנוע",
    "קוקוס"
  ],
  "ר": [
    "רכבת",
    "רמזור",
    "רופא",
    "רובוט",
    "רימון",
    "רדיו",
    "רגל",
    "רשת",
    "ריח",
    "רעש",
    "ריבה",
    "רקטה"
  ],
  "ש": [
    "שמש",
    "שולחן",
    "שוקולד",
    "שיער",
    "שמלה",
    "שפם",
    "שעון",
    "שבלול",
    "שוקו",
    "שקית",
    "שלט",
    "שוק"
  ],
  "ת": [
    "תות",
    "תפוח",
    "תמונה",
    "תינוק",
    "תנור",
    "תרנגול",
    "תיק",
    "תוף",
    "תולעת",
    "תיאטרון",
    "תותים"
  ]
};

const NIKKUD_MAP = {
  "אבא": "אַבָּא",
  "אבטיח": "אֲבַטִּיחַ",
  "אבן": "אֶבֶן",
  "אגס": "אַגָּס",
  "אוהל": "אֹהֶל",
  "אוזן": "אוֹזֶן",
  "אוכל": "אוֹכֶל",
  "אופניים": "אוֹפַנַּיִם",
  "אור": "אוֹר",
  "אמא": "אִמָּא",
  "אריה": "אַרְיֵה",
  "ארנב": "אַרְנָב",
  "בגדים": "בְּגָדִים",
  "בובה": "בּוּבָּה",
  "בוץ": "בּוֹץ",
  "ביסקוויט": "בִּיסְקוּוִיט",
  "בית": "בַּיִת",
  "בלון": "בָּלוֹן",
  "במבה": "בַּמְבָּה",
  "במיה": "בַּמְיָה",
  "בננה": "בָּנָנָה",
  "בקבוק": "בַּקְבּוּק",
  "ברווז": "בַּרְוָז",
  "ברזל": "בַּרְזֶל",
  "גבינה": "גְּבִינָה",
  "גביע": "גָּבִיעַ",
  "גג": "גַּג",
  "גדר": "גָּדֵר",
  "גולה": "גּוּלָה",
  "גזר": "גֶּזֶר",
  "גיטרה": "גִּיטָרָה",
  "גינה": "גִּינָה",
  "גלידה": "גְּלִידָה",
  "גמל": "גָּמָל",
  "גרב": "גֶּרֶב",
  "גשר": "גֶּשֶׁר",
  "דבש": "דְּבַשׁ",
  "דג": "דָּג",
  "דגל": "דֶּגֶל",
  "דובי": "דּוּבִּי",
  "דוד": "דּוֹד",
  "דוד שמש": "דּוֹד שֶׁמֶשׁ",
  "דודה": "דּוֹדָה",
  "דינוזאור": "דִּינוֹזָאוּר",
  "דלעת": "דְּלַעַת",
  "דלת": "דֶּלֶת",
  "דף": "דַּף",
  "דשא": "דֶּשֶׁא",
  "הגדה": "הַגָּדָה",
  "הגה": "הֶגֶה",
  "הדבקה": "הַדְבָּקָה",
  "הדלקה": "הַדְלָקָה",
  "הדפס": "הַדְפָּס",
  "הודו": "הוֹדוּ",
  "היפופוטם": "הִיפּוֹפּוֹטָם",
  "הסעה": "הַסָּעָה",
  "הפסקה": "הַפְסָקָה",
  "הפתעה": "הַפְתָּעָה",
  "הצגה": "הַצָּגָה",
  "הר": "הַר",
  "וופל": "וָופְל",
  "וופלייה": "וָופְלִיָּה",
  "וופלים": "וָופְלִים",
  "ווקי": "וֹקִי",
  "ווקי-טוקי": "וֹקִי-טוֹקִי",
  "וילון": "וִילוֹן",
  "וילונות": "וִילוֹנוֹת",
  "ורד": "וֶרֶד",
  "ורדים": "וְרָדִים",
  "זאב": "זְאֵב",
  "זבוב": "זְבוּב",
  "זברה": "זֶבְרָה",
  "זהב": "זָהָב",
  "זוג": "זוּג",
  "זחל": "זָחָל",
  "זיקית": "זִיקִית",
  "זית": "זַיִת",
  "זכוכית": "זְכוּכִית",
  "זנב": "זָנָב",
  "חבל": "חֶבֶל",
  "חבר": "חָבֵר",
  "חגורה": "חֲגוֹרָה",
  "חול": "חוֹל",
  "חולצה": "חוּלְצָה",
  "חיפושית": "חִפּוּשִׂית",
  "חלב": "חָלָב",
  "חלון": "חַלּוֹן",
  "חמסה": "חַמְסָה",
  "חנוכייה": "חֲנוּכִּיָּה",
  "חציל": "חָצִיל",
  "חתול": "חָתוּל",
  "טבעת": "טַבַּעַת",
  "טוסט": "טוֹסְט",
  "טיגון": "טִיגּוּן",
  "טיגריס": "טִיגְרִיס",
  "טיל": "טִיל",
  "טיסה": "טִיסָה",
  "טיפה": "טִפָּה",
  "טיפת": "טִפַּת",
  "טירה": "טִירָה",
  "טלוויזיה": "טֶלֶוִיזְיָה",
  "טלפון": "טֶלֶפוֹן",
  "טניס": "טֶנִיס",
  "יאכטה": "יָאכְטָה",
  "יד": "יָד",
  "יוגורט": "יוֹגוּרְט",
  "יומן": "יוֹמָן",
  "יונה": "יוֹנָה",
  "ילד": "יֶלֶד",
  "ים": "יָם",
  "ימין": "יָמִין",
  "ינשוף": "יַנְשׁוּף",
  "יען": "יַעֵן",
  "יער": "יַעַר",
  "ירח": "יָרֵחַ",
  "כדור": "כַּדּוּר",
  "כדורגל": "כַּדּוּרְגֶּל",
  "כובע": "כּוֹבַע",
  "כוכב": "כּוֹכָב",
  "כוס": "כּוֹס",
  "כינור": "כִּנּוֹר",
  "כיסא": "כִּסֵּא",
  "כף": "כַּף",
  "כפית": "כַּפִּית",
  "כפכף": "כַּפְכָּף",
  "כפפה": "כַּפָּה",
  "כרית": "כָּרִית",
  "לב": "לֵב",
  "לביאה": "לְבִיאָה",
  "לבן": "לָבָן",
  "להבה": "לֶהָבָה",
  "לוח": "לוּחַ",
  "לול": "לוּל",
  "לחם": "לֶחֶם",
  "לחמניה": "לַחְמָנְיָה",
  "לימון": "לִימוֹן",
  "ליצן": "לֵיצָן",
  "לפיד": "לַפִּיד",
  "לשון": "לָשׁוֹן",
  "מגבת": "מַגֶּבֶת",
  "מגרש": "מִגְרָשׁ",
  "מוזיקה": "מוּזִיקָה",
  "מזלג": "מַזְלֵג",
  "מטוס": "מָטוֹס",
  "מיטה": "מִטָּה",
  "מים": "מַיִם",
  "מכונית": "מְכוֹנִית",
  "ממתק": "מַמְתָּק",
  "מנורה": "מְנוֹרָה",
  "מפתח": "מַפְתֵּחַ",
  "מראה": "מַרְאָה",
  "נגר": "נַגָּר",
  "נוצה": "נוֹצָה",
  "נחל": "נַחַל",
  "נחש": "נָחָשׁ",
  "נייר": "נְיָר",
  "נמלה": "נְמָלָה",
  "נמר": "נָמֵר",
  "נעל": "נַעַל",
  "נעליים": "נַעֲלַיִם",
  "נקר": "נַקָּר",
  "נר": "נֵר",
  "נשיקה": "נְשִׁיקָה",
  "סבון": "סָבוֹן",
  "סוכר": "סֻכָּר",
  "סוכריה": "סֻכַּרְיָה",
  "סולם": "סֻלָּם",
  "סוס": "סוּס",
  "סינר": "סִינָר",
  "סירה": "סִירָה",
  "סלון": "סָלוֹן",
  "סלט": "סָלָט",
  "סנדוויץ'": "סַנְדְּוִויץ׳",
  "ספל": "סַפְל",
  "ספר": "סֵפֶר",
  "עגבנייה": "עַגְבָּנִיָּה",
  "עגלה": "עֲגָלָה",
  "עוגה": "עוּגָה",
  "עוף": "עוֹף",
  "עורב": "עוֹרֵב",
  "עט": "עֵט",
  "עין": "עַיִן",
  "עיפרון": "עִפָּרוֹן",
  "עיר": "עִיר",
  "עכבר": "עַכְבָּר",
  "ענן": "עָנָן",
  "עץ": "עֵץ",
  "פופקורן": "פּוֹפְּקוֹרֶן",
  "פטיש": "פַּטִּישׁ",
  "פיל": "פִּיל",
  "פינגווין": "פִּינְגְּוִין",
  "פיצה": "פִּיצָה",
  "פיתה": "פִּיתָה",
  "פנס": "פָּנָס",
  "פנקייק": "פַּנְקֵייק",
  "פסנתר": "פְּסַנְתֵּר",
  "פעמון": "פַּעֲמוֹן",
  "פרח": "פֶּרַח",
  "פרפר": "פַּרְפַּר",
  "צ'יפס": "צ׳ִיפְּס",
  "צבע": "צֶבַע",
  "צוות": "צֶוֶת",
  "צוללת": "צוֹלֶלֶת",
  "צחוק": "צְחוֹק",
  "ציפור": "צִפּוֹר",
  "ציפורן": "צִפּוֹרֶן",
  "צל": "צֵל",
  "צלחת": "צַלַּחַת",
  "צמיד": "צָמִיד",
  "צמר": "צֶמֶר",
  "צפרדע": "צְפַרְדֵּעַ",
  "קובייה": "קוּבִּיָּה",
  "קולנוע": "קוֹלְנוֹעַ",
  "קוף": "קוֹף",
  "קופסה": "קוּפְסָה",
  "קוקוס": "קוֹקוֹס",
  "קינוח": "קִינּוּחַ",
  "קיץ": "קַיִץ",
  "קערה": "קְעָרָה",
  "קקטוס": "קַקְטוּס",
  "קרח": "קֶרַח",
  "קשת": "קֶשֶׁת",
  "רגל": "רֶגֶל",
  "רדיו": "רָדְיוֹ",
  "רובוט": "רוֹבּוֹט",
  "רופא": "רוֹפֵא",
  "ריבה": "רִיבָּה",
  "ריח": "רֵיחַ",
  "רימון": "רִמּוֹן",
  "רכבת": "רַכֶּבֶת",
  "רמזור": "רַמְזוֹר",
  "רעש": "רַעַשׁ",
  "רקטה": "רַקֶּטָה",
  "רשת": "רֶשֶׁת",
  "שבלול": "שַׁבְלוּל",
  "שולחן": "שֻׁלְחָן",
  "שוק": "שׁוּק",
  "שוקו": "שׁוֹקוֹ",
  "שוקולד": "שׁוֹקוֹלָד",
  "שיער": "שֵׂעָר",
  "שלט": "שֶׁלֶט",
  "שמלה": "שִׂמְלָה",
  "שמש": "שֶׁמֶשׁ",
  "שעון": "שָׁעוֹן",
  "שפם": "שָׂפָם",
  "שקית": "שַׂקִּית",
  "תולעת": "תּוֹלַעַת",
  "תוף": "תֹּף",
  "תות": "תּוּת",
  "תותים": "תּוּתִים",
  "תיאטרון": "תֵּיאַטְרוֹן",
  "תינוק": "תִּינוֹק",
  "תיק": "תִּיק",
  "תמונה": "תְּמוּנָה",
  "תנור": "תַּנּוּר",
  "תפוח": "תַּפּוּחַ",
  "תרנגול": "תַּרְנְגוֹל"
};

// Player logos
const LOGOS = ["logo1.png","logo2.png","logo3.png","logo4.png","logo5.png","logo6.png"];

// Boss names by letter (used for UI text/animations if you have them)
const BOSS_NAMES = {"ס":"ספידי","ר":"רובו","ט":"טורנדו","כ":"כדורון","א":"אלוף","ב":"בומבו","ג":"גליץ'","ד":"דינוז","ה":"הדסון","ו":"וולט","ז":"זינג","ח":"חייזר","י":"יויו","ל":"לפידון","מ":"מגנטו","נ":"נינג'ה","ע":"ענן","פ":"פיצוץ","צ":"ציקלון","ק":"קפיץ","ש":"שומר","ת":"תותחן"};

// Difficulty confusions: correct -> confusing
const CONFUSIONS = {"ס":"ש","ש":"ס","כ":"ק","ק":"כ","ת":"ט","ט":"ת","א":"ה","ה":"א"};

const STORAGE = {
  players: "bl_players_v2",
  currentPlayer: "bl_current_player_v2",
  debug: "bl_debug_v2",
  settingsPrefix: "bl_settings_v2__",
};

const defaults = {
  minSelectedLetters: 4,
  goalCoins: 1000,

  coinsPerWinMin: 20,
  coinsPerWinMax: 45,

  coinsReducedMin: 5,
  coinsReducedMax: 12,

  chestStarsMin: 3,
  chestStarsMax: 13,

  starsToUnlockStep: 100,
  initialUnlockedLogos: 1,

  superBonusEvery: 40, // 40, 80, 120...
};

const els = {
  starsNum: document.getElementById("starsNum"),
  coinsNum: document.getElementById("coinsNum"),
  logoImg: document.getElementById("logoImg"),
  currentPlayerPill: document.getElementById("currentPlayerPill"),
  lettersModeText: document.getElementById("lettersModeText"),
  wordMasked: document.getElementById("wordMasked"),
  answers: document.getElementById("answers"),

  rewardOverlay: document.getElementById("rewardOverlay"),
  rewardHint: document.getElementById("rewardHint"),
  rewardCoinsText: document.getElementById("rewardCoinsText"),
  rewardSub: document.getElementById("rewardSub"),
  rewardMainBtn: document.getElementById("rewardMainBtn"),

  streakPill: document.getElementById("streakPill"),
  scorePill: document.getElementById("scorePill"),
  howBody: document.getElementById("howBody"),

  lettersDialog: document.getElementById("lettersDialog"),
  lettersGrid: document.getElementById("lettersGrid"),
  lettersCount: document.getElementById("lettersCount"),

  logoDialog: document.getElementById("logoDialog"),
  logoUnlockText: document.getElementById("logoUnlockText"),
  logosGrid: document.getElementById("logosGrid"),

  firstPlayerDialog: document.getElementById("firstPlayerDialog"),
  firstPlayerName: document.getElementById("firstPlayerName"),

  playersDialog: document.getElementById("playersDialog"),
  playerSelect: document.getElementById("playerSelect"),

  settingsDialog: document.getElementById("settingsDialog"),
  nikkudToggle: document.getElementById("nikkudToggle"),
  debugToggle: document.getElementById("debugToggle"),

  debugPanel: document.getElementById("debugPanel"),
  debugLog: document.getElementById("debugLog"),
};

const state = {
  currentWord: null,
  correctLetter: null,
  options: [],
  answered: false,
  revealed: false,
  lastSpoken: "",

  // retry/penalty
  hadMistake: false,

  // reward
  rewardClaimed: false,
  rewardMode: "coins", // coins | chest
};

function debugIsOn(){ return localStorage.getItem(STORAGE.debug) === "1"; }
function debugSet(on){
  localStorage.setItem(STORAGE.debug, on ? "1" : "0");
  if(!on) els.debugPanel?.classList?.add("hidden");
}
function dbg(msg){
  if(!debugIsOn()) return;
  const line = `[${new Date().toLocaleTimeString()}] ${msg}`;
  if(els.debugLog) els.debugLog.textContent = (els.debugLog.textContent ? els.debugLog.textContent + "\n" : "") + line;
  els.debugPanel?.classList?.remove("hidden");
}

function playersGet(){ try{ return JSON.parse(localStorage.getItem(STORAGE.players) || "[]"); }catch{ return []; } }
function playersSave(arr){ localStorage.setItem(STORAGE.players, JSON.stringify(arr)); }
function playerIdGet(){ return localStorage.getItem(STORAGE.currentPlayer); }
function playerIdSet(id){ localStorage.setItem(STORAGE.currentPlayer, id); }

function settingsKey(){
  const id = playerIdGet() || "p1";
  return STORAGE.settingsPrefix + id;
}
function settingsLoad(){
  try{
    const raw = localStorage.getItem(settingsKey());
    if(!raw){
      return {
        selectedLetters: [...HEB_LETTERS],
        mode: "all",
        stars: 0,
        coins: 0,
        logo: LOGOS[0],
        unlockedLogos: Math.max(defaults.initialUnlockedLogos, 1),
        usedWords: {},
        howHidden: false,
        score: 0,
        streak: 0,
        bestStreak: 0,
        showNikkud: true,
      };
    }
    const s = JSON.parse(raw);
    if(!Array.isArray(s.selectedLetters) || s.selectedLetters.length===0) s.selectedLetters=[...HEB_LETTERS];
    s.mode = (s.selectedLetters.length === HEB_LETTERS.length) ? "all" : "focus";
    if(typeof s.stars!=="number") s.stars=0;
    if(typeof s.coins!=="number") s.coins=0;
    if(typeof s.unlockedLogos!=="number") s.unlockedLogos=Math.max(defaults.initialUnlockedLogos,1);
    if(!s.usedWords || typeof s.usedWords!=="object") s.usedWords={};
    if(typeof s.howHidden!=="boolean") s.howHidden=false;
    if(typeof s.score!=="number") s.score=0;
    if(typeof s.streak!=="number") s.streak=0;
    if(typeof s.bestStreak!=="number") s.bestStreak=0;
    if(typeof s.showNikkud!=="boolean") s.showNikkud=true;
    if(!s.logo) s.logo=LOGOS[0];
    return s;
  }catch(e){
    dbg("settingsLoad error: "+e);
    return {
      selectedLetters: [...HEB_LETTERS],
      mode: "all",
      stars: 0,
      coins: 0,
      logo: LOGOS[0],
      unlockedLogos: Math.max(defaults.initialUnlockedLogos, 1),
      usedWords: {},
      howHidden: false,
      score: 0,
      streak: 0,
      bestStreak: 0,
      showNikkud: true,
    };
  }
}
function settingsSave(){
  localStorage.setItem(settingsKey(), JSON.stringify(state.settings));
}

function ensurePlayer(){
  const ps = playersGet();
  if(ps.length===0){
    els.firstPlayerDialog?.showModal?.();
    return false;
  }
  let id = playerIdGet();
  if(!id || !ps.find(p=>p.id===id)){
    id = ps[0].id;
    playerIdSet(id);
  }
  state.player = ps.find(p=>p.id===id);
  return true;
}

function renderPlayerPill(){
  if(!els.currentPlayerPill) return;
  els.currentPlayerPill.textContent = state.player ? `שחקן: ${state.player.name}` : "שחקן: —";
}

function renderStats(){
  if(els.starsNum) els.starsNum.textContent = String(state.settings.stars || 0);
  if(els.coinsNum) els.coinsNum.textContent = String(state.settings.coins || 0);
  if(els.logoImg) els.logoImg.src = "assets/logos/" + (state.settings.logo || LOGOS[0]);
  if(els.streakPill) els.streakPill.textContent = "🔥 סופר: " + String(state.settings.streak || 0);
  if(els.scorePill) els.scorePill.textContent = "✅ מילים: " + String(state.settings.score || 0);
}

function renderLettersMode(){
  if(!els.lettersModeText) return;
  if(state.settings.mode==="all") els.lettersModeText.textContent = "מצב אותיות: כל האותיות (א–ת)";
  else els.lettersModeText.textContent = `מצב אותיות: מיקוד (${state.settings.selectedLetters.length})`;
}

function applyHowVisibility(){
  if(!els.howBody) return;
  els.howBody.style.display = state.settings.howHidden ? "none" : "block";
  const btn = document.querySelector('[data-action="toggleHow"]');
  if(btn) btn.textContent = state.settings.howHidden ? "הצג" : "הסתר";
}

function hideReward(){
  state.rewardClaimed = false;
  if(els.rewardMainBtn) els.rewardMainBtn.disabled = false;
  els.rewardOverlay?.classList?.add("hidden");
}

function showRewardOverlay(mode, hintText, subText, coinsText=""){
  state.rewardMode = mode; // "coins" | "chest"
  state.rewardClaimed = false;
  if(els.rewardMainBtn) els.rewardMainBtn.disabled = false;

  if(els.rewardHint) els.rewardHint.textContent = hintText || "כל הכבוד!";
  if(els.rewardCoinsText) els.rewardCoinsText.textContent = coinsText;
  if(els.rewardSub) els.rewardSub.textContent = subText || "";
  els.rewardOverlay?.classList?.remove("hidden");
}

function getWordDisplay(word){
  if(state.settings.showNikkud && NIKKUD_MAP[word]) return NIKKUD_MAP[word];
  return word;
}

function maskWord(word){
  if(!word) return "—";
  const disp = getWordDisplay(word);
  if(state.revealed) return disp;
  return "_" + disp.slice(1);
}

function speak(text){
  if(!text) return;
  state.lastSpoken = text;
  try{
    if(!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "he-IL";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }catch(e){ dbg("speak error: "+e); }
}

function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function shuffle(a){
  const arr=[...a];
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function pickWordForLetter(letter){
  const words = WORD_BANK[letter] || [];
  if(words.length===0) return null;
  const used = state.settings.usedWords[letter] || [];
  const available = words.filter(w=>!used.includes(w));
  const pool = available.length ? available : words;
  const word = pool[randInt(0,pool.length-1)];
  const newUsed = available.length ? [...used, word] : [word];
  state.settings.usedWords[letter] = newUsed.slice(-200);
  settingsSave();
  return word;
}

function buildOptions(correct){
  const opts = new Set();
  opts.add(correct);
  const conf = CONFUSIONS[correct];
  if(conf) opts.add(conf);
  while(opts.size < 4){
    opts.add(HEB_LETTERS[randInt(0,HEB_LETTERS.length-1)]);
  }
  return shuffle([...opts]).slice(0,4);
}

function renderAnswers(){
  if(!els.answers) return;
  els.answers.innerHTML = "";
  state.options.forEach(letter=>{
    const btn = document.createElement("button");
    btn.className = "answerBtn";
    btn.type = "button";
    btn.textContent = letter;
    btn.setAttribute("data-action","chooseAnswer");
    btn.setAttribute("data-letter", letter);
    els.answers.appendChild(btn);
  });
}

function newQuestion(){
  hideReward();
  state.answered = false;
  state.revealed = false;
  state.hadMistake = false;

  const letters = (state.settings.mode==="focus") ? state.settings.selectedLetters : HEB_LETTERS;
  const target = letters[randInt(0, letters.length-1)];
  const word = pickWordForLetter(target);

  if(word){
    state.correctLetter = target;
    state.currentWord = word;
  }else{
    const fallbackLetters = HEB_LETTERS.filter(l=>(WORD_BANK[l]||[]).length>0);
    const t2 = fallbackLetters[randInt(0,fallbackLetters.length-1)];
    state.correctLetter = t2;
    state.currentWord = pickWordForLetter(t2) || "מילה";
  }

  state.options = buildOptions(state.correctLetter);
  if(els.wordMasked) els.wordMasked.textContent = maskWord(state.currentWord);
  renderAnswers();
  speak(state.currentWord);
}

function revealFirst(){
  state.revealed = true;
  if(els.wordMasked) els.wordMasked.textContent = maskWord(state.currentWord);
}
function repeatWord(){
  speak(state.currentWord || state.lastSpoken);
}

function computeCoinsForThisWin(){
  if(state.hadMistake){
    const enabled = [...document.querySelectorAll("#answers button.answerBtn:not([disabled])")];
    if(enabled.length <= 1) return 0;
    return randInt(defaults.coinsReducedMin, defaults.coinsReducedMax);
  }
  return randInt(defaults.coinsPerWinMin, defaults.coinsPerWinMax);
}

function chooseAnswer(letter){
  if(state.answered) return;

  const correct = (letter === state.correctLetter);
  if(correct){
    state.answered = true;
    state.settings.score = (state.settings.score || 0) + 1;

    if(!state.hadMistake){
      state.settings.streak = (state.settings.streak || 0) + 1;
      state.settings.bestStreak = Math.max(state.settings.bestStreak || 0, state.settings.streak);
    } else {
      state.settings.streak = 0;
    }

    settingsSave();
    renderStats();

    // lock answers to avoid double clicks
    document.querySelectorAll("#answers button.answerBtn").forEach(b=> b.disabled = true);

    // show center reward (easy tap)
    showRewardOverlay("coins", "כל הכבוד!", "לחץ על הכוכב לקבל מטבעות");
    return;
  }

  // wrong: keep question, disable that option
  state.hadMistake = true;
  state.settings.streak = 0;
  settingsSave();
  renderStats();

  const btn = els.answers?.querySelector?.(`[data-letter="${letter}"]`);
  if(btn){
    btn.disabled = true;
    btn.classList.add("disabled");
  }
}

function animateNumber(el, from, to, stepMs=12){
  return new Promise((resolve)=>{
    if(!el){ resolve(); return; }
    if(from===to){ el.textContent = String(to); resolve(); return; }
    const dir = to>from ? 1 : -1;
    let cur = from;
    const tick = ()=>{
      cur += dir;
      el.textContent = String(cur);
      if(cur===to){ resolve(); return; }
      setTimeout(tick, stepMs);
    };
    tick();
  });
}

async function claimReward(){
  if(state.rewardClaimed) return;
  state.rewardClaimed = true;
  if(els.rewardMainBtn) els.rewardMainBtn.disabled = true;

  // Chest: convert 1000 coins to stars
  if(state.rewardMode === "chest"){
    const addStars = randInt(defaults.chestStarsMin, defaults.chestStarsMax);
    state.settings.stars = (state.settings.stars || 0) + addStars;

    const unlockCount = Math.min(LOGOS.length, 1 + Math.floor((state.settings.stars || 0) / defaults.starsToUnlockStep));
    if(unlockCount > (state.settings.unlockedLogos || 1)) state.settings.unlockedLogos = unlockCount;

    settingsSave();
    renderStats();

    // show stars text in overlay briefly then move on
    if(els.rewardCoinsText) els.rewardCoinsText.textContent = `+${addStars} כוכבים`;
    if(els.rewardSub) els.rewardSub.textContent = "קיבלת כוכבים!";

    // End game: all logos unlocked
    if((state.settings.unlockedLogos || 1) >= LOGOS.length){
      if(els.rewardHint) els.rewardHint.textContent = "כל הכבוד! סיימת את המשחק";
      if(els.rewardSub) els.rewardSub.textContent = "פתחת את כל הלוגואים!";
      return;
    }

    setTimeout(()=>{ hideReward(); newQuestion(); }, 900);
    return;
  }

  // Coins reward
  const addCoins = computeCoinsForThisWin();
  const fromCoins = state.settings.coins || 0;
  const toCoins = fromCoins + addCoins;

  state.settings.coins = toCoins;
  settingsSave();

  if(els.rewardCoinsText) els.rewardCoinsText.textContent = addCoins ? `+${addCoins} מטבעות` : "0 מטבעות";
  await animateNumber(els.coinsNum, fromCoins, toCoins, 10);

  hideReward();

  // If reached goal => show chest popup, not silent
  if(state.settings.coins >= defaults.goalCoins){
    state.settings.coins = state.settings.coins - defaults.goalCoins;
    settingsSave();
    renderStats();
    showRewardOverlay("chest", "כל הכבוד! צברת 1000 מטבעות", "לחץ על ההפתעה כדי לקבל כוכבים");
    return;
  }

  // Super bonus every 40 streak (only perfect streaks)
  if(!state.hadMistake && state.settings.streak > 0 && (state.settings.streak % defaults.superBonusEvery) === 0){
    const addStars = randInt(defaults.chestStarsMin, defaults.chestStarsMax);
    state.settings.stars = (state.settings.stars || 0) + addStars;

    const unlockCount = Math.min(LOGOS.length, 1 + Math.floor((state.settings.stars || 0) / defaults.starsToUnlockStep));
    if(unlockCount > (state.settings.unlockedLogos || 1)) state.settings.unlockedLogos = unlockCount;

    settingsSave();
    renderStats();

    showRewardOverlay("chest", `🔥 סופר! ${state.settings.streak} ברצף`, `בונוס: ${addStars} כוכבים`);
    return;
  }

  setTimeout(()=>{ newQuestion(); }, 200);
}

function renderLettersGrid(){
  if(!els.lettersGrid) return;
  els.lettersGrid.innerHTML = "";
  const selected = new Set(state.settings.selectedLetters);
  HEB_LETTERS.forEach(l=>{
    const b = document.createElement("button");
    b.type="button";
    b.className = "letterChip" + (selected.has(l) ? " sel" : "");
    b.textContent = l;
    b.setAttribute("data-action","toggleLetter");
    b.setAttribute("data-letter", l);
    els.lettersGrid.appendChild(b);
  });
  if(els.lettersCount) els.lettersCount.textContent = `נבחרו: ${state.settings.selectedLetters.length}`;
}

function openLetters(){
  renderLettersGrid();
  try{ els.lettersDialog?.showModal?.(); }catch{ els.lettersDialog?.setAttribute?.("open",""); }
}
function closeLetters(){
  if(state.settings.mode==="focus" && state.settings.selectedLetters.length < defaults.minSelectedLetters){
    alert(`בחר לפחות ${defaults.minSelectedLetters} אותיות.`);
    return;
  }
  settingsSave();
  renderLettersMode();
  try{ els.lettersDialog?.close?.(); }catch{}
}
function toggleLetter(letter){
  const set = new Set(state.settings.selectedLetters);
  if(set.has(letter)) set.delete(letter); else set.add(letter);
  state.settings.selectedLetters = [...set];
  state.settings.mode = (state.settings.selectedLetters.length === HEB_LETTERS.length) ? "all" : "focus";
  renderLettersMode();
  renderLettersGrid();
}
function selectAllLetters(){
  state.settings.selectedLetters = [...HEB_LETTERS];
  state.settings.mode = "all";
  renderLettersMode();
  renderLettersGrid();
}
function clearLetters(){
  state.settings.selectedLetters = [];
  state.settings.mode = "focus";
  renderLettersMode();
  renderLettersGrid();
}

function openSettings(){
  if(els.nikkudToggle) els.nikkudToggle.value = (state.settings.showNikkud ? "on" : "off");
  if(els.debugToggle) els.debugToggle.value = (debugIsOn() ? "on" : "off");
  try{ els.settingsDialog?.showModal?.(); }catch{ els.settingsDialog?.setAttribute?.("open",""); }
}
function closeSettings(){
  try{ els.settingsDialog?.close?.(); }catch{}
}
function resetGame(){
  if(!confirm("לאפס את ההתקדמות לשחקן הנוכחי?")) return;
  localStorage.removeItem(settingsKey());
  boot();
}
function toggleHow(){
  state.settings.howHidden = !state.settings.howHidden;
  settingsSave();
  applyHowVisibility();
}

function startGame(){
  if(state.settings.mode==="focus" && state.settings.selectedLetters.length < defaults.minSelectedLetters){
    alert(`בחר לפחות ${defaults.minSelectedLetters} אותיות.`);
    openLetters();
    return;
  }
  newQuestion();
}

function openLogo(){
  // optional - if you have this dialog in your HTML it will work, otherwise ignored
  const unlocked = Math.max(1, Math.min(LOGOS.length, state.settings.unlockedLogos));
  if(!els.logoDialog || !els.logosGrid) return;
  if(els.logoUnlockText) els.logoUnlockText.textContent = `לוגואים פתוחים: ${unlocked} / ${LOGOS.length}`;
  els.logosGrid.innerHTML = "";
  LOGOS.forEach((fn, idx)=>{
    const locked = idx >= unlocked;
    const card = document.createElement("button");
    card.type = "button";
    card.className = "logoPick";
    card.disabled = locked;
    card.setAttribute("data-action","pickLogo");
    card.setAttribute("data-logo", fn);
    const img = document.createElement("img");
    img.src = `assets/logos/${fn}`;
    img.alt = "logo";
    card.appendChild(img);
    els.logosGrid.appendChild(card);
  });
  els.logoDialog.showModal();
}
function pickLogo(fn){
  state.settings.logo = fn;
  settingsSave();
  renderStats();
  try{ els.logoDialog?.close?.(); }catch{}
}

function createFirstPlayer(){
  const name = (els.firstPlayerName?.value || "שחקן 1").trim() || "שחקן 1";
  const p = {id:"p1", name};
  playersSave([p]);
  playerIdSet("p1");
  try{ els.firstPlayerDialog?.close?.(); }catch{}
  boot();
}

function onPlayerSelectChange(){
  const id = els.playerSelect.value;
  playerIdSet(id);
  boot();
}

function handleAction(action, target){
  switch(action){
    case "startGame": return startGame();
    case "openLetters": return openLetters();
    case "closeLetters": return closeLetters();
    case "toggleLetter": return toggleLetter(target.getAttribute("data-letter"));
    case "selectAllLetters": return selectAllLetters();
    case "clearLetters": return clearLetters();

    case "openSettings": return openSettings();
    case "closeSettings": return closeSettings();
    case "resetGame": return resetGame();

    case "toggleHow": return toggleHow();
    case "revealFirst": return revealFirst();
    case "repeatWord": return repeatWord();

    case "chooseAnswer": return chooseAnswer(target.getAttribute("data-letter"));
    case "claimReward": return claimReward();

    case "openLogo": return openLogo();
    case "pickLogo": return pickLogo(target.getAttribute("data-logo"));

    case "createFirstPlayer": return createFirstPlayer();

    case "dbgClear": if(els.debugLog) els.debugLog.textContent = ""; return;
    case "dbgHide": els.debugPanel?.classList?.add("hidden"); return;
  }
}

function attachDelegation(){
  document.addEventListener("click", (e)=>{
    const btn = e.target.closest("[data-action]");
    if(!btn) return;
    e.preventDefault();
    const action = btn.getAttribute("data-action");
    handleAction(action, btn);
  });

  if(els.playerSelect) els.playerSelect.addEventListener("change", onPlayerSelectChange);

  if(els.nikkudToggle){
    els.nikkudToggle.addEventListener("change", ()=>{
      state.settings.showNikkud = (els.nikkudToggle.value==="on");
      settingsSave();
      if(els.wordMasked) els.wordMasked.textContent = maskWord(state.currentWord);
    });
  }

  if(els.debugToggle){
    els.debugToggle.addEventListener("change", ()=>{
      debugSet(els.debugToggle.value==="on");
      if(debugIsOn()){ dbg("Debug enabled"); }
      else { els.debugPanel?.classList?.add("hidden"); }
    });
  }
}

function boot(){
  if(!ensurePlayer()) return;

  const ps = playersGet();
  const id = playerIdGet();
  state.player = ps.find(p=>p.id===id) || ps[0];

  state.settings = settingsLoad();

  renderPlayerPill();
  renderStats();
  renderLettersMode();
  applyHowVisibility();
  hideReward();

  if(els.wordMasked) els.wordMasked.textContent = "—";
  if(els.answers) els.answers.innerHTML = "";

  if(!debugIsOn()) els.debugPanel?.classList?.add("hidden");
  dbg(`[BOOT] ${BUILD} loaded for ${state.player?.name || "?"}`);
}

document.addEventListener("DOMContentLoaded", ()=>{
  attachDelegation();
  boot();
});
