// ============================================================

// JoiningDetails.js

// Section 1 — Joining Details

// KYC Form fields: 1a (Name), 1b (Emp ID), 1c (Date of Joining),

//                 1d (Designation), 1e (Date of Offer),

//                 1f (Grade), 1g (Photograph)

// ============================================================

export function JoiningDetails({ data = {}, onChange, onNext, stepInfo }) {

// ── local state helper ──────────────────────────────────────

function set(field, value) {

onChange({ …data, [field]: value });

}

// ── validation ──────────────────────────────────────────────

function validate() {

const required = [‘surname’, ‘firstName’, ‘empID’, ‘dateOfJoining’, ‘designation’, ‘dateOfOffer’, ‘grade’];

let valid = true;

required.forEach(f => {

const el = document.getElementById(`jd-${f}`);

const wrap = el?.closest(’.mh-field’);

if (!data[f]) {

el?.classList.add(‘error’);

wrap?.classList.add(‘has-error’);

valid = false;

} else {

el?.classList.remove(‘error’);

wrap?.classList.remove(‘has-error’);

}

});

return valid;

}

function handleNext() {

if (validate()) onNext();

}

// ── render ──────────────────────────────────────────────────

const el = document.createElement(‘div’);

el.className = ‘mh-section’;

el.innerHTML = `

```
<!-- Section Header -->
<div class="mh-section-header">
<div class="mh-section-icon">📋</div>
<div>
<div class="mh-section-num">Section 1 · KYC Form</div>
<div class="mh-section-title">Joining Details</div>
<div class="mh-section-desc">As mentioned in your appointment letter. Fields marked <span style="color:var(--mh-red)">*</span> are required.</div>
</div>
</div>
<div class="mh-section-body">
<!-- PREFILL BANNER (hidden by default, shown if SF data loaded) -->
<div class="mh-prefill-banner" id="jd-prefill-banner" style="display:none">
<span class="mh-prefill-icon">✦</span>
<span>Fields pre-filled from SuccessFactors. Please review and correct if needed.</span>
</div>
<!-- 1a. Name -->
<div class="mh-group">
<div class="mh-group-label">1a — Name</div>
<div class="mh-row cols-3">
<div class="mh-field" id="wrap-jd-surname">
<label class="mh-label" for="jd-surname">

          Surname <span class="req">*</span>
<span class="field-ref">1a</span>
</label>
<input class="mh-input" id="jd-surname" type="text"

          placeholder="e.g. Kumar"

          value="${data.surname || ''}"

          autocomplete="family-name" />
<span class="mh-error-msg">Surname is required</span>
</div>
<div class="mh-field" id="wrap-jd-middleName">
<label class="mh-label" for="jd-middleName">

          Middle Name
<span class="field-ref">1a</span>
</label>
<input class="mh-input" id="jd-middleName" type="text"

          placeholder="If applicable"

          value="${data.middleName || ''}" />
</div>
<div class="mh-field" id="wrap-jd-firstName">
<label class="mh-label" for="jd-firstName">

          First Name <span class="req">*</span>
<span class="field-ref">1a</span>
</label>
<input class="mh-input" id="jd-firstName" type="text"

          placeholder="e.g. Rajesh"

          value="${data.firstName || ''}"

          autocomplete="given-name" />
<span class="mh-error-msg">First name is required</span>
</div>
</div>
</div>
<!-- 1b. Employee ID + 1c. Date of Joining -->
<div class="mh-group">
<div class="mh-group-label">1b & 1c — Employee ID + Date of Joining</div>
<div class="mh-row cols-2">
<div class="mh-field" id="wrap-jd-empID">
<label class="mh-label" for="jd-empID">

          Employee ID No. <span class="req">*</span>
<span class="field-ref">1b</span>
</label>
<input class="mh-input" id="jd-empID" type="text"

          placeholder="e.g. MH-2024-001"

          value="${data.empID || ''}"

          style="font-family:var(--font-mono);letter-spacing:0.5px" />
<span class="mh-hint">As assigned in your appointment letter</span>
<span class="mh-error-msg">Employee ID is required</span>
</div>
<div class="mh-field" id="wrap-jd-dateOfJoining">
<label class="mh-label" for="jd-dateOfJoining">

          Date of Joining <span class="req">*</span>
<span class="field-ref">1c</span>
</label>
<input class="mh-input" id="jd-dateOfJoining" type="date"

          value="${data.dateOfJoining || ''}" />
<span class="mh-hint">dd/mm/yyyy</span>
<span class="mh-error-msg">Date of joining is required</span>
</div>
</div>
</div>
<!-- 1d. Designation + 1e. Date of Offer + 1f. Grade -->
<div class="mh-group">
<div class="mh-group-label">1d, 1e & 1f — Designation, Date of Offer, Grade</div>
<div class="mh-row cols-3">
<div class="mh-field" id="wrap-jd-designation">
<label class="mh-label" for="jd-designation">

          Designation <span class="req">*</span>
<span class="field-ref">1d</span>
</label>
<input class="mh-input" id="jd-designation" type="text"

          placeholder="As per appointment letter"

          value="${data.designation || ''}" />
<span class="mh-error-msg">Designation is required</span>
</div>
<div class="mh-field" id="wrap-jd-dateOfOffer">
<label class="mh-label" for="jd-dateOfOffer">

          Date of Offer <span class="req">*</span>
<span class="field-ref">1e</span>
</label>
<input class="mh-input" id="jd-dateOfOffer" type="date"

          value="${data.dateOfOffer || ''}" />
<span class="mh-hint">dd/mm/yyyy</span>
<span class="mh-error-msg">Date of offer is required</span>
</div>
<div class="mh-field" id="wrap-jd-grade">
<label class="mh-label" for="jd-grade">

          Grade <span class="req">*</span>
<span class="field-ref">1f</span>
</label>
<input class="mh-input" id="jd-grade" type="text"

          placeholder="e.g. L3, M1"

          value="${data.grade || ''}" />
<span class="mh-error-msg">Grade is required</span>
</div>
</div>
</div>
<!-- 1g. Photograph -->
<div class="mh-group">
<div class="mh-group-label">1g — Passport Size Photograph</div>
<div class="mh-row cols-2-1">
<div class="mh-infobox amber">
<span class="mh-infobox-icon">📸</span>
<span>Please upload a recent passport-size photograph (JPG or PNG, max 2 MB). This will be affixed to your official joining records.</span>
</div>
<div class="mh-field">
<label class="mh-label">

          Upload Photo
<span class="field-ref">1g</span>
</label>
<div id="jd-photo-area" style="

          border: 2px dashed var(--border);

          border-radius: var(--radius-md);

          padding: 20px;

          text-align: center;

          cursor: pointer;

          transition: border-color .15s;

          background: var(--surface-alt);

        ">
<div id="jd-photo-preview" style="display:none;margin-bottom:8px">
<img id="jd-photo-img" style="width:60px;height:75px;object-fit:cover;border-radius:4px;border:1px solid var(--border)" />
</div>
<div id="jd-photo-placeholder">
<div style="font-size:24px;margin-bottom:4px">🖼</div>
<div style="font-size:12px;color:var(--text-hint)">Click to upload</div>
<div style="font-size:11px;color:var(--text-hint);margin-top:2px">JPG · PNG · max 2MB</div>
</div>
<input type="file" id="jd-photo-input" accept="image/*" style="display:none" />
</div>
</div>
</div>
</div>
</div><!-- /section-body -->
<!-- Navigation -->
<div class="mh-nav">
<button class="mh-btn mh-btn-ghost" disabled>

    ← Back
</button>
<span class="mh-nav-progress">${stepInfo}</span>
<button class="mh-btn mh-btn-primary" id="jd-next-btn">

    Next — Personal Details →
</button>
</div>

```

`;

// ── Event bindings ──────────────────────────────────────────

// Text inputs

[‘surname’,‘middleName’,‘firstName’,‘empID’,‘designation’,‘grade’].forEach(f => {

el.querySelector(`#jd-${f}`).addEventListener(‘input’, e => {

set(f, e.target.value);

e.target.classList.remove(‘error’);

e.target.closest(’.mh-field’)?.classList.remove(‘has-error’);

});

});

// Date inputs

[‘dateOfJoining’,‘dateOfOffer’].forEach(f => {

el.querySelector(`#jd-${f}`).addEventListener(‘change’, e => {

set(f, e.target.value);

e.target.classList.remove(‘error’);

e.target.closest(’.mh-field’)?.classList.remove(‘has-error’);

});

});

// Photo upload

const photoArea  = el.querySelector(’#jd-photo-area’);

const photoInput = el.querySelector(’#jd-photo-input’);

const photoImg   = el.querySelector(’#jd-photo-img’);

const photoPreview     = el.querySelector(’#jd-photo-preview’);

const photoPlaceholder = el.querySelector(’#jd-photo-placeholder’);

photoArea.addEventListener(‘click’, () => photoInput.click());

photoArea.addEventListener(‘dragover’, e => {

e.preventDefault();

photoArea.style.borderColor = ‘var(–mh-red)’;

});

photoArea.addEventListener(‘dragleave’, () => {

photoArea.style.borderColor = ‘var(–border)’;

});

photoArea.addEventListener(‘drop’, e => {

e.preventDefault();

photoArea.style.borderColor = ‘var(–border)’;

handlePhoto(e.dataTransfer.files[0]);

});

photoInput.addEventListener(‘change’, e => handlePhoto(e.target.files[0]));

function handlePhoto(file) {

if (!file) return;

if (file.size > 2 * 1024 * 1024) {

alert(‘Photo must be under 2MB’);

return;

}

const reader = new FileReader();

reader.onload = ev => {

photoImg.src = ev.target.result;

photoPreview.style.display = ‘block’;

photoPlaceholder.style.display = ‘none’;

set(‘photoData’, ev.target.result);

set(‘photoName’, file.name);

};

reader.readAsDataURL(file);

}

// Next button

el.querySelector(’#jd-next-btn’).addEventListener(‘click’, handleNext);

// Show prefill banner if data came from SF

if (data._prefilled) {

el.querySelector(’#jd-prefill-banner’).style.display = ‘flex’;

// Highlight prefilled fields

[‘surname’,‘firstName’,‘empID’,‘dateOfJoining’,‘designation’,‘grade’].forEach(f => {

if (data[f]) el.querySelector(`#jd-${f}`)?.classList.add(‘prefilled’);

});

}

return el;

}
 
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
 
// ============================================================

// FamilyDetails.js

// Section 3 — Family Details + Medical Insurance + Emergency + Medical

// KYC Form:

//   2j  — Family Details (Spouse, Father, Mother, Children 1–3)

//         Medical Insurance: Parental + Top-up opt-in

//   Sec 6 — Emergency Contacts (min 2, one immediate family)

//   Sec 7 — Medical Information (Blood Group, ID mark, Allergies, Complaints)

// ============================================================

const FAMILY_MEMBERS = [‘Spouse’, ‘Father’, ‘Mother’, ‘Child 1’, ‘Child 2’, ‘Child 3’];

export function FamilyDetails({ data = {}, onChange, onNext, onBack, stepInfo }) {

function set(field, value) {

onChange({ …data, [field]: value });

}

function setFamily(member, field, value) {

const family = { …(data.family || {}) };

family[member] = { …(family[member] || {}), [field]: value };

onChange({ …data, family });

}

function setEmergency(index, field, value) {

const contacts = […(data.emergencyContacts || [{}, {}])];

contacts[index] = { …(contacts[index] || {}), [field]: value };

onChange({ …data, emergencyContacts: contacts });

}

function validate() {

let valid = true;

// Emergency contact 1 required fields

[‘name’,‘relationship’,‘phone’].forEach(f => {

const el = document.getElementById(`fd-emg1-${f}`);

const val = (data.emergencyContacts || [])[0]?.[f];

if (!val) {

el?.classList.add(‘error’);

valid = false;

} else { el?.classList.remove(‘error’); }

});

// Blood group required

if (!data.bloodGroup) {

document.getElementById(‘fd-bloodgroup’)?.classList.add(‘error’);

valid = false;

} else {

document.getElementById(‘fd-bloodgroup’)?.classList.remove(‘error’);

}

return valid;

}

function handleNext() {

if (validate()) onNext();

}

// ── Render family table rows ────────────────────────────────

function familyRowHTML(member) {

const m = (data.family || {})[member] || {};

return `<div class="mh-table-row" style="grid-template-columns:1fr 1.2fr 1.2fr 1fr" data-member="${member}"> <div style="font-size:13px;font-weight:500;color:var(--text-secondary);padding:4px 0">${member}</div> <input class="mh-input fm-surname" placeholder="Surname" value="${m.surname || ''}" data-member="${member}" data-field="surname" /> <input class="mh-input fm-firstname" placeholder="First Name" value="${m.firstName || ''}" data-member="${member}" data-field="firstName" /> <input class="mh-input fm-dob" type="date" value="${m.dob || ''}" data-member="${member}" data-field="dob" /> </div>`;

}

const ec = data.emergencyContacts || [{}, {}];

const el = document.createElement(‘div’);

el.className = ‘mh-section’;

el.innerHTML = `

```
<div class="mh-section-header">
<div class="mh-section-icon">👨‍👩‍👧</div>
<div>
<div class="mh-section-num">Section 3 · KYC Form</div>
<div class="mh-section-title">Family, Emergency & Medical</div>
<div class="mh-section-desc">Family details for insurance and nomination. Emergency contacts and medical information.</div>
</div>
</div>
<div class="mh-section-body">
<!-- Medical Insurance Opt-in -->
<div class="mh-group">
<div class="mh-group-label">Medical Insurance — Opt-in</div>
<div class="mh-row cols-2">
<div class="mh-field">
<label class="mh-label">

          Opting for Parental Insurance?
<span class="field-ref">2j</span>
</label>
<div class="mh-toggle-wrap" id="fd-parental-ins">
<button class="mh-toggle-btn yes ${data.optParentalInsurance === true ? 'active' : ''}"

            data-val="yes">Yes</button>
<button class="mh-toggle-btn no ${data.optParentalInsurance === false ? 'active' : ''}"

            data-val="no">No</button>
</div>
<span class="mh-hint">If yes, please fill family details below as per Aadhar.</span>
</div>
<div class="mh-field">
<label class="mh-label">

          Opting for Top-up Insurance?
<span class="field-ref">2j</span>
</label>
<div class="mh-toggle-wrap" id="fd-topup-ins">
<button class="mh-toggle-btn yes ${data.optTopUpInsurance === true ? 'active' : ''}"

            data-val="yes">Yes</button>
<button class="mh-toggle-btn no ${data.optTopUpInsurance === false ? 'active' : ''}"

            data-val="no">No</button>
</div>
</div>
</div>
</div>
<!-- 2j Family Details table -->
<div class="mh-group" id="fd-family-group">
<div class="mh-group-label">2j — Family Details</div>
<div class="mh-infobox amber">
<span class="mh-infobox-icon">ℹ</span>
<span>Please fill in dependent details for Medical Insurance. Enter names as per Aadhar card.</span>
</div>
<div class="mh-table-card">
<div class="mh-table-header" style="grid-template-columns:1fr 1.2fr 1.2fr 1fr">
<span>Relationship</span>
<span>Surname</span>
<span>First Name</span>
<span>Date of Birth</span>
</div>

      ${FAMILY_MEMBERS.map(m => familyRowHTML(m)).join('')}
</div>
</div>
<!-- Section 6 — Emergency Contacts -->
<div class="mh-group">
<div class="mh-group-label">Section 6 — Emergency Contacts</div>
<div class="mh-infobox red">
<span class="mh-infobox-icon">🚨</span>
<span>We require at least 2 emergency contacts. One must be an immediate family member.</span>
</div>
<!-- Contact 1 -->
<div style="margin-bottom:20px">
<div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:10px;display:flex;align-items:center;gap:8px">
<span style="background:var(--mh-red);color:white;width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:700;flex-shrink:0">1</span>

        Emergency Contact 1 <span style="font-weight:400;color:var(--mh-red);font-size:12px">(Immediate family)</span>
</div>
<div class="mh-row cols-2">
<div class="mh-field">
<label class="mh-label" for="fd-emg1-name">

            Contact Person <span class="req">*</span>
</label>
<input class="mh-input" id="fd-emg1-name" type="text"

            placeholder="Full name"

            value="${ec[0]?.name || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="fd-emg1-relationship">

            Relationship <span class="req">*</span>
</label>
<input class="mh-input" id="fd-emg1-relationship" type="text"

            placeholder="e.g. Spouse, Father"

            value="${ec[0]?.relationship || ''}" />
</div>
</div>
<div class="mh-row cols-2">
<div class="mh-field">
<label class="mh-label" for="fd-emg1-address">Address</label>
<input class="mh-input" id="fd-emg1-address" type="text"

            placeholder="Address"

            value="${ec[0]?.address || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="fd-emg1-phone">

            Contact No. + Email <span class="req">*</span>
</label>
<input class="mh-input" id="fd-emg1-phone" type="text"

            placeholder="Phone / STD code if any"

            value="${ec[0]?.phone || ''}" />
</div>
</div>
</div>
<!-- Contact 2 -->
<div>
<div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:10px;display:flex;align-items:center;gap:8px">
<span style="background:var(--mh-navy);color:white;width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:700;flex-shrink:0">2</span>

        Emergency Contact 2
</div>
<div class="mh-row cols-2">
<div class="mh-field">
<label class="mh-label" for="fd-emg2-name">Contact Person</label>
<input class="mh-input" id="fd-emg2-name" type="text"

            placeholder="Full name"

            value="${ec[1]?.name || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="fd-emg2-relationship">Relationship</label>
<input class="mh-input" id="fd-emg2-relationship" type="text"

            placeholder="e.g. Friend, Colleague"

            value="${ec[1]?.relationship || ''}" />
</div>
</div>
<div class="mh-row cols-2">
<div class="mh-field">
<label class="mh-label" for="fd-emg2-address">Address</label>
<input class="mh-input" id="fd-emg2-address" type="text"

            placeholder="Address"

            value="${ec[1]?.address || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="fd-emg2-phone">Contact No. + Email</label>
<input class="mh-input" id="fd-emg2-phone" type="text"

            placeholder="Phone / Email"

            value="${ec[1]?.phone || ''}" />
</div>
</div>
</div>
</div>
<!-- Section 7 — Medical Information -->
<div class="mh-group">
<div class="mh-group-label">Section 7 — Medical Information</div>
<div class="mh-row cols-2">
<div class="mh-field">
<label class="mh-label" for="fd-bloodgroup">

          Blood Group <span class="req">*</span>
<span class="field-ref">Sec 7</span>
</label>
<select class="mh-select" id="fd-bloodgroup">
<option value="">— Select —</option>

          ${['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg =>

            `<option value="${bg}" ${data.bloodGroup === bg ? 'selected' : ''}>${bg}</option>`

          ).join('')}
</select>
<span class="mh-error-msg">Blood group is required</span>
</div>
<div class="mh-field">
<label class="mh-label" for="fd-idmark">

          Identification Mark (if any)
<span class="field-ref">Sec 7</span>
</label>
<input class="mh-input" id="fd-idmark" type="text"

          placeholder="e.g. Mole on left cheek"

          value="${data.identificationMark || ''}" />
</div>
</div>
<div class="mh-row cols-2">
<div class="mh-field">
<label class="mh-label" for="fd-allergies">

          Allergies (if any)
<span class="field-ref">Sec 7</span>
</label>
<textarea class="mh-textarea" id="fd-allergies"

          placeholder="List any known allergies" rows="2">${data.allergies || ''}</textarea>
</div>
<div class="mh-field">
<label class="mh-label" for="fd-medcomplaint">

          Medical Complaints (if any)
<span class="field-ref">Sec 7</span>
</label>
<textarea class="mh-textarea" id="fd-medcomplaint"

          placeholder="Any ongoing medical conditions" rows="2">${data.medicalComplaints || ''}</textarea>
</div>
</div>
</div>
</div>
<div class="mh-nav">
<button class="mh-btn mh-btn-outline" id="fd-back-btn">← Back</button>
<span class="mh-nav-progress">${stepInfo}</span>
<button class="mh-btn mh-btn-primary" id="fd-next-btn">Next — Academic History →</button>
</div>

```

`;

// ── Bindings ────────────────────────────────────────────────

// Insurance toggles

el.querySelector(’#fd-parental-ins’).addEventListener(‘click’, e => {

const btn = e.target.closest(’.mh-toggle-btn’);

if (!btn) return;

el.querySelectorAll(’#fd-parental-ins .mh-toggle-btn’).forEach(b => b.classList.remove(‘active’));

btn.classList.add(‘active’);

set(‘optParentalInsurance’, btn.dataset.val === ‘yes’);

});

el.querySelector(’#fd-topup-ins’).addEventListener(‘click’, e => {

const btn = e.target.closest(’.mh-toggle-btn’);

if (!btn) return;

el.querySelectorAll(’#fd-topup-ins .mh-toggle-btn’).forEach(b => b.classList.remove(‘active’));

btn.classList.add(‘active’);

set(‘optTopUpInsurance’, btn.dataset.val === ‘yes’);

});

// Family table

el.querySelectorAll(’.fm-surname, .fm-firstname, .fm-dob’).forEach(inp => {

inp.addEventListener(‘input’, e => setFamily(e.target.dataset.member, e.target.dataset.field, e.target.value));

inp.addEventListener(‘change’, e => setFamily(e.target.dataset.member, e.target.dataset.field, e.target.value));

});

// Emergency contacts

[‘name’,‘relationship’,‘address’,‘phone’].forEach(f => {

el.querySelector(`#fd-emg1-${f}`)?.addEventListener(‘input’, e => setEmergency(0, f, e.target.value));

el.querySelector(`#fd-emg2-${f}`)?.addEventListener(‘input’, e => setEmergency(1, f, e.target.value));

});

// Medical

el.querySelector(’#fd-bloodgroup’).addEventListener(‘change’, e => set(‘bloodGroup’, e.target.value));

el.querySelector(’#fd-idmark’).addEventListener(‘input’, e => set(‘identificationMark’, e.target.value));

el.querySelector(’#fd-allergies’).addEventListener(‘input’, e => set(‘allergies’, e.target.value));

el.querySelector(’#fd-medcomplaint’).addEventListener(‘input’, e => set(‘medicalComplaints’, e.target.value));

el.querySelector(’#fd-back-btn’).addEventListener(‘click’, onBack);

el.querySelector(’#fd-next-btn’).addEventListener(‘click’, handleNext);

return el;

}
 
