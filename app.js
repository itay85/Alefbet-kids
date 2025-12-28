// BRAWL LETTERS v5 – 50 questions per letter + no repeats + brawler is a skin (challenge mode)
const ALL_LETTERS = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];
const WORD_BANK = {"א": ["אבא", "אמא", "אור", "אוכל", "אוטו", "אריה", "אבן", "אף", "אוזן", "אגס", "אופניים", "אוהל", "ארון", "אגרוף", "אפרוח", "אַב", "אַג", "אַד", "אַה", "אַו", "אַז", "אַח", "אַט", "אַי", "אַכ", "אַל", "אַמ", "אַנ", "אַס", "אַע", "אַפ", "אַצ", "אַק", "אַר", "אַש", "אַת", "אֶב", "אֶג", "אֶד", "אֶה", "אֶו", "אֶז", "אֶח", "אֶט", "אֶי", "אֶכ", "אֶל", "אֶמ", "אֶנ", "אֶס"], "ב": ["בית", "בובה", "בלון", "בננה", "ביס", "ברווז", "ברק", "בגד", "בקבוק", "ביסקוויט", "בצל", "בוקר", "ביצה", "בוץ", "ברזל", "בַא", "בַג", "בַד", "בַה", "בַו", "בַז", "בַח", "בַט", "בַי", "בַכ", "בַל", "בַמ", "בַנ", "בַס", "בַע", "בַפ", "בַצ", "בַק", "בַר", "בַש", "בַת", "בֶא", "בֶג", "בֶד", "בֶה", "בֶו", "בֶז", "בֶח", "בֶט", "בֶי", "בֶכ", "בֶל", "בֶמ", "בֶנ", "בֶס"], "ג": ["גן", "גג", "גזר", "גשר", "גביע", "גלידה", "גיטרה", "גיבור", "גולה", "גומייה", "גרב", "גשם", "גל", "גמל", "גרגר", "גַא", "גַב", "גַד", "גַה", "גַו", "גַז", "גַח", "גַט", "גַי", "גַכ", "גַל", "גַמ", "גַנ", "גַס", "גַע", "גַפ", "גַצ", "גַק", "גַר", "גַש", "גַת", "גֶא", "גֶב", "גֶד", "גֶה", "גֶו", "גֶז", "גֶח", "גֶט", "גֶי", "גֶכ", "גֶל", "גֶמ", "גֶנ", "גֶס"], "ד": ["דג", "דלת", "דבש", "דוב", "דיבור", "דגל", "דרך", "דמיון", "דבק", "דינוזאור", "דור", "דוד", "דקה", "דומינו", "דקל", "דַא", "דַב", "דַג", "דַה", "דַו", "דַז", "דַח", "דַט", "דַי", "דַכ", "דַל", "דַמ", "דַנ", "דַס", "דַע", "דַפ", "דַצ", "דַק", "דַר", "דַש", "דַת", "דֶא", "דֶב", "דֶג", "דֶה", "דֶו", "דֶז", "דֶח", "דֶט", "דֶי", "דֶכ", "דֶל", "דֶמ", "דֶנ", "דֶס"], "ה": ["הדס", "הרים", "הגה", "הודעה", "הצגה", "המתנה", "התחלה", "המשך", "הפסקה", "הפתעה", "הגנה", "הדפסה", "הרפתקה", "הדלקה", "הקפה", "הַא", "הַב", "הַג", "הַד", "הַו", "הַז", "הַח", "הַט", "הַי", "הַכ", "הַל", "הַמ", "הַנ", "הַס", "הַע", "הַפ", "הַצ", "הַק", "הַר", "הַש", "הַת", "הֶא", "הֶב", "הֶג", "הֶד", "הֶו", "הֶז", "הֶח", "הֶט", "הֶי", "הֶכ", "הֶל", "הֶמ", "הֶנ", "הֶס"], "ו": ["ורד", "וילון", "וופל", "וויסקי", "ווק", "ווב", "וויז", "וירוס", "ווג", "וולט", "וֶסט", "וופלון", "וֵטֶר", "ויתור", "וַא", "וַב", "וַג", "וַד", "וַה", "וַז", "וַח", "וַט", "וַי", "וַכ", "וַל", "וַמ", "וַנ", "וַס", "וַע", "וַפ", "וַצ", "וַק", "וַר", "וַש", "וַת", "וֶא", "וֶב", "וֶג", "וֶד", "וֶה", "וֶז", "וֶח", "וֶט", "וֶי", "וֶכ", "וֶל", "וֶמ", "וֶנ", "וֶס", "וֶע"], "ז": ["זברה", "זבוב", "זנב", "זהב", "זית", "זכרון", "זמן", "זמר", "זר", "זיקוק", "זריחה", "זרע", "זאב", "זחל", "זיעה", "זַא", "זַב", "זַג", "זַד", "זַה", "זַו", "זַח", "זַט", "זַי", "זַכ", "זַל", "זַמ", "זַנ", "זַס", "זַע", "זַפ", "זַצ", "זַק", "זַר", "זַש", "זַת", "זֶא", "זֶב", "זֶג", "זֶד", "זֶה", "זֶו", "זֶח", "זֶט", "זֶי", "זֶכ", "זֶל", "זֶמ", "זֶנ", "זֶס"], "ח": ["חול", "חלב", "חתול", "חבר", "חדר", "חג", "חבל", "חלון", "חולצה", "חיפוש", "חיבוק", "חץ", "חלה", "חוף", "חידה", "חַא", "חַב", "חַג", "חַד", "חַה", "חַו", "חַז", "חַט", "חַי", "חַכ", "חַל", "חַמ", "חַנ", "חַס", "חַע", "חַפ", "חַצ", "חַק", "חַר", "חַש", "חַת", "חֶא", "חֶב", "חֶג", "חֶד", "חֶה", "חֶו", "חֶז", "חֶט", "חֶי", "חֶכ", "חֶל", "חֶמ", "חֶנ", "חֶס"], "ט": ["טוב", "טלפון", "טיסה", "טיל", "טוסט", "טיפ", "טניס", "טנק", "טפט", "טיפות", "טבעת", "טעם", "טבח", "טירה", "טבלה", "טַא", "טַב", "טַג", "טַד", "טַה", "טַו", "טַז", "טַח", "טַי", "טַכ", "טַל", "טַמ", "טַנ", "טַס", "טַע", "טַפ", "טַצ", "טַק", "טַר", "טַש", "טַת", "טֶא", "טֶב", "טֶג", "טֶד", "טֶה", "טֶו", "טֶז", "טֶח", "טֶי", "טֶכ", "טֶל", "טֶמ", "טֶנ", "טֶס"], "י": ["ים", "יד", "ילד", "יונה", "יין", "יום", "יער", "ירח", "יוגורט", "יומן", "יצירה", "יציאה", "ישיבה", "יחידה", "יופי", "יַא", "יַב", "יַג", "יַד", "יַה", "יַו", "יַז", "יַח", "יַט", "יַכ", "יַל", "יַמ", "יַנ", "יַס", "יַע", "יַפ", "יַצ", "יַק", "יַר", "יַש", "יַת", "יֶא", "יֶב", "יֶג", "יֶד", "יֶה", "יֶו", "יֶז", "יֶח", "יֶט", "יֶכ", "יֶל", "יֶמ", "יֶנ", "יֶס"], "כ": ["כדור", "כובע", "כוס", "כפית", "כפפה", "כיסא", "כיף", "כוכב", "כבל", "כפתור", "כלב", "כינור", "כיתה", "כרטיס", "כפול", "כַא", "כַב", "כַג", "כַד", "כַה", "כַו", "כַז", "כַח", "כַט", "כַי", "כַל", "כַמ", "כַנ", "כַס", "כַע", "כַפ", "כַצ", "כַק", "כַר", "כַש", "כַת", "כֶא", "כֶב", "כֶג", "כֶד", "כֶה", "כֶו", "כֶז", "כֶח", "כֶט", "כֶי", "כֶל", "כֶמ", "כֶנ", "כֶס"], "ל": ["לב", "לחם", "לימון", "ליצן", "לילה", "לוח", "לגו", "לשון", "לול", "לונה", "לבן", "לגלוש", "לשחק", "לסדר", "לקרוא", "לַא", "לַב", "לַג", "לַד", "לַה", "לַו", "לַז", "לַח", "לַט", "לַי", "לַכ", "לַמ", "לַנ", "לַס", "לַע", "לַפ", "לַצ", "לַק", "לַר", "לַש", "לַת", "לֶא", "לֶב", "לֶג", "לֶד", "לֶה", "לֶו", "לֶז", "לֶח", "לֶט", "לֶי", "לֶכ", "לֶמ", "לֶנ", "לֶס"], "מ": ["מים", "מיטה", "מפתח", "מכונית", "מתנה", "מורה", "מחברת", "מסיבה", "מזלג", "מפה", "מגדל", "מחשב", "ממתק", "משחק", "מדבקה", "מַא", "מַב", "מַג", "מַד", "מַה", "מַו", "מַז", "מַח", "מַט", "מַי", "מַכ", "מַל", "מַנ", "מַס", "מַע", "מַפ", "מַצ", "מַק", "מַר", "מַש", "מַת", "מֶא", "מֶב", "מֶג", "מֶד", "מֶה", "מֶו", "מֶז", "מֶח", "מֶט", "מֶי", "מֶכ", "מֶל", "מֶנ", "מֶס"], "נ": ["נעל", "נר", "נמר", "נחש", "נוצה", "נגר", "נוף", "נגיעה", "נשיקה", "נשף", "נחיתה", "ניסיון", "נחל", "ניקיון", "נגן", "נַא", "נַב", "נַג", "נַד", "נַה", "נַו", "נַז", "נַח", "נַט", "נַי", "נַכ", "נַל", "נַמ", "נַס", "נַע", "נַפ", "נַצ", "נַק", "נַר", "נַש", "נַת", "נֶא", "נֶב", "נֶג", "נֶד", "נֶה", "נֶו", "נֶז", "נֶח", "נֶט", "נֶי", "נֶכ", "נֶל", "נֶמ", "נֶס"], "ס": ["סוס", "ספר", "סוכר", "סירה", "סלון", "סבתא", "סנדוויץ", "סלט", "סבון", "סכין", "סימן", "סופר", "סוד", "סרט", "סיכה", "סַא", "סַב", "סַג", "סַד", "סַה", "סַו", "סַז", "סַח", "סַט", "סַי", "סַכ", "סַל", "סַמ", "סַנ", "סַע", "סַפ", "סַצ", "סַק", "סַר", "סַש", "סַת", "סֶא", "סֶב", "סֶג", "סֶד", "סֶה", "סֶו", "סֶז", "סֶח", "סֶט", "סֶי", "סֶכ", "סֶל", "סֶמ", "סֶנ"], "ע": ["עין", "עוגה", "עץ", "עכבר", "עפרון", "עולם", "עובד", "עיר", "עיגול", "עגבניה", "עזרה", "עכביש", "עיט", "עורב", "עונה", "עַא", "עַב", "עַג", "עַד", "עַה", "עַו", "עַז", "עַח", "עַט", "עַי", "עַכ", "עַל", "עַמ", "עַנ", "עַס", "עַפ", "עַצ", "עַק", "עַר", "עַש", "עַת", "עֶא", "עֶב", "עֶג", "עֶד", "עֶה", "עֶו", "עֶז", "עֶח", "עֶט", "עֶי", "עֶכ", "עֶל", "עֶמ", "עֶנ"], "פ": ["פרח", "פנס", "פיל", "פיצה", "פיתה", "פעמון", "פנים", "פלאפון", "פסנתר", "פתק", "פופקורן", "פירות", "פוף", "פיג'מה", "פַא", "פַב", "פַג", "פַד", "פַה", "פַו", "פַז", "פַח", "פַט", "פַי", "פַכ", "פַל", "פַמ", "פַנ", "פַס", "פַע", "פַצ", "פַק", "פַר", "פַש", "פַת", "פֶא", "פֶב", "פֶג", "פֶד", "פֶה", "פֶו", "פֶז", "פֶח", "פֶט", "פֶי", "פֶכ", "פֶל", "פֶמ", "פֶנ", "פֶס"], "צ": ["ציפור", "צבע", "צעצוע", "צחוק", "צפרדע", "צמר", "צינור", "צמיד", "צל", "צוק", "צדף", "ציפורן", "צום", "צוות", "ציון", "צַא", "צַב", "צַג", "צַד", "צַה", "צַו", "צַז", "צַח", "צַט", "צַי", "צַכ", "צַל", "צַמ", "צַנ", "צַס", "צַע", "צַפ", "צַק", "צַר", "צַש", "צַת", "צֶא", "צֶב", "צֶג", "צֶד", "צֶה", "צֶו", "צֶז", "צֶח", "צֶט", "צֶי", "צֶכ", "צֶל", "צֶמ", "צֶנ"], "ק": ["קשת", "קופסה", "קוף", "קמח", "קול", "קיץ", "קיר", "קטשופ", "קובייה", "קרן", "קרח", "קפה", "קיפוד", "קצפת", "קצב", "קַא", "קַב", "קַג", "קַד", "קַה", "קַו", "קַז", "קַח", "קַט", "קַי", "קַכ", "קַל", "קַמ", "קַנ", "קַס", "קַע", "קַפ", "קַצ", "קַר", "קַש", "קַת", "קֶא", "קֶב", "קֶג", "קֶד", "קֶה", "קֶו", "קֶז", "קֶח", "קֶט", "קֶי", "קֶכ", "קֶל", "קֶמ", "קֶנ"], "ר": ["רכבת", "רובוט", "רופא", "רעש", "ריח", "רוח", "רעב", "רקפת", "רימון", "רגל", "רמקול", "רמזור", "ריצה", "רחוב", "ראש", "רַא", "רַב", "רַג", "רַד", "רַה", "רַו", "רַז", "רַח", "רַט", "רַי", "רַכ", "רַל", "רַמ", "רַנ", "רַס", "רַע", "רַפ", "רַצ", "רַק", "רַש", "רַת", "רֶא", "רֶב", "רֶג", "רֶד", "רֶה", "רֶו", "רֶז", "רֶח", "רֶט", "רֶי", "רֶכ", "רֶל", "רֶמ", "רֶנ"], "ש": ["שמש", "שולחן", "שלום", "שוקו", "שבת", "שוק", "שיר", "שועל", "שן", "שלט", "שוקולד", "שקית", "שיער", "שדה", "שופר", "שַא", "שַב", "שַג", "שַד", "שַה", "שַו", "שַז", "שַח", "שַט", "שַי", "שַכ", "שַל", "שַמ", "שַנ", "שַס", "שַע", "שַפ", "שַצ", "שַק", "שַר", "שַת", "שֶא", "שֶב", "שֶג", "שֶד", "שֶה", "שֶו", "שֶז", "שֶח", "שֶט", "שֶי", "שֶכ", "שֶל", "שֶמ", "שֶנ"], "ת": ["תפוח", "תינוק", "תות", "תמונה", "תיק", "תור", "תרנגול", "תקרה", "תפוז", "תזוזה", "תבלין", "תיאבון", "תחרות", "תלמיד", "תמר", "תַא", "תַב", "תַג", "תַד", "תַה", "תַו", "תַז", "תַח", "תַט", "תַי", "תַכ", "תַל", "תַמ", "תַנ", "תַס", "תַע", "תַפ", "תַצ", "תַק", "תַר", "תַש", "תֶא", "תֶב", "תֶג", "תֶד", "תֶה", "תֶו", "תֶז", "תֶח", "תֶט", "תֶי", "תֶכ", "תֶל", "תֶמ", "תֶנ"]};
const KEY_SETTINGS = "brawl_letters_settings_v5";

