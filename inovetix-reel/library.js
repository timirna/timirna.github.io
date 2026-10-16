/* Motion Design Workspace — tabs, team video libraries and timestamped feedback.
   Data: window.DATA (videos, teams) from build_workspace.py. Feedback backend URL: window.FEEDBACK_URL (config.js). */
(function () {
  'use strict';
  var DATA = window.DATA || { videos: [], teams: {} };
  var API = (window.FEEDBACK_URL || '').trim();
  var PER_PAGE = 8;
  var STATUS_CLASS = { 'In review': 'review', 'In progress': 'inprog', 'Completed': 'done', 'Delivered': 'delivered', 'Planning': 'planning' };
  var FB_CLASS = { 'Pending': 'pending', 'In progress': 'inprog', 'Resolved': 'done' };

  var feedback = [];          // all rows from the sheet
  var fbState = API ? 'loading' : 'off';
  var state = {};             // per team: { q, status, page, sel, tab }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function mmss(sec) { sec = Math.max(0, Math.floor(sec || 0)); var m = Math.floor(sec / 60), s = sec % 60; return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s; }
  function parseTime(t) {
    t = String(t || '').trim(); if (!t) return null;
    if (/^\d+(\.\d+)?$/.test(t)) return Math.floor(Number(t));
    var m = t.match(/^(\d{1,3}):([0-5]?\d)$/); return m ? Number(m[1]) * 60 + Number(m[2]) : null;
  }
  function ago(iso) {
    var d = new Date(iso); if (isNaN(d)) return '';
    var s = (Date.now() - d.getTime()) / 1000;
    if (s < 60) return 'just now'; if (s < 3600) return Math.floor(s / 60) + ' min ago';
    if (s < 86400) return Math.floor(s / 3600) + ' h ago';
    var n = Math.floor(s / 86400); if (n < 8) return n + (n === 1 ? ' day ago' : ' days ago');
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function pill(status, map) { return '<span class="pill ' + (map[status] || 'pending') + '">' + esc(status) + '</span>'; }
  function byId(id) { for (var i = 0; i < DATA.videos.length; i++) if (DATA.videos[i].id === id) return DATA.videos[i]; return null; }
  function fbFor(id) { return feedback.filter(function (f) { return f.video === id; }).sort(function (a, b) { return a.seconds - b.seconds; }); }
  function openCount(id) { return fbFor(id).filter(function (f) { return f.status !== 'Resolved'; }).length; }

  var I = {
    video: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M10 9.5v5l4-2.5z"/></svg>',
    cal: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
    chat: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    clock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    edit: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>',
    user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>',
    dl: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
    full: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    send: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M21 3L3 10.5l7 2.5 2.5 7z"/><path d="M10 13l4-4"/></svg>'
  };

  /* ---------------- tabs + deep links ---------------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  function showTab(id, scrollTo) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('aria-controls') === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    var panel = document.getElementById(id);
    if (panel && panel.dataset.team) renderTeam(panel.dataset.team);
    if (scrollTo) { var el = document.getElementById(scrollTo); if (el) el.scrollIntoView({ block: 'start' }); }
  }
  function setHash(h) { if (history.replaceState) history.replaceState(null, '', '#' + h); }
  function openVideo(id, scroll) {
    var v = byId(id); if (!v) return;
    var st = teamState(v.team); st.sel = id; st.tab = 'fb';
    var list = filtered(v.team), idx = list.indexOf(v);
    if (idx < 0) { st.q = ''; st.status = ''; $('#q-' + v.team).value = ''; $('#s-' + v.team).value = ''; idx = filtered(v.team).indexOf(v); }
    st.page = Math.floor(idx / PER_PAGE);
    showTab(v.team);
    setHash('v-' + id);
    if (scroll) { var d = document.getElementById('detail-' + v.team); if (d) d.scrollIntoView({ block: 'start' }); }
  }
  var ALIAS = { brand: ['deliverables', 'brand'], scripts: ['deliverables', 'scripts'] };
  function fromHash() {
    var h = decodeURIComponent(location.hash.replace('#', ''));
    if (!h) return;
    if (h.indexOf('v-') === 0 && byId(h.slice(2))) return openVideo(h.slice(2), false);
    if (byId(h)) return openVideo(h, false); // old links like #sohopay-film
    if (ALIAS[h]) return showTab(ALIAS[h][0], ALIAS[h][1]);
    var el = document.getElementById(h);
    if (el && el.getAttribute('role') === 'tabpanel') showTab(h);
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { var id = t.getAttribute('aria-controls'); showTab(id); setHash(id); });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]; n.focus(); n.click();
    });
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-video]');
    if (a) { e.preventDefault(); openVideo(a.getAttribute('data-video'), true); return; }
    var g = e.target.closest('[data-go]');
    if (g) { e.preventDefault(); showTab(g.getAttribute('data-go'), g.getAttribute('data-scroll')); setHash(g.getAttribute('data-scroll') || g.getAttribute('data-go')); }
  });
  window.addEventListener('hashchange', fromHash);

  /* ---------------- library ---------------- */
  function teamState(team) { return state[team] || (state[team] = { q: '', status: '', page: 0, sel: null, tab: 'fb' }); }
  function filtered(team) {
    var st = teamState(team), q = st.q.toLowerCase();
    return DATA.videos.filter(function (v) {
      if (v.team !== team) return false;
      if (st.status && v.status !== st.status) return false;
      return !q || (v.title + ' ' + v.desc + ' ' + v.ref).toLowerCase().indexOf(q) >= 0;
    });
  }
  function card(v, sel) {
    var n = fbFor(v.id).length;
    return '<button class="card' + (sel ? ' sel' : '') + '" data-pick="' + esc(v.id) + '" aria-pressed="' + (sel ? 'true' : 'false') + '">' +
      '<div class="cthumb"><img src="' + esc(v.poster) + '" alt="" loading="lazy"><span class="dur">' + esc(v.length) + '</span></div>' +
      '<div class="cbody"><div class="ctitle"><h3>' + esc(v.title) + '</h3>' + pill(v.status, STATUS_CLASS) + '</div>' +
      '<p class="cdesc">' + esc(v.short) + '</p>' +
      '<div class="cmeta"><span>' + I.video + 'MP4 · ' + esc(v.size) + '</span><span>' + I.cal + esc(v.date) + '</span>' +
      (n ? '<span class="fbcount">' + I.chat + n + (n === 1 ? ' comment' : ' comments') + '</span>' : '') + '</div></div></button>';
  }
  function renderTeam(team) {
    var st = teamState(team), list = filtered(team), all = DATA.videos.filter(function (v) { return v.team === team; });
    var grid = document.getElementById('grid-' + team), pager = document.getElementById('pager-' + team), detail = document.getElementById('detail-' + team);
    if (!grid) return;
    if (!all.length) {
      grid.innerHTML = '<div class="empty"><b>No videos uploaded yet</b>New videos for ' + esc(DATA.teams[team] || team) + ' will show up here with a player and feedback.</div>';
      pager.innerHTML = ''; detail.innerHTML = ''; return;
    }
    var pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    st.page = Math.min(st.page, pages - 1);
    if (!st.sel || !byId(st.sel) || byId(st.sel).team !== team) st.sel = (list[0] || all[0]).id;
    var slice = list.slice(st.page * PER_PAGE, st.page * PER_PAGE + PER_PAGE);
    grid.innerHTML = slice.length ? slice.map(function (v) { return card(v, v.id === st.sel); }).join('') :
      '<div class="empty"><b>No videos match</b>Try a different search or status.</div>';
    if (list.length > PER_PAGE) {
      var h = '<button data-page="' + (st.page - 1) + '" aria-label="Previous page"' + (st.page === 0 ? ' disabled' : '') + '>‹</button>';
      for (var p = 0; p < pages; p++) h += '<button data-page="' + p + '"' + (p === st.page ? ' aria-current="page"' : '') + '>' + (p + 1) + '</button>';
      h += '<button data-page="' + (st.page + 1) + '" aria-label="Next page"' + (st.page === pages - 1 ? ' disabled' : '') + '>›</button>';
      h += '<span class="count">Showing ' + (st.page * PER_PAGE + 1) + '–' + (st.page * PER_PAGE + slice.length) + ' of ' + list.length + ' videos</span>';
      pager.innerHTML = h;
    } else pager.innerHTML = list.length ? '<span class="count">' + list.length + (list.length === 1 ? ' video' : ' videos') + '</span>' : '';
    renderDetail(team);
  }

  function renderDetail(team) {
    var st = teamState(team), v = byId(st.sel), box = document.getElementById('detail-' + team);
    if (!v) { box.innerHTML = ''; return; }
    var fbs = fbFor(v.id), fname = v.file.split('/').pop();
    var frames = v.frames.map(function (t, k) {
      return '<button data-seek="' + t + '" aria-label="Jump to ' + mmss(t) + '"><img src="img/frames/' + esc(v.id) + '-' + k + '.jpg" alt="" loading="lazy"><span>' + mmss(t) + '</span></button>';
    }).join('');
    box.innerHTML =
      '<div class="dtop"><span class="eyebrow">' + esc(DATA.teams[team]) + ' &nbsp;/&nbsp; ' + esc(v.kind) + '</span>' + pill(v.status, STATUS_CLASS) + '</div>' +
      '<video controls playsinline preload="metadata" poster="' + esc(v.poster) + '"><source src="' + esc(v.file) + '" type="video/mp4"></video>' +
      '<div><h3>' + esc(v.title) + '</h3><p class="dref">' + esc(v.ref) + '</p></div>' +
      '<dl class="dfacts"><div><dt>Format</dt><dd>' + esc(v.format) + '</dd></div><div><dt>Length</dt><dd>' + esc(v.length) + '</dd></div>' +
      '<div><dt>File size</dt><dd>' + esc(v.size) + '</dd></div><div><dt>Version</dt><dd>' + esc(v.version) + '</dd></div><div><dt>Updated</dt><dd>' + esc(v.date) + '</dd></div></dl>' +
      '<div class="dbtns"><a class="btn btn-main" href="' + esc(v.file) + '" download="' + esc(fname) + '">' + I.dl + ' Download MP4</a>' +
      '<button class="btn btn-ghost" data-full>' + I.full + ' Full screen</button></div>' +
      '<div class="strip">' + frames + '</div>' +
      '<div class="dtabs" role="tablist">' +
        dtab('fb', 'Feedback &amp; Changes' + (fbs.length ? ' <span class="badge">' + fbs.length + '</span>' : ''), st.tab) +
        dtab('desc', 'Description', st.tab) + dtab('files', 'Files &amp; Assets', st.tab) + '</div>' +
      '<div class="dpane">' + pane(v, st.tab, fbs) + '</div>' +
      '<div class="rev"><h4>Revision History</h4><ol>' + v.revisions.map(function (r, i) {
        return '<li class="' + (i === 0 ? 'cur' : '') + '"><b>' + esc(r.v) + '</b><time>' + esc(r.date) + '</time><em>' + (i === 0 ? 'Current version · ' : '') + esc(r.note) + '</em></li>';
      }).join('') + '</ol></div>';
    wireDetail(team, v, box);
  }
  function dtab(key, label, cur) { return '<button class="dtab" role="tab" data-dtab="' + key + '" aria-selected="' + (key === cur ? 'true' : 'false') + '">' + label + '</button>'; }

  function pane(v, tab, fbs) {
    if (tab === 'desc') {
      return '<div class="desc-body"><p>' + esc(v.desc) + '</p><dl><dt>Reference</dt><dd>' + esc(v.refName) + '</dd><dt>Team</dt><dd>' + esc(DATA.teams[v.team]) +
        '</dd><dt>Type</dt><dd>' + esc(v.kind) + '</dd><dt>Status</dt><dd>' + esc(v.status) + '</dd></dl></div>';
    }
    if (tab === 'files') {
      var fname = v.file.split('/').pop();
      return '<div class="assets"><article class="file"><div class="thumb cover"><img src="' + esc(v.poster) + '" alt=""></div><div><h4>' + esc(fname) +
        '</h4><p>MP4 · ' + esc(v.size) + ' · ' + esc(v.format) + '</p></div><a class="btn btn-file" href="' + esc(v.file) + '" download="' + esc(fname) + '">MP4 ↓</a></article>' +
        '<article class="file"><div class="thumb cover"><img src="' + esc(v.poster) + '" alt=""></div><div><h4>Poster frame</h4><p>JPG · cover image</p></div>' +
        '<a class="btn btn-file" href="' + esc(v.poster) + '" download="' + esc(v.id) + '-poster.jpg">JPG ↓</a></article></div>';
    }
    var list;
    if (fbState === 'off') list = '<div class="note">Feedback isn’t switched on yet. Comments will appear here once it’s connected.</div>';
    else if (fbState === 'loading') list = '<div class="note">Loading feedback…</div>';
    else if (fbState === 'error') list = '<div class="note">Couldn’t load feedback right now. Refresh the page to try again.</div>';
    else if (!fbs.length) list = '<div class="note">No feedback yet. Pause the video where you want a change and add it below.</div>';
    else list = '<div class="fb-list">' + fbs.map(function (f) {
      return '<div class="fb"><span class="avatar" aria-hidden="true">' + esc((f.name || '?').charAt(0).toUpperCase()) + '</span><div><b>' + esc(f.name) +
        '</b><div class="when"><button data-seek="' + Number(f.seconds) + '" aria-label="Jump to ' + esc(f.time) + '">' + esc(f.time) + '</button> · ' + esc(ago(f.created)) +
        '</div><p>' + esc(f.comment) + '</p></div>' + pill(f.status, FB_CLASS) + '</div>';
    }).join('') + '</div>';
    var off = fbState === 'off';
    var form = '<form class="fb-form" novalidate><h4>Add a new change request</h4>' +
      '<div class="fb-row"><label class="field">' + I.clock + '<input name="time" inputmode="numeric" placeholder="Video timestamp (e.g. 00:15)" aria-label="Video timestamp"></label>' +
      '<button type="button" class="btn btn-ghost" data-now>Use current time</button></div>' +
      '<label class="field">' + I.user + '<input name="who" autocomplete="name" maxlength="60" placeholder="Your name" aria-label="Your name"></label>' +
      '<label class="field" style="align-items:flex-start">' + '<span style="padding-top:11px">' + I.edit + '</span><textarea name="comment" maxlength="1000" placeholder="Describe the changes needed…" aria-label="Describe the changes needed"></textarea></label>' +
      '<label class="hp" aria-hidden="true">Website <input name="website" tabindex="-1" autocomplete="off"></label>' +
      '<button class="btn btn-main" type="submit"' + (off ? ' disabled' : '') + '>' + I.send + ' Submit request</button>' +
      '<div class="msg" role="status"></div></form>';
    return list + form;
  }

  function wireDetail(team, v, box) {
    var video = $('video', box), st = teamState(team);
    function seek(t) { try { video.currentTime = Number(t); video.play && video.play().catch(function () {}); } catch (e) {} }
    box.querySelectorAll('[data-seek]').forEach(function (b) { b.addEventListener('click', function () { seek(b.getAttribute('data-seek')); }); });
    $('[data-full]', box).addEventListener('click', function () {
      var fn = video.requestFullscreen || video.webkitRequestFullscreen || video.webkitEnterFullscreen;
      if (fn) { try { var r = fn.call(video); if (r && r.catch) r.catch(function () {}); } catch (e) {} }
    });
    var strip = box.querySelectorAll('.strip button');
    video.addEventListener('timeupdate', function () {
      var t = video.currentTime, k = -1;
      v.frames.forEach(function (f, i) { if (t >= f - 0.05) k = i; });
      strip.forEach(function (b, i) { b.classList.toggle('on', i === k); });
    });
    box.querySelectorAll('[data-dtab]').forEach(function (b) {
      b.addEventListener('click', function () {
        st.tab = b.getAttribute('data-dtab');
        box.querySelectorAll('[data-dtab]').forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
        var p = $('.dpane', box); p.innerHTML = pane(v, st.tab, fbFor(v.id)); wirePane(team, v, box);
      });
    });
    wirePane(team, v, box);
  }

  function wirePane(team, v, box) {
    var video = $('video', box), pane = $('.dpane', box);
    pane.querySelectorAll('[data-seek]').forEach(function (b) {
      b.addEventListener('click', function () { try { video.currentTime = Number(b.getAttribute('data-seek')); video.scrollIntoView({ block: 'nearest' }); } catch (e) {} });
    });
    var form = $('form', pane); if (!form) return;
    try { form.who.value = localStorage.getItem('ws-name') || ''; } catch (e) {}
    $('[data-now]', form).addEventListener('click', function () { video.pause(); form.time.value = mmss(video.currentTime); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = $('.msg', form), btn = $('button[type=submit]', form);
      var secs = form.time.value.trim() ? parseTime(form.time.value) : Math.floor(video.currentTime || 0);
      var name = form.who.value.trim(), comment = form.comment.value.trim();
      msg.className = 'msg err';
      if (secs === null) { msg.textContent = 'Write the time as mm:ss, for example 00:15.'; form.time.focus(); return; }
      if (!name) { msg.textContent = 'Add your name so the team knows who asked.'; form.who.focus(); return; }
      if (!comment) { msg.textContent = 'Describe the change you need.'; form.comment.focus(); return; }
      if (!API) { msg.textContent = 'Feedback isn’t switched on yet.'; return; }
      try { localStorage.setItem('ws-name', name); } catch (e2) {}
      btn.disabled = true; msg.className = 'msg'; msg.textContent = 'Sending…';
      fetch(API, { method: 'POST', body: JSON.stringify({ video: v.id, seconds: secs, name: name, comment: comment, website: form.website.value }) })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (!res || !res.ok) throw new Error((res && res.error) || 'Something went wrong.');
          if (res.item) feedback.push(res.item);
          var st = teamState(team); st.tab = 'fb';
          renderTeam(team);
          var m = $('#detail-' + team + ' .msg'); if (m) { m.className = 'msg ok'; m.textContent = 'Request added at ' + mmss(secs) + '.'; }
        })
        .catch(function (err) { btn.disabled = false; msg.className = 'msg err'; msg.textContent = (err && err.message && err.message !== 'Failed to fetch') ? err.message : 'Couldn’t send. Check your connection and try again.'; });
    });
  }

  document.querySelectorAll('.lib-panel').forEach(function (panel) {
    var team = panel.dataset.team, st = teamState(team);
    panel.addEventListener('click', function (e) {
      var c = e.target.closest('[data-pick]');
      if (c) { st.sel = c.getAttribute('data-pick'); st.tab = 'fb'; renderTeam(team); setHash('v-' + st.sel);
        if (window.innerWidth <= 1100) document.getElementById('detail-' + team).scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
      var p = e.target.closest('[data-page]');
      if (p && !p.disabled) { st.page = Number(p.getAttribute('data-page')); renderTeam(team); }
    });
    $('#q-' + team).addEventListener('input', function (e) { st.q = e.target.value; st.page = 0; renderTeam(team); });
    $('#s-' + team).addEventListener('change', function (e) { st.status = e.target.value; st.page = 0; renderTeam(team); });
  });

  /* ---------------- feedback load ---------------- */
  function rerenderOpen() {
    document.querySelectorAll('.lib-panel').forEach(function (p) { if (!p.hidden) renderTeam(p.dataset.team); });
  }
  if (API) {
    fetch(API).then(function (r) { return r.json(); }).then(function (res) {
      feedback = (res && res.items) || []; fbState = 'ready'; rerenderOpen();
    }).catch(function () { fbState = 'error'; rerenderOpen(); });
  }

  fromHash();
})();
