const menuToggle=document.getElementById('menuToggle');
const mainNav=document.getElementById('mainNav');
menuToggle.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));
let currentFilter='tous';
const cards=[...document.querySelectorAll('.resource-card')];
const searchInput=document.getElementById('searchInput');
function updateResources(){const q=searchInput.value.trim().toLocaleLowerCase('fr');let visible=0;cards.forEach(card=>{const levelOk=currentFilter==='tous'||card.dataset.level===currentFilter;const text=(card.dataset.search+' '+card.innerText).toLocaleLowerCase('fr');const searchOk=!q||text.includes(q);const show=levelOk&&searchOk;card.hidden=!show;if(show)visible++;});document.getElementById('emptyState').hidden=visible!==0;}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');currentFilter=btn.dataset.filter;updateResources();}));
searchInput.addEventListener('input',updateResources);
document.querySelectorAll('.quiz-options button').forEach(btn=>btn.addEventListener('click',()=>{const feedback=document.getElementById('quizFeedback');document.querySelectorAll('.quiz-options button').forEach(b=>{b.classList.remove('correct','wrong');b.disabled=true;});if(btn.dataset.answer==='true'){btn.classList.add('correct');feedback.textContent='Bonne réponse : une balance mesure la masse. Le dynamomètre mesure une force et le thermomètre une température.';}else{btn.classList.add('wrong');document.querySelector('[data-answer="true"]').classList.add('correct');feedback.textContent='Pas tout à fait. La bonne réponse est une balance : elle mesure la masse.';}}));
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('.class-card').forEach(card=>card.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===card.dataset.level));currentFilter=card.dataset.level;document.getElementById('resourceTitle').textContent='Ressources de '+card.dataset.level+'.';updateResources();}));