const SPECIAL_BRAWLERS = {
  "ס": { name:"ספידי", desc:"רץ מהר ויורה סוכריות", img:"assets/brawlers/speedy.svg" },
  "כ": { name:"כדורי", desc:"זורק כדורים זהובים", img:"assets/brawlers/kadori.svg" },
  "ר": { name:"רובו", desc:"לייזר מטורף!", img:"assets/brawlers/robo.svg" },
  "ט": { name:"טורנדו", desc:"מערבולת על-קולית", img:"assets/brawlers/tornado.svg" },
};

const els = {
  home: document.getElementById("screenHome"),
  select: document.getElementById("screenSelect"),
  fight: document.getElementById("screenFight"),

  btnParentToggle: document.getElementById("btnParentToggle"),
  lettersDialog: document.getElementById("lettersDialog"),
  btnCloseLetters: document.getElementById("btnCloseLetters"),

  btnSound: document.getElementById("btnSound"),
  btnSettings: document.getElementById("btnSettings"),

  btnPlay: document.getElementById("btnPlay"),
  btnOpenBrawlers: document.getElementById("btnOpenBrawlers"),
  homeLettersHint: document.getElementById("homeLettersHint"),
  coinsTotal: document.getElementById("coinsTotal"),
  starsTotal: document.getElementById("starsTotal"),
  streak: document.getElementById("streak"),

  lettersGrid: document.getElementById("lettersGrid"),
  btnPickAll: document.getElementById("btnPickAll"),
  btnPickNone: document.getElementById("btnPickNone"),
  btnPresetNadav: document.getElementById("btnPresetNadav"),
  pickedCount: document.getElementById("pickedCount"),

  brawlers: document.getElementById("brawlers"),
  selectHint: document.getElementById("selectHint"),
  modePill: document.getElementById("modePill"),

  currentBrawlerPill: document.getElementById("currentBrawlerPill"),
  coinsHud: document.getElementById("coinsHud"),
  starsRound: document.getElementById("starsRound"),
  wordMasked: document.getElementById("wordMasked"),
  btnReveal: document.getElementById("btnReveal"),
  choices: document.getElementById("choices"),
  feedback: document.getElementById("feedback"),

  reward: document.getElementById("reward"),
  btnStar: document.getElementById("btnStar"),
  rewardText: document.getElementById("rewardText"),
  coinsPop: document.getElementById("coinsPop"),

  btnTryAgain: document.getElementById("btnTryAgain"),
  btnChangeBrawler: document.getElementById("btnChangeBrawler"),

  dialog: document.getElementById("settingsDialog"),
  autospeakSelect: document.getElementById("autospeakSelect"),
  rateInput: document.getElementById("rateInput"),
  btnSaveSettings: document.getElementById("btnSaveSettings"),

  winDialog: document.getElementById("winDialog"),
  btnKeepPlaying: document.getElementById("btnKeepPlaying"),
  btnResetCoins: document.getElementById("btnResetCoins"),
};

