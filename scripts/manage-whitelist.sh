#!/bin/bash

# Script to manage SSH whitelist on o2switch for GitHub Actions
# Usage: ./manage-whitelist.sh <SSH_HOST> <CPANEL_USERNAME> <CPANEL_API_TOKEN>

set -e

SSH_HOST="$1"
CPANEL_USERNAME="$2"
CPANEL_TOKEN="$3"

if [ -z "$SSH_HOST" ] || [ -z "$CPANEL_USERNAME" ] || [ -z "$CPANEL_TOKEN" ]; then
  echo "Error: Missing required arguments"
  echo "Usage: $0 <SSH_HOST> <CPANEL_USERNAME> <CPANEL_API_TOKEN>"
  exit 1
fi

echo "Detecting runner IP..."
RUNNER_IP=$(curl -4 -s https://ifconfig.me)
echo "Current Runner IP: $RUNNER_IP"

# API Configuration
API_URL="https://${SSH_HOST}:2083/execute/SshWhitelist"
AUTH_HEADER="Authorization: cpanel ${CPANEL_USERNAME}:${CPANEL_TOKEN}"

echo "Fetching current whitelist..."
WHITELIST_RESPONSE=$(curl -k -sm 45 -H "$AUTH_HEADER" "${API_URL}/list" 2>&1)

if [ $? -ne 0 ]; then
  echo "Error: Failed to connect to cPanel API"
  echo "Response: $WHITELIST_RESPONSE"
  exit 1
fi

# Check if IP is already whitelisted
if echo "$WHITELIST_RESPONSE" | grep -q "\"address\":\"$RUNNER_IP\""; then
  echo "✓ IP $RUNNER_IP is already whitelisted."
  exit 0
fi

# Count existing IPs (unique addresses only)
IP_COUNT=$(echo "$WHITELIST_RESPONSE" | grep -oP '"address":"\K[^"]+' | sort -u | wc -l)
echo "Found $IP_COUNT existing whitelisted IPs."

# If limit reached (5 IPs), remove all before adding new one
if [ "$IP_COUNT" -ge 5 ]; then
  echo "Limit reached. Removing all old IPs..."
  
  REMOVE_ALL_RESPONSE=$(curl -k -sm 45 -H "$AUTH_HEADER" "${API_URL}/remove_all" 2>&1)
  
  if echo "$REMOVE_ALL_RESPONSE" | grep -q '"status":1'; then
    echo "✓ All old IPs removed successfully."
    sleep 10  # Wait for firewall to update
  else
    echo "Warning: Failed to remove old IPs."
    echo "Response: $REMOVE_ALL_RESPONSE"
  fi
fi

# Add new IP (both directions: in and out)
echo "Whitelisting runner IP ($RUNNER_IP)..."

# Add outbound direction
ADD_OUT_RESPONSE=$(curl -k -sm 45 -H "$AUTH_HEADER" \
  "${API_URL}/add?address=${RUNNER_IP}&port=22&direction=out" 2>&1)

if ! echo "$ADD_OUT_RESPONSE" | grep -q '"status":1'; then
  echo "Error adding IP (outbound):"
  echo "$ADD_OUT_RESPONSE"
  exit 1
fi

# Add inbound direction
ADD_IN_RESPONSE=$(curl -k -sm 45 -H "$AUTH_HEADER" \
  "${API_URL}/add?address=${RUNNER_IP}&port=22&direction=in" 2>&1)

if ! echo "$ADD_IN_RESPONSE" | grep -q '"status":1'; then
  echo "Error adding IP (inbound):"
  echo "$ADD_IN_RESPONSE"
  exit 1
fi

echo "✓ Success: $RUNNER_IP added to whitelist."
echo "Waiting 20 seconds for firewall to update..."
sleep 20

exit 0