(() => {
'use strict';
const root=document.documentElement;
const words={
 en:{preparing:'Preparing your Sabah adventure',images:'Loading your photos',loading:'Loading…',page:'Opening your journey…',packages:'Loading packages…',photo:'Loading photo…',photoError:'This photo could not load.',credits:'Loading photo credits…',error:'Something did not load. Please try again.',copying:'Copying your enquiry…',whatsapp:'Opening WhatsApp…',whatsappNext:'Continue in WhatsApp to send your enquiry. If it did not open, try again.',slow:'A few photos are taking longer than usual.',continue:'Continue browsing',partial:'Some photos could not load. You can still browse and enquire.',retry:'Try again'},
 ms:{preparing:'Menyediakan pengembaraan Sabah anda',images:'Memuatkan foto anda',loading:'Memuatkan…',page:'Membuka perjalanan anda…',packages:'Memuatkan pakej…',photo:'Memuatkan foto…',photoError:'Foto ini tidak dapat dimuatkan.',credits:'Memuatkan kredit foto…',error:'Ada kandungan yang tidak dapat dimuatkan. Sila cuba lagi.',copying:'Menyalin pertanyaan anda…',whatsapp:'Membuka WhatsApp…',whatsappNext:'Teruskan dalam WhatsApp untuk menghantar pertanyaan. Jika tidak terbuka, cuba lagi.',slow:'Sesetengah foto mengambil masa lebih lama.',continue:'Teruskan melayari',partial:'Sesetengah foto tidak dapat dimuatkan. Anda masih boleh melayari dan membuat pertanyaan.',retry:'Cuba lagi'},
 zh:{preparing:'正在准备你的沙巴之旅',images:'正在加载照片',loading:'加载中…',page:'正在打开行程…',packages:'正在加载配套…',photo:'正在加载照片…',photoError:'暂时无法加载这张照片。',credits:'正在加载图片来源…',error:'部分内容未能加载，请重试。',copying:'正在复制咨询信息…',whatsapp:'正在打开 WhatsApp…',whatsappNext:'请在 WhatsApp 中发送咨询。如果未打开，请重试。',slow:'部分照片加载时间较长。',continue:'继续浏览',partial:'部分照片暂时无法加载，你仍可浏览和咨询。',retry:'重试'}
};
const text=key=>(words[root.lang==='zh-Hans'?'zh':root.lang]||words.en)[key];
let serial=0,statusTimer,gateSerial=0,firstGate=true,navTimer;
const busy=new Map();
function status(message,working=false,duration=1800){
 let el=document.getElementById('action-status');
 if(!el){el=document.createElement('div');el.id='action-status';el.setAttribute('role','status');el.setAttribute('aria-live','polite');el.setAttribute('aria-atomic','true');}
 const host=document.querySelector('dialog[open]')||document.body;host.append(el);
 el.replaceChildren();if(working){const spin=document.createElement('span');spin.className='feedback-spinner';spin.setAttribute('aria-hidden','true');el.append(spin)}const label=document.createElement('span');label.textContent=message;el.append(label);el.hidden=false;clearTimeout(statusTimer);if(!working)statusTimer=setTimeout(()=>{el.hidden=true},duration);
}
function begin(button,label,{lock=false}={}){
 const token=++serial;let finished=false,release;
 if(button){if(busy.has(button))busy.get(button)();const wasDisabled=button.disabled;button.classList.add('is-busy');button.setAttribute('aria-busy','true');if(lock)button.disabled=true;release=()=>{button.classList.remove('is-busy');button.removeAttribute('aria-busy');if(lock)button.disabled=wasDisabled;busy.delete(button)};busy.set(button,release);}
 status(label,true);
 return (message='',duration=1400)=>{if(finished)return;finished=true;if(button&&busy.get(button)===release)release();if(token!==serial)return;if(message)status(message,false,duration);else{clearTimeout(statusTimer);const el=document.getElementById('action-status');if(el)el.hidden=true}};
}
function reset(){++serial;clearTimeout(statusTimer);clearTimeout(navTimer);for(const release of [...busy.values()])release();const el=document.getElementById('action-status');if(el)el.hidden=true;document.querySelectorAll('.is-clicked').forEach(el=>el.classList.remove('is-clicked'));}
function imageFallback(img,failed){
 const parent=img.parentElement;if(!parent)return;
 let note=parent.querySelector(':scope > .image-load-error');
 img.classList.toggle('image-load-failed',failed);
 if(failed&&!note){note=document.createElement('span');note.className='image-load-error';note.textContent=text('photoError');parent.append(note);img.addEventListener('load',()=>imageFallback(img,false),{once:true});}
 if(!failed)note?.remove();
}
function imageReady(img,timeout=15000){
 return new Promise(resolve=>{
  let settled=false,timer;
  const finish=ok=>{if(settled)return;settled=true;clearTimeout(timer);img.removeEventListener('load',loaded);img.removeEventListener('error',failed);const available=ok||img.naturalWidth>0;imageFallback(img,!available);resolve(available)};
  const failed=()=>finish(false);
  const loaded=()=>{if(!img.naturalWidth){failed();return;}if(typeof img.decode==='function')img.decode().then(()=>finish(true),()=>finish(img.naturalWidth>0));else finish(true)};
  img.addEventListener('load',loaded);img.addEventListener('error',failed);timer=setTimeout(failed,timeout);img.loading='eager';
  if(img.complete)loaded();
 });
}
function reveal(){
 clearTimeout(window.__nbjBootDeadline);root.classList.remove('is-page-loading');const app=document.getElementById('app');if(app){app.inert=false;app.removeAttribute('aria-hidden');app.removeAttribute('aria-busy');}const loader=document.getElementById('page-loader');if(loader){loader.hidden=true;loader.setAttribute('aria-busy','false');}window.dispatchEvent(new Event('resize'));
}
function showLoader(label){
 const loader=document.getElementById('page-loader');if(!loader)return;
 loader.hidden=false;loader.setAttribute('aria-busy','true');root.classList.add('is-page-loading');const app=document.getElementById('app');if(app){app.inert=true;app.setAttribute('aria-hidden','true');app.setAttribute('aria-busy','true');}
 document.getElementById('loader-title').textContent=label;document.getElementById('loader-note').textContent=text('images');document.getElementById('loader-count').textContent='';const progress=document.getElementById('loader-progress');progress.hidden=false;progress.value=0;progress.setAttribute('aria-label',text('images'));document.getElementById('loader-continue').hidden=true;document.getElementById('loader-retry').hidden=true;
}
async function pageImages(){
 const token=++gateSerial,blocking=firstGate||root.classList.contains('is-page-loading');firstGate=false;
 const images=[...document.querySelectorAll('.scene-deck img,#tour-grid img,.detail-gallery img')];
 if(blocking)showLoader(text('preparing'));
 let completed=0,failed=0;
 const update=()=>{if(!blocking||token!==gateSerial)return;const total=images.length;document.getElementById('loader-count').textContent=`${completed} / ${total}`;const progress=document.getElementById('loader-progress');progress.max=Math.max(1,total);progress.value=completed;};
 update();
 const slow=blocking?setTimeout(()=>{if(token!==gateSerial)return;document.getElementById('loader-note').textContent=text('slow');const button=document.getElementById('loader-continue');button.textContent=text('continue');button.hidden=false;button.onclick=()=>{++gateSerial;reveal();};},6000):null;
 await Promise.all(images.map(img=>imageReady(img).then(ok=>{completed++;if(!ok)failed++;update()})));
 clearTimeout(slow);if(blocking&&token===gateSerial){reveal();if(failed)status(text('partial'),false,5000);}
 return failed===0;
}
function navigation(href){
 showLoader(text('page'));document.getElementById('loader-progress').hidden=true;document.getElementById('loader-note').textContent=text('loading');
 navTimer=setTimeout(()=>{reveal();status(text('error'),false,5000)},15000);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{window.location.assign(href)}));
}
document.addEventListener('click',event=>{
 const control=event.target.closest('button,a,summary');if(!control||control.disabled||event.defaultPrevented||event.button!==0)return;
 if(control.closest('#page-loader'))return;
 control.classList.add('is-clicked');setTimeout(()=>control.classList.remove('is-clicked'),600);
 const link=control.closest('a[href]');
 if(link){
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
  const url=new URL(link.href,location.href);if(url.origin===location.origin&&/^https?:$/.test(url.protocol)){
   const samePage=url.pathname===location.pathname&&url.search===location.search;
   // Native fragment navigation preserves scrolling, focus and history without loading feedback.
   if(samePage)return;
   event.preventDefault();navigation(url.href);return;
  }
 }
 // Ordinary clicks use their visible control state; do not announce routine success.
});
window.addEventListener('pageshow',e=>{reset();if(e.persisted){++gateSerial;reveal();}});
window.NBJFeedback={text,status,begin,imageReady,pageImages,reveal,reset};
})();
