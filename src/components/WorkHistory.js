// ============================================================
// WorkHistory.js
// Section 5 — Work Experience + EPFO Previous Employment
// KYC Form:
//   Sec 4 — Work Experience (reverse chronological, up to 6 rows)
//           Total / Relevant / Apprentice experience summary
// EPFO Form 11:
//   Field 8  — Whether earlier a member of EPF Scheme 1952?
//   Field 9  — Whether earlier a member of EPS 1995?
//   Field 10 — Previous UAN / PF Member ID
//   Field 11 — Date of exit from previous employer
//   Field 12 — Scheme Certificate / PPO Number
// ============================================================
const MAX_WORK_ROWS = 6;
const DEFAULT_JOB = { from:’’, to:’’, organisation:’’, designation:’’, role:’’ };
export function WorkHistory({ data = {}, onChange, onNext, onBack, stepInfo }) {
function set(field, value) {
onChange({ …data, [field]: value });
}
function setJob(index, field, value) {
const jobs = […(data.workHistory || Array(1).fill(null).map(() => ({…DEFAULT_JOB})))];
jobs[index] = { …(jobs[index] || { …DEFAULT_JOB }), [field]: value };
onChange({ …data, workHistory: jobs });
}
function addJobRow() {
const jobs = data.workHistory || [];
if (jobs.length >= MAX_WORK_ROWS) return;
onChange({ …data, workHistory: […jobs, { …DEFAULT_JOB }] });
renderJobRows();
}
function removeJobRow(index) {
const jobs = […(data.workHistory || [])];
if (jobs.length <= 1) return;
jobs.splice(index, 1);
onChange({ …data, workHistory: jobs });
renderJobRows();
}
function renderJobRows() {
const container = document.getElementById(‘wh-job-rows’);
if (!container) return;
const jobs = data.workHistory || [{ …DEFAULT_JOB }];
container.innerHTML = jobs.map((j, i) => jobRowHTML(j, i, jobs.length)).join(’’);
bindJobRows(container, jobs.length);
}
function bindJobRows(container, total) {
container.querySelectorAll(‘input, select’).forEach(inp => {
inp.addEventListener(‘input’, e =>
setJob(parseInt(e.target.dataset.row), e.target.dataset.field, e.target.value));
inp.addEventListener(‘change’, e =>
setJob(parseInt(e.target.dataset.row), e.target.dataset.field, e.target.value));
});
container.querySelectorAll(’.wh-remove-job’).forEach(btn => {
btn.addEventListener(‘click’, () => removeJobRow(parseInt(btn.dataset.row)));
});
}
function jobRowHTML(j = {}, i, total) {
return `
<div class="mh-table-row"
style="grid-template-columns:0.8fr 0.8fr 1.4fr 1.2fr 2fr 28px;align-items:start"
id="wh-job-${i}">
```
<input class="mh-input" placeholder="MM/YYYY"
     value="${j.from || ''}"
     data-row="${i}" data-field="from"
     style="font-size:12px;font-family:var(--font-mono)" />
<input class="mh-input" placeholder="MM/YYYY"
     value="${j.to || ''}"
     data-row="${i}" data-field="to"
     style="font-size:12px;font-family:var(--font-mono)" />
<input class="mh-input" placeholder="Organisation"
     value="${j.organisation || ''}"
     data-row="${i}" data-field="organisation"
     style="font-size:13px" />
<input class="mh-input" placeholder="Designation at leaving"
     value="${j.designation || ''}"
     data-row="${i}" data-field="designation"
     style="font-size:12px" />
<input class="mh-input" placeholder="Role, responsibilities, reporting structure"
     value="${j.role || ''}"
     data-row="${i}" data-field="role"
     style="font-size:12px" />
<button class="wh-remove-job" data-row="${i}"
     title="Remove"
     style="
       width:26px;height:26px;border-radius:50%;
       border:1px solid var(--border);
       background:var(--surface);cursor:pointer;
       color:var(--text-hint);font-size:14px;
       display:grid;place-items:center;
       margin-top:4px;flex-shrink:0;
       ${total <= 1 ? 'opacity:0.3;pointer-events:none' : ''}
     ">×</button>
</div>
`;
```
}
const jobs = data.workHistory || [{ …DEFAULT_JOB }];
const el = document.createElement(‘div’);
el.className = ‘mh-section’;
el.innerHTML = `
```
<div class="mh-section-header">
<div class="mh-section-icon">💼</div>
<div>
<div class="mh-section-num">Section 5 · KYC Form + EPFO Form 11</div>
<div class="mh-section-title">Work Experience</div>
<div class="mh-section-desc">Start with the most recent job. Include Apprentice and Vocational training periods if any.</div>
</div>
</div>
<div class="mh-section-body">
<!-- Work History Table -->
<div class="mh-group">
<div class="mh-group-label">Section 4 — Work Experience (Reverse Chronological)</div>
<div class="mh-table-card">
<div class="mh-table-header"
       style="grid-template-columns:0.8fr 0.8fr 1.4fr 1.2fr 2fr 28px">
<span>From</span>
<span>To</span>
<span>Organisation</span>
<span>Designation</span>
<span>Role & Reporting Structure</span>
<span></span>
</div>
<div id="wh-job-rows">
       ${jobs.map((j, i) => jobRowHTML(j, i, jobs.length)).join('')}
</div>
</div>
<button class="mh-btn mh-btn-outline" id="wh-add-job-btn"
     style="margin-top:10px;font-size:13px;padding:8px 16px">
     + Add Previous Employer
</button>
<!-- Experience Summary -->
<div class="mh-row cols-3" style="margin-top:20px">
<div class="mh-field">
<label class="mh-label" for="wh-total-exp">
         Total Experience
<span class="field-ref">Sec 4</span>
</label>
<input class="mh-input" id="wh-total-exp" type="text"
         placeholder="e.g. 3 years 6 months"
         value="${data.totalExperience || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="wh-relevant-exp">
         Relevant Experience
<span class="field-ref">Sec 4</span>
</label>
<input class="mh-input" id="wh-relevant-exp" type="text"
         placeholder="e.g. 2 years"
         value="${data.relevantExperience || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="wh-apprentice">
         Apprentice Period
<span class="field-ref">Sec 4</span>
</label>
<input class="mh-input" id="wh-apprentice" type="text"
         placeholder="If any"
         value="${data.apprenticePeriod || ''}" />
</div>
</div>
</div>
<!-- EPFO Form 11 — Previous Membership -->
<div class="mh-group">
<div class="mh-group-label">EPFO Form 11 — Previous PF / EPS Membership</div>
<div class="mh-infobox amber">
<span class="mh-infobox-icon">ℹ</span>
<span>Required for EPFO Form 11 (Fields 8–12). If you have never been employed before, select No for both.</span>
</div>
<!-- Field 8: Earlier EPF member? -->
<div class="mh-row cols-2">
<div class="mh-field">
<label class="mh-label">
         Earlier a member of EPF Scheme 1952?
<span class="field-ref">Form 11 · 8</span>
</label>
<div class="mh-toggle-wrap" id="wh-epf-member">
<button class="mh-toggle-btn yes ${data.earlierEPFMember === true ? 'active' : ''}"
           data-val="yes">Yes</button>
<button class="mh-toggle-btn no ${data.earlierEPFMember === false ? 'active' : ''}"
           data-val="no">No</button>
</div>
</div>
<!-- Field 9: Earlier EPS member? -->
<div class="mh-field">
<label class="mh-label">
         Earlier a member of EPS 1995?
<span class="field-ref">Form 11 · 9</span>
</label>
<div class="mh-toggle-wrap" id="wh-eps-member">
<button class="mh-toggle-btn yes ${data.earlierEPSMember === true ? 'active' : ''}"
           data-val="yes">Yes</button>
<button class="mh-toggle-btn no ${data.earlierEPSMember === false ? 'active' : ''}"
           data-val="no">No</button>
</div>
</div>
</div>
<!-- Fields 10–12 — conditional on Yes -->
<div id="wh-prev-pf-fields"
     style="${data.earlierEPFMember || data.earlierEPSMember ? '' : 'display:none'}">
<div class="mh-infobox red" style="margin-top:14px">
<span class="mh-infobox-icon">⚠</span>
<span>Since you were previously a member, please mandatorily fill in the previous employment PF details below (Form 11 Fields 10, 11 & 12).</span>
</div>
<!-- Field 10: Previous UAN or PF Member ID -->
<div class="mh-row cols-2" style="margin-top:14px">
<div class="mh-field">
<label class="mh-label" for="wh-prev-uan">
           Universal Account Number (UAN)
<span class="field-ref">Form 11 · 10</span>
</label>
<input class="mh-input" id="wh-prev-uan" type="text"
           placeholder="12-digit UAN"
           maxlength="12"
           value="${data.previousUAN || ''}"
           style="font-family:var(--font-mono);letter-spacing:1px" />
</div>
<div class="mh-field">
<label class="mh-label" for="wh-prev-pfid">
           Previous PF Member ID
<span class="field-ref">Form 11 · 10</span>
</label>
<input class="mh-input" id="wh-prev-pfid" type="text"
           placeholder="Region-Office-EstID-Ext-AccNo"
           value="${data.previousPFMemberID || ''}"
           style="font-family:var(--font-mono);font-size:12px" />
<span class="mh-hint">e.g. KN/BN/123456/001/0000001</span>
</div>
</div>
<!-- Field 11: Date of exit -->
<div class="mh-row cols-2">
<div class="mh-field">
<label class="mh-label" for="wh-prev-exit-date">
           Date of Exit (Previous Employer)
<span class="field-ref">Form 11 · 11</span>
</label>
<input class="mh-input" id="wh-prev-exit-date" type="date"
           value="${data.previousExitDate || ''}" />
</div>
<!-- Field 12a: Scheme Certificate -->
<div class="mh-field">
<label class="mh-label" for="wh-scheme-cert">
           Scheme Certificate No. (if issued)
<span class="field-ref">Form 11 · 12a</span>
</label>
<input class="mh-input" id="wh-scheme-cert" type="text"
           placeholder="If applicable"
           value="${data.schemeCertNo || ''}"
           style="font-family:var(--font-mono)" />
</div>
</div>
<!-- Field 12b: PPO Number -->
<div class="mh-row cols-2">
<div class="mh-field">
<label class="mh-label" for="wh-ppo-no">
           Pension Payment Order (PPO) No.
<span class="field-ref">Form 11 · 12b</span>
</label>
<input class="mh-input" id="wh-ppo-no" type="text"
           placeholder="If applicable"
           value="${data.ppoNumber || ''}"
           style="font-family:var(--font-mono)" />
</div>
<div></div>
</div>
</div>
<!-- International Worker (Form 11 Field 13) -->
<hr class="mh-divider" />
<div class="mh-row cols-2" style="margin-top:0">
<div class="mh-field">
<label class="mh-label">
         International Worker?
<span class="field-ref">Form 11 · 13</span>
</label>
<div class="mh-toggle-wrap" id="wh-intl-worker">
<button class="mh-toggle-btn yes ${data.internationalWorker === true ? 'active' : ''}"
           data-val="yes">Yes</button>
<button class="mh-toggle-btn no ${data.internationalWorker === false ? 'active' : ''}"
           data-val="no">No</button>
</div>
</div>
<div class="mh-field" id="wh-intl-country-wrap"
       style="${data.internationalWorker ? '' : 'display:none'}">
<label class="mh-label" for="wh-intl-country">Country of Origin</label>
<input class="mh-input" id="wh-intl-country" type="text"
         placeholder="Country name"
         value="${data.countryOfOrigin || ''}" />
</div>
</div>
</div>
</div>
<div class="mh-nav">
<button class="mh-btn mh-btn-outline" id="wh-back-btn">← Back</button>
<span class="mh-nav-progress">${stepInfo}</span>
<button class="mh-btn mh-btn-primary" id="wh-next-btn">Next — Nominees →</button>
</div>
```
`;
// ── Bindings ────────────────────────────────────────────────
bindJobRows(el.querySelector(’#wh-job-rows’), jobs.length);
el.querySelector(’#wh-add-job-btn’).addEventListener(‘click’, () => {
const jobs = data.workHistory || [];
if (jobs.length >= MAX_WORK_ROWS) return;
onChange({ …data, workHistory: […jobs, { …DEFAULT_JOB }] });
renderJobRows();
bindJobRows(el.querySelector(’#wh-job-rows’), (data.workHistory || []).length);
});
el.querySelector(’#wh-total-exp’).addEventListener(‘input’, e => set(‘totalExperience’, e.target.value));
el.querySelector(’#wh-relevant-exp’).addEventListener(‘input’, e => set(‘relevantExperience’, e.target.value));
el.querySelector(’#wh-apprentice’).addEventListener(‘input’, e => set(‘apprenticePeriod’, e.target.value));
// EPF/EPS toggles
function bindToggle(id, field) {
el.querySelector(`#${id}`).addEventListener(‘click’, e => {
const btn = e.target.closest(’.mh-toggle-btn’);
if (!btn) return;
el.querySelectorAll(`#${id} .mh-toggle-btn`).forEach(b => b.classList.remove(‘active’));
btn.classList.add(‘active’);
const val = btn.dataset.val === ‘yes’;
set(field, val);
// Show/hide previous PF fields
const show = (field === ‘earlierEPFMember’ ? val : data.earlierEPFMember)
|| (field === ‘earlierEPSMember’ ? val : data.earlierEPSMember);
document.getElementById(‘wh-prev-pf-fields’).style.display = show ? ‘’ : ‘none’;
});
}
bindToggle(‘wh-epf-member’, ‘earlierEPFMember’);
bindToggle(‘wh-eps-member’, ‘earlierEPSMember’);
el.querySelector(’#wh-prev-uan’).addEventListener(‘input’, e => set(‘previousUAN’, e.target.value.replace(/\D/,’’)));
el.querySelector(’#wh-prev-pfid’).addEventListener(‘input’, e => set(‘previousPFMemberID’, e.target.value));
el.querySelector(’#wh-prev-exit-date’).addEventListener(‘change’, e => set(‘previousExitDate’, e.target.value));
el.querySelector(’#wh-scheme-cert’).addEventListener(‘input’, e => set(‘schemeCertNo’, e.target.value));
el.querySelector(’#wh-ppo-no’).addEventListener(‘input’, e => set(‘ppoNumber’, e.target.value));
el.querySelector(’#wh-intl-worker’).addEventListener(‘click’, e => {
const btn = e.target.closest(’.mh-toggle-btn’);
if (!btn) return;
el.querySelectorAll(’#wh-intl-worker .mh-toggle-btn’).forEach(b => b.classList.remove(‘active’));
btn.classList.add(‘active’);
const val = btn.dataset.val === ‘yes’;
set(‘internationalWorker’, val);
document.getElementById(‘wh-intl-country-wrap’).style.display = val ? ‘’ : ‘none’;
});
el.querySelector(’#wh-intl-country’).addEventListener(‘input’, e => set(‘countryOfOrigin’, e.target.value));
el.querySelector(’#wh-back-btn’).addEventListener(‘click’, onBack);
el.querySelector(’#wh-next-btn’).addEventListener(‘click’, onNext);
return el;
}
