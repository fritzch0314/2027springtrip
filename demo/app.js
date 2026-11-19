/* 資料已移至 data/trip-data.js、data/places.js */

const PHRASES = [
  // 🚪 候位入座
  {cat:'seat', id:'party', zh:'我們共 6 位（大人 4 位、小孩 2 位），請問可以安排座位嗎？', ja:'全部で6名です（大人4名、子ども2名）。座れますか？', ro:'Zenbu de 6-mei desu (otona 4-mei, kodomo 2-mei). Suwaremasu ka?'},
  {cat:'seat', zh:'請問大約需要等多久？', ja:'どのくらい待ちますか？', ro:'Dono kurai machimasu ka?'},
  {cat:'seat', zh:'我們有預約，這是預約畫面', ja:'予約しています。こちらが予約画面です。', ro:'Yoyaku shite imasu. Kochira ga yoyaku gamen desu.'},
  {cat:'seat', id:'together', zh:'我們有 6 位，請問可以安排相鄰座位或併桌嗎？', ja:'6名なのですが、近くの席かテーブルをくっつけることはできますか？', ro:'6-mei nano desu ga, chikaku no seki ka teeburu wo kuttsukeru koto wa dekimasu ka?'},
  // 📋 點餐客製
  {cat:'order', zh:'請問有繁體中文或英文菜單嗎？', ja:'中国語（繁体字）か英語のメニューはありますか？', ro:'Chuugokugo (hantaiji) ka Eigo no menyuu wa arimasu ka?'},
  {cat:'order', zh:'我要點這個（指著菜單／圖片）', ja:'これをお願いします。', ro:'Kore wo onegaishimasu.'},
  {cat:'order', zh:'請問有推薦的招牌菜嗎？', ja:'おすすめはどれですか？', ro:'Osusume wa dore desu ka?'},
  {cat:'order', zh:'這道給小朋友吃的，請不要加辣／不要芥末', ja:'子ども用なので、辛くしないでください（わさび抜きでお願いします）。', ro:'Kodomo-you nanode, karaku shinaide kudasai (wasabi nuki de onegaishimasu).'},
  {cat:'order', zh:'請給我們分食小盤與兒童餐具（叉子／湯匙）', ja:'取り皿と子ども用の食器（フォーク・スプーン）をお願いします。', ro:'Torizara to kodomo-you no shokki (fooku / supuun) wo onegaishimasu.'},
  // 🍜 用餐中
  {cat:'dining', zh:'不好意思，請給我們開水（或熱茶）', ja:'すみません、お水（お茶）をいただけますか？', ro:'Sumimasen, omizu (ocha) wo itadakemasu ka?'},
  {cat:'dining', zh:'不好意思，我們想再加點', ja:'すみません、追加注文をお願いします。', ro:'Sumimasen, tsuika chuumon wo onegaishimasu.'},
  {cat:'dining', zh:'請問洗手間在哪裡？', ja:'お手洗いはどこですか？', ro:'Otearai wa doko desu ka?'},
  {cat:'dining', zh:'不好意思打翻了，可以請給我們紙巾或抹布嗎？', ja:'すみません、こぼしてしまいました。ペーパーか布巾をいただけますか？', ro:'Sumimasen, koboshite shimaimashita. Peepaa ka fukin wo itadakemasu ka?'},
  // 💳 結帳離開
  {cat:'pay', zh:'請幫我們結帳（全部一起結）', ja:'お会計をお願いします（一緒で）。', ro:'Okaikei wo onegaishimasu (issho de).'},
  {cat:'pay', zh:'請問可以刷信用卡或交通卡（Suica）嗎？', ja:'クレジットカードかSuicaは使えますか？', ro:'Kurejitto kaado ka Suica wa tsukaemasu ka?'},
  {cat:'pay', zh:'不好意思，請問這個可以打包外帶嗎？', ja:'すみません、これは持ち帰りできますか？', ro:'Sumimasen, kore wa mochikaeri dekimasu ka?'},
  {cat:'pay', zh:'非常好吃，謝謝款待！', ja:'とても美味しかったです。ごちそうさまでした！', ro:'Totemo oishikatta desu. Gochisousama deshita!'}
];

const HOTEL_PHRASES = [
  {zh:'我們要辦理入住／寄放行李，共 6 位（大人 4 位、小學生 2 位）', ja:'チェックイン（または荷物預け）をお願いします。大人4名、小学生2名です。', ro:'Chekku-in (mata wa nimotsu azuke) wo onegaishimasu. Otona 4-mei, shougakusei 2-mei desu.'},
  {zh:'我想寄放今天入住的行李，並把這件大行李用宅急便寄到河口湖的飯店（指定 2/5 送達）', ja:'本日宿泊の荷物を預けて、こちらの荷物を宅急便で河口湖のホテルへ送りたいです（2月5日着希望）。', ro:'Honjitsu shukuhaku no nimotsu wo azukete, kochira no nimotsu wo takkyuubin de Kawaguchiko no hoteru e okuritai desu (2-gatsu 5-ka chaku kibou).'},
  {zh:'請問明後兩晚的「河口湖冬花火」飯店有免費接駁車可以預約嗎？', ja:'明日と明後日の「河口湖冬花火」について、ホテルの無料送迎バスの予約はありますか？', ro:'Ashita to asatte no Kawaguchiko Fuyu Hanabi ni tsuite, hoteru no muryou sougei basu no yoyaku wa arimasu ka?'},
  {zh:'請幫我們叫計程車到星野榆樹街小鎮（ハルニレテラス）', ja:'ハルニレテラスまでタクシーを呼んでいただけますか？', ro:'Harunire Terasu made takushii wo yonde itadakemasu ka?'},
  {zh:'不好意思，可以多給我們毛巾／枕頭嗎？', ja:'すみません、タオル（枕）を追加でいただけますか？', ro:'Sumimasen, taoru (makura) wo tsuika de itadakemasu ka?'},
  {zh:'請問早餐時間與退房時間是幾點？', ja:'朝食の時間とチェックアウトは何時ですか？', ro:'Choushoku no jikan to chekku-auto wa nanji desu ka?'},
  {zh:'我們要退房，退房後可以先寄放行李嗎？', ja:'チェックアウトをお願いします。荷物を預かっていただけますか？', ro:'Chekku-auto wo onegaishimasu. Nimotsu wo azukatte itadakemasu ka?'}
];

const GAS_PHRASES = [
  {zh:'請加滿普通汽油（Regular）', ja:'レギュラー満タンでお願いします。', ro:'Regyuraa mantan de onegaishimasu.'},
  {zh:'還車確認用，請給我加油收據', ja:'レンタカー返却用なので、領収書をお願いします。', ro:'Rentakaa henkyaku-you nanode, ryoushuusho wo onegaishimasu.'}
];

const TRANSIT_PHRASES = [
  {zh:'請問這班車（電車／巴士）有到這裡嗎？（指地點）', ja:'この電車（バス）はここに行きますか？', ro:'Kono densha (basu) wa koko ni ikimasu ka?'},
  {zh:'請問這個月台／巴士站牌怎麼走？', ja:'このホーム（バス乗り場）はどこですか？', ro:'Kono hoomu (basu noriba) wa doko desu ka?'},
  {zh:'不好意思，Suica 刷不過／進出站異常，請幫我處理', ja:'すみません、Suicaがエラーになりました。確認していただけますか？', ro:'Sumimasen, Suica ga eraa ni narimashita. Kakunin shite itadakemasu ka?'},
  {zh:'請問大型投幣置物櫃（Coin Locker）在哪裡？', ja:'大きいコインロッカーはどこですか？', ro:'Ookii koin rokkaa wa doko desu ka?'},
  {zh:'請問這張對號車票的車廂與座位在哪邊？', ja:'この指定席の号車と座席はどこですか？', ro:'Kono shiteiseki no gousha to zaseki wa doko desu ka?'},
  {zh:'請問下一班車是幾點？', ja:'次の電車（バス）は何時ですか？', ro:'Tsugi no densha (basu) wa nanji desu ka?'}
];

const DRIVE_PHRASES = [
  ...GAS_PHRASES,
  {zh:'我有預約租車，這是護照、駕照與日文譯本', ja:'レンタカーを予約しています。パスポートと免許証・翻訳文です。', ro:'Rentakaa wo yoyaku shite imasu. Pasupooto to menkyoshou / honyakubun desu.'},
  {zh:'請確認這台車已配備雪胎（スタッドレス）與 ETC 卡', ja:'スタッドレスタイヤとETCカードが付いていますか？', ro:'Sutaddoresu taiya to ETC kaado ga tsuite imasu ka?'},
  {zh:'請問這台車是加普通汽油（Regular）嗎？油箱蓋怎麼開？', ja:'燃料はレギュラーですか？給油口の開け方を教えてください。', ro:'Nenryou wa regyuraa desu ka? Kyuuyukou no akekata wo oshiete kudasai.'},
  {zh:'不好意思，停車場繳費機不會操作，可以幫忙嗎？', ja:'すみません、駐車場の精算機の使い方が分かりません。手伝っていただけますか？', ro:'Sumimasen, chuushajou no seisanki no tsukaikata ga wakarimasen. Tetsudatte itadakemasu ka?'}
];

const SHOP_PHRASES = [
  {zh:'請問這裡可以辦理免稅（Tax-Free）嗎？', ja:'免税（タックスフリー）はできますか？', ro:'Menzei (Takkusu Furii) wa dekimasu ka?'},
  {zh:'請問這個有其他尺寸或顏色嗎？', ja:'これの別のサイズや色はありますか？', ro:'Kore no betsu no saizu ya iro wa arimasu ka?'},
  {zh:'請問這件可以試穿嗎？', ja:'これを試着してもいいですか？', ro:'Kore wo shichaku shitemo ii desu ka?'},
  {zh:'請給我一個購物袋（需要加購也沒關係）', ja:'袋をお願いします（有料でも大丈夫です）。', ro:'Fukuro wo onegaishimasu (yuuryou demo daijoubu desu).'},
  {zh:'請問這幾個可以幫我分開包裝嗎？', ja:'別々に包んでいただけますか？', ro:'Betsubetsu ni tsutsunde itadakemasu ka?'},
  {zh:'請問這個含稅是多少錢？', ja:'これは税込でいくらですか？', ro:'Kore wa zeikomi de ikura desu ka?'}
];

const HELP_PHRASES = [
  {zh:'小朋友（11歲／9歲）發燒或感冒，請問推薦哪款兒童常備藥？', ja:'子ども（11歳／9歳）が熱・風邪っぽいです。おすすめの子ども用の薬はありますか？', ro:'Kodomo (11-sai / 9-sai) ga netsu / kazeppoi desu. Osusume no kodomo-you no kusuri wa arimasu ka?'},
  {zh:'小朋友肚子不舒服，請問有兒童腸胃藥嗎？', ja:'子どもがお腹の調子が悪いです。子ども用の胃腸薬はありますか？', ro:'Kodomo ga onaka no choushi ga warui desu. Kodomo-you no ichouyaku wa arimasu ka?'},
  {zh:'不好意思，我們有東西遺失了（手機／外套／手套）', ja:'すみません、忘れ物をしてしまいました（スマホ／上着／手袋）。', ro:'Sumimasen, wasuremono wo shite shimaimashita (sumaho / uwagi / tebukuro).'},
  {zh:'不好意思，可以麻煩您幫我們拍一張全家福合照嗎？', ja:'すみません、家族写真を撮っていただけますか？', ro:'Sumimasen, kazoku shashin wo totte itadakemasu ka?'},
  {zh:'請問這裡可以拍照嗎？', ja:'ここで写真を撮ってもいいですか？', ro:'Koko de shashin wo tottemo ii desu ka?'}
];

const ALL_PHRASES = [
  ...PHRASES.map(p => ({...p, scene:'food', sceneLabel:'🍽️ 餐廳'})),
  ...HOTEL_PHRASES.map(p => ({...p, scene:'hotel', sceneLabel:'🏨 飯店'})),
  ...TRANSIT_PHRASES.map(p => ({...p, scene:'transit', sceneLabel:'🚆 交通'})),
  ...DRIVE_PHRASES.map(p => ({...p, scene:'drive', sceneLabel:'🚗 自駕'})),
  ...SHOP_PHRASES.map(p => ({...p, scene:'shop', sceneLabel:'🛍️ 購物'})),
  ...HELP_PHRASES.map(p => ({...p, scene:'help', sceneLabel:'🆘 求助'}))
];

/* =========================================================
   工具函式
   ========================================================= */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mapUrl = q => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
const store = {
  get(k, d){ try{ const v = localStorage.getItem('kanto27_'+k); return v===null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem('kanto27_'+k, JSON.stringify(v)); }catch(e){} }
};
const TYPES = {
  flight:{label:'航班', ic:'✈️'}, transit:{label:'交通', ic:'🚆'}, sight:{label:'景點', ic:'📍'},
  food:{label:'餐食', ic:'🍽️'}, hotel:{label:'住宿/行李', ic:'🏨'}, event:{label:'活動/提醒', ic:'✨'}
};
const LEAD = [
  ['✈️','flight','✈️'],['🛬','flight','🛬'],['🚆','transit','🚆'],['🚅','transit','🚅'],
  ['🚃','transit','🚃'],['🚌','transit','🚌'],['🚕','transit','🚕'],['🚗','transit','🚗'],
  ['🚶','transit','🚶'],['🍽️','food','🍽️'],['🧳','hotel','🧳'],['📝','event','📝'],
  ['✨','event','🎆'],['📍','sight','📍']
];
const toMin = t => { const [h,m] = t.split(':').map(Number); return h*60+m; };

function parseItem([time, raw, meta]){
  let text = raw.trim(), type = 'sight', icon = '📍';
  for (const [e,t,i] of LEAD){ if (text.startsWith(e)){ type=t; icon=i; text=text.slice(e.length).trim(); break; } }
  if (/Check-in|辦理入住/.test(text)){ type='hotel'; icon='🏨'; }
  const tips = [];
  const m = text.match(/(⚠️|💡)/);
  if (m){ const rest = text.slice(m.index); text = text.slice(0, m.index).trim();
    rest.split(/(?=⚠️|💡)/).forEach(s => { s=s.trim(); if(s) tips.push({warn:s.startsWith('⚠️'), text:s.replace(/^(⚠️|💡)\s*/,'')}); }); }
  const times = (time.match(/\d{1,2}:\d{2}/g) || []);
  const places = [...text.matchAll(/【(.+?)】/g)].map(x => x[1]);
  const ttIds = meta?.tt || [];
  const bkId = meta?.bk || null;
  return {time, start: times[0] ? toMin(times[0]) : null, end: times[1] ? toMin(times[1]) : null, type, icon, text, tips, places, ttIds, bkId};
}
DAYS.forEach((d,i) => { d.idx=i; d.parsed = d.items.map(parseItem); });

const NON_PLACE_RE = /^(午餐|晚餐|早餐|除夕晚宴|第\s*\d+\s*晚|長榮\s*BR\d+|京成\s*Skyliner\s*\d+號|はくたか\s*\d+號|河口湖冬花火)$/;

let plCurrentJa = '';
function openPlaceModal(name, fallbackArea){
  const info = PLACE_INFO[name] || {q: name + (fallbackArea ? ' ' + fallbackArea : ''), ja: name, ro: ''};
  plCurrentJa = info.ja;
  $('#plZh').textContent = name;
  $('#plJa').textContent = info.ja;
  $('#plRo').textContent = info.ro || '';
  $('#plRo').style.display = info.ro ? 'block' : 'none';
  $('#plMapBtn').href = mapUrl(info.q);
  $('#plSpeakBtn').style.display = name.includes('桃園機場') ? 'none' : 'inline-flex';
  $('#placeModal').classList.add('open');
}
$('#plSpeakBtn').addEventListener('click', () => speakJapanese(plCurrentJa));
$('#closePlaceBtn').addEventListener('click', () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); $('#placeModal').classList.remove('open'); });
$('#placeModal').addEventListener('click', e => { if (e.target === $('#placeModal')) { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); $('#placeModal').classList.remove('open'); } });

