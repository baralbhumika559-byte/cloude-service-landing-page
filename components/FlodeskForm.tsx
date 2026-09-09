"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Flodesk embed for "Book a consultation call" (form id 6aa1cf85defc2da50c169150)
//
// This is the exact embed Flodesk generated for this form — markup, CSS,
// field names, hidden inputs, the submit action, and the two loader scripts
// are all untouched. The ONLY intentional change is inside the base64
// `data-ff-config` block below: `onSuccess.mode` was flipped from
// "redirect" to "message".
//
// Why: the original config redirects the browser (immediately, with no
// delay) the moment Flodesk's own script sees a successful submit. On this
// form the configured redirect target was actually empty (an unset
// redirectUrl), so left as-is that would have sent visitors nowhere useful
// and, worse, would hijack navigation before we ever get a chance to route
// to our own /thank-you page, with no pause for Flodesk's post-submit
// automation to settle. Switching to "message" mode makes Flodesk show its
// own inline success state instead (it sets data-ff-stage="success" on the
// root element). We watch for that attribute change below and, only after
// it fires (i.e. only after Flodesk has confirmed the submission), wait a
// couple of seconds and then route to /thank-you ourselves. Lead capture,
// field names, and the automation trigger (which fires server-side on
// Flodesk's end the moment the POST succeeds) are completely unaffected by
// this — it only changes what the *browser* does visually after a
// successful submit.
// ---------------------------------------------------------------------------

const FORM_ID = "6aa1cf85defc2da50c169150";
const ROOT_CLASS = "ff-6aa1cf85defc2da50c169150";
// Give Flodesk's own success UI / automation a moment before we navigate away.
const REDIRECT_DELAY_MS = 2200;

// Original Flodesk config, decoded, with only onSuccess.mode changed
// from "redirect" to "message" (message/redirectUrl were already empty
// in the source config, so they're left exactly as provided):
// {
//   "trigger": { "mode": "immediately", "value": 0 },
//   "onSuccess": { "mode": "message", "message": "", "redirectUrl": "" },
//   "coi": false,
//   "showForReturnVisitors": true,
//   "notification": false,
//   "gdpr": { "acceptsMarketing": false, "privacyPolicy": { "enabled": false, "mandatory": false } },
//   "trackingConfig": { "metaPixelId": "", "cookieBannerEnabled": false, "googleAnalyticsId": "" }
// }
const FF_CONFIG =
  "eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJtZXNzYWdlIiwibWVzc2FnZSI6IiIsInJlZGlyZWN0VXJsIjoiIn0sImNvaSI6ZmFsc2UsInNob3dGb3JSZXR1cm5WaXNpdG9ycyI6dHJ1ZSwibm90aWZpY2F0aW9uIjpmYWxzZSwiZ2RwciI6eyJhY2NlcHRzTWFya2V0aW5nIjpmYWxzZSwicHJpdmFjeVBvbGljeSI6eyJlbmFibGVkIjpmYWxzZSwibWFuZGF0b3J5IjpmYWxzZX19LCJ0cmFja2luZ0NvbmZpZyI6eyJtZXRhUGl4ZWxJZCI6IiIsImNvb2tpZUJhbm5lckVuYWJsZWQiOmZhbHNlLCJnb29nbGVBbmFseXRpY3NJZCI6IiJ9fQ==";

