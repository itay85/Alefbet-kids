const USE_LEGACY_BINDINGS = false;
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showDebug(msg){try{const el=document.getElementById('debugPanel'); if(el) el.textContent=msg;}catch(e){}}
// BRAWL LETTERS v5 – 50 questions per letter + no repeats + brawler is a skin (challenge mode)
const ALL_LETTERS = ["א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת"];



// v29: similar-sound confusion pairs to increase difficulty
const CONFUSION_MAP = {
  "ס": "ש",
  "ש": "ס",
  "כ": "ק",
  "ק": "כ",
  "ת": "ט",
  "ט": "ת",
  "א": "ה",
  "ה": "א"
};

// v13: Letter bosses (explicit mapping to existing filenames)
const LETTER_BOSS_INDEX = {
  "א": "01",
  "ב": "02",
  "ג": "03",
  "ד": "04",
  "ה": "05",
  "ו": "06",
  "ז": "07",
  "ח": "08",
  "ט": "09",
  "י": "10",
  "כ": "11",
  "ל": "12",
  "מ": "13",
  "נ": "14",
  "ס": "15",
  "ע": "16",
  "פ": "17",
  "צ": "18",
  "ק": "19",
  "ר": "20",
  "ש": "21",
  "ת": "22",
};


function bossForLetter(ch){
  const idx = LETTER_BOSS_INDEX[ch];
  const nm = LETTER_BOSS_NAMES[ch] || `בוס ${ch}`;
  if(!idx){
    return { name: nm, img: null };
  }
  return { name: nm, img: `assets/bosses/boss_${idx}_${ch}.png` };
}


