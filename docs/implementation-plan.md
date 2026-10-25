# RADHA 2027 — Web Implementation Plan & Architecture Specification

## 1. Project Overview

This implementation plan details the engineering, UX, design system, and deployment specifications for the official website of **RADHA 2027** (*International Conference on Research in Artificial Intelligence, Data, Hardware and Advanced Quantum Technologies*), organized by the Department of Information Technology, Delhi Technological University (DTU), New Delhi.

---

## 2. Technical Stack and Design Principles

1. **Core Stack**:
   - **HTML5**: Semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), structured ARIA landmarks, WCAG 2.2 AA accessibility.
   - **CSS3**: Vanilla CSS using custom design tokens (`:root` properties), responsive flexbox and CSS grid layouts, zero heavy third-party framework dependencies for maximal speed and maintainability.
   - **JavaScript (ES6+)**: Progressive enhancement, client-side validation, accessible dialog/modals, local storage draft persistence, dynamic fee calculator.

2. **Design Philosophy**:
   - **Institutional Dignity**: Academic, authoritative, highly readable, structured, and trustworthy.
   - **Visual System**:
     - Palette: Deep institutional navy (`#0f2942`), primary blue (`#173b63`), high-contrast dark charcoal text (`#1e293b`), crisp clean white surfaces (`#ffffff`), subtle cool slate background (`#f8fafc`), clean border lines (`#e2e8f0`).
     - Typography: Clean modern font hierarchy with system font fallback (`'Inter'`, `system-ui`, `-apple-system`, `sans-serif`).
     - Layout: Generous whitespace, clear content hierarchy, responsive tables with mobile horizontal scroll or card transformations, no distracting gimmicks, animations restricted to subtle focus/hover micro-interactions.

---

## 3. Site Navigation & Page Architecture

The web application consists of 8 interconnected pages:

1. **`index.html` (Home)**:
   - Institutional banner & logo presentation (RADHA 2027 & DTU logos).
   - Hero banner announcing full conference name, theme, dates (4–5 Feb 2027), mode (Hybrid), and venue (DTU New Delhi).
   - About the Conference & Convergence Scope.
   - Keynote Speakers showcase (6 international and national luminaries).
   - Key Conference Pillars & Special Focus Areas.
   - Important Dates schedule (Paper submission, acceptance, early bird, camera-ready).
   - Springer Scopus-indexed proceedings announcement.
   - Quick action calls: "Submit Your Paper (Microsoft CMT)" & "Register Now".
   - About Delhi Technological University.

2. **`call-for-papers.html` (Call for Papers & Technical Tracks)**:
   - Scope of submissions (theoretical, novel methodologies, prototypes, validated applications).
   - Interactive track directory for all **12 Technical Tracks** with detailed topic breakdowns.
   - **7 Special Focus Areas** on interdisciplinary convergence.
   - Important deadlines reminder.
   - Direct link to Microsoft CMT paper submission portal.

3. **`registration.html` (Registration & Author Workflow)**:
   - Verified fee structure table (Student UG/PG, Researchers, Attendees; Indian vs Foreign; Early Bird vs Regular).
   - Important registration policies, deadlines, and inclusion benefits.
   - **Interactive Registration Form**:
     - Step 1: Attendee / Author Category & Fee Calculation.
     - Step 2: Paper Information (CMT Paper ID, Paper Title, Technical Track).
     - Step 3: Participant Personal Details & Institutional Affiliation.
     - Step 4: Payment Details (Bank NEFT/RTGS/IMPS/UPI transfer details to DTU account, Transaction Reference ID, Receipt Upload).
     - Instant client-side validation, field-level error messages, error summary banner.
     - Local storage draft persistence (prevent data loss on refresh).
     - Confirmation modal with printable summary receipt.

4. **`committees.html` (Committees & Leadership)**:
   - Patron, General Chairs, Organizing Chairs, Technical Program Chairs.
   - International Advisory Committee directory with affiliations.
   - National Advisory Committee & Steering Committee.
   - Accessible accordions / filterable directory for effortless reading.

5. **`author-guidelines.html` (Author Guidelines & Templates)**:
   - Formatting and manuscript preparation instructions following Springer guidelines.
   - Downloadable Word and LaTeX template references.
   - Originality, plagiarism, and review policy (double-blind / peer review via Microsoft CMT).
   - Presentation guidelines for both in-person and virtual presenters.

6. **`venue.html` (Venue & Travel Information)**:
   - DTU Department of Information Technology, Academic Block 3 (AB3), Rohini, New Delhi.
   - Embedded interactive responsive Google Map.
   - Transportation guidance (Delhi Metro Yellow Line / Red Line, Airport T3, New Delhi Railway Station, taxi options).
   - Climate and Delhi travel tips for February.

7. **`others.html` (Accommodations & Local Attractions)**:
   - Recommended partner hotel: Crowne Plaza New Delhi Rohini (by IHG).
   - Alternate guest houses and hotel options in Rohini and North Delhi.
   - Historic and cultural landmarks of New Delhi.

8. **`contact.html` (Contact DTU & Organizing Secretariat)**:
   - Official conference email (`radha@dtu.ac.in` / `icdsi@dtu.ac.in`).
   - Campus physical address and department contact.
   - Direct inquiry form with validation.

---

## 4. Accessibility (WCAG 2.2 AA) & Performance Commitments

- **Skip to Content Link**: First focusable element on every page (`#main-content`).
- **Contrast Ratios**: All text meets or exceeds a 4.5:1 contrast ratio against background surfaces; headings and large text exceed 3:1.
- **Semantic Structure**: Single `<h1>` per page, hierarchical `<h2>`–`<h4>`, semantic `<nav>`, `<main>`, `<section>`, `<footer>`.
- **Keyboard Usability**: Every interactive component (links, buttons, form controls, disclosure toggles) is fully keyboard accessible with distinct `:focus-visible` outlines.
- **Form Accessibility**: Every `<input>`, `<select>`, `<textarea>` has an explicit `<label for="...">`, `aria-describedby` for error feedback and instructions, and `aria-required="true"`.
- **Responsive Layout**: Fluid layouts supporting 320px mobile up to 4K ultra-wide screens, with no horizontal scrolling or clipped text.
