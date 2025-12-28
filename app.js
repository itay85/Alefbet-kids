// BRAWL LETTERS – focus letters selection (default: all letters)
const ALL_LETTERS = ["א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת"];

const WORDS = [
  "אבא","אמא","בית","דג","ים","גן","ספר","שמש","ירח","מים","אור","דלת","חלון","חתול","כלב",
  "רכבת","טלוויזיה","טלפון","סוכר","כדור","כובע","כפית","רקפת","רופא","טוסט","טיל","סוס","סירה"
];

const BRAWLERS = [
  { name:"ספידי-ס ⚡", desc:"רץ מהר ויורה סוכריות", avatar:"⚡" },
  { name:"קפטן-כ 🛡", desc:"מגן ענק בצורת כ", avatar:"🛡" },
  { name:"רובו-ר 🤖", desc:"לייזר רכבת", avatar:"🤖" },
  { name:"טורנדו-ט 🌪", desc:"סיבוב טורבו", avatar:"🌪" },
];

const KEY_SETTINGS = "brawl_letters_settings_v1";

const els = {
  home: document.getElementById("screenHome"),
  picker: document.getElementById("screenPicker"),
  select: document.getElementById("screenSelect"),
  fight: document.getElementById("screenFight"),

  btnSound: document.getElementById("btnSound"),
  btnSettings: document.getElementById("btnSettings"),

  btnPlay: document.getElementById("btnPlay"),
  btnParent: document.getElementById("btnParent"),
  homeLettersHint: document.getElementById("homeLettersHint"),
  starsTotal: document.getElementById("starsTotal"),
  streak: document.getElementById("streak"),

  lettersGrid: document.getElementById("lettersGrid"),
  btnPickAll: document.getElementById("btnPickAll"),
  btnPickNone: document.getElementById("btnPickNone"),
  btnPresetNadav: document.getElementById("btnPresetNadav"),
  pickedCount: document.getElementById("pickedCount"),
  btnPickerContinue: document.getElementById("btnPickerContinue"),

  brawlers: document.getElementById("brawlers"),
  selectHint: document.getElementById("selectHint"),
  modePill: document.getElementById("modePill"),

  starsRound: document.getElementById("starsRound"),
  prompt: document.getElementById("prompt"),
  word: document.getElementById("word"),
  choices: document.getElementById("choices"),
  feedback: document.getElementById("feedback"),
  btnNext: document.getElementById("btnNext"),
  btnHome: document.getElementById("btnHome"),

  dialog: document.getElementById("settingsDialog"),
  autospeakSelect: document.getElementById("autospeakSelect"),
  rateInput: document.getElementById("rateInput"),
  persistSelect: document.getElementById("persistSelect"),
  btnSaveSettings: document.getElementById("btnSaveSettings"),
};

const state = {
  lettersMode: "all",            // 'all' | 'custom'
  selectedLetters: [...ALL_LETTERS],
  persist: "local",              // 'local' | 'session'
  autospeak: true,
  rate: 0.95,

  starsTotal: 0,
  streak: 0,

  roundStars: 0,
  currentWord: "",
  currentFirstLetter: "",
  locked: false
};