const WORD_BANK = {
  "א": [
    "אָבָּא",
    "אִמָּא",
    "אוֹפַנַּיִם",
    "אֲרִיֵּה",
    "אֹכֶל",
    "אֲוִיר",
    "אֲרוֹן",
    "אֲבָנִים",
    "אֲרִיזָה",
    "אֲפֵרוֹחַ",
    "אֲגָס",
    "אֲנָנָס",
    "אֲרֻבָּה",
    "אֲרָנָב",
    "אֲמְבַּטְיָה"
  ],
  "ב": [
    "בַּיִת",
    "בָּנָנָה",
    "בַּלּוֹן",
    "בּוּבָּה",
    "בְּקָבוּק",
    "בִּגְדִּים",
    "בֵּיצָה",
    "בְּרֵיכָה",
    "בִּיסְקוֹט",
    "בַּרְוָז",
    "בּוֹקֶר",
    "בַּצֵּק",
    "בִּנְיָן",
    "בְּרֶז",
    "בַּרְזֶל"
  ],
  "ג": [
    "גַּן",
    "גֶּזֶר",
    "גְּלִידָה",
    "גִּיטָרָה",
    "גּוּלָה",
    "גְּבִינָה",
    "גֶּשֶׁם",
    "גַּלִּים",
    "גַּמָּל",
    "גְּבִיעַ",
    "גַּרְבַּיִם",
    "גַּלְגַּל",
    "גּוּפִיָּה",
    "גַּנָּן"
  ],
  "ד": [
    "דֶּלֶת",
    "דְּבַשׁ",
    "דֹּב",
    "דֶּגֶל",
    "דַּבֵּק",
    "דּוֹד",
    "דִּינוֹזָאוּר",
    "דַּפִּים",
    "דְּלָתוֹת",
    "דְּיוֹ",
    "דּוּבִּי",
    "דּוּגְמָה"
  ],
  "ה": [
    "הוֹרִים",
    "הַר",
    "הַצָּגָה",
    "הַפְתָּעָה",
    "הַפְסָקָה",
    "הַרְפַּתְקָה"
  ],
  "ו": [
    "וֶרֶד",
    "וִילוֹן",
    "וָפֶל",
    "וִידֵאוֹ",
    "וַנִיל",
    "וָרָדִים"
  ],
  "ז": [
    "זֶבְּרָה",
    "זֶהָב",
    "זָנָב",
    "זַיִת",
    "זְמַן",
    "זָאֵב",
    "זַחַל",
    "זְכוּכִית",
    "זַרְקוֹר"
  ],
  "ח": [
    "חָתוּל",
    "חָלָב",
    "חוֹל",
    "חֶדֶר",
    "חַבֵּר",
    "חַג",
    "חַלּוֹן",
    "חֻלְצָה",
    "חִיבּוּק",
    "חַלָּה",
    "חוֹף",
    "חִידָה",
    "חֲבִילָה",
    "חֲצָאִית",
    "חֲצֵר"
  ],
  "ט": [
    "טֵלֵפוֹן",
    "טוֹסְט",
    "טַבַּעַת",
    "טִיפָּה",
    "טִיסָה",
    "טִירָה",
    "טַבְלָה",
    "טוֹפֶס",
    "טֶקֶס"
  ],
  "י": [
    "יֶלֶד",
    "יְלָדִים",
    "יוֹם",
    "יָם",
    "יוֹנָה",
    "יַעַר",
    "יָרֵחַ",
    "יוֹגּוּרְט",
    "יוֹמָן",
    "יָרָקוֹת",
    "יַלְקוּט",
    "יָדִית",
    "יָרֵךְ"
  ],
  "כ": [
    "כַּדּוּר",
    "כּוֹס",
    "כִּסֵּא",
    "כּוֹבַע",
    "כַּפִּית",
    "כֶּלֶב",
    "כּוֹכָב",
    "כְּרִית",
    "כַּרְטִיס",
    "כְּלִי",
    "כַּד",
    "כְּנָף"
  ],
  "ל": [
    "לוּחַ",
    "לַחְמָנִיָּה",
    "לְבִיאָה",
    "לַפִּיד",
    "לָבָן",
    "לָשׁוֹן",
    "לֶהָבָה"
  ],
  "מ": [
    "מַיִם",
    "מִטָּה",
    "מַפְתֵּחַ",
    "מְכוֹנִית",
    "מַתָּנָה",
    "מוֹרֶה",
    "מַחְבֶּרֶת",
    "מִשְׂחָק",
    "מִזְלָג",
    "מַפָּה",
    "מִגְדָּל",
    "מַחְשֵׁב",
    "מַמְתָּק",
    "מַדְבֵּקָה",
    "מִסְפָּרַיִם"
  ],
  "נ": [
    "נַעַל",
    "נֵר",
    "נָמֵר",
    "נָחָשׁ",
    "נוֹצָה",
    "נוֹף",
    "נֵס"
  ],
  "ס": [
    "סוּס",
    "סֵפֶר",
    "סֻכָּר",
    "סִירָה",
    "סַל",
    "סַפָּה",
    "סַכִּין",
    "סַבּוֹן",
    "סִימָן",
    "סוֹפְגָּנְיָה",
    "סַנְדָּל",
    "סַפָּר"
  ],
  "ע": [
    "עַיִן",
    "עוּגָה",
    "עֵץ",
    "עַכְבָּר",
    "עִפָּרוֹן",
    "עִגּוּל",
    "עֲגָבָנִיָּה",
    "עֵז",
    "עוֹרֵב",
    "עַנָּן",
    "עֲנָבִים",
    "עֲגִיל"
  ],
  "פ": [
    "פֶּרַח",
    "פָּנָס",
    "פִּיל",
    "פִּיצָה",
    "פִּיתָה",
    "פַּעֲמוֹן",
    "פָּנִים",
    "פְּסַנְתֵּר",
    "פֶּתֶק",
    "פּוֹפְּקוֹרְן",
    "פֵּרוֹת",
    "פִּיגַ׳מָה"
  ],
  "צ": [
    "צִפּוֹר",
    "צֶבַע",
    "צַעֲצוּעַ",
    "צְחוֹק",
    "צְפַרְדֵּעַ",
    "צֶמֶר",
    "צִנּוֹר",
    "צָמִיד",
    "צֵל",
    "צִפּוֹרֶן",
    "צִיר",
    "צִלְצוּל"
  ],
  "ק": [
    "קֶשֶׁת",
    "קֻפְסָה",
    "קוֹף",
    "קֶמַח",
    "קוֹל",
    "קַיִץ",
    "קִיר",
    "קֶטְשׁוֹפּ",
    "קֻבִּיָּה",
    "קֶרֶן",
    "קֶרַח",
    "קָפֶה",
    "קִפּוֹד",
    "קֶצֶף"
  ],
  "ר": [
    "רַכֶּבֶת",
    "רוֹבּוֹט",
    "רוֹפֵא",
    "רַעַשׁ",
    "רֵיחַ",
    "רוּחַ",
    "רֶקֶפֶת",
    "רִמּוֹן",
    "רֶגֶל",
    "רַמְקוֹל",
    "רַמְזוֹר"
  ],
  "ש": [
    "שֶׁמֶשׁ",
    "שֻׁלְחָן",
    "שׁוֹקוֹ",
    "שַׁבָּת",
    "שׁוּק",
    "שׁוּעָל",
    "שֵׁן",
    "שֶׁלֶט",
    "שׁוֹקוֹלָד",
    "שַׁקִּית",
    "שֵׁעָר",
    "שָׁדֶה",
    "שׁוֹפָר"
  ],
  "ת": [
    "תַּפּוּחַ",
    "תִּינוֹק",
    "תּוּת",
    "תְּמוּנָה",
    "תִּיק",
    "תַּרְנְגוֹל",
    "תִּקְרָה",
    "תַּפּוּז",
    "תַּבְלִין",
    "תַּלְמִיד",
    "תָּמָר"
  ]
};

