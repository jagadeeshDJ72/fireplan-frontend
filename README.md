# FirePlan.in — Frontend

India's most complete FIRE & financial calculator suite.
15 free calculators with PDF download gate, affiliate links, and Google AdSense slots.

## Deploy to Vercel (same account as XamTym)

1. Push this `fireplan` folder to a NEW GitHub repo:
   ```
   cd fireplan
   git init
   git add .
   git commit -m "Initial FirePlan.in build"
   git remote add origin https://github.com/YOUR_USERNAME/fireplan.git
   git push -u origin main
   ```

2. Go to vercel.com → Add New Project → Import `fireplan` repo
3. Framework Preset: **Other** (static HTML, no build step needed)
4. Root Directory: leave as `/` (the root has index.html)
5. Click Deploy → done in 30 seconds

Your site will be live at: `https://fireplan.vercel.app`

## After buying fireplan.in domain

In Vercel: Project → Settings → Domains → Add `fireplan.in`
At your domain registrar: add CNAME record pointing to `cname.vercel-dns.com`

## Update backend URL

In `js/shared.js`, line ~160:
Change `https://fireplan-api.onrender.com/api` to your actual Render URL.

## Add Google AdSense

After AdSense approval, replace each `<!-- Google AdSense -->` placeholder comment in:
- `index.html` (2 slots)
- Every calculator page in `pages/` (sidebar ad boxes)

## Add real affiliate links

In `js/shared.js` → `renderAffiliateSidebar()`, replace the placeholder URLs:
- Zerodha: join partner.zerodha.com, get your referral link
- Groww: join via Cuelinks network (instant approval)
- Upstox: join upstox.com/affiliate
