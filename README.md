# RADHA 2027 — International Conference Website

Official web application for **RADHA 2027** (*International Conference on Research in Artificial Intelligence, Data, Hardware and Advanced Quantum Technologies*), organized by the Department of Information Technology, Delhi Technological University (DTU), New Delhi, India.

---

## 🏛️ Conference Information

- **Full Name**: International Conference on Research in Artificial Intelligence, Data, Hardware and Advanced Quantum Technologies
- **Acronym**: RADHA 2027
- **Dates**: 4–5 February 2027
- **Mode**: Hybrid Mode (In-Person & Virtual)
- **Host Institution**: Department of Information Technology, Academic Block 3 (AB3), Delhi Technological University (DTU), Rohini, New Delhi 110042, India
- **Conference Theme**: Convergence of Artificial Intelligence, Advanced Computing and Quantum Technologies
- **Tagline**: *"Advancing Research, Connecting Technologies, Shaping the Future"*
- **Publication**: Accepted and presented papers will be submitted for inclusion in **Springer's Scopus-indexed proceedings** (subject to approval).
- **Paper Review System**: Microsoft Conference Management Toolkit (CMT)

---

## 📂 Project Architecture

```text
RADHA-ICDSI/
├── index.html                   # Official Conference Home Page
├── call-for-papers.html         # 12 Technical Tracks, Focus Areas & Scope
├── committees.html              # Patrons, Chairs & International Advisory Board
├── author-guidelines.html       # Formatting Rules, Springer Templates & CMT
├── registration.html            # Verified Fee Matrix & Interactive Registration
├── venue.html                   # DTU AB3 Venue, Directions & Interactive Map
├── others.html                  # Accommodations (Crowne Plaza) & Delhi Guide
├── contact.html                 # Secretariat Contact & Inquiry Desk
├── css/
│   └── styles.css               # Official Institutional Design System & Tokens
├── js/
│   ├── main.js                  # Shared interactions (nav toggle, track search)
│   └── registration.js          # Registration form, validation, draft save & receipt
├── assets/
│   └── images/                  # Conference logos, DTU campus & speaker portraits
├── templates/
│   ├── Word+Template.zip        # Springer MS Word template archive
│   └── latex.zip                # Springer LaTeX LLNCS class & sample archive
├── docs/
│   ├── content-verification.md  # Conference identity confirmation & verification audit
│   ├── implementation-plan.md   # Architectural & technical design plan
│   ├── testing.md               # QA test plan & accessibility audit
│   └── deployment.md            # Hosting guide & server configuration
├── tests/
│   └── test_site.py             # Automated link, asset & track integrity test suite
└── README.md                    # Project documentation
```

---

## 🚀 Running Locally

The site is built with modern vanilla web standards (HTML5, CSS3 custom properties, ES6 JavaScript) and has zero runtime dependencies or build steps.

### Option 1: Python Built-in Server
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in any web browser.

### Option 2: Direct File Access
Simply double-click `index.html` to open in any modern browser.

---

## 🧪 Running Verification Tests

To verify all internal links, image assets, stylesheets, scripts, templates, and 12 technical tracks:
```bash
python tests/test_site.py
```

---

## ♿ Accessibility & Security (WCAG 2.2 AA)

- **Skip Navigation**: Accessible `#main-content` jump link on all pages.
- **High Contrast**: Strict adherence to >= 4.5:1 text-to-background contrast ratios.
- **Form Usability**: Explicit `<label>` associating with all form fields, live client-side validation, accessible error summary banners with jump anchors, and `aria-live` status announcements.
- **Draft Persistence**: Auto-saves participant inputs in `localStorage` to protect against accidental browser refreshes.
- **Receipt Modal**: Generates printable and downloadable registration verification slips with unique reference IDs.
- **Data Safety**: No payment credentials or secret keys handled client-side.
