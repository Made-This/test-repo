# Juniper Candle Co.

## Overview

Juniper Candle Co. is a deliberately small, static demonstration storefront for a monthly candle subscription. It presents a clear landing page, a focused pricing page, a reusable visual treatment, and a small amount of browser-side behavior. The repository is intended to be easy to inspect during QA work: there is no application server, framework runtime, database, checkout integration, or build-generated output to understand before a change can be made. Vercel can serve the files directly, while the source remains ordinary HTML, CSS, and JavaScript that can also be opened through a local static-file server.

The home page is `index.html`. It introduces the fictional Portland candle business, explains the subscription proposition, and directs visitors to the available plans. The pricing experience lives at `pricing/index.html`, allowing a host that supports directory indexes to expose it at `/pricing`. That page shows the Taster, Classic, and Collector subscription options. Each plan begins with a monthly price and can be switched to its annual equivalent without leaving the page. This intentionally narrow interaction is useful for checking that a deployed static site can load shared assets and execute uncomplicated JavaScript correctly.

Shared presentation belongs in `css/site.css`. The stylesheet establishes the serif type treatment, warm light background, dark copy, bordered header, responsive plan grid, pill-shaped call-to-action links, and pricing toggle appearance. Both pages reference the same stylesheet using root-relative paths, so visual changes can normally be made in one place. `js/analytics.js` records a lightweight page-view entry in the current browser session under `window.juniperAnalytics`; it makes no network request and does not persist data. `js/pricing-toggle.js` is loaded only by the pricing page and changes text in elements that provide `data-monthly` and `data-yearly` values.

This project is a fixture rather than a complete commerce implementation. The “Choose” links intentionally return to the home page, and no purchase, subscription, account, fulfillment, or payment behavior exists. Treat visible price copy as demonstration content unless a separate task adds a real, platform-approved checkout path. Keep changes small and explicit: preserve root-relative asset paths, maintain semantic HTML, and test the home and pricing URLs after editing. The result should remain understandable to someone reading the repository for the first time, which is more valuable here than adding a complex toolchain for a few static files.

## Installation

Installation for Juniper Candle Co. means obtaining the repository and choosing a static HTTP server for local review. There are no runtime packages, lockfiles, package-manager scripts, or compilation steps in this fixture. Do not start by running `npm install`: the repository does not include a `package.json`, and adding an arbitrary Node dependency would obscure the simple deployment model. A modern browser and a tool capable of serving a directory over HTTP are sufficient. Git is recommended so that you can create an isolated change, inspect the diff, and keep track of the exact files you altered.

Clone the repository, then enter the project directory:

```sh
git clone <repository-url>
cd <repository-directory>
```

Before serving the site, confirm the expected layout. You should see `index.html` at the repository root, `pricing/index.html` for the plan page, `css/site.css` for shared styling, and two JavaScript files under `js/`. This check catches a common mistake: opening a parent directory or moving files into a nested folder that breaks the root-relative `/css/site.css` and `/js/...` references. Because the site uses root-relative URLs, serve the repository root as the web root rather than serving `pricing/` alone.

For a quick local server, use any existing tool your environment already provides. For example, Python’s standard library can serve the current directory:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/` for the home page and `http://localhost:8000/pricing/` for the pricing page. The trailing slash in the latter URL is useful with basic directory servers because it lets the server locate `pricing/index.html`. If your team uses a different static server, configure it to fall back to normal directory-index behavior and to expose the repository root directly. No special proxy, environment variable, API key, or database is required.

You may open `index.html` directly from the filesystem for a very limited markup review, but this is not the preferred installation check. Browsers can handle the linked stylesheet in many local-file situations, yet URL behavior differs from a real server and the `/pricing` route cannot be assessed accurately. Serving the project over HTTP also makes it easier to examine console errors and asset requests in browser developer tools. When local review is complete, deployment is likewise straightforward: publish the repository through the project’s configured static-site workflow. Vercel serves a new revision on pushes according to the existing project setup; this repository itself needs no generated build artifact. Keep credentials and host configuration outside the source tree unless a separate deployment task explicitly requires them.

