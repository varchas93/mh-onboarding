// ============================================================

// Nominees.js

// Section 6 — Nominee Information (all three nomination forms)

// KYC Form:

//   Sec 8 — Nominee Information (PF / Gratuity / Settlement)

//           Up to 3 nominees, each with name, relationship,

//           age, guardian (if minor), % allocation, address,

//           contact + email

// EPFO Form 2 (Revised):

//   Part A (EPF) — nominee table (cols 1–6):

//     Name, Address, Relationship, DOB, Share %, Guardian if minor

//   Part B (EPS Para 18) — family members eligible for widow/

//     children pension + alternate nominee for monthly widow pension

// Form F (Gratuity Nomination):

//   Nominee table — Name+Address, Relationship, Age, Proportion

//   Statement fields mapped from EMP_Master (auto-filled)

// ============================================================

const MAX_NOMINEES = 3;

const DEFAULT_NOM  = {

name:’’, address:’’, relationship:’’, dob:’’, age:’’,

isMinor: null, guardian:’’, guardianAddress:’’, sharePct:’’,

contactEmail:’’

};

const DEFAULT_EPS_FAMILY = { nameAddress:’’, age:’’, relationship:’’ };

export function Nominees({ data = {}, onChange, onNext, onBack, stepInfo }) {

function set(field, value) {

onChange({ …data, [field]: value });

}

function setNominee(index, field, value) {

const noms = […(data.nominees || [{ …DEFAULT_NOM }])];

noms[index] = { …(noms[index] || { …DEFAULT_NOM }), [field]: value };

// Auto-calculate age from DOB

if (field === ‘dob’ && value) {

const dob = new Date(value);

const age = Math.floor((new Date() - dob) / (365.25 * 24 * 3600 * 1000));

noms[index].age = String(age);

noms[index].isMinor = age < 18;

}

onChange({ …data, nominees: noms });

if (field === ‘dob’ || field === ‘isMinor’) renderNomineeRows();

}

function setEPSFamily(index, field, value) {

const rows = […(data.epsFamily || [{ …DEFAULT_EPS_FAMILY }])];

rows[index] = { …(rows[index] || { …DEFAULT_EPS_FAMILY }), [field]: value };

onChange({ …data, epsFamily: rows });

}

function addNominee() {

const noms = data.nominees || [];

if (noms.length >= MAX_NOMINEES) return;

onChange({ …data, nominees: […noms, { …DEFAULT_NOM }] });

renderNomineeRows();

}

function removeNominee(i) {

const noms = […(data.nominees || [])];

if (noms.length <= 1) return;

noms.splice(i, 1);

onChange({ …data, nominees: noms });

renderNomineeRows();

}

function addEPSRow() {

const rows = data.epsFamily || [];

if (rows.length >= 6) return;

onChange({ …data, epsFamily: […rows, { …DEFAULT_EPS_FAMILY }] });

renderEPSRows();

}

// ── Validation ──────────────────────────────────────────────

function validate() {

const noms = data.nominees || [];

if (!noms.length || !noms[0].name) {

document.getElementById(‘nom-error’).style.display = ‘block’;

return false;

}

document.getElementById(‘nom-error’).style.display = ‘none’;

// Validate % sum

const total = noms.reduce((s, n) => s + (parseFloat(n.sharePct) || 0), 0);

if (total > 0 && Math.abs(total - 100) > 0.5) {

document.getElementById(‘nom-pct-error’).style.display = ‘block’;

return false;

}

document.getElementById(‘nom-pct-error’).style.display = ‘none’;

return true;

}

// ── Nominee card HTML ───────────────────────────────────────

function nomineeCardHTML(nom = {}, i, total) {

return `<div class="nom-card" id="nom-card-${i}" style=" border:1px solid var(--border); border-radius:var(--radius-md); overflow:hidden; margin-bottom:12px; "> <!-- Card header --> <div style=" display:flex;align-items:center;gap:12px; padding:12px 16px; background:var(--surface-alt); border-bottom:1px solid var(--border); "> <span style=" background:var(--mh-red);color:white; width:24px;height:24px;border-radius:50%; display:grid;place-items:center; font-size:11px;font-weight:700;flex-shrink:0; ">${i + 1}</span> <span style="font-size:14px;font-weight:600"> ${nom.name ||`Nominee ${i + 1}`} </span> ${nom.relationship ? `<span style="font-size:12px;color:var(--text-hint)">(${nom.relationship})</span>`: ''} ${nom.sharePct ?`<span style="

margin-left:auto;

font-family:var(--font-mono);font-size:12px;

background:var(--mh-red-light);color:var(--mh-red);

padding:2px 10px;border-radius:10px;

">${nom.sharePct}%</span>` : ‘’}
<button class="nom-remove-btn" data-idx="${i}"

style="

margin-left:${nom.sharePct ? '8px' : 'auto'};

width:26px;height:26px;border-radius:50%;

border:1px solid var(--border);background:var(--surface);

cursor:pointer;color:var(--text-hint);font-size:14px;

display:grid;place-items:center;flex-shrink:0;

${total <= 1 ? 'opacity:0.3;pointer-events:none' : ''}

">×</button>
</div>

```
<div style="padding:16px">
<!-- Row 1: Name + Relationship + DOB -->
<div class="mh-row cols-3" style="margin-bottom:12px">
<div class="mh-field">
<label class="mh-label">Name (First–Middle–Last) <span class="req">*</span></label>
<input class="mh-input nom-field" type="text" placeholder="Full name"

            value="${nom.name || ''}"

            data-idx="${i}" data-field="name"

            style="font-size:13px" />
</div>
<div class="mh-field">
<label class="mh-label">Relationship with Employee</label>
<input class="mh-input nom-field" type="text" placeholder="e.g. Spouse, Son"

            value="${nom.relationship || ''}"

            data-idx="${i}" data-field="relationship"

            style="font-size:13px" />
</div>
<div class="mh-field">
<label class="mh-label">Date of Birth <span class="field-ref">Form 2</span></label>
<input class="mh-input nom-field" type="date"

            value="${nom.dob || ''}"

            data-idx="${i}" data-field="dob" />

          ${nom.age ? `<span class="mh-hint">Age: ${nom.age} years${nom.isMinor ? ' — <strong style="color:var(--amber)">MINOR</strong>' : ''}</span>` : ''}
</div>
</div>
<!-- Row 2: Address -->
<div class="mh-row cols-1" style="margin-bottom:12px">
<div class="mh-field">
<label class="mh-label">Address <span class="field-ref">Form 2 · Form F</span></label>
<input class="mh-input nom-field" type="text"

            placeholder="Full address of nominee"

            value="${nom.address || ''}"

            data-idx="${i}" data-field="address"

            style="font-size:13px" />
</div>
</div>
<!-- Row 3: % Allocation + Contact -->
<div class="mh-row cols-3" style="margin-bottom:${nom.isMinor ? '12px' : '0'}">
<div class="mh-field">
<label class="mh-label">% Allocation / Share <span class="req">*</span></label>
<input class="mh-input nom-field" type="number" min="1" max="100"

            placeholder="e.g. 50"

            value="${nom.sharePct || ''}"

            data-idx="${i}" data-field="sharePct"

            style="font-family:var(--font-mono)" />
<span class="mh-hint">All nominees must total 100%</span>
</div>
<div class="mh-field" style="grid-column:span 2">
<label class="mh-label">Contact & Email</label>
<input class="mh-input nom-field" type="text"

            placeholder="Phone and email of nominee"

            value="${nom.contactEmail || ''}"

            data-idx="${i}" data-field="contactEmail"

            style="font-size:13px" />
</div>
</div>
<!-- Guardian fields (if minor) -->

      ${nom.isMinor ? `
<div style="

        background:var(--amber-light);

        border:1px solid #fbbf24;

        border-radius:var(--radius-sm);

        padding:12px;

        margin-top:12px;

      ">
<div style="font-size:12px;font-weight:600;color:var(--amber);margin-bottom:8px">

          ⚠ Nominee is a minor — Guardian details required (Form 2 Column 6)
</div>
<div class="mh-row cols-2">
<div class="mh-field">
<label class="mh-label">Guardian Name</label>
<input class="mh-input nom-field" type="text"

              placeholder="Full name of guardian"

              value="${nom.guardian || ''}"

              data-idx="${i}" data-field="guardian" />
</div>
<div class="mh-field">
<label class="mh-label">Guardian Address</label>
<input class="mh-input nom-field" type="text"

              placeholder="Address of guardian"

              value="${nom.guardianAddress || ''}"

              data-idx="${i}" data-field="guardianAddress" />
</div>
</div>
</div>` : ''}
</div>
</div>

`;

```

}

function epsRowHTML(row = {}, i, total) {

return `<div class="mh-table-row" style="grid-template-columns:2fr 0.8fr 1.5fr 28px" id="eps-row-${i}"> <input class="mh-input eps-field" type="text" placeholder="Name and full address" value="${row.nameAddress || ''}" data-idx="${i}" data-field="nameAddress" style="font-size:12px" /> <input class="mh-input eps-field" type="number" min="0" placeholder="Age" value="${row.age || ''}" data-idx="${i}" data-field="age" style="font-size:12px;font-family:var(--font-mono)" /> <input class="mh-input eps-field" type="text" placeholder="Relationship" value="${row.relationship || ''}" data-idx="${i}" data-field="relationship" style="font-size:12px" /> <button class="eps-remove-btn" data-idx="${i}" style=" width:26px;height:26px;border-radius:50%; border:1px solid var(--border);background:var(--surface); cursor:pointer;color:var(--text-hint);font-size:14px; display:grid;place-items:center; ${total <= 1 ? 'opacity:0.3;pointer-events:none' : ''} ">×</button> </div>`;

}

function renderNomineeRows() {

const container = document.getElementById(‘nom-cards’);

if (!container) return;

const noms = data.nominees || [{ …DEFAULT_NOM }];

container.innerHTML = noms.map((n, i) => nomineeCardHTML(n, i, noms.length)).join(’’);

bindNomineeCards();

updatePctSummary();

}

function renderEPSRows() {

const container = document.getElementById(‘eps-family-rows’);

if (!container) return;

const rows = data.epsFamily || [{ …DEFAULT_EPS_FAMILY }];

container.innerHTML = rows.map((r, i) => epsRowHTML(r, i, rows.length)).join(’’);

bindEPSRows();

}

function updatePctSummary() {

const noms = data.nominees || [];

const total = noms.reduce((s, n) => s + (parseFloat(n.sharePct) || 0), 0);

const el2 = document.getElementById(‘nom-pct-total’);

if (!el2) return;

el2.textContent = `${total}% allocated`;

el2.style.color = Math.abs(total - 100) < 0.5 ? ‘var(–green)’ : total > 100 ? ‘var(–mh-red)’ : ‘var(–amber)’;

document.getElementById(‘nom-pct-error’).style.display =

total > 0 && Math.abs(total - 100) > 0.5 ? ‘block’ : ‘none’;

}

function bindNomineeCards() {

el.querySelectorAll(’.nom-field’).forEach(inp => {

inp.addEventListener(‘input’, e => {

setNominee(parseInt(e.target.dataset.idx), e.target.dataset.field, e.target.value);

updatePctSummary();

});

inp.addEventListener(‘change’, e => {

setNominee(parseInt(e.target.dataset.idx), e.target.dataset.field, e.target.value);

});

});

el.querySelectorAll(’.nom-remove-btn’).forEach(btn => {

btn.addEventListener(‘click’, () => removeNominee(parseInt(btn.dataset.idx)));

});

}

function bindEPSRows() {

el.querySelectorAll(’.eps-field’).forEach(inp => {

inp.addEventListener(‘input’, e =>

setEPSFamily(parseInt(e.target.dataset.idx), e.target.dataset.field, e.target.value));

});

el.querySelectorAll(’.eps-remove-btn’).forEach(btn => {

btn.addEventListener(‘click’, () => {

const rows = […(data.epsFamily || [])];

if (rows.length <= 1) return;

rows.splice(parseInt(btn.dataset.idx), 1);

onChange({ …data, epsFamily: rows });

renderEPSRows();

});

});

}

const noms    = data.nominees  || [{ …DEFAULT_NOM }];

const epsFam  = data.epsFamily || [{ …DEFAULT_EPS_FAMILY }];

const totalPct = noms.reduce((s,n) => s + (parseFloat(n.sharePct)||0), 0);

const epsMon  = data.epsMonthlyNominee || {};

const el = document.createElement(‘div’);

el.className = ‘mh-section’;

el.innerHTML = `

```
<div class="mh-section-header">
<div class="mh-section-icon">📑</div>
<div>
<div class="mh-section-num">Section 6 · KYC Sec 8 + Form 2 + Form F</div>
<div class="mh-section-title">Nominee Information</div>
<div class="mh-section-desc">PF / Gratuity / Settlement nominees. In the event of death, these persons receive dues from the company.</div>
</div>
</div>
<div class="mh-section-body">
<!-- Nomination declaration infobox -->
<div class="mh-infobox amber">
<span class="mh-infobox-icon">⚖</span>
<span>This nomination covers: EPF (Form 2 Part A), EPS Widow/Children Pension (Form 2 Part B), Gratuity (Form F), and General Settlement (KYC Sec 8). This nomination will remain unchanged unless you notify HR otherwise.</span>
</div>
<!-- Nominee Cards -->
<div class="mh-group">
<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
<div class="mh-group-label" style="margin-bottom:0">KYC Sec 8 + Form 2 Part A + Form F — Nominees</div>
<div style="display:flex;align-items:center;gap:10px">
<span id="nom-pct-total" style="

          font-family:var(--font-mono);font-size:12px;

          color:${Math.abs(totalPct - 100) < 0.5 ? 'var(--green)' : 'var(--amber)'};

        ">${totalPct}% allocated</span>
</div>
</div>
<div id="nom-error" style="

      display:none;

      background:var(--mh-red-light);border:1px solid var(--mh-red-mid);

      border-radius:var(--radius-sm);padding:10px 14px;

      font-size:13px;color:var(--mh-red);margin-bottom:10px;

    ">Please add at least one nominee with a name.</div>
<div id="nom-pct-error" style="

      display:none;

      background:var(--amber-light);border:1px solid #fbbf24;

      border-radius:var(--radius-sm);padding:10px 14px;

      font-size:13px;color:var(--amber);margin-bottom:10px;

    ">⚠ Total allocation must equal 100%. Currently ${totalPct}% allocated.</div>
<div id="nom-cards">

      ${noms.map((n, i) => nomineeCardHTML(n, i, noms.length)).join('')}
</div>
<button class="mh-btn mh-btn-outline" id="nom-add-btn"

      style="margin-top:4px;font-size:13px;padding:8px 16px"

      ${noms.length >= MAX_NOMINEES ? 'disabled' : ''}>

      + Add Nominee (max 3)
</button>
</div>
<!-- EPS Para 18 — Family members for widow/children pension -->
<div class="mh-group">
<div class="mh-group-label">

      Form 2 Part B (EPS Para 18) — Family Members for Widow / Children Pension
</div>
<div class="mh-infobox amber">
<span class="mh-infobox-icon">ℹ</span>
<span>Particulars of family members who would be eligible to receive Widow/Children Pension in the event of premature death in service.</span>
</div>
<div class="mh-table-card">
<div class="mh-table-header"

        style="grid-template-columns:2fr 0.8fr 1.5fr 28px">
<span>Name & Address of Family Member</span>
<span>Age</span>
<span>Relationship</span>
<span></span>
</div>
<div id="eps-family-rows">

        ${epsFam.map((r, i) => epsRowHTML(r, i, epsFam.length)).join('')}
</div>
</div>
<button class="mh-btn mh-btn-outline" id="eps-add-row-btn"

      style="margin-top:10px;font-size:13px;padding:8px 16px">

      + Add Family Member
</button>
<!-- Monthly widow pension nominee -->
<div style="margin-top:18px;padding:14px;background:var(--surface-alt);border:1px solid var(--border);border-radius:var(--radius-md)">
<div style="font-size:13px;font-weight:600;margin-bottom:10px;color:var(--text-secondary)">

        Alternate Nominee for Monthly Widow Pension
</div>
<div style="font-size:12px;color:var(--text-hint);margin-bottom:12px;line-height:1.6">

        Nominee for receiving monthly widow pension in the event of death without leaving any eligible family member.
</div>
<div class="mh-row cols-3">
<div class="mh-field">
<label class="mh-label">Name and Address</label>
<input class="mh-input" id="eps-mon-name" type="text"

            placeholder="Name and address"

            value="${epsMon.nameAddress || ''}" />
</div>
<div class="mh-field">
<label class="mh-label">Date of Birth</label>
<input class="mh-input" id="eps-mon-dob" type="date"

            value="${epsMon.dob || ''}" />
</div>
<div class="mh-field">
<label class="mh-label">Relationship with Member</label>
<input class="mh-input" id="eps-mon-rel" type="text"

            placeholder="e.g. Mother, Sister"

            value="${epsMon.relationship || ''}" />
</div>
</div>
</div>
</div>
</div>
<div class="mh-nav">
<button class="mh-btn mh-btn-outline" id="nom-back-btn">← Back</button>
<span class="mh-nav-progress">${stepInfo}</span>
<button class="mh-btn mh-btn-primary" id="nom-next-btn">Next — Consents & Declarations →</button>
</div>

```

`;

// ── Bind ────────────────────────────────────────────────────

bindNomineeCards();

bindEPSRows();

el.querySelector(’#nom-add-btn’).addEventListener(‘click’, addNominee);

el.querySelector(’#eps-add-row-btn’).addEventListener(‘click’, () => {

const rows = data.epsFamily || [];

if (rows.length >= 6) return;

onChange({ …data, epsFamily: […rows, { …DEFAULT_EPS_FAMILY }] });

renderEPSRows();

});

el.querySelector(’#eps-mon-name’).addEventListener(‘input’, e =>

onChange({ …data, epsMonthlyNominee: { …(data.epsMonthlyNominee || {}), nameAddress: e.target.value }}));

el.querySelector(’#eps-mon-dob’).addEventListener(‘change’, e =>

onChange({ …data, epsMonthlyNominee: { …(data.epsMonthlyNominee || {}), dob: e.target.value }}));

el.querySelector(’#eps-mon-rel’).addEventListener(‘input’, e =>

onChange({ …data, epsMonthlyNominee: { …(data.epsMonthlyNominee || {}), relationship: e.target.value }}));

el.querySelector(’#nom-back-btn’).addEventListener(‘click’, onBack);

el.querySelector(’#nom-next-btn’).addEventListener(‘click’, () => {

if (validate()) onNext();

});

return el;

}
 
