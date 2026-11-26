# Tsunami — Design Doc

A free, water-themed falling-block puzzle game for Android.

- **Store title:** Tsunami: Block Puzzle
- **Price:** Free. No ads, no in-app purchases, no data collection.
- **Platform:** Android (via Capacitor). Also playable in any browser.

## 1. Originality rules

The genre and core mechanics (falling pieces, clearing full rows) are fine to use. We do **not** copy any specific existing game's identity:

- No "Tetris" or "-tris" names, anywhere (code, store listing, marketing).
- Own visual style: rounded, glossy water-droplet cells. No beveled classic blocks or classic colour set.
- Original or CC0 audio only. No "Korobeiniki".
- Store copy describes it as a "falling block puzzle".

## 2. MVP scope (v1.0)

### Gameplay
- 10 × 20 playfield (plus hidden spawn rows above).
- 7 pieces, each made of 4 cells (I, O, T, S, Z, J, L shapes).
- **7-bag randomizer:** every set of 7 pieces contains each shape once.
- Move, rotate (both directions), soft drop, hard drop.
- **Wall kicks** so rotations next to walls and the stack work.
- **Lock delay** (~500 ms, resets on move/rotate, capped at 15 resets).
- **Ghost piece** showing where the piece will land.
- **Hold slot** (once per piece).
- **Next-3 preview.**
- Line clears: 1–4 rows.
- **Scoring:** 100 / 300 / 500 / 800 × level for 1–4 rows. Soft drop +1 per cell, hard drop +2 per cell.
- **Levels:** level up every 10 lines. Gravity speeds up each level.
- Game over when a new piece can't spawn.

### Screens
- **Title:** "Tsunami" wordmark over a rolling wave animation, "Tap to dive in", best score.
- **Game:** playfield, frosted-glass HUD (score, level, lines), hold and next pieces in "bubbles".
- **Pause:** blurred frosted overlay with Resume, Restart, Settings.
- **Game over:** final score, best score, "Dive again".
- **Settings:** sound, music, vibration, reduce effects, control style.

### Persistence
- Best score and settings in `localStorage`. Nothing leaves the device.

## 3. Water theme

### Palette
- Background: dark navy gradient (`#0a1a2f` → `#0f2d4a`) with faint light shafts from above.
- 7 piece colours: deep blue, teal, aqua, seafoam, sky, indigo, coral (one warm colour for contrast).
- **Colour-blind support:** each piece also has a subtle inner pattern (ripple, bubble, wave line), so colour is never the only cue.

### Blocks
- Rounded "water droplet" cells with a soft top-left highlight and slight transparency.
- Ghost piece: faint outline that shimmers like a surface reflection.

### Effects
| Event | Effect | Haptic |
|---|---|---|
| Move / rotate | Soft drip sound | — |
| Piece lock | Gentle ripple pulse through the locked cells, "plunk" | Light |
| Hard drop | Splash at landing point | Medium |
| Line clear (1–3) | Row ripples, bursts into droplets that fall away | Medium |
| 4-row clear | **Tsunami wave** sweeps across the board, screen shake | Heavy |
| Level up | Water gets darker and deeper (lagoon → deep sea → abyss) | Light |
| Game over | Stack freezes, then sinks with a blur | Heavy |

- Idle ambience: a few slow bubbles rising in the background.
- Particle cap: ~200 at once.
- **Reduce effects** setting: disables shake, wave sweep and most particles. Respects `prefers-reduced-motion` by default.

### Audio
- Original or CC0 sound effects (e.g. freesound.org CC0, or generated tones).
- Optional calm ambient / lo-fi loop.
- Separate sound and music toggles.

## 4. Controls

### Touch (primary)
- Tap: rotate clockwise.
- Swipe left / right: move (drag for continuous movement).
- Drag down: soft drop.
- Fast swipe down: hard drop.
- Swipe up: hold.
- Optional on-screen buttons mode in Settings.

### Keyboard (browser)
- ← / →: move. ↓: soft drop. Space: hard drop.
- ↑ / X: rotate clockwise. Z: rotate counter-clockwise.
- C / Shift: hold. Esc / P: pause.

### App behaviour
- Portrait only.
- Auto-pause when the app goes to the background or loses focus.
- Keep the screen awake during play.
- Android back button: pause, then exit from the pause menu.

## 5. Tech plan

- **Single `index.html`** with an HTML canvas and plain JavaScript. No framework, no build step.
- Game loop: `requestAnimationFrame` for drawing, with a fixed timestep for gravity and lock timing. Game logic kept separate from rendering and input.
- Canvas scaled for device pixel ratio so it's sharp on phones.
- **Capacitor** wraps it as an Android app.
  - App ID: `com.aiconnector99.tsunami` (final before first upload; it can never change).
  - Plugins: `@capacitor/haptics`, `@capacitor/app` (pause on background, back button), `@capacitor/status-bar`.
  - No extra Android permissions.
- **GitHub Actions:**
  - Every push: build a debug APK as an artifact for testing.
  - Tags (e.g. `v1.0.0`): build a **signed release AAB** for Play Store upload.
  - Release keystore and passwords stored as GitHub Actions secrets. **Back up the keystore offline.** Losing it means you can't update the app.

## 6. Play Store checklist

- [ ] Google Play developer account ($25 one-time).
- [ ] Release keystore created, backed up, added to GitHub secrets.
- [ ] Target the current API level Google Play requires (latest Capacitor handles this).
- [ ] **Closed test:** at least 12 testers opted in for 14 continuous days (required for new personal developer accounts before production).
- [ ] Store listing: title, short description (80 chars), full description.
- [ ] Graphics:
  - [ ] Icon 512 × 512: a droplet-shaped block riding a wave crest on deep blue.
  - [ ] Feature graphic 1024 × 500: a wave of blocks crashing into a pool.
  - [ ] Phone screenshots: show the depth progression (lagoon → deep sea → abyss).
- [ ] Privacy policy URL (simple page stating no data is collected; can be hosted on GitHub Pages).
- [ ] Data safety form: no data collected or shared.
- [ ] Content rating questionnaire (expected: Everyone).
- [ ] Ads declaration: no ads.
- [ ] Target audience and app category: Games → Puzzle.

## 7. Later (v1.1+)

- Modes: Sprint (40 lines fastest), Ultra (2-minute score attack), Zen (no game over).
- Extra themes (e.g. arctic ice, tropical reef).
- Online leaderboard (would require updating the privacy policy and Data safety form).
- Stats screen (games played, total lines, best combos).

## 8. Open questions

- Final app ID before the first Play Store upload.
- Music: include an ambient loop in v1.0, or sound effects only?
