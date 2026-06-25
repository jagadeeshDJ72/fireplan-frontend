// ── FORMAT HELPERS ──
const fmt   = n => '₹' + Math.round(n).toLocaleString('en-IN');
const fmtL  = n => {
  if(n>=10000000) return '₹'+(n/10000000).toFixed(2)+' Cr';
  if(n>=100000)   return '₹'+(n/100000).toFixed(2)+' L';
  return fmt(n);
};
const fmtPct = n => n.toFixed(1)+'%';
const fmtYr  = n => n+' yr'+(n===1?'':'s');

// ── BACKEND API CONFIG ──
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001/api'
  : 'https://fireplan-backend.onrender.com/api';

// Token helpers
const getToken  = () => localStorage.getItem('fp_token');
const saveAuth  = (token, user) => {
  localStorage.setItem('fp_token', token);
  localStorage.setItem('fp_current', JSON.stringify(user));
};
const clearAuth = () => {
  localStorage.removeItem('fp_token');
  localStorage.removeItem('fp_current');
};
function isLoggedIn() { return !!(getToken() || localStorage.getItem('fp_current')); }
function currentUser(){ return JSON.parse(localStorage.getItem('fp_current')||'null'); }

// ── NAV HTML ──
function renderNav(){
  const user = currentUser();
  const authBtn = user
    ? `<div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:13px;color:var(--ink-2);font-weight:500">Hi, ${user.name.split(' ')[0]}</span>
        <button onclick="handleLogout()" style="background:transparent;border:1.5px solid var(--border);color:var(--ink-2);padding:6px 14px;border-radius:var(--radius-sm);font-size:13px;cursor:pointer;font-family:inherit;transition:all .2s" onmouseover="this.style.borderColor='var(--green)';this.style.color='var(--green)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--ink-2)'">Logout</button>
      </div>`
    : `<button onclick="openModal('login')" style="background:var(--green);color:white;padding:7px 16px;border-radius:var(--radius-sm);font-size:13px;font-weight:600;border:none;cursor:pointer;font-family:inherit;transition:background .2s" onmouseover="this.style.background='var(--green-md)'" onmouseout="this.style.background='var(--green)'">Login / Sign up</button>`;

  return `<nav>
    <a href="../index.html" class="logo">MCM | <span>Middle Class Money</span></a>
    <div class="nav-links">
      <a href="../index.html">Home</a>
      <a href="../index.html#calculators">Calculators</a>
      <a href="../pages/fire-corpus-calculator.html">FIRE</a>
      <a href="../pages/blog.html">Blog</a>
    </div>
    <div style="display:flex;align-items:center;gap:10px">
      ${authBtn}
    </div>
  </nav>`;
}

// ── FOOTER HTML ──
function renderFooter(){
  return `<footer>
    <div class="affiliate-note">
      ⓘ Disclosure: Some links on this site are affiliate links. If you open an account through our links, we may earn a small commission at no extra cost to you. This keeps all calculators free. MiddleClassMoney.in does not provide personalised investment advice — all tools are for planning and informational purposes only.
    </div>
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">MCM | <span>Middle Class Money</span></div>
        <p class="footer-brand-text">India's most complete financial calculator suite. 23+ free tools. No signup required.</p>
      </div>
      <div class="footer-col">
        <h4>FIRE calculators</h4>
        <a href="fire-corpus-calculator.html">FIRE corpus</a>
        <a href="immortal-swp-calculator.html">Immortal SWP</a>
        <a href="coast-fire-calculator.html">Coast FIRE</a>
        <a href="lean-fat-fire-calculator.html">Lean / Fat FIRE</a>
        <a href="swp-depletion-calculator.html">SWP depletion</a>
        <a href="retirement-corpus-calculator.html">Retirement corpus</a>
      </div>
      <div class="footer-col">
        <h4>Investment tools</h4>
        <a href="sip-calculator.html">SIP calculator</a>
        <a href="step-up-sip-calculator.html">Step-up SIP</a>
        <a href="fd-laddering-calculator.html">FD ladder planner</a>
        <a href="lumpsum-calculator.html">Lumpsum returns</a>
      </div>
      <div class="footer-col">
        <h4>Tax &amp; loans</h4>
        <a href="income-tax-calculator.html">Income tax FY26</a>
        <a href="capital-gains-tax-calculator.html">Capital gains tax</a>
        <a href="home-loan-emi-calculator.html">Home loan EMI</a>
        <a href="personal-loan-calculator.html">Personal loan EMI</a>
        <a href="inflation-calculator.html">Inflation calculator</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 MiddleClassMoney.in — All calculators free to use</span>
      <span>
        <a href="privacy.html">Privacy</a> &nbsp;·&nbsp;
        <a href="disclaimer.html">Disclaimer</a> &nbsp;·&nbsp;
        <a href="contact.html">Contact</a>
      </span>
    </div>
  </footer>
  <button id="scrolltop" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Scroll to top">↑</button>
  <div class="toast" id="toast"></div>`;
}

