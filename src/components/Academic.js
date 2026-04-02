// ============================================================
// Academic.js
// Section 4 — Academic Qualifications + Publications & Patents
// KYC Form:
//   Sec 3 — Academic Qualifications (up to 7 rows + Rewards row)
//   Sec 5 — Publications and Patents
// ============================================================
const MAX_QUAL_ROWS = 7;
const DEFAULT_QUAL  = { degree:’’, year:’’, university:’’, location:’’, grade:’’ };
export function Academic({ data = {}, onChange, onNext, onBack, stepInfo }) {
function set(field, value) {
onChange({ …data, [field]: value });
}
function setQual(index, field, value) {
const quals = […(data.qualifications || Array(MAX_QUAL_ROWS).fill(null).map(() => ({…DEFAULT_QUAL})))];
quals[index] = { …(quals[index] || {…DEFAULT_QUAL}), [field]: value };
onChange({ …data, qualifications: quals });
}
function addRow() {
const quals = data.qualifications || [];
if (quals.length >= MAX_QUAL_ROWS) return;
onChange({ …data, qualifications: […quals, {…DEFAULT_QUAL}] });
renderRows();
}
function removeRow(index) {
const quals = […(data.qualifications || [])];
quals.splice(index, 1);
onChange({ …data, qualifications: quals });
renderRows();
}
function validate() {
const quals = data.qualifications || [];
let hasAtLeastOne = quals.some(q => q.degree || q.university);
if (!hasAtLeastOne) {
document.getElementById(‘ac-qual-error’).style.display = ‘block’;
return false;
}
document.getElementById(‘ac-qual-error’).style.display = ‘none’;
return true;
}
function renderRows() {
const container = document.getElementById(‘ac-qual-rows’);
if (!container) return;
const quals = data.qualifications || [{ …DEFAULT_QUAL }];
container.innerHTML = quals.map((q, i) => qualRowHTML(q, i, quals.length)).join(’’);
// Re-bind
container.querySelectorAll(‘input, select’).forEach(inp => {
inp.addEventListener(‘input’, e => setQual(parseInt(e.target.dataset.row), e.target.dataset.field, e.target.value));
inp.addEventListener(‘change’, e => setQual(parseInt(e.target.dataset.row), e.target.dataset.field, e.target.value));
});
container.querySelectorAll(’.ac-remove-btn’).forEach(btn => {
btn.addEventListener(‘click’, () => removeRow(parseInt(btn.dataset.row)));
});
}
function qualRowHTML(q = {}, i, total) {
return `
<div class="mh-table-row"
style="grid-template-columns:2fr 0.7fr 2fr 1.2fr 1.2fr 32px"
id="ac-qual-row-${i}">
```
<input class="mh-input" placeholder="e.g. B.E. Mechanical"
     value="${q.degree || ''}"
     data-row="${i}" data-field="degree"
     style="font-size:13px" />
<input class="mh-input" placeholder="2022"
     value="${q.year || ''}"
     data-row="${i}" data-field="year"
     maxlength="4"
     style="font-size:13px;font-family:var(--font-mono);text-align:center" />
<input class="mh-input" placeholder="University / Institute"
     value="${q.university || ''}"
     data-row="${i}" data-field="university"
     style="font-size:13px" />
<input class="mh-input" placeholder="City / State"
     value="${q.location || ''}"
     data-row="${i}" data-field="location"
     style="font-size:13px" />
<input class="mh-input" placeholder="e.g. 8.4 CGPA / 78%"
     value="${q.grade || ''}"
     data-row="${i}" data-field="grade"
     style="font-size:13px" />
<button class="ac-remove-btn" data-row="${i}"
     title="Remove row"
     style="
       width:28px;height:28px;border-radius:50%;
       border:1px solid var(--border);
       background:var(--surface);
       cursor:pointer;color:var(--text-hint);
       font-size:14px;display:grid;place-items:center;
       transition:all .15s;flex-shrink:0;
       ${total <= 1 ? 'opacity:0.3;pointer-events:none' : ''}
     ">×</button>
</div>
`;
```
}
// Rewards row (last row of the table per KYC format)
function rewardsRowHTML() {
return `<div class="mh-table-row" style="grid-template-columns:1fr;background:var(--amber-light)"> <div style="display:flex;align-items:center;gap:10px"> <span style="font-size:12px;font-weight:600;color:var(--amber);white-space:nowrap">Rewards / Recognitions</span> <input class="mh-input" id="ac-rewards" type="text" placeholder="Any awards or recognitions" value="${data.rewards || ''}" style="font-size:13px;background:transparent;border-color:var(--amber-light)" /> </div> </div>`;
}
const quals = data.qualifications || [{ …DEFAULT_QUAL }];
const el = document.createElement(‘div’);
el.className = ‘mh-section’;
el.innerHTML = `
```
<div class="mh-section-header">
<div class="mh-section-icon">🎓</div>
<div>
<div class="mh-section-num">Section 4 · KYC Form</div>
<div class="mh-section-title">Academic Qualifications</div>
<div class="mh-section-desc">Start from the most recently acquired qualification. Include all from High School onwards.</div>
</div>
</div>
<div class="mh-section-body">
<!-- Section 3 — Qualifications Table -->
<div class="mh-group">
<div class="mh-group-label">Section 3 — Qualifications</div>
<div id="ac-qual-error" style="
     display:none;
     background:var(--mh-red-light);
     border:1px solid var(--mh-red-mid);
     border-radius:var(--radius-sm);
     padding:10px 14px;
     font-size:13px;
     color:var(--mh-red);
     margin-bottom:12px;
   ">Please add at least one qualification.</div>
<div class="mh-table-card">
<div class="mh-table-header"
       style="grid-template-columns:2fr 0.7fr 2fr 1.2fr 1.2fr 32px">
<span>Degree / Qualification</span>
<span style="text-align:center">Year</span>
<span>University / Institute</span>
<span>Location</span>
<span>Grade / %</span>
<span></span>
</div>
<div id="ac-qual-rows">
       ${quals.map((q, i) => qualRowHTML(q, i, quals.length)).join('')}
</div>
     ${rewardsRowHTML()}
</div>
<button class="mh-btn mh-btn-outline" id="ac-add-row-btn"
     style="margin-top:10px;font-size:13px;padding:8px 16px">
     + Add Qualification
</button>
</div>
<!-- Section 5 — Publications & Patents -->
<div class="mh-group">
<div class="mh-group-label">Section 5 — Publications & Patents</div>
<div class="mh-infobox amber">
<span class="mh-infobox-icon">📝</span>
<span>Give an abstract of important papers or books you have written. You may keep the information brief. Leave blank if not applicable.</span>
</div>
<div class="mh-row cols-1">
<div class="mh-field">
<label class="mh-label" for="ac-publications">
         Publications & Patents
<span class="field-ref">Sec 5</span>
</label>
<textarea class="mh-textarea" id="ac-publications"
         placeholder="Title, Publication, Year — e.g. 'Thermal analysis of filtration systems, IJME, 2021'"
         rows="4">${data.publications || ''}</textarea>
</div>
</div>
</div>
</div>
<div class="mh-nav">
<button class="mh-btn mh-btn-outline" id="ac-back-btn">← Back</button>
<span class="mh-nav-progress">${stepInfo}</span>
<button class="mh-btn mh-btn-primary" id="ac-next-btn">Next — Work History →</button>
</div>
```
`;
// ── Bind qual rows ──────────────────────────────────────────
el.querySelectorAll(’#ac-qual-rows input’).forEach(inp => {
inp.addEventListener(‘input’, e =>
setQual(parseInt(e.target.dataset.row), e.target.dataset.field, e.target.value));
inp.addEventListener(‘change’, e =>
setQual(parseInt(e.target.dataset.row), e.target.dataset.field, e.target.value));
});
el.querySelectorAll(’.ac-remove-btn’).forEach(btn => {
btn.addEventListener(‘click’, () => {
removeRow(parseInt(btn.dataset.row));
renderRows();
});
});
el.querySelector(’#ac-add-row-btn’).addEventListener(‘click’, () => {
const quals = data.qualifications || [{ …DEFAULT_QUAL }];
if (quals.length >= MAX_QUAL_ROWS) return;
onChange({ …data, qualifications: […quals, { …DEFAULT_QUAL }] });
renderRows();
});
el.querySelector(’#ac-rewards’).addEventListener(‘input’, e => set(‘rewards’, e.target.value));
el.querySelector(’#ac-publications’).addEventListener(‘input’, e => set(‘publications’, e.target.value));
el.querySelector(’#ac-back-btn’).addEventListener(‘click’, onBack);
el.querySelector(’#ac-next-btn’).addEventListener(‘click’, () => {
if (validate()) onNext();
});
return el;
}
