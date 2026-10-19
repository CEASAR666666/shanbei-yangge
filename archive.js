const archives={
  suid:{
    no:'01',name:'绥德秧歌传习者',short:'绥德 · 伞头与鼓乐记忆',seal:'绥',
    lead:'绥德秧歌资料将地方秧歌分为北路文场子（软场子）与南路武场子（硬场子）。北路闪、颠、柔、俏，南路弓步、踢腿、跳跃，文武两路共同构成河谷秧歌的身体谱系。',
    tags:['北路文场子','南路武场子','伞头领阵','二人场子'],
    facts:[['动作气质','北路身法细腻，腰胯拧扭、碎步、软腰；南路弓步、踢腿、跳跃，重拍突出。'],['角色与组织','二人场子是北路核心；南路偏武生气质，适合广场巡游、谒庙与闹红火。'],['观看线索','看扇法、走阵和腰胯；听锣鼓与唢呐在近距离小场和大场行进中的不同层次。'],['资料人物','所附资料提到贺俊义、魏建明等传习线索，实名履历与资格以地方馆校审核为准。']],
    source:'用户提供《绥德秧歌资料(1)(1).docx》；页面将北路/南路、动作和传习线索按原资料整理。',images:['image1.jpeg','image2.jpeg','image3.png','image4.jpeg','image5.jpeg','image6.jpeg','image7.jpeg','image8.png'],folder:'doc-suid'
  },
  mizhi:{
    no:'02',name:'米脂秧歌队',short:'米脂 · 伞头领阵与村落巡游',seal:'米',
    lead:'米脂资料记载，秧歌传习包含十字步、踢场子、伞头领唱、传统鼓点和原生态唱词；大场有彩绸、花伞、花轿等，小场则看踢场子与角色配合。',
    tags:['伞头领唱','十字步','路鼓','流水鼓','花伞彩绸'],
    facts:[['动作气质','秧歌“扭在腰上，弓在腿上”，十字步、踢场子与大场彩绸形成不同学习入口。'],['鼓点与唱词','路鼓、流水鼓、凤凰三点头等鼓点，与唢呐快慢交替，带动行进、变阵和领唱。'],['角色配置','伞头、文身子、武身子、旱船、高跷、跑驴、花轿等共同组成米脂社火场景。'],['传习工作','资料提到朱绪光及非遗进校园、进乡村等传承线索，具体身份以官方名录核验。']],
    source:'用户提供《米脂相关资料(1).docx》；资料中的朱绪光、动作、鼓点和角色内容按原文整理。',images:['image1.jpeg','image2.jpeg','image3.jpeg','image4.jpeg','image5.jpeg'],folder:'doc-mizhi'
  },
  dingbian:{
    no:'03',name:'定边社火班',short:'定边 · 霸王鞭与社火诸艺',seal:'定',
    lead:'定边社火资料聚焦霸王鞭，俗称“浑身响”。鞭身击打肩、臂、腰、腿，铜铃与锣鼓交织；旱船、老艄公、船娘子、老卜子、秦腔、皮影等节目共同构成年俗现场。',
    tags:['霸王鞭','浑身响','百人方阵','旱船社火','铜铃锣鼓'],
    facts:[['动作气质','持鞭击打肩、臂、腰、腿，动作刚劲；百人方阵统一变换队列，节拍和空间都更外放。'],['声音线索','铜铃、锣鼓、唢呐与鞭响交织，声音既是伴奏，也是动作的提示。'],['社火角色','旱船、老艄公、船娘子、老卜子与陕北说书、秦腔、皮影等节目同台。'],['资料人物','所附资料提到冯建忠及定边霸王鞭传承线索，级别和履历请以官方名录核验。']],
    source:'用户提供《定边社火(1)(1).docx》；霸王鞭、社火角色和人物线索按原资料整理。',images:['image1.jpeg','image2.jpeg','image3.jpeg','image4.jpeg','image5.jpeg','image6.jpeg','image7.jpeg','image8.jpeg'],folder:'doc-dingbian'
  },
  jingbian:{
    no:'04',name:'靖边跑驴传习线索',short:'靖边 · 滚沙驴与大善驴',seal:'靖',
    lead:'靖边资料聚焦跑驴：一人骑驴、一人赶驴，以闪腰、揉肩、抖身、摇头等基本功表现生活情境。资料区分滚沙驴与大善驴两派，前者紧凑细碎，后者舒展开阔。',
    tags:['跑驴','滚沙驴','大善驴','闪腰揉肩','双人角色'],
    facts:[['两派风格','滚沙驴动作紧凑细碎、节奏急促密集，偏生活化写实；大善驴舒展开阔，戏剧性更强。'],['基本功','闪腰、揉肩、抖身、摇头是资料提到的共同身体语汇。'],['角色关系','骑驴者与赶驴者通过追逐、对答和身体配合完成叙事。'],['传承线索','资料提到张有万及国家级非遗跑驴信息，具体名录与履历以官方发布为准。']],
    source:'用户提供《靖边(1).docx》；跑驴两派、基本功和传承线索按原资料整理。',images:['image1.png','image2.png'],folder:'doc-jingbian'
  }
};
const key=new URLSearchParams(location.search).get('county')||'suid';
const data=archives[key]||archives.suid;
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
document.title=data.name+' · 红绸入陕北';
$('#archiveKicker').textContent='LOCAL ARCHIVE · '+data.no;
$('#archiveTitle').textContent=data.name;
$('#archiveSubtitle').textContent=data.short;
$('#archiveLead').textContent=data.lead;
$('#archiveSeal').textContent=data.seal;
$('#archiveArtTitle').textContent=key==='dingbian'?'让鞭响和鼓点一起进场':key==='mizhi'?'一把花伞领出百种阵图':key==='jingbian'?'在跑驴里讲一个地方故事':'把鼓点交给下一代';
$('#archiveTags').innerHTML=data.tags.map(t=>'<span class="archive-tag">'+t+'</span>').join('');
$('#archiveFacts').innerHTML=data.facts.map(([title,body])=>'<article class="archive-fact"><b>'+title+'</b><span>'+body+'</span></article>').join('');
$('#archiveSource').textContent=data.source;
$('#archiveGallery').innerHTML=data.images.map((img,i)=>'<figure><img src="assets/img/'+data.folder+'/'+img+'" alt="'+data.name+'资料图片 '+(i+1)+'" loading="lazy"><figcaption>'+data.name+' · 资料图片 '+String(i+1).padStart(2,'0')+'</figcaption></figure>').join('');
function showBlessing(text){const layer=$('#archiveBlessing');const item=document.createElement('span');item.className='archive-blessing-item';item.textContent='✦ '+text;item.style.setProperty('--top',(18+Math.round(Math.random()*65))+'%');layer.appendChild(item);setTimeout(()=>item.remove(),11200);}
const noteModal=$('#archiveBlessModal');
const closeNote=()=>{noteModal.classList.remove('is-open');noteModal.setAttribute('aria-hidden','true');};
$('#archiveBless').addEventListener('click',()=>{noteModal.classList.add('is-open');noteModal.setAttribute('aria-hidden','false');$('#archiveBlessInput').focus();});
$$('[data-close-archive-note]').forEach(el=>el.addEventListener('click',closeNote));
$('#archiveBlessSave').addEventListener('click',()=>{const value=$('#archiveBlessInput').value.trim();if(!value)return;localStorage.setItem('yangge-note',value);showBlessing(value);$('#archiveBlessInput').value='';closeNote();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNote();});
