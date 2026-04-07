---
title: Note Sharing
order: 3
---

# Note Sharing

KeyScribe lets you share encrypted notes with other KeyScribe users. Only the intended recipient can decrypt the note.

## How It Works

1. **Import the recipient's public key** - Go to Settings > Contacts > Add, and paste their RSA public key (PEM format). They can share it via QR code or copy/paste.
2. **Open a note and tap Share** - In the decrypted view, tap the share icon.
3. **Pick a contact** - Select who you want to share with.
4. **Send the .cnote file** - KeyScribe creates an encrypted file and opens the Android share sheet. Send it via any app (WhatsApp, Telegram, email, etc.).

## Encryption Flow

```
Your note (plaintext title + content)
    |
    v
Generate fresh AES-256 key
    |
    v
Encrypt title with AES-256-GCM  -->  ciphertext + IV
Encrypt content with AES-256-GCM  -->  ciphertext + IV
    |
    v
Wrap AES key with RECIPIENT's RSA-2048 public key
    |
    v
Package into .cnote JSON file
```

Only the recipient's private key can unwrap the AES key and decrypt the note.

## The .cnote File Format

```json
{
  "version": 1,
  "encryptedTitle": "[base64]",
  "titleIv": "[base64]",
  "encryptedContent": "[base64]",
  "contentIv": "[base64]",
  "wrappedAesKey": "[base64]",
  "senderFingerprint": "AB:CD:EF:..."
}
```

- **version** - Format version (currently 1)
- **encryptedTitle / encryptedContent** - AES-256-GCM ciphertext (base64)
- **titleIv / contentIv** - Initialization vectors for GCM (base64)
- **wrappedAesKey** - AES key encrypted with recipient's RSA public key (base64)
- **senderFingerprint** - SHA-256 fingerprint of the sender's public key, so the recipient knows who sent it

## Receiving a Shared Note

When someone sends you a .cnote file:

1. Open the file - Android will offer to open it with KeyScribe
2. KeyScribe uses your private key to unwrap the AES key
3. The note is decrypted and displayed in a read-only viewer
4. The sender's fingerprint is shown so you can verify who sent it

If the note wasn't encrypted with your public key, decryption will fail and you'll see an error.
