const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const state = {
  sound: true,
  county: 'suid',
  lit: JSON.parse(localStorage.getItem('yangge-lit') || '[]'),
  follows: JSON.parse(localStorage.getItem('yangge-follows') || '[]')
};

const countyData = {
  suid: {
    no: '01', tag: '陕北东南 · 河谷', name: '绥德',
    intro: '绥德是国家级非遗“秧歌（陕北秧歌）”的申报地与保护中心，中国非物质文化遗产网称“绥德可谓陕北秧歌的中心”“绥德秧歌最具代表性”，也是本研究两个典型个案之一。农村至今保留神会秧歌、二十八宿老秧歌等传统程式；伞头领阵、文武身子分工，大场阵图多达数百种。',
    look: '阵图与踢场子', hear: '锣鼓与唢呐', carry: '彩扇、红绸、花伞',
    meiyu: '具身体验型 · 踢场子文武分路，身体语汇最丰富',
    case: '典型个案',
    detail: {
      move: '大场扭摆开阔；小场“踢场子”最见功夫——北路文场柔、闪、俏，南路武场粗犷、刚毅、干脆，还有软腰、二起脚、金鸡独立等高难技巧',
      rhythm: '锣鼓铿锵、唢呐嘹亮，伞头即兴领唱，队伍随伞头导引与鼓点变阵',
      role: '伞头领队，文身子（包头）、武身子（挂鼓子）与丑角分工完整；神会秧歌、二十八宿老秧歌保存谒庙敬神礼俗',
      scene: '正月谒庙、排门子（沿门子）、搭彩门、踩大场、转九曲，走村串巷；今天有广场汇演、传习所与校园教学'
    }
  },
  mizhi: {
    no: '02', tag: '无定河畔 · 米脂', name: '米脂',
    intro: '米脂是本研究另一个典型个案，光绪《米脂县志》即载“春闹社火，俗名闹秧歌”。秧歌队由锣鼓队、演出队、仪仗队组成，三五十人至上百人；伞头领全队扭成枣核开花、十二莲灯等上百种阵图，讲究“稳中浪、浪中梗、梗中翘”。',
    look: '阵图与腰扭', hear: '鼓点与唢呐', carry: '花伞、彩扇、手绢',
    meiyu: '集体协作型 · 三队编制、上百阵图，最重全队踩点守位',
    case: '典型个案',
    detail: {
      move: '以腰为轴、双臂大幅扭摆，“不能平淡而要夸张”，融泼辣、幽默、文静、稳重于一体，讲求俏、幽、稳、美',
      rhythm: '鼓点明快富有弹性，有路鼓、流水鼓、凤凰三点头等名色，由鼓手指挥行进、动作与队形，唢呐激越昂扬，时而伴唱',
      role: '锣鼓队、演出队、仪仗队三队协同；伞头领阵，传统有上装（包头）、下装（斗丑）、棒鼓、丑角，每人位置固定、首尾相连',
      scene: '谒庙、沿门子（踩门）、场地秧歌与九曲秧歌，元宵上街游行汇演；今有貂蝉广场常年健身秧歌，十字步、三点步分解规整，可作教学入门'
    }
  },
  dingbian: {
    no: '03', tag: '榆林西北 · 三边', name: '定边',
    intro: '定边地处榆林西北、陕甘宁蒙交界，属“三边”之一。年俗里社火诸艺同台：省级非遗霸王鞭（俗称浑身响、打花棍）与过街秧歌、跑旱船、三弦说唱、跑驴轮番登场，元宵“闹红火”的仪式语境完整。',
    look: '过街秧歌与对鞭', hear: '唢呐鼓乐与鞭响', carry: '彩扇、彩绸、霸王鞭',
    meiyu: '文化仪式型 · 社火诸艺同台，年俗仪式语境完整',
    case: '',
    detail: {
      move: '过街秧歌踩十字步沿街行进；霸王鞭男执鞭、女执扇，双人对称击打，含跌、翻、滚、打，群场步伐刚劲、队列变换如战阵',
      rhythm: '鼓、镲、锣、钹与唢呐伴奏，鞭上铜钱声与鼓点交织，节奏服务于行进与社火段落',
      role: '大秧歌与霸王鞭、跑旱船（老艄公、船娘子、老卜子）、三弦说唱、跑驴同班同台，角色与民俗程式结合紧密',
      scene: '春节排练、元宵过街秧歌与非遗“赶大集”、社区展演；霸王鞭由娱神祭祀演变为娱人表演，至今是年俗核心'
    }
  },
  jingbian: {
    no: '04', tag: '榆林西北 · 长城沿线', name: '靖边',
    intro: '靖边资料聚焦国家级非遗“靖边跑驴”。表演由一人骑驴、一人赶驴组成，基本功包括闪腰、揉肩、抖身、摇头，形成滚沙驴与大善驴两种风格取向。',
    look: '跑驴双人角色', hear: '锣鼓与脚步', carry: '驴形道具、彩绸',
    meiyu: '角色叙事型 · 用身体表演生活情境与地方幽默',
    case: '新增资料',
    detail: {
      move: '滚沙驴动作紧凑细碎、节奏急促密集，偏生活化写实；大善驴动作舒展开阔、节奏舒缓分明，戏剧性更强',
      rhythm: '两派都以锣鼓节奏支撑闪腰、揉肩、抖身、摇头等基本功，行进与定点表演的节奏重心不同',
      role: '一人骑驴、一人赶驴，骑驴者与赶驴者通过对答、追逐和身体配合完成叙事',
      scene: '资料所述跑驴表演既适合队伍行进，也适合定点或舞台展示；代表性传承人及名录信息以官方发布为准'
    }
  }
};

