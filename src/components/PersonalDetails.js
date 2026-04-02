// ============================================================
// PersonalDetails.js
// Section 2 — Personal Details
// KYC Form fields: 2a (DOB), 2b (Gender), 2c (Marital Status),
//                 2d (Citizenship), 2e (Place of Birth),
//                 2f (Passport + PAN + Phone),
//                 2g (Permanent Address), 2h (Present Address),
//                 2i (Language Proficiency)
// ============================================================
const LANGUAGE_ROWS = 4;
export function PersonalDetails({ data = {}, onChange, onNext, onBack, stepInfo }) {
function set(field, value) {
onChange({ …data, [field]: value });
}
function setNested(group, field, value) {
onChange({ …data, [group]: { …(data[group] || {}), [field]: value } });
}
function setLanguage(index, field, value) {
const langs = […(data.languages || Array(LANGUAGE_ROWS).fill({}))];
langs[index] = { …(langs[index] || {}), [field]: value };
onChange({ …data, languages: langs });
}
// Same-as-permanent toggle
function syncPresentAddress(checked) {
if (checked) {
onChange({
…data,
presentSameAsPermanent: true,
presentAddress: { …(data.permanentAddress || {}) }
});
} else {
onChange({ …data, presentSameAsPermanent: false });
}
}
function validate() {
const required = [
{ id: ‘pd-dob’,          key: ‘dob’ },
{ id: ‘pd-gender’,       key: ‘gender’ },
{ id: ‘pd-marital’,      key: ‘maritalStatus’ },
{ id: ‘pd-citizenship’,  key: ‘citizenship’ },
{ id: ‘pd-pan’,          key: ‘pan’ },
{ id: ‘pd-phone’,        key: ‘phone’ },
{ id: ‘pd-perm-line1’,   key: null, nested: [‘permanentAddress’,‘line1’] },
{ id: ‘pd-perm-city’,    key: null, nested: [‘permanentAddress’,‘city’] },
{ id: ‘pd-perm-pin’,     key: null, nested: [‘permanentAddress’,‘pin’] },
];
let valid = true;
required.forEach(({ id, key, nested }) => {
const val = nested
? (data[nested[0]] || {})[nested[1]]
: data[key];
const el = document.getElementById(id);
const wrap = el?.closest(’.mh-field’);
if (!val) {
el?.classList.add(‘error’);
wrap?.classList.add(‘has-error’);
valid = false;
} else {
el?.classList.remove(‘error’);
wrap?.classList.remove(‘has-error’);
}
});
// PAN format
const panEl = document.getElementById(‘pd-pan’);
if (data.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.pan.toUpperCase())) {
panEl?.classList.add(‘error’);
document.getElementById(‘pd-pan-error’).textContent = ‘Invalid PAN format (e.g. ABCDE1234F)’;
document.getElementById(‘pd-pan-error’).style.display = ‘block’;
valid = false;
}
return valid;
}
function handleNext() {
if (validate()) onNext();
}
// ── Build language rows ─────────────────────────────────────
function langRowsHTML() {
return Array.from({ length: LANGUAGE_ROWS }, (_, i) => {
const lang = (data.languages || [])[i] || {};
return `<div class="mh-table-row" style="grid-template-columns:2fr 1fr 1fr 1fr" data-lang="${i}"> <input class="mh-input" id="pd-lang-${i}-name" type="text" placeholder="${i === 0 ? 'e.g. Tamil' : i === 1 ? 'e.g. English' : ''}" value="${lang.name || ''}" /> <div class="mh-toggle-wrap lang-toggle" data-lang="${i}" data-skill="speak"> <button class="mh-toggle-btn yes ${lang.speak ? 'active' : ''}" data-val="true">✓</button> <button class="mh-toggle-btn no"  data-val="false">—</button> </div> <div class="mh-toggle-wrap lang-toggle" data-lang="${i}" data-skill="read"> <button class="mh-toggle-btn yes ${lang.read ? 'active' : ''}" data-val="true">✓</button> <button class="mh-toggle-btn no"  data-val="false">—</button> </div> <div class="mh-toggle-wrap lang-toggle" data-lang="${i}" data-skill="write"> <button class="mh-toggle-btn yes ${lang.write ? 'active' : ''}" data-val="true">✓</button> <button class="mh-toggle-btn no"  data-val="false">—</button> </div> </div>`;
}).join(’’);
}
const el = document.createElement(‘div’);
el.className = ‘mh-section’;
const perm = data.permanentAddress || {};
const pres = data.presentAddress   || {};
el.innerHTML = `
```
<div class="mh-section-header">
<div class="mh-section-icon">👤</div>
<div>
<div class="mh-section-num">Section 2 · KYC Form</div>
<div class="mh-section-title">Personal Details</div>
<div class="mh-section-desc">Personal identification, address, and language proficiency.</div>
</div>
</div>
<div class="mh-section-body">
<!-- 2a DOB + 2b Gender -->
<div class="mh-group">
<div class="mh-group-label">2a & 2b — Date of Birth + Gender</div>
<div class="mh-row cols-2">
<div class="mh-field" id="wrap-pd-dob">
<label class="mh-label" for="pd-dob">
         Date of Birth <span class="req">*</span>
