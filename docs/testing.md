# RADHA 2027 — Quality Assurance & Testing Plan

## 1. Scope of Testing

This document details the functional, visual, accessibility, and security testing protocols executed for the RADHA 2027 conference website.

---

## 2. Testing Matrices

### 2.1 Functional Testing
| Test ID | Module | Description | Expected Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-F01** | Navigation | Click all internal navigation links (Home, CFP, Registration, Committees, Author Guidelines, Venue, Others, Contact) | Correct page loads with matching active navigation state | **PASS** |
| **TC-F02** | Registration Form | Submit empty form | Validation stops submission, highlights mandatory fields, displays accessible error summary banner | **PASS** |
| **TC-F03** | Registration Form | Select Author category vs Attendee category | Paper ID and Title fields dynamically toggle requirement state | **PASS** |
| **TC-F04** | Registration Form | Input valid registration details and submit | Displays verified confirmation receipt modal with unique reference number, allows printing/saving | **PASS** |
| **TC-F05** | Draft Persistence | Fill form partially and refresh the browser | Form retains filled values from localStorage with user notification | **PASS** |
| **TC-F06** | Contact Form | Submit valid inquiry message | Shows immediate confirmation and reset | **PASS** |
| **TC-F07** | External Links | Microsoft CMT and Google Map embeds | Open securely with `rel="noopener noreferrer"` | **PASS** |

### 2.2 Responsive & Visual Testing
| Device / Viewport | Width Range | Expected Layout Behavior | Status |
| :--- | :--- | :--- | :--- |
| **Mobile (Portrait)** | 320px – 480px | Hamburger nav active, tables scroll horizontally with visual cue, single-column cards | **PASS** |
| **Tablet** | 768px – 1024px | 2-column grids for tracks and committee, readable font sizing | **PASS** |
| **Desktop / Laptop** | 1024px – 1440px | Full horizontal navigation bar, multi-column speaker grid, high-density info cards | **PASS** |
| **Ultra-wide Display** | > 1440px | Layout constrained to max-width (1280px) to prevent overstretched line lengths | **PASS** |

### 2.3 Accessibility Audit (WCAG 2.2 AA)
- [x] Skip-to-content navigation present on all pages.
- [x] Form inputs paired with `<label>` tags with matching `id`/`for` attributes.
- [x] Error messages connected via `aria-describedby` and announced via `aria-live`.
- [x] Color contrast ratios verified >= 4.5:1 for body copy and >= 3:1 for large headers.
- [x] Keyboard focus visible across all buttons, inputs, links, and accordion headers.
- [x] Images equipped with descriptive `alt` attributes or marked `alt=""` if purely decorative.

### 2.4 Security & Data Safety
- No payment credentials or credit card numbers collected on the client.
- All bank transfer and NEFT details display official DTU institutional bank accounts.
- Input fields sanitised to prevent XSS injection.
- No sensitive API keys or private credentials exposed in client-side bundles.
