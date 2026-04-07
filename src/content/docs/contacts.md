---
title: Contacts & Keys
order: 5
---

# Contacts & Keys

Manage your cryptographic key pair and import other users' public keys to enable encrypted note sharing.

## Your Key Pair

Go to **Settings > Key Pair** to view your key information:

- **Algorithm** - RSA-2048
- **Created date** - When the key was generated
- **SHA-256 fingerprint** - A unique identifier for your public key (used to verify identity)
- **Public key (PEM)** - The full public key text that others need to send you encrypted notes

### Sharing Your Public Key

You have three options:

- **QR Code** - Tap "Show QR Code" and let the other person scan it
- **Copy** - Copy the PEM text to clipboard and paste it in a message
- **Share** - Use the Android share sheet to send it via any app

Your public key is safe to share. It can only be used to encrypt data for you - it cannot decrypt anything.

## Managing Contacts

Go to **Settings > Contacts** to manage imported public keys.

### Adding a Contact

1. Tap the **+** button
2. Enter the contact's **name**
3. Paste their **RSA public key** in PEM format (the text starting with `-----BEGIN PUBLIC KEY-----`)
4. Tap **Import**

KeyScribe validates that the key is a valid RSA public key and checks for duplicates before saving.

### Deleting a Contact

Tap on a contact and confirm deletion. This only removes the stored public key - it doesn't affect any notes previously shared with that contact.

## Key Fingerprints

Each public key has a **SHA-256 fingerprint** - a short hash like `AB:CD:EF:12:...` that uniquely identifies the key. Use fingerprints to verify you have the correct key for a contact, especially if the key was received over an insecure channel.

When you receive a shared note, the sender's fingerprint is displayed so you can confirm who sent it.
