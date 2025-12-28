// BRAWL LETTERS v4 – requested flow fixes
const ALL_LETTERS = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];
const WORDS = ["אָבָּא", "אִמָּא", "בַּיִת", "דָּג", "יָם", "גַּן", "סֵפֶר", "שֶׁמֶשׁ", "יָרֵחַ", "מַיִם", "אוֹר", "דֶּלֶת", "חַלּוֹן", "חָתוּל", "כֶּלֶב", "רַכֶּבֶת", "טֵלֵפוֹן", "טֵלֵוִיזְיָה", "סֻכָּר", "כַּדּוּר", "כּוֹבָע", "כַּפִּית", "רַקֶּפֶת", "רוֹפֵא", "טוֹסְט", "טִיל", "סוּס", "סִירָה", "קֶשֶׁת", "קֻפְסָה", "פֶּרַח", "פָּנָס", "שׁוֹקוֹ", "שֻׁלְחָן", "מְכוֹנִית", "מַפְתֵּחַ", "נָמֵר", "נַעַל", "תַּפּוּחַ", "צִפּוֹר", "עֲנָנָה", "פַּרְפַּר"];
const KEY_SETTINGS = "brawl_letters_settings_v4";

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

  chosenBrawlerLetter: null,

  currentWord: "",
  currentFirstLetter: "",
  revealed: false,
  locked: false,
  rewardClaimed: false,
  roundStars: 0,
  wrongAttemptsThisWord: 0,
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
    streak: state.streak
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
    els.currentBrawlerPill.textContent = `בראולר: ${b.name} (${state.chosenBrawlerLetter})`;
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

function pickerSelectAll(){ state.lettersMode="all"; state.selectedLetters=[...ALL_LETTERS]; buildPicker(); }
function pickerSelectNone(){ state.lettersMode="custom"; state.selectedLetters=[]; buildPicker(); }
function pickerPresetNadav(){ state.lettersMode="custom"; state.selectedLetters=["ס","כ","ר","ט"]; buildPicker(); }

// Brawlers
function brawlerForLetter(letter){
  if(SPECIAL_BRAWLERS[letter]) return SPECIAL_BRAWLERS[letter];
  return { name: `בוט-${letter}`, desc: `שומר על האות ${letter}`, img: `assets/brawlers/letter-${letter}.svg` };
}

function buildBrawlers(){
  els.brawlers.innerHTML = "";
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
          <div class="bDesc">${b.desc}</div>
        </div>
      </div>
      <div class="bRight">${letter}</div>
    `;
    card.addEventListener("click", () => chooseBrawler(letter));
    els.brawlers.appendChild(card);
  });

  els.modePill.textContent = (state.lettersMode === "custom") ? "פוקוס" : "רנדומלי";
  els.selectHint.textContent = (state.lettersMode === "custom")
    ? `פוקוס על: ${state.selectedLetters.join(" ")}`
    : "רנדומלי מלא: א–ת (4 בראולרים בכל סיבוב)";
}

function openBrawlers(){ buildBrawlers(); show(els.select); }

function chooseBrawler(letter){
  state.chosenBrawlerLetter = letter;
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

// Question selection
function pickWord(){
  const allowed = (state.lettersMode === "custom") ? new Set(state.selectedLetters) : new Set(ALL_LETTERS);
  let pool = WORDS.filter(w => allowed.has(w[0]));
  if(state.chosenBrawlerLetter){
    const pool2 = pool.filter(w => w[0] === state.chosenBrawlerLetter);
    if(pool2.length) pool = pool2;
  }
  return pool.length ? pick(pool) : pick(WORDS);
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
  buildChoices(state.currentFirstLetter).forEach(letter => {
    const b = document.createElement("button");
    b.type="button";
    b.className="choiceBtn";
    b.textContent=letter;
    b.addEventListener("click", () => answer(letter, b));
    els.choices.appendChild(b);
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
    els.feedback.textContent = "💥 נכון! קיבלת כוכב — לחץ עליו לקבל מטבעות 🪙";
    if(state.autospeak) speak(state.currentWord);

    state.locked = true;
    Array.from(els.choices.querySelectorAll("button")).forEach(b => b.disabled=true);

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

    // ensure star is not available
    els.reward.hidden = true;
    els.btnStar.disabled = true;

    setUI(); save();
  }
}

function randomCoinsBase(){ return 20 + randInt(161); } // 20..180

function claimReward(){
  if(state.rewardClaimed) return;
  if(!state.locked) return; // only after correct
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
  Array.from(els.choices.querySelectorAll("button")).forEach(b => b.classList.remove("wrong"));
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
