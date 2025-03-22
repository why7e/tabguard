# TabGuard

TabGuard is a Firefox extension that helps prevent accidental tab closures.

## Features

- 🔒 Automatically locks selected pages to prevent accidental closure
- 🔄 Toggle lock/unlock for any webpage by clicking the extension icon
- 🚫 Prompts for confirmation when attempting to close a locked tab
- 📝 Configure automatic tab locking using regex patterns
- 🌓 Supports both light and dark modes

## Usage

- Click the extension icon (🔒/🔓) to manually toggle the lock state for any tab
- When attempting to close a locked tab, you'll be prompted for confirmation
- Set up automatic tab locking rules in the settings page

## Settings Page

To access the settings page in Firefox:

1. Click the menu button (☰) in Firefox
2. Select "Add-ons and themes"
3. Find TabGuard in your extensions list
4. Click the gear (⚙️) icon next to TabGuard
5. Select "Extension Options" or "Preferences"

### Managing URL Patterns

In the settings page, you can:

- Add new URL patterns using regular expressions
- View all your existing patterns
- Delete patterns you no longer need

Examples of URL patterns:
```
youtube\.com/watch      # Matches YouTube video pages
docs\.google\.com      # Matches Google Docs pages
.*\.example\.com       # Matches all subdomains of example.com
```

The extension will automatically lock any tab whose URL matches one of your patterns.

## Build instructions

To pack the complete extension locally:

1. Install dependencies
   ```bash
   npm i
   ```

2. Compile and pack extension
   ```
   npm run build
   ```

## About

This project came around after losing countless hours of task notes in Autotask, which has no safeguards in place to prevent the accidental closing of a tab. It's a learning exercise that was helpful in several key areas:

- Browser Extension Development: Understanding the Firefox WebExtensions API, documentation, and browser-specific architecture
- Asynchronous Programming: Working with Promises, async/await, and message passing between extension components
- State Management: Implementing persistent storage with browser.storage APIs and managing tab state
- Event Handling: Responding to browser events and user interactions across different contexts
- Pattern Matching: Using regular expressions for URL matching and validation