function randInt(n){ return Math.floor(Math.random() * n); }
function pick(arr){ return arr[randInt(arr.length)]; }
function shuffle(a){
  const arr = a.slice();
  for(let i=arr.length-1;i>0;i--){
    const j = randInt(i+1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function speak(text){
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "he-IL";
    u.rate = state.rate;
    const voices = window.speechSynthesis.getVoices?.() || [];
    const heVoice = voices.find(v => (v.lang || "").toLowerCase().startsWith("he"));
    if(heVoice) u.voice = heVoice;
    window.speechSynthesis.speak(u);
  }catch(_){}
}

function loadSettings(){
  try{
    const raw = localStorage.getItem(KEY_SETTINGS);
    if(!raw) return;
    const s = JSON.parse(raw);

    if(s.persist === "session" || s.persist === "local") state.persist = s.persist;
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

    if(typeof s.starsTotal === "number") state.starsTotal = s.starsTotal;
    if(typeof s.streak === "number") state.streak = s.streak;
  }catch(_){}
}

function saveSettings(){
  localStorage.setItem(KEY_SETTINGS, JSON.stringify({
    lettersMode: state.lettersMode,
    selectedLetters: state.lettersMode === "custom" ? state.selectedLetters : [],
    persist: state.persist,
    autospeak: state.autospeak,
    rate: state.rate,
    starsTotal: state.starsTotal,
    streak: state.streak
  }));
}

function setUI(){
  els.starsTotal.textContent = String(state.starsTotal);
  els.streak.textContent = String(state.streak);

  els.autospeakSelect.value = state.autospeak ? "on" : "off";
  els.rateInput.value = String(state.rate);
  els.persistSelect.value = state.persist;

  if(state.lettersMode === "all"){
    els.homeLettersHint.textContent = "מצב אותיות: כל האותיות (א–ת)";
  }else{
    els.homeLettersHint.textContent = `מצב אותיות: פוקוס על (${state.selectedLetters.join(" ")})`;
  }
}

function show(screen){
  [els.home, els.picker, els.select, els.fight].forEach(s => s.hidden = true);
  screen.hidden = false;
}

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

  if(state.lettersMode === "all"){
    state.selectedLetters = [...ALL_LETTERS];
  }
  updatePickedCount();
}

function updatePickedCount(){
  if(state.selectedLetters.length === 0){
    els.pickedCount.textContent = "בחר לפחות אות אחת";
  }else{
    els.pickedCount.textContent = `נבחרו: ${state.selectedLetters.length} אותיות`;
  }
}

function pickerSelectAll(){
  state.lettersMode = "all";
  state.selectedLetters = [...ALL_LETTERS];
  buildPicker();
}
function pickerSelectNone(){
  state.lettersMode = "custom";
  state.selectedLetters = [];
  buildPicker();
}
function pickerPresetNadav(){
  state.lettersMode = "custom";
  state.selectedLetters = ["ס","כ","ר","ט"];
  buildPicker();
}

function openPicker(){
  buildPicker();
  show(els.picker);
}

function pickerContinue(){
  if(state.selectedLetters.length === 0){
    updatePickedCount();
    return;
  }
  // If picked all => treat as all
  const set = new Set(state.selectedLetters);
  state.lettersMode = (set.size === ALL_LETTERS.length) ? "all" : "custom";
  if(state.lettersMode === "all") state.selectedLetters = [...ALL_LETTERS];

  saveSettings();
  setUI();
  show(els.home);
}

function buildBrawlers(){
  els.brawlers.innerHTML = "";

  // Letters shown as brawlers:
  // - all: 4 random letters each round
  // - custom: 4 random from selected (or all of them if <4)
  let pool = (state.lettersMode === "custom") ? state.selectedLetters.slice() : ALL_LETTERS.slice();
  if(pool.length === 0) pool = ALL_LETTERS.slice();

  let letters = shuffle(pool).slice(0, Math.min(4, pool.length));
  // If fewer than 4 letters (custom small), pad with same pool (still unique if possible)
  if(letters.length < 4){
    const extraPool = pool.filter(x => !letters.includes(x));
    while(letters.length < 4 && extraPool.length){
      letters.push(extraPool.shift());
    }
  }

  const skins = shuffle(BRAWLERS);

  letters.forEach((letter, i) => {
    const skin = skins[i % skins.length];
    const card = document.createElement("div");
    card.className = "brawler";
    card.innerHTML = `
      <div class="bLeft">
        <div class="bAvatar">${skin.avatar}</div>
        <div class="bText">
          <div class="bName">${skin.name}</div>
          <div class="bDesc">${skin.desc}</div>
        </div>
      </div>
      <div class="bRight">${letter}</div>
    `;
    card.addEventListener("click", () => startFight(letter));
    els.brawlers.appendChild(card);
  });

  els.modePill.textContent = (state.lettersMode === "custom") ? "פוקוס" : "רנדומלי";
  els.selectHint.textContent = (state.lettersMode === "custom")
    ? `פוקוס על: ${state.selectedLetters.join(" ")}`
    : "רנדומלי מלא: א–ת (4 בראולרים בכל סיבוב)";
}

function openSelect(){
  buildBrawlers();
  show(els.select);
}

function pickWord(){
  const allowed = new Set(state.selectedLetters);
  const pool = WORDS.filter(w => allowed.has(w[0]));
  return pool.length ? pick(pool) : pick(WORDS);
}

function buildChoices(correctLetter){
  const basePool = (state.lettersMode === "custom" ? state.selectedLetters : ALL_LETTERS);
  const choices = new Set([correctLetter]);
  while(choices.size < 4){
    choices.add(pick(basePool));
  }
  return shuffle(Array.from(choices));
}

function startFight(chosenLetter){
  state.locked = false;
  state.roundStars = 0;
  els.starsRound.textContent = "0";
  els.feedback.textContent = "";

  const w = pickWord();
  state.currentWord = w;
  state.currentFirstLetter = w[0];

  els.prompt.textContent = "איזו אות שומעים בתחילת המילה?";
  els.word.textContent = w;

  const letters = buildChoices(state.currentFirstLetter);
  els.choices.innerHTML = "";
  letters.forEach(letter => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "choiceBtn";
    b.textContent = letter;
    b.addEventListener("click", () => answer(letter, b));
    els.choices.appendChild(b);
  });

  show(els.fight);

  if(state.autospeak){
    setTimeout(() => speak(w), 120);
  }
}