<span class="field-ref">2a</span>
</label>
<input class="mh-input" id="pd-dob" type="date"
         value="${data.dob || ''}" max="${new Date().toISOString().split('T')[0]}" />
<span class="mh-hint">dd/mm/yyyy</span>
<span class="mh-error-msg">Date of birth is required</span>
</div>
<div class="mh-field" id="wrap-pd-gender">
<label class="mh-label">
         Gender <span class="req">*</span>
<span class="field-ref">2b</span>
</label>
<div class="mh-radio-group" id="pd-gender">
         ${['Male','Female','Transgender'].map(g => `
<label class="mh-radio-option ${data.gender === g ? 'selected' : ''}" data-gender="${g}">
<input type="radio" name="gender" value="${g}" ${data.gender === g ? 'checked' : ''} />
<span class="mh-radio-dot"></span> ${g}
</label>
         `).join('')}
</div>
<span class="mh-error-msg" id="pd-gender-error">Gender is required</span>
</div>
</div>
</div>
<!-- 2c Marital Status -->
<div class="mh-group">
<div class="mh-group-label">2c — Marital Status</div>
<div class="mh-row cols-1">
<div class="mh-field" id="wrap-pd-marital">
<label class="mh-label">
         Marital Status <span class="req">*</span>
<span class="field-ref">2c</span>
</label>
<div class="mh-radio-group" id="pd-marital">
         ${['Married','Unmarried','Single Parent','Widow / Widower'].map(s => `
<label class="mh-radio-option ${data.maritalStatus === s ? 'selected' : ''}" data-marital="${s}">
<input type="radio" name="marital" value="${s}" />
<span class="mh-radio-dot"></span> ${s}
</label>
         `).join('')}
</div>
<span class="mh-error-msg">Marital status is required</span>
</div>
</div>
</div>
<!-- 2d Citizenship + 2e Place of Birth -->
<div class="mh-group">
<div class="mh-group-label">2d & 2e — Citizenship + Place of Birth</div>
<div class="mh-row cols-3">
<div class="mh-field" id="wrap-pd-citizenship">
<label class="mh-label" for="pd-citizenship">
         Citizenship <span class="req">*</span>
<span class="field-ref">2d</span>
</label>
<input class="mh-input" id="pd-citizenship" type="text"
         placeholder="e.g. Indian"
         value="${data.citizenship || 'Indian'}" />
<span class="mh-error-msg">Citizenship is required</span>
</div>
<div class="mh-field">
<label class="mh-label" for="pd-birthCity">
         Place of Birth — City <span class="field-ref">2e</span>
</label>
<input class="mh-input" id="pd-birthCity" type="text"
         placeholder="Town / City"
         value="${data.birthCity || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="pd-birthState">
         Place of Birth — State <span class="field-ref">2e</span>
</label>
<input class="mh-input" id="pd-birthState" type="text"
         placeholder="State"
         value="${data.birthState || ''}" />
</div>
</div>
</div>
<!-- 2f Passport -->
<div class="mh-group">
<div class="mh-group-label">2f — Passport Details</div>
<div class="mh-row cols-4">
<div class="mh-field">
<label class="mh-label" for="pd-passportNo">
         Passport Number <span class="field-ref">2f</span>