// Verbatim Flodesk CSS (unchanged) — scoped entirely to the form's own root
// class, so it cannot leak out and affect the rest of the page.
const FLODESK_CSS = `
  [data-ff-el="root"].${ROOT_CLASS} *,
  [data-ff-el="root"].${ROOT_CLASS} *::before,
  [data-ff-el="root"].${ROOT_CLASS} *::after {
    box-sizing: border-box;
  }

  [data-ff-el="root"].${ROOT_CLASS} [tabindex="-1"]:focus {
    outline: none !important;
  }

  [data-ff-el="root"].${ROOT_CLASS} h1,
  [data-ff-el="root"].${ROOT_CLASS} h2,
  [data-ff-el="root"].${ROOT_CLASS} h3,
  [data-ff-el="root"].${ROOT_CLASS} h4,
  [data-ff-el="root"].${ROOT_CLASS} h5,
  [data-ff-el="root"].${ROOT_CLASS} h6 {
    margin-top: 0;
    margin-bottom: 0.7em;
  }

  [data-ff-el="root"].${ROOT_CLASS} p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  [data-ff-el="root"].${ROOT_CLASS} ol,
  [data-ff-el="root"].${ROOT_CLASS} ul,
  [data-ff-el="root"].${ROOT_CLASS} dl {
    margin-top: 0;
    margin-bottom: 1.4rem;
  }

  [data-ff-el="root"].${ROOT_CLASS} ol ol,
  [data-ff-el="root"].${ROOT_CLASS} ul ul,
  [data-ff-el="root"].${ROOT_CLASS} ol ul,
  [data-ff-el="root"].${ROOT_CLASS} ul ol {
    margin-bottom: 0;
  }

  [data-ff-el="root"].${ROOT_CLASS} b,
  [data-ff-el="root"].${ROOT_CLASS} strong {
    font-weight: bolder;
  }

  [data-ff-el="root"].${ROOT_CLASS} small {
    font-size: 80%;
  }

  [data-ff-el="root"].${ROOT_CLASS} sub,
  [data-ff-el="root"].${ROOT_CLASS} sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  [data-ff-el="root"].${ROOT_CLASS} sub {
    bottom: -0.25em;
  }

  [data-ff-el="root"].${ROOT_CLASS} sup {
    top: -0.5em;
  }

  [data-ff-el="root"].${ROOT_CLASS} {
    color: #000000;
    text-decoration: none;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }

  [data-ff-el="root"].${ROOT_CLASS} a:hover {
    color: #4396fd;
    text-decoration: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} img {
    border-style: none;
    vertical-align: middle;
  }

  [data-ff-el="root"].${ROOT_CLASS} svg:not(:root) {
    overflow: hidden;
  }

  [data-ff-el="root"].${ROOT_CLASS},
  [data-ff-el="root"].${ROOT_CLASS} area,
  [data-ff-el="root"].${ROOT_CLASS} button,
  [data-ff-el="root"].${ROOT_CLASS} [role="button"],
  [data-ff-el="root"].${ROOT_CLASS} input,
  [data-ff-el="root"].${ROOT_CLASS} label,
  [data-ff-el="root"].${ROOT_CLASS} select,
  [data-ff-el="root"].${ROOT_CLASS} summary,
  [data-ff-el="root"].${ROOT_CLASS} textarea {
    touch-action: manipulation;
  }

  [data-ff-el="root"].${ROOT_CLASS} label {
    display: inline-block;
    font-weight: bolder;
    margin-bottom: 0.7rem;
  }

  [data-ff-el="root"].${ROOT_CLASS} button:focus {
    outline: 1px dotted;
  }

  [data-ff-el="root"].${ROOT_CLASS} input,
  [data-ff-el="root"].${ROOT_CLASS} button,
  [data-ff-el="root"].${ROOT_CLASS} select,
  [data-ff-el="root"].${ROOT_CLASS} optgroup,
  [data-ff-el="root"].${ROOT_CLASS} textarea {
    margin: 0;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
  }

  [data-ff-el="root"].${ROOT_CLASS} button,
  [data-ff-el="root"].${ROOT_CLASS} input {
    overflow: visible;
  }

  [data-ff-el="root"].${ROOT_CLASS} button,
  [data-ff-el="root"].${ROOT_CLASS} select {
    text-transform: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} button,
  html[data-ff-el="root"].${ROOT_CLASS} [type="button"],
  [data-ff-el="root"].${ROOT_CLASS} [type="reset"],
  [data-ff-el="root"].${ROOT_CLASS} [type="submit"] {
    -webkit-appearance: button;
  }

  [data-ff-el="root"].${ROOT_CLASS} button::-moz-focus-inner,
  [data-ff-el="root"].${ROOT_CLASS} [type="button"]::-moz-focus-inner,
  [data-ff-el="root"].${ROOT_CLASS} [type="reset"]::-moz-focus-inner,
  [data-ff-el="root"].${ROOT_CLASS} [type="submit"]::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} input[type="radio"],
  [data-ff-el="root"].${ROOT_CLASS} input[type="checkbox"] {
    padding: 0;
    box-sizing: border-box;
  }

  [data-ff-el="root"].${ROOT_CLASS} input[type="date"],
  [data-ff-el="root"].${ROOT_CLASS} input[type="time"],
  [data-ff-el="root"].${ROOT_CLASS} input[type="datetime-local"],
  [data-ff-el="root"].${ROOT_CLASS} input[type="month"] {
    -webkit-appearance: listbox;
  }

  [data-ff-el="root"].${ROOT_CLASS} textarea {
    resize: vertical;
    overflow: auto;
  }

  [data-ff-el="root"].${ROOT_CLASS} [type="number"]::-webkit-inner-spin-button,
  [data-ff-el="root"].${ROOT_CLASS} [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [data-ff-el="root"].${ROOT_CLASS} [type="search"] {
    outline-offset: -2px;
    -webkit-appearance: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} [type="search"]::-webkit-search-cancel-button,
  [data-ff-el="root"].${ROOT_CLASS} [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} ::-webkit-file-upload-button {
    font: inherit;
    -webkit-appearance: button;
  }

  [data-ff-el="root"].${ROOT_CLASS} [hidden] {
    display: none !important;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-control {
    width: 100%;
    display: block;
    outline: none;
    position: relative;
    -webkit-appearance: none;
    appearance: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-control:focus {
    outline: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-control::placeholder {
    color: transparent !important;
    opacity: 0 !important;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-control:disabled {
    opacity: 1;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-label {
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-control:not(:placeholder-shown)+.fd-form-label {
    opacity: 0;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-description {
    margin: 5px 0 0 0;
    font-size: 0.8em;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-feedback {
    margin: 5px 0 0 0;
    font-size: 0.8em;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-suggestion {
    margin: 6px 0 0 0;
    font-size: 0.9em;
    text-align: center;
    word-break: break-word;
    line-height: 1.4;
    overflow-wrap: break-word;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-suggestion__link {
    font: inherit;
    color: inherit;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    max-width: 100%;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    text-align: inherit;
    transition: text-decoration-color 0.2s ease;
    word-break: break-word;
    line-height: inherit;
    white-space: normal;
    overflow-wrap: break-word;
    letter-spacing: inherit;
    vertical-align: baseline;
    text-decoration: underline;
    text-decoration-color: currentColor;
    text-underline-offset: calc((1lh - 1cap) / 2 - 0.08em - 0.8px);
    -webkit-text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
    text-decoration-thickness: 0.08em;
  }

  @media (hover: hover) {
    [data-ff-el="root"].${ROOT_CLASS} .fd-form-suggestion__link:hover {
      text-decoration-color: currentColor;
    }
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-suggestion__link:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-suggestion__link:focus:not(.fd-focus-visible) {
    outline: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-group {
    margin: 0 0 15px;
    position: relative;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-group.fd-has-success .fd-form-feedback,
  [data-ff-el="root"].${ROOT_CLASS} .fd-form-group.fd-has-success .fd-form-check {
    color: #02dba8 !important;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-group.fd-has-success .fd-form-control {
    color: #02dba8 !important;
    border-color: #02dba8 !important;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-group.fd-has-success .fd-form-feedback {
    display: block;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-group.fd-has-error .fd-form-feedback,
  [data-ff-el="root"].${ROOT_CLASS} .fd-form-group.fd-has-error .fd-form-check {
    color: #C84E41 !important;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-group.fd-has-error .fd-form-control {
    color: #C84E41 !important;
    border-color: #C84E41 !important;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-group.fd-has-error .fd-form-feedback {
    display: block;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-btn {
    cursor: pointer;
    display: inline-flex;
    outline: none;
    max-width: 100%;
    -webkit-appearance: none;
    appearance: none;
    font-style: normal;
    text-align: center;
    align-items: center;
    text-shadow: none;
    white-space: normal;
    justify-content: center;
    text-decoration: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-btn:hover {
    outline: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-btn:focus {
    outline: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-btn:disabled {
    opacity: 0.8;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-check {
    cursor: pointer;
    margin: 0;
    display: flex;
    position: relative;
    align-items: center;
    padding-left: 30px;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-check__input {
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    opacity: 0;
    z-index: -1;
    position: absolute;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-check__checkmark {
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    display: block;
    position: absolute;
    background-size: 18px;
    background-image: url("data:image/svg+xml,%3csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' %3e %3cpath d='M1 4C1 2.34315 2.34315 1 4 1H16C17.6569 1 19 2.34315 19 4V16C19 17.6569 17.6569 19 16 19H4C2.34315 19 1 17.6569 1 16V4Z' fill='white' fill-opacity='1' /%3e %3cpath fill='black' fill-rule='evenodd' clip-rule='evenodd' d='M0.25 4C0.25 1.92893 1.92893 0.25 4 0.25H16C18.0711 0.25 19.75 1.92893 19.75 4V16C19.75 18.0711 18.0711 19.75 16 19.75H4C1.92893 19.75 0.25 18.0711 0.25 16V4ZM4 1.75C2.75736 1.75 1.75 2.75736 1.75 4V16C1.75 17.2426 2.75736 18.25 4 18.25H16C17.2426 18.25 18.25 17.2426 18.25 16V4C18.25 2.75736 17.2426 1.75 16 1.75H4Z' /%3e %3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center center;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-check__label {
    flex: 1 1;
    margin: 0;
    font-size: 14px;
    text-align: left;
    word-break: break-word;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.01em;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-check__input:checked+.fd-form-check__checkmark::after {
    opacity: 1;
    z-index: 1;
    visibility: visible;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-check__checkmark::after {
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    content: "";
    display: block;
    opacity: 0;
    z-index: 1;
    position: absolute;
    transition: opacity 0.4s, z-index 0.4s;
    visibility: inherit;
    background-size: 12px;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='black' width='12' height='10' viewBox='0 0 11.51 8.2' %3e %3ctitle%3echeck%3c/title%3e %3cpath d='M4.05%2c8.2A.74.74%2c0%2c0%2c1%2c3.52%2c8L.22%2c4.68A.75.75%2c0%2c0%2c1%2c1.28%2c3.62l3.3%2c3.3A.75.75%2c0%2c0%2c1%2c4.58%2c8%2c.74.74%2c0%2c0%2c1%2c4.05%2c8.2Z' /%3e %3cpath d='M4.06%2c8.2A.74.74%2c0%2c0%2c1%2c3.53%2c8a.75.75%2c0%2c0%2c1%2c0-1.06l6.7-6.7a.75.75%2c0%2c0%2c1%2c1.06%2c1.06L4.59%2c8A.74.74%2c0%2c0%2c1%2c4.06%2c8.2Z' /%3e %3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center center;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-check__input:focus {
    outline: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-content {
    position: relative;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-has-success .fd-form-content {
    display: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-has-captcha .fd-form-content>*:not(.fd-form-captcha) {
    opacity: 0;
    visibility: hidden;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-captcha {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: flex-start;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-success {
    width: 100%;
    display: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-has-success .fd-form-success {
    display: block;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-success>*:last-child {
    margin-bottom: 0;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-error {
    display: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-has-error .fd-form-error {
    display: block;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-form-error>*:last-child {
    margin-bottom: 0;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-focus-visible,
  [data-ff-el="root"].${ROOT_CLASS} .fd-form-check__input.fd-focus-visible+.fd-form-check__checkmark {
    outline: none;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 calc(2px + 4px) #000000 !important;
    transition: box-shadow 0.2s !important;
  }

  [data-ff-el="root"].${ROOT_CLASS} .fd-focus-visible,
  [data-ff-el="root"].${ROOT_CLASS} .fd-form-check__input.fd-focus-visible+.fd-form-check__checkmark {
    outline: none;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 calc(2px + 2px) #717171 !important;
    transition: box-shadow 0.2s !important;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__container {
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    max-width: 620px;
    background: #ffffff;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__wrapper {
    display: flex;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__form {
    color: #000000;
    width: 100%;
    margin: 0;
    padding: 70px;
    font-size: 16px;
    text-align: center;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    line-height: 1.6;
    letter-spacing: 0.1px;
    text-transform: none;
  }

  @media (max-width: 767px) {
    [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__form {
      padding: 25px;
      word-wrap: anywhere;
      word-break: break-word;
      white-space: normal;
      overflow-wrap: break-word;
    }
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__title {
    color: #000000;
    width: 100%;
    margin: 0 0 25px 0;
    display: block;
    font-size: 37px;
    text-align: center;
    font-family: Helvetica, sans-serif;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0px;
    text-transform: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__title * {
    line-height: inherit;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__subtitle {
    width: 100%;
    margin: 0 0 30px 0;
    display: block;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__subtitle * {
    line-height: inherit;
  }

  [data-ff-el="root"].${ROOT_CLASS}[data-ff-stage="success"] .${ROOT_CLASS}__content {
    display: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__fields {
    margin: 0 0 15px;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__fields>*:last-child {
    margin-bottom: 0;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__field {
    font-size: 13px;
    text-align: left;
    font-family: Helvetica, sans-serif;
    font-weight: 400;
    letter-spacing: 0.1px;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__control {
    color: #000000;
    border: 1px solid #dddddd;
    height: 46px;
    padding: 12px 20px;
    font-size: 13px;
    background: transparent;
    text-align: left;
    font-family: Helvetica, sans-serif;
    font-weight: 400;
    line-height: 20px;
    border-radius: 0px;
    letter-spacing: 0.1px;
    text-transform: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__label {
    color: #000000;
    border: 1px solid transparent;
    padding: 12px 20px;
    font-size: 13px;
    text-align: left;
    font-family: Helvetica, sans-serif;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.1px;
    text-transform: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__preference {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 767px) {
    [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__preference {
      flex-direction: column;
    }
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__preference-title {
    color: #333333;
    width: 100%;
    margin: 0 0 30px 0;
    display: block;
    font-size: 18px;
    text-align: center;
    font-family: Helvetica, sans-serif;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: 0px;
    text-transform: none;
  }

  @media (max-width: 767px) {
    [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__preference-title {
      margin: 0 0 30px;
    }
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__preference-title * {
    line-height: inherit;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__preference-control {
    width: 100%;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__preference-list {
    width: 100%;
    margin: -8px 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  @media (max-width: 767px) {
    [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__preference-list {
      flex-direction: column;
    }
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__preference-item {
    flex: 1 1;
    padding: 8px 0;
  }

  @media (max-width: 767px) {
    [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__preference-item {
      flex: 1 1;
      max-width: 100%;
    }
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__form-check .fd-form-check__input {
    top: 2.200000000000001px;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__form-check .fd-form-check__checkmark {
    top: 2.200000000000001px;
    border-radius: 4px;
    background-image: url("data:image/svg+xml,%3csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' %3e %3cpath d='M1 4C1 2.34315 2.34315 1 4 1H16C17.6569 1 19 2.34315 19 4V16C19 17.6569 17.6569 19 16 19H4C2.34315 19 1 17.6569 1 16V4Z' fill='white' fill-opacity='1' /%3e %3cpath fill='black' fill-rule='evenodd' clip-rule='evenodd' d='M0.25 4C0.25 1.92893 1.92893 0.25 4 0.25H16C18.0711 0.25 19.75 1.92893 19.75 4V16C19.75 18.0711 18.0711 19.75 16 19.75H4C1.92893 19.75 0.25 18.0711 0.25 16V4ZM4 1.75C2.75736 1.75 1.75 2.75736 1.75 4V16C1.75 17.2426 2.75736 18.25 4 18.25H16C17.2426 18.25 18.25 17.2426 18.25 16V4C18.25 2.75736 17.2426 1.75 16 1.75H4Z' /%3e %3c/svg%3e");
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__form-check .fd-form-check__label {
    color: #333333;
    font-size: 14px;
    min-height: 22.400000000000002px;
    font-family: Helvetica, sans-serif;
    font-weight: 400;
    line-height: 1.6;
    letter-spacing: 0px;
    text-transform: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__form-check .fd-form-check__checkmark::after {
    background-size: 12px;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='black' width='12' height='10' viewBox='0 0 11.51 8.2' %3e %3ctitle%3echeck%3c/title%3e %3cpath d='M4.05%2c8.2A.74.74%2c0%2c0%2c1%2c3.52%2c8L.22%2c4.68A.75.75%2c0%2c0%2c1%2c1.28%2c3.62l3.3%2c3.3A.75.75%2c0%2c0%2c1%2c4.58%2c8%2c.74.74%2c0%2c0%2c1%2c4.05%2c8.2Z' /%3e %3cpath d='M4.06%2c8.2A.74.74%2c0%2c0%2c1%2c3.53%2c8a.75.75%2c0%2c0%2c1%2c0-1.06l6.7-6.7a.75.75%2c0%2c0%2c1%2c1.06%2c1.06L4.59%2c8A.74.74%2c0%2c0%2c1%2c4.06%2c8.2Z' /%3e %3c/svg%3e");
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__footer {
    text-align: center;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__button {
    color: #ffffff;
    width: 100%;
    border: 1px solid #000000;
    display: inline-block;
    padding: 12px 20px;
    font-size: 13px;
    background: #000000;
    text-align: center;
    font-family: Helvetica, sans-serif;
    font-weight: 400;
    line-height: 20px;
    border-radius: 0px;
    letter-spacing: 0.1px;
    text-transform: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__button [data-draw-element="editable"] {
    min-width: 10px;
  }

  @media (max-width: 767px) {
    [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__button {
      width: 100%;
    }
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__button [data-draw-element="editable"]:not([contenteditable]):empty::after {
    width: 10px;
    content: "\00a0";
    display: block;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__success {
    display: none;
  }

  [data-ff-el="root"].${ROOT_CLASS}[data-ff-stage="success"] .${ROOT_CLASS}__success {
    display: block;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__success-message {
    color: #333333;
    width: 100%;
    display: block;
    font-size: 16px;
    word-wrap: anywhere;
    min-height: 1.6em;
    text-align: center;
    word-break: break-word;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    line-height: 1.6;
    white-space: normal;
    overflow-wrap: break-word;
    letter-spacing: 0.1px;
    pointer-events: auto;
    text-transform: none;
  }

  @media (max-width: 767px) {
    [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__success-message {
      font-size: 16px;
    }
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__error {
    margin: 15px 0 0 0;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__accepts-gdpr-block {
    display: flex;
    padding: 0px 0;
    margin-top: 16px;
    align-items: center;
    margin-bottom: 24px;
    flex-direction: column;
    justify-content: flex-start;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__accepts-gdpr-block.fd-has-error .fd-form-feedback {
    color: #C84E41;
    font-size: 14px;
    min-height: 19.599999999999998px;
    font-family: Helvetica, sans-serif;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0px;
    text-transform: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__accepts-gdpr-block.fd-has-error .fd-form-check__checkmark {
    background-image: url("data:image/svg+xml,%3csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' %3e %3cpath d='M1 1H19V19H1V1Z' fill='white' fill-opacity='0' /%3e %3cpath fill='%23C84E41' fill-rule='evenodd' clip-rule='evenodd' d='M0.25 0.25H19.75V19.75H0.25V0.25ZM1.75 1.75V18.25H18.25V1.75H1.75Z' /%3e %3c/svg%3e");
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__accepts-gdpr-checkbox {
    padding-left: 26px;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__accepts-gdpr-checkbox .fd-form-check__checkmark {
    top: calc((14px * 1.4 - 18px) / 2);
    border-radius: 0px;
    background-image: url("data:image/svg+xml,%3csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' %3e %3cpath d='M1 1H19V19H1V1Z' fill='white' fill-opacity='0' /%3e %3cpath fill='black' fill-rule='evenodd' clip-rule='evenodd' d='M0.25 0.25H19.75V19.75H0.25V0.25ZM1.75 1.75V18.25H18.25V1.75H1.75Z' /%3e %3c/svg%3e");
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__accepts-gdpr-checkbox .fd-form-check__label {
    color: #333333;
    font-size: 14px;
    min-height: 19.599999999999998px;
    font-family: Helvetica, sans-serif;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0px;
    text-transform: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__accepts-gdpr-checkbox .fd-form-check__checkmark::after {
    background-size: 8px;
    background-image: url("data:image/svg+xml,%3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' fill='black' x='0px' y='0px' viewBox='0 0 8 8' style='enable-background:new 0 0 8 8%3b' xml:space='preserve' %3e %3cg%3e %3cpath class='st0' d='M0.8%2c7.7c-0.2%2c0-0.3-0.1-0.4-0.2c-0.2-0.2-0.2-0.6%2c0-0.8l6.3-6.3c0.2-0.2%2c0.6-0.2%2c0.8%2c0s0.2%2c0.6%2c0%2c0.8L1.2%2c7.5C1.1%2c7.6%2c1%2c7.7%2c0.8%2c7.7z' /%3e %3c/g%3e %3cg%3e %3cpath class='st0' d='M7.1%2c7.7c-0.2%2c0-0.3-0.1-0.4-0.2L0.4%2c1.2C0.1%2c1%2c0.1%2c0.6%2c0.4%2c0.4s0.6-0.2%2c0.8%2c0l6.3%2c6.3c0.2%2c0.2%2c0.2%2c0.6%2c0%2c0.8C7.4%2c7.6%2c7.3%2c7.7%2c7.1%2c7.7z' /%3e %3c/g%3e %3c/svg%3e");
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__privacy-policy-toggle-button {
    color: inherit;
    border: none;
    cursor: pointer;
    margin: 0;
    outline: none;
    padding: 0;
    background: transparent;
    font-weight: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    text-decoration: underline;
    text-underline-position: under;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__privacy-policy-toggle-button:focus {
    outline: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__privacy-policy-not-mandatory {
    color: #333333;
    opacity: 0.52;
    font-size: 14px;
    margin-top: 16px;
    min-height: 19.599999999999998px;
    text-align: center;
    font-family: Helvetica, sans-serif;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0px;
    text-transform: none;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__privacy-policy {
    color: #241A17;
    font-size: 14px;
    font-family: FlodeskSans, sans-serif;
    font-weight: 400;
    line-height: 20px;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__privacy-policy p {
    margin-bottom: 0.25rem;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__privacy-policy-link {
    color: inherit;
    cursor: pointer;
    text-underline-position: under;
  }

  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__privacy-policy-link:hover {
    color: inherit;
    text-decoration: underline;
  }
`;

