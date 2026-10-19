# Juniper Candle Co.

## Overview

Juniper Candle Co. is a compact static-site fixture for a fictional monthly candle subscription business. It is designed to make routine quality-assurance work easy to reason about: the public experience is implemented with plain HTML, one shared stylesheet, and two small browser scripts. There is no framework runtime, server process, database, package manifest, build pipeline, account system, or checkout provider in this repository. A compatible static host can serve the files exactly as they are, and a developer can inspect the site locally with any ordinary HTTP server. That deliberately small surface area makes the project useful for validating page structure, asset loading, navigation, responsive presentation, and uncomplicated client-side behavior without first learning a larger application architecture.

The home page is `index.html` at the repository root. It introduces the fictional Portland business with a subscription-oriented headline, a short value proposition, and a call to action leading to the pricing page. The page has a shared header containing Home and Pricing links, a main content area, and a footer. The root-level placement is intentional: when the repository directory is used as the document root, visiting `/` resolves to this page. Its stylesheet is referenced as `/css/site.css`, and its browser-side page-view fixture is loaded from `/js/analytics.js`. Those root-relative paths must remain correct whenever files are reorganized or the site is served locally.

The pricing page lives at `pricing/index.html`, which common static hosts expose as `/pricing/` and often as `/pricing`. It contains the Taster, Classic, and Collector subscription presentations, a billing toggle, and the same basic navigation and visual language as the home page. The toggle is the fixture’s only meaningful interaction: it changes the displayed plan prices between the values stored in each price element’s `data-monthly` and `data-yearly` attributes. It does not calculate values, save a preference, communicate with a server, or initiate payment. Likewise, each visible “Choose” link currently points back to the home page. The labels and prices are presentation content, not a purchasing workflow.

Shared visual rules are in `css/site.css`. The stylesheet sets the warm background, dark typography, header border, responsive plan grid, plan-card treatment, rounded calls to action, and billing-toggle styling. Keeping those declarations in one file avoids drift between pages and gives contributors a predictable location for broad visual changes. `js/analytics.js` creates or reuses `window.juniperAnalytics` and appends the current path and a timestamp to its in-memory `views` array. It makes no network request and does not persist data beyond the loaded page. `js/pricing-toggle.js` runs only on the pricing page and expects a `.billing-toggle` button plus elements carrying the data attributes described above.

Treat this repository as a transparent static demonstration, not as a production commerce system. It intentionally omits customer authentication, subscriptions, inventory, payment collection, analytics reporting, privacy controls, and fulfillment. Any task that requires one of those capabilities needs appropriate architecture and platform guidance rather than an improvised browser-only addition. For ordinary copy, structure, styling, and small interaction work, make focused edits, preserve semantic HTML and root-relative asset references, and manually load both `/` and `/pricing/` through an HTTP server. The best change is one that remains easy for the next reviewer to locate, understand, and verify.

## Installation

Installing Juniper Candle Co. means obtaining the repository and serving its existing files; it does not mean installing an application runtime. The fixture intentionally has no `package.json`, lockfile, dependency directory, compiler, or package-manager script. Do not begin with `npm install`, `npm run build`, or a framework scaffolding command. Those commands cannot configure this project because there is no Node-based build to configure, and adding generated files or arbitrary dependencies would make the fixture harder to inspect. The only practical prerequisites are a modern web browser, Git if you need to clone or branch the repository, and a way to serve a directory over HTTP for local review. Any hosted static-file service with normal directory-index support is suitable for deployment.

Start by cloning the repository and moving into its root directory. Replace the placeholders with the repository location and directory name appropriate to your environment:

```sh
git clone <repository-url>
cd <repository-directory>
```

Before starting a server, inspect the top-level layout. The root should contain `index.html`, `css/site.css`, `js/analytics.js`, `js/pricing-toggle.js`, and the `pricing/` directory with its own `index.html`. The precise structure matters because every page uses root-relative paths such as `/css/site.css` and `/js/analytics.js`. Serve the repository root as the web root. Serving only the `pricing/` directory, opening a nested directory as the site root, or copying one page to a temporary location will make those paths resolve incorrectly and can produce misleading missing-style or missing-script failures.

For a lightweight local server, use an already installed tool. Python’s standard library is commonly available and needs no extra dependency installation:

```sh
python3 -m http.server 8000
```