</label>
<input class="mh-input" id="pd-passportNo" type="text"
         placeholder="A1234567"
         value="${data.passportNo || ''}"
         style="text-transform:uppercase;font-family:var(--font-mono)" />
</div>
<div class="mh-field">
<label class="mh-label" for="pd-passportIssue">
         Date of Issue <span class="field-ref">2f</span>
</label>
<input class="mh-input" id="pd-passportIssue" type="date"
         value="${data.passportIssue || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="pd-passportExpiry">
         Validity / Expiry <span class="field-ref">2f</span>
</label>
<input class="mh-input" id="pd-passportExpiry" type="date"
         value="${data.passportExpiry || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="pd-passportPlace">
         Place of Issue <span class="field-ref">2f</span>
</label>
<input class="mh-input" id="pd-passportPlace" type="text"
         placeholder="e.g. Chennai"
         value="${data.passportPlace || ''}" />
</div>
</div>
<!-- PAN + Phone -->
<div class="mh-row cols-2" style="margin-top:16px">
<div class="mh-field" id="wrap-pd-pan">
<label class="mh-label" for="pd-pan">
         PAN Number <span class="req">*</span>
<span class="field-ref">2f</span>
</label>
<input class="mh-input" id="pd-pan" type="text"
         placeholder="ABCDE1234F"
         value="${data.pan || ''}"
         maxlength="10"
         style="text-transform:uppercase;font-family:var(--font-mono);letter-spacing:1px" />
<span class="mh-error-msg" id="pd-pan-error">PAN is required</span>
</div>
<div class="mh-field" id="wrap-pd-phone">
<label class="mh-label" for="pd-phone">
         Phone Number <span class="req">*</span>
<span class="field-ref">2f</span>
</label>
<input class="mh-input" id="pd-phone" type="tel"
         placeholder="9XXXXXXXXX"
         value="${data.phone || ''}"
         maxlength="10"
         style="font-family:var(--font-mono)" />
<span class="mh-error-msg">Phone number is required</span>
</div>
</div>
</div>
<!-- 2g Permanent Address -->
<div class="mh-group">
<div class="mh-group-label">2g — Permanent Address</div>
<div class="mh-row cols-1">
<div class="mh-field" id="wrap-pd-perm-line1">
<label class="mh-label" for="pd-perm-line1">
         Address <span class="req">*</span>
<span class="field-ref">2g</span>
</label>
<textarea class="mh-textarea" id="pd-perm-line1"
         placeholder="House No., Street, Area, Locality"
         rows="2">${perm.line1 || ''}</textarea>
<span class="mh-error-msg">Permanent address is required</span>
</div>
</div>
<div class="mh-row cols-3">
<div class="mh-field" id="wrap-pd-perm-city">
<label class="mh-label" for="pd-perm-city">City <span class="req">*</span></label>
<input class="mh-input" id="pd-perm-city" type="text"
         placeholder="City" value="${perm.city || ''}" />
<span class="mh-error-msg">City is required</span>
</div>
<div class="mh-field">
<label class="mh-label" for="pd-perm-state">State</label>
<input class="mh-input" id="pd-perm-state" type="text"
         placeholder="State" value="${perm.state || ''}" />
</div>
<div class="mh-field" id="wrap-pd-perm-pin">
<label class="mh-label" for="pd-perm-pin">PIN Code <span class="req">*</span></label>
<input class="mh-input" id="pd-perm-pin" type="text"
         placeholder="6-digit PIN" maxlength="6"
         value="${perm.pin || ''}"
         style="font-family:var(--font-mono)" />
<span class="mh-error-msg">PIN code is required</span>
</div>
</div>
<!-- Village / Thana / Sub-division (for Form F) -->
<div class="mh-row cols-3" style="margin-top:8px">
<div class="mh-field">
<label class="mh-label" for="pd-perm-village">
         Village <span class="field-ref">Form F</span>
</label>
<input class="mh-input" id="pd-perm-village" type="text"
         placeholder="If applicable" value="${perm.village || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="pd-perm-thana">
         Thana / Police Station <span class="field-ref">Form F</span>