const KEY_SETTINGS = "brawl_letters_settings_v5";

const SPECIAL_BRAWLERS = {
  "ס": { name:"ספידי", desc:"רץ מהר ויורה סוכריות", img:"assets/brawlers/speedy.svg" },
  "כ": { name:"כדורי", desc:"זורק כדורים זהובים", img:"assets/brawlers/kadori.svg" },
  "ר": { name:"רובו", desc:"לייזר מטורף!", img:"assets/brawlers/robo.svg" },
  "ט": { name:"טורנדו", desc:"מערבולת על-קולית", img:"assets/brawlers/tornado.svg" },
};

// v9: Player logos (original art)
const PLAYER_LOGOS = [
  { id: "logo1", name: "זיקו", img: "assets/logos/logo1.png" },
  { id: "logo2", name: "נובה", img: "assets/logos/logo2.png" },
  { id: "logo3", name: "בּוֹלט", img: "assets/logos/logo3.png" },
  { id: "logo4", name: "קְרִיסְטַל", img: "assets/logos/logo4.png" },
  { id: "logo5", name: "פִּיקְסֶל", img: "assets/logos/logo5.png" },
  { id: "logo6", name: "טוֹרְבּוֹ", img: "assets/logos/logo6.png" },
];

function getLogoById(id){
  return PLAYER_LOGOS.find(l => l.id === id) || PLAYER_LOGOS[0];
}


const els = {
  modalUnlock: document.getElementById("modalUnlock"),
  unlockGrid: document.getElementById("unlockGrid"),
  unlockStars: document.getElementById("unlockStars"),
  btnUnlockLater: document.getElementById("btnUnlockLater"),

  home: document.getElementById("screenHome"),
  select: document.getElementById("screenSelect"),
  fight: document.getElementById("screenFight"),

  btnParentToggle: document.getElementById("btnParentToggle"),
  lettersDialog: document.getElementById("lettersDialog"),
  btnCloseLetters: document.getElementById("btnCloseLetters"),

  btnSound: document.getElementById("btnSound"),
  btnSettings: document.getElementById("btnSettings"),
  btnLogo: document.getElementById("btnLogo"),
  btnReset: document.getElementById("btnReset"),
  logoModal: document.getElementById("logoModal"),
  logoModalBackdrop: document.getElementById("logoModalBackdrop"),
  btnCloseLogoModal: document.getElementById("btnCloseLogoModal"),

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

  bossPill: document.getElementById("bossPill"),
  currentBrawlerPill: document.getElementById("currentBrawlerPill"),
  coinsHud: document.getElementById("coinsHud"),
  starsRound: document.getElementById("starsRound"),
  wordMasked: document.getElementById("wordMasked"),
  btnReveal: document.getElementById("btnReveal"),
  btnRepeat: document.getElementById("btnRepeat"),
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
  giftStarAt1000: false,

  MIN_SELECTED_LETTERS: 3,

  unlockedLogos: [],
  logoLocked: true,
  lastUnlockAtStars: 0,

  debugEnabled: false,

  lettersMode: "all",
  selectedLetters: [...ALL_LETTERS],

  autospeak: true,
  rate: 0.95,

  coins: 0,
  starsTotal: 0,
  streak: 0,

  chosenLogoId: "logo1", // player logo

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
function pick(arr){
  if(!arr || !arr.length) return ALL_LETTERS[Math.floor(Math.random()*ALL_LETTERS.length)];
  return arr[Math.floor(Math.random()*arr.length)];
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
    chosenLogoId: state.chosenLogoId
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
    if(typeof s.chosenLogoId === "string") state.chosenLogoId = s.chosenLogoId;
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

  if(state.chosenLogoId){
    const l = getLogoById(state.chosenLogoId);
    els.currentBrawlerPill.innerHTML = `לוגו: ${l.name} <img class="logoMini" src="${l.img}" alt="לוגו">`;
  } else {
    els.currentBrawlerPill.textContent = "בחר לוגו";
  }
}

function show(screen){ [els.home, els.fight].forEach(s => { if(s) s.hidden=true; }); screen.hidden=false; }

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
  // v15: backward-compat — "brawler" cards should show the letter boss
  return bossForLetter(letter);
}



