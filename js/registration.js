/**
 * RADHA 2027 — Registration Logic & Validation
 * Department of Information Technology, Delhi Technological University
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  if (!form) return;

  const categorySelect = document.getElementById('reg-category');
  const presentationModeSelect = document.getElementById('presentation-mode');
  const feeDisplayAmount = document.getElementById('calc-fee-amount');
  const feeDisplayBreakdown = document.getElementById('calc-fee-breakdown');
  const errorSummary = document.getElementById('error-summary');
  const errorSummaryList = document.getElementById('error-summary-list');
  const modal = document.getElementById('receipt-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const receiptDetails = document.getElementById('receipt-details');
  const printReceiptBtn = document.getElementById('print-receipt-btn');
  const clearDraftBtn = document.getElementById('clear-draft-btn');

  // Fee calculation matrix based on approved RADHA/DTU schedule
  const feeMatrix = {
    'student-indian-early': { amount: 'Rs. 8,000', currency: 'INR', raw: 8000, label: 'Student (UG/PG) — Indian (Early Bird)' },
    'student-indian-regular': { amount: 'Rs. 9,000', currency: 'INR', raw: 9000, label: 'Student (UG/PG) — Indian (Regular)' },
    'student-foreign': { amount: 'USD 200', currency: 'USD', raw: 200, label: 'Student (UG/PG) — Foreign Author' },
    'researcher-indian-early': { amount: 'Rs. 10,000', currency: 'INR', raw: 10000, label: 'Academic/Faculty/Ph.D./R&D — Indian (Early Bird)' },
    'researcher-indian-regular': { amount: 'Rs. 12,000', currency: 'INR', raw: 12000, label: 'Academic/Faculty/Ph.D./R&D — Indian (Regular)' },
    'researcher-foreign': { amount: 'USD 200', currency: 'USD', raw: 200, label: 'Academic/Faculty/Ph.D./R&D — Foreign Author' },
    'attendee-indian': { amount: 'Rs. 6,000', currency: 'INR', raw: 6000, label: 'Attendee / Participant (Non-Author) — Indian' },
    'attendee-foreign': { amount: 'USD 100', currency: 'USD', raw: 100, label: 'Attendee / Participant (Non-Author) — Foreign' }
  };

  // 1. Dynamic Fee Update & Conditional Paper Fields
  function updateFee() {
    const selectedKey = categorySelect.value;
    const authorFields = document.getElementById('author-specific-fields');
    const paperIdInput = document.getElementById('paper-id');
    const paperTitleInput = document.getElementById('paper-title');
    const trackSelect = document.getElementById('paper-track');

    if (feeMatrix[selectedKey]) {
      const fee = feeMatrix[selectedKey];
      feeDisplayAmount.textContent = fee.amount;
      feeDisplayBreakdown.textContent = `Applicable Registration Fee for: ${fee.label}`;

      // Toggle author field requirements
      const isAttendee = selectedKey.startsWith('attendee');
      if (authorFields) {
        if (isAttendee) {
          authorFields.style.opacity = '0.6';
          if (paperIdInput) paperIdInput.required = false;
          if (paperTitleInput) paperTitleInput.required = false;
          if (trackSelect) trackSelect.required = false;
        } else {
          authorFields.style.opacity = '1';
          if (paperIdInput) paperIdInput.required = true;
          if (paperTitleInput) paperTitleInput.required = true;
          if (trackSelect) trackSelect.required = true;
        }
      }
    } else {
      feeDisplayAmount.textContent = '—';
      feeDisplayBreakdown.textContent = 'Select your category above to calculate applicable fee';
    }
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      updateFee();
      saveDraft();
    });
  }

  // 2. Draft Storage (Prevent Data Loss on Accidental Reload)
  const DRAFT_KEY = 'radha_2027_reg_draft';

  function saveDraft() {
    const formData = {};
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (input.name && input.type !== 'file' && input.type !== 'password') {
        formData[input.name] = input.value;
      }
    });
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    } catch (e) {
      // Storage unavailable or quota exceeded
    }
  }

  function loadDraft() {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (!saved) return;
      const data = JSON.parse(saved);
      Object.keys(data).forEach(key => {
        const field = form.elements[key];
        if (field && data[key]) {
          field.value = data[key];
        }
      });
      updateFee();
    } catch (e) {
      console.error('Error loading draft', e);
    }
  }

  if (clearDraftBtn) {
    clearDraftBtn.addEventListener('click', () => {
      if (confirm('Clear your saved registration draft?')) {
        localStorage.removeItem(DRAFT_KEY);
        form.reset();
        updateFee();
      }
    });
  }

  // Auto-save draft on user typing
  form.addEventListener('input', () => {
    saveDraft();
  });

  // 3. Client-Side Field Validation
  function validateField(input) {
    const errorEl = document.getElementById(`${input.id}-error`);
    let isValid = true;
    let message = '';

    if (input.required && !input.value.trim()) {
      isValid = false;
      message = 'This field is required.';
    } else if (input.type === 'email' && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        isValid = false;
        message = 'Please enter a valid academic/work email address.';
      }
    } else if (input.id === 'phone' && input.value.trim()) {
      if (input.value.replace(/[\s\-\+\(\)]/g, '').length < 8) {
        isValid = false;
        message = 'Please provide a valid contact phone number with country code.';
      }
    }

    if (!isValid) {
      input.classList.add('is-invalid');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
      }
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.classList.remove('is-invalid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
      input.removeAttribute('aria-invalid');
    }

    return isValid;
  }

  // Attach blur listener to inputs
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
  });

  // 4. Form Submission Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll('input, select, textarea');
    let hasErrors = false;
    const errorListItems = [];

    inputs.forEach(input => {
      if (!validateField(input)) {
        hasErrors = true;
        const label = form.querySelector(`label[for="${input.id}"]`);
        const labelText = label ? label.textContent.replace('*', '').trim() : input.name;
        errorListItems.push({ id: input.id, text: labelText });
      }
    });

    if (hasErrors) {
      // Build accessible error summary banner
      errorSummaryList.innerHTML = '';
      errorListItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${item.id}`;
        a.textContent = `Please enter a valid value for ${item.text}`;
        a.addEventListener('click', (ev) => {
          ev.preventDefault();
          const target = document.getElementById(item.id);
          if (target) target.focus();
        });
        li.appendChild(a);
        errorSummaryList.appendChild(li);
      });

      errorSummary.classList.add('visible');
      errorSummary.scrollIntoView({ behavior: 'smooth', block: 'start' });
      errorSummary.focus();
      return;
    }

    // Hide error banner if all valid
    errorSummary.classList.remove('visible');

    // Generate unique verification reference number
    const refCode = 'RADHA-2027-' + Math.floor(100000 + Math.random() * 900000);
    const categoryInfo = feeMatrix[categorySelect.value] || { amount: 'N/A', label: 'General' };

    // Compile registration confirmation receipt
    const regRecord = {
      referenceCode: refCode,
      submissionTime: new Date().toLocaleString(),
      fullName: document.getElementById('full-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      affiliation: document.getElementById('affiliation').value.trim(),
      category: categoryInfo.label,
      feeAmount: categoryInfo.amount,
      paperId: document.getElementById('paper-id') ? document.getElementById('paper-id').value.trim() : 'N/A',
      paperTitle: document.getElementById('paper-title') ? document.getElementById('paper-title').value.trim() : 'N/A',
      track: document.getElementById('paper-track') ? document.getElementById('paper-track').value : 'N/A',
      mode: presentationModeSelect ? presentationModeSelect.value : 'In-Person',
      paymentRef: document.getElementById('utr-number').value.trim(),
      paymentDate: document.getElementById('payment-date').value
    };

    // Save record to local registry
    try {
      const records = JSON.parse(localStorage.getItem('radha_2027_registered_list') || '[]');
      records.push(regRecord);
      localStorage.setItem('radha_2027_registered_list', JSON.stringify(records));
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      console.warn('Local storage error', err);
    }

    // Render receipt inside modal dialog
    receiptDetails.innerHTML = `
      <div style="border-bottom: 2px solid var(--accent); padding-bottom: 1rem; margin-bottom: 1.25rem;">
        <h3 style="color: var(--primary); margin-bottom: 0.25rem;">RADHA 2027 Registration Acknowledgment</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0;">
          Department of Information Technology, Delhi Technological University (DTU)
        </p>
      </div>
      <div style="background-color: var(--success-bg); border: 1px solid var(--success-border); padding: 1rem; border-radius: 6px; margin-bottom: 1.25rem;">
        <p style="color: var(--success); font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem;">
          ✓ Registration Form Successfully Submitted
        </p>
        <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 0;">
          Confirmation Reference ID: <strong style="font-family: monospace; font-size: 1.15rem; color: var(--primary);">${refCode}</strong>
        </p>
      </div>
      <table class="academic-table" style="font-size: 0.9rem; margin-bottom: 1.5rem;">
        <tbody>
          <tr><th>Participant Name</th><td><strong>${regRecord.fullName}</strong></td></tr>
          <tr><th>Email Address</th><td>${regRecord.email}</td></tr>
          <tr><th>Affiliation / University</th><td>${regRecord.affiliation}</td></tr>
          <tr><th>Registration Category</th><td>${regRecord.category}</td></tr>
          <tr><th>Fee Calculated</th><td><strong style="color: var(--primary);">${regRecord.feeAmount}</strong></td></tr>
          <tr><th>Paper ID (CMT)</th><td>${regRecord.paperId || 'N/A'}</td></tr>
          <tr><th>Paper Title</th><td>${regRecord.paperTitle || 'N/A'}</td></tr>
          <tr><th>Presentation Mode</th><td>${regRecord.mode}</td></tr>
          <tr><th>Payment Reference / UTR</th><td>${regRecord.paymentRef}</td></tr>
          <tr><th>Payment Date</th><td>${regRecord.paymentDate}</td></tr>
        </tbody>
      </table>
      <div style="background: var(--surface-alt); padding: 1rem; border-radius: 6px; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
        <p style="margin-bottom: 0.35rem;"><strong>Next Steps:</strong></p>
        <ol style="padding-left: 1.25rem; margin-bottom: 0;">
          <li>Your payment reference will be reconciled with the DTU accounts office within 2–3 business days.</li>
          <li>A final confirmation email with your badge credentials and Springer presentation schedule will be sent to <strong>${regRecord.email}</strong>.</li>
          <li>Please print or save this acknowledgment slip for your records.</li>
        </ol>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modalCloseBtn.focus();
  });

  // Modal interactions
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      form.reset();
      updateFee();
    });
  }

  if (printReceiptBtn) {
    printReceiptBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  // Initialize draft and fee on load
  loadDraft();
  updateFee();
});
