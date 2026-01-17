# FPTU Study Calendar

<p align="left">
  <a href="https://chromewebstore.google.com/detail/fptu-study-calendar/hflohnkdglheggdcafogjddkgjlgmddn" target="_blank">
    <img src="https://img.shields.io/badge/Chrome_Web_Store-Available-4285F4?logo=google-chrome&logoColor=white" alt="Chrome Web Store"/>
  </a>

  <a href="https://github.com/QingTian1927/fptu-study-calendar/releases/latest" target="_blank">
    <img src="https://img.shields.io/github/v/release/QingTian1927/fptu-study-calendar?display_name=tag&sort=semver" alt="Latest Release"/>
  </a>

  <img src="https://img.shields.io/badge/License-GPLv3-orange" alt="License GPLv3"/>
</p>

A Chrome extension that helps FPT University students export their class schedules from FAP to Google Calendar, Apple Calendar, and other calendar applications.

![FPTU Study Calendar Banner](./assets/readme_banner.png)

## 🌟 Features

- **⚡ Fast Attendance-Based Extraction**: Extracts all course schedules from the attendance report page in one go - no more waiting for week-by-week extraction!
- **📍 Campus Location Support**: Select your FPT campus (Hòa Lạc, Đà Nẵng, Cần Thơ, HCM, Quy Nhơn) for automatic travel time notifications
- **🚗 Travel Time Notifications**: Apple Calendar automatically calculates and notifies you when to leave for class based on your location
- **📅 Automatic Schedule Extraction**: Extracts your complete class schedule from FPTU FAP website
- **👀 Visual Calendar Preview**: View schedule in week or list view with color-coded classes
- **📤 Export to ICS Format**: Export to `.ics` file for Google Calendar, Apple Calendar, Outlook, etc.
- **🌐 Online/Offline Support**: Distinguishes between online and offline classes
- **🔗 Quick Access Links**: Direct links to Google Meet, course materials (FLM), and EduNext
- **✏️ Edit Classes**: Modify class details directly in the calendar view
- **🔔 Smart Reminders**: Automatic reminders in exported calendar (15 min for online, 30 min for first offline class)

## 📦 Installation

### Method 1: Chrome Web Store (Recommended)

* [Google Chrome Web Store](https://chromewebstore.google.com/detail/fptu-study-calendar/hflohnkdglheggdcafogjddkgjlgmddn)

### Method 2: Manual Installation (Developer Mode)

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top-right toggle)
4. Click "Load unpacked" and select the extension folder
5. The extension icon will appear in your Chrome toolbar

## 🚀 How to Use

1. **Log in to FAP**: Navigate to [FPTU FAP](https://fap.fpt.edu.vn) and log in with your student credentials
2. **Open Extension**: Click the FPTU Study Calendar icon in your Chrome toolbar
3. **Select Campus**: Choose your FPT campus from the dropdown (Hòa Lạc, Đà Nẵng, Cần Thơ, HCM, or Quy Nhơn)
4. **Extract Schedule**: Click the extraction button - the extension will automatically fetch all your courses from the attendance report page
5. **Preview**: Click the preview result button to view your schedule in week or list view
6. **Export**: Click the export button to download the calendar file with location data, then import it into Google Calendar, Apple Calendar, or Outlook

https://github.com/user-attachments/assets/a1fb4771-dc30-4cf7-94c3-68564c58bb43

## ⚙️ Settings

Click the three-dots icon (⋮) in the extension popup to access:
- **Theme**: System, Light, or Dark
- **Wait Time**: Delay between page loads (default: 3000ms). Increase if you experience timeout errors.
- **Campus**: Select your FPT campus for accurate location data in exported calendars

## 📝 Notes

- **New in v1.2**: Now uses faster attendance-based extraction instead of week-by-week iteration
- Requires login to FAP before extraction
- Extraction is now much faster (fetches all courses from attendance report in one go)
- No more missing weeks during semester breaks!
- Data stored locally (no external servers)
- If extraction fails, increase wait time in settings
- Campus location data enables travel time notifications in Apple Calendar

## 🛠️ For Developers

### Project Structure

- `manifest.json` - Chrome Extension v3 manifest
- `background.js` - Service worker for scraping workflow (includes both week-based and attendance-based extraction)
- `content.js` - Content script for extracting data from FAP pages (supports both timetable and attendance pages)
- `popup.html/js` - Extension popup UI and logic
- `calendar.html/js` - Calendar preview page
- `ics-export.js` - ICS file generation utilities with MapKit location support
- `_locales/vi/messages.json` - Vietnamese localization

### Development

1. Clone repository and load in Chrome (`chrome://extensions/` with Developer mode enabled)
2. Debug: Background script via Service Worker inspector, content script via FAP page DevTools, popup via right-click → Inspect
3. Key files to modify:
   - `content.js`: `extractScheduleData()` for week-based extraction, `extractScheduleDataFromAttendance()` for attendance-based extraction
   - `background.js`: `startScraping()` for week-based, `startScrapingFromAttendance()` for attendance-based
   - `calendar.js`: View rendering and features
   - `ics-export.js`: Event generation with campus location data

### Extraction Methods

The extension now supports two extraction methods:

1. **Attendance-Based Extraction** (Default, Recommended): Fetches all course schedules from the attendance report page (`ViewAttendstudent.aspx`). This method is faster and more reliable as it:
   - Fetches all courses in one go
   - Doesn't miss weeks during semester breaks
   - Requires fewer page navigations
   - Works with just login (no need to navigate to timetable page)

2. **Week-Based Extraction** (Legacy): Iterates through each week in the timetable page. Still available for backward compatibility.

To switch between methods, set `useAttendanceMethod: true/false` in the message sent to background script.

## 🤝 Contributing

Contributions are welcome! 🎉
Feel free to submit a pull request or open an issue with suggestions or improvements.

---

*This extension is not officially affiliated with FPT University. It is a community project for students.*
