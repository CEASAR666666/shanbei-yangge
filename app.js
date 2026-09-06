const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const state = {
  sound: true,
  county: 'suid',
  lit: JSON.parse(localStorage.getItem('yangge-lit') || '[]'),
  follows: JSON.parse(localStorage.getItem('yangge-follows') || '[]')
};

const countyData = {
  suid: { no: '01', tag: '陕北东南 · 河谷', name: '绥德', intro: '绥德是陕北秧歌的重要传播地之一。县城与乡村的节庆秧歌，常见鼓乐开道、队伍巡游和伞头领队等组织方式。', look: '队形与伞头', hear: '鼓点与唢呐', carry: '彩扇、红绸' },
  mizhi: { no: '02', tag: '无定河畔 · 米脂', name: '米脂', intro: '米脂的秧歌活动与春节社火、村落巡游相连。彩扇、手绢等轻道具让舞者的手腕轨迹更鲜明，队伍也更适合在街巷中展开。', look: '扇面与走阵', hear: '鼓乐与唱腔', carry: '彩扇、手绢' },
  dingbian: { no: '03', tag: '陕北西部 · 定边', name: '定边', intro: '定边地处陕北西部，节庆秧歌常与社火、民歌等地方年俗同场出现。边地空间开阔，队列行进与对舞尤其醒目。', look: '行进与对舞', hear: '锣鼓与唢呐', carry: '彩绸、腰鼓' }
};

const compareData = {
  shanbei: { region: '陕北秧歌', title: '扭出黄土高原的开阔与热烈', desc: '动作常见扭、摆、走、跳，队形在行进与交叉中不断变化；扇子、彩绸、伞与腰鼓让节奏变得可见。唢呐和鼓点把队伍与围观者连在一起。', move: '扭摆 · 走阵 · 踏步', prop: '彩扇 · 红绸 · 腰鼓', mood: '开阔、热烈、即兴', image: "url('assets/ansai-waist-drums.jpg')", no: '02 / 03' },
  shanghe: { region: '山东商河鼓子', title: '鼓点更像一条清晰的线', desc: '商河鼓子以鼓乐与秧歌相伴，队伍节奏感强，角色和队形更强调锣鼓场面的秩序。这里的“鼓”既是伴奏，也是视觉中心。', move: '击鼓 · 踏步 · 变阵', prop: '鼓、镲、彩扇', mood: '整齐、明快、仪式感', image: "url('assets/shandong-yangko.jpg')", no: '02 / 03' },
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
$('#openFootprints').addEventListener('click', () => { openModal(`<p class="kicker">MY FOOTPRINTS · 我的足迹</p><h2>${state.lit.length ? `已点亮 ${state.lit.length} 个县域` : '从第一枚印章开始'}</h2><p>${state.lit.length ? '你的秧歌地图正在变亮。继续点亮三个县域，解锁“陕北行走者”成就。' : '点亮绥德、米脂、定边任一县域，就会在这里留下足迹。'}</p><div class="modal-meta"><span>已关注 ${state.follows.length} 位人物 / 队伍</span><button class="btn btn-red" onclick="closeModal()">继续探索</button></div>`); });

$$('.follow').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); const name = e.currentTarget.closest('.person-card').dataset.person; const on = e.currentTarget.classList.toggle('is-followed'); e.currentTarget.textContent = on ? '♥' : '♡'; state.follows = on ? [...new Set([...state.follows, name])] : state.follows.filter(x => x !== name); localStorage.setItem('yangge-follows', JSON.stringify(state.follows)); playClick(); }));

function renderCompare(key) { const d = compareData[key]; $('#compareRegion').textContent = d.region; $('#compareTitle').textContent = d.title; $('#compareDesc').textContent = d.desc; $('#factMove').textContent = d.move; $('#factProp').textContent = d.prop; $('#factMood').textContent = d.mood; $('#compareVisual').style.backgroundImage = `linear-gradient(0deg,rgba(55,20,20,.38),transparent 48%),${d.image}`; $$('.tab').forEach(b => b.classList.toggle('is-active', b.dataset.compare === key)); playClick(); }
$$('.tab').forEach(btn => btn.addEventListener('click', () => renderCompare(btn.dataset.compare)));
$('#playRhythm').addEventListener('click', e => { playClick('drum'); e.currentTarget.classList.add('pulse'); e.currentTarget.innerHTML = '✓ 鼓点已响起 <span>+1</span>'; setTimeout(() => { e.currentTarget.classList.remove('pulse'); e.currentTarget.innerHTML = '▶ 听一声鼓点 <span>+1</span>'; }, 1500); });

$$('.quiz-options button').forEach(btn => btn.addEventListener('click', () => { const correct = btn.dataset.answer === 'shanbei'; $$('.quiz-options button').forEach(b => b.classList.remove('is-correct','is-wrong')); btn.classList.add(correct ? 'is-correct' : 'is-wrong'); $('#quizFeedback').textContent = correct ? '答对了！“扭、摆、走、跳”的开阔动势，是陕北秧歌常被描述的身体印象。' : '再想想：这个关键词组合更接近陕北秧歌的动作语汇。'; playClick(); }));
$$('[data-vote]').forEach(btn => btn.addEventListener('click', () => { $$('.vote-options button').forEach(b => b.classList.remove('is-voted')); btn.classList.add('is-voted'); playClick(); }));
$('#shareMood').addEventListener('click', () => openModal('<p class="kicker">YOUR YANGGE MOOD</p><h2>你的秧歌气质：红绸型</h2><p>热烈、开阔、愿意在人群里把节奏传出去。分享图功能在下一版接入真实图片生成与保存。</p><div class="modal-meta"><span>红绸入陕北 · 初版</span><button class="btn btn-red" onclick="closeModal()">知道了</button></div>'));

