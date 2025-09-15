#!/bin/bash
set -e

echo "🔧 Cleaning old Solana cache..."
rm -rf ~/.cache/solana/v1.48 || true

echo "🌐 Setting Google DNS..."
if ! grep -q "nameserver 8.8.8.8" /etc/resolv.conf; then
  sudo bash -c 'echo "nameserver 8.8.8.8" >> /etc/resolv.conf'
fi

echo "⚡ Retrying anchor build..."
anchor build
