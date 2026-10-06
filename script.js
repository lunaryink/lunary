const DEFAULT_GRID=[
["嘉然","https://workers.vrp.moe/bilibili/avatar/672328094?size=240","最喜欢"],
["乃琳","https://via.placeholder.com/120/ffd6e4/9b6077?text=E","喜欢"],
["贝拉","https://via.placeholder.com/120/f9d8df/9b6077?text=B","喜欢"],
["向晚","https://via.placeholder.com/120/e9ddff/80658e?text=A","喜欢"],
["珈乐","https://via.placeholder.com/120/d9eaff/607b9b?text=C","喜欢"],
["自定义 VTuber","https://via.placeholder.com/120/ffe8f0/9b6077?text=%E2%99%A1","关注"],
["VTuber 7","https://via.placeholder.com/120/ffe8f0/9b6077?text=7","一般"],
["VTuber 8","https://via.placeholder.com/120/ffe8f0/9b6077?text=8","一般"],
["VTuber 9","https://via.placeholder.com/120/ffe8f0/9b6077?text=9","观望"],
["VTuber 10","https://via.placeholder.com/120/ffe8f0/9b6077?text=10","一般"],
["VTuber 11","https://via.placeholder.com/120/ffe8f0/9b6077?text=11","观望"],
["VTuber 12","https://via.placeholder.com/120/ffe8f0/9b6077?text=12","一般"]
];
let grid=JSON.parse(localStorage.getItem("pinkBlogGrid")||"null")||DEFAULT_GRID.map(x=>[...x]);
let editing=false;
const qs=s=>document.querySelector(s);
function toast(t){const e=qs("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1800)}
function renderGrid(){
 const root=qs("#vtuberGrid");root.innerHTML="";
 grid.forEach((v,i)=>{
  const el=document.createElement("div");el.className="vtuber";
  el.innerHTML=`${editing?'<span class="edit-hint">编辑</span>':""}<img src="${v[1]}" alt="${v[0]}" onerror="this.src='https://via.placeholder.com/120/ffe8f0/9b6077?text=%E2%99%A1'"><b>${v[0]}</b><span class="tag">${v[2]}</span>${editing?`<select data-i="${i}"><option ${v[2]=="最喜欢"?"selected":""}>最喜欢</option><option ${v[2]=="喜欢"?"selected":""}>喜欢</option><option ${v[2]=="关注"?"selected":""}>关注</option><option ${v[2]=="一般"?"selected":""}>一般</option><option ${v[2]=="观望"?"selected":""}>观望</option></select>`:""}`;
  root.appendChild(el);
 });
 root.querySelectorAll("select").forEach(s=>s.onchange=()=>{grid[+s.dataset.i][2]=s.value;localStorage.setItem("pinkBlogGrid",JSON.stringify(grid));toast("已保存")});
}
qs("#adminBtn").onclick=()=>{
 if(!editing){
  const p=prompt("管理员密码（默认：change-me-2026）");
  if(p!=="change-me-2026") return toast("密码错误");
  editing=true;qs("#adminBtn").textContent="退出管理员模式";toast("已进入编辑模式");
 }else{editing=false;qs("#adminBtn").textContent="管理员模式";toast("已退出编辑模式")}
 renderGrid();
};
qs("#exportBtn").onclick=()=>{
 const blob=new Blob([JSON.stringify(grid,null,2)],{type:"application/json"}),a=document.createElement("a");
 a.href=URL.createObjectURL(blob);a.download="vtuber-preference-grid.json";a.click();URL.revokeObjectURL(a.href);toast("已导出");
};
qs("#importFile").onchange=e=>{
 const f=e.target.files[0];if(!f)return;const r=new FileReader();
 r.onload=()=>{try{const x=JSON.parse(r.result);if(!Array.isArray(x))throw 0;grid=x;localStorage.setItem("pinkBlogGrid",JSON.stringify(grid));renderGrid();toast("导入成功")}catch{toast("JSON 格式不正确")}};r.readAsText(f);
};
const audio=qs("#audio"), playlist=qs("#playlist");let songs=[];
function renderPlaylist(){
 playlist.innerHTML=songs.length?songs.map((s,i)=>`<div class="track ${i===0?"active":""}" data-i="${i}"><span class="track-num">${String(i+1).padStart(2,"0")}</span><div class="track-info"><b>${s.name}</b><small>${s.artist||"Local file"}</small></div><button title="播放">▶</button></div>`).join(""):"<div class='track'><div class='track-info'><b>还没有歌曲</b><small>点击右上角“添加本地音乐”</small></div></div>";
 playlist.querySelectorAll(".track[data-i]").forEach(e=>e.onclick=()=>play(+e.dataset.i));
}
function play(i){songs.forEach((s,j)=>s.el.classList.toggle("active",j===i));const s=songs[i];audio.src=s.url;qs("#songTitle").textContent=s.name;qs("#songArtist").textContent=s.artist||"Local file";audio.play();renderPlaylist()}
qs("#musicFiles").onchange=e=>{songs=[...songs,...[...e.target.files].map(f=>({name:f.name.replace(/\.[^.]+$/,""),artist:"本地音乐",url:URL.createObjectURL(f),el:document.createElement("div")}))];renderPlaylist();if(songs.length===1)play(0)};
qs("#year").textContent=new Date().getFullYear();renderGrid();renderPlaylist();