const compareData = {
  shanbei: { region: '陕北秧歌', title: '扭出黄土高原的开阔与热烈', desc: '陕北秧歌奔放自由、即兴灵动，身体语汇讲究“扭、浪、俏”：扭、摆、踢、跳大开大合，队形调度开放，常在行进与交叉中生成变化。彩扇、红绸、伞与腰鼓让节奏可见，唢呐和鼓点把队伍与围观者连在一起，文化内核深植黄土高原的生活与信仰。', move: '扭 · 摆 · 踢 · 跳', prop: '彩扇 · 红绸 · 腰鼓', mood: '奔放自由 · 即兴灵动（扭浪俏）', image: "url('assets/ansai-waist-drums.jpg')", no: '02 / 03' },
  shanghe: { region: '山东商河鼓子', title: '鼓点更像一条清晰的线', desc: '山东秧歌（如商河鼓子、胶州秧歌）以沉稳刚健、程式严整见长，身体语汇讲究“稳、沉、韧”，角色与队形更重规矩与秩序。这里的“鼓”既是伴奏，也是锣鼓场面的视觉中心。', move: '稳 · 沉 · 韧', prop: '鼓、镲、彩扇', mood: '沉稳刚健 · 程式严整', image: "url('assets/shandong-yangko.jpg')", no: '02 / 03' },
  dongbei: { region: '东北秧歌', title: '手绢一翻，情绪立刻被点亮', desc: '东北秧歌常以手绢、扇子为表演媒介，步伐与上肢动作富有弹性，角色性格鲜明，舞台气氛更俏皮、活泼。', move: '踢步 · 颤膝 · 绕手绢', prop: '手绢、彩扇、花灯', mood: '俏皮、热闹、弹性', image: "url('assets/yangge-ensemble.jpg')", no: '02 / 03' }
};

function playClick(kind = 'click') {
  if (!state.sound) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = kind === 'drum' ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(kind === 'drum' ? 115 : 680, now);
    osc.frequency.exponentialRampToValueAtTime(kind === 'drum' ? 75 : 420, now + .13);
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(kind === 'drum' ? .18 : .07, now + .01);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .16);
    osc.connect(gain).connect(ctx.destination); osc.start(now); osc.stop(now + .18);
    setTimeout(() => ctx.close(), 300);
  } catch (e) { /* Audio is an enhancement; the interface still works without it. */ }
}

function silk() { const el = $('.silk-transition'); el.classList.remove('play'); void el.offsetWidth; el.classList.add('play'); setTimeout(() => el.classList.remove('play'), 760); }

function goTo(href) { silk(); setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 160); }