## Configuration

Juniper Candle Co. has no runtime configuration file or environment-variable contract. Its configuration is the source itself: business copy is written in the HTML documents, the visual system is defined in the shared stylesheet, and the pricing toggle receives its values from HTML `data-*` attributes. This is intentional for a static QA fixture. It makes the deployed result deterministic and keeps every visitor-facing value visible in a normal code review. Do not introduce a `.env` file for ordinary copy, colors, plan names, or prices. Such a layer would add setup requirements without providing a capability the current site uses.

Start with the two documents when adapting the storefront. In `index.html`, the `<title>`, header brand, heading, introductory paragraph, and footer identify the business and its offer. In `pricing/index.html`, the title, heading, supporting paragraph, plan titles, descriptions, and plan links contain the page-specific content. Keep the shared header and footer aligned across both documents. The navigation relies on `/` and `/pricing`, so if you alter the folder structure, update both pages together and test from the deployed-style root path. Root-relative asset links such as `/css/site.css` are a deliberate convention, not placeholders.

Plan prices require special care because the visible default and both data attributes must agree. A price element follows this pattern:

```html
<div class="price" data-monthly="$18 / month" data-yearly="$180 / year">
  $18 / month
</div>
```

The text between the tags is what appears on initial load. `data-monthly` is the text restored when the visitor chooses monthly billing, and `data-yearly` is the text shown after the toggle selects annual billing. Update all three values whenever a plan’s price changes. The toggle script deliberately performs no calculations; this avoids rounding assumptions and lets each plan use precisely the copy supplied in the markup. Each target also needs the `price` class if it should retain the shared price styling.

Use `css/site.css` for visual changes that should apply across the site. It contains direct CSS rules rather than design tokens or a utility framework, so edit selectors with awareness of their shared use. For example, `.cta` styles both the home-page plan link and the pricing-page choice links; changing it changes every call to action. The `.plans` grid uses `auto-fit` with a minimum card width, which lets the plan cards wrap on smaller viewports without extra configuration. JavaScript configuration is intentionally minimal: `analytics.js` expects no options, and `pricing-toggle.js` expects exactly one `.billing-toggle` element plus one or more elements with monthly and yearly data. If you add a second toggle, refactor the script deliberately rather than assuming the existing `querySelector` supports multiple controls.

There are no secrets to configure. Do not place payment keys, customer records, or analytics credentials in this repository. Adding live commerce, remote analytics, or form handling changes the project’s security and privacy model and should be handled as a separate, reviewed integration rather than as an edit to this fixture’s static configuration.

## Usage

Use Juniper Candle Co. as a compact static-site fixture: serve the repository root, visit the available pages, and make narrowly scoped content or presentation changes when a QA scenario calls for them. Once a local server is running, the normal visitor path starts at `/`. The header offers Home and Pricing links, and the primary home-page call to action also leads to `/pricing`. The pricing page can be reached directly at `/pricing/` in a basic local server or at `/pricing` on a host that resolves directory indexes. Verify both paths after any change that touches navigation, asset URLs, shared CSS, or deployment settings.

The only interactive behavior is the billing control on the pricing page. Initial load presents monthly prices and a button labeled “Show yearly prices.” Selecting it changes every element with `data-monthly` to its corresponding `data-yearly` value, then changes the button label to “Show monthly prices.” Selecting the same button again restores the monthly values and original label. The state is deliberately ephemeral: reloading the page resets it to monthly prices, and opening another tab creates an independent state. This behavior is appropriate for a client-side display preference and should not be represented as a stored subscription choice.

For a practical smoke test, start the local server, visit the home page, and confirm that the header, introductory copy, call-to-action link, and footer render with the shared styles. Follow the call to action or navigation link to pricing. Confirm all three plan cards appear, press the billing toggle once, and make sure each displayed price uses annual wording. Press it again and make sure the monthly wording returns. Refresh the page and confirm the default is monthly. In browser developer tools, inspect the Network and Console panels for missing stylesheet or script requests and JavaScript errors. The page-view helper should not create a network request because it records only in the active browser context.