function renderText(text, day){
  return String(text).split(/(【.+?】)/g).map(part => {
    const m = part.match(/^【(.+?)】$/);
    if (!m) return esc(part);
    const name = m[1];
    if (NON_PLACE_RE.test(name)) return `<b>【${esc(name)}】</b>`;
    const info = PLACE_INFO[name];
    const query = info ? info.q : (name + ' ' + day.map);
    const safeName = name.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const safeArea = (day.map || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `<a class="place" href="${mapUrl(query)}" onclick="event.preventDefault();openPlaceModal('${esc(safeName)}','${esc(safeArea)}')" title="查看日文／羅馬拼音與地圖：${esc(name)}">${esc(name)}</a>`;
  }).join('');
}
function fmtDate(d){ const [y,m,dd] = d.date.split('-'); return `${+m}/${+dd}（${d.wd}）`; }

function renderMealTiersHTML(meal, mapArea){
  return `<div class="tier-wrap">${meal.tiers.map(tb => {
    const cls = tb.tier==='A' ? 'ta' : tb.tier==='B' ? 'tb' : 'tc';
    return `<div class="tier-block">
      <div class="tier-badge ${cls}">${esc(tb.label)}</div>
      <ul class="meal-list">${tb.list.map(r => `
        <li class="meal-item">
          <div class="meal-item-txt">
            <b>${esc(r.name)}</b>
            ${r.note ? `<small>${esc(r.note)}</small>` : ''}
          </div>
          <a class="map-mini" href="${mapUrl(r.name.split(/[／/（(]/)[0].trim() + ' ' + mapArea)}" target="_blank" rel="noopener">🗺️ 地圖</a>
        </li>`).join('')}</ul>
    </div>`;
  }).join('')}</div>`;
}

/* ---------- 日本時間 & 日期計算 ---------- */
const DEMO_NOW = (() => { const q = new URLSearchParams(location.search).get('now'); if (!q) return 0; const t = Date.parse(q + '+09:00'); return isNaN(t) ? 0 : t - Date.now(); })();
function jstNow(){
  const n = new Date(Date.now() + DEMO_NOW + 9*3600e3);
  return {date: n.toISOString().slice(0,10), min: n.getUTCHours()*60 + n.getUTCMinutes(), ts: n};
}
function todayIdx(){ const t = jstNow().date; return DAYS.findIndex(d => d.date === t); }
function diffDays(dateStrA, dateStrB){
  const a = Date.UTC(...dateStrA.split('-').map((v,i)=>i===1?v-1:+v));
  const b = Date.UTC(...dateStrB.split('-').map((v,i)=>i===1?v-1:+v));
  return Math.round((b - a) / 864e5);
}

function getBookingStatus(bk){
  const doneMap = store.get('chk', {});
  const isDone = !!doneMap[bk.chkKey];
  const today = jstNow().date;
  const daysUntilOpen = diffDays(today, bk.openDate);
  const isOpen = daysUntilOpen <= 0;
  return {isDone, isOpen, daysUntilOpen};
}

/* =========================================================
   字級 & 主題 & 輕提示
   ========================================================= */
const FS = [15, 17, 20, 24, 28];
const FS_LBL = ['小', '標準', '大', '特大', '超大'];
let curFs = store.get('fs', 1);
function setFont(i){
  curFs = ((i % FS.length) + FS.length) % FS.length;
  document.documentElement.style.setProperty('--fs', FS[curFs] + 'px');
  if ($('#fontLbl')) $('#fontLbl').textContent = FS_LBL[curFs];
  store.set('fs', curFs);
}
$('#fontCycleBtn').addEventListener('click', () => {
  setFont(curFs + 1);
  showToast('字級已切換為：' + FS_LBL[curFs]);
});
setFont(curFs);

function setTheme(t){
  document.documentElement.dataset.theme = t;
  const tb = $('#themeBtn');
  if (tb) tb.textContent = t === 'dark' ? '☀️ 切換為淺色模式' : '🌙 切換為深色模式';
  document.querySelector('meta[name=theme-color]').content = t === 'dark' ? '#12161d' : '#1f3a5f';
  store.set('theme', t);
}
setTheme(store.get('theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

let toastTimer = null;
function showToast(msg){
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* =========================================================
   導覽（精簡 5 主分頁 + 子分頁自動對應）
   ========================================================= */
const VIEWS = [
  ['day','📅','每日行程','行程'],
  ['transit','🚆','交通時刻表','交通'],
  ['food','🍽️','推薦餐廳','美食'],
  ['booking','🎟️','訂票提醒','訂票'],
  ['expense','🧾','旅途記帳','記帳'],
  ['more','ℹ️','實用資訊','資訊']
];
const ALL_VIEWS = ['day','transit','food','booking','expense','hotel','packing','info','more'];
const SUB_PARENT = {hotel:'more', packing:'more', info:'more'};
const lastSub = {more:'packing'};

function buildNav(){
  const openUnbookedCount = BOOKINGS.filter(b => { const s = getBookingStatus(b); return s.isOpen && !s.isDone; }).length;
  const badgeHtml = openUnbookedCount > 0 ? `<span class="nav-badge" title="${openUnbookedCount} 項已開放待預訂">${openUnbookedCount}</span>` : '';
  document.querySelector('nav.bottom').innerHTML = VIEWS.map(([id,ic,lb,shortLb]) =>
    `<button data-view="${id}"><span class="ic" aria-hidden="true">${ic}</span><span>${shortLb}</span>${id==='booking'?badgeHtml:''}</button>`).join('');
  document.querySelector('nav.tabs').innerHTML = VIEWS.map(([id,ic,lb]) =>
    `<button data-view="${id}">${ic} ${lb}${id==='booking'?badgeHtml:''}</button>`).join('');
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.view === 'booking' && state.bookingDay !== 'all') {
      state.bookingDay = 'all';
      renderBookings();
    }
    go(b.dataset.view);
  }));
}
document.querySelectorAll('.subtabs button').forEach(b => b.addEventListener('click', () => go(b.dataset.sub)));

function go(view, push=true){
  if (view === 'overview') view = 'hotel';
  if (view === 'plan') view = 'booking';
  if (view === 'check') view = 'packing';
  if (view === 'more') view = lastSub.more;
  const parent = SUB_PARENT[view] || view;
  if (parent === 'more') lastSub.more = view;
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'v-'+view));
  document.querySelectorAll('[data-view]').forEach(b => b.dataset.view === parent ? b.setAttribute('aria-current','page') : b.removeAttribute('aria-current'));
  $('#subtabsMore').classList.toggle('show', parent === 'more');
  document.querySelectorAll('.subtabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.sub === view));
  if ($('#banner')) $('#banner').style.display = view === 'day' ? '' : 'none';
  if (view === 'expense'){ renderExp(); autoLiveRate(); }
  if (push) history.replaceState(null, '', '#' + view + (view==='day' ? '-' + (state.day+1) : ''));
  window.scrollTo({top:0});
}

/* =========================================================
   一鍵跳回「今天此刻」＆ 快速匯率彈窗 ＆ 司機大字卡 ＆ 4 大按需動線圖
   ========================================================= */
$('#todayJumpBtn').addEventListener('click', () => {
  const ti = todayIdx();
  state.filter = 'all';
  go('day');
  if (ti >= 0){
    selectDay(ti);
    setTimeout(() => {
      const target = $('#timeline .ev.now') || $('#timeline .ev:not(.past)');
      if (target) target.scrollIntoView({behavior:'smooth', block:'center'});
      showToast(`📍 已跳至今天（Day ${ti+1}）目前行程`);
    }, 80);
  } else {
    selectDay(0);
    showToast('🧳 尚未出發，已為您跳至 Day 1 行程');
  }
});

function openCalcModal(){
  const r = store.get('rate', 0.215);
  $('#mRateInp').value = r;
  $('#mTwdInp').value = Math.round((+$('#mJpyInp').value || 0) * r);
  $('#calcModal').classList.add('open');
  showRateNote(); autoLiveRate();
  setTimeout(() => { $('#mJpyInp').focus(); $('#mJpyInp').select(); }, 50);
}
$('#calcBtn').addEventListener('click', openCalcModal);
$('#closeCalcBtn').addEventListener('click', () => $('#calcModal').classList.remove('open'));
$('#calcModal').addEventListener('click', e => { if (e.target === $('#calcModal')) $('#calcModal').classList.remove('open'); });
const syncModalCalc = src => {
  const prevR = store.get('rate', 0.215);
  const r = Math.max(0.01, +$('#mRateInp').value || 0.215);
  store.set('rate', r);
  if ($('#rateInp')) $('#rateInp').value = r;
  if (src === 'twd') $('#mJpyInp').value = Math.round((+$('#mTwdInp').value || 0) / r);
  else $('#mTwdInp').value = Math.round((+$('#mJpyInp').value || 0) * r);
  if (r !== prevR && $('#v-expense')?.classList.contains('active')) renderExp(true);
};
$('#mRateInp').addEventListener('input', () => syncModalCalc('jpy'));
$('#mJpyInp').addEventListener('input', () => syncModalCalc('jpy'));
/* ===== DEMO：即時匯率（open.er-api.com，免金鑰；失敗時沿用上次／手動匯率） ===== */
function showRateNote(msg){
  const el = $('#rateNote'); if (!el) return;
  const c = store.get('rate_live', null), manual = store.get('rate_manual', false);
  if (msg){ el.textContent = msg; el.style.color = 'var(--muted)'; return; }
  el.style.color = 'var(--muted)';
  el.textContent = manual ? '✏️ 目前使用手動匯率；按「即時匯率」可改回自動更新'
    : c ? `🌐 即時中間價（${c.date} 更新）。實際換匯／刷卡通常再加 1–3% 手續費` : '尚未取得即時匯率，使用預設值';
}
async function fetchLiveRate(force){
  try{
    showRateNote('⏳ 取得即時匯率中…');
    const r = await fetch('https://open.er-api.com/v6/latest/JPY', {cache:'no-store'});
    const j = await r.json(); const v = j && j.rates && j.rates.TWD;
    if (!v) throw 0;
    const rate = Math.round(v*10000)/10000;
    store.set('rate_live', {rate, ts: Date.now(), date: String(j.time_last_update_utc||'').slice(5,16) || new Date().toLocaleDateString()});
    if (force || !store.get('rate_manual', false)){
      store.set('rate_manual', false); $('#mRateInp').value = rate; syncModalCalc('jpy');
      if ($('#v-expense')?.classList.contains('active')) renderExp(true);
    }
  }catch(e){ showRateNote('⚠️ 無法取得即時匯率，沿用上次設定的匯率'); return; }
  showRateNote();
}
function autoLiveRate(){
  const c = store.get('rate_live', null);
  if (store.get('rate_manual', false)) return;
  if (c && Date.now() - c.ts < 3600e3){ $('#mRateInp').value = c.rate; syncModalCalc('jpy'); return; }
  fetchLiveRate(false);
}
$('#rateLiveBtn').addEventListener('click', () => fetchLiveRate(true));
$('#mRateInp').addEventListener('input', () => { store.set('rate_manual', true); showRateNote(); });

$('#mTwdInp').addEventListener('input', () => syncModalCalc('twd'));
$('#mCalcPresets').querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
  $('#mJpyInp').value = b.dataset.jpy;
  syncModalCalc('jpy');
}));

function openTaxiModal(key){
  const t = TAXI_SPOTS[key];
  if (!t) return;
  $('#taxiJa').textContent = t.ja;
  $('#taxiZh').textContent = t.zh;
  $('#taxiAddr').textContent = t.addr;
  $('#taxiTel').textContent = '📞 TEL: ' + t.tel;
  $('#taxiTel').href = 'tel:' + t.tel;
  $('#taxiModal').classList.add('open');
}
$('#closeTaxiBtn').addEventListener('click', () => $('#taxiModal').classList.remove('open'));
$('#taxiModal').addEventListener('click', e => { if (e.target === $('#taxiModal')) $('#taxiModal').classList.remove('open'); });