function buildLogos(){
  els.brawlers.innerHTML = "";
  PLAYER_LOGOS.forEach((logo) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "brawler";
    const selected = (state.chosenLogoId === logo.id);
    card.innerHTML = `
      <div class="bLeft">
        <div class="bAvatar"><img class="logoAvatar" src="${logo.img}" alt="${logo.name}"></div>
        <div class="bText">
          <div class="bName">${logo.name}</div>
          <div class="bDesc">הלוגו שלך</div>
        </div>
      </div>
      ${selected ? '<div class="bBadge">נבחר</div>' : '<div class="bBadge ghost">בחר</div>'}
    `;
    card.addEventListener("click", () => {
      state.chosenLogoId = logo.id;
      save();
      renderLogoButton();
      closeLogoModal();
      renderCurrent();
      // אם אנחנו בבית – מתחילים משחק
      if(!els.fight || els.fight.hidden) startNewQuestion();
    });
    els.brawlers.appendChild(card);
  });
}




function renderLogoButton(){
  if(!els.btnLogo) return;
  const logo = getLogoById(state.chosenLogoId);
  els.btnLogo.innerHTML = `<img id="btnLogoLogoImg" src="${logo.img}" alt="${logo.name}">`;
}
function openLogoModal(){
  if(!els.logoModal) return;
  buildLogos();
  els.logoModal.classList.remove("hidden");
}
function closeLogoModal(){
  if(!els.logoModal) return;
  els.logoModal.classList.add("hidden");
}

function openBrawlers(){ openLogoModal(); }

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
  const allowedLetters = (state.lettersMode === "custom" && Array.isArray(state.selectedLetters) && state.selectedLetters.length)
    ? state.selectedLetters.slice()
    : ALL_LETTERS.slice();

  // Try several times to get a real word (non-empty, 2+ chars)
  for(let tries=0; tries<80; tries++){
    const letter = pick(allowedLetters);
    const q = getQueue(letter).pop();
    const w = (q || "").trim();
    if(w && w.length >= 2 && w[0] === letter) return w;
    // If the queue is empty or word invalid, keep trying.
  }

  // Hard fallback: a generic kid-friendly word (should almost never happen)
  return "טלפון";
}