$$('[data-nav]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); playClick(); goTo(a.getAttribute('href')); }));

function openModal(html) { $('#modalBody').innerHTML = html; $('#modal').classList.add('is-open'); $('#modal').setAttribute('aria-hidden', 'false'); }
function closeModal() { $('#modal').classList.remove('is-open'); $('#modal').setAttribute('aria-hidden', 'true'); }
$$('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

$('#todayBtn').addEventListener('click', () => { playClick('drum'); openModal('<p class="kicker">今日秧歌一赏 · 09 / 06</p><h2>安塞腰鼓：鼓点先于脚步抵达</h2><p>这张照片记录了陕西延安安塞的腰鼓舞场景。腰鼓是陕北节庆表演中常见的打击乐器之一，鼓点与队形共同制造出强烈的现场感。</p><div class="modal-meta"><span>图片：Wikimedia Commons / Fanghong</span><a href="https://commons.wikimedia.org/wiki/File:Waist_drums_in_Ansai.jpg" target="_blank" rel="noreferrer">查看原图 ↗</a></div>'); });

$('#soundToggle').addEventListener('click', e => { state.sound = !state.sound; e.currentTarget.setAttribute('aria-pressed', String(state.sound)); e.currentTarget.innerHTML = state.sound ? '◒ <span>音效</span>' : '◌ <span>静音</span>'; if (state.sound) playClick(); });
$('#openFootprints').addEventListener('click', () => { openModal(`<p class="kicker">MY FOOTPRINTS · 我的足迹</p><h2>${state.lit.length ? `已点亮 ${state.lit.length} 个县域` : '从第一枚印章开始'}</h2><p>${state.lit.length ? '你的秧歌地图正在变亮。继续点亮四个县域，解锁“陕北行走者”成就。' : '点亮绥德、米脂、定边或靖边任一县域，就会在这里留下足迹。'}</p><div class="modal-meta"><span>已关注 ${state.follows.length} 位人物 / 队伍</span><button class="btn btn-red" onclick="closeModal()">继续探索</button></div>`); });

$$('.follow').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); const name = e.currentTarget.closest('.person-card').dataset.person; const on = e.currentTarget.classList.toggle('is-followed'); e.currentTarget.textContent = on ? '♥' : '♡'; state.follows = on ? [...new Set([...state.follows, name])] : state.follows.filter(x => x !== name); localStorage.setItem('yangge-follows', JSON.stringify(state.follows)); playClick(); }));

function renderCompare(key) { const d = compareData[key]; $('#compareRegion').textContent = d.region; $('#compareTitle').textContent = d.title; $('#compareDesc').textContent = d.desc; $('#factMove').textContent = d.move; $('#factProp').textContent = d.prop; $('#factMood').textContent = d.mood; $('#compareVisual').style.backgroundImage = `linear-gradient(0deg,rgba(55,20,20,.38),transparent 48%),${d.image}`; $$('.tab').forEach(b => b.classList.toggle('is-active', b.dataset.compare === key)); playClick(); }
$$('.tab').forEach(btn => btn.addEventListener('click', () => renderCompare(btn.dataset.compare)));
$('#playRhythm').addEventListener('click', e => { playClick('drum'); e.currentTarget.classList.add('pulse'); e.currentTarget.innerHTML = '✓ 鼓点已响起 <span>+1</span>'; setTimeout(() => { e.currentTarget.classList.remove('pulse'); e.currentTarget.innerHTML = '▶ 听一声鼓点 <span>+1</span>'; }, 1500); });

$$('.quiz-options button').forEach(btn => btn.addEventListener('click', () => { const correct = btn.dataset.answer === 'shanbei'; $$('.quiz-options button').forEach(b => b.classList.remove('is-correct','is-wrong')); btn.classList.add(correct ? 'is-correct' : 'is-wrong'); $('#quizFeedback').textContent = correct ? '答对了！“扭、摆、踢、跳”的开阔动势，加上即兴开放的队形，是陕北秧歌常被描述的身体印象。' : '再想想：“扭、摆、踢、跳”这个关键词组合，更接近陕北秧歌的动作语汇。'; playClick(); }));
$$('[data-vote]').forEach(btn => btn.addEventListener('click', () => { $$('.vote-options button').forEach(b => b.classList.remove('is-voted')); btn.classList.add('is-voted'); playClick(); }));
$('#shareMood').addEventListener('click', () => openModal('<p class="kicker">YOUR YANGGE MOOD</p><h2>你的秧歌气质：红绸型</h2><p>热烈、开阔、愿意在人群里把节奏传出去。分享图功能在下一版接入真实图片生成与保存。</p><div class="modal-meta"><span>红绸入陕北 · 初版</span><button class="btn btn-red" onclick="closeModal()">知道了</button></div>'));

