// Simple Hebrew letters & words game (no build tools needed)
const LETTERS = [
  "א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת"
];

// A small starter word list. You can expand it later.
const WORDS = [
  { w: "אבא", hint: "משפחה" },
  { w: "אמא", hint: "משפחה" },
  { w: "בית", hint: "מקום" },
  { w: "דג", hint: "חיה" },
  { w: "ים", hint: "טבע" },
  { w: "כדור", hint: "משחק" },
  { w: "גן", hint: "מקום" },
  { w: "ספר", hint: "קריאה" },
  { w: "שמש", hint: "טבע" },
  { w: "ירח", hint: "טבע" },
  { w: "מים", hint: "שתייה" },
  { w: "אור", hint: "טבע" },
  { w: "דלת", hint: "בית" },
  { w: "חלון", hint: "בית" },
  { w: "חתול", hint: "חיה" },
  { w: "כלב", hint: "חיה" }
];

const els = {
  target: document.getElementById("target"),
  prompt: document.getElementById("prompt"),
  answers: document.getElementById("answers"),
  feedback: document.getElementById("feedback"),
  score: document.getElementById("score"),
  correct: document.getElementById("correct"),
  wrong: document.getElementById("wrong"),
  streak: document.getElementById("streak"),
  modePill: document.getElementById("modePill"),
  btnSpeak: document.getElementById("btnSpeak"),
  btnShuffle: document.getElementById("btnShuffle"),
  btnSettings: document.getElementById("btnSettings"),
  dialog: document.getElementById("settingsDialog"),
  modeSelect: document.getElementById("modeSelect"),
  difficultySelect: document.getElementById("difficultySelect"),
  autospeakSelect: document.getElementById("autospeakSelect"),
  rateInput: document.getElementById("rateInput"),
  btnSave: document.getElementById("btnSave"),
};

const state = {
  mode: "letters",        // letters | words | mixed
  difficulty: "normal",   // easy | normal | hard
  autospeak: true,
  rate: 0.95,
  score: 0,
  correct: 0,
  wrong: 0,
  streak: 0,
  current: null,          // {type, value, hint}
  locked: false
};

// Persist settings
const LS_KEY = "alefbet_game_settings_v1";
function loadSettings(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(!raw) return;
    const s = JSON.parse(raw);
    if(s.mode) state.mode = s.mode;
    if(s.difficulty) state.difficulty = s.difficulty;
    if(typeof s.autospeak === "boolean") state.autospeak = s.autospeak;
    if(typeof s.rate === "number") state.rate = s.rate;
  }catch(_){}
}
function saveSettings(){
  localStorage.setItem(LS_KEY, JSON.stringify({
    mode: state.mode,
    difficulty: state.difficulty,
    autospeak: state.autospeak,
    rate: state.rate
  }));
}

function setUIFromState(){
  els.modeSelect.value = state.mode;
  els.difficultySelect.value = state.difficulty;
  els.autospeakSelect.value = state.autospeak ? "on" : "off";
  els.rateInput.value = String(state.rate);

  els.score.textContent = `ניקוד: ${state.score}`;
  els.correct.textContent = String(state.correct);
  els.wrong.textContent = String(state.wrong);
  els.streak.textContent = String(state.streak);

  const modeLabel = state.mode === "letters" ? "אות" : state.mode === "words" ? "מילה" : "מעורב";
  els.modePill.textContent = `מצב: ${modeLabel}`;
}

function randInt(n){ return Math.floor(Math.random() * n); }
function pick(arr){ return arr[randInt(arr.length)]; }
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = randInt(i+1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function numOptions(){
  if(state.difficulty === "easy") return 2;
  if(state.difficulty === "hard") return 4;
  return 3;
}

function chooseItem(){
  let type = state.mode;
  if(type === "mixed"){
    type = Math.random() < 0.5 ? "letters" : "words";
  }
  if(type === "letters"){
    const value = pick(LETTERS);
    return { type: "letter", value, hint: "בחר את האות הנכונה" };
  }else{
    const item = pick(WORDS);
    return { type: "word", value: item.w, hint: `בחר את המילה הנכונה (${item.hint})` };
  }
}

function speakHebrew(text){
  // Works if the device has a Hebrew voice. If not, it may fall back or do nothing.
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "he-IL";
    u.rate = state.rate;
    // Prefer Hebrew voice if available
    const voices = window.speechSynthesis.getVoices?.() || [];
    const heVoice = voices.find(v => (v.lang || "").toLowerCase().startsWith("he"));
    if(heVoice) u.voice = heVoice;
    window.speechSynthesis.speak(u);
  }catch(_){}
}

function renderQuestion(){
  state.locked = false;
  els.feedback.textContent = "";
  els.answers.innerHTML = "";

  const q = chooseItem();
  state.current = q;

  els.prompt.textContent = q.hint;
  els.target.textContent = q.value;

  const optionsCount = numOptions();
  let options = [q.value];

  if(q.type === "letter"){
    while(options.length < optionsCount){
      const cand = pick(LETTERS);
      if(!options.includes(cand)) options.push(cand);
    }
  }else{
    while(options.length < optionsCount){
      const cand = pick(WORDS).w;
      if(!options.includes(cand)) options.push(cand);
    }
  }

  options = shuffle(options);

  options.forEach(opt => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "answerBtn";
    b.textContent = opt;

    // tiny hint under words (first letter)
    if(q.type === "word"){
      const sm = document.createElement("small");
      sm.textContent = `אות ראשונה: ${opt[0]}`;
      b.appendChild(sm);
    }

    b.addEventListener("click", () => onAnswer(b, opt));
    els.answers.appendChild(b);
  });

  setUIFromState();
  if(state.autospeak){
    setTimeout(() => speakHebrew(q.value), 120);
  }
}

function onAnswer(btn, opt){
  if(state.locked) return;
  state.locked = true;

  const correct = opt === state.current.value;
  const buttons = Array.from(els.answers.querySelectorAll("button"));

  if(correct){
    btn.classList.add("correct");
    state.correct += 1;
    state.streak += 1;
    state.score += (10 + Math.min(10, state.streak)); // small streak bonus
    els.feedback.textContent = "✅ נכון!";
    speakHebrew(state.current.value);
  }else{
    btn.classList.add("wrong");
    state.wrong += 1;
    state.streak = 0;
    state.score = Math.max(0, state.score - 2);
    els.feedback.textContent = `❌ לא. התשובה הנכונה: ${state.current.value}`;
    // highlight correct
    const ok = buttons.find(b => b.firstChild && b.firstChild.nodeType === Node.TEXT_NODE
      ? b.firstChild.textContent === state.current.value
      : b.textContent.trim().startsWith(state.current.value));
    if(ok) ok.classList.add("correct");
    speakHebrew(state.current.value);
  }

  setUIFromState();
  // Next question
  setTimeout(renderQuestion, 900);
}

function openSettings(){
  els.dialog.showModal();
}
function applySettingsFromUI(){
  state.mode = els.modeSelect.value;
  state.difficulty = els.difficultySelect.value;
  state.autospeak = els.autospeakSelect.value === "on";
  state.rate = parseFloat(els.rateInput.value || "0.95");
  saveSettings();
  setUIFromState();
}

els.btnShuffle.addEventListener("click", renderQuestion);
els.btnSpeak.addEventListener("click", () => {
  if(state.current) speakHebrew(state.current.value);
});
els.btnSettings.addEventListener("click", openSettings);
els.btnSave.addEventListener("click", () => {
  applySettingsFromUI();
  els.dialog.close();
});

loadSettings();
setUIFromState();
// Start with a question right away
renderQuestion();
