#!/usr/bin/env bash
set -e

export PATH="$HOME/.cargo/bin:$PATH"

LIB_PATH="./library/ftc-emu-core"
WWW_PATH="./ftc-emu-www"
OUT_DIR="$PWD/$WWW_PATH/pkg"

(cd "$LIB_PATH" && wasm-pack build . \
    --target web \
    --out-dir "$OUT_DIR" \
    --out-name ftc_emu_core \
    --dev
)

cd "$WWW_PATH"
pnpm run dev
