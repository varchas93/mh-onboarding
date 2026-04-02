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