// ── AFFILIATE SIDEBAR ──
function renderAffiliateSidebar(){
  return `<div class="sidebar-card">
    <div class="sidebar-title">Start investing today</div>
    <div class="affiliate-item">
      <div class="aff-logo">G</div>
      <div class="aff-info">
        <div class="aff-name">Groww</div>
        <div class="aff-desc">Direct mutual funds · Zero commission SIP</div>
      </div>
      <a href="https://groww.in/?ref=MCM" target="_blank" rel="nofollow sponsored" class="aff-btn">Start SIP →</a>
    </div>
    <div class="affiliate-item">
      <div class="aff-logo">U</div>
      <div class="aff-info">
        <div class="aff-name">Upstox</div>
        <div class="aff-desc">Free demat account · ₹20/trade flat</div>
      </div>
      <a href="https://upstox.com/?ref=MCM" target="_blank" rel="nofollow sponsored" class="aff-btn">Open now →</a>
    </div>
    <p style="font-size:10px;color:var(--ink-3);margin-top:10px;line-height:1.5">*Affiliate links. We may earn a commission if you open an account.</p>
  </div>`;
}

// ── AD BOX ──
function renderAdBox(slot){
  return `<div class="sidebar-card" style="padding:8px">
    <div class="ad-box">
      <div style="font-size:20px">📢</div>
      <div>Google Ad ${slot}</div>
      <div style="font-size:10px">Paste AdSense code here</div>
    </div>
  </div>`;
}

// ── MODAL ──
function renderModal(){
  return `<div class="modal-overlay" id="modalOverlay" onclick="closeModalOnBg(event)">
    <div class="modal">
      <button class="modal-close" onclick="closeModal()">×</button>
      <h3 id="modalTitle">Download your report</h3>
      <p id="modalDesc">Create a free account to download your personalised PDF report — year-by-year projections included.</p>
      <div class="modal-tabs">
        <button class="modal-tab active" onclick="switchTab('signup',this)">Create free account</button>
        <button class="modal-tab" onclick="switchTab('login',this)">Log in</button>
      </div>
      <div id="signupForm" class="modal-form">
        <input type="text"     placeholder="Your name"                    id="regName"  required>
        <input type="email"    placeholder="Email address"                id="regEmail" required>
        <input type="password" placeholder="Create password (min 6 chars)" id="regPwd"   required>
        <button class="btn-modal-submit" onclick="handleSignup()">Create account &amp; download</button>
        <div class="modal-note">By signing up you agree to our <a href="../pages/privacy.html" style="color:var(--green)">privacy policy</a>. No spam, ever.</div>
      </div>
      <div id="loginForm" class="modal-form" style="display:none">
        <input type="email"    placeholder="Email address" id="loginEmail" required>
        <input type="password" placeholder="Password"      id="loginPwd"   required>
        <button class="btn-modal-submit" onclick="handleLogin()">Log in &amp; download</button>
        <div class="modal-note"><a href="#" style="color:var(--green)">Forgot password?</a></div>
      </div>
    </div>
  </div>`;
}

// ── MODAL LOGIC ──
let pendingDownload = null;

function openModal(type, downloadFn){
  pendingDownload = downloadFn || null;
  // Inject modal if not present
  if (!document.getElementById('modalOverlay')) {
    document.body.insertAdjacentHTML('beforeend', renderModal());
  }
  const overlay = document.getElementById('modalOverlay');
  if(overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Switch to correct tab
  if(type === 'login') switchTab('login', document.querySelector('.modal-tab:last-child'));
}
function closeModal(){
  const overlay = document.getElementById('modalOverlay');
  if(overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOnBg(e){
  if(e.target.id==='modalOverlay') closeModal();
}
function switchTab(tab, el){
  document.querySelectorAll('.modal-tab').forEach(t=>t.classList.remove('active'));
  if(el) el.classList.add('active');
  document.getElementById('signupForm').style.display = tab==='signup'?'flex':'none';
  document.getElementById('loginForm').style.display  = tab==='login' ?'flex':'none';
}

// ── REAL API SIGNUP ──
async function handleSignup() {
  const name  = document.getElementById('regName')?.value?.trim();
  const email = document.getElementById('regEmail')?.value?.trim();
  const pwd   = document.getElementById('regPwd')?.value;
  if (!name || !email || pwd?.length < 6) { showToast('Please fill all fields (password min 6 chars)'); return; }

  const btn = document.querySelector('#signupForm .btn-modal-submit');
  if (btn) { btn.textContent = 'Creating account...'; btn.disabled = true; }

  try {
    const res  = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password: pwd })
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error || 'Signup failed'); return; }
    saveAuth(data.token, data.user);
    closeModal();
    refreshNavAuth();
    showToast(`Welcome, ${data.user.name}! Downloading now...`);
    if (pendingDownload) setTimeout(pendingDownload, 600);
  } catch {
    showToast('Network error. Please try again.');
  } finally {
    if (btn) { btn.textContent = 'Create account & download'; btn.disabled = false; }
  }
}