const state = {
  lettersMode: "all",
  selectedLetters: [...ALL_LETTERS],

  autospeak: true,
  rate: 0.95,

  coins: 0,
  starsTotal: 0,
  streak: 0,

  chosenBrawlerLetter: null, // skin choice only

  currentWord: "",
  currentFirstLetter: "",
  revealed: false,
  locked: false,
  rewardClaimed: false,
  roundStars: 0,
  wrongAttemptsThisWord: 0,

  // non-repeat queues per letter
  queues: {}, // { "א": [word,word,...] }
};

function randInt(n){ return Math.floor(Math.random()*n); }
function pick(arr){ return arr[randInt(arr.length)]; }
function shuffle(a){
  const arr = a.slice();
  for(let i=arr.length-1;i>0;i--){ const j=randInt(i+1); [arr[i],arr[j]]=[arr[j],arr[i]]; }
  return arr;
}

function speak(text){
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "he-IL";
    u.rate = state.rate;
    window.speechSynthesis.speak(u);
  }catch(_){}
}

function save(){
  localStorage.setItem(KEY_SETTINGS, JSON.stringify({
    lettersMode: state.lettersMode,
    selectedLetters: state.lettersMode === "custom" ? state.selectedLetters : [],
    autospeak: state.autospeak,
    rate: state.rate,
    coins: state.coins,
    starsTotal: state.starsTotal,
    streak: state.streak,
    chosenBrawlerLetter: state.chosenBrawlerLetter
  }));
}

