// ============================================================
// Consents.js
// Section 7 — Compliance, KYC Documents & Declarations
// EPFO Form 11:
//   Fields 1–7  : Personal details (auto-filled from EMP_Master)
//   Field 14    : Educational qualification level
//   Field 15    : Marital status
//   Field 16    : Specially abled
//   Field 17    : KYC documents table
//                 (Bank A/c + IFSC, Aadhar, PAN, Passport,
//                  Driving Licence, Election Card, Ration Card, ESIC)
// Compliance documents (Pages 11–14 of joining kit PDF):
//   Bulletin on Data Protection (Pg 11) — acknowledgement
//   Obligation on Data Secrecy (Pg 13)  — name, emp no, job title,
//                                          dept, place, date
//   Internet/Email Consent (Pg 14)      — personnel no, name,
//                                          place, date, consent
//   Obligation to Confidentiality (Pg 15)
// KYC Declaration (Page 3)
// ============================================================
export function Consents({ data = {}, onChange, onSubmit, onBack, stepInfo, joinerName }) {
function set(field, value) {
onChange({ …data, [field]: value });
}
function setKYC(field, value) {
onChange({ …data, kyc: { …(data.kyc || {}), [field]: value } });
}
function validate() {
let valid = true;
// Bank + IFSC mandatory per EPFO
if (!((data.kyc || {}).bankAccount)) {
document.getElementById(‘cs-bank-acno’)?.classList.add(‘error’);
valid = false;
}
if (!((data.kyc || {}).ifsc)) {
document.getElementById(‘cs-ifsc’)?.classList.add(‘error’);
valid = false;
}
// All consent checkboxes must be ticked
const required = [‘cs-consent-data’,‘cs-consent-secrecy’,‘cs-consent-internet’,‘cs-consent-conf’,‘cs-consent-declaration’];
required.forEach(id => {
const wrap = document.getElementById(id);
if (!wrap?.classList.contains(‘checked’)) {
wrap?.classList.add(‘consent-error’);
valid = false;
} else {
wrap?.classList.remove(‘consent-error’);
}
});
if (!valid) {
document.getElementById(‘cs-consent-error’).style.display = ‘block’;
document.getElementById(‘cs-consent-error’).scrollIntoView({ behavior:‘smooth’, block:‘center’ });
}
return valid;
}
const kyc = data.kyc || {};
const today = new Date().toISOString().split(‘T’)[0];
const el = document.createElement(‘div’);
el.className = ‘mh-section’;
el.innerHTML = `
```
<div class="mh-section-header">
<div class="mh-section-icon">✅</div>
<div>
<div class="mh-section-num">Section 7 · Final Step</div>
<div class="mh-section-title">KYC Documents & Declarations</div>
<div class="mh-section-desc">Bank details, EPFO KYC documents, and compliance consent signatures. Review carefully before submitting.</div>
</div>
</div>
<div class="mh-section-body">
<!-- ── EPFO Form 11: KYC Documents ──────────────────── -->
<div class="mh-group">
<div class="mh-group-label">EPFO Form 11 — KYC Document Details (Field 17)</div>
<div class="mh-infobox red">
<span class="mh-infobox-icon">⚠</span>
<span><strong>Bank Account + IFSC are mandatory</strong> per EPFO. All other KYC documents are recommended — the more you provide, the better access to EPFO services.</span>
</div>
<!-- Bank Account + IFSC (MANDATORY) -->
<div class="mh-row cols-2" style="margin-top:12px">
<div class="mh-field">
<label class="mh-label" for="cs-bank-acno">
         Bank Account Number <span class="req">*</span>
<span class="field-ref">Form 11 KYC</span>
</label>
<input class="mh-input" id="cs-bank-acno" type="text"
         placeholder="Account number"
         value="${kyc.bankAccount || ''}"
         style="font-family:var(--font-mono);letter-spacing:0.5px" />
</div>
<div class="mh-field">
<label class="mh-label" for="cs-ifsc">
         IFSC Code <span class="req">*</span>
<span class="field-ref">Form 11 KYC</span>
</label>
<input class="mh-input" id="cs-ifsc" type="text"
         placeholder="e.g. HDFC0001234"
         maxlength="11"
         value="${kyc.ifsc || ''}"
         style="font-family:var(--font-mono);text-transform:uppercase;letter-spacing:1px" />
</div>
</div>
<!-- Additional KYC docs table -->
<div class="mh-table-card" style="margin-top:4px">
<div class="mh-table-header" style="grid-template-columns:2fr 2fr 2fr">
<span>KYC Document Type</span>
<span>Name as on Document</span>
<span>Number / Remarks</span>
</div>
<!-- Aadhar -->
<div class="mh-table-row" style="grid-template-columns:2fr 2fr 2fr">
<div style="font-size:13px;font-weight:500;color:var(--text-secondary)">NPR / Aadhar</div>
<input class="mh-input" id="cs-aadhar-name" type="text"
         placeholder="Name as on Aadhar"
         value="${kyc.aadharName || ''}" style="font-size:12px" />
<input class="mh-input" id="cs-aadhar-no" type="text"
         placeholder="12-digit Aadhar number" maxlength="12"
         value="${kyc.aadharNo || ''}"
         style="font-size:12px;font-family:var(--font-mono);letter-spacing:1px" />
</div>
<!-- PAN (already collected in Personal Details — show read-only) -->
<div class="mh-table-row" style="grid-template-columns:2fr 2fr 2fr;background:var(--surface-alt)">
<div style="font-size:13px;font-weight:500;color:var(--text-secondary)">PAN Card</div>
<input class="mh-input" id="cs-pan-name" type="text"
         placeholder="Name as on PAN"
         value="${kyc.panName || joinerName || ''}" style="font-size:12px" />
<input class="mh-input" id="cs-pan-no" type="text"
         placeholder="10-character PAN"
         value="${kyc.panNo || data.pan || ''}"
         maxlength="10"
         style="font-size:12px;font-family:var(--font-mono);text-transform:uppercase" />
</div>
<!-- Passport -->
<div class="mh-table-row" style="grid-template-columns:2fr 2fr 2fr">
<div style="font-size:13px;font-weight:500;color:var(--text-secondary)">Passport</div>
<input class="mh-input" id="cs-passport-name" type="text"
         placeholder="Name as on Passport"
         value="${kyc.passportName || joinerName || ''}" style="font-size:12px" />
<div style="display:flex;gap:6px">
<input class="mh-input" id="cs-passport-no" type="text"
           placeholder="Passport No."
           value="${kyc.passportNo || data.passportNo || ''}"
           style="font-size:12px;font-family:var(--font-mono);flex:1" />
<input class="mh-input" id="cs-passport-expiry" type="date"
           title="Expiry date"
           value="${kyc.passportExpiry || data.passportExpiry || ''}"
           style="font-size:12px;width:130px" />
</div>
</div>
<!-- Driving Licence -->
<div class="mh-table-row" style="grid-template-columns:2fr 2fr 2fr;background:var(--surface-alt)">
<div style="font-size:13px;font-weight:500;color:var(--text-secondary)">Driving Licence</div>
<input class="mh-input" id="cs-dl-name" type="text"
         placeholder="Name as on DL"
         value="${kyc.dlName || ''}" style="font-size:12px" />
<div style="display:flex;gap:6px">
<input class="mh-input" id="cs-dl-no" type="text"
           placeholder="DL Number"
           value="${kyc.dlNo || ''}"
           style="font-size:12px;font-family:var(--font-mono);flex:1" />
<input class="mh-input" id="cs-dl-expiry" type="date"
           title="Expiry date"
           value="${kyc.dlExpiry || ''}"
           style="font-size:12px;width:130px" />
</div>
</div>
<!-- Election Card -->
<div class="mh-table-row" style="grid-template-columns:2fr 2fr 2fr">
<div style="font-size:13px;font-weight:500;color:var(--text-secondary)">Election Card (EPIC)</div>
<input class="mh-input" id="cs-epic-name" type="text"
         placeholder="Name as on EPIC"
         value="${kyc.epicName || ''}" style="font-size:12px" />
<input class="mh-input" id="cs-epic-no" type="text"
         placeholder="EPIC Number"
         value="${kyc.epicNo || ''}"
         style="font-size:12px;font-family:var(--font-mono)" />
</div>
<!-- ESIC Card -->
<div class="mh-table-row" style="grid-template-columns:2fr 2fr 2fr;background:var(--surface-alt)">
<div style="font-size:13px;font-weight:500;color:var(--text-secondary)">ESIC Card</div>
<input class="mh-input" id="cs-esic-name" type="text"
         placeholder="Name as on ESIC"
         value="${kyc.esicName || ''}" style="font-size:12px" />
<input class="mh-input" id="cs-esic-no" type="text"
         placeholder="ESIC Number"
         value="${kyc.esicNo || ''}"
         style="font-family:var(--font-mono);font-size:12px" />
</div>
</div>
</div>
<!-- ── EPFO Form 11 — Education + Marital + Specially Abled ── -->
<div class="mh-group">
<div class="mh-group-label">EPFO Form 11 — Additional Declarations (Fields 14–16)</div>
<div class="mh-row cols-3">
<div class="mh-field">
<label class="mh-label" for="cs-edu-qual">
         Educational Qualification
<span class="field-ref">Form 11 · 14</span>
</label>
<select class="mh-select" id="cs-edu-qual">
<option value="">— Select —</option>
         ${['Illiterate','Non-Matric','Matric','Senior Secondary',
            'Graduate','Post Graduate','Doctor','Technical / Professional'].map(q =>
           `<option value="${q}" ${data.eduQual === q ? 'selected' : ''}>${q}</option>`
         ).join('')}
</select>
</div>
<div class="mh-field">
<label class="mh-label">
         Specially Abled?
<span class="field-ref">Form 11 · 16</span>
</label>
<div class="mh-toggle-wrap" id="cs-specially-abled">
<button class="mh-toggle-btn yes ${data.speciallyAbled === true ? 'active' : ''}" data-val="yes">Yes</button>
<button class="mh-toggle-btn no ${data.speciallyAbled === false ? 'active' : ''}" data-val="no">No</button>
</div>
</div>
<div class="mh-field" id="cs-disability-cat-wrap"
       style="${data.speciallyAbled ? '' : 'display:none'}">
<label class="mh-label" for="cs-disability-cat">
         Disability Category
<span class="field-ref">Form 11 · 16</span>
</label>
<select class="mh-select" id="cs-disability-cat">
<option value="">— Select —</option>
<option value="Locomotive" ${data.disabilityCategory === 'Locomotive' ? 'selected' : ''}>Locomotive</option>
<option value="Visual"     ${data.disabilityCategory === 'Visual'     ? 'selected' : ''}>Visual</option>
<option value="Hearing"    ${data.disabilityCategory === 'Hearing'    ? 'selected' : ''}>Hearing</option>
</select>
</div>
</div>
</div>
<!-- ── CONSENT DECLARATIONS ──────────────────────────── -->
<div class="mh-group">
<div class="mh-group-label">Compliance Declarations — Please Read & Accept Each</div>
<div id="cs-consent-error" style="
     display:none;
     background:var(--mh-red-light);border:1px solid var(--mh-red-mid);
     border-radius:var(--radius-sm);padding:12px 16px;
     font-size:13px;color:var(--mh-red);margin-bottom:14px;
   ">⚠ Please read and accept all declarations before submitting.</div>
<!-- 1. Data Protection Bulletin -->
<div class="mh-field" style="margin-bottom:12px">
<div style="
       border:1px solid var(--border);
       border-radius:var(--radius-md);
       overflow:hidden;
     ">
<div style="padding:14px 18px;background:var(--surface-alt);border-bottom:1px solid var(--border)">
<div style="font-size:13px;font-weight:600;margin-bottom:4px">📋 Bulletin on Data Protection</div>
<div style="font-size:12px;color:var(--text-secondary);line-height:1.65">
           It would certainly not be in your interest if confidential data about your person and personal situation would become public. Data protection is to protect your personal data. You are responsible that the personal data you were entrusted with is processed (saved, altered, transmitted, blocked, deleted) or used only according to your tasks. Misuse or any unauthorized transfer is not allowed.<br><br>
           You are personally responsible for keeping data and data carriers given to you locked whenever you do not work with them, not giving access to your IT devices, applications or passwords to any person not authorized for them, and safely destroying data carriers with personal data which are not needed anymore.<br><br>
           You must not use company-owned IT devices for private purposes or bring in private computers, software or data carriers into the company. You have been obliged on data secrecy, which will continue beyond the termination of your job.
</div>
</div>
<div style="padding:12px 18px">
<label class="mh-checkbox-wrap ${data.consentDataProtection ? 'checked' : ''}" id="cs-consent-data">
<input type="checkbox" ${data.consentDataProtection ? 'checked' : ''} />
<span class="mh-checkbox-box"></span>
<span style="font-size:13px">I have read and acknowledge the Bulletin on Data Protection.</span>
</label>
</div>
</div>
</div>
<!-- 2. Obligation on Data Secrecy (Pg 13) -->
<div class="mh-field" style="margin-bottom:12px">
<div style="border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden">
<div style="padding:14px 18px;background:var(--surface-alt);border-bottom:1px solid var(--border)">
<div style="font-size:13px;font-weight:600;margin-bottom:4px">🔒 Obligation on Data Secrecy</div>
<div style="font-size:12px;color:var(--text-secondary);line-height:1.65">
           I hereby declare that today I have been instructed about the requirements on data security and data protection applicable when exercising my job. Further, I was obliged to adhere to data secrecy. I have particularly been instructed that it is forbidden for me to collect, process or use protected personal data for any other purpose than for the designated one. This obligation will continue beyond the termination of my duties.
</div>
<!-- Place + Date fields for this declaration -->
<div class="mh-row cols-2" style="margin-top:12px">
<div class="mh-field">
<label class="mh-label" for="cs-secrecy-place">Place</label>
<input class="mh-input" id="cs-secrecy-place" type="text"
               placeholder="e.g. Bengaluru"
               value="${data.secrecyPlace || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="cs-secrecy-date">Date</label>
<input class="mh-input" id="cs-secrecy-date" type="date"
               value="${data.secrecyDate || today}" />
</div>
</div>
</div>
<div style="padding:12px 18px">
<label class="mh-checkbox-wrap ${data.consentDataSecrecy ? 'checked' : ''}" id="cs-consent-secrecy">
<input type="checkbox" ${data.consentDataSecrecy ? 'checked' : ''} />
<span class="mh-checkbox-box"></span>
<span style="font-size:13px">I have read, understood, and agree to the Obligation on Data Secrecy.</span>
</label>
</div>
</div>
</div>
<!-- 3. Internet/Email Consent (Pg 14) -->
<div class="mh-field" style="margin-bottom:12px">
<div style="border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden">
<div style="padding:14px 18px;background:var(--surface-alt);border-bottom:1px solid var(--border)">
<div style="font-size:13px;font-weight:600;margin-bottom:4px">🌐 Internet, Email & File Folder Systems Consent (BV No. 08/2009)</div>
<div style="font-size:12px;color:var(--text-secondary);line-height:1.65">
           I provide my consent that during private Internet use, personal data (in particular Internet pages retrieved, user ID, date) may be recorded and used for ensuring system security, optimisation and controlling of the system; during private email use, regulation of secrecy of telecommunication will not apply as service provider for MANN+HUMMEL in the sense that emails can be filtered, deleted, or temporarily not placed in the mailbox; data generated as a result of my private use of electronic communication mediums can be saved, filtered, analysed and forwarded if stipulated by legal, judicial or governmental regulations; during Internet use, encrypted connections can be opened to scrutinise contents automatically for malicious content.<br><br>
           I acknowledge the regulations of company agreement number 08/2009. I understand that private use of Internet and email may be granted only in minimal scope. I can revoke this approval at any given time.
</div>
<div class="mh-row cols-2" style="margin-top:12px">
<div class="mh-field">
<label class="mh-label" for="cs-internet-place">Place</label>
<input class="mh-input" id="cs-internet-place" type="text"
               placeholder="e.g. Bengaluru"
               value="${data.internetConsentPlace || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="cs-internet-date">Date</label>
<input class="mh-input" id="cs-internet-date" type="date"
               value="${data.internetConsentDate || today}" />
</div>
</div>
</div>
<div style="padding:12px 18px">
<label class="mh-checkbox-wrap ${data.consentInternet ? 'checked' : ''}" id="cs-consent-internet">
<input type="checkbox" ${data.consentInternet ? 'checked' : ''} />
<span class="mh-checkbox-box"></span>
<span style="font-size:13px">I provide my consent as described above for Internet and Email monitoring.</span>
</label>
</div>
</div>
</div>
<!-- 4. Obligation to Confidentiality -->
<div class="mh-field" style="margin-bottom:12px">
<div style="border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden">
<div style="padding:14px 18px;background:var(--surface-alt);border-bottom:1px solid var(--border)">
<div style="font-size:13px;font-weight:600;margin-bottom:4px">🛡 Obligation to Confidentiality (POL-005)</div>
<div style="font-size:12px;color:var(--text-secondary);line-height:1.65">
           I acknowledge my obligation to maintain strict confidentiality with respect to all proprietary, technical, commercial, and personal information of MANN+HUMMEL and its clients, partners, and employees that I may access in the course of my employment. This obligation continues beyond the termination of my employment for a period specified in my employment contract.
</div>
</div>
<div style="padding:12px 18px">
<label class="mh-checkbox-wrap ${data.consentConfidentiality ? 'checked' : ''}" id="cs-consent-conf">
<input type="checkbox" ${data.consentConfidentiality ? 'checked' : ''} />
<span class="mh-checkbox-box"></span>
<span style="font-size:13px">I acknowledge and accept the Obligation to Confidentiality.</span>
</label>
</div>
</div>
</div>
<!-- 5. Final KYC Declaration -->
<div class="mh-field">
<div style="
       border:2px solid var(--mh-red);
       border-radius:var(--radius-md);
       overflow:hidden;
       background:var(--mh-red-light);
     ">
<div style="padding:16px 20px">
<div style="font-size:13px;font-weight:600;color:var(--mh-red);margin-bottom:8px">
           📝 Declaration (KYC Form + EPFO Form 11)
</div>
<div style="font-size:12.5px;color:#7a1a28;line-height:1.7">
           I, <strong>${joinerName || '___________'}</strong>, declare that the above information is true and correct to the best of my knowledge and belief. I have not withheld any information and I am aware that providing false information shall render me liable for action as deemed fit by the management.<br><br>
           I authorize MANN+HUMMEL to use this information wherever it is required in line with Data Protection — including DOB/Photographs for Bank transactions, Birthday calendar, Internal Org announcements, and Personal information details for Insurance, Statutory, and Bank purposes.<br><br>
           I am also aware that I can submit my nomination form through UAN-based Member Portal. I certify that all the information given above is true to the best of my knowledge and belief. This may also be treated as my request for transfer of funds and service details from the previous account as declared above to the present PF Account.
</div>
</div>
<div style="padding:12px 20px;border-top:1px solid var(--mh-red-mid)">
<label class="mh-checkbox-wrap ${data.consentDeclaration ? 'checked' : ''}" id="cs-consent-declaration">
<input type="checkbox" ${data.consentDeclaration ? 'checked' : ''} />
<span class="mh-checkbox-box"></span>
<span style="font-size:13px;font-weight:500;color:var(--mh-red)">I declare that all information provided is true and accurate. I understand that misrepresentation may result in termination of employment.</span>
</label>
</div>
</div>
</div>
</div>
<!-- Final date + place -->
<div class="mh-group">
<div class="mh-group-label">Submission Details</div>
<div class="mh-row cols-2">
<div class="mh-field">
<label class="mh-label" for="cs-submit-place">Place</label>
<input class="mh-input" id="cs-submit-place" type="text"
         placeholder="e.g. Bengaluru"
         value="${data.submissionPlace || ''}" />
</div>
<div class="mh-field">
<label class="mh-label" for="cs-submit-date">Date</label>
<input class="mh-input" id="cs-submit-date" type="date"
         value="${data.submissionDate || today}" />
</div>
</div>
</div>
</div>
<div class="mh-nav">
<button class="mh-btn mh-btn-outline" id="cs-back-btn">← Back</button>
<span class="mh-nav-progress">${stepInfo}</span>
<button class="mh-btn mh-btn-primary" id="cs-submit-btn"
   style="background:var(--green);padding:12px 32px;font-size:15px">
   ✓ Submit Joining Kit
</button>
</div>
```
`;
// ── KYC document bindings ───────────────────────────────────
const kycFields = {
‘cs-bank-acno’:‘bankAccount’,‘cs-ifsc’:‘ifsc’,
‘cs-aadhar-name’:‘aadharName’,‘cs-aadhar-no’:‘aadharNo’,
‘cs-pan-name’:‘panName’,‘cs-pan-no’:‘panNo’,
‘cs-passport-name’:‘passportName’,‘cs-passport-no’:‘passportNo’,‘cs-passport-expiry’:‘passportExpiry’,
‘cs-dl-name’:‘dlName’,‘cs-dl-no’:‘dlNo’,‘cs-dl-expiry’:‘dlExpiry’,
‘cs-epic-name’:‘epicName’,‘cs-epic-no’:‘epicNo’,
‘cs-esic-name’:‘esicName’,‘cs-esic-no’:‘esicNo’
};
Object.entries(kycFields).forEach(([id, field]) => {
el.querySelector(`#${id}`)?.addEventListener(‘input’, e => setKYC(field, e.target.value.toUpperCase ? e.target.value.toUpperCase() : e.target.value));
el.querySelector(`#${id}`)?.addEventListener(‘change’, e => setKYC(field, e.target.value));
});
// Education qual + specially abled
el.querySelector(’#cs-edu-qual’).addEventListener(‘change’, e => set(‘eduQual’, e.target.value));
el.querySelector(’#cs-specially-abled’).addEventListener(‘click’, e => {
const btn = e.target.closest(’.mh-toggle-btn’);
if (!btn) return;
el.querySelectorAll(’#cs-specially-abled .mh-toggle-btn’).forEach(b => b.classList.remove(‘active’));
btn.classList.add(‘active’);
const val = btn.dataset.val === ‘yes’;
set(‘speciallyAbled’, val);
document.getElementById(‘cs-disability-cat-wrap’).style.display = val ? ‘’ : ‘none’;
});
el.querySelector(’#cs-disability-cat’).addEventListener(‘change’, e => set(‘disabilityCategory’, e.target.value));
// Data secrecy
el.querySelector(’#cs-secrecy-place’).addEventListener(‘input’, e => set(‘secrecyPlace’, e.target.value));
el.querySelector(’#cs-secrecy-date’).addEventListener(‘change’, e => set(‘secrecyDate’, e.target.value));
el.querySelector(’#cs-internet-place’).addEventListener(‘input’, e => set(‘internetConsentPlace’, e.target.value));
el.querySelector(’#cs-internet-date’).addEventListener(‘change’, e => set(‘internetConsentDate’, e.target.value));
el.querySelector(’#cs-submit-place’).addEventListener(‘input’, e => set(‘submissionPlace’, e.target.value));
el.querySelector(’#cs-submit-date’).addEventListener(‘change’, e => set(‘submissionDate’, e.target.value));
// Consent checkboxes
const consentMap = {
‘cs-consent-data’:        ‘consentDataProtection’,
‘cs-consent-secrecy’:     ‘consentDataSecrecy’,
‘cs-consent-internet’:    ‘consentInternet’,
‘cs-consent-conf’:        ‘consentConfidentiality’,
‘cs-consent-declaration’: ‘consentDeclaration’,
};
Object.entries(consentMap).forEach(([id, field]) => {
el.querySelector(`#${id}`)?.addEventListener(‘click’, () => {
const wrap = el.querySelector(`#${id}`);
const checked = !wrap.classList.contains(‘checked’);
wrap.classList.toggle(‘checked’, checked);
wrap.classList.remove(‘consent-error’);
wrap.querySelector(‘input[type=“checkbox”]’).checked = checked;
set(field, checked);
document.getElementById(‘cs-consent-error’).style.display = ‘none’;
});
});
el.querySelector(’#cs-back-btn’).addEventListener(‘click’, onBack);
el.querySelector(’#cs-submit-btn’).addEventListener(‘click’, () => {
if (validate()) onSubmit();
});
return el;
}