const GUIDE_MODALS = {
  skyliner: {
    title: '✈️ 成田 T1 橘色月台 ＆ 京成上野分流圖',
    html: () => `
      <div style="font-size:.84rem;font-weight:800;color:var(--muted);margin-bottom:.3rem">成田機場 T1 (KS42)｜B1F 剪票大廳層</div>
      <div class="vg-grid3">
        <div class="vg-box red"><b>① 特急券賣場 / 機器</b><br>認明「特」標誌購票或持兌換券劃位</div>
        <div class="vg-box orange"><b>② 入口改札（橘色）</b><br>插入 Skyliner 特急券</div>
        <div class="vg-box blue"><b>③ 搭電梯下 B2F</b><br>推大行李直接搭電梯往橘色專區</div>
      </div>
      <div style="font-size:.84rem;font-weight:800;color:#d97706;margin:.6rem 0 .3rem">B2F 乘車月台層（務必認明橘色指標！）</div>
      <div class="vg-grid2">
        <div class="vg-box orange"><b>✅ 橘色區 1・4・5 號月台（Skyliner）</b><br>直達日暮里・京成上野<br><small>136 號 14:18發→15:09抵｜38 號 14:38發→15:23抵</small></div>
        <div class="vg-box blue dashed"><b>❌ 藍色區 2・3 號（勿誤入）</b><br>京成本線（普通／特急），停站多非 Skyliner</div>
      </div>
      <div style="font-size:.84rem;font-weight:800;color:var(--muted);margin:.7rem 0 .3rem">京成上野站 (KS01)｜B2F 搭電梯上 B1F 改札後分流</div>
      <div class="vg-grid2">
        <div class="vg-box blue"><b>⬅️ 左轉「正面口」</b><br>輕裝步行 15 分至 MIMARU；Day 10 由 &amp;Here 步行 10 分進站</div>
        <div class="vg-box red"><b>➡️ 往「池の端口」TAXI 乘車處</b><br><b>★ Day 1 家族推大行李首選！</b>分搭 2 台計程車直達飯店（約 5 分／約 ¥800 台）</div>
      </div>`
  },
  tokyoStation: {
    title: '🚉 東京站 1F → 八重洲南口 8 號站牌動線圖',
    html: () => `
      <div class="vg-grid3">
        <div class="vg-box green"><b>① 北陸新幹線 20–23 月台</b><br>10:22 抵達下車<br>出<b>「新幹線南のりかえ口」</b>(1F)</div>
        <div class="vg-box blue"><b>② 買便當 ＆ 出站</b><br>🍱 <b>大丸東京 B1</b>（10:00開）在北口/中央口側，買完往南步 3–4 分 → 經南通路出<b>「八重洲南口」</b>直通屋外 1F</div>
        <div class="vg-box" style="border-color:#dc2626"><b>③ JR 高速巴士總站 (1F 屋外)</b><br><div style="background:#dc2626;color:#fff;border-radius:8px;padding:.35rem .5rem;font-weight:900;text-align:center;margin:.3rem 0">★ 8 番のりば（河口湖 119 號）</div><small>勿跑錯鐵鋼大樓！9 番旁有廁所，車程 2h07m 無停靠上車前先如廁</small></div>
      </div>`
  },
  solamachi: {
    title: '🏢 Tokyo Solamachi 晴空塔重點樓層剖面',
    html: () => `
      <div style="font-size:.82rem;color:var(--muted);margin-bottom:.45rem">營業 10–21 / 餐廳 11–23｜免費 Wi-Fi：<b>TOBU_Free_WiFi</b></div>
      <div class="vg-floor" style="border-color:#1e3a8a"><div class="fl" style="background:#1e3a8a">30F–31F</div><div><b>高空景觀餐廳（搭專用電梯）</b>｜30F #1 敘敘苑燒肉・Top of Tree</div></div>
      <div class="vg-floor" style="border-color:#d97706"><div class="fl" style="background:#d97706">6F–7F</div><div><b>美食層</b>｜6F #14 備長鰻魚三吃・#15 利久牛舌・#9 Toriton 壽司・#18 六厘舍｜7F 鼎泰豐</div></div>
      <div class="vg-floor" style="border-color:#2563eb"><div class="fl" style="background:#2563eb">5F</div><div><b>晴空塔出口大廳</b>｜SKYTREE SHOP 官方紀念品・兒童樂園 Solafuru Park</div></div>
      <div class="vg-floor" style="border-color:#dc2626"><div class="fl" style="background:#dc2626">4F</div><div><b>晴空塔入口大廳</b>｜#48 寶可夢中心・JUMP SHOP・卡比咖啡・扭蛋・DAISO</div></div>
      <div class="vg-floor" style="border-color:#15803d"><div class="fl" style="background:#15803d">3F</div><div><b>#65 吉伊卡哇 Chiikawa Land</b>・迪士尼・LOFT・美食街（一風堂／宮武讚岐）</div></div>
      <div class="vg-floor" style="border-color:#475569"><div class="fl" style="background:#475569">1–2F / B3F</div><div>2F 伴手禮｜1F 松本清・佐川行李｜<b>B3F 直通押上站都營淺草線（20:34 回程）</b></div></div>
      <div class="vg-note">🎟️ <b>晴空塔門票折扣提醒：</b>須在「點餐或購買前」先出示門票，結帳時才拿出恕不適用！</div>`
  },
  kawagoeLoop: {
    title: '🗺️ 川越一日無回頭路環線圖 ＆ 兩大地雷提醒',
    html: () => `
      <svg class="vg-svg" viewBox="0 0 600 205" role="img" aria-label="川越一日無回頭路環線圖">
        <rect x="0" y="0" width="600" height="205" fill="var(--surface)"/>
        <polyline points="85,165 255,165 425,165 510,96 390,36 225,36 90,96 85,165" fill="none" stroke="#d97706" stroke-width="3.5" stroke-dasharray="7,5"/>
        <rect x="18" y="142" width="132" height="44" rx="8" fill="#1e293b"/>
        <text x="84" y="161" font-size="12.5" fill="#fff" font-weight="900" text-anchor="middle">🚆 川越站東口</text>
        <text x="84" y="177" font-size="10.5" fill="#cbd5e1" text-anchor="middle">09:10 西武本52發</text>
        <rect x="182" y="142" width="144" height="44" rx="8" fill="var(--surface)" stroke="#c2410c" stroke-width="2"/>
        <text x="254" y="161" font-size="12" fill="#c2410c" font-weight="900" text-anchor="middle">① 喜多院・五百羅漢</text>
        <text x="254" y="177" font-size="10.5" fill="var(--muted)" text-anchor="middle">東側 T2 喜多院前 10:08</text>
        <rect x="352" y="142" width="144" height="44" rx="8" fill="var(--surface)" stroke="#c2410c" stroke-width="2"/>
        <text x="424" y="161" font-size="12" fill="#c2410c" font-weight="900" text-anchor="middle">② 川越城本丸御殿</text>
        <text x="424" y="177" font-size="10.5" fill="var(--muted)" text-anchor="middle">T7 博物館前 10:18 抵</text>
        <rect x="444" y="72" width="142" height="44" rx="8" fill="var(--surface)" stroke="#b91c1c" stroke-width="2"/>
        <text x="515" y="91" font-size="12" fill="#b91c1c" font-weight="900" text-anchor="middle">③ 冰川神社 (北端)</text>
        <text x="515" y="107" font-size="10.5" fill="var(--muted)" text-anchor="middle">釣鯛魚籤・繪馬隧道</text>
        <rect x="318" y="14" width="148" height="44" rx="8" fill="var(--surface)" stroke="#92400e" stroke-width="2"/>
        <text x="392" y="33" font-size="12" fill="#92400e" font-weight="900" text-anchor="middle">④ 菓子屋橫丁 &amp; 吉伊</text>
        <text x="392" y="49" font-size="10.5" fill="var(--muted)" text-anchor="middle">ちいかわもぐもぐ本舗</text>
        <rect x="150" y="14" width="148" height="44" rx="8" fill="var(--surface)" stroke="#92400e" stroke-width="2"/>
        <text x="224" y="33" font-size="12" fill="#92400e" font-weight="900" text-anchor="middle">⑤ 藏造一番街・時之鐘</text>
        <text x="224" y="49" font-size="10.5" fill="var(--muted)" text-anchor="middle">鰻魚午餐・鐘樓星巴克</text>
        <rect x="18" y="72" width="144" height="44" rx="8" fill="var(--surface)" stroke="#2563eb" stroke-width="2"/>
        <text x="90" y="91" font-size="12" fill="#2563eb" font-weight="900" text-anchor="middle">⑥ 浪漫通→熊野神社</text>
        <text x="90" y="107" font-size="10.5" fill="#2563eb" font-weight="700" text-anchor="middle">W5 蓮馨寺 16:45 回站</text>
      </svg>
      <div class="vg-note warn">⚠️ <b>川越搭公車兩大地雷：</b><br>
        1. 西武下車「喜多院入口」在西側，東武名03「<b>T2 喜多院前</b>」在東側近成田山。<br>
        2. 認明「<b>東武バス（橙藍標誌）</b>」，勿搭錯橘白色 Eagle Bus；全程刷 Suica 最省錢。
      </div>`
  },
  carNavi: {
    title: '🚗 河口湖自駕車機導航速查（電話／MapCode）',
    html: () => {
      const spots = [
        ['Day 5・8', 'Toyota 富士河口湖店（取／還車）', '0555-72-1100', '船津4059-1｜營業 08:00–19:00', 'トヨタレンタカー 富士河口湖店'],
        ['Day 5–8', 'Fuji View Hotel（連住 3 晚）', '0555-83-2211', '勝山511｜免費停車場', '富士ビューホテル 河口湖'],
        ['Day 6', '大石公園（河口湖自然生活館）', '0555-76-8230', 'MapCode：59 089 357｜免費停車', '大石公園 河口湖'],
        ['Day 6', '富士山景觀纜車（天上山公園）', '0555-72-0363', '停縣營免費船津浜停車場（遊覽船 0555-72-0029）', '富士山パノラマロープウェイ'],
        ['Day 6', '旅之站 kawaguchiko base', '0555-72-9955', '河口521-4｜大型免費停車場', '旅の駅 kawaguchiko base'],
        ['Day 6', '河口湖音樂盒之森美術館', '0555-20-4111', '河口3077-20｜免費停車場 300 席', '河口湖音楽と森の美術館'],
        ['Day 7', '新倉山淺間公園（忠靈塔）', '0555-21-1000', '富士吉田市浅間2-4-1｜早到車位多', '新倉山浅間公園 駐車場'],
        ['Day 7', '忍野八海（大林／オサダ停車場）', '0555-84-2535', '大林大型停車 100 席（備用：オサダ 0555-84-2297）', '忍野八海 駐車場'],
        ['Day 7', '西湖療癒之里根場', '0555-20-4677', '西湖根場2710｜免費停車場', '西湖いやしの里根場'],
        ['Day 7', '西湖野鳥之森公園（樹冰祭）', '0555-82-2160', '西湖2068｜冬季留意結冰路面', '西湖野鳥の森公園'],
        ['Day 8', 'ENEOS セルフ富士河口湖SS（加油）', '0555-72-2071', '06:00–24:00（備用：セルフRESO 0555-72-0084）', 'ENEOS セルフ富士河口湖SS']
      ];
      return `
        <div class="vg-note" style="margin-top:0;margin-bottom:.6rem">💡 <b>日本車機導航秘訣：</b>在車機選「<b>電話番号検索</b>」直接輸入下方電話最準確！冬季清晨河口湖大橋與山區易結黑冰，請確認已加選雪胎（スタッドレスタイヤ）。</div>
        <div style="overflow-x:auto">
          <table class="quick-tt-table">
            <thead><tr><th>日別</th><th>目的地</th><th>車機輸入電話</th><th>停車／導航備註</th></tr></thead>
            <tbody>
              ${spots.map(([dy, name, tel, note, q]) => `<tr>
                <td style="white-space:nowrap;font-weight:800;font-size:.8rem">${esc(dy)}</td>
                <td><b>${esc(name)}</b><br><a class="map-mini" style="margin-left:0;margin-top:.2rem" href="${mapUrl(q)}" target="_blank" rel="noopener">🗺️ Google 地圖</a></td>
                <td style="white-space:nowrap"><a href="tel:${esc(tel)}" style="font-weight:900;font-size:.96rem;text-decoration:none">${esc(tel)}</a></td>
                <td style="font-size:.82rem;color:var(--muted)">${esc(note)}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>`;
    }
  }
};

function openGuideModal(key){
  const g = GUIDE_MODALS[key];
  if (!g) return;
  $('#guideTitle').textContent = g.title;
  $('#guideBody').innerHTML = g.html();
  $('#guideModal').classList.add('open');
}
$('#closeGuideBtn').addEventListener('click', () => $('#guideModal').classList.remove('open'));
$('#guideModal').addEventListener('click', e => { if (e.target === $('#guideModal')) $('#guideModal').classList.remove('open'); });

const hubState = { scene: 'all', q: '' };
function renderPhraseHub(){
  const scenes = [
    ['all', `全部（${ALL_PHRASES.length}）`],
    ['food', '🍽️ 餐廳'],
    ['hotel', '🏨 飯店'],
    ['transit', '🚆 交通'],
    ['drive', '🚗 自駕'],
    ['shop', '🛍️ 購物'],
    ['help', '🆘 求助']
  ];
  $('#hubCats').innerHTML = scenes.map(([k,l]) => `<button type="button" data-hs="${k}" aria-pressed="${hubState.scene===k}">${l}</button>`).join('');
  $('#hubCats').querySelectorAll('button').forEach(b => b.onclick = () => { hubState.scene = b.dataset.hs; renderPhraseHub(); });

  const q = hubState.q.trim().toLowerCase();
  const total = phraseState.adults + phraseState.kids;
  $('#adultCnt').textContent = phraseState.adults;
  $('#kidCnt').textContent = phraseState.kids;
  $('#partySummary').textContent = `（共 ${total} 位，即時同步候位卡）`;
  $('#partyBar').style.display = (!q && (hubState.scene === 'all' || hubState.scene === 'food')) ? 'flex' : 'none';

  const list = ALL_PHRASES.map((p, idx) => ({p: getDynamicPhrase(p), idx})).filter(({p}) => {
    if (!q && hubState.scene !== 'all' && p.scene !== hubState.scene) return false;
    if (q && !(p.zh + ' ' + p.ja + ' ' + p.ro + ' ' + p.sceneLabel).toLowerCase().includes(q)) return false;
    return true;
  });

  $('#hubWrap').innerHTML = list.map(({p, idx}) => `
    <button type="button" class="phrase-card" data-hi="${idx}" title="點擊放大顯示">
      <div style="font-size:.75rem;color:var(--accent);font-weight:700;margin-bottom:.15rem">${esc(p.sceneLabel)}</div>
      <div class="zh">${esc(p.zh)}</div>
      <div class="ja">${esc(p.ja)}</div>
      <div class="ro">${esc(p.ro)}</div>
    </button>`).join('') || '<div style="color:var(--muted);padding:.8rem">找不到符合關鍵字的日語會話，請清除搜尋或切換其他情境。</div>';
  $('#hubWrap').querySelectorAll('.phrase-card').forEach(b => b.onclick = () => openPhraseModal(ALL_PHRASES[+b.dataset.hi]));
}
function openPhraseHub(scene = 'all'){
  hubState.scene = scene;
  hubState.q = '';
  if ($('#hubSearch')) $('#hubSearch').value = '';
  renderPhraseHub();
  $('#phraseHubModal').classList.add('open');
}
$('#phraseHubBtn').addEventListener('click', () => openPhraseHub('all'));
$('#closeHubBtn').addEventListener('click', () => $('#phraseHubModal').classList.remove('open'));
$('#phraseHubModal').addEventListener('click', e => { if (e.target === $('#phraseHubModal')) $('#phraseHubModal').classList.remove('open'); });
$('#hubSearch').addEventListener('input', e => { hubState.q = e.target.value; renderPhraseHub(); });

function openSearchModal(){
  $('#searchModal').classList.add('open');
  setTimeout(() => { $('#q')?.focus(); $('#q')?.select(); }, 40);
}
$('#closeSearchBtn').addEventListener('click', () => $('#searchModal').classList.remove('open'));
$('#searchModal').addEventListener('click', e => { if (e.target === $('#searchModal')) $('#searchModal').classList.remove('open'); });

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if ($('#phraseModal')?.classList.contains('open')) {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    $('#phraseModal').classList.remove('open');
    return;
  }
  ['#placeModal','#phraseHubModal','#searchModal','#taxiModal','#calcModal','#guideModal','#pwaModal'].forEach(s => $(s)?.classList.remove('open'));
});

/* =========================================================
   全域狀態
   ========================================================= */
const state = {
  day: 0, filter: 'all',
  foodDay: '0', foodTier: 'all',
  bookingStatus: 'all', bookingCat: 'all', bookingDay: 'all',
  transitCat: 'all', transitDay: '1',
  onlyUnchecked: false
};

/* =========================================================
   每日行程 (v-day)
   ========================================================= */
function buildPicker(){
  const ti = todayIdx();
  $('#daypicker').innerHTML = DAYS.map((d,i) => `
    <button class="daychip" role="tab" data-i="${i}" aria-selected="${i===state.day}" aria-label="Day ${i+1} ${fmtDate(d)} ${d.title}">
      ${i===ti ? '<span class="todaydot">今天</span>' : ''}
      <span class="dn">Day ${i+1}</span>
      <span class="dd">${fmtDate(d)}${d.tag ? ' ' + d.tag : ''}</span>
    </button>`).join('');
  $('#daypicker').querySelectorAll('.daychip').forEach(b => b.addEventListener('click', () => selectDay(+b.dataset.i)));
}

function selectDay(i, scroll=true){
  state.day = Math.max(0, Math.min(DAYS.length-1, i));
  state.foodDay = String(state.day);
  state.transitDay = String(state.day + 1);
  store.set('day', state.day);
  $('#daypicker').querySelectorAll('.daychip').forEach(b => b.setAttribute('aria-selected', +b.dataset.i === state.day));
  const chip = $('#daypicker').querySelector(`[data-i="${state.day}"]`);
  if (chip && scroll) centerChip(chip, true);
  renderDay();
  renderFood();
  renderTimetables();
  history.replaceState(null, '', '#day-' + (state.day+1));
}

function findMatchingMeal(d, p){
  if (!d.meals || !d.meals.length) return null;
  if (p.text.includes('早餐')) return null;
  const full = p.text + ' ' + p.tips.map(t=>t.text).join(' ');
  for (const m of d.meals){
    if (m.match && full.includes(m.match)) return m;
  }
  if (p.type !== 'food' && !full.includes('便當') && !full.includes('午餐') && !full.includes('晚餐')) return null;
  if (p.start !== null && p.start < 15*60) return d.meals.find(m => m.slot.includes('午餐'));
  if (p.start !== null && p.start >= 16*60) return d.meals.find(m => m.slot.includes('晚餐'));
  return null;
}

function jumpToBooking(id){
  state.bookingStatus = 'all';
  state.bookingCat = 'all';
  if ($('#bq')) $('#bq').value = '';
  renderBookings();
  go('booking');
  setTimeout(() => {
    const el = document.getElementById('bk-card-'+id);
    if (el){ el.scrollIntoView({behavior:'smooth', block:'center'}); el.style.outline='3px solid var(--accent)'; setTimeout(()=>el.style.outline='', 2200); }
  }, 80);
}

function jumpToBookingDay(dayNum){
  state.bookingDay = String(dayNum);
  state.bookingStatus = 'all';
  state.bookingCat = 'all';
  if ($('#bq')) $('#bq').value = '';
  renderBookings();
  go('booking');
}

function jumpToTimetableDay(dayNum){
  state.transitCat = 'all';
  state.transitDay = String(dayNum);
  if ($('#tq')) $('#tq').value = '';
  renderTimetables();
  go('transit');
}

function jumpToTimetableId(ttId){
  state.transitCat = 'all';
  state.transitDay = 'all';
  if ($('#tq')) $('#tq').value = '';
  renderTimetables();
  go('transit');
  setTimeout(() => {
    const el = document.getElementById('tt-card-'+ttId);
    if (el){ el.scrollIntoView({behavior:'smooth', block:'center'}); el.style.outline='3px solid var(--accent)'; setTimeout(()=>el.style.outline='', 2200); }
  }, 80);
}

function renderDay(){
  const d = DAYS[state.day];
  const dayNum = state.day + 1;
  $('#dayhead').innerHTML = `
    <div class="row1">
      <span class="pill area day-dup">Day ${dayNum}</span>
      <span class="pill">📍 ${esc(d.area)}</span>
      ${d.tag ? `<span class="pill holiday">🧧 ${d.tag}</span>` : ''}
    </div>
    <h2>${esc(d.title)}</h2><div class="wx" id="wx"></div>`;
  loadWeather(d);

  // 篩選
  const fl = [['all','全部'], ['sight','📍 景點/活動'], ['transit','🚆 交通'], ['food','🍽️ 餐食']];
  $('#filters').innerHTML = fl.map(([k,l]) => `<button data-f="${k}" aria-pressed="${state.filter===k}">${l}</button>`).join('');
  $('#filters').querySelectorAll('button').forEach(b => b.onclick = () => { state.filter = b.dataset.f; renderDay(); });

  // 一次性可點擊地名小提示（長輩防迷路）
  const tipBar = $('#placeTipBar');
  if (tipBar){
    if (!store.get('place_tip_seen', false)){
      tipBar.innerHTML = `<div class="place-tip">
        <span>💡 點虛線地名看<b>日文、發音與地圖</b></span>
        <button type="button" id="dismissPlaceTipBtn">知道了</button>
      </div>`;
      $('#dismissPlaceTipBtn').onclick = () => {
        store.set('place_tip_seen', true);
        tipBar.innerHTML = '';
      };
    } else {
      tipBar.innerHTML = '';
    }
  }

  // 時間軸
  const isToday = jstNow().date === d.date, nowMin = jstNow().min;
  let nowIdx = -1;
  if (isToday){
    d.parsed.forEach((p,i) => {
      if (p.start === null) return;
      const nextStart = d.parsed.slice(i+1).find(x => x.start !== null)?.start ?? p.start + 60;
      const end = p.end ?? nextStart;
      if (nowMin >= p.start && nowMin < Math.max(end, p.start + 1)) nowIdx = i;
    });
  }
  const list = d.parsed.map((p,i) => ({p,i})).filter(({p}) => state.filter==='all' || p.type===state.filter ||
     (state.filter==='transit' && p.type==='flight') || (state.filter==='sight' && (p.type==='event' || p.type==='hotel')));

  let nextIdx = -1;
  if (isToday) nextIdx = d.parsed.findIndex((x,i) => x.start !== null && i !== nowIdx && x.start > nowMin && i > nowIdx);
  $('#timeline').innerHTML = list.map(({p,i}) => {
    const past = isToday && p.start !== null && i !== nowIdx && (nowIdx >= 0 ? i < nowIdx : p.start <= nowMin);
    const isNext = isToday && i === nextIdx;
    const matchedMeal = findMatchingMeal(d, p);
    const pills = [];
    if (dayNum === 1 && p.text.includes('Skyliner 136')) pills.push(`<button type="button" class="quick-pill" onclick="openGuideModal('skyliner')">🗺️ 成田 T1／京成上野動線圖</button>`);
    if (dayNum === 1 && p.text.includes('MIMARU 東京 上野 NORTH')) pills.push(`<button type="button" class="quick-pill" onclick="openTaxiModal('mimaru')">🚖 秀給司機看（飯店）</button>`);
    if (dayNum === 3 && p.text.includes('星野榆樹街小鎮')) pills.push(`<button type="button" class="quick-pill" onclick="openTaxiModal('hoshino')">🚖 秀給司機看（星野）</button>`);
    if (dayNum === 5 && p.text.includes('119號')) pills.push(`<button type="button" class="quick-pill" onclick="openGuideModal('tokyoStation')">🗺️ 東京站轉 8 號站牌動線圖</button>`);
    if (dayNum === 5 && p.text.includes('Toyota 富士河口湖店')) {
      pills.push(`<button type="button" class="quick-pill" onclick="openTaxiModal('toyota')">🚖 秀給司機看（租車站）</button>`);
      pills.push(`<button type="button" class="quick-pill" onclick="openGuideModal('carNavi')">🚗 河口湖車機導航速查</button>`);
    }
    if (dayNum === 6 && p.text.includes('大石公園')) pills.push(`<button type="button" class="quick-pill" onclick="openGuideModal('carNavi')">🚗 河口湖車機導航速查</button>`);
    if (dayNum === 7 && p.text.includes('新倉山淺間公園') && p.time.includes('08:30')) pills.push(`<button type="button" class="quick-pill" onclick="openGuideModal('carNavi')">🚗 河口湖車機導航速查</button>`);
    if (dayNum === 8 && p.text.includes('ENEOS')) {
      pills.push(`<button type="button" class="quick-pill" onclick="openPhraseModal(GAS_PHRASES[0])">⛽ 加油溝通卡（加滿普通油）</button>`);
      pills.push(`<button type="button" class="quick-pill" onclick="openGuideModal('carNavi')">🚗 河口湖車機導航速查</button>`);
    }
    if (dayNum === 8 && p.text.includes('東京晴空塔') && p.time.includes('16:30')) pills.push(`<button type="button" class="quick-pill" onclick="openGuideModal('solamachi')">🏢 Solamachi 晴空塔樓層圖</button>`);
    if (dayNum === 9 && p.text.includes('本52')) pills.push(`<button type="button" class="quick-pill" onclick="openGuideModal('kawagoeLoop')">🗺️ 川越無回頭路環線圖</button>`);

    return `<li class="ev ${p.type} ${i===nowIdx?'now':''} ${past?'past':''} ${isNext?'next':''}">
      <span class="dot" aria-hidden="true">${p.icon}</span>
      <div class="card">
        <div class="time">${esc(p.time.replace(/-/g, ' – '))} <span class="cat">${TYPES[p.type].label}</span>${past?'<span class="donetag">✓ 已過</span>':''}</div>
        <div class="txt">${renderText(p.text, d)}</div>
        ${tipsHtml(p)}
        ${pills.length ? `<div class="quick-actions">${pills.join('')}</div>` : ''}
        ${matchedMeal ? `<details class="meal-drawer">
          <summary><span>🍴 查看 ${esc(matchedMeal.slot)} 推薦清單</span><span>▼</span></summary>
          <div class="meal-drawer-body">${renderMealTiersHTML(matchedMeal, d.map)}</div>
        </details>` : ''}
      </div></li>`;
  }).join('') || '<li style="color:var(--muted);padding:1rem">此類別今天沒有項目</li>';

  $('#daynavBottom').innerHTML = `
    <button id="prevDay" ${state.day===0?'disabled':''} aria-label="前一天">◀ 前一天</button>
    <button id="nextDay" ${state.day===DAYS.length-1?'disabled':''} aria-label="後一天">後一天 ▶</button>`;
  $('#prevDay').onclick = () => { selectDay(state.day-1); window.scrollTo({top:0,behavior:'smooth'}); };
  $('#nextDay').onclick = () => { selectDay(state.day+1); window.scrollTo({top:0,behavior:'smooth'}); };

  // 側欄（住宿＋可勾選當日行前提醒＋當日跳轉列與即時天氣）
  let side = '';
  if (d.hotel){
    const hObj = HOTELS.find(h => d.hotel.includes(h.name.split(' ')[0]));
    side += `<div class="box"><h3>🏨 今晚住宿</h3>
      <div class="hotelname">${esc(d.hotel)}</div>
      <div style="display:flex;gap:.45rem;flex-wrap:wrap">
        <a class="btn primary" href="${mapUrl(d.hotel)}" target="_blank" rel="noopener">🗺️ 開啟地圖導航</a>
        ${hObj ? `<button type="button" class="btn" onclick="openTaxiModal('${hObj.key}')">🚖 秀給司機看</button>` : ''}
      </div></div>`;
  } else {
    side += `<div class="box"><h3>🏠 溫暖的家</h3><div>返抵國門，旅程圓滿結束！</div></div>`;
  }

  if (d.prep.length){
    const done = store.get('chk', {});
    const prepDone = d.prep.filter((_, j) => done[`d${d.idx}-${j}`]).length;
    side += `<div class="box">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:.4rem;margin-bottom:.45rem">
        <h3 style="margin:0">📝 當日行前提醒與準備</h3>
        <span class="pill ${prepDone===d.prep.length?'done':''}" id="dayPrepProg">${prepDone} / ${d.prep.length}</span>
      </div>
      <div class="pbar" aria-hidden="true"><i id="dayPrepBar" style="width:${Math.round(prepDone/d.prep.length*100)}%"></i></div>
      <div>${d.prep.map((x, j) => {
        const id = `d${d.idx}-${j}`;
        const checked = !!done[id];
        return `<label class="check ${checked?'done':''}">
          <input type="checkbox" data-prep-id="${id}" ${checked?'checked':''}>
          <span>${prepHtml(x)}</span>
        </label>`;
      }).join('')}</div>
    </div>`;
  }

  const dayBookings = BOOKINGS.filter(b => b.days.includes(dayNum));
  const dayTimetables = TIMETABLES.filter(t => t.days.includes(dayNum));
  const wxLink = (dayNum === 3 || dayNum === 4)
    ? `<a class="btn" style="margin:0" href="https://tenki.jp/forecast/3/23/4820/20321/" target="_blank" rel="noopener">❄️ 輕井澤天氣 ↗</a>`
    : (dayNum >= 5 && dayNum <= 7)
      ? `<a class="btn" style="margin:0" href="https://tenki.jp/forecast/3/22/4920/19430/" target="_blank" rel="noopener">🗻 河口湖天氣 ↗</a>
         <a class="btn" style="margin:0" href="https://fujisantotomoni.jp/livecamera/" target="_blank" rel="noopener">📹 富士山即時影像 ↗</a>`
      : `<a class="btn" style="margin:0" href="https://tenki.jp/forecast/3/16/4410/13106/" target="_blank" rel="noopener">🌤️ 東京天氣 ↗</a>`;

  side += `<div class="box" style="display:flex;gap:.45rem;flex-wrap:wrap;align-items:center">
    ${dayTimetables.length ? `<button type="button" class="btn" style="margin:0" onclick="jumpToTimetableDay(${dayNum})">🚆 Day ${dayNum} 交通時刻表（${dayTimetables.length}）→</button>` : ''}
    ${dayBookings.length ? `<button type="button" class="btn" style="margin:0" onclick="jumpToBookingDay(${dayNum})">🎟️ 今日相關預訂（${dayBookings.length}）→</button>` : ''}
    ${wxLink}
  </div>`;
  $('#side').innerHTML = side;

  if (d.prep.length){
    $('#side').querySelectorAll('input[data-prep-id]').forEach(inp => inp.onchange = () => {
      const s = store.get('chk', {});
      s[inp.dataset.prepId] = inp.checked;
      store.set('chk', s);
      const lbl = inp.closest('.check');
      if (lbl) lbl.classList.toggle('done', inp.checked);
      const cnt = d.prep.filter((_, j) => s[`d${d.idx}-${j}`]).length;
      const prog = $('#dayPrepProg');
      const bar = $('#dayPrepBar'); if (bar) bar.style.width = Math.round(cnt/d.prep.length*100)+'%';
      if (prog){
        prog.textContent = `${cnt} / ${d.prep.length}`;
        prog.classList.toggle('done', cnt === d.prep.length);
      }
    });
  }
}

// 滑動切換日期
(() => {
  let sx=0, sy=0;
  const el = $('#timeline');
  el.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, {passive:true});
  el.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 70 && Math.abs(dy) < 50) selectDay(state.day + (dx < 0 ? 1 : -1));
  }, {passive:true});
})();

/* =========================================================
   橫幅（精簡單行：倒數 / 今日進行中，僅顯示於每日行程頁）
   ========================================================= */
function renderBanner(){
  const now = jstNow(), ti = todayIdx();
  const start = Date.UTC(2027,1,1), today = Date.UTC(...now.date.split('-').map((v,i)=> i===1 ? v-1 : +v));
  let html = '';
  if (today < start){
    const days = Math.round((start - today) / 864e5);
    html += `<div class="banner">
      <span class="big" aria-hidden="true">🧳</span>
      <div class="btxt" title="2/1 05:30 桃園 T2（BR198 08:50 起飛）"><b>倒數 ${days} 天</b>｜2/1（一）出發・BR198 08:50</div>
    </div>`;
  } else if (ti >= 0){
    const d = DAYS[ti];
    const next = d.parsed.find(p => p.start !== null && p.start > now.min);
    html += `<div class="banner">
      <span class="big" aria-hidden="true">📍</span>
      <div class="btxt"><b>Day ${ti+1}</b>｜${next ? `下一站 ${esc(next.time.split(/[-或／]/)[0].trim())} ${esc(next.text.replace(/[【】「」]/g,''))}` : '今日行程已完成，好好休息！'}</div>
    </div>`;
  }
  $('#banner').innerHTML = html;
}

/* =========================================================
   訂票與預訂提醒功能 (v-booking) & 行事曆匯出
   ========================================================= */
function gcalUrl(ev, bk){
  const details = `${bk.title}\n對應行程：${bk.dayLabel}\n台灣時間：${bk.openTwt}\n日本時間：${bk.openJst}\n注意事項：${bk.note}\n訂票網址：${bk.url}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.title)}&dates=${ev.start}/${ev.end}&ctz=Asia/Taipei&details=${encodeURIComponent(details)}&location=${encodeURIComponent(bk.url)}`;
}

function downloadAllBookingICS(){
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//2027 Kanto Family Trip//Booking Reminders//ZH',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:2027關東家族旅行-訂票搶票提醒',
    'X-WR-TIMEZONE:Asia/Taipei'
  ];
  BOOKINGS.forEach(bk => {
    (bk.cal || []).forEach((ev, idx) => {
      const desc = `${bk.title}\\n對應行程：${bk.dayLabel.replace(/\n/g,' ')}\\n最早可訂(台灣)：${bk.openTwt.replace(/\n/g,' ')}\\n注意事項：${bk.note.replace(/\n/g,' ')}\\n訂票官網：${bk.url}`;
      lines.push(
        'BEGIN:VEVENT',
        `UID:kanto2027-bk-${bk.id}-${idx}@trip.local`,
        `DTSTAMP:20261118T000000Z`,
        `DTSTART;TZID=Asia/Taipei:${ev.start}`,
        `DTEND;TZID=Asia/Taipei:${ev.end}`,
        `SUMMARY:${ev.title}`,
        `DESCRIPTION:${desc}`,
        `URL:${bk.url}`,
        'BEGIN:VALARM',
        'TRIGGER:-PT30M',
        'ACTION:DISPLAY',
        `DESCRIPTION:${ev.title}（30分鐘後開放）`,
        'END:VALARM',
        'END:VEVENT'
      );
    });
  });
  lines.push('END:VCALENDAR');
  const blob = new Blob([lines.join('\r\n')], {type:'text/calendar;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '2027關東家族旅行_訂票搶票提醒.ics';
  a.click();
  URL.revokeObjectURL(a.href);
}

function toggleBookingDone(chkKey){
  const s = store.get('chk', {});
  s[chkKey] = !s[chkKey];
  store.set('chk', s);
  renderBookings();
  renderChecks();
  renderBanner();
  renderDay();
  buildNav();
}

function renderBookings(){
  const q = ($('#bq')?.value || '').trim().toLowerCase();
  const notesMap = store.get('bk_notes', {});
  const subChkMap = store.get('bk_sub', {});

  let doneCnt = 0, openWaitCnt = 0, upcomingCnt = 0;
  BOOKINGS.forEach(b => {
    const st = getBookingStatus(b);
    if (st.isDone) doneCnt++;
    else if (st.isOpen) openWaitCnt++;
    else upcomingCnt++;
  });
  const pct = Math.round(doneCnt / BOOKINGS.length * 100);

  $('#bookingDash').innerHTML = `
    <div class="bk-hero">
      <div class="bk-hero-top">
        <div>
          <div class="bk-hero-title">已訂 <b>${doneCnt} / ${BOOKINGS.length}</b> 項（${pct}%）</div>
          <div class="bk-hero-sub">🔥 待訂 ${openWaitCnt} · ⏳ 即將 ${upcomingCnt} · ⏰ 皆對照台／日時間</div>
        </div>
        <button type="button" class="exp-rate-pill" id="exportIcsBtn">📥 匯出 .ics</button>
      </div>
      <div class="bk-hero-prog" aria-hidden="true"><i style="width:${pct}%"></i></div>
    </div>`;

  $('#exportIcsBtn').onclick = downloadAllBookingICS;

  const stOpts = [
    ['all', `全部 (${BOOKINGS.length})`],
    ['open', `🔥 待訂 (${openWaitCnt})`],
    ['upcoming', `⏳ 即將 (${upcomingCnt})`],
    ['done', `✅ 已訂 (${doneCnt})`]
  ];
  $('#bookingStatusFilters').innerHTML = stOpts.map(([k,l]) => `<button data-bs="${k}" aria-pressed="${state.bookingStatus===k}">${esc(l)}</button>`).join('');
  $('#bookingStatusFilters').querySelectorAll('button').forEach(b => b.onclick = () => { state.bookingStatus = b.dataset.bs; renderBookings(); });

  const cats = ['all', '鐵道車票', '高速巴士', '交通／租車', '景點門票', '餐飲預約'];
  $('#bookingCatFilters').innerHTML = cats.map(c => `<button data-bc="${c}" aria-pressed="${state.bookingCat===c}">${c==='all'?'全部類別':esc(c)}</button>`).join('');
  $('#bookingCatFilters').querySelectorAll('button').forEach(b => b.onclick = () => { state.bookingCat = b.dataset.bc; renderBookings(); });

  const filtered = BOOKINGS.filter(b => {
    if (state.bookingDay !== 'all' && !b.days.includes(+state.bookingDay)) return false;
    const st = getBookingStatus(b);
    if (state.bookingStatus === 'open' && (st.isDone || !st.isOpen)) return false;
    if (state.bookingStatus === 'upcoming' && (st.isDone || st.isOpen)) return false;
    if (state.bookingStatus === 'done' && !st.isDone) return false;
    if (state.bookingCat !== 'all' && b.cat !== state.bookingCat) return false;
    if (q){
      const hay = `${b.id} ${b.title} ${b.dayLabel} ${b.openTwt} ${b.openJst} ${b.note} ${b.cat} ${(b.subItems||[]).join(' ')} ${notesMap[b.id]||''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (state.bookingDay !== 'all'){
    $('#bookingDayBar').innerHTML = `<div class="box" style="margin-bottom:.75rem;display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap;border-left:4px solid var(--primary)">
      <span>📅 目前僅顯示 <b>Day ${esc(state.bookingDay)}</b> 相關預訂（共 ${filtered.length} 項）</span>
      <button type="button" class="btn primary" id="clearBookingDayBtn" style="margin:0">顯示全部 ${BOOKINGS.length} 項預訂</button>
    </div>`;
    $('#clearBookingDayBtn').onclick = () => { state.bookingDay = 'all'; renderBookings(); };
  } else {
    $('#bookingDayBar').innerHTML = '';
  }

  $('#bookingGrid').innerHTML = filtered.map(b => {
    const st = getBookingStatus(b);
    const borderCol = st.isDone ? 'var(--now)' : st.isOpen ? 'var(--urgent)' : 'var(--upcoming)';
    const statusBadge = st.isDone
      ? `<span class="pill done">✅ 已完成預訂</span>`
      : st.isOpen
        ? `<span class="pill urgent">🔥 已開放！立即可訂</span>`
        : `<span class="pill upcoming">⏳ 倒數 ${st.daysUntilOpen} 天開放（${esc(b.openDate.replace(/-/g,'/'))}）</span>`;

    const subHtml = b.subItems ? `
      <div class="sub-chk-grid">
        ${b.subItems.map((si, idx) => {
          const sk = `${b.id}-${idx}`;
          return `<label><input type="checkbox" data-sub="${sk}" ${subChkMap[sk]?'checked':''}> <span style="${subChkMap[sk]?'text-decoration:line-through;color:var(--muted)':''}">${esc(si)}</span></label>`;
        }).join('')}
      </div>` : '';

    return `<div class="box bk-card ${st.isDone?'is-done':''}" id="bk-card-${b.id}" style="border-top:5px solid ${borderCol}">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:.4rem;flex-wrap:wrap">
        <div style="display:flex;gap:.35rem;align-items:center;flex-wrap:wrap">
          <span class="pill area">#${b.id}</span>
          <span class="pill">${esc(b.dayLabel)}</span>
        </div>
        ${statusBadge}
      </div>

      <h3 style="margin:.15rem 0 .2rem;font-size:1.05rem">${esc(b.title)}</h3>
      <div style="font-size:.86rem;color:var(--muted);margin-bottom:.35rem">⏰ 最早可訂：<b style="color:var(--primary)">${esc(b.openTwt.split('\n')[0])}</b></div>

      <div class="bk-actions" style="margin-top:0">
        <button type="button" class="btn btn-sm ${st.isDone?'done-btn':'accent'}" data-toggle-bk="${b.chkKey}">
          ${st.isDone ? '✅ 已預訂' : '📌 標記已訂'}
        </button>
        <a class="btn primary btn-sm" href="${esc(b.url)}" target="_blank" rel="noopener">🔗 官網 ↗</a>
        ${b.tel ? `<a class="btn btn-sm" href="tel:${esc(b.tel)}">📞 電話</a>` : ''}
      </div>

      <details style="margin-top:.45rem;border-top:1px dashed var(--line);padding-top:.4rem">
        <summary style="cursor:pointer;font-size:.86rem;font-weight:700;color:var(--primary)">展開詳情、預約備註 ＆ 加入行事曆 ▼</summary>
        <div style="margin-top:.5rem;display:grid;gap:.45rem">
          <div style="font-size:.84rem;color:var(--muted)">🕘 日本時間：${esc(b.openJst)}</div>
          <div class="tip" style="margin-top:0">💡 ${esc(b.note)}</div>
          ${subHtml}
          <input type="text" class="bk-note-inp" data-note-id="${b.id}" value="${esc(notesMap[b.id]||'')}" placeholder="📝 填寫預約編號、訂位時間或備忘錄（自動儲存）…">
          <div class="bk-actions" style="margin-top:0">
            ${b.days.slice(0,4).map(dNum => `<button type="button" class="btn btn-sm" onclick="go('day');selectDay(${dNum-1})">Day ${dNum} →</button>`).join('')}
            ${(b.cal || []).map(ev => `<a class="btn btn-sm" href="${gcalUrl(ev, b)}" target="_blank" rel="noopener">📅 行事曆（${esc(ev.label)}）</a>`).join('')}
            ${(b.ttIds || []).map(tid => `<button type="button" class="btn btn-sm" onclick="jumpToTimetableId(${tid})">🕒 時刻表 #${tid}</button>`).join('')}
          </div>
        </div>
      </details>
    </div>`;
  }).join('') || '<div class="box">沒有符合篩選條件的預訂項目。</div>';

  $('#bookingGrid').querySelectorAll('[data-toggle-bk]').forEach(btn => {
    btn.onclick = () => toggleBookingDone(btn.dataset.toggleBk);
  });
  $('#bookingGrid').querySelectorAll('[data-note-id]').forEach(inp => {
    inp.oninput = () => {
      const m = store.get('bk_notes', {});
      m[inp.dataset.noteId] = inp.value;
      store.set('bk_notes', m);
    };
  });
  $('#bookingGrid').querySelectorAll('[data-sub]').forEach(chk => {
    chk.onchange = () => {
      const m = store.get('bk_sub', {});
      m[chk.dataset.sub] = chk.checked;
      store.set('bk_sub', m);
      renderBookings();
    };
  });
}
$('#bq').addEventListener('input', renderBookings);

/* =========================================================
   交通時刻表與常用連結查詢功能 (v-transit)
   ========================================================= */
function buildQuickScheduleTable(){
  $('#quickTtWrap').innerHTML = `
    <table class="quick-tt-table">
      <thead>
        <tr><th>行程日</th><th>區間／路線</th><th>主班次（時刻與月台）</th><th>備案班次</th><th>購票／IC卡注意事項</th></tr>
      </thead>
      <tbody>
        ${QUICK_SCHEDULES.map(s => `<tr>
          <td style="font-weight:800;white-space:nowrap">${esc(s.day)}</td>
          <td style="font-weight:700">${esc(s.route)}</td>
          <td style="white-space:pre-line">${esc(s.main)}</td>
          <td style="white-space:pre-line;color:var(--muted)">${esc(s.backup)}</td>
          <td>${esc(s.note)}</td>
        </tr>`).join('')}
      </tbody>
    </table>`;
}
$('#toggleQuickTtBtn').onclick = () => {
  const el = $('#quickTtWrap');
  const opening = el.style.display === 'none';
  el.style.display = opening ? 'block' : 'none';
  $('#toggleQuickTtBtn').textContent = opening ? '收合 ▲' : '展開 ▼';
};

const TT_CAT_ICONS = {
  '國際航班':'✈️',
  '新幹線':'🚅',
  '鐵道電車':'🚆',
  '高速／接駁巴士':'🚌',
  '觀光／路線公車':'🚏',
  '自駕／景點設施':'🚗'
};

function scrollActiveFilter(sel){
  const box = $(sel);
  if (!box || typeof box.scrollTo !== 'function') return;
  const active = box.querySelector('[aria-pressed="true"]');
  if (active) box.scrollTo({left: Math.max(0, active.offsetLeft - box.offsetLeft - (box.clientWidth - active.offsetWidth)/2), behavior: 'smooth'});
}

function renderTimetables(){
  const q = ($('#tq')?.value || '').trim().toLowerCase();

  const catCounts = {};
  TIMETABLES.forEach(t => catCounts[t.cat] = (catCounts[t.cat]||0) + 1);
  const catOpts = [
    ['all', `全部 (${TIMETABLES.length})`],
    ...Object.keys(TT_CAT_ICONS).map(c => [c, `${TT_CAT_ICONS[c]} ${c} (${catCounts[c]||0})`])
  ];
  $('#transitCatFilters').innerHTML = catOpts.map(([k,l]) => `<button data-tc="${k}" aria-pressed="${state.transitCat===k}">${esc(l)}</button>`).join('');
  $('#transitCatFilters').querySelectorAll('button').forEach(b => b.onclick = () => { state.transitCat = b.dataset.tc; renderTimetables(); });

  const dayOpts = [['all','全部'], ...DAYS.map((d,i) => [String(i+1), `${+d.date.slice(5,7)}/${+d.date.slice(8,10)}`])];
  $('#transitDayFilters').innerHTML = dayOpts.map(([k,l]) => `<button data-td="${k}" aria-pressed="${state.transitDay===k}">${esc(l)}</button>`).join('');
  $('#transitDayFilters').querySelectorAll('button').forEach(b => b.onclick = () => { state.transitDay = b.dataset.td; renderTimetables(); });
  scrollActiveFilter('#transitDayFilters');

  const filtered = TIMETABLES.filter(t => {
    if (state.transitCat !== 'all' && t.cat !== state.transitCat) return false;
    if (state.transitDay !== 'all' && !t.days.includes(+state.transitDay)) return false;
    if (q){
      const hay = `#${t.id} ${t.id} ${t.cat} ${t.title} ${t.dayLabel} ${t.note} ${t.url}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  $('#transitGrid').innerHTML = filtered.map(t => {
    const isPdf = /\.pdf($|\?)/i.test(t.url);
    let domain = '';
    try { domain = new URL(t.url).hostname; } catch(e) { domain = t.url; }
    const bk = t.bkId ? BOOKINGS.find(b => b.id === t.bkId) : null;
    const ic = TT_CAT_ICONS[t.cat] || '🚆';

    return `<div class="box tt-card" id="tt-card-${t.id}" style="border-left:5px solid var(--c-transit)">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:.4rem;flex-wrap:wrap">
        <div style="display:flex;gap:.35rem;align-items:center;flex-wrap:wrap">
          <span class="pill area">#${t.id}</span>
          <span class="pill">${ic} ${esc(t.cat)}</span>
          ${isPdf ? '<span class="pill urgent">📄 PDF 時刻表</span>' : ''}
        </div>
        <span class="pill">📅 ${esc(t.dayLabel)}</span>
      </div>

      <h3 style="margin:.15rem 0 0;font-size:1.05rem">${esc(t.title)}</h3>
      <div style="font-size:.9rem;color:var(--muted)">${esc(t.note)}</div>

      <div class="tt-card-foot">
        <a class="btn primary btn-sm" href="${esc(t.url)}" target="_blank" rel="noopener">🕒 時刻表／官網 ↗</a>
        <div class="tt-card-links">
          ${t.days.map(dNum => `<button type="button" class="tt-link-chip" onclick="go('day');selectDay(${dNum-1})">Day ${dNum} →</button>`).join('')}
          ${bk ? `<button type="button" class="tt-link-chip" onclick="jumpToBooking(${bk.id})">🎟️ #${bk.id}</button>` : ''}
        </div>
      </div>
    </div>`;
  }).join('') || '<div class="box">沒有符合篩選條件的交通時刻表，請嘗試切換天數、分類或清除搜尋關鍵字。</div>';
}
$('#tq').addEventListener('input', renderTimetables);

/* =========================================================
   推薦餐廳指南 (v-food) & 點餐溝通卡
   ========================================================= */
const phraseState = { cat: 'all', adults: 4, kids: 2, currentJa: '' };

function getDynamicPhrase(p){
  const a = phraseState.adults, k = phraseState.kids, total = a + k;
  if (p.id === 'party') {
    const zhSub = k > 0 ? `大人 ${a} 位、小孩 ${k} 位` : `大人 ${a} 位`;
    const jaSub = k > 0 ? `大人${a}名、子ども${k}名` : `大人${a}名`;
    const roSub = k > 0 ? `otona ${a}-mei, kodomo ${k}-mei` : `otona ${a}-mei`;
    return {
      ...p,
      zh: `我們共 ${total} 位（${zhSub}），請問可以安排座位嗎？`,
      ja: `全部で${total}名です（${jaSub}）。座れますか？`,
      ro: `Zenbu de ${total}-mei desu (${roSub}). Suwaremasu ka?`
    };
  }
  if (p.id === 'together') {
    return {
      ...p,
      zh: `我們有 ${total} 位，請問可以安排相鄰座位或併桌嗎？`,
      ja: `${total}名なのですが、近くの席かテーブルをくっつけることはできますか？`,
      ro: `${total}-mei nano desu ga, chikaku no seki ka teeburu wo kuttsukeru koto wa dekimasu ka?`
    };
  }
  return p;
}

function openPhraseModal(p){
  if (!p) return;
  const item = getDynamicPhrase(p);
  phraseState.currentJa = item.ja;
  $('#mZh').textContent = item.zh;
  $('#mJa').textContent = item.ja;
  $('#mRo').textContent = item.ro || '';
  $('#phraseModal').classList.add('open');
}

function speakJapanese(text){
  if (!text) return;
  if (!('speechSynthesis' in window)) { showToast('此瀏覽器不支援語音朗讀'); return; }
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  } catch (e) {
    showToast('語音播放失敗，可直接出示畫面給店員看');
  }
}

$('#adultMinus').onclick = () => { phraseState.adults = Math.max(1, phraseState.adults - 1); renderPhraseHub(); };
$('#adultPlus').onclick = () => { phraseState.adults = Math.min(12, phraseState.adults + 1); renderPhraseHub(); };
$('#kidMinus').onclick = () => { phraseState.kids = Math.max(0, phraseState.kids - 1); renderPhraseHub(); };
$('#kidPlus').onclick = () => { phraseState.kids = Math.min(10, phraseState.kids + 1); renderPhraseHub(); };
$('#speakPhraseBtn').onclick = () => speakJapanese(phraseState.currentJa);
$('#closeModalBtn').onclick = () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); $('#phraseModal').classList.remove('open'); };
$('#phraseModal').onclick = e => { if (e.target === $('#phraseModal')) { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); $('#phraseModal').classList.remove('open'); } };

function renderFood(){
  const q = ($('#fq')?.value || '').trim().toLowerCase();
  const dayOpts = [['all','全部'], ...DAYS.map((d,i) => [String(i), `${+d.date.slice(5,7)}/${+d.date.slice(8,10)}`])];
  $('#foodDayFilters').innerHTML = dayOpts.map(([k,l]) => `<button data-fd="${k}" aria-pressed="${state.foodDay===k}">${esc(l)}</button>`).join('');
  $('#foodDayFilters').querySelectorAll('button').forEach(b => b.onclick = () => { state.foodDay = b.dataset.fd; renderFood(); });
  scrollActiveFilter('#foodDayFilters');

  const tierOpts = [['all','全部'], ['A','A 級名店'], ['B','B 級連鎖'], ['C','C 級快餐'], ['tablet','📱 中文點餐']];
  $('#foodTierFilters').innerHTML = tierOpts.map(([k,l]) => `<button data-ft="${k}" aria-pressed="${state.foodTier===k}">${esc(l)}</button>`).join('');
  $('#foodTierFilters').querySelectorAll('button').forEach(b => b.onclick = () => { state.foodTier = b.dataset.ft; renderFood(); });

  const cards = [];
  DAYS.forEach((d,i) => {
    if (state.foodDay !== 'all' && +state.foodDay !== i) return;
    (d.meals || []).forEach(m => {
      const filteredTiers = m.tiers.map(tb => {
        if (state.foodTier === 'A' && tb.tier !== 'A') return null;
        if (state.foodTier === 'B' && tb.tier !== 'B') return null;
        if (state.foodTier === 'C' && tb.tier !== 'C') return null;
        const list = tb.list.filter(r => {
          const hay = (r.name + ' ' + r.note + ' ' + m.slot + ' ' + tb.label).toLowerCase();
          if (state.foodTier === 'tablet' && !/(中文|繁中|平板|多語|觸控|售票機)/.test(hay)) return false;
          if (q && !hay.includes(q)) return false;
          return true;
        });
        return list.length ? {...tb, list} : null;
      }).filter(Boolean);

      if (filteredTiers.length){
        cards.push(`<div class="box" style="border-top:5px solid ${d.color}">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:.4rem;flex-wrap:wrap;margin-bottom:.35rem">
            <span class="pill area">Day ${i+1}・${fmtDate(d)}</span>
            <button class="btn" style="margin:0;padding:.2rem .55rem;font-size:.8rem" onclick="go('day');selectDay(${i})">查看當日行程 →</button>
          </div>
          <h3>${esc(m.slot)}</h3>
          ${renderMealTiersHTML({tiers: filteredTiers}, d.map)}
        </div>`);
      }
    });
  });

  $('#foodGrid').classList.toggle('food-single', cards.length === 1);
  $('#foodGrid').innerHTML = cards.join('') || '<div class="box">沒有符合篩選條件的推薦餐廳，請嘗試切換篩選或清除關鍵字。</div>';
}
$('#fq').addEventListener('input', renderFood);

/* =========================================================
   全站搜尋彈窗（涵蓋行程、訂票提醒、時刻表與推薦餐廳）
   ========================================================= */
$('#q').addEventListener('input', e => {
  const q = e.target.value.trim();
  if (!q){ $('#results').innerHTML=''; $('#searchHint').style.display=''; return; }
  const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'gi');
  const hits = [];
  DAYS.forEach((d,i) => {
    d.parsed.forEach(p => {
      const fullTxt = p.text + ' ' + p.tips.map(t=>t.text).join(' ');
      if (re.test(fullTxt)) hits.push({kind:'day', i, label:`Day ${i+1}・${fmtDate(d)}・${p.time}`, icon:p.icon, txt:p.text.replace(/[【】]/g,'') + (p.tips.length ? '（' + p.tips.map(t=>t.text).join('；') + '）' : '')});
      re.lastIndex=0;
    });
    (d.meals || []).forEach(m => m.tiers.forEach(tb => tb.list.forEach(r => {
      const rTxt = `${m.slot}｜${r.name}（${r.note}）`;
      if (re.test(rTxt)) hits.push({kind:'day', i, label:`Day ${i+1}・${fmtDate(d)}・推薦餐廳`, icon:'🍽️', txt:rTxt});
      re.lastIndex=0;
    })));
  });
  BOOKINGS.forEach(b => {
    const bTxt = `訂票提醒 #${b.id}｜${b.title}（最早可訂：${b.openTwt}｜${b.note}）`;
    if (re.test(bTxt)) hits.push({kind:'booking', id:b.id, label:`訂票與預訂清單 #${b.id}・${b.dayLabel}`, icon:'🎟️', txt:bTxt});
    re.lastIndex=0;
  });
  TIMETABLES.forEach(t => {
    const tTxt = `時刻表 #${t.id} [${t.cat}]｜${t.title}（${t.note}）`;
    if (re.test(tTxt)) hits.push({kind:'transit', id:t.id, label:`交通時刻表 #${t.id}・${t.dayLabel}`, icon:'🚆', txt:tTxt});
    re.lastIndex=0;
  });
  const highlight = txt => {
    let out = '', last = 0, m;
    re.lastIndex = 0;
    while ((m = re.exec(txt)) !== null) {
      out += esc(txt.slice(last, m.index)) + `<mark>${esc(m[0])}</mark>`;
      last = m.index + m[0].length;
      if (!m[0].length) re.lastIndex++;
    }
    return out + esc(txt.slice(last));
  };
  $('#searchHint').style.display = 'none';
  $('#results').innerHTML = `<p style="margin:.2rem 0 .5rem"><b>找到 ${hits.length} 筆結果</b></p>` + hits.map((h, idx) =>
    `<button class="r" data-hit="${idx}"><small>${esc(h.label)}</small><br>${h.icon} ${highlight(h.txt)}</button>`).join('');
  $('#results').querySelectorAll('.r').forEach(b => b.onclick = () => {
    const h = hits[+b.dataset.hit];
    $('#searchModal').classList.remove('open');
    if (h.kind === 'booking') jumpToBooking(h.id);
    else if (h.kind === 'transit') jumpToTimetableId(h.id);
    else { go('day'); selectDay(h.i); }
  });
});