Keep that process running, then open `http://localhost:8000/` in a browser. The home page should render with its shared stylesheet and should link to the pricing page. Open `http://localhost:8000/pricing/` directly as well. The trailing slash is useful with basic static servers because it asks for the directory index, `pricing/index.html`. Some hosts also resolve `http://localhost:8000/pricing`, but test the slash form when you want behavior that is portable across simple servers. If port 8000 is in use, choose another available port and update the browser URL accordingly.

You can use another existing static server if that is the convention in your environment. The important requirements are that it exposes the project directory unchanged, returns `index.html` files for directory requests, and does not rewrite root-relative paths to a subdirectory. A browser extension preview, file manager preview, or `file://` URL is not an equivalent test. Direct file loading may appear to render the HTML, but browser security and path handling differ from an HTTP deployment. It is therefore a poor way to confirm that `/css/site.css`, `/js/analytics.js`, and `/js/pricing-toggle.js` load as intended.

No environment variables, secrets, database migrations, or third-party accounts are needed for this fixture. If a future task introduces a genuine backend, checkout, analytics service, or email provider, stop treating setup as the static workflow described here. Document the new requirement explicitly and use approved server-side configuration for secrets. Until that happens, a clean clone plus a local HTTP server is the complete installation path. After making a change, refresh both pages, use the pricing toggle, and inspect the browser console and Network panel for unexpected errors or 404 responses before considering the local setup successful.

## Configuration

Juniper Candle Co. has intentionally little runtime configuration. Its public content, appearance, navigation, and small amount of behavior are configured directly in the checked-in HTML, CSS, and JavaScript files. There are no environment variables, `.env` files, deployment tokens, feature flags, data stores, or admin settings. This is a feature of the fixture rather than an omission to work around: an auditor should be able to tell what the site does by reading the repository. When configuration is needed, make the smallest direct source change that reflects it and keep the documentation synchronized with the implementation.

The main content configuration is in `index.html` and `pricing/index.html`. The home document defines the business name shown in the header, the headline, the introductory paragraph, and the link that leads to pricing. The pricing document defines its title, introductory text, plan names, descriptions, price strings, and the labels on its return links. Both documents repeat the small shared header and footer rather than importing them from a template engine. If you change a navigation label, business name, or footer detail that appears on both pages, update both documents in the same change. Test direct visits afterward; a static site must remain coherent even when a visitor does not arrive through the home page.

Plan prices require a little more care than ordinary copy because the billing toggle reads the HTML data attributes. Every `.price` element on the pricing page has a visible initial value and both `data-monthly` and `data-yearly` values. For example, the Taster plan is initially shown as `$18 / month`, while its attributes contain `$18 / month` and `$180 / year`. Keep all three strings accurate when updating a price. If the visible initial text and `data-monthly` disagree, the page will show one amount before the first toggle and another after the user changes back to monthly. If `data-yearly` is absent or misspelled, toggling can display an empty value. The current annual values are display text only; the script does not calculate discounts.

Visual configuration belongs in `css/site.css`. The file controls page margins, typefaces, background and foreground colors, header spacing and borders, maximum content width, the responsive plan grid, card borders and padding, price scale, and the visual treatment of links and the billing button. Prefer modifying this shared stylesheet rather than adding inline `style` attributes, because shared rules keep the two documents visually consistent. The plan grid uses `repeat(auto-fit, minmax(220px, 1fr))`, which permits the cards to flow according to available width. Retest a narrow viewport whenever a change increases copy length, padding, font size, or plan count.

The two scripts also have narrowly defined configuration contracts. `js/analytics.js` needs no values and simply appends an in-memory view record to `window.juniperAnalytics.views`. `js/pricing-toggle.js` expects exactly one element matching `.billing-toggle` and one or more elements matching `[data-monthly]`; those elements must expose compatible `data-monthly` and `data-yearly` strings. Do not include the pricing-toggle script on a page that lacks the button, because its current code calls `addEventListener` immediately. Conversely, do not remove the script from the pricing page if the billing button remains, because then the interface will have a control that does nothing. No configuration in this project should contain credentials, personal data, payment keys, or private URLs. A future need for those values means the static fixture’s architecture has changed and needs an explicit security-aware design.

## Usage

Use Juniper Candle Co. as a small, inspectable static-site fixture. The normal workflow is to serve the repository root over HTTP, visit the pages in a browser, and make carefully scoped source edits when a QA task calls for them. Start a local server from the repository root, then use the home page as the first smoke-test entry point:

