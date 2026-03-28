(function(){
  const KEY = 'kiro-tutorial-progress';
  const state = JSON.parse(localStorage.getItem(KEY) || '{}');
  const navList = document.getElementById('nav-list');
  const container = document.getElementById('section-container');
  let currentId = null;

  function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }

  function updateProgress(){
    const total = ALL_SECTIONS.length;
    const done = ALL_SECTIONS.filter(s => state[s.id]).length;
    const pct = Math.round((done/total)*100);
    document.getElementById('progress-fill').style.width = pct+'%';
    document.getElementById('progress-text').textContent = pct+'% complete ('+done+'/'+total+')';
  }

  function render(){
    navList.innerHTML = '';
    container.innerHTML = '';
    ALL_SECTIONS.forEach((s,i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#'+s.id;
      a.innerHTML = '<span class="check '+(state[s.id]?'done':'')+'">'+
        (state[s.id]?'✓':'○')+'</span>'+s.title;
      a.dataset.id = s.id;
      a.addEventListener('click', e => { e.preventDefault(); showSection(s.id); });
      li.appendChild(a);
      navList.appendChild(li);

      const div = document.createElement('div');
      div.className = 'section';
      div.id = 'section-'+s.id;
      div.innerHTML = s.content +
        '<div class="btn-row">' +
        (i > 0 ? '<button class="secondary" data-nav="prev" data-idx="'+i+'">← Previous</button>' : '') +
        '<button class="mark-done'+(state[s.id]?' completed':'')+'" data-id="'+s.id+'">'+
        (state[s.id]?'✓ Completed':'Mark Complete')+'</button>' +
        (i < ALL_SECTIONS.length-1 ? '<button data-nav="next" data-idx="'+i+'">Next →</button>' : '') +
        '</div>';
      container.appendChild(div);
    });
    updateProgress();
  }

  container.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if(!btn) return;
    if(btn.dataset.nav === 'prev') showSection(ALL_SECTIONS[+btn.dataset.idx - 1].id);
    else if(btn.dataset.nav === 'next') showSection(ALL_SECTIONS[+btn.dataset.idx + 1].id);
    else if(btn.dataset.id){
      const id = btn.dataset.id;
      state[id] = !state[id];
      save();
      render();
      showSection(id);
    }
  });

  function showSection(id){
    currentId = id;
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('#nav-list a').forEach(a => a.classList.remove('active'));
    const sec = document.getElementById('section-'+id);
    if(sec) sec.classList.add('active');
    const link = document.querySelector('#nav-list a[data-id="'+id+'"]');
    if(link) link.classList.add('active');
    window.history.replaceState(null,'','#'+id);
  }

  render();
  const hash = location.hash.slice(1);
  showSection(hash && ALL_SECTIONS.find(s=>s.id===hash) ? hash : ALL_SECTIONS[0].id);
})();