/* =========================================================
   住宿 ＆ 大行李動線
   ========================================================= */
function renderHotels(){
  const hotelCards = HOTELS.map(h => `
    <div class="box hotel-card">
      <div class="hotel-top">
        <span class="pill area">🏨 ${esc(h.nights)}</span>
        <span class="hotel-dates">${esc(h.dates)} · ${esc(h.area)}</span>
      </div>
      <div class="hotelname" style="margin:.35rem 0 .45rem">${esc(h.name)}</div>
      <div class="hotel-meta">
        ${h.address ? `<div class="hotel-meta-row"><span>📍 ${esc(h.address)}</span><button type="button" class="hotel-copy" data-copy="${esc(h.address)}" title="複製地址">📋</button></div>` : ''}
        ${h.tel ? `<div class="hotel-meta-row"><a href="tel:${esc(h.tel.replace(/[^+\d]/g,''))}">📞 ${esc(h.tel)}</a></div>` : ''}
      </div>
      <div class="hotel-note">💡 ${esc(h.note)}</div>
      <div class="hotel-btns">
        <a class="btn primary" href="${mapUrl(h.name)}" target="_blank" rel="noopener">🗺️ Google 地圖</a>
        <button type="button" class="btn" onclick="openTaxiModal('${h.key}')">🚖 秀給司機看</button>
      </div>
    </div>`).join('');

  const luggageCard = `
    <div class="box" style="grid-column:1 / -1;border-left:5px solid var(--c-hotel)">
      <h3>🧳 全程大行李寄送 ＆ 寄放關鍵動線總整理</h3>
      <ul>
        <li><b>Day 1（2/1）抵達上野：</b>京成上野站步行至 MIMARU 東京 上野 NORTH 約 15 分鐘，推大行李可分搭 2 台計程車（車程約 5 分鐘，約 ¥800／台）。</li>
        <li><b>Day 2（2/2）第 2 晚分裝行李：</b>提前整理大行李，分為<b>「輕井澤 2 晚使用」</b>及<b>「明日寄送至河口湖旅館」</b>2 類。</li>
        <li><b>Day 3（2/3）10:00–10:35【極重要！西館寄放＋黑貓宅急便寄河口湖】：</b>09:43 抵輕井澤站後，於南口 (B-1) 搭 10:00 王子接駁車（棕線）至<b>【輕井澤王子大飯店 西館 (B-12M)】</b>，於櫃檯寄放當日行李，並順便交寄黑貓宅急便大行李往<b>【Fuji View Hotel】</b>（指定 2/5 送達），隨後 10:35 直接由西館搭計程車前往星野榆樹街！（若上午有未寄出之黑貓大行李，可於 15:30 回西館 Check-in 時補寄）。</li>
        <li><b>Day 5（2/5）東京站八重洲南口轉乘：</b>因大行李已先寄往河口湖，全家輕裝由北陸新幹線（20–23 號月台）走<b>「八重洲南口改札」</b>出站，正前方即為 1F 屋外 JR 高速巴士總站（搭 11:10 富士急高速巴士 119 號）。</li>
        <li><b>Day 8（2/8）08:15 河口湖還車動線：</b>先開車送家人與大行李至<b>【河口湖站】</b>候車，駕駛再開往「ENEOS セルフ富士河口湖SS」加滿油，08:45 於 Toyota 富士河口湖店還車後，輕裝步行約 7 分鐘回車站會合搭 09:30 高速巴士 8 號。</li>
      </ul>
    </div>`;

  $('#hotels').innerHTML = hotelCards + luggageCard;
  $('#hotels').querySelectorAll('[data-copy]').forEach(b => b.onclick = () => {
    navigator.clipboard?.writeText(b.dataset.copy).then(() => showToast('📋 已複製飯店地址'), () => showToast('複製失敗'));
  });
}

