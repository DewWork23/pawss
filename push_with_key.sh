#!/bin/bash
# This script pushes to GitHub using the SSH key

echo "Attempting to push to GitHub..."

# Export the SSH command with the correct key
export GIT_SSH_COMMAND='ssh -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes'

# Try to push
git push origin main

echo "Push attempt completed."