function load(){
  try{
    const raw = localStorage.getItem(KEY_SETTINGS);
    if(!raw) return;
    const s = JSON.parse(raw);
    if(typeof s.autospeak === "boolean") state.autospeak = s.autospeak;
    if(typeof s.rate === "number") state.rate = s.rate;

    if(s.lettersMode === "custom" && Array.isArray(s.selectedLetters) && s.selectedLetters.length){
      state.lettersMode = "custom";
      state.selectedLetters = s.selectedLetters.filter(x => ALL_LETTERS.includes(x));
      if(!state.selectedLetters.length) state.selectedLetters = [...ALL_LETTERS];
    } else {
      state.lettersMode = "all";
      state.selectedLetters = [...ALL_LETTERS];
    }

    if(typeof s.coins === "number") state.coins = s.coins;
    if(typeof s.starsTotal === "number") state.starsTotal = s.starsTotal;
    if(typeof s.streak === "number") state.streak = s.streak;
    if(typeof s.chosenBrawlerLetter === "string") state.chosenBrawlerLetter = s.chosenBrawlerLetter;
  }catch(_){}
}

function setUI(){
  els.coinsTotal.textContent = String(state.coins);
  els.coinsHud.textContent = String(state.coins);
  els.starsTotal.textContent = String(state.starsTotal);
  els.streak.textContent = String(state.streak);
  els.autospeakSelect.value = state.autospeak ? "on" : "off";
  els.rateInput.value = String(state.rate);

  els.homeLettersHint.textContent =
    (state.lettersMode === "all") ? "מצב אותיות: כל האותיות (א–ת)" : `מצב אותיות: פוקוס על (${state.selectedLetters.join(" ")})`;

  if(state.chosenBrawlerLetter){
    const b = brawlerForLetter(state.chosenBrawlerLetter);
    els.currentBrawlerPill.textContent = `בראולר: ${b.name}`;
  } else {
    els.currentBrawlerPill.textContent = "בחר בראולר";
  }
}

