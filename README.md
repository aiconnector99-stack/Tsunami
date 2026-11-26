# Tsunami

A water-themed falling block puzzle game for Android. Free, no ads, no data collection.

The whole game is one file, `index.html`. Open it in any browser to play.
See [DESIGN.md](DESIGN.md) for the full design.

## Controls

**Touch:** tap to rotate, drag sideways to move, drag down to soft drop, flick down to hard drop, flick up to hold.
On-screen buttons can be switched on in Settings.

**Keyboard:** ← → move, ↓ soft drop, Space hard drop, ↑ or X rotate, Z rotate back, C or Shift hold, Esc or P pause.

## Getting the Android app

GitHub builds the app for you. You don't need Android tools on your computer.

1. Open the repository's **Actions** tab and pick **Build Android app**.
2. Open the newest run with a green check.
3. Under **Artifacts**, download **tsunami-debug-apk** and unzip it.
4. Copy the `.apk` to your phone and open it. You may need to allow installing apps from unknown sources.

A build runs on every push.

## Releasing to the Play Store

### One-time setup: the signing key

1. In **Actions**, run **Create release keystore (run once)**.
2. Download the **tsunami-release-keystore** artifact. It is deleted from GitHub after 1 day.
3. Open `SECRETS-README.txt` and add the four secrets it lists under
   **Settings → Secrets and variables → Actions → New repository secret**.
4. **Back up** the keystore and `SECRETS-README.txt` somewhere safe and offline, then delete the downloaded copies.

Use **Play App Signing** when you create the app in the Play Console. Google then holds the real
signing key, and this keystore is only your *upload* key. If it is ever lost, Google can reset it.

### Each release

1. Bump `version` in `package.json` and the label in `index.html` (`v1.0.0`).
2. Create and push a tag, for example `git tag v1.0.0 && git push origin v1.0.0`.
   (Or run **Build Android app** by hand with "Also build a signed release AAB" ticked.)
3. Download the **tsunami-release-aab** artifact and upload the `.aab` in the Play Console.

Every build gets a higher `versionCode` automatically (the workflow run number), which the Play Store requires.

## Building locally (optional)

Needs Node 22+, JDK 21 and the Android SDK.

```sh
npm install
npm run android          # creates android/ with icons, splash and portrait lock
cd android && ./gradlew assembleDebug
```

`android/` and `www/` are generated and not committed. Icons and splash screens come from `assets/`.

## Privacy

See [PRIVACY.md](PRIVACY.md). The game stores your best score and settings on your device only.

The policy is published with GitHub Pages at
https://aiconnector99-stack.github.io/tsunami/privacy.html (use this link in the Play Console).
The **Publish privacy policy** workflow rebuilds it whenever `PRIVACY.md` changes on `main`.
Pages must be switched on once: **Settings → Pages → Source: GitHub Actions**.