/* =========================================================
   旅遊建議攜帶物品 ＆ 自訂清單（住宿＆資訊子分頁）
   ========================================================= */
function renderChecks(){
  const done = store.get('chk', {});
  const custom = store.get('custom_chk', []);
  const groups = [];

  groups.push({
    title:'🎒 建議攜帶物品',
    open: true,
    items: PACKING.map((t,j) => ({id:`p${j}`, t}))
  });
  if (custom.length){
    groups.push({
      title:'⭐ 自訂攜帶與待辦項目',
      open: true,
      items: custom.map((t,j) => ({id:`c-${j}`, t, customIdx: j}))
    });
  }

  $('#filterUncheckedBtn').textContent = state.onlyUnchecked ? '顯示全部項目' : '僅看未完成';
  $('#filterUncheckedBtn').classList.toggle('primary', state.onlyUnchecked);

  $('#checks').innerHTML = groups.map(g => {
    const visibleItems = state.onlyUnchecked ? g.items.filter(it => !done[it.id]) : g.items;
    if (!visibleItems.length) return '';
    const doneCnt = g.items.filter(it => done[it.id]).length;
    const isOpen = g.open || state.onlyUnchecked;
    return `<div class="box"><details ${isOpen ? 'open' : ''}>
      <summary style="cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:.4rem;font-weight:800;font-size:1rem;color:var(--primary)">
        <span>${esc(g.title)}</span>
        <span class="pill ${doneCnt===g.items.length?'done':''}">${doneCnt} / ${g.items.length}</span>
      </summary>
      <div class="pack-list">${visibleItems.map(it =>
        `<label class="check ${done[it.id]?'done':''}">
          <input type="checkbox" data-id="${it.id}" ${done[it.id]?'checked':''}>
          <span>${esc(it.t)}</span>
          ${it.customIdx !== undefined ? `<button type="button" class="del-btn" data-del="${it.customIdx}" title="刪除此自訂項目">🗑️</button>` : ''}
        </label>`).join('')}</div>
    </details></div>`;
  }).join('') || '<div class="box">🎉 太棒了！所有攜帶物品皆已打包完成！</div>';

  const allIds = groups.flatMap(g => g.items.map(it => it.id));
  const total = allIds.length;
  const upd = () => {
    const s = store.get('chk', {});
    const c = allIds.filter(id => s[id]).length;
    $('#progtxt').textContent = `完成 ${c} / ${total}（${total ? Math.round(c/total*100) : 0}%）`;
    $('#progbar').style.width = (total ? (c/total*100) : 0) + '%';
  };
  $('#checks').querySelectorAll('input[type=checkbox]').forEach(inp => inp.onchange = () => {
    const s = store.get('chk', {}); s[inp.dataset.id] = inp.checked; store.set('chk', s);
    if (state.onlyUnchecked) renderChecks();
    else { inp.closest('.check').classList.toggle('done', inp.checked); upd(); }
  });
  $('#checks').querySelectorAll('[data-del]').forEach(btn => btn.onclick = e => {
    e.preventDefault();
    const idx = +btn.dataset.del;
    const arr = store.get('custom_chk', []);
    arr.splice(idx, 1);
    store.set('custom_chk', arr);
    renderChecks();
  });
  upd();
}

