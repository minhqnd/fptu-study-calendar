// Content script for extracting schedule data from FPTU timetable page

(function() {
  'use strict';

  // Store overlay style element globally to avoid duplicates
  // Declared at the top to avoid Temporal Dead Zone issues
  let overlayStyleElement = null;

  // Campus configuration with MapKit location data
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

  // Get campus from storage or default to hoa_lac
  let currentCampus = CAMPUSES.hoa_lac;
  
  // Try to load campus from storage
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.get(['selectedCampus'], (result) => {
      if (result.selectedCampus && CAMPUSES[result.selectedCampus]) {
        currentCampus = CAMPUSES[result.selectedCampus];
      }
    });
  }

  // Parse attendance table from Report/ViewAttendstudent.aspx page
  function parseAttendanceTable(doc, courseCode) {
    const table = doc.querySelector('table.table-bordered');
    if (!table) {
      console.log('No attendance table found');
      return [];
    }
    
    const data = [];
    const rows = table.querySelectorAll('tr');
    
    console.log(`Parsing attendance table with ${rows.length} rows for course ${courseCode}`);
    
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 7) {
        // Extract data from cells
        const sessionNo = cells[0].textContent.trim();
        const dateText = cells[1].querySelector('span')?.textContent.trim() || cells[1].textContent.trim();
        const slotText = cells[2].querySelector('span')?.textContent.trim() || cells[2].textContent.trim();
        const room = cells[3].textContent.trim();
        const lecturer = cells[4].textContent.trim();
        const groupName = cells[5].textContent.trim();
        const status = cells[6].textContent.trim();
        
        // Parse slot text to extract slot number and time
        // Format: "1_(7:30-9:00)" or "Slot 1_(7:30-9:00)"
        const slotMatch = slotText.match(/(\d+)_\((.+)\)/);
        let slotNumber = null;
        let slotTime = '';
        
        if (slotMatch) {
          slotNumber = parseInt(slotMatch[1], 10);
          slotTime = `(${slotMatch[2]})`;
        }
        
        // Parse date from DD/MM/YYYY format
        const dateMatch = dateText.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (dateMatch) {
          const day = parseInt(dateMatch[1], 10);
          const month = parseInt(dateMatch[2], 10);
          const year = dateMatch[3];
          const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          // Parse time from slotTime (7:30-9:00)
          const timeMatch = slotTime.match(/\((\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})\)/);
          if (timeMatch) {
            const startTime = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}`;
            const endTime = `${timeMatch[3].padStart(2, '0')}:${timeMatch[4]}`;
            
            // Create Date object to get day name
            const dateObj = new Date(year, month - 1, day);
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const dayName = dayNames[dateObj.getDay()];
            
            // Determine if online (check for Meet URL in FAP, but we don't have access here)
            // We'll mark as offline by default, can be enhanced later
            const isOnline = false;
            
            data.push({
              subjectCode: courseCode,
              day: dayName,
              date: dateString,
              slot: slotNumber,
              time: {
                start: startTime,
                end: endTime
              },
              location: room || '',
              isOnline: isOnline,
              meetUrl: null,
              edunextUrl: null,
              materialsUrl: null,
              isRelocated: false,
              status: status || 'Not yet',
              activityId: `${courseCode}-${sessionNo}-${dateString}`,
              lecturer: lecturer,
              groupName: groupName,
              sessionNo: sessionNo
            });
          }
        }
      }
    });
    
    console.log(`Extracted ${data.length} classes from attendance table`);
    return data;
  }

  // Extract course list from attendance page
  function extractCourses(doc) {
    const courseDiv = doc.getElementById('ctl00_mainContent_divCourse');
    if (!courseDiv) {
      console.log('Course div not found');
      return [];
    }
    
    const courses = [];
    
    // Get current course (displayed in bold)
    const currentBold = courseDiv.querySelector('b');
    if (currentBold) {
      const match = currentBold.textContent.trim().match(/(.+?)\(([A-Z0-9c]+)\)/);
      if (match) {
        courses.push({
          name: match[1].trim(),
          code: match[2],
          href: null,
          isCurrent: true
        });
      }
    }
    
    // Get other courses (displayed as links)
    const courseLinks = courseDiv.querySelectorAll('a');
    courseLinks.forEach(link => {
      const match = link.textContent.trim().match(/(.+?)\(([A-Z0-9c]+)\)/);
      if (match) {
        courses.push({
          name: match[1].trim(),
          code: match[2],
          href: link.getAttribute('href'),
          isCurrent: false
        });
      }
    });
    
    console.log(`Found ${courses.length} courses:`, courses.map(c => c.code).join(', '));
    return courses;
  }

  // Parse time from string like "(7:30-9:00)" or "(12:50-15:10)"
  function parseTime(timeStr) {
    const match = timeStr.match(/\((\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})\)/);
    if (!match) return null;
    
    return {
      start: `${match[1].padStart(2, '0')}:${match[2]}`,
      end: `${match[3].padStart(2, '0')}:${match[4]}`
    };
  }

  // Extract slot number from text like "Slot 1" or "Slot 12"
  function extractSlotNumber(slotText) {
    const match = slotText.match(/Slot\s+(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }

  // Parse date from DD/MM format and return as YYYY-MM-DD string
  // This avoids timezone issues with Date objects
  function parseDate(dateStr, year) {
    const [day, month] = dateStr.split('/').map(Number);
    const dayStr = String(day).padStart(2, '0');
    const monthStr = String(month).padStart(2, '0');
    return {
      date: `${year}-${monthStr}-${dayStr}`,
      dateObj: new Date(year, month - 1, day)
    };
  }

  // Extract class information from a cell
  function extractClassFromCell(cell, dayIndex, dates, baseYear, slotNumber, weekSpansBoundary, selectedYear) {
    const classes = [];
    
    // Check if cell is empty - but be careful, "-" might be in a text node
    const cellText = cell.textContent.trim();
    if (cellText === '-' || cellText === '' || cellText === 'Slot') {
      return classes;
    }
    
    // Check if cell has any class links - this is the most reliable indicator
    const allLinks = cell.querySelectorAll('a[href*="ActivityDetail"]');
    if (allLinks.length === 0) {
      return classes;
    }
    
    // Get all paragraph elements in cell (each represents a class)
    const paragraphs = cell.querySelectorAll('p');
    
    if (paragraphs.length === 0) {
      // Try to extract from cell directly if no paragraphs
      allLinks.forEach(link => {
        const classData = extractClassData(link, cell, dayIndex, dates, baseYear, slotNumber, weekSpansBoundary, selectedYear);
        if (classData) {
          classes.push(classData);
          console.log(`Extracted class: ${classData.subjectCode} from cell (no paragraphs)`);
        }
      });
    } else {
      // Extract from each paragraph
      paragraphs.forEach((paragraph, pIndex) => {
        const link = paragraph.querySelector('a[href*="ActivityDetail"]');
        if (link) {
          const classData = extractClassData(link, paragraph, dayIndex, dates, baseYear, slotNumber, weekSpansBoundary, selectedYear);
          if (classData) {
            classes.push(classData);
            console.log(`Extracted class: ${classData.subjectCode} from paragraph ${pIndex}`);
          } else {
            console.warn(`Failed to extract class data from paragraph ${pIndex}:`, paragraph.textContent.substring(0, 100));
          }
        }
      });
    }
    
    return classes;
  }

  // Extract class data from link and container
  function extractClassData(link, container, dayIndex, dates, baseYear, slotNumber, weekSpansBoundary, selectedYear) {
    try {
      // Extract subject code (text before "-" in link, including postfix letters like 'c')
      // Pattern: Main code (A-Z0-9) + optional postfix (lowercase letters) + optional dash
      const subjectCodeMatch = link.textContent.match(/^([A-Z0-9]+[a-z]*)-?/);
      const subjectCode = subjectCodeMatch ? subjectCodeMatch[1] : '';
      
      // Extract activity ID from href
      const activityIdMatch = link.href.match(/id=(\d+)/);
      const activityId = activityIdMatch ? activityIdMatch[1] : '';
      
      // Extract location (text after "at ")
      // Stop before " - " (Meet URL), "-EduNext", status patterns like "(Not yet)", or time patterns like "(12:50-15:10)"
      // Also stop at line breaks or HTML tags
      let location = '';
      const containerText = container.textContent;
      // Updated regex to stop before "-EduNext" as well
      const atMatch = containerText.match(/at\s+(.+?)(?:\s*-\s*(?:EduNext|Meet\s+URL|$)|\(Not\s+yet\)|\(attended\)|\(absent\)|\(\d{1,2}:\d{2}-\d{1,2}:\d{2}\)|\n|\r|<|$)/i);
      if (atMatch) {
        location = atMatch[1].trim();
        // Remove trailing dash if present
        location = location.replace(/\s*-\s*$/, '').trim();
      }
      
      // Check if location has been relocated (contains "(_ChangeSlot)")
      let isRelocated = false;
      if (location && location.includes('(_ChangeSlot)')) {
        isRelocated = true;
        // Remove (_ChangeSlot) from location text (handle various formats)
        location = location.replace(/\s*\(_ChangeSlot\)\s*/gi, '').trim();
      }
      
      // Extract EduNext URL if present (check for both fu-edunext and edunext domains)
      let edunextUrl = null;
      const edunextLink = container.querySelector('a[href*="edunext.fpt.edu.vn"]');
      if (edunextLink) {
        edunextUrl = edunextLink.href;
      }
      
      // Clean location text - remove any remaining EduNext references and other artifacts
      // Remove "-EduNext" text (with various spacing) - in case it wasn't caught by regex
      location = location.replace(/\s*-\s*EduNext\s*/gi, '').trim();
      // Remove any trailing dashes or spaces
      location = location.replace(/\s*-\s*$/, '').trim();
      // Remove any double spaces
      location = location.replace(/\s+/g, ' ').trim();
      
      // Extract time from label-success span
      const timeSpan = container.querySelector('span.label.label-success');
      const timeStr = timeSpan ? timeSpan.textContent.trim() : '';
      const time = parseTime(timeStr);
      
      if (!time) {
        console.warn(`[DEBUG] Could not parse time for class ${subjectCode}: timeStr="${timeStr}" from container text: "${container.textContent.substring(0, 150)}"`);
        return null;
      }
      
      // Extract status
      let status = 'Not yet';
      if (container.textContent.includes('attended')) {
        status = 'attended';
      } else if (container.textContent.includes('absent')) {
        status = 'absent';
      } else if (container.textContent.includes('Not yet')) {
        status = 'Not yet';
      }
      
      // Extract Meet URL if present
      let meetUrl = null;
      const meetLink = container.querySelector('a[href*="meet.google.com"]');
      if (meetLink) {
        meetUrl = meetLink.href;
      }
      
      // Extract Materials URL (View Materials link - always the first link with label-warning)
      let materialsUrl = null;
      const materialsLink = container.querySelector('a.label.label-warning[href*="flm.fpt.edu.vn"]');
      if (materialsLink) {
        materialsUrl = materialsLink.href;
      }
      
      // Check if online - look for online-indicator in the cell (parent of container)
      const cell = container.closest('td');
      const hasOnlineIndicator = cell ? cell.querySelector('.online-indicator') !== null : false;
      const isOnline = hasOnlineIndicator;
      
      // Get date for this day
      const dateStr = dates[dayIndex];
      if (!dateStr) {
        console.warn(`[DEBUG] No date string for day index ${dayIndex} in dates array of length ${dates.length}`);
        return null;
      }
      
      // Parse date and determine correct year
      const [day, month] = dateStr.split('/').map(Number);
      let dateYear = baseYear;
      
      // If week spans year boundary (Dec to Jan), adjust year for January dates
      if (weekSpansBoundary && month === 1) {
        // January dates are in the selected year (next year relative to baseYear)
        dateYear = selectedYear;
      } else if (weekSpansBoundary && month === 12) {
        // December dates are in the base year (previous year relative to selectedYear)
        dateYear = baseYear;
      }
      
      const parsedDate = parseDate(dateStr, dateYear);
      const date = parsedDate.dateObj;
      const dateString = parsedDate.date;
      
      // Get day name
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = dayNames[date.getDay()];
      
      return {
        subjectCode,
        day: dayName,
        date: dateString,
        slot: slotNumber,
        time: {
          start: time.start,
          end: time.end
        },
        location: location || '',
        isOnline,
        meetUrl: meetUrl,
        edunextUrl: edunextUrl,
        materialsUrl: materialsUrl,
        isRelocated: isRelocated,
        status,
        activityId
      };
    } catch (error) {
      console.error('Error extracting class data:', error);
      return null;
    }
  }

  // Main extraction function
  function extractScheduleData() {
    try {
      // Get year from dropdown, but prefer the values set by background script
      const yearSelect = document.querySelector('#ctl00_mainContent_drpYear');
      let selectedYear = yearSelect ? parseInt(yearSelect.value, 10) : new Date().getFullYear();
      let baseYear = selectedYear;
      
      // Check if background script set year values (for handling year boundaries)
      if (typeof window.__selectedYear !== 'undefined') {
        selectedYear = window.__selectedYear;
        console.log('Using selected year from background script:', selectedYear);
      }
      if (typeof window.__baseYear !== 'undefined') {
        baseYear = window.__baseYear;
        console.log('Using base year from background script:', baseYear);
      }
      
      // Get week range from dropdown to determine if week spans year boundary
      const weekSelect = document.querySelector('#ctl00_mainContent_drpSelectWeek');
      const selectedOption = weekSelect ? weekSelect.options[weekSelect.selectedIndex] : null;
      const weekRange = selectedOption ? selectedOption.text.trim() : '';
      
      // Determine if week spans year boundary
      // baseYear is already set from window.__baseYear if provided by background script
      // If not provided, calculate it based on whether week spans boundary
      let weekSpansBoundary = false;
      
      if (weekRange) {
        const weekMatch = weekRange.match(/(\d{2}\/\d{2})\s+To\s+(\d{2}\/\d{2})/);
        if (weekMatch) {
          const [, startStr, endStr] = weekMatch;
          const [startDay, startMonth] = startStr.split('/').map(Number);
          const [endDay, endMonth] = endStr.split('/').map(Number);
          
          // If week spans year boundary (e.g., Dec to Jan)
          if (startMonth === 12 && endMonth === 1) {
            weekSpansBoundary = true;
            // If baseYear wasn't set by background script, calculate it
            if (typeof window.__baseYear === 'undefined') {
              baseYear = selectedYear - 1;
            }
          }
        }
      }
      
      // Find the correct schedule table - it has a thead with th[rowspan="2"] containing year/week dropdowns
      // AND a tbody with rows starting with "Slot" in the first cell
      const allTables = document.querySelectorAll('table');
      let scheduleTable = null;
      let thead = null;
      
      console.log(`Found ${allTables.length} tables on page`);
      
      for (let i = 0; i < allTables.length; i++) {
        const table = allTables[i];
        const testThead = table.querySelector('thead');
        const testTbody = table.querySelector('tbody');
        
        if (testThead && testTbody) {
          // Check if this table has the year/week selector structure
          const yearWeekTh = testThead.querySelector('th[rowspan="2"]');
          const yearSelect = yearWeekTh ? yearWeekTh.querySelector('#ctl00_mainContent_drpYear') : null;
          
          // Also verify it has slot rows (not just the "FAP mobile app" table)
          const firstRow = testTbody.querySelector('tr');
          const firstCell = firstRow ? firstRow.querySelector('td') : null;
          const hasSlotRows = firstCell && firstCell.textContent.trim().toLowerCase().startsWith('slot');
          
          if (yearSelect && hasSlotRows) {
            scheduleTable = table;
            thead = testThead;
            console.log(`Found schedule table at index ${i} with year dropdown and slot rows`);
            break;
          }
        }
      }
      
      if (!scheduleTable || !thead) {
        console.error('Schedule table not found - could not find table with year/week dropdowns and slot rows');
        return []; // Return empty array instead of null
      }
      
      const dateRow = thead.querySelector('tr:nth-child(2)');
      if (!dateRow) {
        console.error('Date row not found');
        return []; // Return empty array instead of null
      }
      
      const dateHeaders = Array.from(dateRow.querySelectorAll('th'));
      // Skip first column (year/week selector)
      const dates = dateHeaders.slice(1).map(th => th.textContent.trim());
      
      if (dates.length !== 7) {
        console.warn(`Expected 7 date headers, found: ${dates.length}. Attempting to reconstruct missing dates`);
        
        // If we have fewer dates than expected, reconstruct the full week
        if (dates.length > 0 && dates.length < 7) {
          // Parse the first available date
          const firstDateStr = dates[0];
          const [firstDay, firstMonth] = firstDateStr.split('/').map(Number);
          const firstDate = new Date(selectedYear, firstMonth - 1, firstDay);
          
          // Get which day of week the first date is (0=Sun, 1=Mon, ..., 6=Sat)
          const firstDayOfWeek = firstDate.getDay();
          
          // If the first date is not Monday, we're missing days at the start
          // FPTU weeks start on Monday (1)
          if (firstDayOfWeek !== 1) {
            // Go back to Monday of the same week
            // If Mon=1, Tue=2, ..., Sun=0, then days back to Monday is (firstDayOfWeek + 6) % 7
            const daysBackToMonday = (firstDayOfWeek + 6) % 7;
            
            firstDate.setDate(firstDate.getDate() - daysBackToMonday);
            
            // Now generate all 7 dates for the week, starting from Monday
            const reconstructedDates = [];
            const currentDate = new Date(firstDate);
            
            for (let i = 0; i < 7; i++) {
              const d = currentDate.getDate();
              const m = currentDate.getMonth() + 1;
              const dateStr = String(d).padStart(2, '0') + '/' + String(m).padStart(2, '0');
              reconstructedDates.push(dateStr);
              
              // Move to next day
              currentDate.setDate(currentDate.getDate() + 1);
            }
            
            // Replace dates array with reconstructed dates
            dates.length = 0;
            dates.push(...reconstructedDates);
          }
        }
      }
      
      console.log('Date headers:', dates);
      
      // Get table body from the correct schedule table
      const tbody = scheduleTable.querySelector('tbody');
      
      if (!tbody) {
        console.error('Table body not found');
        return []; // Return empty array instead of null
      }
      
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const classes = [];
      
      console.log(`Found ${rows.length} rows in table body`);
      
      // Process each row (slot)
      rows.forEach((row, rowIndex) => {
        const cells = Array.from(row.querySelectorAll('td'));
        if (cells.length < 2) {
          console.log(`Row ${rowIndex}: Skipping - only ${cells.length} cells`);
          return; // Need at least slot + one day
        }
        
        // First cell contains slot number
        const slotCell = cells[0];
        const slotText = slotCell ? slotCell.textContent.trim() : '';
        const slotNumber = extractSlotNumber(slotText);
        
        if (slotNumber === null) {
          console.log(`Row ${rowIndex}: Skipping - no slot number found in "${slotText}"`);
          return; // Skip if slot number not found
        }
        
        // Process each day column (skip first column which is slot number)
        // Handle cases where there might be fewer date headers than day columns
        const dayColumns = Math.min(dates.length, cells.length - 1);
        for (let dayIndex = 0; dayIndex < dayColumns; dayIndex++) {
          const cell = cells[dayIndex + 1];
          if (!cell) continue;
          
          // Check if cell has any links before processing
          const links = cell.querySelectorAll('a[href*="ActivityDetail"]');
          if (links.length > 0) {
            console.log(`Row ${rowIndex}, Slot ${slotNumber}, Day ${dayIndex}: Found ${links.length} class link(s)`);
          }
          
          // Pass the year context for proper date parsing
          const cellClasses = extractClassFromCell(cell, dayIndex, dates, baseYear, slotNumber, weekSpansBoundary, selectedYear);
          if (cellClasses && cellClasses.length > 0) {
            classes.push(...cellClasses);
            console.log(`Row ${rowIndex}, Slot ${slotNumber}, Day ${dayIndex}: Successfully extracted ${cellClasses.length} class(es)`);
          } else if (links.length > 0) {
            // Log when we have links but didn't extract anything
            console.warn(`Row ${rowIndex}, Slot ${slotNumber}, Day ${dayIndex}: Found ${links.length} link(s) but extraction returned empty. Date: ${dates[dayIndex]}`);
          }
        }
      });
      
      console.log(`Total extracted: ${classes.length} classes from table`);
      
      // Return empty array if no classes found (not null)
      return classes;
      
    } catch (error) {
      console.error('Error extracting schedule data:', error);
      return []; // Return empty array instead of null
    }
  }

  // New function: Extract all schedule data from attendance page (faster, single-page approach)
  function extractScheduleDataFromAttendance() {
    try {
      console.log('Starting attendance-based extraction...');
      
      // Check if we're on the attendance page
      const isAttendancePage = window.location.href.includes('ViewAttendstudent.aspx');
      if (!isAttendancePage) {
        console.error('Not on attendance page');
        return { error: 'NOT_ON_ATTENDANCE_PAGE', classes: [] };
      }
      
      // Extract courses from the page
      const courses = extractCourses(document);
      
      if (courses.length === 0) {
        console.error('No courses found');
        return { error: 'NO_COURSES_FOUND', classes: [] };
      }
      
      console.log(`Found ${courses.length} courses`);
      
      // Parse the current course's attendance table
      const allClasses = [];
      const currentCourse = courses.find(c => c.isCurrent);
      
      if (currentCourse) {
        console.log(`Parsing current course: ${currentCourse.code}`);
        const classes = parseAttendanceTable(document, currentCourse.code);
        allClasses.push(...classes);
      }
      
      // Return data with metadata for background script to fetch other courses
      return {
        courses: courses,
        classes: allClasses,
        needsMoreCourses: courses.filter(c => !c.isCurrent).length > 0
      };
      
    } catch (error) {
      console.error('Error extracting attendance data:', error);
      return { error: error.message, classes: [] };
    }
  }

  // ========================================
  // OVERLAY FUNCTIONALITY (must be defined before sessionStorage check)
  // ========================================
  
  // Create overlay element
  function createOverlay(title, message, dismissText) {
    // Remove existing overlay if any
    const existingOverlay = document.getElementById('fptu-calendar-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }
    
    const overlay = document.createElement('div');
    overlay.id = 'fptu-calendar-overlay';
    
    // Create styles (only once)
    if (!overlayStyleElement) {
      overlayStyleElement = document.createElement('style');
      overlayStyleElement.id = 'fptu-calendar-overlay-style';
      overlayStyleElement.textContent = `
        #fptu-calendar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        #fptu-calendar-overlay .overlay-content {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          text-align: center;
        }
        
        #fptu-calendar-overlay .overlay-extension-name {
          font-size: 12px;
          font-weight: 500;
          color: #10b981;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        #fptu-calendar-overlay .overlay-title {
          font-size: 20px;
          font-weight: 600;
          color: #171717;
          margin-bottom: 8px;
          line-height: 1.2;
        }
        
        #fptu-calendar-overlay .overlay-message {
          font-size: 14px;
          color: #525252;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        
        #fptu-calendar-overlay .overlay-progress {
          font-size: 16px;
          font-weight: 500;
          color: #10b981;
          margin-bottom: 24px;
          min-height: 24px;
        }
        
        #fptu-calendar-overlay .spinner {
          width: 40px;
          height: 40px;
          margin: 0 auto 24px;
          border: 4px solid #e5e5e5;
          border-top-color: #10b981;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        #fptu-calendar-overlay .overlay-button {
          background: #10b981;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
          font-family: inherit;
          display: block;
          margin: 0 auto;
        }
        
        #fptu-calendar-overlay .overlay-button:hover {
          background: #059669;
        }
        
        #fptu-calendar-overlay .overlay-button:active {
          transform: scale(0.98);
        }
        
        #fptu-calendar-overlay.complete .spinner {
          display: none;
        }
        
        #fptu-calendar-overlay.complete .overlay-progress {
          color: #10b981;
          font-weight: 600;
        }
      `;
      document.head.appendChild(overlayStyleElement);
    }
    
    // Get extension name from sessionStorage or use default
    const extName = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('fptu_extension_name') : null;
    const extensionName = extName || 'FPTU Study Calendar';
    
    overlay.innerHTML = `
      <div class="overlay-content">
        <div class="overlay-extension-name">${extensionName}</div>
        <div class="overlay-title" id="overlay-title">${title || 'Đang trích xuất lịch học'}</div>
        <div class="overlay-message" id="overlay-message">${message || 'Đang trích xuất lịch học cho bạn...'}</div>
        <div class="spinner" id="overlay-spinner"></div>
        <div class="overlay-progress" id="overlay-progress"></div>
        <button class="overlay-button" id="overlay-dismiss" style="display: none;">${dismissText || 'Đóng'}</button>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add dismiss button handler
    const dismissButton = overlay.querySelector('#overlay-dismiss');
    dismissButton.addEventListener('click', () => {
      overlay.remove();
    });
    
    return overlay;
  }
  
  // Show overlay
  function showOverlay(title, message, dismissText) {
    createOverlay(title, message, dismissText);
  }
  
  // Update overlay progress
  function updateOverlayProgress(progressText) {
    let overlay = document.getElementById('fptu-calendar-overlay');
    if (!overlay) {
      // Create overlay if it doesn't exist
      showOverlay();
      overlay = document.getElementById('fptu-calendar-overlay');
    }
    
    const progressEl = overlay.querySelector('#overlay-progress');
    if (progressEl && progressText) {
      progressEl.textContent = progressText;
    }
  }
  
  // Mark overlay as complete
  function completeOverlay(completeText) {
    const overlay = document.getElementById('fptu-calendar-overlay');
    if (!overlay) return;
    
    overlay.classList.add('complete');
    const progressEl = overlay.querySelector('#overlay-progress');
    const spinnerEl = overlay.querySelector('#overlay-spinner');
    const dismissButton = overlay.querySelector('#overlay-dismiss');
    
    if (progressEl && completeText) {
      progressEl.textContent = completeText;
    }
    if (spinnerEl) {
      spinnerEl.style.display = 'none';
    }
    if (dismissButton) {
      dismissButton.style.display = 'block';
    }
  }
  
  // Hide overlay
  function hideOverlay() {
    const overlay = document.getElementById('fptu-calendar-overlay');
    if (overlay) {
      overlay.remove();
    }
  }
  
  // ========================================
  // CHECK SESSIONSTORAGE IMMEDIATELY ON LOAD
  // This ensures overlay persists across page reloads
  // Must run synchronously after overlay functions are defined
  // ========================================
  (function checkSessionStorageForOverlay() {
    try {
      const isScraping = sessionStorage.getItem('fptu_scraping_active') === 'true';
      if (isScraping) {
        // Get stored overlay data
        const title = sessionStorage.getItem('fptu_overlay_title') || 'Đang trích xuất lịch học';
        const message = sessionStorage.getItem('fptu_overlay_message') || 'Đang trích xuất lịch học cho bạn...';
        const dismissText = sessionStorage.getItem('fptu_overlay_dismiss') || 'Đóng';
        const progressText = sessionStorage.getItem('fptu_scraping_progress') || '';
        
        // Show overlay immediately with stored progress
        showOverlay(title, message, dismissText);
        
        // Update progress if available
        if (progressText) {
          updateOverlayProgress(progressText);
        }
        
        console.log('Overlay restored from sessionStorage');
      }
    } catch (error) {
      console.error('Error checking sessionStorage for overlay:', error);
    }
  })();
  
  // Execute extraction immediately
  // The background script will wait for the page to be ready before calling this
  console.log('Content script loaded, starting extraction...');
  const scrapedData = extractScheduleData();
  window.scrapedData = scrapedData;
  console.log('Content script extraction complete. Found', scrapedData ? scrapedData.length : 0, 'classes');
  console.log('Sample data:', scrapedData && scrapedData.length > 0 ? scrapedData[0] : 'No data');
  
  // Also expose the extraction functions globally for debugging and for background script to call
  window.extractScheduleData = extractScheduleData;
  window.extractScheduleDataFromAttendance = extractScheduleDataFromAttendance;
  window.parseAttendanceTable = parseAttendanceTable;
  window.currentCampus = currentCampus;
  
  // Notify background script that data is ready
  // This replaces the polling mechanism with proper message passing
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    try {
      chrome.runtime.sendMessage({
        action: 'dataReady',
        data: scrapedData || []
      }).catch((error) => {
        // Ignore errors if background script isn't listening yet
        console.log('Could not send dataReady message (this is normal if no listener):', error.message);
      });
    } catch (error) {
      // Ignore errors
      console.log('Error sending dataReady message:', error.message);
    }
  }
  
  // Listen for messages from background script
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'showOverlay') {
        showOverlay(message.title, message.message, message.dismissText);
        sendResponse({ success: true });
      } else if (message.action === 'updateOverlayProgress') {
        updateOverlayProgress(message.progressText);
        sendResponse({ success: true });
      } else if (message.action === 'scrapingComplete') {
        // Use week count if available, otherwise use provided completeText
        let completeText = message.completeText;
        if (message.totalWeeks !== undefined && message.successCount !== undefined) {
          // Use chrome.i18n.getMessage if available, otherwise construct message
          if (typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getMessage) {
            completeText = chrome.i18n.getMessage('overlayCompleteWithWeeks', [message.successCount.toString(), message.totalWeeks.toString()]);
          } else {
            completeText = `Đã trích xuất ${message.successCount}/${message.totalWeeks} tuần`;
          }
        }
        completeOverlay(completeText);
        sendResponse({ success: true });
      } else if (message.action === 'hideOverlay') {
        hideOverlay();
        sendResponse({ success: true });
      }
      return true; // Keep channel open for async response
    });
  }
  
  return scrapedData;
})();