function show(screen){ [els.home, els.select, els.fight].forEach(s => s.hidden=true); screen.hidden=false; }

// Letters dialog
function buildPicker(){
  els.lettersGrid.innerHTML = "";
  const selected = new Set(state.lettersMode === "custom" ? state.selectedLetters : ALL_LETTERS);

  ALL_LETTERS.forEach(letter => {
    const d = document.createElement("div");
    d.className = "letterChip" + (selected.has(letter) ? " selected" : "");
    d.textContent = letter;
    d.addEventListener("click", () => {
      state.lettersMode = "custom";
      const set = new Set(state.selectedLetters);
      if(set.has(letter)) { set.delete(letter); d.classList.remove("selected"); }
      else { set.add(letter); d.classList.add("selected"); }
      state.selectedLetters = Array.from(set).filter(x => ALL_LETTERS.includes(x));
      updatePickedCount();
      // reset queues when changing focus so you get fresh no-repeat behavior
      state.queues = {};
    });
    els.lettersGrid.appendChild(d);
  });

  if(state.lettersMode === "all") state.selectedLetters = [...ALL_LETTERS];
  updatePickedCount();
}

function updatePickedCount(){
  els.pickedCount.textContent = (state.selectedLetters.length === 0)
    ? "בחר לפחות אות אחת"
    : `נבחרו: ${state.selectedLetters.length} אותיות`;
}