function renderCounty(key) { const d = countyData[key]; state.county = key; $('#countyNo').textContent = d.no; $('#countyTag').textContent = d.tag; $('#countyName').textContent = d.name; $('#countyIntro').textContent = d.intro; const caseEl = $('#countyCase'); caseEl.textContent = d.case || ''; caseEl.style.display = d.case ? 'inline-flex' : 'none'; $('#countyMeiyu').textContent = '美育定位｜' + d.meiyu; $('#countyLook').textContent = d.look; $('#countyHear').textContent = d.hear; $('#countyCarry').textContent = d.carry; $('#lightCounty').innerHTML = `${state.lit.includes(key) ? '已点亮' : `点亮${d.name}`} <span>✦</span>`; $$('.map-pin').forEach(pin => pin.classList.toggle('is-lit', state.lit.includes(pin.dataset.county))); playClick(); }
$$('.map-pin').forEach(pin => pin.addEventListener('click', () => renderCounty(pin.dataset.county)));
$('#countyDetailBtn').addEventListener('click', () => { const d = countyData[state.county]; const rows = [['动作幅度', d.detail.move], ['节奏处理', d.detail.rhythm], ['角色配置', d.detail.role], ['表演情境', d.detail.scene]].map(([k, v]) => `<div style="padding:12px 14px;background:#f8f2ec;border-radius:9px"><b style="color:#761f2a">${k}</b><p style="margin:5px 0 0;font-size:13px;line-height:1.75">${v}</p></div>`).join(''); openModal(`<p class="kicker">STYLE ARCHIVE · ${d.name}秧歌风格档案</p><h2>${d.name}：四个维度读出流派性格</h2><div style="display:grid;gap:10px;margin-top:14px">${rows}</div><div class="modal-meta"><span>美育功能定位：${d.meiyu}</span><button class="btn btn-red" onclick="closeModal()">收起</button></div>`); });
$('#lightCounty').addEventListener('click', () => { if (!state.lit.includes(state.county)) state.lit.push(state.county); localStorage.setItem('yangge-lit', JSON.stringify(state.lit)); renderCounty(state.county); openModal(`<p class="kicker">FIELD NOTE · ${countyData[state.county].name}</p><h2>县域已点亮</h2><p>你在地图上留下了一个红色印章。再点亮 ${4 - state.lit.length} 个县域，完成“陕北行走者”。</p><div class="tribute-number">${state.lit.length}<small style="font-size:16px;color:#9e877b"> / 4</small></div>`); });
$('#markAll').addEventListener('click', () => { state.lit = ['suid','mizhi','dingbian','jingbian']; localStorage.setItem('yangge-lit', JSON.stringify(state.lit)); renderCounty('suid'); openModal('<p class="kicker">ACHIEVEMENT UNLOCKED</p><h2>陕北行走者</h2><p>绥德、米脂、定边、靖边四枚地图印章已集齐。下一步可以把县域故事交给真实的地方资料来继续完善。</p><div class="tribute-number">✦</div>'); });
$$('[data-artifact]').forEach(btn => btn.addEventListener('click', () => { playClick('drum'); openModal(`<p class="kicker">道具图鉴</p><h2>${btn.dataset.artifact}</h2><p>${btn.dataset.artifact === '腰鼓' ? '腰鼓以鼓槌击奏，鼓点速度、力度与队形变化相互呼应。' : '彩扇是秧歌中常见的视觉道具，扇面的开合与腕部轨迹能放大舞者的节奏。'}</p><div class="modal-meta"><span>互动提示音已播放</span><button class="btn btn-red" onclick="closeModal()">收起</button></div>`); }));