```sh
python3 -m http.server 8000
```

Navigate to `http://localhost:8000/`. Confirm that the page renders its warm shared visual treatment, that the header has Home and Pricing links, and that the primary “See our plans” link goes to the pricing page. Follow that link rather than relying only on a direct URL: link traversal verifies that the home document’s route and relative hosting context are correct. Then load `http://localhost:8000/pricing/` directly. Direct loading matters because a visitor, test, or static host can request the price page without first visiting `/`.

On the pricing page, use the “Show yearly prices” button. The Taster, Classic, and Collector price labels should change from the monthly strings to the annual strings, and the button label should become “Show monthly prices.” Use the button again to return the monthly labels and original button label. This is the expected behavior of `js/pricing-toggle.js`: it stores a boolean only for the lifetime of the loaded page and substitutes the strings supplied by the markup. Refresh the page after toggling. It should return to its monthly initial state because the fixture does not use local storage, cookies, query parameters, or a server to remember a billing preference.

The call-to-action links inside each plan are intentionally not purchase actions. Selecting Taster, Classic, or Collector returns to `/`, where the home page is shown. Do not test them as though they open checkout, collect a payment, create a subscription, or allocate a product. Their value in the fixture is to provide recognizable plan controls and verify a basic navigation target. If a future requirement calls for real transactions, do not reinterpret the current links as a production flow. Add a properly approved and secured integration only after the architecture, platform contract, and data-handling requirements are known.

For simple browser-side inspection, open developer tools after loading either page. In the console, evaluate `window.juniperAnalytics`. The object should have a `views` array whose latest entry describes the current `location.pathname` and a numeric timestamp. This is a local page-view fixture, not an analytics dashboard or a cross-page record. Reloading the page reruns the script for the new document instance, but the object is not sent to a backend and should not be used to evaluate real traffic. Use the Network panel as well: the home page should request its HTML, `/css/site.css`, and `/js/analytics.js`; the pricing page should also request `/js/pricing-toggle.js`.

When you edit the fixture, use the page that owns the behavior you are changing. Update home copy in `index.html`; update plan copy, prices, and the billing interface in `pricing/index.html`; adjust presentation in `css/site.css`; and change client behavior only in the focused scripts under `js/`. Retest both pages after shared style or navigation changes. For markup edits, check browser console errors, broken network requests, keyboard access to the button and links, and a narrow viewport. For script edits, test initial state, first interaction, reverse interaction, and refresh. The site is intentionally simple, so usage discipline—not a complicated test harness—is what keeps it reliable and comprehensible.

## Examples

The examples in this section show how to make ordinary, fixture-appropriate changes while preserving the site’s current contracts. They are not instructions for adding a checkout, user tracking service, or backend. Before applying any example, run a local HTTP server and inspect the relevant existing file. Then make the narrowest edit necessary and verify the affected page directly as well as through any navigation that leads to it. The examples deliberately favor readable source over abstractions because the project has only two pages and a small number of shared assets.

To change the home-page message, edit the heading or paragraph in `index.html`. For instance, the existing heading can be replaced with a seasonal variation while retaining the page’s semantic structure:

```html
<h1>Autumn candles, delivered monthly</h1>
<p>Small-batch soy candles made in Portland, with a new warm scent each month.</p>
```

After updating this copy, load `/` and confirm that the text fits comfortably at both a wide and narrow viewport. Do not move the stylesheet or script tags while making a content-only edit. The page must continue to reference `/css/site.css` and `/js/analytics.js` so that it maintains the shared treatment and the in-memory page-view fixture.

To update a plan price, modify the visible value and both data attributes in the matching pricing card. Suppose the Classic plan’s monthly display changes to `$36 / month` and its annual display changes to `$360 / year`. Update the single `.price` element as a consistent unit:

```html
<div class="price" data-monthly="$36 / month" data-yearly="$360 / year">$36 / month</div>
```

The three values are intentionally repeated. The initial text is what a visitor sees before interaction, `data-monthly` is restored when the toggle returns from annual billing, and `data-yearly` is shown when annual billing is selected. Open `/pricing/`, compare the initial Classic amount, toggle once to see the annual amount, toggle again to restore the monthly amount, and refresh to confirm the default state is still monthly. Do not change only the visible string; doing so creates an inconsistent interaction.