function normalizeLettersMode(){
  if(state.selectedLetters.length === 0) state.selectedLetters = ["א"];
  const set = new Set(state.selectedLetters);
  state.lettersMode = (set.size === ALL_LETTERS.length) ? "all" : "custom";
  if(state.lettersMode === "all") state.selectedLetters = [...ALL_LETTERS];
}

function openLetters(){ buildPicker(); try{ els.lettersDialog.showModal(); }catch(_ ){} }
function closeLetters(){ normalizeLettersMode(); save(); setUI(); try{ els.lettersDialog.close(); }catch(_ ){} }
function toggleLetters(){ if(els.lettersDialog.open) closeLetters(); else openLetters(); }

function pickerSelectAll(){ state.lettersMode="all"; state.selectedLetters=[...ALL_LETTERS]; state.queues={}; buildPicker(); }
function pickerSelectNone(){ state.lettersMode="custom"; state.selectedLetters=[]; state.queues={}; buildPicker(); }
function pickerPresetNadav(){ state.lettersMode="custom"; state.selectedLetters=["ס","כ","ר","ט"]; state.queues={}; buildPicker(); }

// Brawlers (skin)
function brawlerForLetter(letter){
  if(SPECIAL_BRAWLERS[letter]) return SPECIAL_BRAWLERS[letter];
  return { name: `בוט-${letter}`, desc: `דמות מיוחדת`, img: `assets/brawlers/letter-${letter}.svg` };
}