Developers can use the in-browser analytics fixture for simple inspection. After visiting a page, open the browser console and evaluate `window.juniperAnalytics.views` manually. It should contain an entry with the current path and a numeric millisecond timestamp. This object is not an analytics API, is not guaranteed across reloads, and should not be used to collect visitors’ information. Its purpose is to make it obvious that a script loaded and ran without adding a backend dependency.

When editing, preserve the contract between markup and scripts. Every pricing value that should change needs both data attributes. The toggle must remain a button with the `.billing-toggle` class, and `pricing-toggle.js` must continue to load after the relevant HTML is present. Keep pages accessible by retaining meaningful headings, visible link text, and a real button for the billing action. Use a feature branch for work that changes visitor-facing copy or prices, review the diff, then follow the repository’s normal deployment process. This fixture has no formal command-line interface; its usable interface is the two-page website served over HTTP.

## Examples

The following examples show safe, representative changes to the static fixture. They are examples of editing source files, not integrations with a real order system. Apply each change in the appropriate HTML or CSS file, serve the repository root, and check both pages before treating the result as complete. Keep the current project’s simple structure unless a task explicitly requires a larger redesign.

To change the home-page message while preserving the document hierarchy, replace the existing heading and supporting paragraph in `index.html`. For example, a seasonal editorial update could read:

```html
<h1>Autumn candles, poured in small Portland batches</h1>
<p>Choose a candle club plan and receive a new, warm seasonal scent each month.</p>
```

Keep one descriptive `<h1>` on the page and make its accompanying paragraph explain the call to action. The `.cta` link may retain its existing `/pricing` destination when the goal is still to guide visitors toward the plans. If a sentence gets longer, review the layout on a narrow viewport rather than assuming the desktop presentation will remain comfortable.

To update a plan’s displayed amount, change all three representations at once. Here is a correctly synchronized Classic plan price:

```html
<div class="price" data-monthly="$36 / month" data-yearly="$360 / year">
  $36 / month
</div>
```

After saving, use the pricing toggle twice. The first click should show `$360 / year`; the second should restore `$36 / month`. A frequent incomplete edit changes only the visible text, causing the old monthly amount to return after toggling. The fixture uses authored annual prices rather than a calculation, so enter the exact approved annual wording in `data-yearly`.

To add a fourth plan, duplicate a complete `.plan` block inside the existing `.plans` container. Give the plan its own heading, price attributes, description, and visible choice link. The responsive `auto-fit` grid will place it beside or below the other cards according to available width. For example, a limited premium tier can be structured as:

```html
<div class="plan">
  <h2>Studio</h2>
  <div class="price" data-monthly="$72 / month" data-yearly="$720 / year">$72 / month</div>
  <p>Four candles, a wick trimmer, and a seasonal note.</p>
  <a class="cta" href="/">Choose Studio</a>
</div>
```

The example link still returns home because this project has no checkout destination. Do not relabel that behavior as a completed purchase flow. If a future approved task provides a real destination, update the link only with that approved value and test it separately.

For a small style adjustment, modify the existing shared selector rather than adding inline styles to one page. Increasing `main` padding in `css/site.css`, for instance, affects both documents consistently. When you need page-specific styling, add a meaningful class to the relevant element and define a narrowly targeted rule in the stylesheet. Avoid using styling changes to hide missing functionality. The examples should remain readable, keyboard-operable, and easy to reverse in a code review.

## Troubleshooting

Most issues in this repository come from serving the wrong directory, changing a path without updating the matching reference, or breaking the small markup-to-script contract on the pricing page. Start troubleshooting by returning to a plain local HTTP server at the repository root. Opening the site through `file://` can conceal routing differences and does not accurately represent how `/pricing` or root-relative assets behave on a static host. With a server running, load `/` and `/pricing/`, then use the browser Network and Console panels to identify the first missing request or script error rather than changing several files at once.

