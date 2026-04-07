---
title: Getting Started
order: 1
---

# Getting Started

KeyScribe is an encrypted notes app for Android. Every note is encrypted before being stored on your device.

## First Launch

When you open KeyScribe for the first time:

1. **Onboarding** - A brief introduction to how the app works
2. **Key generation** - An RSA-2048 key pair is automatically generated and stored in your device's Android Keystore (hardware-backed)
3. **Home screen** - You'll see an empty notes list, ready to go

No account creation, no email, no cloud setup. Everything stays on your device.

## Creating a Note

1. Tap the **+** button on the home screen
2. Write your title and content
3. Tap the **lock icon** to encrypt and save

Your note is now encrypted with AES-256-GCM. The AES key is wrapped with your RSA-2048 public key, so only your device can decrypt it.

## Viewing a Note

When you open a saved note, you'll see the **encrypted data first** - the raw AES-256-GCM ciphertext, the RSA-wrapped key, and the initialization vectors.

Tap the **eye icon** to decrypt and reveal the content. This is by design - it reinforces that your data is always encrypted at rest.

## Searching Notes

Tap the **search icon** on the home screen. KeyScribe searches through your decrypted note titles and content. Search results appear in real-time with a 300ms debounce.

## Deleting a Note

**Long-press** a note on the home screen to delete it, or tap the **trash icon** inside the editor. A confirmation dialog will appear - deletion is permanent.