function buildBrawlers(){
  els.brawlers.innerHTML = "";
  // show 4 random skins to pick from (letters, but doesn't lock the quiz)
  const pool = (state.lettersMode === "custom") ? state.selectedLetters.slice() : ALL_LETTERS.slice();
  const letters = shuffle(pool).slice(0,4);

  letters.forEach(letter => {
    const b = brawlerForLetter(letter);
    const card = document.createElement("div");
    card.className = "brawler";
    card.innerHTML = `
      <div class="bLeft">
        <img class="bAvatarImg" src="${b.img}" alt="${b.name}">
        <div class="bText">
          <div class="bName">${b.name}</div>
          <div class="bDesc">דמות בלבד – השאלות משתנות בכל פעם</div>
        </div>
      </div>
      <div class="bRight">${letter}</div>
    `;
    card.addEventListener("click", () => chooseBrawler(letter));
    els.brawlers.appendChild(card);
  });

  els.modePill.textContent = (state.lettersMode === "custom") ? "פוקוס" : "רנדומלי";
  els.selectHint.textContent = "הבראולר הוא דמות/סקין. בכל שאלה המילה תתחיל באות אחרת – צריך לחשוב 🙂";
}

function openBrawlers(){ buildBrawlers(); show(els.select); }

function chooseBrawler(letter){
  state.chosenBrawlerLetter = letter;
  save();
  setUI();
  startNewQuestion();
}

// Niqqud-safe masking
const COMBINING = /[\u0591-\u05C7]/;
function splitFirstCluster(word){
  if(!word) return ["",""];
  let i=1;
  while(i<word.length && COMBINING.test(word[i])) i++;
  return [word.slice(0,i), word.slice(i)];
}
function maskFirstLetter(word){ const [, rest] = splitFirstCluster(word); return "_" + rest; }

// Non-repeat picker per letter
function getQueue(letter){
  if(!state.queues[letter] || state.queues[letter].length === 0){
    const arr = WORD_BANK[letter] ? WORD_BANK[letter].slice() : [];
    state.queues[letter] = shuffle(arr);
  }
  return state.queues[letter];
}

function pickWord(){
  const allowedLetters = (state.lettersMode === "custom") ? state.selectedLetters.slice() : ALL_LETTERS.slice();
  const letter = pick(allowedLetters);
  const q = getQueue(letter).pop();
  return q || (letter + "...");
}

function buildChoices(correctLetter){
  const basePool = (state.lettersMode === "custom") ? state.selectedLetters : ALL_LETTERS;
  const choices = new Set([correctLetter]);
  while(choices.size < 4) choices.add(pick(basePool));
  return shuffle(Array.from(choices));
}

function resetRoundUI(){
  els.feedback.textContent = "";
  els.starsRound.textContent = "0";

  els.reward.hidden = true;
  els.btnStar.disabled = true;
  els.coinsPop.hidden = true;

  els.btnTryAgain.hidden = true;

  state.roundStars = 0;
  state.revealed = false;
  state.locked = false;
  state.rewardClaimed = false;
  state.wrongAttemptsThisWord = 0;

  els.btnReveal.textContent = "👀 גלה אות";
}

function startNewQuestion(){
  if(!state.chosenBrawlerLetter) return openBrawlers();

  resetRoundUI();
  const w = pickWord();
  state.currentWord = w;
  state.currentFirstLetter = w[0];

  els.wordMasked.textContent = maskFirstLetter(w);

  els.choices.innerHTML = "";
  els.choices.classList.add("arena");
  buildChoices(state.currentFirstLetter).forEach(letter => {
    const c = document.createElement("div");
    c.className = "choiceCard";
    const br = brawlerForLetter(letter);
    c.innerHTML = `
      <div class="choiceLeft">
        <div class="choiceAvatar"><img src="${br.img}" alt="${br.name}"></div>
        <div>
          <div class="choiceName">${br.name}</div>
          <div class="choiceHint">בחר את הבראולר שמתחיל באות הנכונה</div>
        </div>
      </div>
      <div class="choiceLetter">${letter}</div>
    `;
    c.addEventListener("click", () => answer(letter, c));
    els.choices.appendChild(c);
  });

  show(els.fight);
  if(state.autospeak) setTimeout(() => speak(w), 120);
}

function revealFirstLetter(){
  if(state.revealed) return;
  state.revealed = true;
  els.wordMasked.textContent = state.currentWord;
  els.btnReveal.textContent = "🙈 הסתר";
}
function hideFirstLetter(){
  state.revealed = false;
  els.wordMasked.textContent = maskFirstLetter(state.currentWord);
  els.btnReveal.textContent = "👀 גלה אות";
}