</label>
<input class="mh-input" id="pd-perm-thana" type="text"
         placeholder="If applicable" value="${perm.thana || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="pd-perm-district">
         District <span class="field-ref">Form F</span>
</label>
<input class="mh-input" id="pd-perm-district" type="text"
         placeholder="District" value="${perm.district || ''}" />
</div>
</div>
</div>
<!-- 2h Present Address -->
<div class="mh-group">
<div class="mh-group-label">2h — Present Address</div>
<div style="margin-bottom:12px">
<label class="mh-checkbox-wrap ${data.presentSameAsPermanent ? 'checked' : ''}" id="pd-same-toggle">
<input type="checkbox" id="pd-same-check" ${data.presentSameAsPermanent ? 'checked' : ''} />
<span class="mh-checkbox-box"></span>
<span>Same as permanent address</span>
</label>
</div>
<div id="pd-present-fields" style="${data.presentSameAsPermanent ? 'opacity:0.4;pointer-events:none' : ''}">
<div class="mh-row cols-1">
<div class="mh-field">
<label class="mh-label" for="pd-pres-line1">
           Address <span class="field-ref">2h</span>
</label>
<textarea class="mh-textarea" id="pd-pres-line1"
           placeholder="House No., Street, Area, Locality"
           rows="2">${pres.line1 || ''}</textarea>
</div>
</div>
<div class="mh-row cols-3">
<div class="mh-field">
<label class="mh-label" for="pd-pres-city">City</label>
<input class="mh-input" id="pd-pres-city" type="text"
           placeholder="City" value="${pres.city || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="pd-pres-state">State</label>
<input class="mh-input" id="pd-pres-state" type="text"
           placeholder="State" value="${pres.state || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="pd-pres-pin">PIN Code</label>
<input class="mh-input" id="pd-pres-pin" type="text"
           placeholder="6-digit PIN" maxlength="6"
           value="${pres.pin || ''}"
           style="font-family:var(--font-mono)" />
</div>
</div>
</div>
</div>
<!-- 2i Language Proficiency -->
<div class="mh-group">
<div class="mh-group-label">2i — Language Proficiency</div>
<div class="mh-infobox amber">
<span class="mh-infobox-icon">ℹ</span>
<span>Mention in order of proficiency. Tick (✓) whichever applies.</span>
</div>
<div class="mh-table-card">
<div class="mh-table-header" style="grid-template-columns:2fr 1fr 1fr 1fr">
<span>Language</span>
<span style="text-align:center">Speak</span>
<span style="text-align:center">Read</span>
<span style="text-align:center">Write</span>
</div>
     ${langRowsHTML()}