$('#addCustomChkBtn').onclick = () => {
  const inp = $('#customChkInput');
  const v = inp.value.trim();
  if (!v) return;
  const arr = store.get('custom_chk', []);
  arr.push(v);
  store.set('custom_chk', arr);
  inp.value = '';
  renderChecks();
};
$('#customChkInput').addEventListener('keydown', e => { if (e.key === 'Enter') $('#addCustomChkBtn').click(); });
$('#filterUncheckedBtn').onclick = () => { state.onlyUnchecked = !state.onlyUnchecked; renderChecks(); };
$('#resetChk').onclick = () => {
  if (confirm('確定要清除所有攜帶物品的勾選紀錄嗎？')){
    const s = store.get('chk', {});
    Object.keys(s).forEach(k => { if (/^(p\d+|c-\d+)$/.test(k)) delete s[k]; });
    store.set('chk', s);
    renderChecks();
  }
};

/* =========================================================
   家族進度離線同步（免帳號／LINE 群組貼上同步）
   ========================================================= */
function encodeSyncCode(){
  const payload = {
    v: 1,
    chk: store.get('chk', {}),
    bk_notes: store.get('bk_notes', {}),
    bk_sub: store.get('bk_sub', {}),
    custom_chk: store.get('custom_chk', [])
  };
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let bin = '';
  bytes.forEach(b => bin += String.fromCharCode(b));
  return 'KANTO2027:' + btoa(bin);
}

function applySyncCode(raw){
  const s = (raw || '').trim();
  const m = s.match(/KANTO2027:([A-Za-z0-9+/=]+)/);
  if (!m) return {ok:false, msg:'代碼格式不正確，請確認有完整貼上「KANTO2027:...」代碼'};
  try {
    const bin = atob(m[1]);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const data = JSON.parse(new TextDecoder().decode(bytes));
    if (!data || typeof data !== 'object') throw new Error('invalid');
    if (data.chk && typeof data.chk === 'object') store.set('chk', data.chk);
    if (data.bk_notes && typeof data.bk_notes === 'object') store.set('bk_notes', data.bk_notes);
    if (data.bk_sub && typeof data.bk_sub === 'object') store.set('bk_sub', data.bk_sub);
    if (Array.isArray(data.custom_chk)) store.set('custom_chk', data.custom_chk);
    renderBookings();
    renderChecks();
    renderDay();
    renderBanner();
    buildNav();
    return {ok:true, msg:'✅ 已成功匯入家人進度並同步全部頁面！'};
  } catch (e) {
    return {ok:false, msg:'代碼解析失敗，請確認未遺漏任何字元'};
  }
}

/* =========================================================
   緊急聯絡、工具與離線設定（v-info）
   ========================================================= */
function renderInfo(){
  const isDark = document.documentElement.dataset.theme === 'dark';
  $('#infoGrid').innerHTML = `
  <div class="box"><h3>🚨 日本緊急聯絡 ＆ 實用連結</h3>
    <div class="sos-pills">
      <a class="sos-pill" href="tel:110"><span>👮 警察局</span><b>110</b></a>
      <a class="sos-pill" href="tel:119"><span>🚑 救護／消防</span><b>119</b></a>
      <a class="sos-pill wide" href="tel:+81-3-3280-7811"><span>🆘 駐日代表處緊急電話</span><b>03-3280-7811</b></a>
    </div>
    <ul style="margin:.5rem 0 .6rem;padding-left:1.15rem;font-size:.9rem">
      <li><a href="https://www.vjw.digital.go.jp/" target="_blank" rel="noopener">Visit Japan Web（入境手續官網）</a></li>
      <li><a href="https://docs.google.com/spreadsheets/d/1vtYwFh8HCuyi-NK5nKBQ1AQyYui49a9xOxsQALGGbRw/edit" target="_blank" rel="noopener">原始行程表（Google 試算表）</a></li>
    </ul>
    <div style="display:flex;gap:.45rem;flex-wrap:wrap">
      <button class="btn btn-sm" onclick="window.print()">🖨️ 列印行程表</button>
      <button class="btn btn-sm" id="shareAppBtn">📤 分享給家人</button>
    </div></div>

  <div class="box"><h3>⛅ 當地即時天氣 ＆ 富士山影像</h3>
    <div style="font-size:.85rem;color:var(--muted);margin-bottom:.5rem">出發前與河口湖自駕清晨快速確認氣溫、降雪與能見度：</div>
    <div style="display:flex;gap:.4rem;flex-wrap:wrap">
      <a class="btn btn-sm" href="https://tenki.jp/forecast/3/16/4410/13106/" target="_blank" rel="noopener">🌤️ 東京（上野）↗</a>
      <a class="btn btn-sm" href="https://tenki.jp/forecast/3/23/4820/20321/" target="_blank" rel="noopener">❄️ 輕井澤 ↗</a>
      <a class="btn btn-sm" href="https://tenki.jp/forecast/3/22/4920/19430/" target="_blank" rel="noopener">🗻 富士河口湖 ↗</a>
      <a class="btn primary btn-sm" href="https://fujisantotomoni.jp/livecamera/" target="_blank" rel="noopener">📹 富士山即時影像 ↗</a>
      <a class="btn btn-sm" href="https://fujisan.ne.jp/" target="_blank" rel="noopener">🗻 河口湖觀光網 ↗</a>
    </div></div>

  <div class="box"><h3>👨‍👩‍👦‍👦 家族進度同步（離線免帳號）</h3>
    <div style="font-size:.85rem;color:var(--muted);margin-bottom:.5rem">將本機的「訂票完成、預約備註、攜帶物品與每日準備」打包成代碼，貼到 LINE 群組即可一鍵同步。</div>
    <div style="display:flex;gap:.45rem;flex-wrap:wrap">
      <button type="button" class="btn primary btn-sm" id="exportSyncBtn">📤 複製進度代碼</button>
      <button type="button" class="btn btn-sm" id="toggleImportSyncBtn">📥 匯入家人代碼</button>
    </div>
    <div id="syncImportWrap" style="display:none;margin-top:.55rem;padding-top:.55rem;border-top:1px dashed var(--line)">
      <textarea id="syncCodeInp" rows="3" placeholder="貼上家人分享的 KANTO2027:... 代碼" style="width:100%;font:inherit;font-size:.84rem;padding:.45rem .6rem;border-radius:9px;border:1px solid var(--line);background:var(--surface2);color:var(--text);resize:vertical"></textarea>
      <div style="display:flex;gap:.4rem;margin-top:.4rem;flex-wrap:wrap">
        <button type="button" class="btn primary btn-sm" id="applySyncBtn">✅ 確認套用</button>
        <button type="button" class="btn btn-sm" id="cancelSyncBtn">取消</button>
      </div>
    </div></div>

  <div class="box"><h3>🔧 顯示設定 ＆ 離線狀態</h3>
    <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.6rem">
      <button class="btn primary btn-sm" id="searchBtn">🔍 全站搜尋</button>
      <button class="btn btn-sm" id="themeBtn">${isDark ? '☀️ 淺色模式' : '🌙 深色模式'}</button>
      <button class="btn btn-sm" id="openCarNaviFromInfoBtn">🚗 河口湖車機導航</button>
    </div>
    <div class="pwa-mini-list">
      <div><span>網路</span><b id="infoNetStatus">${navigator.onLine ? '✅ 在線' : '📴 離線模式'}</b></div>
      <div><span>模式</span><b>${(window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) ? '✅ 獨立 App' : '🌐 瀏覽器分頁'}</b></div>
      <div><span>快取</span><span id="infoSwStatus">${esc(pwaState.swText)}</span></div>
    </div>
    <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.55rem">
      <button class="btn primary btn-sm" id="infoInstallBtn">📲 安裝 App</button>
      <button class="btn btn-sm" id="refreshCacheBtn">🔄 檢查更新</button>
    </div></div>`;

  $('#searchBtn').onclick = openSearchModal;
  $('#themeBtn').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  $('#openCarNaviFromInfoBtn').onclick = () => openGuideModal('carNavi');
  $('#exportSyncBtn').onclick = async () => {
    const code = encodeSyncCode();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(code);
        showToast('✅ 已複製進度代碼！請貼到 LINE 群組給家人');
        return;
      } catch (e) {}
    }
    const wrap = $('#syncImportWrap');
    if (wrap) {
      wrap.style.display = 'block';
      $('#syncCodeInp').value = code;
      $('#syncCodeInp').focus();
      $('#syncCodeInp').select();
      showToast('已產生進度代碼，請長按全選複製');
    }
  };
  $('#toggleImportSyncBtn').onclick = () => {
    const wrap = $('#syncImportWrap');
    const open = wrap.style.display !== 'none';
    wrap.style.display = open ? 'none' : 'block';
    if (!open) { $('#syncCodeInp').value = ''; $('#syncCodeInp').focus(); }
  };
  $('#cancelSyncBtn').onclick = () => { $('#syncImportWrap').style.display = 'none'; };
  $('#applySyncBtn').onclick = () => {
    const res = applySyncCode($('#syncCodeInp').value);
    showToast(res.msg);
    if (res.ok) {
      $('#syncCodeInp').value = '';
      $('#syncImportWrap').style.display = 'none';
    }
  };
  $('#infoInstallBtn').onclick = () => {
    if (pwaState.deferredPrompt) {
      pwaState.deferredPrompt.prompt();
      pwaState.deferredPrompt.userChoice.finally(() => { pwaState.deferredPrompt = null; });
    } else {
      openPwaModal();
    }
  };
  $('#shareAppBtn').onclick = async () => {
    const shareData = {
      title: '2027 日本關東 10天9夜 家族旅行助理',
      text: '2027/2/1–2/10 關東家族旅行每日行程、訂票提醒、交通時刻表查詢、推薦餐廳與攜帶清單',
      url: location.href.split('#')[0]
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch(e){}
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
      alert('已複製網址，可直接貼到 LINE 群組分享給家人！');
    }
  };
  $('#refreshCacheBtn').onclick = async () => {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        await reg.update();
        if (reg.waiting) reg.waiting.postMessage({type:'SKIP_WAITING'});
        alert('✅ 已完成檢查更新與離線快取同步！');
        return;
      }
    }
    location.reload();
  };
}

/* =========================================================
   PWA 安裝與離線 Service Worker 管理
   ========================================================= */
const pwaState = {
  deferredPrompt: null,
  swText: '尚未啟用（需透過網站伺服器或 HTTPS 開啟）'
};

function updateSwUI(msg){
  pwaState.swText = msg;
  if ($('#pwaSwStatus')) $('#pwaSwStatus').textContent = msg;
  if ($('#infoSwStatus')) $('#infoSwStatus').textContent = msg;
}

function updateNetUI(){
  const online = navigator.onLine;
  $('#netPill').classList.toggle('offline', !online);
  if ($('#infoNetStatus')) {
    $('#infoNetStatus').textContent = online ? '✅ 目前在線（自動同步最新快取）' : '📴 目前為離線模式（使用本機快取）';
  }
}
window.addEventListener('online', updateNetUI);
window.addEventListener('offline', updateNetUI);

function openPwaModal(){
  $('#nativeInstallWrap').style.display = pwaState.deferredPrompt ? 'block' : 'none';
  $('#pwaSwStatus').textContent = pwaState.swText;
  $('#pwaModal').classList.add('open');
}
$('#triggerNativeInstallBtn').onclick = () => {
  if (!pwaState.deferredPrompt) return;
  pwaState.deferredPrompt.prompt();
  pwaState.deferredPrompt.userChoice.then(() => {
    pwaState.deferredPrompt = null;
    $('#nativeInstallWrap').style.display = 'none';
    $('#pwaModal').classList.remove('open');
  });
};
$('#closePwaModalBtn').onclick = () => $('#pwaModal').classList.remove('open');
$('#pwaModal').onclick = e => { if (e.target === $('#pwaModal')) $('#pwaModal').classList.remove('open'); };

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  pwaState.deferredPrompt = e;
  $('#nativeInstallWrap').style.display = 'block';
});

window.addEventListener('appinstalled', () => {
  pwaState.deferredPrompt = null;
  $('#pwaModal').classList.remove('open');
});

if (false && 'serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      updateSwUI('✅ 已完成全站離線快取（無網路時仍可完整瀏覽行程、訂票提醒、班次速查、餐廳與清單）');
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (nw) nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            updateSwUI('✨ 偵測到新版行程資料，重新整理即可套用！');
          }
        });
      });
    }).catch(() => {
      updateSwUI('⚠️ 離線快取註冊失敗');
    });
  });
} else if (location.protocol === 'file:') {
  updateSwUI('💡 目前為本機單檔直接開啟（本身即可離線使用；若部署至 GitHub Pages / Netlify 等 HTTPS 網址即可啟用手機 PWA 主畫面安裝與自動離線快取）');
}

/* =========================================================
   浮動回到頂端按鈕
   ========================================================= */
const backTopBtn = $('#backTopBtn');
if (backTopBtn){
  const syncBackTop = () => backTopBtn.classList.toggle('show', window.scrollY > 400);
  window.addEventListener('scroll', syncBackTop, {passive:true});
  backTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  syncBackTop();
}

/* =========================================================
   啟動
   ========================================================= */
