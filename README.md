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

- **⚡ Optimized Background Extraction**: Fetches all course schedules from the attendance report page using background `fetch()` - no more waiting for page navigations!
- **📍 Campus MapKit Support**: Integrated FPT campus data (MapKit) for accurate location and travel time notifications in Apple Calendar.
- **🚗 Travel Time Notifications**: Apple Calendar automatically calculates and notifies you when to leave for class based on your campus.
- **📅 Automatic Schedule Extraction**: Extracts your complete class schedule from FPTU FAP website silently.
- **👀 Visual Calendar Preview**: View schedule in week or list view with color-coded classes.
- **📤 Export to ICS Format**: Export to `.ics` file for Google Calendar, Apple Calendar, Outlook, etc.
- **🌐 Online/Offline Support**: Distinguishes between online and offline classes.
- **✏️ Quick Edit**: Modify class details with a simplified "Notes" field (Lecturer - Group - Session).
- **🔔 Smart Reminders**: Automatic reminders in exported calendar (15 min for online, 30 min for first offline class).

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

1. **Log in to FAP**: Navigate to [FPTU FAP](https://fap.fpt.edu.vn) and log in with your student credentials.
2. **Open Extension**: Click the FPTU Study Calendar icon.
3. **Select Campus**: Choose your FPT campus (Hòa Lạc, Đà Nẵng, Cần Thơ, HCM, or Quy Nhơn).
4. **Extract Schedule**: Click "Bắt đầu trích xuất" - extension sẽ tự động lấy data từ trang điểm danh dưới nền.
5. **Preview & Edit**: Click "Xem lịch học" để kiểm tra và chỉnh sửa nếu cần.
6. **Export**: Click "Xuất file .ics" để tải file lịch và import vào ứng dụng lịch của bạn.

https://github.com/user-attachments/assets/a1fb4771-dc30-4cf7-94c3-68564c58bb43

## ⚙️ Settings

Click the three-dots icon (⋮) in the extension popup to access:
- **Theme**: System, Light, or Dark.
- **Campus**: Select your FPT campus for accurate MapKit location data.

## 📝 Notes

- **v1.1.1 Optimized**: Uses background fetch instead of page navigation for maximum speed.
- Requires login to FAP before extraction.
- **No more delays**: Removed `waitTime` as data fetching is now asynchronous and direct.
- **Smart Notes**: Class notes are automatically formatted as `Lecturer - Group - Session`.
- Works perfectly with Apple Calendar's "Time to Leave" feature using integrated MapKit handles.

## 🛠️ For Developers

### Project Structure

- `manifest.json` - Chrome Extension v3 manifest.
- `background.js` - Service worker handling the background `fetch()` workflow.
- `content.js` - Content script for overlay and FAP page detection.
- `popup.html/js` - Extension popup UI.
- `calendar.html/js` - Calendar preview and management page.
- `ics-export.js` - ICS file generation with full MapKit support.

### Key Logic

- `startScrapingFromAttendance()`: The core background fetch mechanism in `background.js`.
- `generateIcsEvent()`: Handles the MapKit structured location for Apple Calendar in `ics-export.js`.

## 🤝 Contributing

Contributions are welcome! 🎉
Feel free to submit a pull request or open an issue with suggestions or improvements.

---

*This extension is not officially affiliated with FPT University. It is a community project for students.*
