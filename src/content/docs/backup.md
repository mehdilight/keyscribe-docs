---
title: Backup & Restore
order: 4
---

# Backup & Restore

Export all your notes as a password-protected backup file, and restore them on any device running KeyScribe.

## Creating a Backup

1. Go to **Settings > Backup & Restore**
2. Enter a strong password
3. Tap **Create Backup**
4. Choose where to save the backup file

## What Happens During Backup

1. All notes are **decrypted** using your device's private key
2. The plaintext notes are serialized to JSON
3. A key is derived from your password using **PBKDF2WithHmacSHA256** (100,000 iterations) with a random salt
4. The JSON is encrypted with **AES-256-GCM** using the derived key
5. The result is packaged into a backup file containing the salt, IV, encrypted data, and note count

The backup file is useless without the password. There is no password recovery.

## Restoring a Backup

1. Go to **Settings > Backup & Restore**
2. Tap **Restore Backup**
3. Select the backup file
4. Enter the password you used when creating the backup

## What Happens During Restore

1. The password is used to derive the same key via PBKDF2
2. The backup data is decrypted with AES-256-GCM
3. Each note is **re-encrypted** using the current device's RSA key pair
4. Notes are inserted into the local database

This means backups are portable - you can restore on a different device. The notes will be re-encrypted with that device's key pair.

## Important Notes

- **Remember your password** - There is no way to recover it. If you forget it, the backup is permanently inaccessible.
- **Restoring adds notes** - It does not overwrite existing notes. Duplicate notes may appear if you restore twice.
- **Backup contains plaintext temporarily** - During the backup process, notes exist in plaintext in memory. The backup file itself is encrypted.