/* ===== DEMO 新增：行前提醒標籤、天氣、頂欄捲動收合 ===== */
function prepHtml(x){
  const m = String(x).replace(/^📝\s*/,'').match(/^【([^】]+)】\s*([\s\S]*)$/);
  return m ? `<em class="ptag">${esc(m[1])}</em>${esc(m[2])}` : esc(String(x).replace(/^📝\s*/,''));
}
const WX_PLACES = [['輕井澤',36.34,138.63],['河口湖',35.5,138.77],['富士',35.5,138.77],['神奈川',35.33,139.5],['鎌倉',35.32,139.55]];
const WX_CODE = c => c===0?'☀️':c<=3?'⛅':c<=48?'🌫️':c<=67?'🌧️':c<=77?'❄️':c<=82?'🌦️':c<=86?'🌨️':'⛈️';
async function loadWeather(d){
  const el = document.getElementById('wx'); if (!el) return;
  const diff = (Date.parse(d.date) - Date.now()) / 864e5;
  if (diff < -1 || diff > 14){
    el.innerHTML = ''; return;
  }
  const hit = WX_PLACES.find(p => (d.area + d.title + d.map).includes(p[0]));
  const [lat,lon] = hit ? [hit[1],hit[2]] : [35.68,139.77];
  try{
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=Asia%2FTokyo&start_date=${d.date}&end_date=${d.date}`);
    const j = (await r.json()).daily;
    const t = x => x.slice(11,16);
    if (document.getElementById('wx') !== el) return;
    el.innerHTML = `<span>${WX_CODE(j.weathercode[0])} ${Math.round(j.temperature_2m_min[0])}–${Math.round(j.temperature_2m_max[0])}°C</span><span>☔ ${j.precipitation_probability_max[0]}%</span><span>🌅 ${t(j.sunrise[0])}</span><span>🌇 ${t(j.sunset[0])}</span>`;
  }catch(e){ el.innerHTML = ''; }
}
(function(){
  let last = window.scrollY;
  window.addEventListener('scroll', () => {
    if (innerWidth >= 900) return;
    const y = window.scrollY, h = document.querySelector('header.top');
    if (y > last + 8 && y > 120) h.classList.add('hide');
    else if (y < last - 8 || y < 60) h.classList.remove('hide');
    last = y;
  }, {passive:true});
})();

/* ===== DEMO：長交通項目「重點＋展開」、記帳分帳 ===== */
function tipsHtml(p){
  if (!p.tips.length) return '';
  const all = p.tips.map(t => `<div class="tip ${t.warn?'warn':''}">${t.warn?'⚠️ 注意：':'💡 小提醒：'}${esc(t.text)}</div>`).join('');
  return all; // 已取消「長交通項目收合」，一律直接顯示
  const warn = p.tips.filter(t => t.warn).length;
  return `<details class="tipfold"><summary>${warn ? '⚠️' : '💡'} 備案與注意事項（${p.tips.length}）<span>展開 ▼</span></summary>${all}</details>`;
}

const EXP_CATS = ['🍜 餐飲','🚆 交通','🚖 計程車','🎟️ 門票','🛍️ 購物','🎁 伴手禮','🏨 住宿','⛽ 油資/ETC','🅿️ 停車','☕ 飲料零食','💊 藥妝','📦 其他'];
const EXP_METHODS = ['現金','刷卡','IC'];
function normMethod(m){ if (!m) return '現金'; if (m.includes('刷卡')) return '刷卡'; if (m.includes('IC') || m.includes('Suica')) return 'IC'; return '現金'; }
function normCat(c){
  const s = String(c || '').trim();
  if (!s) return '📦 其他';
  const hit = EXP_CATS.find(x => x === s || x.endsWith(s) || x.replace(/^\S+\s*/, '') === s.replace(/^\S+\s*/, ''));
  return hit || '📦 其他';
}
function parseCsvRows(text){
  const src = String(text || '').replace(/^\uFEFF/, '');
  const rows = []; let row = [], cell = '', inQ = false;
  for (let i = 0; i < src.length; i++){
    const ch = src[i];
    if (inQ){
      if (ch === '"' && src[i+1] === '"'){ cell += '"'; i++; }
      else if (ch === '"') inQ = false;
      else cell += ch;
    } else {
      if (ch === '"') inQ = true;
      else if (ch === ','){ row.push(cell); cell = ''; }
      else if (ch === '\r'){ if (src[i+1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
      else if (ch === '\n'){ row.push(cell); rows.push(row); row = []; cell = ''; }
      else cell += ch;
    }
  }
  if (cell.length || row.length){ row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(c => String(c).trim() !== ''));
}
function parseExpCsvDay(raw){
  const s = String(raw || '').trim();
  if (!s || s.includes('行前') || s === '0') return 0;
  const dm = s.match(/Day\s*(\d+)/i);
  if (dm) return Math.min(DAYS.length, Math.max(0, +dm[1]));
  const iso = s.match(/(\d{4}-\d{2}-\d{2})/);
  if (iso){ const idx = DAYS.findIndex(d => d.date === iso[1]); if (idx >= 0) return idx + 1; }
  const md = s.match(/(\d{1,2})\s*\/\s*(\d{1,2})/);
  if (md){
    const m = +md[1], day = +md[2];
    const idx = DAYS.findIndex(d => +d.date.slice(5,7) === m && +d.date.slice(8,10) === day);
    if (idx >= 0) return idx + 1;
  }
  return 1;
}
function parseExpCsv(text, rate, curMembers){
  const rows = parseCsvRows(text);
  if (!rows.length) return {items: [], extraMembers: []};
  const num = v => parseFloat(String(v ?? '').replace(/[^\d.-]/g, '')) || 0;
  const hasHeader = rows[0].some(c => /日期|項目|日幣|付款人/.test(String(c)));
  const hdr = hasHeader ? rows[0].map(c => String(c).trim()) : null;
  const dataRows = hasHeader ? rows.slice(1) : rows;
  const idxOf = (re, fallback) => {
    if (!hdr) return fallback;
    const i = hdr.findIndex(h => re.test(h));
    return i >= 0 ? i : fallback;
  };
  const iDay = idxOf(/日期/, 0), iCat = idxOf(/類別/, 1), iDesc = idxOf(/項目/, 2),
        iJpy = idxOf(/日幣|JPY/i, 3), iTwd = idxOf(/台幣|TWD/i, 4),
        iCur = idxOf(/原幣別/, 5), iOrig = idxOf(/原金額/, 6),
        iMethod = idxOf(/付款方式/, 7), iPayer = idxOf(/付款人/, 8), iSplit = idxOf(/分攤/, 9);

  const items = [];
  const extraSet = new Set();
  const baseId = Date.now();
  dataRows.forEach((r, idx) => {
    const cat = normCat(r[iCat]);
    const desc = String(r[iDesc] ?? '').trim() || cat.replace(/^\S+\s*/, '');
    const origCur = String(r[iCur] ?? '').trim().toUpperCase() === 'TWD' ? 'TWD' : 'JPY';
    const origAmtRaw = num(r[iOrig]);
    let jpy = Math.round(num(r[iJpy]));
    if (jpy <= 0){
      const twdRaw = origCur === 'TWD' && origAmtRaw > 0 ? origAmtRaw : num(r[iTwd]);
      if (twdRaw > 0) jpy = Math.round(twdRaw / rate);
    }
    if (jpy <= 0) return;
    const origAmt = origAmtRaw > 0 ? origAmtRaw : (origCur === 'TWD' ? Math.round(jpy * rate) : jpy);
    const payer = String(r[iPayer] ?? '').trim() || curMembers[0] || '全';
    const rawSplit = String(r[iSplit] ?? '').trim();
    let split = (!rawSplit || rawSplit === '全員' || rawSplit === '全員分攤')
      ? curMembers.slice()
      : rawSplit.split(/[、,，;；\s]+/).map(x => x.trim()).filter(Boolean);
    if (!split.length) split = [payer];
    if (!curMembers.includes(payer)) extraSet.add(payer);
    split.forEach(n => { if (!curMembers.includes(n)) extraSet.add(n); });
    items.push({
      id: baseId + idx,
      desc,
      cat,
      jpy,
      origAmt,
      origCur,
      method: normMethod(r[iMethod]),
      day: parseExpCsvDay(r[iDay]),
      payer,
      split
    });
  });
  return {items, extraMembers: [...extraSet]};
}
function fmtMD(d){ return d ? `${+d.date.slice(5,7)}/${+d.date.slice(8,10)}（${d.wd}）` : ''; }
function fmtShortMD(d){ return d ? `${+d.date.slice(5,7)}/${+d.date.slice(8,10)}` : ''; }
function expDayLabel(dayNum){
  if (+dayNum === 0) return '🗓️ 行前預付';
  const d = DAYS[dayNum - 1];
  return d ? fmtMD(d) : '';
}
function expDayShort(dayNum){
  if (+dayNum === 0) return '行前';
  const d = DAYS[dayNum - 1];
  return d ? fmtShortMD(d) : '';
}

const expState = {
  tab: 'ledger',
  editId: null,
  activeRowId: null,
  day: 'all',
  cat: 'all',
  payer: 'all',
  q: '',
  formOpen: true,
  filterOpen: false,
  cur: 'JPY',
  method: '現金',
  selectedCat: '🍜 餐飲',
  selectedPayer: null,
  selectedSplit: null,
  prefillJpy: null
};

const EXP = {
  members(){ return store.get('exp_members', ['全','言','甫','君','睿','曄']); },
  list(){ return store.get('exp_list', []); },
  save(l){ store.set('exp_list', l); },
  settled(){ return store.get('exp_settled', {}); },
  saveSettled(s){ store.set('exp_settled', s); },
  settle(){
    const m = EXP.members();
    const paid = Object.fromEntries(m.map(n => [n, 0]));
    const share = Object.fromEntries(m.map(n => [n, 0]));
    const bal = Object.fromEntries(m.map(n => [n, 0]));
    EXP.list().forEach(e => {
      const who = (e.split || []).filter(n => n in bal);
      if (!who.length || !(e.payer in bal)) return;
      paid[e.payer] += e.jpy;
      bal[e.payer] += e.jpy;
      const each = e.jpy / who.length;
      who.forEach(n => { share[n] += each; bal[n] -= each; });
    });
    const cr = [], db = [];
    Object.entries(bal).forEach(([n,v]) => { if (v > 0.5) cr.push([n,v]); else if (v < -0.5) db.push([n,-v]); });
    cr.sort((a,b) => b[1] - a[1]);
    db.sort((a,b) => b[1] - a[1]);
    const tx = []; let i = 0, j = 0;
    while (i < cr.length && j < db.length){
      const amt = Math.min(cr[i][1], db[j][1]);
      tx.push({from: db[j][0], to: cr[i][0], jpy: Math.round(amt), key: `${db[j][0]}->${cr[i][0]}:${Math.round(amt)}`});
      cr[i][1] -= amt; db[j][1] -= amt;
      if (cr[i][1] < .5) i++;
      if (db[j][1] < .5) j++;
    }
    return {paid, share, bal, tx};
  }
};

function expDetectCat(e){
  if (e.cat) return e.cat;
  const hit = EXP_CATS.find(c => String(e.desc || '').startsWith(c.split(' ')[0]));
  return hit || '📦 其他';
}

function renderExp(preserveForm = false){
  const el = $('#expPage'); if (!el) return;
  const prevDayScroll = $('#expDayFilters')?.scrollLeft ?? null;
  const prevCatScroll = $('#expChips')?.scrollLeft ?? null;
  const savedForm = preserveForm && $('#expForm') ? {
    desc: $('#expDesc')?.value ?? '',
    amt: $('#expJpy')?.value ?? '',
    day: $('#expDay')?.value ?? null
  } : null;

  const m = EXP.members();
  const list = EXP.list();
  const rate = store.get('rate', 0.215);
  const total = list.reduce((acc, e) => acc + (Number(e.jpy) || 0), 0);
  const {paid, share, bal, tx} = EXP.settle();
  const settledMap = EXP.settled();
  const fJpy = n => '¥' + Math.round(n).toLocaleString();
  const fTwd = n => 'NT$' + Math.round(n * rate).toLocaleString();

  // Editing item if any
  const editing = expState.editId ? list.find(e => e.id === expState.editId) : null;
  if (expState.editId && !editing) expState.editId = null;

  // Defaults for form
  const formDay = editing ? editing.day : (savedForm?.day !== null && savedForm?.day !== undefined ? +savedForm.day : (expState.day !== 'all' ? +expState.day : (todayIdx() >= 0 ? todayIdx() + 1 : state.day + 1)));
  const formCur = editing ? (editing.origCur || 'JPY') : expState.cur;
  const formAmt = editing ? (editing.origAmt ?? editing.jpy) : (expState.prefillJpy ?? savedForm?.amt ?? '');
  const formCat = editing ? expDetectCat(editing) : expState.selectedCat;
  const formMethod = editing ? normMethod(editing.method) : normMethod(expState.method);
  const formPayer = editing && m.includes(editing.payer) ? editing.payer : (expState.selectedPayer && m.includes(expState.selectedPayer) ? expState.selectedPayer : m[0]);
  const formSplit = editing ? editing.split : (expState.selectedSplit ? expState.selectedSplit.filter(x => m.includes(x)) : m.slice());
  const formDesc = editing ? editing.desc : (savedForm?.desc ?? '');

  // Day counts for filter chips (only show days that have entries!)
  const dayCounts = {};
  list.forEach(e => { const d = Number(e.day ?? 1); dayCounts[d] = (dayCounts[d] || 0) + 1; });
  if (expState.day !== 'all' && !dayCounts[Number(expState.day)]) expState.day = 'all';
  const activeDayKeys = Object.keys(dayCounts).map(Number).sort((a, b) => a - b);

  // Filter list
  const qLower = expState.q.trim().toLowerCase();
  const advFilterCount = (expState.cat !== 'all' ? 1 : 0) + (expState.payer !== 'all' ? 1 : 0) + (qLower ? 1 : 0);
  const showFilterBar = expState.filterOpen || advFilterCount > 0;
  const filtered = list.filter(e => {
    if (expState.day !== 'all' && String(e.day) !== String(expState.day)) return false;
    if (expState.cat !== 'all' && expDetectCat(e) !== expState.cat) return false;
    if (expState.payer !== 'all' && e.payer !== expState.payer) return false;
    if (qLower && !`${e.desc} ${e.payer} ${expDetectCat(e)} ${normMethod(e.method)}`.toLowerCase().includes(qLower)) return false;
    return true;
  });
  const isFiltered = expState.day !== 'all' || advFilterCount > 0;
  const filteredTotal = filtered.reduce((acc, e) => acc + (Number(e.jpy) || 0), 0);

  // Group filtered entries by day (0..10)
  const groups = new Map();
  filtered.slice().reverse().forEach(e => {
    const k = Number(e.day ?? 1);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(e);
  });
  const sortedGroupKeys = [...groups.keys()].sort((a, b) => a - b);

  // Category totals for chart
  const catTotals = {};
  list.forEach(e => { const c = expDetectCat(e); catTotals[c] = (catTotals[c] || 0) + (Number(e.jpy) || 0); });
  const catRows = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);

  const unsettledCnt = tx.filter(t => !settledMap[t.key]).length;
  const avgTwd = m.length ? fTwd(total / m.length) : 'NT$0';

  el.innerHTML = `
    <!-- 精簡總覽條 -->
    <div class="exp-hero">
      <div class="exp-hero-amt">${fJpy(total)} <span class="exp-hero-twd">≈ ${fTwd(total)}</span></div>
      <div class="exp-hero-bot">
        <span class="exp-hero-sub">共 ${list.length} 筆 · 均 ${avgTwd}/人</span>
        <button type="button" class="exp-rate-pill" id="expRefreshRate" title="點擊更新即時匯率">1 JPY=${rate} 🔄</button>
      </div>
    </div>

    <!-- 手機版分頁切換（桌機隱藏） -->
    <div class="exp-mob-tabs" role="tablist">
      <button type="button" role="tab" data-exptab="ledger" aria-selected="${expState.tab === 'ledger'}">📒 明細與記帳 (${list.length})</button>
      <button type="button" role="tab" data-exptab="settle" aria-selected="${expState.tab === 'settle'}">🤝 結算與統計${unsettledCnt ? ` (${unsettledCnt})` : ''}</button>
    </div>

    <div class="exp-layout" data-tab="${expState.tab}">
      <div class="exp-main">
        <!-- 瘦身版新增／編輯記帳卡片 -->
        <div class="box exp-card ${editing ? 'editing' : ''}">
          <div class="exp-card-hd">
            <h3 style="margin:0;font-size:.98rem">${editing ? '✏️ 編輯記帳' : '➕ 新增記帳'}</h3>
            ${editing
              ? `<button type="button" class="exp-ghost-btn" id="expCancelEdit">✕ 取消</button>`
              : `<button type="button" class="exp-ghost-btn" id="expToggleForm">${expState.formOpen ? '收合 ▲' : '＋ 記一筆'}</button>`}
          </div>
          <form id="expForm" class="exp-form-v2" ${(!editing && !expState.formOpen) ? 'hidden' : ''}>
            <div class="exp-chips" id="expChips" aria-label="選擇類別">
              ${EXP_CATS.map(c => `<button type="button" data-v="${esc(c)}" aria-pressed="${formCat === c}">${esc(c)}</button>`).join('')}
            </div>

            <div class="exp-inline-row">
              <select id="expDay" class="exp-day-sel" aria-label="日期">
                <option value="0" ${+formDay === 0 ? 'selected' : ''}>行前</option>
                ${DAYS.map((d,i) => `<option value="${i+1}" ${+formDay === i+1 ? 'selected' : ''}>${fmtMD(d)}</option>`).join('')}
              </select>
              <input id="expDesc" value="${esc(formDesc)}" placeholder="項目說明（留空用類別）" autocomplete="off" aria-label="項目說明">
            </div>

            <div class="exp-amt-block">
              <div class="exp-amt-wrap">
                <div class="exp-cur-seg" id="expCurSeg">
                  <button type="button" data-cur="JPY" aria-pressed="${formCur === 'JPY'}">¥ 日幣</button>
                  <button type="button" data-cur="TWD" aria-pressed="${formCur === 'TWD'}">$ 台幣</button>
                </div>
                <input id="expJpy" type="number" inputmode="decimal" min="1" step="any" value="${esc(String(formAmt))}" placeholder="${formCur === 'JPY' ? '輸入日幣金額' : '輸入台幣金額'}" required aria-label="金額">
              </div>
              <div class="exp-conv-preview" id="expConvPreview"></div>
            </div>

            <div class="exp-people-grid">
              <div class="exp-people-row">
                <span class="exp-mini-lbl">付款</span>
                <div class="exp-member-pills" id="expPayerGroup">
                  ${m.map(n => `<button type="button" data-p="${esc(n)}" aria-pressed="${formPayer === n}">${esc(n)}</button>`).join('')}
                </div>
              </div>
              <div class="exp-people-row">
                <div class="exp-split-hd">
                  <span class="exp-mini-lbl">分攤</span>
                  <span class="exp-quick-split">
                    <button type="button" id="expSplitAll">全選</button>
                    ${m.length >= 4 ? `<button type="button" id="expSplitAdults">前4</button>` : ''}
                    <button type="button" id="expSplitNone">清除</button>
                  </span>
                </div>
                <div class="exp-member-pills" id="expWho">
                  ${m.map(n => `<button type="button" data-s="${esc(n)}" aria-pressed="${formSplit.includes(n)}">${esc(n)}</button>`).join('')}
                </div>
              </div>
            </div>

            <div class="exp-pay-row">
              <span class="exp-mini-lbl">付款方式：</span>
              <div class="exp-method-pills" id="expMethodGroup">
                ${EXP_METHODS.map(pm => `<button type="button" data-m="${esc(pm)}" aria-pressed="${formMethod === pm}">${esc(pm)}</button>`).join('')}
              </div>
            </div>

            <div style="display:flex;gap:.45rem">
              <button class="btn primary exp-submit-btn" type="submit">${editing ? '💾 儲存修改' : '＋ 新增記帳'}</button>
              ${editing ? `<button class="btn" type="button" id="expCancelEdit2" style="margin:0;padding:.45rem .85rem">取消</button>` : ''}
            </div>
          </form>
        </div>

        <!-- 精簡花費明細 -->
        <div class="box exp-card">
          <div class="exp-card-hd" style="margin-bottom:.4rem">
            <h3 style="margin:0;font-size:.98rem">📒 花費明細</h3>
            <div style="display:flex;gap:.3rem;align-items:center">
              ${isFiltered ? `<button type="button" class="exp-ghost-btn" id="expResetFilter">✕ 清除</button>` : ''}
              <button type="button" class="exp-ghost-btn ${advFilterCount ? 'active' : ''}" id="expToggleFilter">🔍 篩選${advFilterCount ? ` (${advFilterCount})` : ''}</button>
            </div>
          </div>

          ${activeDayKeys.length ? `<div class="filters hscroll" id="expDayFilters">
            <button type="button" data-d="all" aria-pressed="${expState.day === 'all'}">全部 (${list.length})</button>
            ${activeDayKeys.map(dk => `<button type="button" data-d="${dk}" aria-pressed="${String(expState.day) === String(dk)}">${esc(expDayShort(dk))} (${dayCounts[dk]})</button>`).join('')}
          </div>` : ''}

          <div class="exp-filter-bar" id="expFilterBar" ${showFilterBar ? '' : 'hidden'}>
            <select id="expCatFilter" aria-label="篩選類別">
              <option value="all">全部類別</option>
              ${EXP_CATS.map(c => `<option value="${esc(c)}" ${expState.cat === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}
            </select>
            <select id="expPayerFilter" aria-label="篩選付款人">
              <option value="all">全部付款人</option>
              ${m.map(n => `<option value="${esc(n)}" ${expState.payer === n ? 'selected' : ''}>${esc(n)} 付</option>`).join('')}
            </select>
            <input id="expSearchInp" type="search" value="${esc(expState.q)}" placeholder="🔍 搜尋項目">
          </div>

          ${isFiltered ? `<div class="exp-filter-sum">篩選：<b>${filtered.length} 筆</b>｜${fJpy(filteredTotal)}（${fTwd(filteredTotal)}）</div>` : ''}

          ${sortedGroupKeys.length ? sortedGroupKeys.map(dk => {
            const items = groups.get(dk);
            const daySum = items.reduce((acc, e) => acc + (Number(e.jpy) || 0), 0);
            return `<div class="exp-day-group">
              <div class="exp-day-hd">
                <span>${esc(expDayLabel(dk))}</span>
                <span><b>${fJpy(daySum)}</b> <small>${fTwd(daySum)}</small></span>
              </div>
              <ul class="exp-list-v2">
                ${items.map(e => {
                  const cat = expDetectCat(e);
                  const catIcon = cat.split(' ')[0];
                  const splitTxt = (e.split || []).length === m.length ? '全員' : (e.split || []).map(esc).join('、');
                  const metaParts = [
                    `<b>${esc(e.payer)}</b>付`,
                    splitTxt,
                    e.method ? esc(normMethod(e.method)) : '',
                    e.origCur === 'TWD' ? `原NT$${Math.round(e.origAmt).toLocaleString()}` : ''
                  ].filter(Boolean);
                  const isOpen = expState.activeRowId === e.id;
                  return `<li class="${expState.editId === e.id ? 'is-editing' : ''} ${isOpen ? 'is-open' : ''}" data-row="${e.id}">
                    <div class="exp-li-body">
                      <span class="exp-li-ic" title="${esc(cat)}">${esc(catIcon)}</span>
                      <div class="exp-li-mid">
                        <div class="exp-li-title">${esc(e.desc)}</div>
                        <div class="exp-li-meta">${metaParts.join(' · ')}</div>
                      </div>
                      <div class="exp-li-amt"><b>${fJpy(e.jpy)}</b><small>${fTwd(e.jpy)}</small></div>
                    </div>
                    ${isOpen ? `<div class="exp-li-actions">
                      <button type="button" data-edit="${e.id}">✏️ 編輯這筆</button>
                      <button type="button" class="danger" data-del="${e.id}">🗑️ 刪除</button>
                    </div>` : ''}
                  </li>`;
                }).join('')}
              </ul>
            </div>`;
          }).join('') : `<div class="exp-empty">${list.length ? '沒有符合篩選條件的記帳項目。' : '還沒有記帳紀錄，點上方填一筆就能自動分帳！'}</div>`}
          ${sortedGroupKeys.length ? `<div class="exp-hint-tip">💡 點擊任一筆明細即可編輯或刪除</div>` : ''}
        </div>
      </div>

      <!-- 結算、收支表、類別佔比、輕量工具列 -->
      <aside class="exp-side">
        <div class="box exp-card">
          <h3 style="margin:0 0 .45rem;font-size:.98rem">🤝 智慧結算（最少轉帳）</h3>
          ${tx.length ? `<div class="exp-tx-list">${tx.map(t => {
            const done = !!settledMap[t.key];
            return `<label class="exp-tx-row ${done ? 'done' : ''}">
              <input type="checkbox" data-settle="${esc(t.key)}" ${done ? 'checked' : ''}>
              <span class="exp-tx-who"><b>${esc(t.from)}</b> → <b>${esc(t.to)}</b></span>
              <span class="exp-tx-amt"><b>${fTwd(t.jpy)}</b></span>
            </label>`;
          }).join('')}</div>` : '<div class="wxnote">目前帳目已平衡，不需要互相轉帳。</div>'}
        </div>

        <div class="box exp-card">
          <h3 style="margin:0 0 .4rem;font-size:.98rem">👥 每人收支明細</h3>
          <table class="exp-bal-tbl">
            <thead><tr><th>成員</th><th>已付</th><th>應攤</th><th>結餘</th></tr></thead>
            <tbody>
              ${m.map(n => {
                const bTwd = Math.round((bal[n] || 0) * rate);
                const cls = bTwd > 0 ? 'pos' : bTwd < 0 ? 'neg' : '';
                const sign = bTwd > 0 ? '+' : bTwd < 0 ? '-' : '';
                return `<tr>
                  <td><b>${esc(n)}</b></td>
                  <td>${fTwd(paid[n] || 0)}</td>
                  <td>${fTwd(share[n] || 0)}</td>
                  <td class="exp-bal-net ${cls}">${sign}NT$${Math.abs(bTwd).toLocaleString()}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>

        ${catRows.length ? `<div class="box exp-card">
          <h3 style="margin:0 0 .45rem;font-size:.98rem">📊 類別花費佔比</h3>
          <div class="exp-bars">
            ${catRows.map(([c, v]) => {
              const pct = total ? Math.round(v / total * 100) : 0;
              return `<div class="exp-bar-row">
                <div class="exp-bar-top"><span>${esc(c)}</span><span><b>${fJpy(v)}</b> <small>(${pct}%)</small></span></div>
                <div class="exp-bar-track"><i style="width:${pct}%"></i></div>
              </div>`;
            }).join('')}
          </div>
        </div>` : ''}

        <!-- 去卡片化的輕量匯出與管理工具列 -->
        <div class="exp-tools-bar">
          <button type="button" id="expCopy">📋 結算</button>
          <button type="button" id="expCsv">📥 匯出</button>
          <button type="button" id="expImportCsv">📤 匯入</button>
          <input type="file" id="expCsvFile" accept=".csv,text/csv" hidden>
          <button type="button" id="expNames">👥 成員</button>
          <button type="button" id="expClear">🗑️ 清空</button>
        </div>
      </aside>
    </div>
  `;

  // Restore horizontal scroll positions
  const dfEl = $('#expDayFilters');
  if (dfEl && prevDayScroll !== null) dfEl.scrollLeft = prevDayScroll;
  const cfEl = $('#expChips');
  if (cfEl && prevCatScroll !== null) cfEl.scrollLeft = prevCatScroll;

  // Consume one-time prefill
  if (expState.prefillJpy !== null){ expState.prefillJpy = null; }

  // Mobile sub-tabs
  el.querySelectorAll('[data-exptab]').forEach(b => b.onclick = () => {
    expState.tab = b.dataset.exptab;
    el.querySelector('.exp-layout')?.setAttribute('data-tab', expState.tab);
    el.querySelectorAll('[data-exptab]').forEach(x => x.setAttribute('aria-selected', x === b));
  });

  // Live conversion preview (empty = hidden via CSS :empty)
  const updatePreview = () => {
    const pv = $('#expConvPreview'); if (!pv) return;
    const raw = parseFloat($('#expJpy')?.value);
    if (!raw || raw <= 0){ pv.textContent = ''; return; }
    pv.textContent = expState.cur === 'JPY'
      ? `≈ NT$${Math.round(raw * rate).toLocaleString()}`
      : `≈ ¥${Math.round(raw / rate).toLocaleString()}（將以日幣換算值入帳）`;
  };
  if (editing) expState.cur = formCur;
  updatePreview();

  // Header rate pill
  $('#expRefreshRate').onclick = () => fetchLiveRate(true);

  // Toggle form
  const tog = $('#expToggleForm');
  if (tog) tog.onclick = () => { expState.formOpen = !expState.formOpen; renderExp(); };

  // Cancel edit
  ['#expCancelEdit','#expCancelEdit2'].forEach(sel => {
    const btn = $(sel);
    if (btn) btn.onclick = () => { expState.editId = null; renderExp(); };
  });

  // Category chips
  el.querySelectorAll('#expChips button').forEach(b => b.onclick = () => {
    expState.selectedCat = b.dataset.v;
    el.querySelectorAll('#expChips button').forEach(x => x.setAttribute('aria-pressed', x === b));
  });

  // Currency toggle
  el.querySelectorAll('#expCurSeg button').forEach(b => b.onclick = () => {
    expState.cur = b.dataset.cur;
    el.querySelectorAll('#expCurSeg button').forEach(x => x.setAttribute('aria-pressed', x === b));
    const inp = $('#expJpy');
    if (inp) inp.placeholder = expState.cur === 'JPY' ? '輸入日幣金額' : '輸入台幣金額';
    updatePreview();
  });
  $('#expJpy')?.addEventListener('input', updatePreview);

  // Payment method pills
  el.querySelectorAll('#expMethodGroup button').forEach(b => b.onclick = () => {
    expState.method = b.dataset.m;
    el.querySelectorAll('#expMethodGroup button').forEach(x => x.setAttribute('aria-pressed', x === b));
  });

  // Payer pills
  let chosenPayer = formPayer;
  el.querySelectorAll('#expPayerGroup button').forEach(b => b.onclick = () => {
    chosenPayer = b.dataset.p;
    expState.selectedPayer = chosenPayer;
    el.querySelectorAll('#expPayerGroup button').forEach(x => x.setAttribute('aria-pressed', x === b));
  });

  // Split toggle pills (no bulky checkboxes)
  const syncSplitState = () => {
    expState.selectedSplit = [...el.querySelectorAll('#expWho button[aria-pressed="true"]')].map(b => b.dataset.s);
  };
  el.querySelectorAll('#expWho button').forEach(b => b.onclick = () => {
    b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
    syncSplitState();
  });
  $('#expSplitAll')?.addEventListener('click', () => { el.querySelectorAll('#expWho button').forEach(b => b.setAttribute('aria-pressed', 'true')); syncSplitState(); });
  $('#expSplitAdults')?.addEventListener('click', () => { el.querySelectorAll('#expWho button').forEach((b, idx) => b.setAttribute('aria-pressed', String(idx < 4))); syncSplitState(); });
  $('#expSplitNone')?.addEventListener('click', () => { el.querySelectorAll('#expWho button').forEach(b => b.setAttribute('aria-pressed', 'false')); syncSplitState(); });

  // Form submit (add or edit)
  $('#expForm')?.addEventListener('submit', ev => {
    ev.preventDefault();
    const rawAmt = parseFloat($('#expJpy').value);
    if (!rawAmt || rawAmt <= 0) return showToast('請輸入正確金額');
    const split = [...el.querySelectorAll('#expWho button[aria-pressed="true"]')].map(b => b.dataset.s);
    if (!split.length) return showToast('請至少選一位分攤成員');
    const cat = el.querySelector('#expChips button[aria-pressed="true"]')?.dataset.v || expState.selectedCat;
    const desc = $('#expDesc').value.trim() || cat.replace(/^\S+\s*/, '');
    const jpy = expState.cur === 'TWD' ? Math.round(rawAmt / rate) : Math.round(rawAmt);
    const entry = {
      id: editing ? editing.id : Date.now(),
      desc,
      cat,
      jpy,
      origAmt: rawAmt,
      origCur: expState.cur,
      method: el.querySelector('#expMethodGroup button[aria-pressed="true"]')?.dataset.m || expState.method,
      day: +$('#expDay').value,
      payer: chosenPayer,
      split
    };
    const nextList = EXP.list();
    if (editing){
      const pos = nextList.findIndex(x => x.id === editing.id);
      if (pos >= 0) nextList[pos] = entry;
      expState.editId = null;
      expState.activeRowId = null;
      showToast('✅ 已更新記帳項目');
    } else {
      nextList.push(entry);
      showToast(`✅ 已記帳：${desc} ${fJpy(jpy)}`);
    }
    EXP.save(nextList);
    renderExp();
  });

  // Filters
  $('#expToggleFilter').onclick = () => {
    expState.filterOpen = !expState.filterOpen;
    const fb = $('#expFilterBar');
    if (fb) fb.hidden = !(expState.filterOpen || advFilterCount > 0);
  };
  el.querySelectorAll('#expDayFilters button').forEach(b => b.onclick = () => { expState.day = b.dataset.d; renderExp(); });
  $('#expCatFilter').onchange = e => { expState.cat = e.target.value; renderExp(); };
  $('#expPayerFilter').onchange = e => { expState.payer = e.target.value; renderExp(); };
  $('#expSearchInp').oninput = e => {
    expState.q = e.target.value;
    const pos = e.target.selectionStart;
    renderExp();
    const inp = $('#expSearchInp');
    if (inp){ inp.focus(); inp.setSelectionRange(pos, pos); }
  };
  $('#expResetFilter')?.addEventListener('click', () => {
    expState.day = 'all'; expState.cat = 'all'; expState.payer = 'all'; expState.q = ''; expState.filterOpen = false;
    renderExp();
  });

  // Tap ledger row to expand/collapse actions
  el.querySelectorAll('.exp-list-v2 li[data-row]').forEach(li => li.addEventListener('click', ev => {
    if (ev.target.closest('button')) return;
    const id = +li.dataset.row;
    expState.activeRowId = expState.activeRowId === id ? null : id;
    renderExp(true);
  }));

  // Edit / Delete inside expanded row
  el.querySelectorAll('[data-edit]').forEach(b => b.onclick = ev => {
    ev.stopPropagation();
    expState.editId = +b.dataset.edit;
    expState.activeRowId = null;
    expState.formOpen = true;
    expState.tab = 'ledger';
    renderExp();
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
  el.querySelectorAll('[data-del]').forEach(b => b.onclick = ev => {
    ev.stopPropagation();
    const id = +b.dataset.del;
    const item = EXP.list().find(x => x.id === id);
    if (!confirm(`確定刪除「${item?.desc || '這筆'}」？`)) return;
    if (expState.editId === id) expState.editId = null;
    if (expState.activeRowId === id) expState.activeRowId = null;
    EXP.save(EXP.list().filter(e => e.id !== id));
    renderExp();
    showToast('🗑️ 已刪除');
  });

  // Settled checkboxes
  el.querySelectorAll('[data-settle]').forEach(inp => inp.onchange = () => {
    const s = EXP.settled();
    s[inp.dataset.settle] = inp.checked;
    EXP.saveSettled(s);
    inp.closest('.exp-tx-row')?.classList.toggle('done', inp.checked);
  });

  // Copy LINE summary
  $('#expCopy').onclick = () => {
    const lines = [
      `🧾 2027 關東家族旅行 記帳結算`,
      `總花費：${fJpy(total)}（約 ${fTwd(total)}，1 JPY = ${rate} TWD）`,
      `共 ${list.length} 筆｜每人平均 ${avgTwd}`,
      '',
      '【🤝 轉帳結算】',
      ...(tx.length ? tx.map(t => `${settledMap[t.key] ? '✅' : '▫️'} ${t.from} → ${t.to}：${fTwd(t.jpy)}`) : ['已平衡，無需轉帳']),
      '',
      '【📒 花費明細】',
      ...EXP.list().map(e => `• ${expDayShort(e.day)} ${e.desc} ${fJpy(e.jpy)}（${e.payer}付）`)
    ];
    navigator.clipboard?.writeText(lines.join('\n')).then(() => showToast('📋 已複製 LINE 結算摘要'), () => showToast('複製失敗'));
  };

  // Export CSV (UTF-8 BOM)
  $('#expCsv').onclick = () => {
    if (!list.length) return showToast('目前沒有記帳資料可匯出');
    const q = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const rows = [
      ['日期','類別','項目','日幣(JPY)','約台幣(TWD)','原幣別','原金額','付款方式','付款人','分攤成員'],
      ...list.map(e => [
        expDayLabel(e.day), expDetectCat(e), e.desc, Math.round(e.jpy), Math.round(e.jpy * rate),
        e.origCur || 'JPY', e.origAmt ?? e.jpy, normMethod(e.method), e.payer, (e.split || []).join('、')
      ])
    ];
    const csv = '\uFEFF' + rows.map(r => r.map(q).join(',')).join('\r\n');
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = '2027關東旅行記帳.csv';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('📥 已匯出 CSV 檔案');
  };

  // Import CSV
  $('#expImportCsv').onclick = () => $('#expCsvFile')?.click();
  $('#expCsvFile').onchange = ev => {
    const file = ev.target.files?.[0];
    ev.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const {items, extraMembers} = parseExpCsv(reader.result, rate, m);
      if (!items.length) return showToast('⚠️ CSV 內沒有可匯入的記帳資料');
      let mode = '1';
      if (list.length){
        mode = prompt(`讀取到 ${items.length} 筆記帳（目前已有 ${list.length} 筆）。\n請輸入：\n1 ＝ 合併加入現有紀錄\n2 ＝ 覆蓋取代現有紀錄`, '1');
        if (mode === null) return;
        mode = mode.trim();
        if (mode !== '1' && mode !== '2') return showToast('已取消匯入（請輸入 1 或 2）');
      }
      if (extraMembers.length){
        store.set('exp_members', [...m, ...extraMembers]);
        expState.selectedSplit = null;
      }
      const next = mode === '2' ? items : [...list, ...items];
      EXP.save(next);
      if (mode === '2') EXP.saveSettled({});
      expState.editId = null;
      expState.activeRowId = null;
      renderExp();
      showToast(`📤 已${mode === '2' ? '覆蓋' : '合併'}匯入 ${items.length} 筆記帳`);
    };
    reader.onerror = () => showToast('⚠️ 讀取檔案失敗');
    reader.readAsText(file, 'UTF-8');
  };

  // Manage members
  $('#expNames').onclick = () => {
    const v = prompt('輸入成員名稱，以逗號分隔（預設：全,言,甫,君,睿,曄）', m.join(','));
    if (v){
      const n = v.split(/[,，]/).map(x => x.trim()).filter(Boolean);
      if (n.length){ store.set('exp_members', n); expState.selectedSplit = null; renderExp(); showToast('👥 已更新成員名單'); }
    }
  };

  // Clear all
  $('#expClear').onclick = () => {
    if (!list.length) return showToast('目前已經是空的');
    if (confirm(`確定要清空全部 ${list.length} 筆記帳紀錄嗎？此動作無法復原。`)){
      EXP.save([]); EXP.saveSettled({}); expState.editId = null; expState.activeRowId = null; renderExp(); showToast('🗑️ 已清空所有記帳');
    }
  };
}

$('#calcToExpBtn')?.addEventListener('click', () => {
  const jpy = Math.round(+$('#mJpyInp').value || 0);
  if (jpy > 0){ expState.prefillJpy = jpy; expState.cur = 'JPY'; }
  expState.formOpen = true;
  expState.editId = null;
  expState.tab = 'ledger';
  $('#calcModal').classList.remove('open');
  go('expense');
  setTimeout(() => $('#expDesc')?.focus(), 80);
});



[['#toggleBqBtn','#bqWrap','#bq'], ['#toggleTqBtn','#tqWrap','#tq'], ['#toggleFqBtn','#fqWrap','#fq']].forEach(([btnSel, wrapSel, inpSel]) => {
  const btn = $(btnSel), wrap = $(wrapSel), inp = $(inpSel);
  if (!btn || !wrap || !inp) return;
  btn.onclick = () => {
    const opening = wrap.hidden;
    wrap.hidden = !opening;
    btn.classList.toggle('active', opening || !!inp.value.trim());
    if (opening) setTimeout(() => inp.focus(), 30);
  };
  inp.addEventListener('input', () => {
    btn.classList.toggle('active', !wrap.hidden || !!inp.value.trim());
  });
});

buildNav();
buildQuickScheduleTable();
updateNetUI();
const ti = todayIdx();
state.day = ti >= 0 ? ti : store.get('day', 0);
const hash = location.hash.slice(1);
const hm = hash.match(/^day-(\d+)$/);
if (hm) state.day = Math.min(9, Math.max(0, +hm[1]-1));
state.foodDay = String(state.day);
state.transitDay = String(state.day + 1);
buildPicker();
renderDay();
renderBookings();
renderTimetables();
renderFood();
renderHotels();
renderChecks();
renderInfo();
renderBanner();
go(ALL_VIEWS.includes(hash) ? hash : 'day', false);
function centerChip(chip, smooth){
  const p = $('#daypicker');
  p.scrollTo({left: chip.offsetLeft - p.offsetLeft - (p.clientWidth - chip.offsetWidth)/2, behavior: smooth ? 'smooth' : 'auto'});
}
setTimeout(() => { const c = $('#daypicker .daychip[aria-selected="true"]'); if (c) centerChip(c, false); }, 60);
setInterval(() => { renderBanner(); if (todayIdx() === state.day) renderDay(); }, 60000);