function renderCounty(key) { const d = countyData[key]; state.county = key; $('#countyNo').textContent = d.no; $('#countyTag').textContent = d.tag; $('#countyName').textContent = d.name; $('#countyIntro').textContent = d.intro; $('#countyLook').textContent = d.look; $('#countyHear').textContent = d.hear; $('#countyCarry').textContent = d.carry; $('#lightCounty').innerHTML = `${state.lit.includes(key) ? '已点亮' : `点亮${d.name}`} <span>✦</span>`; $$('.map-pin').forEach(pin => pin.classList.toggle('is-lit', state.lit.includes(pin.dataset.county))); playClick(); }
$$('.map-pin').forEach(pin => pin.addEventListener('click', () => renderCounty(pin.dataset.county)));
$('#lightCounty').addEventListener('click', () => { if (!state.lit.includes(state.county)) state.lit.push(state.county); localStorage.setItem('yangge-lit', JSON.stringify(state.lit)); renderCounty(state.county); openModal(`<p class="kicker">FIELD NOTE · ${countyData[state.county].name}</p><h2>县域已点亮</h2><p>你在地图上留下了一个红色印章。再点亮 ${3 - state.lit.length} 个县域，完成“陕北行走者”。</p><div class="tribute-number">${state.lit.length}<small style="font-size:16px;color:#9e877b"> / 3</small></div>`); });
$('#markAll').addEventListener('click', () => { state.lit = ['suid','mizhi','dingbian']; localStorage.setItem('yangge-lit', JSON.stringify(state.lit)); renderCounty('suid'); openModal('<p class="kicker">ACHIEVEMENT UNLOCKED</p><h2>陕北行走者</h2><p>绥德、米脂、定边三枚地图印章已集齐。下一步可以把县域故事交给真实的地方资料来继续完善。</p><div class="tribute-number">✦</div>'); });
$$('[data-artifact]').forEach(btn => btn.addEventListener('click', () => { playClick('drum'); openModal(`<p class="kicker">道具图鉴</p><h2>${btn.dataset.artifact}</h2><p>${btn.dataset.artifact === '腰鼓' ? '腰鼓以鼓槌击奏，鼓点通常与队形、步伐和情绪推进同步。页面中的声音为轻量交互提示，不代替田野录音。' : '彩扇是秧歌中常见的视觉道具，扇面的开合与腕部轨迹能放大舞者的节奏。正式资料建议补充地方队伍的实拍与访谈。'}</p><div class="modal-meta"><span>互动提示音已播放</span><button class="btn btn-red" onclick="closeModal()">收起</button></div>`); }));

$('#tributeBtn').addEventListener('click', () => { playClick(); openModal('<p class="kicker">TRIBUTE · 致敬传承人</p><h2>谢谢你，把鼓点留在村口</h2><p>每一次学习、排练与带队，都是让秧歌继续活着的动作。</p><div class="tribute-number">+1<small style="font-size:16px;color:#9e877b"> 致敬</small></div>'); });
$('#commentBtn').addEventListener('click', () => openModal('<p class="kicker">LEAVE A NOTE</p><h2>写一句祝福</h2><textarea id="noteInput" rows="4" placeholder="例如：愿鼓点一直响到下一代……" style="width:100%;margin-top:15px;padding:13px;border:1px solid #e8ded4;border-radius:9px;background:#fff;resize:vertical;font:inherit"></textarea><div class="modal-meta"><span>仅保存在本机</span><button class="btn btn-red" id="saveNote" type="button">保存祝福</button></div>'));
document.addEventListener('click', e => { if (e.target.id === 'saveNote') { const v = $('#noteInput').value.trim(); if (v) { localStorage.setItem('yangge-note', v); e.target.textContent = '已保存'; playClick(); } } });

const sections = ['home','legacy','compare','atlas'];
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
  {keys:['特点','动作','扭摆','陕北秧歌'],answer:'陕北秧歌常被概括为扭、摆、走、跳，队形在行进与交叉中变化；彩扇、红绸、伞和腰鼓让节奏变得可见。',go:'#compare'},
  {keys:['腰鼓','鼓'],answer:'腰鼓是陕北节庆表演中常见的打击乐器之一。鼓点与步伐、队形和情绪推进相互呼应。',go:'#atlas'},
  {keys:['三县','绥德','米脂','定边'],answer:'绥德、米脂、定边都在榆林市。三地的节庆秧歌会因村落组织、行进空间和道具使用形成不同观看重点。',go:'#atlas'},
  {keys:['信天游','民歌'],answer:'信天游是陕北民歌的重要类型，常以高亢、自由的旋律表达生活与情感。音乐房里的公开授权音频用于网页体验，不代替田野录音。',go:'#musicRoom'},
  {keys:['头像','制作','照片'],answer:'我可以打开本地头像工坊。照片只在本机处理，选择模板后把裁剪出的面部放入陕北风格图层。',go:'avatar'},
  {keys:['怎么用','导航','页面'],answer:'想看人物点“传承人”，想比较三种秧歌点“秧歌对比”，想点亮县域点“地方图鉴”，也可以在音乐房听公开授权音频。'}
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
