
/**
 * Brawl Letters v73
 * Clean architecture: single source of truth, no legacy listeners.
 */
const BUILD = "v76";
const HEB_LETTERS = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];
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
    "זיפ?"
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
    "כפיר?",
    "כפוף"
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
    "רוקד?",
    "רעיון"
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
  // אפשר להוסיף ניקוד בהדרגה: "מילה": "מִלָּה"
};

const LOGOS = ["logo1.png", "logo2.png", "logo3.png", "logo4.png", "logo5.png", "logo6.png"];
const BOSSES = {"א": "boss_01_א.png", "ב": "boss_02_ב.png", "ג": "boss_03_ג.png", "ד": "boss_04_ד.png", "ה": "boss_05_ה.png", "ו": "boss_06_ו.png", "ז": "boss_07_ז.png", "ח": "boss_08_ח.png", "ט": "boss_09_ט.png", "י": "boss_10_י.png", "כ": "boss_11_כ.png", "ל": "boss_12_ל.png", "מ": "boss_13_מ.png", "נ": "boss_14_נ.png", "ס": "boss_15_ס.png", "ע": "boss_16_ע.png", "פ": "boss_17_פ.png", "צ": "boss_18_צ.png", "ק": "boss_19_ק.png", "ר": "boss_20_ר.png", "ש": "boss_21_ש.png", "ת": "boss_22_ת.png"};
const BOSS_NAMES = {"ס": "ספידי", "ר": "רובו", "ט": "טורנדו", "כ": "כדורון", "א": "אלוף", "ב": "בומבו", "ג": "גליץ'", "ד": "דינוז", "ה": "הדסון", "ו": "וולט", "ז": "זינג", "ח": "חייזר", "י": "יויו", "ל": "לפידון", "מ": "מגנטו", "נ": "נינג'ה", "ע": "ענן", "פ": "פיצוץ", "צ": "ציקלון", "ק": "קפיץ", "ש": "שומר", "ת": "תותחן"};

// Difficulty confusions: correct -> confusing
const CONFUSIONS = {
  "ס": "ש",
  "ש": "ס",
  "כ": "ק",
  "ק": "כ",
  "ת": "ט",
  "ט": "ת",
  "א": "ה",
  "ה": "א",
};

const STORAGE = {
  players: "bl_players_v2",
  currentPlayer: "bl_current_player_v2",
  debug: "bl_debug_v2",
  // per player:
  settingsPrefix: "bl_settings_v2__",
};

const defaults = {
  minSelectedLetters: 4,
  goalCoins: 1000,
  coinsPerWinMin: 20,
  coinsPerWinMax: 45, // ~ 5-30 wins to 1000
  starsToUnlockStep: 100,
  // initial unlocked logos: first 1
  initialUnlockedLogos: 1,
};

const els = {
  buildBanner: document.getElementById("buildBanner"),
  starsNum: document.getElementById("starsNum"),
  coinsNum: document.getElementById("coinsNum"),
  logoImg: document.getElementById("logoImg"),
  currentPlayerPill: document.getElementById("currentPlayerPill"),
  lettersModeText: document.getElementById("lettersModeText"),
  wordMasked: document.getElementById("wordMasked"),
  answers: document.getElementById("answers"),
  // reward overlay
  rewardOverlay: document.getElementById("rewardOverlay"),
  rewardHint: document.getElementById("rewardHint"),
  rewardCoinsText: document.getElementById("rewardCoinsText"),
  rewardSub: document.getElementById("rewardSub"),

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
  // runtime
  currentWord: null,
  correctLetter: null,
  options: [],
  answered: false,
  revealed: false,
  lastSpoken: "",
  // player
  player: null,
  settings: null,
};

function dbg(msg){
  if(!debugIsOn()) return;
  const line = `[${new Date().toLocaleTimeString()}] ${msg}`;
  els.debugLog.textContent = (els.debugLog.textContent ? els.debugLog.textContent + "\n" : "") + line;
  els.debugPanel.classList.remove("hidden");
}

function debugIsOn(){
  return localStorage.getItem(STORAGE.debug) === "1";
}
function debugSet(on){
  localStorage.setItem(STORAGE.debug, on ? "1" : "0");
  if(!on) els.debugPanel.classList.add("hidden");
}

