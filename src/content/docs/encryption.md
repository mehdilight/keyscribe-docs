---
title: Encryption
order: 2
---

# Encryption

KeyScribe uses a hybrid encryption scheme combining symmetric and asymmetric cryptography.

## Key Pair

On first launch, KeyScribe generates an **RSA-2048 key pair** stored in the **Android Keystore**:

- **Private key** - Never leaves the hardware-backed keystore. Cannot be exported. Used to unwrap AES keys for decryption.
- **Public key** - Can be shared with contacts for encrypted note exchange. Available in Settings > Key Pair.

## How Notes Are Encrypted

When you save a note, the following happens:

1. A **fresh AES-256 key** is generated for this note
2. The title is encrypted with **AES-256-GCM** (produces ciphertext + IV)
3. The content is encrypted with **AES-256-GCM** (produces ciphertext + IV)
4. The AES key is **wrapped (encrypted) with your RSA-2048 public key** using RSA-OAEP (SHA-256 + MGF1-SHA1)
5. The encrypted title, content, both IVs, and the wrapped AES key are stored in the local Room database

The plaintext is never written to disk.

## How Notes Are Decrypted

1. The **wrapped AES key** is unwrapped using your RSA-2048 private key (from Android Keystore)
2. The title and content are decrypted using the recovered AES-256-GCM key and their respective IVs

## Encryption Specifications

```
Symmetric:   AES-256-GCM (unique key per note)
Asymmetric:  RSA-2048 with OAEP padding
             SHA-256 (main digest) + MGF1-SHA1
Key Storage: Android Keystore (hardware-backed)
Database:    Room (SQLite) - stores only ciphertext
Backup:      PBKDF2WithHmacSHA256 (100k iterations) + AES-256-GCM
```

## What This Means

- Each note has its own encryption key - compromising one note doesn't affect others
- Your private key is in hardware - even root access can't extract it
- GCM mode provides both confidentiality and integrity (tamper detection)
- No plaintext ever touches disk or logs

## Threat Model

KeyScribe protects against:

- Physical device theft (data is encrypted at rest)
- Database extraction (SQLite contains only ciphertext)
- Backup interception (backups are password-encrypted)
- Note sharing interception (notes are encrypted with recipient's public key)

KeyScribe does **not** protect against:

- Shoulder surfing (someone watching your screen while a note is decrypted)
- A compromised OS with keylogger (the plaintext exists in memory during editing)
- Screenshots or screen recording while viewing decrypted content
