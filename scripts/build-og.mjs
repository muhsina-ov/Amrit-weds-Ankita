import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';

const cinzelBase64 = fs.readFileSync('public/fonts/Cinzel-Bold.ttf').toString('base64');
const greatVibesBase64 = fs.readFileSync('public/fonts/GreatVibes-Regular.ttf').toString('base64');
const playfairBase64 = fs.readFileSync('public/fonts/PlayfairDisplay-Italic.ttf').toString('base64');

const venueBase64 = fs.readFileSync('public/assets/venue_sahyadri.jpg').toString('base64');
const coupleBase64 = fs.readFileSync('public/assets/couple.png').toString('base64');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    @font-face {
      font-family: 'CinzelBold';
      src: url('data:font/truetype;charset=utf-8;base64,${cinzelBase64}') format('truetype');
      font-weight: 700;
    }
    @font-face {
      font-family: 'GreatVibes';
      src: url('data:font/truetype;charset=utf-8;base64,${greatVibesBase64}') format('truetype');
      font-weight: 400;
    }
    @font-face {
      font-family: 'PlayfairItalic';
      src: url('data:font/truetype;charset=utf-8;base64,${playfairBase64}') format('truetype');
      font-style: italic;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: #060913;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      position: relative;
      color: #fff;
    }

    /* Venue Background Layer */
    .bg-venue {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.22;
      filter: contrast(115%) brightness(0.8);
    }

    .bg-gradient {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 78% 48%, rgba(223, 177, 65, 0.22) 0%, transparent 65%),
                  radial-gradient(circle at 25% 35%, rgba(14, 23, 48, 0.96) 0%, #060913 88%),
                  linear-gradient(90deg, #060913 0%, rgba(6, 9, 19, 0.92) 52%, rgba(6, 9, 19, 0.35) 100%);
    }

    /* Ambient Warm Glow Spheres */
    .glow-sphere {
      position: absolute;
      border-radius: 50%;
      filter: blur(50px);
      pointer-events: none;
    }
    .glow-1 {
      width: 480px;
      height: 480px;
      background: rgba(223, 177, 65, 0.18);
      right: 70px;
      top: 75px;
    }
    .glow-2 {
      width: 320px;
      height: 320px;
      background: rgba(196, 30, 58, 0.15);
      left: 80px;
      bottom: 40px;
    }

    /* Ornate Gold Borders */
    .frame-outer {
      position: absolute;
      inset: 16px;
      border: 1.5px solid rgba(223, 177, 65, 0.55);
      pointer-events: none;
      z-index: 20;
    }

    .frame-inner {
      position: absolute;
      inset: 24px;
      border: 1px dashed rgba(223, 177, 65, 0.32);
      pointer-events: none;
      z-index: 20;
    }

    /* Corner Mandalas */
    .corner-ornament {
      position: absolute;
      width: 46px;
      height: 46px;
      z-index: 22;
    }
    .top-left { top: 10px; left: 10px; }
    .top-right { top: 10px; right: 10px; transform: scaleX(-1); }
    .bottom-left { bottom: 10px; left: 10px; transform: scaleY(-1); }
    .bottom-right { bottom: 10px; right: 10px; transform: scale(-1); }

    /* Top Shloka Pill */
    .top-pill-wrap {
      position: absolute;
      top: 36px;
      left: 65px;
      z-index: 25;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .shloka-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(13, 21, 39, 0.9);
      border: 1px solid rgba(223, 177, 65, 0.55);
      padding: 6px 18px;
      border-radius: 9999px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    }
    .shloka-text {
      font-family: 'CinzelBold', serif;
      font-size: 11px;
      letter-spacing: 0.35em;
      color: #ffd768;
    }

    /* Main Container */
    .card-container {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 100%;
      display: flex;
      padding: 45px 60px 40px 65px;
    }

    .left-col {
      width: 58%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 25px;
      padding-right: 15px;
    }

    .monogram-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }
    .monogram-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1.5px solid #dfb141;
      background: linear-gradient(135deg, #1b2848, #0b1122);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'CinzelBold', serif;
      font-size: 12px;
      color: #ffd768;
      box-shadow: 0 0 12px rgba(223, 177, 65, 0.4);
    }
    .monogram-tag {
      font-family: 'CinzelBold', serif;
      font-size: 11px;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: #e6d3a3;
    }

    .couple-title {
      font-family: 'GreatVibes', cursive;
      font-size: 88px;
      line-height: 0.95;
      background: linear-gradient(135deg, #ffffff 0%, #fff1ba 25%, #dfb141 70%, #b8861b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 4px 18px rgba(223, 177, 65, 0.4));
      margin-top: 4px;
      margin-bottom: 6px;
      white-space: nowrap;
    }

    .couple-title .amp {
      font-family: 'PlayfairItalic', serif;
      font-size: 58px;
      color: #ffd768;
      -webkit-text-fill-color: #ffd768;
      margin: 0 12px;
      vertical-align: -6px;
    }

    .kids-phrase {
      font-family: 'PlayfairItalic', serif;
      font-size: 21px;
      color: #f7ecd2;
      margin-bottom: 16px;
      letter-spacing: 0.03em;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .kids-phrase::before, .kids-phrase::after {
      content: "";
      display: inline-block;
      width: 26px;
      height: 1px;
      background: rgba(223, 177, 65, 0.65);
    }

    /* Divider */
    .gold-divider {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      width: 82%;
    }
    .gold-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, rgba(223, 177, 65, 0.85), transparent);
    }
    .diamond-icon {
      color: #dfb141;
      font-size: 11px;
    }

    /* Event details card */
    .details-box {
      background: rgba(13, 21, 39, 0.82);
      border: 1px solid rgba(223, 177, 65, 0.4);
      border-radius: 12px;
      padding: 12px 18px;
      backdrop-filter: blur(12px);
      width: fit-content;
      max-width: 95%;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
    }
    .detail-row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13.5px;
      color: #e5dac2;
      margin-bottom: 6px;
      letter-spacing: 0.02em;
    }
    .detail-row:last-child {
      margin-bottom: 0;
    }
    .detail-row strong {
      color: #ffd768;
      font-weight: 600;
      letter-spacing: 0.04em;
    }
    .detail-icon {
      font-size: 15px;
    }

    .bottom-meta {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 18px;
    }
    .hashtag-pill {
      background: linear-gradient(135deg, rgba(223, 177, 65, 0.22), rgba(223, 177, 65, 0.06));
      border: 1.5px solid #dfb141;
      border-radius: 9999px;
      padding: 6px 18px;
      font-family: 'CinzelBold', serif;
      font-size: 11.5px;
      letter-spacing: 0.22em;
      color: #ffd768;
      box-shadow: 0 0 16px rgba(223, 177, 65, 0.3);
    }
    .invitation-badge {
      font-family: 'CinzelBold', serif;
      font-size: 10.5px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #bfa87a;
    }

    /* Right Column - Authentic Couple Illustration */
    .right-col {
      width: 42%;
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .arch-backdrop {
      position: absolute;
      bottom: 22px;
      width: 375px;
      height: 485px;
      border-radius: 190px 190px 16px 16px;
      background: radial-gradient(circle at 50% 30%, rgba(223, 177, 65, 0.28) 0%, rgba(13, 21, 39, 0.85) 60%, rgba(6, 9, 19, 0.98) 100%);
      border: 2px solid rgba(223, 177, 65, 0.65);
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.85), inset 0 0 45px rgba(223, 177, 65, 0.25);
      z-index: 11;
      overflow: hidden;
    }

    .arch-backdrop::after {
      content: "";
      position: absolute;
      inset: 8px;
      border-radius: 182px 182px 10px 10px;
      border: 1px dashed rgba(223, 177, 65, 0.38);
    }

    .couple-img {
      position: relative;
      z-index: 15;
      height: 495px;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 25px rgba(223, 177, 65, 0.35));
      transform: translateY(-8px);
    }

    .couple-base-shadow {
      position: absolute;
      bottom: 14px;
      width: 330px;
      height: 25px;
      background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.9) 0%, transparent 75%);
      z-index: 12;
    }
  </style>
