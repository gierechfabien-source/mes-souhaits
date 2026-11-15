(function(){
const FBC={"apiKey":"AIzaSyBYNEjVg4wrSLJRo6wMXl_Hd9lb2JDeHO0","authDomain":"liste-noel-lilou.firebaseapp.com","projectId":"liste-noel-lilou","storageBucket":"liste-noel-lilou.firebasestorage.app","messagingSenderId":"1037196943479","appId":"1:1037196943479:web:540fcf7d56f238043a2672"};
const Q=new URLSearchParams(location.search);
const KID=window.KID||Q.get("k")||"mahily";
const TH={mahily:{n:"Mahily",c:"#e4508d",c2:"#ff8fb8",bg:"#fff3f8",ink:"#4a1634",icon:"icon-mahily.svg"},lilou:{n:"Lilou",c:"#2f86d6",c2:"#62c3fa",bg:"#eef7ff",ink:"#0f3358",icon:"icon-lilou.svg"},didi:{n:"Didi",c:"#7b5cd6",c2:"#a78bff",bg:"#f4f0ff",ink:"#2a1a55",icon:"icon-parents.svg"}};
let T=TH[KID]||{n:KID,c:"#2f8f6c",c2:"#6fd1a8",bg:"#f1f8f4",ink:"#16352b",icon:"icon-parents.svg"};
const mix=(h,k)=>{const n=parseInt(h.slice(1),16),f=v=>Math.round(v+(255-v)*k);return "#"+[n>>16,(n>>8)&255,n&255].map(v=>f(v).toString(16).padStart(2,"0")).join("")};
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const safe=u=>u&&/^https:\/\//i.test(u)?u:"";
const st=document.createElement("style");
const sty=()=>{st.textContent="*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:"+T.bg+";color:"+T.ink+";padding-bottom:90px}header{background:linear-gradient(135deg,"+T.c2+","+T.c+");color:#fff;padding:calc(18px + env(safe-area-inset-top)) 18px 20px;border-radius:0 0 28px 28px;box-shadow:0 8px 24px rgba(0,0,0,.14)}header .r{display:flex;align-items:center;gap:12px}header img{width:46px;height:46px;border-radius:13px}header h1{margin:0;font:600 26px/1.1 Georgia,serif}header p{margin:3px 0 0;opacity:.85;font-size:14px}main{max-width:640px;margin:0 auto;padding:14px}.tabs{display:flex;gap:8px;overflow:auto;padding:4px 0 10px}.tab{flex:none;border:0;border-radius:14px;padding:10px 14px;font-weight:700;font-size:14px;background:#fff;color:"+T.c+";box-shadow:0 2px 8px rgba(0,0,0,.07);cursor:pointer}.tab.on{background:"+T.c+";color:#fff}.g{background:#fff;border-radius:18px;padding:10px;margin:10px 0;display:flex;gap:12px;align-items:center;box-shadow:0 2px 12px rgba(0,0,0,.07)}.th{width:76px;height:76px;flex:none;border-radius:14px;background:"+T.bg+";display:flex;align-items:center;justify-content:center;font-size:32px;overflow:hidden}.th img{width:100%;height:100%;object-fit:cover}.t{flex:1;min-width:0}.t b{display:block;font-size:16px;overflow-wrap:anywhere}.t small{opacity:.65}.t a{font-size:13px;color:"+T.c+"}.pr{font-weight:700;color:"+T.c+"}.take{border:0;border-radius:13px;padding:11px 12px;font-weight:700;font-size:14px;color:#fff;background:linear-gradient(135deg,"+T.c2+","+T.c+");cursor:pointer;white-space:nowrap}.take.no{background:#e4e4e8;color:#7b7b86;cursor:default}.g.done{opacity:.6}.empty{text-align:center;opacity:.65;margin:34px 10px}#inst{position:fixed;right:14px;bottom:calc(18px + env(safe-area-inset-bottom));border:0;border-radius:22px;padding:13px 18px;font-size:15px;font-weight:800;color:#fff;background:linear-gradient(135deg,"+T.c2+","+T.c+");box-shadow:0 6px 18px rgba(0,0,0,.25);cursor:pointer}";
};sty();
document.head.appendChild(st);
try{if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js")}catch(e){}
document.title=T.n+" 🎁";
document.body.innerHTML='<header><div class="r"><img src="'+T.icon+'" alt=""><div><h1>'+T.n+' 🎁</h1><p id="sub">Les idées cadeaux</p></div></div></header><main><div class="tabs" id="tabs"></div><div id="list"></div></main>';
let items=[],picks={},cur=Q.get("o")||"",db=null,userSel=!!cur;
function occs(){return items.filter(x=>x.occ==="meta"&&x.kid===KID&&!x.del).sort((a,b)=>String(a.d||"").localeCompare(String(b.d||"")))}
function paint(){
 const O=occs();const ids=O.map(o=>o.oid);
 if(userSel&&ids.indexOf(cur)<0)userSel=false;
 if(!userSel){const w=O.find(o=>items.some(x=>x.occ===o.oid&&!x.del));cur=(w||O[0]||{}).oid||""}
 $("tabs").innerHTML=O.length>1?O.map(o=>'<button class="tab'+(o.oid===cur?" on":"")+'" data-o="'+esc(o.oid)+'">'+esc(o.n)+'</button>').join(""):"";
 document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{cur=b.dataset.o;userSel=true;paint()});
 const meta=O.find(o=>o.oid===cur);
 $("sub").textContent=meta?meta.n:"Les idées cadeaux";
 const L=items.filter(x=>x.occ===cur&&!x.del).sort((a,b)=>(a.at||0)-(b.at||0));
 if(!L.length){$("list").innerHTML='<p class="empty">La liste arrive bientôt 🎁</p>';return}
 $("list").innerHTML=L.map(x=>{const pk=picks[cur+"__"+x.id];const price=(typeof x.p==="number"&&x.p>0)?x.p.toFixed(2).replace(".",",")+" €":"";const u=safe(x.u);
  return '<div class="g'+(pk?" done":"")+'"><div class="th">'+(typeof x.img==="string"&&/^(data:image\/|https:\/\/)/.test(x.img)?'<img src="'+x.img.replace(/"/g,"&quot;")+'" alt="" referrerpolicy="no-referrer" loading="lazy">':"🎁")+'</div><div class="t"><b>'+esc(x.n||"")+'</b>'+(price?'<span class="pr">'+price+'</span> ':"")+(u?'<a href="'+esc(u)+'" target="_blank" rel="noopener">Voir le produit</a>':"")+'</div>'+(pk?'<button class="take no" disabled>✅ Réservé</button>':'<button class="take" data-id="'+esc(x.id)+'">Je le prends</button>')+'</div>'}).join("");
 document.querySelectorAll(".take[data-id]").forEach(b=>b.onclick=()=>take(b.dataset.id));
}
async function take(id){
 let nm="";try{nm=localStorage.getItem("fam_name")||""}catch(e){}
 nm=(prompt("Ton prénom pour réserver ce cadeau :",nm)||"").trim().slice(0,40);if(!nm)return;
 try{localStorage.setItem("fam_name",nm)}catch(e){}
 if(!db){alert("Connexion en cours, réessaie dans un instant.");return}
 if(picks[cur+"__"+id]){alert("Ce cadeau vient d’être réservé par quelqu’un d’autre 🎁");return}
 try{await db.set(cur+"__"+id,{name:nm,at:Date.now()});alert("C’est noté, merci "+nm+" ! 🎁")}catch(e){alert("Oups, ça n’a pas marché. Réessaie.")}
}
(async()=>{try{
 const A=await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js");
 const F=await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
 const app=A.initializeApp(FBC);const fs=F.getFirestore(app);
 db={set:(id,d)=>F.setDoc(F.doc(fs,"picks",id),d)};
 F.onSnapshot(F.collection(fs,"items"),s=>{items=s.docs.map(d=>{const x=d.data();x.id=d.id;if(x.occ==="meta")x.oid=d.id.replace(/^occ_/,"");return x});const pf=items.find(x=>x.occ==="prof"&&x.id==="prof_"+KID);if(pf&&!TH[KID]){T={n:pf.n||KID,c:pf.c||"#2f8f6c",c2:mix(pf.c||"#2f8f6c",.45),bg:mix(pf.c||"#2f8f6c",.92),ink:"#16352b",icon:"icon-parents.svg"};sty();document.title=T.n+" 🎁";const h=document.querySelector("header h1");if(h)h.textContent=(pf.e?pf.e+" ":"")+T.n+" 🎁"}paint()});
 F.onSnapshot(F.collection(fs,"picks"),s=>{picks={};s.docs.forEach(d=>{picks[d.id]=d.data()});paint()});
}catch(e){console.error(e)}})();
let DP=null;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();DP=e});
const stand=(window.matchMedia&&matchMedia("(display-mode: standalone)").matches)||navigator.standalone;
if(!stand){const b=document.createElement("button");b.id="inst";b.textContent="📲 Installer l’appli";
 b.onclick=async()=>{if(DP){DP.prompt();try{await DP.userChoice}catch(e){}DP=null;return}
  const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  alert(ios?"Pour installer :\n1) Appuie sur Partager (le carré avec la flèche)\n2) Choisis « Sur l’écran d’accueil »\n3) Ajouter":"Pour installer :\n1) Appuie sur les 3 points ⋮ en haut à droite de Chrome\n2) Choisis « Installer l’application » ou « Ajouter à l’écran d’accueil »\n3) Confirme")};
 document.body.appendChild(b)}
try{const im=new Image();im.onload=()=>{try{const c=document.createElement("canvas");c.width=c.height=512;c.getContext("2d").drawImage(im,0,0,512,512);const l=document.createElement("link");l.rel="apple-touch-icon";l.href=c.toDataURL("image/png");document.head.appendChild(l)}catch(e){}};im.src=T.icon}catch(e){}
paint();
})();