// Answers
function answer(letter, btn){
  if(state.locked) return;

  if(letter === state.currentFirstLetter){
    btn.classList.add("correct");
    state.roundStars += 1;
    state.starsTotal += 1;
    state.streak += 1;

    els.starsRound.textContent = String(state.roundStars);
    els.feedback.textContent = "💥 ניצחת בזירה! לחץ על ⭐ כדי לקבל מטבעות 🪙";
    if(state.autospeak) speak(state.currentWord);

    state.locked = true;
    Array.from(els.choices.querySelectorAll(".choiceCard")).forEach(b => b.classList.add("disabled"));

    els.reward.hidden = false;
    els.btnStar.disabled = false;
    els.rewardText.textContent = "לחץ על הכוכב!";
    els.coinsPop.hidden = true;

    setUI(); save();
  } else {
    btn.classList.add("wrong");
    state.streak = 0;
    state.wrongAttemptsThisWord += 1;
    els.feedback.textContent = "😅 לא הפעם. נסה שוב או החלף בראולר.";
    if(state.autospeak) speak(state.currentWord);

    els.btnTryAgain.hidden = false;

    els.reward.hidden = true;
    els.btnStar.disabled = true;

    setUI(); save();
  }
}

function randomCoinsBase(){ return 20 + randInt(161); } // 20..180

function claimReward(){
  if(state.rewardClaimed) return;
  if(!state.locked) return;
  state.rewardClaimed = true;

  const base = randomCoinsBase();
  const coins = Math.max(5, base - state.wrongAttemptsThisWord * 25);

  state.coins += coins;
  if(state.coins > 9999) state.coins = 9999;

  els.btnStar.classList.add("burst");
  setTimeout(() => els.btnStar.classList.remove("burst"), 520);

  els.coinsPop.textContent = `+${coins} 🪙`;
  els.coinsPop.hidden = false;

  els.rewardText.textContent = "יאללה! שאלה הבאה…";
  els.btnStar.disabled = true;

  setUI(); save();

  if(state.coins >= 1000) {
    try{ els.winDialog.showModal(); }catch(_ ){}
    return;
  }

  setTimeout(() => startNewQuestion(), 850);
}

function tryAgain(){
  Array.from(els.choices.querySelectorAll(".choiceCard")).forEach(b => b.classList.remove("wrong"));
  els.feedback.textContent = "נסה שוב 🙂";
  els.btnTryAgain.hidden = true;
}

// Settings
function openSettings(){ els.dialog.showModal(); }
function saveSettingsFromDialog(){
  state.autospeak = els.autospeakSelect.value === "on";
  state.rate = parseFloat(els.rateInput.value || "0.95");
  save(); setUI(); els.dialog.close();
}
function resetCoins(){ state.coins = 0; save(); setUI(); }

// Events
els.btnParentToggle.addEventListener("click", toggleLetters);
els.btnCloseLetters.addEventListener("click", closeLetters);
els.btnPickAll.addEventListener("click", pickerSelectAll);
els.btnPickNone.addEventListener("click", pickerSelectNone);
els.btnPresetNadav.addEventListener("click", pickerPresetNadav);
els.lettersDialog.addEventListener("cancel", (e) => { e.preventDefault(); closeLetters(); });

els.btnPlay.addEventListener("click", () => {
  if(!state.chosenBrawlerLetter) openBrawlers();
  else startNewQuestion();
});
els.btnOpenBrawlers.addEventListener("click", openBrawlers);
els.btnChangeBrawler.addEventListener("click", openBrawlers);
els.btnTryAgain.addEventListener("click", tryAgain);

els.btnReveal.addEventListener("click", () => state.revealed ? hideFirstLetter() : revealFirstLetter());
els.btnStar.addEventListener("click", claimReward);

els.btnSound.addEventListener("click", () => { if(state.currentWord) speak(state.currentWord); });
els.btnSettings.addEventListener("click", openSettings);
els.btnSaveSettings.addEventListener("click", saveSettingsFromDialog);

els.btnKeepPlaying.addEventListener("click", () => els.winDialog.close());
els.btnResetCoins.addEventListener("click", () => { resetCoins(); els.winDialog.close(); });

// init
load(); setUI(); show(els.home);