</div>
</div>
</div><!-- /section-body -->
<div class="mh-nav">
<button class="mh-btn mh-btn-outline" id="pd-back-btn">← Back</button>
<span class="mh-nav-progress">${stepInfo}</span>
<button class="mh-btn mh-btn-primary" id="pd-next-btn">Next — Family Details →</button>
</div>
```
`;
// ── Bindings ────────────────────────────────────────────────
el.querySelector(’#pd-dob’).addEventListener(‘change’, e => set(‘dob’, e.target.value));
el.querySelector(’#pd-citizenship’).addEventListener(‘input’, e => set(‘citizenship’, e.target.value));
el.querySelector(’#pd-birthCity’).addEventListener(‘input’, e => set(‘birthCity’, e.target.value));
el.querySelector(’#pd-birthState’).addEventListener(‘input’, e => set(‘birthState’, e.target.value));
el.querySelector(’#pd-passportNo’).addEventListener(‘input’, e => set(‘passportNo’, e.target.value.toUpperCase()));
el.querySelector(’#pd-passportIssue’).addEventListener(‘change’, e => set(‘passportIssue’, e.target.value));
el.querySelector(’#pd-passportExpiry’).addEventListener(‘change’, e => set(‘passportExpiry’, e.target.value));
el.querySelector(’#pd-passportPlace’).addEventListener(‘input’, e => set(‘passportPlace’, e.target.value));
el.querySelector(’#pd-pan’).addEventListener(‘input’, e => { set(‘pan’, e.target.value.toUpperCase()); });
el.querySelector(’#pd-phone’).addEventListener(‘input’, e => set(‘phone’, e.target.value.replace(/\D/,’’)));
// Gender radio
el.querySelectorAll(’[data-gender]’).forEach(opt => {
opt.addEventListener(‘click’, () => {
el.querySelectorAll(’[data-gender]’).forEach(o => o.classList.remove(‘selected’));
opt.classList.add(‘selected’);
set(‘gender’, opt.dataset.gender);
});
});
// Marital radio
el.querySelectorAll(’[data-marital]’).forEach(opt => {
opt.addEventListener(‘click’, () => {
el.querySelectorAll(’[data-marital]’).forEach(o => o.classList.remove(‘selected’));
opt.classList.add(‘selected’);
set(‘maritalStatus’, opt.dataset.marital);
});
});
// Permanent address
el.querySelector(’#pd-perm-line1’).addEventListener(‘input’, e => setNested(‘permanentAddress’,‘line1’,e.target.value));
el.querySelector(’#pd-perm-city’).addEventListener(‘input’, e => setNested(‘permanentAddress’,‘city’,e.target.value));
el.querySelector(’#pd-perm-state’).addEventListener(‘input’, e => setNested(‘permanentAddress’,‘state’,e.target.value));
el.querySelector(’#pd-perm-pin’).addEventListener(‘input’, e => setNested(‘permanentAddress’,‘pin’,e.target.value.replace(/\D/,’’)));
el.querySelector(’#pd-perm-village’).addEventListener(‘input’, e => setNested(‘permanentAddress’,‘village’,e.target.value));
el.querySelector(’#pd-perm-thana’).addEventListener(‘input’, e => setNested(‘permanentAddress’,‘thana’,e.target.value));
el.querySelector(’#pd-perm-district’).addEventListener(‘input’, e => setNested(‘permanentAddress’,‘district’,e.target.value));
// Same as permanent
el.querySelector(’#pd-same-toggle’).addEventListener(‘click’, () => {
const checked = !el.querySelector(’#pd-same-check’).checked;
el.querySelector(’#pd-same-check’).checked = checked;
el.querySelector(’#pd-same-toggle’).classList.toggle(‘checked’, checked);
el.querySelector(’#pd-present-fields’).style.opacity = checked ? ‘0.4’ : ‘1’;
el.querySelector(’#pd-present-fields’).style.pointerEvents = checked ? ‘none’ : ‘’;
syncPresentAddress(checked);
});
// Present address
el.querySelector(’#pd-pres-line1’).addEventListener(‘input’, e => setNested(‘presentAddress’,‘line1’,e.target.value));
el.querySelector(’#pd-pres-city’).addEventListener(‘input’, e => setNested(‘presentAddress’,‘city’,e.target.value));
el.querySelector(’#pd-pres-state’).addEventListener(‘input’, e => setNested(‘presentAddress’,‘state’,e.target.value));
el.querySelector(’#pd-pres-pin’).addEventListener(‘input’, e => setNested(‘presentAddress’,‘pin’,e.target.value.replace(/\D/,’’)));
// Language rows
el.querySelectorAll(’[id^=“pd-lang-”]’).forEach(inp => {
const idx = parseInt(inp.id.split(’-’)[2]);
inp.addEventListener(‘input’, e => setLanguage(idx, ‘name’, e.target.value));
});
el.querySelectorAll(’.lang-toggle’).forEach(wrap => {
const idx = parseInt(wrap.dataset.lang);
const skill = wrap.dataset.skill;
wrap.querySelectorAll(’.mh-toggle-btn’).forEach(btn => {
btn.addEventListener(‘click’, () => {
wrap.querySelectorAll(’.mh-toggle-btn’).forEach(b => b.classList.remove(‘active’));
btn.classList.add(‘active’);
setLanguage(idx, skill, btn.dataset.val === ‘true’);
});
});
});
el.querySelector(’#pd-back-btn’).addEventListener(‘click’, onBack);
el.querySelector(’#pd-next-btn’).addEventListener(‘click’, handleNext);
return el;
}
