const lessons = {
 security:{title:"Online Security", color:"pink-card", icon:"🔒", desc:"Learn how to stay safe online, protect your information, and recognize scams.", learn:["Create and use strong passwords","Spot scams, suspicious links, and phishing","Keep personal information private","Use safer privacy settings"], steps:["A strong password is long and unique. Avoid using your name, birthday, or the same password everywhere.","Before clicking a link, check who sent it and where it leads. Be careful with urgent messages asking for money or passwords.","Never share passwords, verification codes, or private information with strangers online."]},
 workspace:{title:"Google Workspace", color:"yellow-card", icon:"G", desc:"Get comfortable with Google Docs, Slides, Forms, and Sheets.", learn:["Create and edit Google Docs","Make simple presentations in Slides","Build forms for surveys or feedback","Organize data in Sheets"], steps:["Open Google Drive and choose New. Select Docs, Slides, Forms, or Sheets.","Practice typing, changing text, adding an image, and renaming your file.","Use Share to decide who can view or edit your work."]},
 ai:{title:"Writing a Good Prompt for AI", color:"pink-card", icon:"✦", desc:"Learn how to ask AI useful questions, get better answers, and decide when AI is appropriate.", learn:["Write clear prompts","Give AI useful context","Ask for a specific format or level","Understand when to use — and not use — AI"], steps:["Say exactly what you want. Instead of “help me write,” try “write a short, friendly email asking my teacher for an extension.”","Give context such as your audience, goal, language, length, or experience level.","Check AI's answer before trusting it. AI can make mistakes, so use your own judgment."]},
 canva:{title:"How to Use Canva", color:"yellow-card", icon:"C", desc:"Create simple and beautiful designs even if you have no previous design experience.", learn:["Find Canva templates","Add and edit text and images","Make posters and presentations","Download and share designs"], steps:["Choose a design type or template. Start with a simple template if you are new.","Click an element to change its text, size, position, or image.","When finished, choose Share or Download and select the format you need."]},
 chromebook:{title:"Chromebook Basics", color:"pink-card", icon:"▱", desc:"Learn the buttons, features, shortcuts, and everyday controls on your Chromebook.", learn:["Understand the keyboard and trackpad","Open and close apps and tabs","Adjust volume and brightness","Use basic keyboard shortcuts"], steps:["Use the trackpad to move the pointer, click items, and scroll. The top keyboard row contains useful Chromebook controls.","Try Search, volume, brightness, and screenshot controls on the keyboard.","Practice opening a browser, creating a new tab, switching tabs, and closing a tab."]},
 coding:{title:"Introduction to Coding", color:"yellow-card", icon:"</>", desc:"Start your coding journey with simple, beginner-friendly concepts.", learn:["Understand what code does","Write your first HTML","Change text and headings","Build a tiny webpage"], steps:["HTML is the structure of a webpage. Try a heading such as <h1>Hello!</h1>.","Add a paragraph with <p>This is my first webpage.</p>.","Save the file as index.html and open it in a browser to see your result."]}
};