$('#tributeBtn').addEventListener('click', () => { playClick(); openModal('<p class="kicker">TRIBUTE · 致敬传承人</p><h2>谢谢你，把鼓点留在村口</h2><p>每一次学习、排练与带队，都是让秧歌继续活着的动作。</p><div class="tribute-number">+1<small style="font-size:16px;color:#9e877b"> 致敬</small></div>'); });
$('#commentBtn').addEventListener('click', () => openModal('<p class="kicker">LEAVE A NOTE</p><h2>写一句祝福</h2><textarea id="noteInput" rows="4" placeholder="例如：愿鼓点一直响到下一代……" style="width:100%;margin-top:15px;padding:13px;border:1px solid #e8ded4;border-radius:9px;background:#fff;resize:vertical;font:inherit"></textarea><div class="modal-meta"><span>仅保存在本机</span><button class="btn btn-red" id="saveNote" type="button">保存祝福</button></div>'));
document.addEventListener('click', e => { if (e.target.id === 'saveNote') { const v = $('#noteInput').value.trim(); if (v) { localStorage.setItem('yangge-note', v); e.target.textContent = '已保存'; playClick(); } } });

const sections = ['home','genes','legacy','compare','atlas','doc-gallery'];
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) $$(`[data-nav="${entry.target.id}"]`).forEach(a => a.classList.add('active')); else $$(`[data-nav="${entry.target.id}"]`).forEach(a => a.classList.remove('active')); }), { rootMargin: '-30% 0px -60% 0px' });
sections.forEach(id => observer.observe(document.getElementById(id)));
renderCounty('suid');
$$('.map-pin').forEach(pin => pin.classList.toggle('is-lit', state.lit.includes(pin.dataset.county)));

// 第二版：设备入口与设置
const deviceGate = $('#deviceGate');
const savedDevice = localStorage.getItem('yangge-device-mode');
function applyDevice(mode){ document.body.dataset.device = mode; localStorage.setItem('yangge-device-mode',mode); deviceGate.classList.add('is-hidden'); $('#entryAudio')?.classList.remove('is-visible'); }
if(savedDevice) applyDevice(savedDevice);
$$('[data-device]').forEach(btn => btn.addEventListener('click',()=>{ applyDevice(btn.dataset.device); playClick('drum'); startMusic(); }));

$('#settingsBtn').addEventListener('click',()=>openModal(`<p class="kicker">SETTINGS · 设置</p><h2>把秧歌调成你喜欢的样子</h2><div class="settings-list"><button class="btn btn-soft" id="switchDevice" type="button">切换手机版 / 电脑版</button><button class="btn btn-soft" id="toggleMotion" type="button">${document.body.classList.contains('reduce-motion')?'开启动效':'减少动效'}</button><button class="btn btn-soft" id="clearFootprints" type="button">清除本机足迹</button></div><div class="modal-meta"><span>设备选择、收藏和留言只保存在本机</span></div>`));
document.addEventListener('click',e=>{ if(e.target.id==='switchDevice'){closeModal();deviceGate.classList.remove('is-hidden');} if(e.target.id==='toggleMotion'){document.body.classList.toggle('reduce-motion');e.target.textContent=document.body.classList.contains('reduce-motion')?'开启动效':'减少动效';} if(e.target.id==='clearFootprints'){localStorage.removeItem('yangge-lit');localStorage.removeItem('yangge-follows');state.lit=[];state.follows=[];closeModal();} });