</head>
<body>
  <!-- Authentic Venue Sahyadri Background Layer -->
  <img src="data:image/jpeg;base64,${venueBase64}" class="bg-venue" alt="Sahyadri Mangal Karyalay">
  <div class="bg-gradient"></div>
  <div class="glow-sphere glow-1"></div>
  <div class="glow-sphere glow-2"></div>

  <!-- Royal Framing -->
  <div class="frame-outer"></div>
  <div class="frame-inner"></div>

  <!-- SVG Corner Mandalas -->
  <svg class="corner-ornament top-left" viewBox="0 0 60 60" fill="none">
    <path d="M4 4H30C45 4 56 15 56 30V56" stroke="#dfb141" stroke-width="1.5" stroke-opacity="0.85" />
    <path d="M12 12H28C38 12 48 22 48 32V48" stroke="#ffd768" stroke-width="0.8" stroke-dasharray="2 3" stroke-opacity="0.75" />
    <circle cx="16" cy="16" r="4" fill="#dfb141" fill-opacity="0.8" />
    <circle cx="8" cy="8" r="2" fill="#ffd768" />
  </svg>
  <svg class="corner-ornament top-right" viewBox="0 0 60 60" fill="none">
    <path d="M4 4H30C45 4 56 15 56 30V56" stroke="#dfb141" stroke-width="1.5" stroke-opacity="0.85" />
    <path d="M12 12H28C38 12 48 22 48 32V48" stroke="#ffd768" stroke-width="0.8" stroke-dasharray="2 3" stroke-opacity="0.75" />
    <circle cx="16" cy="16" r="4" fill="#dfb141" fill-opacity="0.8" />
    <circle cx="8" cy="8" r="2" fill="#ffd768" />
  </svg>
  <svg class="corner-ornament bottom-left" viewBox="0 0 60 60" fill="none">
    <path d="M4 4H30C45 4 56 15 56 30V56" stroke="#dfb141" stroke-width="1.5" stroke-opacity="0.85" />
    <path d="M12 12H28C38 12 48 22 48 32V48" stroke="#ffd768" stroke-width="0.8" stroke-dasharray="2 3" stroke-opacity="0.75" />
    <circle cx="16" cy="16" r="4" fill="#dfb141" fill-opacity="0.8" />
    <circle cx="8" cy="8" r="2" fill="#ffd768" />
  </svg>
  <svg class="corner-ornament bottom-right" viewBox="0 0 60 60" fill="none">
    <path d="M4 4H30C45 4 56 15 56 30V56" stroke="#dfb141" stroke-width="1.5" stroke-opacity="0.85" />
    <path d="M12 12H28C38 12 48 22 48 32V48" stroke="#ffd768" stroke-width="0.8" stroke-dasharray="2 3" stroke-opacity="0.75" />
    <circle cx="16" cy="16" r="4" fill="#dfb141" fill-opacity="0.8" />
    <circle cx="8" cy="8" r="2" fill="#ffd768" />
  </svg>

  <!-- Top Shloka Pill -->
  <div class="top-pill-wrap">
    <div class="shloka-pill">
      <span style="color: #dfb141; font-size: 11px;">✦</span>
      <span class="shloka-text">॥ श्री गणेशाय नमः • शुभ विवाह ॥</span>
      <span style="color: #dfb141; font-size: 11px;">✦</span>
    </div>
  </div>

  <!-- Main Card Content -->
  <div class="card-container">
    <div class="left-col">
      <div class="monogram-badge">
        <div class="monogram-circle">A&amp;A</div>
        <div class="monogram-tag">Royal Wedding Celebration</div>
      </div>

      <div class="couple-title">
        Ankita <span class="amp">&amp;</span> Amrit
      </div>

      <div class="kids-phrase">
        “These kids are getting married”
      </div>

      <div class="gold-divider">
        <div class="gold-line"></div>
        <span class="diamond-icon">◆</span>
        <div class="gold-line" style="transform: scaleX(-1);"></div>
      </div>

      <div class="details-box">
        <div class="detail-row">
          <span class="detail-icon">📅</span>
          <span><strong>Wednesday, 9th December 2026</strong> • 7:00 PM Onwards</span>
        </div>
        <div class="detail-row">
          <span class="detail-icon">📍</span>
          <span><strong>Sahyadri Mangal Karyalay</strong> • Maharashtra</span>
        </div>
        <div class="detail-row">
          <span class="detail-icon">✨</span>
          <span>Mehendi • Sangeet • Haldi • Sacred Saat Phere</span>
        </div>
      </div>

      <div class="bottom-meta">
        <div class="hashtag-pill">#AnkitaWedsAmrit</div>
        <div class="invitation-badge">From Tea to Together • Swarg Sahyadri Farms</div>
      </div>
    </div>

    <!-- Right Side: The Authentic Couple Illustration -->
    <div class="right-col">
      <div class="arch-backdrop"></div>
      <img src="data:image/png;base64,${coupleBase64}" class="couple-img" alt="Ankita and Amrit">
      <div class="couple-base-shadow"></div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('generate-og-embedded.html', htmlContent);
console.log('generate-og-embedded.html created');