function playersGet(){
  try{ return JSON.parse(localStorage.getItem(STORAGE.players) || "[]"); }catch{ return []; }
}
function playersSave(arr){
  localStorage.setItem(STORAGE.players, JSON.stringify(arr));
}
function playerIdGet(){
  return localStorage.getItem(STORAGE.currentPlayer);
}
function playerIdSet(id){
  localStorage.setItem(STORAGE.currentPlayer, id);
}
function settingsKey(){
  const id = playerIdGet() || "p1";
  return STORAGE.settingsPrefix + id;
}
function settingsLoad(){
  try{
    const raw = localStorage.getItem(settingsKey());
    if(!raw) return {
      selectedLetters: [...HEB_LETTERS],
      mode: "all", // all | focus
      stars: 0,
      coins: 0,
      logo: LOGOS[0] || "logo1.png",
      unlockedLogos: Math.max(defaults.initialUnlockedLogos, 1),
      usedWords: {}, // letter->set array
      howHidden: false,
      score: 0,
      streak: 0,
      bestStreak: 0,
      showNikkud: true,
    };
    const s = JSON.parse(raw);
    // migrations / safety
    if(!Array.isArray(s.selectedLetters) || s.selectedLetters.length===0) s.selectedLetters=[...HEB_LETTERS];
    if(typeof s.stars!=="number") s.stars=0;
    if(typeof s.coins!=="number") s.coins=0;
    if(typeof s.unlockedLogos!=="number") s.unlockedLogos=Math.max(defaults.initialUnlockedLogos,1);
    if(!s.usedWords || typeof s.usedWords!=="object") s.usedWords={};
    if(typeof s.howHidden!=="boolean") s.howHidden=false;
    if(typeof s.score!=="number") s.score=0;
    if(typeof s.streak!=="number") s.streak=0;
    if(typeof s.bestStreak!=="number") s.bestStreak=0;
    if(typeof s.showNikkud!=="boolean") s.showNikkud=true;
    if(!s.logo) s.logo = LOGOS[0] || "logo1.png";
    return s;
  }catch(e){
    dbg("settingsLoad error: "+e);
    return {
      selectedLetters: [...HEB_LETTERS],
      mode: "all",
      stars: 0,
      coins: 0,
      logo: LOGOS[0] || "logo1.png",
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
    els.firstPlayerDialog.showModal();
    return false;
  }
  let id = playerIdGet();
  if(!id || !ps.find(p=>p.id===id)) {
    id = ps[0].id;
    playerIdSet(id);
  }
  state.player = ps.find(p=>p.id===id);
  return true;
}

function renderPlayerPill(){
  els.currentPlayerPill.textContent = state.player ? `שחקן: ${state.player.name}` : "שחקן: —";
}

function renderStats(){
  els.starsNum.textContent = String(state.settings.stars || 0);
  els.coinsNum.textContent = String(state.settings.coins || 0);
  const logoPath = `assets/logos/${state.settings.logo}`;
  els.logoImg.src = logoPath;

  if(els.streakPill){
    els.streakPill.textContent = `🔥 סופר: ${state.settings.streak || 0}`;
  }
  if(els.scorePill){
    els.scorePill.textContent = `✅ מילים: ${state.settings.score || 0}`;
  }
}

function renderLettersMode(){
  if(state.settings.mode==="all") {
    els.lettersModeText.textContent = "מצב אותיות: כל האותיות (א–ת)";
  } else {
    state.settings.streak = 0;
    els.lettersModeText.textContent = `מצב אותיות: מיקוד (${state.settings.selectedLetters.length})`;
  }
}

function hideReward(){
  els.rewardOverlay.classList.add("hidden");
}
function showRewardOverlay(hintText, addCoins=0){
  els.rewardHint.textContent = hintText || "כל הכבוד!";
  els.rewardCoinsText.textContent = addCoins ? `+${addCoins} 🪙` : "";
  els.rewardSub.textContent = "לחץ על הכוכב לקבל מטבעות";
  els.rewardOverlay.classList.remove("hidden");
}
function getWordDisplay(word){
  if(state.settings.showNikkud && NIKKUD_MAP[word]) return NIKKUD_MAP[word];
  return word;
}

function renderWord(){
  if(!state.currentWord) return;
  const w = getWordDisplay(state.currentWord);
  els.word.textContent = w;
}

function animateNumber(el, from, to, stepMs=18){
  return new Promise((resolve)=>{
    if(from===to){ el.textContent=String(to); return resolve(); }
    const dir = to>from ? 1 : -1;
    let cur = from;
    const tick = ()=>{
      cur += dir;
      el.textContent = String(cur);
      if(cur===to) return resolve();
      setTimeout(tick, stepMs);
    };
    tick();
  });
}

function maskWord(word){
  if(!word) return "—";
  const first = word[0];
  return state.revealed ? word : ("_" + word.slice(1));
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

function randInt(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}
function shuffle(a){
  const arr=[...a];
  for(let i=arr.length-1;i>0;i--) {
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function pickWordForLetter(letter){
  const words = WORD_BANK[letter] || [];
  if(words.length===0) return null;
  const used = state.settings.usedWords[letter] || [];
  // If all used, reset used list
  const available = words.filter(w=>!used.includes(w));
  const pool = available.length ? available : words;
  const word = pool[randInt(0,pool.length-1)];
  // mark used
  const newUsed = available.length ? [...used, word] : [word];
  state.settings.usedWords[letter] = newUsed.slice(-200);
  settingsSave();
  return word;
}

function buildOptions(correct){
  // options can include any letters, but must include correct + confusion letter (if exists) to raise difficulty
  const opts = new Set();
  opts.add(correct);
  const conf = CONFUSIONS[correct];
  if(conf) opts.add(conf);

  const selected = state.settings.mode==="focus" ? state.settings.selectedLetters : HEB_LETTERS;
  const pool = selected.length>=4 ? selected : HEB_LETTERS;
  while(opts.size < 4) {
    opts.add(pool[randInt(0,pool.length-1)]);
  }
  // if still <4 (edge), fill from all
  while(opts.size < 4) {
    opts.add(HEB_LETTERS[randInt(0,HEB_LETTERS.length-1)]);
  }
  return shuffle([...opts]).slice(0,4);
}

function newQuestion(){
  state.attempts = 0;
  state.eliminated = new Set();
  state.hadMistake = false;

  hideReward();
  state.answered=false;
  state.revealed=false;

  // choose target letter (use focus set if focus, else all)
  const letters = state.settings.mode==="focus" ? state.settings.selectedLetters : HEB_LETTERS;
  const target = letters[randInt(0, letters.length-1)];
  const word = pickWordForLetter(target);
  if(!word) {
    // fallback: pick any existing word
    const fallbackLetters = HEB_LETTERS.filter(l=>(WORD_BANK[l]||[]).length>0);
    const t2 = fallbackLetters[randInt(0,fallbackLetters.length-1)];
    state.correctLetter=t2;
    state.currentWord=pickWordForLetter(t2) || "מילה";
  } else {
    state.settings.streak = 0;
    state.correctLetter = target;
    state.currentWord = word;
  }
  state.options = buildOptions(state.correctLetter);
  els.wordMasked.textContent = maskWord(state.currentWord);
  renderAnswers();
  // Speak word immediately (your original request)
  speak(state.currentWord);
}

function renderAnswers(){
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

function chooseAnswer(letter){
  if(state.answered) return;

  const correct = (letter === state.correctLetter);

  if(correct){
    state.answered = true;

    // Words solved counter
    state.settings.score = (state.settings.score || 0) + 1;

    // Streak only counts words solved with no mistakes
    if(!state.hadMistake){
      state.settings.streak = (state.settings.streak || 0) + 1;
      state.settings.bestStreak = Math.max(state.settings.bestStreak || 0, state.settings.streak);
      // בוסט לסופר: כל 40 ברצף
      if((state.settings.streak % defaults.superBonusEvery) === 0){
        state.pendingSuperBonus = true;
      }
    }

    settingsSave();
    renderStats();

    // Coins are awarded on claim; amount depends on attempts/mistakes
    showRewardOverlay("ניצחת! ⭐", 0);
  } else {
    // Wrong: keep same question, remove this option, let the child try again
    state.hadMistake = true;
    state.settings.streak = 0;
    state.attempts = (state.attempts || 0) + 1;
    state.eliminated.add(letter);

    settingsSave();
    renderStats();

    // Update UI: disable wrong option
    const btn = els.answers.querySelector(`[data-letter="${letter}"]`);
    if(btn){ btn.disabled = true; btn.classList.add("disabled"); }

    // Small feedback
    toast("לא נכון — נסה שוב 🙂");

    // If only one option left (forced correct), allow click but zero coins later
    const enabled = [...els.answers.querySelectorAll("button.answerBtn:not([disabled])")];
    if(enabled.length === 1){
      toast("נשארה תשובה אחת… נסה אותה!");
    }
  }
}
function grantStarsBonus(starsAdd, title){
  state.settings.stars = (state.settings.stars || 0) + starsAdd;
  const unlockCount = Math.min(LOGOS.length, 1 + Math.floor((state.settings.stars || 0) / defaults.starsToUnlockStep));
  if(unlockCount > (state.settings.unlockedLogos || 1)) state.settings.unlockedLogos = unlockCount;
  settingsSave();
  renderStats();

  showRewardOverlay(title || "הפתעה! ⭐", 0);
  els.rewardCoinsText.textContent = `+${starsAdd} ⭐`;
  els.rewardSub.textContent = "קיבלת כוכבים!";
  els.starsNum.textContent = String(state.settings.stars || 0);

  // End game: all logos unlocked
  if((state.settings.unlockedLogos || 1) >= LOGOS.length){
    els.rewardHint.textContent = "🎆 כל הכבוד! סיימת את המשחק 🎆";
    els.rewardSub.textContent = "פתחת את כל הלוגואים!";
  }
}

async function claimReward(){
  if(!state.answered) return;
  if(els.rewardOverlay.classList.contains("hidden")) return;

  els.rewardSub.textContent = "מקבל פרס…";

  // If the child needed multiple attempts and the last remaining option was correct -> 0 coins
  const enabledCount = [...els.answers.querySelectorAll("button.answerBtn:not([disabled])")].length;
  let addCoins = 0;

  if(state.hadMistake){
    // If mistakes until forced (only correct left)
    if(enabledCount === 1){
      addCoins = 0;
    } else {
      addCoins = randInt(defaults.coinsReducedMin, defaults.coinsReducedMax);
    }
  } else {
    addCoins = randInt(defaults.coinsPerWinMin, defaults.coinsPerWinMax);
  }

  const from = state.settings.coins || 0;
  state.settings.coins = from + addCoins;

  // Update overlay text
  els.rewardCoinsText.textContent = addCoins ? `+${addCoins} 🪙` : "0 🪙";
  els.rewardHint.textContent = addCoins ? "כל הכבוד! 🪙" : "ניסית יפה! הפעם בלי מטבעות 🙂";

  // Animate coins count
  const to = state.settings.coins;
  await animateNumber(els.coinsNum, from, to, 14);

  // If reached 1000 coins => open surprise chest: give random stars (3-13), subtract 1000
  if(state.settings.coins >= defaults.goalCoins){
    state.settings.coins = state.settings.coins - defaults.goalCoins;
    const starsAdd = randInt(defaults.chestStarsMin, defaults.chestStarsMax);
    state.settings.stars = (state.settings.stars || 0) + starsAdd;

    // Unlock logos by stars thresholds (every 100 stars => +1 logo)
    const unlockCount = Math.min(LOGOS.length, 1 + Math.floor((state.settings.stars || 0) / defaults.starsToUnlockStep));
    if(unlockCount > (state.settings.unlockedLogos || 1)){
      state.settings.unlockedLogos = unlockCount;
    }

    settingsSave();
    renderStats();

    hideReward();

    // Show surprise overlay (reuse reward overlay)
    showRewardOverlay("הפתעה! ⭐", 0);
    els.rewardCoinsText.textContent = `+${starsAdd} ⭐`;
    els.rewardSub.textContent = "קיבלת כוכבים!";

    // Animate stars number update visually
    els.starsNum.textContent = String(state.settings.stars || 0);
    els.coinsNum.textContent = String(state.settings.coins || 0);

    // If unlocked all logos -> fireworks end screen
    if((state.settings.unlockedLogos || 1) >= LOGOS.length){
      els.rewardHint.textContent = "🎆 כל הכבוד! סיימת את המשחק 🎆";
      els.rewardSub.textContent = "פתחת את כל הלוגואים!";
      // Disable answering further
      els.answers.innerHTML = "";
      return;
    }

    // Offer to choose newly unlocked logo, if any
    if(unlockCount > 1 && (state.settings.stars % defaults.starsToUnlockStep) <= defaults.chestStarsMax){
      // open logo picker after closing overlay
      setTimeout(()=>{ hideReward(); openLogo(true); }, 900);
      return;
    }

    // Continue game
    setTimeout(()=>{ hideReward(); newQuestion(); }, 900);

    if(state.pendingSuperBonus){
      state.pendingSuperBonus = false;
      const sAdd2 = randInt(defaults.superBonusStarsMin, defaults.superBonusStarsMax);
      setTimeout(()=>{ grantStarsBonus(sAdd2, "🔥 בוסט סופר! 🔥"); }, 950);
      setTimeout(()=>{ hideReward(); newQuestion(); }, 1900);
    }
    return;
  }

  settingsSave();
  renderStats();

  hideReward();

  if(state.pendingSuperBonus){
    state.pendingSuperBonus = false;
    const sAdd = randInt(defaults.superBonusStarsMin, defaults.superBonusStarsMax);
    // Show bonus overlay briefly, then continue
    grantStarsBonus(sAdd, "🔥 בוסט סופר! 🔥");
    setTimeout(()=>{ hideReward(); newQuestion(); }, 950);
    return;
  }

  setTimeout(()=>{ newQuestion(); }, 120);
}
function openLetters(){
  renderLettersGrid();
  els.lettersDialog.showModal();
}
function closeLetters(){
  // validate
  if(state.settings.mode==="focus" && state.settings.selectedLetters.length < defaults.minSelectedLetters){
    alert(`בחר לפחות ${defaults.minSelectedLetters} אותיות.`);
    return;
  }
  settingsSave();
  renderLettersMode();
  els.lettersDialog.close();
}
function renderLettersGrid(){
  els.lettersGrid.innerHTML="";
  const selected = new Set(state.settings.selectedLetters);
  HEB_LETTERS.forEach(l=>{
    const div = document.createElement("button");
    div.type="button";
    div.className="letterChip"+(selected.has(l) ? " sel" : "");
    div.textContent=l;
    div.setAttribute("data-action","toggleLetter");
    div.setAttribute("data-letter", l);
    els.lettersGrid.appendChild(div);
  });
  els.lettersCount.textContent = `נבחרו: ${state.settings.selectedLetters.length}`;
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
  state.settings.mode="all";
  renderLettersMode();
  renderLettersGrid();
}
function clearLetters(){
  state.settings.selectedLetters = [];
  state.settings.mode="focus";
  renderLettersMode();
  renderLettersGrid();
}

function openLogo(fromUnlock=false){
  const unlocked = Math.max(1, Math.min(LOGOS.length, state.settings.unlockedLogos));
  els.logoUnlockText.textContent = fromUnlock
    ? "נפתח לך לוגו חדש! בחר לוגו נוסף 🎁"
    : `לוגואים פתוחים: ${unlocked} / ${LOGOS.length} (כל 100 כוכבים נפתח עוד)`;
  els.logosGrid.innerHTML="";
  LOGOS.forEach((fn, idx)=>{
    const locked = idx >= unlocked;
    const card = document.createElement("button");
    card.type="button";
    card.className="logoPick";
    card.disabled = locked;
    card.setAttribute("data-action","pickLogo");
    card.setAttribute("data-logo", fn);
    const img = document.createElement("img");
    img.src = `assets/logos/${fn}`;
    img.alt = "logo";
    const cap = document.createElement("div");
    cap.className="muted";
    cap.textContent = locked ? "🔒 נעול" : "בחר";
    card.appendChild(img);
    card.appendChild(cap);
    els.logosGrid.appendChild(card);
  });
  els.logoDialog.showModal();
}
function closeLogo(){
  els.logoDialog.close();
}
function pickLogo(fn){
  state.settings.logo = fn;
  settingsSave();
  renderStats();
  closeLogo();
}

function openPlayers(){
  renderPlayersSelect();
  els.playersDialog.showModal();
}
function closePlayers(){
  els.playersDialog.close();
}
function renderPlayersSelect(){
  const ps = playersGet();
  els.playerSelect.innerHTML="";
  ps.forEach(p=>{
    const opt=document.createElement("option");
    opt.value=p.id;
    opt.textContent=p.name;
    if(state.player && p.id===state.player.id) opt.selected=true;
    els.playerSelect.appendChild(opt);
  });
}
function createFirstPlayer(){
  const name = (els.firstPlayerName.value || "שחקן 1").trim() || "שחקן 1";
  const p = {id:"p1", name};
  playersSave([p]);
  playerIdSet("p1");
  els.firstPlayerDialog.close();
  boot();
}
function addPlayer(){
  const ps=playersGet();
  const name=(prompt("שם השחקן החדש:", `שחקן ${ps.length+1}`)||"").trim();
  if(!name) return;
  const id="p"+Date.now().toString(36);
  ps.push({id,name});
  playersSave(ps);
  playerIdSet(id);
  boot();
}
function renamePlayer(){
  const ps=playersGet();
  const id=playerIdGet();
  const p=ps.find(x=>x.id===id);
  if(!p) return;
  const name=(prompt("שם חדש:", p.name)||"").trim();
  if(!name) return;
  p.name=name;
  playersSave(ps);
  boot();
}

function onPlayerSelectChange(){
  const id = els.playerSelect.value;
  playerIdSet(id);
  boot();
}

function openSettings(){
  els.nikkudToggle.value = (state.settings.showNikkud ? "on" : "off");
  els.debugToggle.value = debugIsOn() ? "on" : "off";
  els.settingsDialog.showModal();
}
function closeSettings(){
  els.settingsDialog.close();
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
function applyHowVisibility(){
  els.howBody.style.display = state.settings.howHidden ? "none" : "block";
  // update button text
  const btn = document.querySelector('[data-action="toggleHow"]');
  if(btn) btn.textContent = state.settings.howHidden ? "הצג" : "הסתר";
}

function startGame(){
  // ensure letters selection valid
  if(state.settings.mode==="focus" && state.settings.selectedLetters.length < defaults.minSelectedLetters){
    alert(`בחר לפחות ${defaults.minSelectedLetters} אותיות.`);
    openLetters();
    return;
  }
  // start / next question
  newQuestion();
}

function revealFirst(){
  state.revealed = true;
  els.wordMasked.textContent = maskWord(state.currentWord);
}

function repeatWord(){
  speak(state.currentWord || state.lastSpoken);
}

function handleAction(action, target){
  switch(action){
    case "startGame": return startGame();
    case "openLetters": return openLetters();
    case "closeLetters": return closeLetters();
    case "toggleLetter": return toggleLetter(target.getAttribute("data-letter"));
    case "selectAllLetters": return selectAllLetters();
    case "clearLetters": return clearLetters();
    case "openLogo": return openLogo(false);
    case "closeLogo": return closeLogo();
    case "pickLogo": return pickLogo(target.getAttribute("data-logo"));
    case "openPlayers": return openPlayers();
    case "closePlayers": return closePlayers();
    case "createFirstPlayer": return createFirstPlayer();
    case "addPlayer": return addPlayer();
    case "renamePlayer": return renamePlayer();
    case "openSettings": return openSettings();
    case "closeSettings": return closeSettings();
    case "resetGame": return resetGame();
    case "toggleHow": return toggleHow();
    case "revealFirst": return revealFirst();
    case "repeatWord": return repeatWord();
    case "chooseAnswer": return chooseAnswer(target.getAttribute("data-letter"), target);
    case "claimReward": return claimReward();
    case "dbgCopy": {
      navigator.clipboard?.writeText(els.debugLog.textContent || "");
      return;
    }
    case "dbgClear": {
      els.debugLog.textContent="";
      return;
    }
    case "dbgHide": {
      els.debugPanel.classList.add("hidden");
      return;
    }
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
  els.playerSelect.addEventListener("change", onPlayerSelectChange);
  els.nikkudToggle.addEventListener("change", ()=>{
  state.settings.showNikkud = (els.nikkudToggle.value==="on");
  settingsSave();
  // re-render current word
  renderWord();
});

els.debugToggle.addEventListener("change", ()=> { debugSet(els.debugToggle.value==="on"); if(debugIsOn()){ els.debugPanel.classList.remove("hidden"); dbg("Debug enabled"); } else { els.debugPanel.classList.add("hidden"); } });
}

function boot(){
  if(!ensurePlayer()) return;
  state.player = playersGet().find(p=>p.id===playerIdGet());
  state.settings = settingsLoad();
  renderPlayerPill();
  renderStats();
  renderLettersMode();
  applyHowVisibility();
  hideReward();
  els.wordMasked.textContent = "—";
  els.answers.innerHTML = "";
  // Debug panel visibility
  if(!debugIsOn()) els.debugPanel.classList.add("hidden");
  // populate player select if dialog open
  renderPlayersSelect();
  dbg(`[BOOT] ${BUILD} loaded for ${state.player.name}`);
}

document.addEventListener("DOMContentLoaded", ()=>{
  attachDelegation();
  boot();
});