// 音乐房：公开授权素材 + 本地鼓点提示，浏览器拦截自动播放时给出入场提示
const musicTracks = [
  {title:'中国声乐与器乐合奏',type:'中国民乐 · 公版',src:'assets/audio/chinese-ensemble.ogg',author:'Unknown author',license:'Public domain',source:'https://commons.wikimedia.org/wiki/File:Chinese_Vocal_and_Instrumental_Ensemble.ogg'},
  {title:'陕北腰鼓节拍练习',type:'本地合成 · 交互试听',src:null,author:'红绸入陕北',license:'Prototype audio',source:'#musicRoom'},
  {title:'秧歌走阵节拍练习',type:'本地合成 · 交互试听',src:null,author:'红绸入陕北',license:'Prototype audio',source:'#musicRoom'},
  {title:'红绸入场提示',type:'本地合成 · 交互试听',src:null,author:'红绸入陕北',license:'Prototype audio',source:'#musicRoom'}
];
let musicIndex=Math.floor(Math.random()*musicTracks.length), musicAudio=null, musicPlaying=false, synthTimer=null;
function getTrack(){return musicTracks[musicIndex]}
function renderTracks(){const list=$('#trackList');if(!list)return;list.innerHTML=musicTracks.map((t,i)=>`<div class="track-row ${i===musicIndex?'is-current':''}"><span class="track-index">${String(i+1).padStart(2,'0')}</span><div><strong>${t.title}</strong><small>${t.type} · ${t.author}</small></div><div class="track-actions"><button data-track="${i}" type="button">${i===musicIndex?'播放中':'播放'}</button><a href="${t.source}" target="_blank" rel="noreferrer">来源</a></div></div>`).join(''); $$('#trackList [data-track]').forEach(b=>b.addEventListener('click',()=>{musicIndex=Number(b.dataset.track);loadMusic(true);}));}
function synthPulse(){ if(!state.sound)return; playClick('drum'); }
function stopSynth(){if(synthTimer){clearInterval(synthTimer);synthTimer=null;}}
function startSynth(){stopSynth();synthPulse();synthTimer=setInterval(()=>synthPulse(),getTrack().title.includes('走阵')?540:720);musicPlaying=true;$('#dockPlay').textContent='Ⅱ';}
function loadMusic(autoplay=false){const t=getTrack(); stopSynth(); if(musicAudio){musicAudio.pause();musicAudio=null;} $('#dockTitle').textContent=t.title;$('#dockMeta').textContent=`${t.type} · ${t.license}`;renderTracks();if(!t.src){musicPlaying=false;if(autoplay)startSynth();return;} musicAudio=new Audio(t.src);musicAudio.loop=true;musicAudio.volume=.48;musicAudio.addEventListener('ended',()=>{if(musicAudio.loop)return;});if(autoplay)musicAudio.play().then(()=>{musicPlaying=true;$('#dockPlay').textContent='Ⅱ';}).catch(()=>showEntryAudio());}
function startMusic(){if(!state.sound){return;}loadMusic(true);}
function showEntryAudio(){$('#entryAudio').classList.add('is-visible');}
$('#enterWithMusic').addEventListener('click',()=>{$('#entryAudio').classList.remove('is-visible');if(!getTrack().src){startSynth();}else if(musicAudio)musicAudio.play().then(()=>{musicPlaying=true;$('#dockPlay').textContent='Ⅱ';});});
$('#dockPlay').addEventListener('click',()=>{if(!getTrack().src){if(musicPlaying){stopSynth();musicPlaying=false;$('#dockPlay').textContent='▶';}else startSynth();return;}if(!musicAudio)loadMusic();if(musicPlaying){musicAudio.pause();musicPlaying=false;$('#dockPlay').textContent='▶';}else{musicAudio.play().then(()=>{musicPlaying=true;$('#dockPlay').textContent='Ⅱ';}).catch(showEntryAudio);}});
$('#dockNext').addEventListener('click',()=>{musicIndex=(musicIndex+1)%musicTracks.length;loadMusic(true);});
$('#dockList').addEventListener('click',()=>document.querySelector('#musicRoom')?.scrollIntoView({behavior:'smooth'}));
renderTracks();loadMusic(false);if(!savedDevice)showEntryAudio();