// Brand overrides layered ON TOP of the verbatim Flodesk CSS above (never
// replacing it) — restyles colors/spacing/typography to match the site's
// Tailwind theme without touching any Flodesk class name, structure, or
// functional attribute.
const BRAND_OVERRIDES_CSS = `
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__container {
    max-width: 100%;
    background: transparent;
  }
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__form {
    padding: 0;
    text-align: left;
    font-family: var(--font-body), Helvetica, sans-serif;
  }
  @media (max-width: 767px) {
    [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__form {
      padding: 0;
    }
  }
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__title,
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__subtitle {
    display: none;
  }
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__fields {
    margin: 0 0 16px;
  }
  [data-ff-el="root"].${ROOT_CLASS} .fd-form-group {
    margin: 0 0 14px;
  }
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__field {
    font-family: var(--font-body), Helvetica, sans-serif;
  }
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__control {
    height: 52px;
    padding: 14px 16px;
    color: #101828;
    background: #ffffff;
    border: 1px solid #E3E7F0;
    border-radius: 0.75rem;
    font-size: 15px;
    font-family: var(--font-body), Helvetica, sans-serif;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__control:focus {
    border-color: #2954E0;
    box-shadow: 0 0 0 3px rgba(41, 84, 224, 0.15);
  }
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__label {
    padding: 14px 16px;
    color: #8891A0;
    font-size: 15px;
    font-family: var(--font-body), Helvetica, sans-serif;
  }
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__footer {
    margin-top: 4px;
  }
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__button {
    height: 56px;
    border: none;
    border-radius: 0.75rem;
    background: #2954E0;
    font-size: 16px;
    font-weight: 600;
    font-family: var(--font-body), Helvetica, sans-serif;
    box-shadow: 0 8px 24px -8px rgba(41, 84, 224, 0.55);
    transition: background-color 0.15s ease, transform 0.15s ease;
  }
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__button:hover {
    background: #1F3FB0;
  }
  [data-ff-el="root"].${ROOT_CLASS} .${ROOT_CLASS}__success-message {
    color: #101828;
    font-family: var(--font-body), Helvetica, sans-serif;
  }
`;

