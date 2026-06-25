# GTM + GA4 Setup for KAVOMAZ

## Step 1 — In Google Tag Manager
Container: `GTM-WVSCZN22`

Create a new tag:
- Tag type: Google Analytics: GA4 Configuration or Google Tag
- Measurement ID: paste your KAVOMAZ GA4 Measurement ID, like `G-XXXXXXXXXX`
- Trigger: All Pages

Click Submit → Publish.

## Step 2 — Event Tracking
Create GA4 Event tags or use GA4 automatic event forwarding for these dataLayer events:
- `kavomaz_link_click`
- `kavomaz_scroll_depth`
- `kavomaz_js_error`
- `kavomaz_page_context`

## Step 3 — Recommended Conversions
Mark as key events/conversions in GA4:
- Amazon clicks where `click_type = amazon_click`
- WhatsApp clicks where `click_type = whatsapp_click`
- Email clicks where `click_type = email_click`

## Step 4 — Test
Use GTM Preview, open https://kavomaz.com, click Amazon buttons, then check DebugView in GA4.