function answer(letter, btn){
  if(state.locked) return;

  if(letter === state.currentFirstLetter){
    btn.classList.add("correct");
    state.roundStars += 1;
    state.starsTotal += 1;
    state.streak += 1;
    els.starsRound.textContent = String(state.roundStars);

    els.feedback.textContent = (state.roundStars >= 3)
      ? "⭐⭐⭐ סופר פאוור! אתה אלוף!"
      : "💥 בום! פגיעה! ניצחת את הבוס!";

    if(state.autospeak) speak(state.currentWord);

    // lock this round after correct
    state.locked = true;
    Array.from(els.choices.querySelectorAll("button")).forEach(b => b.disabled = true);

    setUI();
    saveSettings();
  }else{
    btn.classList.add("wrong");
    state.streak = 0;
    els.feedback.textContent = "😅 הבוס התחמק — ננסה שוב!";
    if(state.autospeak) speak(state.currentWord);
    setUI();
    saveSettings();
  }
}

function openSettings(){
  els.dialog.showModal();
}
function saveSettingsFromDialog(){
  state.autospeak = els.autospeakSelect.value === "on";
  state.rate = parseFloat(els.rateInput.value || "0.95");
  state.persist = els.persistSelect.value === "session" ? "session" : "local";
  saveSettings();
  setUI();
  els.dialog.close();
}

// events
els.btnPlay.addEventListener("click", openSelect);
els.btnParent.addEventListener("click", openPicker);

els.btnPickAll.addEventListener("click", pickerSelectAll);
els.btnPickNone.addEventListener("click", pickerSelectNone);
els.btnPresetNadav.addEventListener("click", pickerPresetNadav);
els.btnPickerContinue.addEventListener("click", pickerContinue);

els.btnNext.addEventListener("click", openSelect);
els.btnHome.addEventListener("click", () => show(els.home));

els.btnSound.addEventListener("click", () => { if(state.currentWord) speak(state.currentWord); });
els.btnSettings.addEventListener("click", openSettings);
els.btnSaveSettings.addEventListener("click", saveSettingsFromDialog);

// init
loadSettings();
setUI();
show(els.home);