// Verbatim Flodesk form markup (structure, field names, hidden honeypot
// field, submit action, and the config block are all untouched — only
// wrapped in a template literal so ROOT_CLASS/FORM_ID/FF_CONFIG can be
// interpolated instead of hardcoded).
const FORM_MARKUP = `
  <!--tpl {% block config %} tpl-->
  <div data-ff-el="config" data-ff-config="${FF_CONFIG}" style="display: none"></div>
  <!--tpl {% endblock %} tpl-->
  <div class="${ROOT_CLASS}__container">
    <div class="${ROOT_CLASS}__wrapper">
      <form class="${ROOT_CLASS}__form" action="https://form.flodesk.com/forms/6aa1cf85defc2da50c169150/submit" method="post" data-ff-el="form">
        <div class="${ROOT_CLASS}__title">
          <div style="min-height: 1em">
            <div></div>
          </div>
        </div>
        <div class="${ROOT_CLASS}__subtitle">
          <div style="min-height: 1.6em">
            <div></div>
          </div>
        </div>
        <div class="${ROOT_CLASS}__content fd-form-content" data-ff-el="content">
          <div class="${ROOT_CLASS}__fields" data-ff-el="fields">
            <!--tpl {% block fields %} tpl-->

            <div class="${ROOT_CLASS}__field fd-form-group">
              <input id="${ROOT_CLASS}-firstName" class="${ROOT_CLASS}__control fd-form-control" type="text" maxlength="255" name="firstName" placeholder="First name" data-ff-tab="firstName::email" required />
              <label for="${ROOT_CLASS}-firstName" class="${ROOT_CLASS}__label fd-form-label">
                <div>
                  <div>First name</div>
                </div>
              </label>
            </div>


            <div class="${ROOT_CLASS}__field fd-form-group">
              <input id="${ROOT_CLASS}-email" class="${ROOT_CLASS}__control fd-form-control" type="text" maxlength="255" name="email" placeholder="Email address" data-ff-tab="email:firstName:fields.whatsappNumber" required />
              <label for="${ROOT_CLASS}-email" class="${ROOT_CLASS}__label fd-form-label">
                <div>
                  <div>Email address</div>
                </div>
              </label>
            </div>


            <div class="${ROOT_CLASS}__field fd-form-group">
              <input id="${ROOT_CLASS}-y1RqJayxjx" class="${ROOT_CLASS}__control fd-form-control" type="text" maxlength="255" name="fields.whatsappNumber" placeholder="WhatsApp Number" data-ff-tab="fields.whatsappNumber:email:fields.businessName" required />
              <label for="${ROOT_CLASS}-y1RqJayxjx" class="${ROOT_CLASS}__label fd-form-label">
                <div>
                  <div>WhatsApp Number</div>
                </div>
              </label>
            </div>


            <div class="${ROOT_CLASS}__field fd-form-group">
              <input id="${ROOT_CLASS}-9wmgJJEQs2" class="${ROOT_CLASS}__control fd-form-control" type="text" maxlength="255" name="fields.businessName" placeholder="Business Name" data-ff-tab="fields.businessName:fields.whatsappNumber:fields.websiteLink" required />
              <label for="${ROOT_CLASS}-9wmgJJEQs2" class="${ROOT_CLASS}__label fd-form-label">
                <div>
                  <div>Business Name</div>
                </div>
              </label>
            </div>


            <div class="${ROOT_CLASS}__field fd-form-group">
              <input id="${ROOT_CLASS}-d62t7etZo0" class="${ROOT_CLASS}__control fd-form-control" type="text" maxlength="255" name="fields.websiteLink" placeholder="Website/Facebook Link" data-ff-tab="fields.websiteLink:fields.businessName:submit" required />
              <label for="${ROOT_CLASS}-d62t7etZo0" class="${ROOT_CLASS}__label fd-form-label">
                <div>
                  <div>Website/Facebook Link</div>
                </div>
              </label>
            </div>

            <input type="text" maxlength="255" name="confirm_email_address" style="display: none" />
            <!--tpl {% endblock %} tpl-->
          </div>


          <div class="${ROOT_CLASS}__footer" data-ff-el="footer">
            <button type="submit" class="${ROOT_CLASS}__button fd-btn" data-ff-el="submit" data-ff-tab="submit">
              <div><span data-draw-element="editable">Book A Call With Me</span></div>
            </button>
          </div>

          <!--tpl {% if var.Config.Gdpr.PrivacyPolicy.Enabled and var.Config.Gdpr.AcceptsMarketing == false and var.Config.Gdpr.PrivacyPolicy.Mandatory == false %} tpl-->

          <!--tpl {% endif %} tpl-->

        </div>
        <div class="${ROOT_CLASS}__success fd-form-success" data-ff-el="success">
          <div class="${ROOT_CLASS}__success-message">
            <div>
              <div>
                <div data-paragraph="true">You&rsquo;ve successfully signed up! Check your email for details.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="${ROOT_CLASS}__error fd-form-error" data-ff-el="error"></div>
      </form>
    </div>
  </div>
`;