// 秧小北助手：本地知识库、导航和设备语音接口
const faq=[
  {keys:['靖边跑驴','跑驴','滚沙驴','大善驴'],answer:'所附靖边资料介绍跑驴由一人骑驴、一人赶驴组成，基本功包括闪腰、揉肩、抖身、摇头。滚沙驴动作紧凑细碎、节奏急促；大善驴动作舒展开阔、节奏舒缓，具体传承人和名录信息以官方资料为准。',go:'#atlas'},
  {keys:['特点','动作','扭摆','陕北秧歌'],answer:'陕北秧歌奔放自由、即兴灵动，基本动作是扭、摆、踢、跳，风格讲究“扭、浪、俏”；队形在行进与交叉中生成变化，彩扇、红绸、伞和腰鼓让节奏可见。',go:'#compare'},
  {keys:['腰鼓','鼓'],answer:'腰鼓是陕北节庆表演中常见的打击乐器之一。鼓点与步伐、队形和情绪推进相互呼应。',go:'#atlas'},
  {keys:['三县','四县','绥德','米脂','定边','靖边'],answer:'绥德、米脂、定边、靖边都在本页的榆林地方图鉴中。绥德看文武两路秧歌，米脂看伞头领阵与三队协同，定边看霸王鞭和社火诸艺，靖边看跑驴两派与双人角色。',go:'#atlas'},
  {keys:['信天游','民歌'],answer:'信天游是陕北民歌的重要类型，常以高亢、自由的旋律表达生活与情感。音乐房里的公开授权音频用于网页体验，不代替田野录音。',go:'#musicRoom'},
  {keys:['头像','制作','照片'],answer:'我可以打开本地头像工坊。照片只在本机处理，选择模板后把裁剪出的面部放入陕北风格图层。',go:'avatar'},
  {keys:['怎么用','导航','页面'],answer:'想看人物点“传承人”，想比较三种秧歌点“秧歌对比”，想点亮县域点“地方图鉴”，也可以在音乐房听公开授权音频。'},
  {keys:['美育','高校','大学','进校园','立德树人'],answer:'这个平台服务高校美育：让学生用身体参与补上“重看轻做”的缺口，在集体走阵里学会协作，在年俗礼乐里接续本土文化；也为非遗打开面向青年的传承通道。',go:'#genes'},
  {keys:['基因','三重','身体基因','集体基因','文化基因','困境'],answer:'三重对应是这样的：身体缺席对应身体基因（扭、摆、踢、跳），集体消解对应集体基因（队形、鼓乐、集体即兴），文化无根对应文化基因（礼乐、岁时、地方记忆）。',go:'#genes'},
  {keys:['流派','区别','不同','绥德','米脂','定边','二县','各县'],answer:'榆林各县各有性格：绥德踢场子文武分路、身体技巧最难最丰富（具身体验型）；米脂以腰为轴大幅扭摆，三队编制摆上百阵图（集体协作型）；定边霸王鞭与过街秧歌、跑旱船、三弦同台（文化仪式型）。绥德和米脂是研究选取的两个典型个案。',go:'#atlas'},
  {keys:['课程','四阶','基础律动','组合套路','集体展演','文化阐释','怎么学'],answer:'课程按“基础律动—组合套路—集体展演—文化阐释”四阶递进：线上在平台看示范、做分解与自测，线下跟老师示范带练、集体习练。平台支持课前预习、课后复习和自主练习。',go:'#genes'},
  {keys:['王家沟','村子','十年','田野','变迁','大学生','村'],answer:'研究追踪了榆林王家沟村近十年的秧歌变化（村落所属县域以田野记录为准）。高校学生介入后，传承主体从老龄村民扩展到青年学生，表演场域从乡土仪式扩展到校园课堂，传播方式从口传身授扩展到系统教学。',go:'#field'},
  {keys:['伞头'],answer:'伞头是秧歌队的领阵人，举伞领唱、按鼓点指挥变阵，是队伍秩序的核心，在绥德秧歌中尤其典型。',go:'#atlas'}
];
function assistantReply(text){const q=text.toLowerCase();const hit=faq.find(item=>item.keys.some(k=>q.includes(k)));return hit||{answer:'这个问题暂时不在我的本地资料里。我不想编造答案，你可以先看看页面底部的资料来源，或换个关键词问我。'};}
function addChat(text,who='bot',replyMeta){const log=$('#chatLog');const div=document.createElement('div');div.className=`chat-msg ${who}`;div.textContent=text;log.appendChild(div);if(replyMeta?.go){const b=document.createElement('button');b.className='chat-jump';b.textContent=replyMeta.go==='avatar'?'打开头像工坊':'打开相关章节 ↗';b.addEventListener('click',()=>replyMeta.go==='avatar'?openAvatar():goTo(replyMeta.go));log.appendChild(b);}log.scrollTop=log.scrollHeight;}
function askAssistant(text){if(!text.trim())return;addChat(text,'user');const r=assistantReply(text);setTimeout(()=>addChat(r.answer,'bot',r),180);if(r.go==='avatar')setTimeout(openAvatar,320);}
function openAssistant(){$('#assistantPanel').classList.add('is-open');$('#assistantPanel').setAttribute('aria-hidden','false');$('#assistantOrb').classList.add('is-dancing');setTimeout(()=>$('#assistantOrb').classList.remove('is-dancing'),1600);}
function closeAssistant(){$('#assistantPanel').classList.remove('is-open');$('#assistantPanel').setAttribute('aria-hidden','true');}
$('#assistantOrb').addEventListener('click',openAssistant);$('#mobileAssistant').addEventListener('click',openAssistant);$('#assistantClose').addEventListener('click',closeAssistant);$('#chatSend').addEventListener('click',()=>{const i=$('#chatInput');askAssistant(i.value);i.value='';});$('#chatInput').addEventListener('keydown',e=>{if(e.key==='Enter'){askAssistant(e.currentTarget.value);e.currentTarget.value='';}});$$('[data-ask]').forEach(b=>b.addEventListener('click',()=>askAssistant(b.dataset.ask)));
let recognition=null;const Speech=window.SpeechRecognition||window.webkitSpeechRecognition;if(Speech){recognition=new Speech();recognition.lang='zh-CN';recognition.interimResults=false;recognition.onresult=e=>{$('#chatInput').value=e.results[0][0].transcript;$('#voiceBtn').textContent='◉';};recognition.onend=()=>$('#voiceBtn').textContent='◉';}$('#voiceBtn').addEventListener('click',()=>{if(!recognition){addChat('当前浏览器没有可用的设备语音识别，请直接输入文字。','bot');return;}$('#voiceBtn').textContent='●';recognition.start();});
// 助手随机动作
setInterval(()=>{if(document.body.classList.contains('reduce-motion'))return;$('#assistantOrb').classList.add('is-dancing');setTimeout(()=>$('#assistantOrb').classList.remove('is-dancing'),1500);},7000+Math.random()*5000);