function buildChoices(correctLetter){
  const pool = ALL_LETTERS;

  if(!correctLetter){
    return shuffle([...pool]).slice(0,4);
  }

  const choices = new Set([correctLetter]);

  // Always include a "confusing" similar-sound letter when defined (raises difficulty)
  const confuse = CONFUSION_MAP[correctLetter];
  if(confuse) choices.add(confuse);

  let guard = 0;
  while(choices.size < 4 && guard < 600){
    choices.add(pick(pool));
    guard++;
  }

  const out = shuffle(Array.from(choices));
  if(out.length < 4){
    const add = shuffle(pool.filter(x => !out.includes(x)));
    while(out.length < 4 && add.length) out.push(add.shift());
  }
  return out.slice(0,4);
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
  if(!state.chosenLogoId) return openBrawlers();

  resetRoundUI();
  const w = pickWord();
  state.currentWord = w;
  state.currentFirstLetter = w[0];

  els.wordMasked.textContent = maskFirstLetter(w);

  
els.choices.innerHTML = "";
  els.choices.classList.add("arena");

  let letters = buildChoices(state.currentFirstLetter);
  if(!letters || !letters.length){
    // last-resort fallback: show 4 random letters so the UI never goes blank
    letters = shuffle([...ALL_LETTERS]).slice(0,4);
  }

  letters.forEach(letter => {
    const c = document.createElement("div");
    c.className = "choiceCard";
    let br;
    try{ br = brawlerForLetter(letter); }catch(e){ br = null; }
    if(!br) br = { name: `אות ${letter}`, img: "" };
    c.innerHTML = `
      <div class="choiceLeft">
        <div class="choiceAvatar">${br.img ? `<img src="${br.img}" alt="${br.name}">` : `<div class="noImg">${letter}</div>`}</div>
        <div>
          <div class="choiceName">${br.name}</div>
          <div class="choiceHint">שומר האות ${letter}</div>
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

function resetGame(){
  const ok = confirm("לאפס את המשחק ולהתחיל מהתחלה?");
  if(!ok) return;
  localStorage.removeItem(KEY_SETTINGS);
  // reset core
  state.lettersMode = "all";
  state.selectedLetters = [...ALL_LETTERS];
  state.coins = 0;
  state.starsTotal = 0;
  state.streak = 0;
  state.chosenLogoId = "logo1";
  state.used = {};
  state.currentWord = "";
  state.currentFirstLetter = "";
  state.revealed = false;
  state.locked = false;
  state.rewardClaimed = false;
  state.roundStars = 0;
  state.wrongAttemptsThisWord = 0;
  save();
  setUI();
  renderLogoButton();
  show(els.home);
}

function resetCoins(){ state.coins = 0; save(); setUI(); }

// Events
els.btnParentToggle.addEventListener("click", toggleLetters);
els.btnCloseLetters.addEventListener("click", closeLetters);
els.btnPickAll.addEventListener("click", pickerSelectAll);
els.btnPickNone.addEventListener("click", pickerSelectNone);
els.btnPresetNadav.addEventListener("click", pickerPresetNadav);
els.lettersDialog.addEventListener("cancel", (e) => { e.preventDefault(); closeLetters(); });

els.btnPlay.addEventListener("click", () => { window.__startGame && window.__startGame(); });
els.btnOpenBrawlers.addEventListener("click", openBrawlers);
els.btnChangeBrawler.addEventListener("click", openBrawlers);
els.btnTryAgain.addEventListener("click", tryAgain);

els.btnReveal.addEventListener("click", () => state.revealed ? hideFirstLetter() : revealFirstLetter());
els.btnStar.addEventListener("click", claimReward);

els.btnSound.addEventListener("click", () => { if(state.currentWord) speak(state.currentWord); });
els.btnSettings.addEventListener("click", openSettings);
if(els.btnLogo) els.btnLogo.addEventListener("click", openBrawlers);
if(els.btnReset) els.btnReset.addEventListener("click", resetGame);
if(els.btnCloseLogoModal) els.btnCloseLogoModal.addEventListener("click", closeLogoModal);
if(els.logoModalBackdrop) els.logoModalBackdrop.addEventListener("click", closeLogoModal);
els.btnSaveSettings.addEventListener("click", saveSettingsFromDialog);

els.btnKeepPlaying.addEventListener("click", () => els.winDialog.close());
els.btnResetCoins.addEventListener("click", () => { resetCoins(); els.winDialog.close(); });

// init
load(); setUI(); renderLogoButton(); show(els.home);


// v25: hard fallback start hook (works even if addEventListener wiring fails)
window.__startGame = function(){
  if(!validateLettersSelection()) return;
  try{
    showDebug("START via __startGame ✅");
    // emulate the normal play click
    if(typeof startNewQuestion === "function"){
      // ensure we are in fight screen
      try{ showScreen && showScreen("fight"); }catch(e){}
      try{ startNewQuestion(); }catch(e){ showDebug("startNewQuestion error: " + (e.message||e)); }
    }else{
      showDebug("startNewQuestion missing ❌");
    }
  }catch(e){
    showDebug("START error: " + (e.message||e));
  }
};

const LOGOS = Array.from({length:6},(_,i)=>({id:`logo${i+1}`, name:`לוגו ${i+1}`, img:`assets/logos/logo${i+1}.png`}));

function loadProgress(){
  try{
    const ul = JSON.parse(localStorage.getItem("unlockedLogos")||"[]");
    if(Array.isArray(ul) && ul.length) state.unlockedLogos = ul;
  }catch(e){}
  try{ state.lastUnlockAtStars = parseInt(localStorage.getItem("lastUnlockAtStars")||"0",10) || 0; }catch(e){}
  // if no unlocked yet, start with current logo (or default logo1)
  if(!state.unlockedLogos.length){
    const cur = state.selectedLogo || "logo1";
    state.unlockedLogos = [cur];
  }else{
    // ensure selected logo is in unlocked
    if(state.selectedLogo && !state.unlockedLogos.includes(state.selectedLogo)){
      state.selectedLogo = state.unlockedLogos[0];
    }
  }
  try{ localStorage.setItem("unlockedLogos", JSON.stringify(state.unlockedLogos)); }catch(e){}
}
function saveProgress(){
  try{ localStorage.setItem("unlockedLogos", JSON.stringify(state.unlockedLogos)); }catch(e){}
  try{ localStorage.setItem("lastUnlockAtStars", String(state.lastUnlockAtStars||0)); }catch(e){}
}

function availableNewLogos(){
  return LOGOS.filter(l => !state.unlockedLogos.includes(l.id));
}
function setSelectedLogo(id){
  state.selectedLogo = id;
  try{ localStorage.setItem("selectedLogo", id); }catch(e){}
  // update UI badge if function exists
  try{ renderSelectedLogo && renderSelectedLogo(); }catch(e){}
}
function showUnlockModal(stars){
  if(!els.modalUnlock || !els.unlockGrid) return;
  state.logoLocked = true; // lock switching normally
  els.unlockStars.textContent = String(stars);
  els.unlockGrid.innerHTML = "";
  const candidates = availableNewLogos();
  if(!candidates.length){
    // nothing to unlock
    els.modalUnlock.classList.add("hidden");
    return;
  }
  candidates.forEach(l => {
    const tile = document.createElement("div");
    tile.className = "logoTile";
    tile.innerHTML = `
      <img src="${l.img}" alt="${l.name}">
      <div class="logoName">${l.name}</div>
      <button class="btn primary" type="button">בחר</button>
    `;
    tile.querySelector("button").addEventListener("click", () => {
      state.unlockedLogos.push(l.id);
      setSelectedLogo(l.id);
      state.lastUnlockAtStars = stars;
      saveProgress();
      els.modalUnlock.classList.add("hidden");
    });
    els.unlockGrid.appendChild(tile);
  });
  els.modalUnlock.classList.remove("hidden");
}
if(els.btnUnlockLater){
  els.btnUnlockLater.addEventListener("click", () => {
    if(els.modalUnlock) els.modalUnlock.classList.add("hidden");
  });
}

function checkLogoUnlock(){
  const s = state.stars || 0;
  const milestone = Math.floor(s/100)*100;
  if(milestone >= 100 && milestone > (state.lastUnlockAtStars||0)){
    // only if there is something new to unlock
    if(availableNewLogos().length){
      showUnlockModal(milestone);
    }
  }
}

function validateLettersSelection(){
  if(state.lettersMode === "custom"){
    const n = (state.selectedLetters || []).length;
    if(n < state.MIN_SELECTED_LETTERS){
      alert(`בחר לפחות ${state.MIN_SELECTED_LETTERS} אותיות כדי להתחיל`);
      return false;
    }
  }
  return true;
}

function checkGiftStar(){
  if(state.coins >= 1000 && !state.giftStarAt1000){
    state.giftStarAt1000 = true;
    state.stars = (state.stars || 0) + 1; // gift star only
    try{ localStorage.setItem("giftStarAt1000","1"); }catch(e){}
  }
}


// ===== v66 Delegation core =====
function initDelegation(){
  const actions = {
    startGame: () => { try{ startGame(); }catch(e){} },
    openLetters: () => { try{ openLetters(); }catch(e){} },
    openLogo: () => { try{ openLogoModal ? openLogoModal() : (els.logoDialog && els.logoDialog.showModal && els.logoDialog.showModal()); }catch(e){} },
    openSettings: () => { try{ els.settingsDialog && els.settingsDialog.showModal(); }catch(e){} },
    saveSettings: () => { try{ save(); }catch(e){}; try{ els.settingsDialog && els.settingsDialog.close(); }catch(e){} },
    closeSettings: () => { try{ els.settingsDialog && els.settingsDialog.close(); }catch(e){} },
    repeatWord: () => { try{ if(state && state.currentWord && typeof speak==="function") speak(state.currentWord); }catch(e){} },
  };

  document.addEventListener("click", (e)=>{
    const btn = e.target.closest && e.target.closest("[data-action]");
    if(!btn) return;
    const act = btn.getAttribute("data-action");
    if(!act || !actions[act]) return;
    e.preventDefault();
    e.stopPropagation();
    try{ e.stopImmediatePropagation(); }catch(_){}
    actions[act]();
  }, true);
}
