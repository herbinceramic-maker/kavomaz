KAVOMAZ GTM INSTALL - FINAL PACKAGE

Installed Google Tag Manager container:
GTM-WVSCZN22

What changed:
- GTM <script> added inside <head> on all HTML pages.
- GTM <noscript> iframe added immediately after <body> on all HTML pages.
- script.js updated to push kavomaz_click events to dataLayer for links using class track-click.
- GTM_INSTALL_REPORT.json added with the list of modified pages.

Next steps after uploading to GitHub:
1. Wait for GitHub Pages / Cloudflare deployment.
2. Open Google Tag Manager > KAVOMAZ container.
3. Add GA4 tag with your GA4 Measurement ID.
4. Trigger: Initialization - All Pages or All Pages.
5. Submit and Publish the GTM container.
6. Open Google Analytics Realtime to test.

Do not install the GA4 gtag code directly in the HTML if you are using GTM.