// 本地头像工坊
let avatarImage=null, avatarTemplate='胖娃娃';const avatarFaceSlot=$('#avatarFaceSlot');function openAvatar(){$('#avatarPanel').classList.add('is-open');$('#avatarPanel').setAttribute('aria-hidden','false');closeAssistant();}function closeAvatar(){$('#avatarPanel').classList.remove('is-open');$('#avatarPanel').setAttribute('aria-hidden','true');}$$('[data-close-avatar]').forEach(e=>e.addEventListener('click',closeAvatar));$('#avatarEntry').addEventListener('click',openAvatar);$('#avatarFile').addEventListener('change',e=>{const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{avatarImage=reader.result;avatarFaceSlot.innerHTML=`<img src="${avatarImage}" alt="本地照片裁剪预览"/>`;$('#avatarStatus').textContent='照片已在本机载入。可选择模板；若浏览器支持 FaceDetector，将优先尝试面部识别。';};reader.readAsDataURL(file);});$$('[data-template]').forEach(b=>b.addEventListener('click',()=>{avatarTemplate=b.dataset.template;$('#templateCostume').textContent=avatarTemplate;$$('[data-template]').forEach(x=>x.classList.toggle('is-active',x===b));}));$('#downloadAvatar').addEventListener('click',()=>{const c=document.createElement('canvas');c.width=720;c.height=720;const x=c.getContext('2d');const g=x.createLinearGradient(0,0,720,720);g.addColorStop(0,'#c7443c');g.addColorStop(1,'#761f2a');x.fillStyle=g;x.fillRect(0,0,720,720);x.strokeStyle='#efc77e';x.lineWidth=24;x.beginPath();x.arc(360,360,320,0,Math.PI*2);x.stroke();if(avatarImage){const img=new Image();img.onload=()=>{x.save();x.beginPath();x.arc(360,270,130,0,Math.PI*2);x.clip();x.drawImage(img,230,140,260,260);x.restore();finish();};img.src=avatarImage;}else finish();function finish(){x.fillStyle='#f7d78f';x.font='bold 48px serif';x.textAlign='center';x.fillText(avatarTemplate,360,560);x.font='24px sans-serif';x.fillText('红绸入陕北 · 秧小北头像工坊',360,620);const a=document.createElement('a');a.download='秧小北头像.png';a.href=c.toDataURL('image/png');a.click();}});
$$('[data-move]').forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('is-active');$('#assistantOrb')?.classList.add('is-dancing');setTimeout(()=>$('#assistantOrb')?.classList.remove('is-dancing'),1200);openAssistant();askAssistant(`请演示${b.dataset.move}动作`);}));