function setupMenu(){
 const toggle=document.querySelector(".menu-toggle"), nav=document.querySelector(".navbar nav");
 if(toggle) toggle.addEventListener("click",()=>nav.classList.toggle("open"));
 const lang=document.getElementById("language");
 if(lang){lang.value=localStorage.getItem("siteLanguage")||"en";lang.addEventListener("change",()=>{localStorage.setItem("siteLanguage",lang.value); alert("Language selected: "+lang.options[lang.selectedIndex].text+". Add translated lesson text to make the content multilingual.");});}
}
function renderLessons(){
 const list=document.getElementById("lessonList"); if(!list)return;
 list.innerHTML=Object.entries(lessons).map(([id,l],i)=>`<a class="full-lesson ${l.color}" href="lesson.html?id=${id}"><span class="icon">${l.icon}</span><span class="num">${i+1}.</span><span class="details"><h3>${l.title}</h3><p>${l.desc}</p></span><span class="arrow">›</span></a>`).join("");
}
function renderLesson(){
 const box=document.getElementById("lessonContent"); if(!box)return;
 const id=new URLSearchParams(location.search).get("id")||"security", l=lessons[id]||lessons.security;
 document.title=l.title+" | Digital Doorway";
 box.innerHTML=`<div class="lesson-header ${l.color}"><p class="eyebrow dark">LESSON ${Object.keys(lessons).indexOf(id)+1}</p><h1>${l.icon} ${l.title}</h1><p class="lead">${l.desc}</p></div>
 <div class="lesson-layout"><aside class="side-nav">${Object.entries(lessons).map(([key,x],i)=>`<a class="${key===id?'current':''}" href="lesson.html?id=${key}">${i+1}. ${x.title}</a>`).join("")}</aside>
 <section><div class="video-placeholder"><div class="play">▶</div><strong data-i18n="teachingVideo">Teaching video</strong><small data-i18n="videoHint">Add your own video from the Resources page.</small></div>
 <div class="tabs" role="tablist" aria-label="Lesson sections">
   <button type="button" class="lesson-tab active" id="tab-guide" role="tab" aria-selected="true" aria-controls="panel-guide" data-tab="guide">Lesson Guide</button>
   <button type="button" class="lesson-tab" id="tab-practice" role="tab" aria-selected="false" aria-controls="panel-practice" data-tab="practice">Practice</button>
   <button type="button" class="lesson-tab" id="tab-resources" role="tab" aria-selected="false" aria-controls="panel-resources" data-tab="resources">Resources</button>
 </div>
 <div class="tab-content active" id="panel-guide" role="tabpanel" aria-labelledby="tab-guide">
   <div class="content-card"><h2 data-i18n="learnHeading">What you'll learn</h2><ul>${l.learn.map(x=>`<li>✓ ${x}</li>`).join("")}</ul><h2 style="margin-top:30px" data-i18n="stepsHeading">Step by step</h2><ol>${l.steps.map(x=>`<li>${x}</li>`).join("")}</ol></div>
 </div>
 <div class="tab-content" id="panel-practice" role="tabpanel" aria-labelledby="tab-practice" hidden>
   <div class="content-card"><h2 data-i18n="practiceHeading">Practice</h2><p data-i18n="practiceIntro">Try what you learned in this lesson. Take your time and don't worry about making mistakes.</p>
   <div class="practice-box"><strong data-i18n="practiceTask">Your practice activity</strong><p data-i18n="practiceTaskCopy">Choose one skill from this lesson and try it yourself. When you finish, explain what you did or show it to someone you trust.</p></div></div>
 </div>
 <div class="tab-content" id="panel-resources" role="tabpanel" aria-labelledby="tab-resources" hidden>
   <div class="content-card"><h2 data-i18n="resourcesHeading">Resources</h2><p data-i18n="resourcesIntro">Open the resource library to find teaching videos, slides, worksheets, and other learning materials.</p><a href="resources.html" class="button" data-i18n="resourcesButton">View Resources →</a></div>
 </div></section></div>`;

 const tabs=box.querySelectorAll(".lesson-tab");
 const panels=box.querySelectorAll(".tab-content");
 tabs.forEach(tab=>{
   tab.addEventListener("click",()=>{
     tabs.forEach(t=>{
       const selected=t===tab;
       t.classList.toggle("active",selected);
       t.setAttribute("aria-selected",String(selected));
     });
     panels.forEach(panel=>{
       const selected=panel.id==="panel-"+tab.dataset.tab;
       panel.classList.toggle("active",selected);
       panel.hidden=!selected;
     });
   });
 });
}
function setupResources(){
 const input=document.getElementById("resourceFile"), list=document.getElementById("resourceList"); if(!input)return;
 const stored=JSON.parse(localStorage.getItem("resources")||"[]");
 const render=()=>{list.innerHTML=stored.length?stored.map((f,i)=>`<div class="resource-item"><span>📎</span><strong>${f.name}</strong><small>${f.type||"file"}</small><button class="remove" data-i="${i}">Remove</button></div>`).join(""):"<p class='lead'>No resources uploaded yet.</p>";list.querySelectorAll(".remove").forEach(b=>b.onclick=()=>{stored.splice(+b.dataset.i,1);localStorage.setItem("resources",JSON.stringify(stored));render()})};
 input.addEventListener("change",()=>{[...input.files].forEach(f=>stored.push({name:f.name,type:f.type,size:f.size}));localStorage.setItem("resources",JSON.stringify(stored));render();input.value=""}); render();
}
function setupExperiences(){
 const input=document.getElementById("experiencePhotos"), gallery=document.getElementById("experienceGallery"), form=document.getElementById("storyForm"); if(!gallery)return;
 let photos=JSON.parse(localStorage.getItem("experiencePhotos")||"[]");
 const render=()=>{
   gallery.innerHTML=photos.length?photos.map((p,i)=>`<div class="gallery-card"><img src="${p.data}" alt="${escapeHtml(p.name)}"><div class="caption">${escapeHtml(p.name)}</div><button type="button" class="delete-photo" data-index="${i}" aria-label="Delete ${escapeHtml(p.name)}">Delete photo</button></div>`).join(""):"<div class='gallery-empty'>Your workshop photos will appear here.<br>Add the first one below.</div>";
   gallery.querySelectorAll(".delete-photo").forEach(button=>button.addEventListener("click",()=>{
     const index=Number(button.dataset.index);
     if(!Number.isInteger(index)||index<0||index>=photos.length)return;
     if(confirm("Delete this photo?")){
       photos.splice(index,1);
       localStorage.setItem("experiencePhotos",JSON.stringify(photos));
       render();
     }
   }));
 };
 const uploadButton=document.querySelector(".gallery-upload");
 if(uploadButton && input) uploadButton.onclick=()=>input.click();
 if(input) input.addEventListener("change",()=>{
   [...input.files].forEach(f=>{
     if(!f.type.startsWith("image/"))return;
     const r=new FileReader();
     r.onload=()=>{
       photos.push({name:f.name,data:r.result});
       try{
         localStorage.setItem("experiencePhotos",JSON.stringify(photos));
         render();
       }catch(err){
         photos.pop();
         alert("This image may be too large for browser storage. Please try a smaller image.");
       }
     };
     r.readAsDataURL(f);
   });
   input.value="";
 });
 render();

 if(form){
   const stories=JSON.parse(localStorage.getItem("stories")||"[]");
   const add=s=>{stories.unshift(s);localStorage.setItem("stories",JSON.stringify(stories));renderStories();};
   const renderStories=()=>{
     let old=document.getElementById("postedStories");
     if(!old){old=document.createElement("div");old.id="postedStories";form.after(old);}
     old.innerHTML=stories.map(s=>`<article class="posted-story"><h3>${escapeHtml(s.title||"")}</h3><small>${escapeHtml(s.date||"Workshop story")}${s.timestamp?" • Posted "+new Date(s.timestamp).toLocaleString():""}</small><p>${escapeHtml(s.text||"")}</p></article>`).join("");
   };
   form.addEventListener("submit",e=>{
     e.preventDefault();
     add({
       title:document.getElementById("storyTitle").value.trim(),
       date:document.getElementById("storyDate").value,
       text:document.getElementById("storyText").value.trim(),
       timestamp:new Date().toISOString()
     });
     form.reset();
   });
   renderStories();
 }
}

function escapeHtml(value){
 return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
document.addEventListener("DOMContentLoaded",()=>{setupMenu();renderLessons();renderLesson();setupResources();setupExperiences()});