To add a fourth presentation-only plan, copy an existing `.plan` block inside the `.plans` container in `pricing/index.html`, then supply a distinct heading, price strings, and description. The responsive CSS grid will include the new card without a separate layout rule because it uses auto-fit behavior. Keep the same class names and required attributes:

```html
<div class="plan">
  <h2>Sampler</h2>
  <div class="price" data-monthly="$24 / month" data-yearly="$240 / year">$24 / month</div>
  <p>One rotating candle and a seasonal scent note.</p>
  <a class="cta" href="/">Choose Sampler</a>
</div>
```

This example adds visual content only. Its button still returns to the home page, just like the existing cards. Verify that all prices switch together and that the cards remain legible at a phone-sized width. If the new plan needs a real purchase flow, pause before implementing it: the current repository has no approved product, order, or payment architecture.

To adjust the site-wide content width or plan spacing, make a CSS-only change in `css/site.css`. For example, increasing the gap between plan cards from `20px` to `24px` changes the shared grid while preserving its responsive behavior. Load both pages afterward because `main` and shared type styles affect the home page as well. Avoid duplicating the rule as an inline style on one page; the point of the shared stylesheet is to keep common presentation predictable. For any example, finish by reviewing the source diff and by checking that no unrelated formatting, generated output, personal data, or credentials have entered the repository.

## Troubleshooting

Most issues in this fixture come from serving the wrong directory, changing an asset path, or breaking the small HTML-to-JavaScript contract on the pricing page. Troubleshoot from the browser outward: reproduce the issue through a local HTTP server, load the affected URL directly, inspect the browser console and Network panel, and then compare the relevant source file with the project’s established structure. Do not add a build tool, a framework, or a new dependency to diagnose a static-file problem. The site’s intentionally small file set makes direct inspection faster and more reliable.

If the page has no intended styling, first verify that the server was started from the repository root. Both documents load `/css/site.css`, so the web root must contain the `css/` directory. In the browser Network panel, request or locate `/css/site.css`; it should return the stylesheet rather than a 404 page or another document. Check that the `<link rel="stylesheet" href="/css/site.css">` tag remains in both HTML documents and that the path has not been changed to a relative path that points somewhere else. Also confirm you are testing `http://localhost:<port>/` rather than double-clicking the HTML file and using a `file://` URL. Restart the local server from the correct directory after moving files.

If the pricing page loads but the billing button does nothing, inspect the console for JavaScript errors and then check three items in `pricing/index.html`. The button must have the `billing-toggle` class, the document must load `/js/pricing-toggle.js` after the button exists in the page, and each price element must carry `data-monthly` and `data-yearly`. The current script calls `document.querySelector(".billing-toggle")` and immediately attaches a click listener, so removing or renaming the button causes a null-reference error. Similarly, adding a new plan without the required data attributes means the script cannot produce a correct annual or monthly label for that card. Restore the expected markup instead of compensating with an unrelated script change.

If prices switch but show an unexpected amount, compare the visible initial content of every `.price` element with its attributes. The monthly text must match `data-monthly`, and `data-yearly` must contain the exact annual display string you intend to show. Remember that the fixture does not calculate a discount: it simply copies the strings already in the HTML. A typo such as `data-year` or an omitted dollar sign becomes visible to the visitor. After correction, reload the page rather than relying on a previously cached document, then toggle from monthly to yearly and back again.

If `/pricing/` returns a 404 response locally, ensure the `pricing/index.html` file exists and that the server supports directory indexes. Python’s `http.server` does, so `python3 -m http.server 8000` from the project root is a useful baseline. Try the explicit URL `http://localhost:8000/pricing/index.html` to distinguish a directory-index issue from a missing file. A host that serves `/pricing/index.html` but not `/pricing/` needs directory-index configuration; do not alter the source navigation until you have confirmed the host’s intended URL behavior. The existing header uses `/pricing`, which many hosts resolve correctly, but direct testing of both forms gives better deployment confidence.

If you see no entries in `window.juniperAnalytics`, check that `/js/analytics.js` is requested successfully and that browser developer tools are attached to the same page you just loaded. The object is in memory only. Reloading, navigating to another document, opening a new tab, or closing the tab creates a new JavaScript context, so it is not expected to preserve a historical trail. If you encounter a problem that cannot be isolated to the static files, record the exact URL, browser console error, request status, and source change that preceded it. That information is more useful for review than speculative changes and prevents a simple hosting or markup issue from being mistaken for a product-system failure.
