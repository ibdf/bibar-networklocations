# Bitbar: Network Locations Switcher
Bitbar node.js script to automatically switch network locations

## Description
This is a simple Node.js script that check the name of your WiFi and tries to match it with the name of a Network Location. This allows one to automatically switch network locations according to the WiFi being used.

### Why?
Different wifi connections may require different settings (eg. proxy)

## Requirements
- Runs in bitbar (https://bitbar.com)
- The network location name must match the wifi name.

## Setup
- Make sure bitbar is not running
- Create a default network location called "Automatic" (System Settings -> Network -> Location (dropdown). This will be the default location in case no matches are found.
- Create any other locations matching existing WIFI names (spaces and all)
- Run bitbar

### Issues
- The Newtork settings panel may crash if you try to add locations while the script is running, because the script is constantly accessing it.
