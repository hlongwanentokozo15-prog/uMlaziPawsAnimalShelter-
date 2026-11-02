# uMlazi Paws Animal Shelter

A multi-page website for uMlazi Paws Animal Shelter in Durban, built for WEDE5020.
Live site: ADD YOUR NETLIFY / GITHUB PAGES LINK HERE

## Project structure
`index.html`, `about.html`, `adoptions.html`, `enquiry.html`, `contact.html`, `css/style.css`, `js/main.js`, `data/animals.json`, `images/`, `robots.txt`, `sitemap.xml`

## Part 3: Functionality and SEO

### JavaScript features (`js/main.js`)
- **Dynamic content:** the adoptable animals are loaded from `data/animals.json` and rendered with the DOM.
- **Search, filter and sort:** search by text, filter by species, sort by name or age (adoptions page).
- **Accordion:** adoption FAQ (adoptions page).
- **Gallery with lightbox:** photos on the home page and animal photos enlarge on click; close with the X button, a click outside the photo or the Escape key.
- **Interactive map:** Leaflet and OpenStreetMap map with markers for both locations (contact page), replacing the two Google Maps iframes.
- **Animations:** sections fade in on scroll, cards lift on hover, buttons scale on hover (CSS transitions and keyframes; disabled for users who prefer reduced motion).
- **Enquiry form (`enquiry.html`):** HTML5 attributes plus JavaScript validation (name length, email format, South African phone format, preferred visit date not in the past or on a Sunday, message 20 to 500 characters, animal name required for adoption enquiries), inline error messages, and AJAX submission with `fetch`. The success message tells the visitor whether the animal they asked about is available.
- **Contact form (`contact.html`):** validates name, email, phone, message type and message, then compiles the details into an email to info@umlazipaws.org.za that opens in the visitor's email app.

### SEO
- **On-page:** unique title and meta description per page, keywords, one H1 per page with H2/H3 below it, descriptive alt text, descriptive file names, clean flat URLs, internal links in the nav, footer and body text, mobile viewport tag, skip link, JSON-LD `AnimalShelter` data for both locations.
- **Performance:** photos resized (originals were 1.5 to 3.7 MB each) with larger versions in `images/large/` for the lightbox; lazy loading on images below the fold.
- **Files:** `robots.txt` and `sitemap.xml`.
- **Off-page plan:** build backlinks from local animal welfare groups, Durban community pages and veterinary practices; share adoptable animals on social media with links back to `adoptions.html`; claim and complete a Google Business Profile for both locations to support local search.

## Screenshots
### Desktop (1200px+)
![Desktop view](images/screenshot-desktop.png)
### Tablet (768px)
![Tablet view](images/screenshot-tablet.png)
### Mobile (375px to 480px)
![Mobile view](images/screenshot-mobile.png)

## Changelog

### Part 2 feedback edits
Lecturer feedback (11 October 2026, 80/100): "Your GitHub has no detailed commits and read me file. Your styling is inconsistent."

| Date | File | Feedback received | What was changed |
|------|------|-------------------|------------------|
| 2026-11-02 | README.md | No (proper) README file | Rewrote the README: project description, structure, Part 3 feature list, SEO notes, screenshots, a detailed changelog and an updated reference list. |
| 2026-11-02 | Git history | No detailed commits | All Part 3 work is committed in small steps, each with a descriptive message that names the file and what changed (see the commit history on GitHub). |
| 2026-11-02 | about.html, adoptions.html, enquiry.html, contact.html | Inconsistent styling | The logo only appeared in the header on index.html. It now appears in the header on every page, so all five pages share the same header, navigation and footer. |
| 2026-11-02 | css/style.css | Inconsistent styling | Moved every colour into CSS variables in one `:root` block so the same teal, orange, gold and ink colours are used everywhere. Form fields and buttons now inherit the page font (they used the browser default before). Animal cards and location cards now share one card style. Headings use one colour scheme (h1 and h2 teal, h3 dark ink). The call-to-action button and form buttons now share the same padding, radius and weight. |
| 2026-11-02 | css/style.css | Inconsistent styling | The global `img` rule forced every image to 200px with a border, which made the hero image and logo look different from the rest. The hero now fills its container and the logo has no border. |

### Part 3 entries
| Date | File | Change | Reason |
|------|------|--------|--------|
| 2026-11-02 | all pages | Added unique meta descriptions, keywords, Open Graph tags and titles containing "Durban" and the page topic | On-page SEO |
| 2026-11-02 | all pages | Changed the header shelter name from `<h1>` to `<p class="site-name">` and promoted each page's first `<h2>` to `<h1>` | One unique H1 per page |
| 2026-11-02 | all pages | Added skip link, `aria-current` on the active nav link, footer navigation, favicon | Accessibility and internal linking |
| 2026-11-02 | css/style.css | Added media queries at 768px and 480px, fixed the global `img` width so the hero image fills its container, added focus styles | Responsive layout (the Part 2 stylesheet had no media queries) |
| 2026-11-02 | images/ | Resized all photos and the logo, added `images/large/` for the lightbox | Page speed |
| 2026-11-02 | index.html | Added gallery with lightbox and links to About and Adoptions in the intro | Part 3 functionality |
| 2026-11-02 | adoptions.html | Animals now load from `data/animals.json`; added search, species filter, sort and an FAQ accordion | Part 3 functionality |
| 2026-11-02 | enquiry.html | Added JavaScript validation, error messages, visit date field, animal name suggestions and AJAX submission | Part 3 forms |
| 2026-11-02 | contact.html | Replaced Google Maps iframes with a Leaflet map; added phone and message type fields; form validates and compiles an email | Part 3 forms and map |
| 2026-11-02 | robots.txt, sitemap.xml | Created | Part 3 section 3.3 |
| 2026-11-02 | README.md | Added Part 3 documentation, changelog and updated references | Documentation |

## References
Google Fonts (2026) *Open Sans*. Available at: https://fonts.google.com/specimen/Open+Sans (Accessed: 25 September 2026).

Leaflet (2023) *Leaflet: an open-source JavaScript library for mobile-friendly interactive maps*. Available at: https://leafletjs.com (Accessed: 2 November 2026).

OpenStreetMap contributors (2026) *OpenStreetMap*. Available at: https://www.openstreetmap.org (Accessed: 2 November 2026).

Formspree (2026) *Formspree documentation*. Available at: https://formspree.io (Accessed: 2 November 2026).

Schema.org (2026) *AnimalShelter*. Available at: https://schema.org/AnimalShelter (Accessed: 2 November 2026).
