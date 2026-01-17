// FAP to Calendar - Console Script
// Paste this into browser console on any FAP page after login

// ============================================================
// CONFIG - CHANGE HERE
// ============================================================
const CAMPUS = 'hoa_lac';  // Options: 'hoa_lac', 'da_nang', 'can_tho', 'hcm', 'quy_nhon'
// ============================================================

const CAMPUSES = {
    hoa_lac: {
        name: 'Truong Dai Hoc FPT',
        geo: '21.013148,105.524797',
        mapkit: 'CAESpwMIrk0QmaPutrGyraLOARoSCawDe6ddAzVAEaeB1UeWYVpAIpwBCgdWaWV0bmFtEgJWThoFSGFub2kqClRoYWNoIFRoYXQyClRoYWNoIFRoYXRSFFRoYW5nIExvbmcgQm91bGV2YXJkYhRUaGFuZyBMb25nIEJvdWxldmFyZIoBQUVkdWNhdGlvbiBhbmQgVHJhaW5pbmcgQXJlYSDigJMgSG9hIExhYyBIaWdoLVRlY2ggUGFyayBUaGFjaCBUaGF0KhpUcsaw4budbmcgxJDhuqFpIEjhu41jIEZQVDJkVGhhbmcgTG9uZyBCb3VsZXZhcmQKRWR1Y2F0aW9uIGFuZCBUcmFpbmluZyBBcmVhIOKAkyBIb2EgTGFjIEhpZ2gtVGVjaCBQYXJrClRoYWNoIFRoYXQKSGFub2kKVmlldG5hbTgvUAFaXgooCJmj7raxsq2izgESEgmsA3unXQM1QBGngdVHlmFaQBiuTZADAZgDAaIfMQiZo+62sbKtos4BGiQKGlRyxrDhu51uZyDEkOG6oWkgSOG7jWMgRlBUEAAqAnZpQAA='
    },
    da_nang: {
        name: 'Dai hoc FPT Da Nang',
        geo: '15.967889,108.260694',
        mapkit: 'CAES0QIIrk0Q6rW20Z6b5Yf4ARoSCUZKDjOP7y9AEbKRNTSvEFtAImgKB1ZpZXRuYW0SAlZOGgdEYSBOYW5nKgxOZ3UgSGFuaCBTb24yB0RhIE5hbmdCB0hvYSBIYWmKARZGUFQgVXJiYW4gQXJlYSBEYSBOYW5nigEHSG9hIEhhaYoBDE5ndSBIYW5oIFNvbiocxJDhuqFpIGjhu41jIEZQVCDEkMOgIE7hurVuZzIWRlBUIFVyYmFuIEFyZWEgRGEgTmFuZzIHSG9hIEhhaTIMTmd1IEhhbmggU29uMgdEYSBOYW5nMgdWaWV0bmFtOC9QAVpgCigI6rW20Z6b5Yf4ARISCUZKDjOP7y9AEbKRNTSvEFtAGK5NkAMBmAMBoh8zCOq1ttGem+WH+AEaJgocxJDhuqFpIGjhu41jIEZQVCDEkMOgIE7hurVuZxAAKgJ2aUAA'
    },
    can_tho: {
        name: 'Truong Dai Hoc FPT',
        geo: '10.013006,105.731633',
        mapkit: 'CAES4QIIrk0Qwp3j9q213ro4GhIJVkW4yagGJEARiAp6FNNuWkAifwoHVmlldG5hbRICVk4aB0NhbiBUaG8qCU5pbmggS2lldTIHQ2FuIFRob0IHQW4gQmluaFIUTmd1eWVuIFZhbiBDdSBTdHJlZXRaAzYwMGIZNjAwLCBOZ3V5ZW4gVmFuIEN1IFN0cmVldIoBB0FuIEJpbmiKAQlOaW5oIEtpZXUqGlRyxrDhu51uZyDEkOG6oWkgSOG7jWMgRlBUMhk2MDAsIE5ndXllbiBWYW4gQ3UgU3RyZWV0MgdBbiBCaW5oMglOaW5oIEtpZXUyB0NhbiBUaG8yB1ZpZXRuYW04L1ABWlwKJwjCneP2rbXeujgSEglWRbjJqAYkQBGICnoU025aQBiuTZADAZgDAaIfMAjCneP2rbXeujgaJAoaVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBGUFQQACoCdmlAAA=='
    },
    hcm: {
        name: 'FPT University HCMC',
        geo: '10.841896,106.808790',
        mapkit: 'CAES3QIIrk0QpOrog/Sy1LjfARoSCY5HX/cMryVAEZz0YzjDs1pAInkKB1ZpZXRuYW0SAlZOGhBIbyBDaGkgTWluaCBDaXR5KgdUaHUgRHVjMhBIbyBDaGkgTWluaCBDaXR5Qg1Mb25nIFRoYW5oIE15UglTdHJlZXQgRDFiCVN0cmVldCBEMYoBDUxvbmcgVGhhbmggTXmKAQdUaHUgRHVjKhxGUFQgVW5pdmVyc2l0eSBIQ01DIFN0dWRlbnRzMglTdHJlZXQgRDEyDUxvbmcgVGhhbmggTXkyB1RodSBEdWMyEEhvIENoaSBNaW5oIENpdHkyB1ZpZXRuYW04L1ABWl4KKAik6uiD9LLUuN8BEhIJjkdf9wyvJUARnPRjOMOzWkAYrk2QAwGYAwGiHzEIpOrog/Sy1LjfARokChxGUFQgVW5pdmVyc2l0eSBIQ01DIFN0dWRlbnRzEAAqAEAA'
    },
    quy_nhon: {
        name: 'FPT University Quy Nhon',
        geo: '13.803885,109.219148',
        mapkit: 'CAESmQIIrk0QvMvU2/XpmIlJGhIJy4XKv5abK0ARlx8ThAZOW0AiQwoHVmlldG5hbRICVk4aCUJpbmggRGluaCoIUXV5IE5ob24yCFF1eSBOaG9uQglOaG9uIEJpbmiKAQlOaG9uIEJpbmgqIUZQVCBVbml2ZXJzaXR5IFF1eSBOaG9uIEFJIENhbXB1czIJTmhvbiBCaW5oMghRdXkgTmhvbjIJQmluaCBEaW5oMgdWaWV0bmFtOC9QAVphCicIvMvU2/XpmIlJEhIJy4XKv5abK0ARlx8ThAZOW0AYrk2QAwGYAwGiHzUIvMvU2/XpmIlJGikKIUZQVCBVbml2ZXJzaXR5IFF1eSBOaG9uIEFJIENhbXB1cxAAKgBAAA=='
    }
};

