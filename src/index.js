// ============================================================
// index.js — MANN+HUMMEL Joining Kit
// Main orchestrator: manages steps, shared state, navigation,
// pre-fill from SF/EMP_PreJoin, and final submission.
//
// HOW TO USE:
//   1. Open index.html in a browser to see the full form
//   2. When integrating with SPFx:
//      - Drop this entire /src folder into your SPFx project
//      - In JoiningFormWebPart.ts, call initJoiningForm() from render()
//      - Replace submitForm() with your SP REST API writes
// ============================================================
import { JoiningDetails } from ‘./components/JoiningDetails.js’;
import { PersonalDetails } from ‘./components/PersonalDetails.js’;
import { FamilyDetails   } from ‘./components/FamilyDetails.js’;
import { Academic        } from ‘./components/Academic.js’;
import { WorkHistory     } from ‘./components/WorkHistory.js’;
import { Nominees        } from ‘./components/Nominees.js’;
import { Consents        } from ‘./components/Consents.js’;
// ── Step definitions ────────────────────────────────────────
const STEPS = [
{ key: ‘joining’,   label: ‘Joining’,   icon: ‘📋’ },
{ key: ‘personal’,  label: ‘Personal’,  icon: ‘👤’ },
{ key: ‘family’,    label: ‘Family’,    icon: ‘👨‍👩‍👧’ },
{ key: ‘academic’,  label: ‘Academic’,  icon: ‘🎓’ },
{ key: ‘work’,      label: ‘Work’,      icon: ‘💼’ },
{ key: ‘nominees’,  label: ‘Nominees’,  icon: ‘📑’ },
{ key: ‘consents’,  label: ‘Consents’,  icon: ‘✅’ },
];
// ── App state ────────────────────────────────────────────────
let currentStep = 0;
let formData    = {};        // all section data, keyed by step key
let rootEl      = null;
// ── Entry point ──────────────────────────────────────────────
export function initJoiningForm(containerSelector = ‘#mh-app’) {
rootEl = document.querySelector(containerSelector);
if (!rootEl) { console.error(‘Container not found:’, containerSelector); return; }
// Try to load pre-fill data from URL params (SF integration)
loadPreFillFromURL().then(() => {
render();
});
}
// ── Pre-fill from URL params (EMP_PreJoin row) ───────────────
async function loadPreFillFromURL() {
const params  = new URLSearchParams(window.location.search);
const empID   = params.get(‘empid’);
const token   = params.get(‘token’);
if (!empID || !token) return;   // no pre-fill, fresh form
try {
// ── SPFx version: replace the fetch URL with your SP site URL
// const siteUrl = _spPageContextInfo?.webAbsoluteUrl || ‘’;
// const endpoint = `${siteUrl}/_api/web/lists/getbytitle('EMP_PreJoin')/items`
//   + `?$filter=EmpID eq '${empID}' and FormToken eq '${token}'`
//   + `&$select=Surname,FirstName,MiddleName,DateOfBirth,Gender,MaritalStatus,`
//   + `Citizenship,PhoneNumber,PersonalEmail,PANNumber,PassportNumber,`
//   + `PassportExpiry,PermAddr_Line1,PermAddr_City,PermAddr_State,PermAddr_PIN,`
//   + `DateOfJoining,Designation,Grade,Department,FathersName`;
//
// const res  = await fetch(endpoint, { headers: { ‘Accept’: ‘application/json;odata=nometadata’ }});
// const data = await res.json();
// const emp  = data.value[0];
```
// ── Demo mode: use mock data if empid=DEMO in URL
const emp = empID === 'DEMO' ? getMockSFData() : null;
if (!emp) return;
// Map SF/EMP_PreJoin fields to our formData structure
formData.joining = {
 ...formData.joining,
 surname:      emp.Surname || '',
 firstName:    emp.FirstName || '',
 middleName:   emp.MiddleName || '',
 empID:        emp.EmpID || empID,
 dateOfJoining:emp.DateOfJoining ? emp.DateOfJoining.split('T')[0] : '',
 designation:  emp.Designation || '',
 grade:        emp.Grade || '',
 dateOfOffer:  emp.DateOfOffer ? emp.DateOfOffer.split('T')[0] : '',
 _prefilled: true,
};
formData.personal = {
 ...formData.personal,
 dob:         emp.DateOfBirth ? emp.DateOfBirth.split('T')[0] : '',
 gender:      mapGender(emp.Gender),
 maritalStatus: emp.MaritalStatus || '',
 citizenship: emp.Citizenship || 'Indian',
 phone:       emp.PhoneNumber || '',
 pan:         emp.PANNumber || '',
 passportNo:  emp.PassportNumber || '',
 passportExpiry: emp.PassportExpiry ? emp.PassportExpiry.split('T')[0] : '',
 permanentAddress: {
   line1: emp.PermAddr_Line1 || '',
   city:  emp.PermAddr_City  || '',
   state: emp.PermAddr_State || '',
   pin:   emp.PermAddr_PIN   || '',
 },
 _prefilled: true,
};
formData.family = {
 ...formData.family,
 _prefilled: true,
};
console.log('[MH JoiningKit] Pre-filled from SuccessFactors data for', empID);
```
} catch (err) {
console.warn(’[MH JoiningKit] Pre-fill failed:’, err);
}
}
function mapGender(sfGender) {
if (!sfGender) return ‘’;
const map = { ‘M’: ‘Male’, ‘F’: ‘Female’, ‘Male’: ‘Male’, ‘Female’: ‘Female’ };
return map[sfGender] || sfGender;
}
// ── Mock SF data (demo only) ─────────────────────────────────
function getMockSFData() {
return {
Surname: ‘Venkatesh’, FirstName: ‘Priya’, MiddleName: ‘’,
EmpID: ‘MH-2024-087’,
DateOfJoining: ‘2024-04-01T00:00:00’, DateOfOffer: ‘2024-03-15T00:00:00’,
Designation: ‘Sr. HR Executive’, Grade: ‘L3’,
DateOfBirth: ‘1995-07-15T00:00:00’,
Gender: ‘F’, MaritalStatus: ‘Unmarried’, Citizenship: ‘Indian’,
PhoneNumber: ‘9876543210’, PANNumber: ‘ABCPV1234K’,
PermAddr_Line1: ‘Flat 4B, Sunrise Apartments, 12th Main’,
PermAddr_City: ‘Bengaluru’, PermAddr_State: ‘Karnataka’, PermAddr_PIN: ‘560008’,
};
}
// ── Render ───────────────────────────────────────────────────
function render() {
rootEl.innerHTML = ‘’;
// Header
rootEl.appendChild(buildHeader());
// Stepper
rootEl.appendChild(buildStepper());
// Active section
const section = buildSection(currentStep);
rootEl.appendChild(section);
// Scroll to top
rootEl.scrollIntoView({ behavior: ‘smooth’, block: ‘start’ });
}
function buildHeader() {
const header = document.createElement(‘div’);
header.className = ‘mh-header’;
header.innerHTML = `<div class="mh-header-brand"> <div class="mh-logo">M+H</div> <div> <div class="mh-header-title">Employee Joining Kit</div> <div class="mh-header-sub">MANN+HUMMEL · Digital Onboarding</div> </div> </div> <div class="mh-header-ref"> ${(formData.joining?.empID) ?`EMP ID: ${formData.joining.empID}`: 'New Joiner Form · 2024'} </div>`;
return header;
}
function buildStepper() {
const wrap = document.createElement(‘div’);
wrap.className = ‘mh-stepper’;
const track = document.createElement(‘div’);
track.className = ‘mh-stepper-track’;
STEPS.forEach((step, i) => {
const stepEl = document.createElement(‘div’);
stepEl.className = ‘mh-step’ + (i < currentStep ? ’ done’ : i === currentStep ? ’ active’ : ‘’);
stepEl.innerHTML = `<div class="mh-step-bubble">${i < currentStep ? '✓' : i + 1}</div> <div class="mh-step-label">${step.label}</div>`;
// Allow clicking back to completed steps
if (i < currentStep) {
stepEl.style.cursor = ‘pointer’;
stepEl.addEventListener(‘click’, () => { currentStep = i; render(); });
}
track.appendChild(stepEl);
});
wrap.appendChild(track);
return wrap;
}
function stepInfo() {
return `${currentStep + 1} of ${STEPS.length}`;
}
function buildSection(stepIndex) {
const key = STEPS[stepIndex].key;
const sectionData = formData[key] || {};
function onChange(updated) {
formData[key] = updated;
}
function onNext()  { currentStep = Math.min(currentStep + 1, STEPS.length - 1); render(); }
function onBack()  { currentStep = Math.max(currentStep - 1, 0); render(); }
const props = { data: sectionData, onChange, onNext, onBack, stepInfo: stepInfo() };
switch (key) {
case ‘joining’:
return JoiningDetails(props);
case ‘personal’:
return PersonalDetails(props);
case ‘family’:
return FamilyDetails(props);
case ‘academic’:
return Academic(props);
case ‘work’:
return WorkHistory(props);
case ‘nominees’:
return Nominees(props);
case ‘consents’:
return Consents({
…props,
onSubmit: handleSubmit,
joinerName: `${formData.joining?.firstName || ''} ${formData.joining?.surname || ''}`.trim(),
});
default:
return document.createElement(‘div’);
}
}
// ── Submit ───────────────────────────────────────────────────
async function handleSubmit() {
showSubmitting();
try {
// ── SPFx integration point ──────────────────────────────
// Replace the comment below with your SP REST API writes.
// See the Phase 3 Week 7 section of your roadmap for the
// exact write pattern using getFormDigest() + fetch().
//
// Example:
//   const digest = await getFormDigest(siteUrl);
//   const masterItem = await writeItem(‘EMP_Master’, digest, {
//     Title: formData.joining.empID,
//     EmpID: formData.joining.empID,
//     Surname: formData.joining.surname,
//     …
//   });
//   await writeItem(‘EMP_FamilyDetails’, digest, { EmpID_RefId: masterItem.Id, … });
//   etc.
```
// Demo: just log and show success
console.log('[MH JoiningKit] Form submitted:', formData);
await new Promise(r => setTimeout(r, 1500)); // simulate network
showSuccess();
```
} catch (err) {
console.error(’[MH JoiningKit] Submit failed:’, err);
showError(err.message);
}
}
// ── Success / error screens ──────────────────────────────────
function showSubmitting() {
rootEl.innerHTML = `<div class="mh-header"> <div class="mh-header-brand"> <div class="mh-logo">M+H</div> <div> <div class="mh-header-title">Employee Joining Kit</div> <div class="mh-header-sub">MANN+HUMMEL · Digital Onboarding</div> </div> </div> </div> <div style=" background:white;border-radius:14px;padding:60px 40px; text-align:center;margin-top:20px; border:1px solid var(--border); box-shadow:var(--shadow-md); "> <div style="font-size:48px;margin-bottom:16px;animation:spin 1s linear infinite;display:inline-block">⏳</div> <div style="font-size:20px;font-weight:600;margin-bottom:8px">Submitting your joining kit...</div> <div style="color:var(--text-secondary);font-size:14px">Saving your details to HR systems. Please wait.</div> </div> <style>@keyframes spin { to { transform: rotate(360deg); } }</style>`;
}
function showSuccess() {
const name = `${formData.joining?.firstName || ''} ${formData.joining?.surname || ''}`.trim();
rootEl.innerHTML = `<div class="mh-header"> <div class="mh-header-brand"> <div class="mh-logo">M+H</div> <div> <div class="mh-header-title">Employee Joining Kit</div> <div class="mh-header-sub">MANN+HUMMEL · Digital Onboarding</div> </div> </div> <div class="mh-header-ref">EMP ID: ${formData.joining?.empID || '—'}</div> </div> <div style=" background:white;border-radius:14px;padding:60px 40px; text-align:center;margin-top:20px; border:2px solid #86efac; box-shadow:var(--shadow-md); "> <div style=" width:72px;height:72px;border-radius:50%; background:#d4efdf;margin:0 auto 20px; display:grid;place-items:center;font-size:32px; ">✓</div> <div style="font-size:24px;font-weight:700;margin-bottom:8px;color:#1a5c38"> Welcome to MANN+HUMMEL, ${name || 'new colleague'}! </div> <div style="color:var(--text-secondary);font-size:15px;margin-bottom:24px;line-height:1.6;max-width:480px;margin-left:auto;margin-right:auto"> Your joining kit has been submitted successfully. HR will review your details and generate your official documents. You will receive a confirmation email shortly. </div> <div style=" display:inline-flex;align-items:center;gap:10px; background:#d4efdf;border:1px solid #86efac; border-radius:10px;padding:12px 24px; font-family:var(--font-mono);font-size:13px;color:#1a5c38; "> Employee ID: <strong>${formData.joining?.empID || '—'}</strong> </div> <div style="margin-top:24px;font-size:13px;color:var(--text-hint)"> Your HR team will contact you to complete any remaining formalities. </div> </div>`;
}
function showError(msg) {
const errDiv = document.createElement(‘div’);
errDiv.style.cssText = `background:var(--mh-red-light);border:1px solid var(--mh-red-mid); border-radius:var(--radius-md);padding:16px 20px; margin-top:16px;font-size:13px;color:var(--mh-red);`;
errDiv.textContent = `Submission failed: ${msg}. Please try again or contact HR.`;
rootEl.appendChild(errDiv);
}
// ── Auto-start if running standalone ─────────────────────────
if (document.readyState === ‘loading’) {
document.addEventListener(‘DOMContentLoaded’, () => initJoiningForm());
} else {
initJoiningForm();
}