export default function FlodeskForm() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let redirected = false;
    const observer = new MutationObserver(() => {
      if (redirected) return;
      if (root.getAttribute("data-ff-stage") === "success") {
        redirected = true;
        // Wait for Flodesk's own success UI / automation to finish before
        // navigating away.
        window.setTimeout(() => {
          router.push("/thank-you");
        }, REDIRECT_DELAY_MS);
      }
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-ff-stage"],
    });

    return () => observer.disconnect();
  }, [router]);

  return (
    <>
      <link rel="preload" href="https://assets.flodesk.com/flodesk-sans.css" as="style" />
      <link rel="stylesheet" href="https://assets.flodesk.com/flodesk-sans.css" />
      <style dangerouslySetInnerHTML={{ __html: FLODESK_CSS + BRAND_OVERRIDES_CSS }} />
      <div
        ref={rootRef}
        className={ROOT_CLASS}
        data-ff-el="root"
        data-ff-version="3"
        data-ff-type="inline"
        data-ff-name="inlineNoImage"
        data-ff-stage="default"
        dangerouslySetInnerHTML={{ __html: FORM_MARKUP }}
      />
      <Script
        id="flodesk-universal-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w, d, t, h, s, n) {
              w.FlodeskObject = n;
              var fn = function() {
                (w[n].q = w[n].q || []).push(arguments);
              };
              w[n] = w[n] || fn;
              var f = d.getElementsByTagName(t)[0];
              var v = '?v=' + Math.floor(new Date().getTime() / (120 * 1000)) * 60;
              var sm = d.createElement(t);
              sm.async = true;
              sm.type = 'module';
              sm.src = h + s + '.mjs' + v;
              f.parentNode.insertBefore(sm, f);
              var sn = d.createElement(t);
              sn.async = true;
              sn.noModule = true;
              sn.src = h + s + '.js' + v;
              f.parentNode.insertBefore(sn, f);
            })(window, document, 'script', 'https://assets.flodesk.com', '/universal', 'fd');
          `,
        }}
      />
      <Script
        id="flodesk-form-handle"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.fd('form:handle', { formId: '${FORM_ID}', rootEl: '.${ROOT_CLASS}' });`,
        }}
      />
    </>
  );
}