// ── REAL API LOGIN ──
async function handleLogin() {
  const email = document.getElementById('loginEmail')?.value?.trim();
  const pwd   = document.getElementById('loginPwd')?.value;
  if (!email || !pwd) { showToast('Enter email and password'); return; }

  const btn = document.querySelector('#loginForm .btn-modal-submit');
  if (btn) { btn.textContent = 'Logging in...'; btn.disabled = true; }

  try {
    const res  = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pwd })
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error || 'Login failed'); return; }
    saveAuth(data.token, data.user);
    closeModal();
    refreshNavAuth();
    showToast(`Welcome back, ${data.user.name}! Downloading...`);
    if (pendingDownload) setTimeout(pendingDownload, 600);
  } catch {
    showToast('Network error. Please try again.');
  } finally {
    if (btn) { btn.textContent = 'Log in & download'; btn.disabled = false; }
  }
}

function handleLogout() {
  clearAuth();
  refreshNavAuth();
  showToast('Logged out successfully');
}

// Re-render nav auth section after login/logout
function refreshNavAuth() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  // Re-render the full nav
  const newNav = document.createElement('div');
  newNav.innerHTML = renderNav();
  nav.replaceWith(newNav.firstElementChild);
}

// Record download server-side
async function recordDownload(calculator) {
  const token = getToken();
  if (!token) return;
  fetch(`${API_URL}/downloads/record`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ calculator })
  }).catch(() => {});
}

// ── TOAST ──
function showToast(msg, dur=3000){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), dur);
}

// ── FAQ TOGGLE ──
function toggleFaq(el){
  el.closest('.faq-item').classList.toggle('open');
}

// ── SCROLL TOP ──
window.addEventListener('scroll',()=>{
  const btn = document.getElementById('scrolltop');
  if(btn) btn.classList.toggle('show', window.scrollY>400);
});

// ── PDF GENERATION (via jsPDF) ──
async function generatePDF(data){
  if(!window.jspdf){ showToast('Loading PDF library...'); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({orientation:'portrait', unit:'mm', format:'a4'});
  const green=[27,107,69], gold=[200,134,10], white=[255,255,255], ink=[15,31,23];
  const W=210, M=20;

  doc.setFillColor(...green);
  doc.rect(0,0,W,36,'F');
  doc.setTextColor(...white);
  doc.setFontSize(20); doc.setFont('helvetica','bold');
  doc.text('MiddleClassMoney.in', M, 16);
  doc.setFontSize(11); doc.setFont('helvetica','normal');
  doc.text(data.title+' Report', M, 26);
  doc.setFontSize(9);
  doc.text('Generated '+new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}), W-M, 26, {align:'right'});

  const user = currentUser();
  if(user){ doc.setFontSize(9); doc.text('Prepared for: '+user.name, W-M, 16, {align:'right'}); }

  let y = 48;
  doc.setTextColor(...ink);
  doc.setFontSize(13); doc.setFont('helvetica','bold');
  doc.text('Summary', M, y); y+=8;
  doc.setFontSize(10); doc.setFont('helvetica','normal');
  doc.setTextColor(58,74,64);

  if(data.summary){
    data.summary.forEach(item=>{
      doc.setFont('helvetica','bold'); doc.text(item.label+':', M, y);
      doc.setFont('helvetica','normal'); doc.text(item.value, M+60, y);
      y+=7;
    });
  }
  y+=6;

  if(data.table && data.table.length){
    doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(...ink);
    doc.text('Year-by-Year Projection', M, y); y+=8;
    const cols=data.table[0];
    const colW=(W-2*M)/cols.length;
    doc.setFillColor(...green);
    doc.rect(M, y-5, W-2*M, 8, 'F');
    doc.setTextColor(...white); doc.setFont('helvetica','bold'); doc.setFontSize(9);
    cols.forEach((h,i)=>doc.text(h, M+colW*i+2, y));
    y+=8;
    doc.setTextColor(58,74,64); doc.setFont('helvetica','normal');
    data.table.slice(1).forEach((row,ri)=>{
      if(y>270){doc.addPage();y=20;}
      if(ri%2===0){doc.setFillColor(246,250,247);doc.rect(M,y-5,W-2*M,7,'F');}
      row.forEach((cell,i)=>doc.text(String(cell),M+colW*i+2,y));
      y+=7;
    });
  }

  y+=10;
  doc.setFontSize(7.5); doc.setTextColor(130,140,135);
  doc.text('Disclaimer: This report is for informational and planning purposes only. MiddleClassMoney.in does not provide regulated investment advice.', M, y, {maxWidth:W-2*M});
  doc.text('Investments are subject to market risks. Please consult a SEBI-registered advisor before making investment decisions.', M, y+5, {maxWidth:W-2*M});

  const pages=doc.getNumberOfPages();
  for(let p=1;p<=pages;p++){
    doc.setPage(p);
    doc.setFillColor(...green);
    doc.rect(0,285,W,12,'F');
    doc.setTextColor(...white); doc.setFontSize(8);
    doc.text('MiddleClassMoney.in — Free Financial Calculators for India', M, 292);
    doc.text('Page '+p+' of '+pages, W-M, 292, {align:'right'});
  }

  doc.save(data.filename||'MCM-Report.pdf');
  showToast('PDF downloaded!');
  if(user) recordDownload(data.title);
}