If the page has no shared styling, confirm that the server root is the repository root and that `css/site.css` exists with that exact lowercase path. Both HTML documents use `/css/site.css`; a host that serves a child folder as its root will request the wrong location. Also check that a recently edited `<link>` tag is still inside `<head>` and still has `rel="stylesheet"`. Browser caching can make a recent CSS change appear absent, so perform a hard refresh or disable cache in developer tools before assuming the stylesheet was not deployed. Do not copy CSS into each page as a workaround: correct the asset path or server configuration instead.

If the pricing page displays but the billing toggle does nothing, first look for a JavaScript error in the console. `js/pricing-toggle.js` calls `document.querySelector(".billing-toggle")`, so the page needs one element with that class before the script executes. The existing script is loaded at the end of the `<body>`, which ensures the button and prices already exist. Moving the script into the document head without adding appropriate load handling can make the selector return `null`. Likewise, every value you expect to change needs `data-monthly` and `data-yearly`. Missing attributes do not produce a useful fallback; they result in blank or incorrect displayed text.

When annual prices change but monthly prices do not restore correctly, inspect the three values in each `.price` element: the initial inner text, `data-monthly`, and `data-yearly`. The first two should normally use the same monthly wording. Avoid placing currency values only in CSS pseudo-elements or calculating them in the toggle script, because that makes the source harder to audit and can leave screen readers with inconsistent text. Test the full sequence: page load, first click, second click, and reload. The reload should return to the declared monthly default.

If a link works locally but fails after deployment, verify whether the host expects `/pricing` or `/pricing/` for directory indexes. The current navigation uses `/pricing`, while `pricing/index.html` remains the physical file. Most static hosts support this convention, but a custom configuration may require a redirect or rewrite outside this repository. Do not turn the pricing path into a file extension link merely to fit one local server without considering the deployed route. Check the host’s deployment settings separately if the source paths are correct.

Finally, remember the intentional limits of the fixture. Clicking “Choose” is not supposed to open checkout, and `window.juniperAnalytics` is not supposed to persist data or appear in a third-party dashboard. Those are not defects in the current implementation. If a task requires either behavior, document the expected destination or integration first; then implement it through the approved platform workflow rather than treating a static example as a production payment or analytics system.

## FAQ

**Is this a production ecommerce site?** No. Juniper Candle Co. is a static QA fixture that resembles a subscription storefront but does not implement checkout, payment processing, customer accounts, inventory, shipping, or fulfillment. The plan descriptions and prices are fixture content. The “Choose” links lead back to the home page by design. Do not make a production claim or direct real customers to these controls unless an approved task has added the necessary platform-backed commerce flow.

**Why is there no `package.json` or build command?** The site is composed of browser-ready HTML, CSS, and JavaScript. It has no dependencies to install and no generated files to produce. A static host can serve the repository as-is. This keeps the fixture small and helps QA work focus on route handling, asset loading, markup, styles, and browser behavior. If a tool introduces a build requirement, that should be a deliberate architectural change with a documented reason, not an assumed first step.

**How should I preview the pricing page locally?** Serve the repository root with a static HTTP server and visit `http://localhost:<port>/pricing/`. The physical page is `pricing/index.html`; the slash lets simple directory servers resolve that index document. The navigation itself uses `/pricing`, which a typical host resolves to the same page. Testing under HTTP is preferred to double-clicking the file because root-relative asset URLs and route handling more closely match deployment.

**Where do I change prices?** Edit each `.price` element in `pricing/index.html`. Change the initial text, `data-monthly`, and `data-yearly` together. The initial text and `data-monthly` should usually match because the page opens in monthly mode. Annual values are authored directly rather than calculated by JavaScript. After editing, click the toggle twice and refresh the page to verify both billing states and the default state.

