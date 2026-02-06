#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-http://localhost:3001}"
SITE_NAME="${1:-My App}"
DOMAIN="${2:-localhost}"

echo ""
echo "  GameShield Setup"
echo "  ================"
echo ""
echo "  API:    $API_URL"
echo "  Site:   $SITE_NAME"
echo "  Domain: $DOMAIN"
echo ""

# check server is running
if ! curl -sf "$API_URL/health" > /dev/null 2>&1; then
  echo "  ERROR: Server is not running at $API_URL"
  echo "  Start it first with: pnpm dev"
  echo ""
  exit 1
fi

# create site
echo "  Creating site..."
SITE_RESPONSE=$(curl -sf -X POST "$API_URL/api/v1/admin/sites" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"$SITE_NAME\", \"domains\": [\"$DOMAIN\"]}")

SITE_ID=$(echo "$SITE_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
SITE_KEY=$(echo "$SITE_RESPONSE" | grep -o '"siteKey":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$SITE_ID" ] || [ -z "$SITE_KEY" ]; then
  echo "  ERROR: Failed to create site"
  echo "  $SITE_RESPONSE"
  exit 1
fi

# create API key
echo "  Creating API key..."
KEY_RESPONSE=$(curl -sf -X POST "$API_URL/api/v1/admin/sites/$SITE_ID/keys" \
  -H "Content-Type: application/json" \
  -d '{"name": "default"}')

SECRET_KEY=$(echo "$KEY_RESPONSE" | grep -o '"secretKey":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$SECRET_KEY" ]; then
  echo "  ERROR: Failed to create API key"
  echo "  $KEY_RESPONSE"
  exit 1
fi

echo ""
echo "  Done! Save these keys:"
echo ""
echo "  SITE KEY (public, use in widget):"
echo "    $SITE_KEY"
echo ""
echo "  SECRET KEY (private, use on your server):"
echo "    $SECRET_KEY"
echo ""
echo "  Quick test:"
echo "    <gameshield-captcha site-key=\"$SITE_KEY\"></gameshield-captcha>"
echo ""