(async function () {
    const campus = CAMPUSES[CAMPUS] || CAMPUSES.hoa_lac;
    console.log('%cFAP to Calendar @minhqnd', 'font-weight:bold;font-size:14px');

    function parseAttendanceTable(doc, courseCode) {
        const table = doc.querySelector('table.table-bordered');
        if (!table) return [];
        const data = [];
        table.querySelectorAll('tr').forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 7) {
                const sessionNo = cells[0].textContent.trim();
                const dateText = cells[1].querySelector('span')?.textContent.trim() || cells[1].textContent.trim();
                const slotText = cells[2].querySelector('span')?.textContent.trim() || cells[2].textContent.trim();
                const slotMatch = slotText.match(/(\d+)_\((.+)\)/);
                const slotTime = slotMatch ? `(${slotMatch[2]})` : '';
                const room = cells[3].textContent.trim();
                const lecturer = cells[4].textContent.trim();
                const groupName = cells[5].textContent.trim();
                const dateMatch = dateText.match(/(\d{2})\/(\d{2})\/(\d{4})/);
                if (dateMatch) {
                    data.push({
                        subjectCode: courseCode, groupName, sessionNo, lecturer, roomNo: room, slotTime,
                        date: `${parseInt(dateMatch[2])}/${parseInt(dateMatch[1])}/${dateMatch[3]}`
                    });
                }
            }
        });
        return data;
    }

    function extractCourses(doc) {
        const courseDiv = doc.getElementById('ctl00_mainContent_divCourse');
        if (!courseDiv) return [];
        const courses = [];
        const currentBold = courseDiv.querySelector('b');
        if (currentBold) {
            const match = currentBold.textContent.trim().match(/(.+?)\(([A-Z0-9c]+)\)/);
            if (match) courses.push({ code: match[2], href: null, isCurrent: true });
        }
        courseDiv.querySelectorAll('a').forEach(link => {
            const match = link.textContent.trim().match(/(.+?)\(([A-Z0-9c]+)\)/);
            if (match) courses.push({ code: match[2], href: link.getAttribute('href'), isCurrent: false });
        });
        return courses;
    }

    function generateICS(data) {
        const header = `BEGIN:VCALENDAR
METHOD:PUBLISH
VERSION:2.0
X-WR-CALNAME:FPT Schedule
PRODID:-//Apple Inc.//macOS 12.7.4//EN
X-APPLE-CALENDAR-COLOR:#711A76
X-WR-TIMEZONE:Asia/Ho_Chi_Minh
CALSCALE:GREGORIAN
BEGIN:VTIMEZONE
TZID:Asia/Ho_Chi_Minh
BEGIN:STANDARD
TZOFFSETFROM:+0800
DTSTART:19750613T000000
TZNAME:GMT+7
TZOFFSETTO:+0700
RDATE:19750613T000000
END:STANDARD
END:VTIMEZONE`;

        const events = data.map(item => {
            const dp = item.date.match(/(\d+)\/(\d+)\/(\d+)/);
            if (!dp) return '';
            const dateStr = `${dp[3]}${dp[1].padStart(2, '0')}${dp[2].padStart(2, '0')}`;
            const tm = item.slotTime.match(/\((\d+):(\d+)-(\d+):(\d+)\)/);
            if (!tm) return '';
            const uid = crypto.randomUUID().toUpperCase();
            const ts = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            return `BEGIN:VEVENT
TRANSP:OPAQUE
DTSTART;TZID=Asia/Ho_Chi_Minh:${dateStr}T${tm[1].padStart(2, '0')}${tm[2].padStart(2, '0')}00
DTEND;TZID=Asia/Ho_Chi_Minh:${dateStr}T${tm[3].padStart(2, '0')}${tm[4].padStart(2, '0')}00
UID:${uid}
DTSTAMP:${ts}
LOCATION:${item.roomNo}
DESCRIPTION:${item.lecturer} - ${item.groupName} - Session: ${item.sessionNo}
STATUS:CONFIRMED
SEQUENCE:1
SUMMARY:${item.subjectCode}
LAST-MODIFIED:${ts}
CREATED:${ts}
X-APPLE-TRAVEL-ADVISORY-BEHAVIOR:AUTOMATIC
X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-APPLE-MAPKIT-HANDLE=${campus.mapkit};X-APPLE-RADIUS=141.1745233861194;X-TITLE=${item.roomNo}:geo:${campus.geo}
END:VEVENT`;
        }).filter(e => e);
        return header + '\n' + events.join('\n') + '\nEND:VCALENDAR';
    }

    async function fetchPage(url) {
        const res = await fetch(url, { credentials: 'include' });
        return new DOMParser().parseFromString(await res.text(), 'text/html');
    }

    // Fetch attendance page first (works from any FAP page)
    const attendancePage = await fetchPage('https://fap.fpt.edu.vn/Report/ViewAttendstudent.aspx');

    const courses = extractCourses(attendancePage);
    if (courses.length === 0) {
        console.error('No courses found. Make sure you are logged in.');
        return;
    }
    console.log(`Courses: ${courses.map(c => c.code).join(', ')}`);

    let allData = [];
    let progress = 0;
    const total = courses.length;

    const currentCourse = courses.find(c => c.isCurrent);
    if (currentCourse) {
        const data = parseAttendanceTable(attendancePage, currentCourse.code);
        allData.push(...data);
        progress++;
    }

    for (const course of courses.filter(c => !c.isCurrent && c.href)) {
        try {
            const doc = await fetchPage(`https://fap.fpt.edu.vn/Report/ViewAttendstudent.aspx${course.href}`);
            const data = parseAttendanceTable(doc, course.code);
            allData.push(...data);
            progress++;
            console.log(`Progress: ${progress}/${total}`);
            await new Promise(r => setTimeout(r, 300));
        } catch (e) {
            console.error(`Error: ${course.code}`);
        }
    }

    allData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Get term name from fetched page
    const termDiv = attendancePage.getElementById('ctl00_mainContent_divTerm');
    const termName = termDiv?.querySelector('b')?.textContent.trim() || 'schedule';
    const filename = termName.replace(/[^a-zA-Z0-9]/g, '_') + '.ics';

    const blob = new Blob([generateICS(allData)], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    console.log(`Done: ${filename} (${allData.length} events)`);
})();