**Does the pricing toggle save a visitor’s preference?** No. Its `yearly` variable lives only in the loaded page. A refresh resets the page to monthly pricing, and no browser storage, cookie, API request, or database write occurs. This is intentional. If persistent preferences become a requirement, define the privacy, consent, and persistence behavior before adding storage code.

**What does `window.juniperAnalytics` do?** `js/analytics.js` creates or reuses a browser-global object and appends an entry containing the current `location.pathname` and a timestamp. It is a local execution fixture, not a real analytics service. The data is not sent to a server and is not meant for reporting. You can inspect it in developer tools during a manual smoke test, but do not rely on it as a durable record.

**Can I add more pages?** Yes, when a task needs them. Create an HTML document in a clear directory, use the shared stylesheet with the correct root-relative path, and add navigation only when the page should be discoverable. Test direct loading, internal links, mobile layout, and deployment behavior. Avoid copying the entire stylesheet into a page or adding a framework for a single document unless the scope truly requires it.

**Where should secrets or payment keys go?** Nowhere in this fixture. The repository currently requires no secret values. A future approved integration should use the designated platform and server-side configuration for any credentials; never embed keys in HTML, CSS, or browser JavaScript. Treat a request for real payment, contact, or tracking behavior as a separate security review rather than a text update.

## Contributing

Contributions should preserve the fixture’s central quality: a reviewer can understand exactly what visitors receive by reading a handful of static files. Begin each change by identifying whether it belongs in page content, shared styling, or the narrowly scoped browser scripts. Edit the smallest relevant file set, keep unrelated formatting out of the diff, and avoid adding a dependency or build system unless the task cannot be accomplished within the existing static structure. This repository is intentionally simple, so clarity and accuracy are stronger contributions than abstraction.

Create a focused branch, review the current file layout, and state the behavior you intend to change before editing. For copy or plan updates, that usually means changing `index.html` or `pricing/index.html`. For a site-wide visual adjustment, start with `css/site.css`. For pricing interaction behavior, inspect `js/pricing-toggle.js` and the matching attributes in the pricing markup together. Do not modify a script in isolation from the HTML contract it expects. Similarly, if you update shared navigation or the footer, make the equivalent update on both pages so direct visits remain consistent.

Follow ordinary semantic HTML practices. Use meaningful headings in order, real links for navigation, and real buttons for actions that alter the current page. Keep link labels descriptive enough to make sense without surrounding visual context. Preserve the viewport meta tag and language attribute when editing documents. The existing stylesheet includes a responsive plan grid; test narrow screens after changing plan-card content, especially if you add a plan or significantly lengthen a description. Prefer changes in `css/site.css` over inline styles so the two pages continue to share a coherent treatment.

Test contribution behavior through a local HTTP server. At minimum, load the home page, navigate to pricing, confirm the stylesheet and both scripts load, and operate the billing toggle through yearly and monthly states. Refresh the pricing page to confirm it returns to the monthly default. When changing navigation or file locations, test direct URLs as well as clicks. Inspect the browser console for JavaScript exceptions and the Network panel for 404 responses. A static site does not need a compilation step, but it still needs route, asset, and interaction verification.

Before opening a review, inspect the diff carefully. Check that price edits synchronize initial text with `data-monthly` and `data-yearly`; check that no accidental credentials, personal data, or generated local files were added; and check that the documentation still describes the code that exists. Be candid about intentional fixture limits. Do not describe a home-page destination as checkout, or describe the in-memory analytics object as a reporting system. If a proposed feature requires payments, customer data, external email, durable analytics, or server-side processing, pause and obtain the necessary architecture and platform guidance instead of embedding an improvised implementation in browser files.

Write commit messages and review descriptions that name the user-visible result and the verification performed, such as “Update annual plan copy; manually verified the pricing toggle.” Keep each contribution easy to revert. Respect existing changes from other contributors and avoid reformatting untouched files. A well-scoped static-site contribution is one that a future maintainer can understand, test with a simple local server, and deploy without discovering hidden setup requirements.
