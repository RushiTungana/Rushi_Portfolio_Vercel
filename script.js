const menuButton=document.querySelector(".menu-toggle");
const navLinks=document.querySelector(".nav-links");
menuButton.addEventListener("click",()=>navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(link=>link.addEventListener("click",()=>navLinks.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();

const roles=["Java Full Stack Developer","Application Developer","Problem Solver"];
let roleIndex=0,charIndex=0,deleting=false;
const roleEl=document.getElementById("typed-role");
function typeRole(){
  const current=roles[roleIndex];
  roleEl.textContent=current.slice(0,charIndex);
  if(!deleting && charIndex<current.length){charIndex++;setTimeout(typeRole,85);}
  else if(!deleting){deleting=true;setTimeout(typeRole,1450);}
  else if(charIndex>0){charIndex--;setTimeout(typeRole,38);}
  else{deleting=false;roleIndex=(roleIndex+1)%roles.length;setTimeout(typeRole,300);}
}
setTimeout(typeRole,500);

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll(".section-heading,.glass-card,.project-card,.timeline-item,.education-card,.award-card,.cert-card,.proof-gallery").forEach(el=>{el.classList.add("reveal");observer.observe(el);});

// Reading progress indicator
const progressBar=document.querySelector('.read-progress');
function updateReadingProgress(){
  const scrollable=document.documentElement.scrollHeight-window.innerHeight;
  const progress=scrollable>0?(window.scrollY/scrollable)*100:0;
  progressBar.style.width=progress+'%';
}
window.addEventListener('scroll',updateReadingProgress,{passive:true});
updateReadingProgress();

// Subtle pointer-based 3D tilt on larger screens.
if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){
  document.querySelectorAll('.project-card,.skill-card').forEach(card=>{
    card.addEventListener('pointermove',event=>{
      const rect=card.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width;
      const y=(event.clientY-rect.top)/rect.height;
      const rotateY=(x-.5)*5;
      const rotateX=(.5-y)*4;
      card.style.transform=`translateY(-5px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('pointerleave',()=>{card.style.transform='';});
  });
}
