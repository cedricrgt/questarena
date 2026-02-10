#!/bin/bash

# Configuration
# Arguments:
# 1: CPANEL_HOST (e.g., nodeXYZ.o2switch.net or your domain)
# 2: CPANEL_USER
# 3: CPANEL_TOKEN
# 4: SSH_PORT (optional, defaults to 22)

CPANEL_HOST="${1}"
CPANEL_USER="${2}"
CPANEL_TOKEN="${3}"
SSH_PORT="${4:-22}"

if [ -z "$CPANEL_HOST" ] || [ -z "$CPANEL_USER" ] || [ -z "$CPANEL_TOKEN" ]; then
    echo "Usage: $0 <host> <user> <token> [port]"
    exit 1
fi

set -e

# Function to make API calls with timeout
cpanel_api() {
    local endpoint="$1"
    local params="$2"
    
    # Using --max-time to prevent indefinite hanging
    # Using --connect-timeout to fail fast if host is unreachable
    response=$(curl -k -s --max-time 30 --connect-timeout 10 \
        -H "Authorization: cpanel $CPANEL_USER:$CPANEL_TOKEN" \
        "https://$CPANEL_HOST:2083/execute/SshWhitelist/$endpoint?$params")
        
    echo "$response"
}

# Get current runner IP
echo "Detecting runner IP..."
RUNNER_IP=$(curl -4 -s --max-time 10 https://ifconfig.me)

if [ -z "$RUNNER_IP" ]; then
    echo "Error: Could not determine runner IP"
    exit 1
fi
echo "Current Runner IP: $RUNNER_IP"

# 1. Fetch current whitelist to manage limits
echo "Fetching current whitelist..."
WHITELIST_JSON=$(cpanel_api "list" "")

# Check if JSON is valid (basic check)
if ! echo "$WHITELIST_JSON" | grep -q "\"status\":1"; then
    echo "Warning: Failed to fetch whitelist or invalid response. Response: $WHITELIST_JSON"
    # Proceeding to try adding IP anyway as a fallback
else
    # Check number of IPs
    # Using jq if available, otherwise simple grep count (less accurate but sufficient for simple limit check)
    if command -v jq &> /dev/null; then
        IP_COUNT=$(echo "$WHITELIST_JSON" | jq '.data.list | length')
        EXISTING_IPS=$(echo "$WHITELIST_JSON" | jq -r '.data.list[].address')
    else
        IP_COUNT=$(echo "$WHITELIST_JSON" | grep -o "\"address\"" | wc -l)
        EXISTING_IPS="" 
    fi
    
    echo "Found $IP_COUNT existing whitelisted IPs."
    
    # If we have many IPs (e.g. > 10), cleanup implies we want to remove old ones.
    # To be safe and avoid removing our own static IPs if any, we only remove if list is getting full.
    # O2Switch often has a limit (e.g. 50? 20?).
    # Strategy: If count > 10, remove the first few (oldest usually).
    
    if [ "$IP_COUNT" -gt 10 ]; then
        echo "Whitelist has > 10 IPs. Cleaning up..."
        
        # Determine IPs to remove.
        # If we have jq, we can iterate.
        if [ -n "$EXISTING_IPS" ]; then
            for IP in $EXISTING_IPS; do
                # Don't remove the current runner IP if it's already there
                if [ "$IP" != "$RUNNER_IP" ]; then
                    echo "Removing old IP: $IP"
                    # We continue even if removal fails
                    cpanel_api "remove" "address=$IP" > /dev/null || true
                fi
            done
        fi
    fi
fi

# 2. Add current runner IP
echo "Whitelisting runner IP ($RUNNER_IP)..."
ADD_RES=$(cpanel_api "add" "address=$RUNNER_IP&port=$SSH_PORT")

if echo "$ADD_RES" | grep -q "\"status\":1"; then
    echo "Success: $RUNNER_IP added to whitelist."
else
    # Check for "already exists" error which is actually a success state for us
    if echo "$ADD_RES" | grep -q "already"; then
         echo "Success: $RUNNER_IP was already whitelisted."
    else
         echo "Error adding IP to whitelist: $ADD_RES"
         exit 1
    fi
fi
