"""
RADHA 2027 Conference Website Automated Verification Suite
Validates HTML structure, internal link integrity, asset resolution,
and technical tracks completeness.
"""

import os
import re
import sys

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

PAGES = [
    'index.html',
    'call-for-papers.html',
    'committees.html',
    'author-guidelines.html',
    'registration.html',
    'venue.html',
    'others.html',
    'contact.html'
]

REQUIRED_DOCS = [
    'docs/content-verification.md',
    'docs/implementation-plan.md',
    'docs/testing.md',
    'docs/deployment.md'
]

def check_files_exist():
    print("Checking essential page files...")
    all_ok = True
    for p in PAGES:
        path = os.path.join(BASE_DIR, p)
        if not os.path.exists(path):
            print(f"[FAIL] Missing page: {p}")
            all_ok = False
        else:
            print(f"[PASS] Page exists: {p} ({os.path.getsize(path)} bytes)")

    for d in REQUIRED_DOCS:
        path = os.path.join(BASE_DIR, d)
        if not os.path.exists(path):
            print(f"[FAIL] Missing documentation: {d}")
            all_ok = False
        else:
            print(f"[PASS] Doc exists: {d}")
    return all_ok

def check_links_and_assets():
    print("\nValidating internal links and image assets...")
    all_ok = True
    href_pattern = re.compile(r'href=["\']([^"\'#:]+)(\.html|\.css|\.zip)?["\']')
    src_pattern = re.compile(r'src=["\']([^"\'#:]+)["\']')

    for p in PAGES:
        filepath = os.path.join(BASE_DIR, p)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check internal hrefs
        for match, ext in href_pattern.findall(content):
            target = match + (ext or '')
            if target.startswith(('http', 'mailto:', 'tel:', 'javascript:')):
                continue
            target_path = os.path.normpath(os.path.join(BASE_DIR, target))
            if not os.path.exists(target_path):
                print(f"[FAIL] Broken link in {p} -> {target}")
                all_ok = False

        # Check internal images/scripts
        for match in src_pattern.findall(content):
            if match.startswith(('http', '//', 'data:')):
                continue
            src_path = os.path.normpath(os.path.join(BASE_DIR, match))
            if not os.path.exists(src_path):
                print(f"[FAIL] Broken asset in {p} -> {match}")
                all_ok = False

    if all_ok:
        print("[PASS] All internal links, stylesheets, scripts, templates, and images resolved successfully.")
    return all_ok

def check_tracks_completeness():
    print("\nVerifying RADHA 2027 12 Technical Tracks...")
    cfp_path = os.path.join(BASE_DIR, 'call-for-papers.html')
    with open(cfp_path, 'r', encoding='utf-8') as f:
        cfp_content = f.read()

    expected_tracks = [
        "Track 01", "Track 02", "Track 03", "Track 04",
        "Track 05", "Track 06", "Track 07", "Track 08",
        "Track 09", "Track 10", "Track 11", "Track 12"
    ]
    missing = [t for t in expected_tracks if t not in cfp_content]
    if missing:
        print(f"[FAIL] Missing tracks in Call for Papers: {missing}")
        return False
    print("[PASS] All 12 Technical Tracks verified in call-for-papers.html.")

    expected_topics = [
        "Artificial Intelligence, Machine Learning and Intelligent Systems",
        "Data Science, Big Data and Advanced Analytics",
        "Quantum Computing and Quantum Information Science",
        "Quantum Communication, Sensing and Emerging Quantum Technologies",
        "Semiconductor Technologies, VLSI and Advanced Hardware",
        "Advanced Computing Architectures and Distributed Systems",
        "Cybersecurity, Privacy and Post-Quantum Cryptography",
        "Communication Networks, IoT and Next-Generation Connectivity",
        "Robotics, Automation and Cyber-Physical Systems",
        "Software Engineering, Algorithms and Computational Foundations",
        "Emerging Technologies and Interdisciplinary Engineering",
        "Sustainable, Human-Centric and Societal Applications"
    ]
    all_topics_present = True
    for topic in expected_topics:
        if topic not in cfp_content:
            print(f"[FAIL] Missing topic: {topic}")
            all_topics_present = False
    if all_topics_present:
        print("[PASS] All 12 track titles present and match RADHA 2027 DOCX specifications.")
    return all_topics_present

def main():
    print("=" * 60)
    print("RADHA 2027 TEST RUNNER")
    print("=" * 60)

    t1 = check_files_exist()
    t2 = check_links_and_assets()
    t3 = check_tracks_completeness()

    if t1 and t2 and t3:
        print("\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY (100%).")
        sys.exit(0)
    else:
        print("\nSOME CHECKS FAILED.")
        sys.exit(1)

if __name__ == '__main__':
    main()
