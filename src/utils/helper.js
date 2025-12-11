import { DateTime } from "luxon";

export function convertTimeTo12H(timeString, fromZone, toZone) {
  // Parse the time in the expert's timezone
  const [hours, minutes] = timeString.split(":");

  const dt = DateTime.now()
    .setZone(fromZone)             // Expert timezone
    .set({ hour: parseInt(hours), minute: parseInt(minutes), second: 0 });

  // Convert to trainee/browser timezone
  return dt.setZone(toZone).toFormat("hh:mm a"); // 12h format
}

export function generateLocalSessions(bookingDetails) {
  const {
    startDate,
    endDate,
    packageDetails: { timeZone, timeSlots,groupSettings }
  } = bookingDetails;

  const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const now = DateTime.local().setZone(userZone);

  const start = DateTime.fromISO(startDate).setZone(timeZone);
  const end = DateTime.fromISO(endDate).setZone(timeZone);

  const sessions = [];
  let cursor = start;

  while (cursor <= end) {
    const weekdayName = cursor.toFormat("cccc"); // Monday, Tuesday, etc.
    const slot = timeSlots.find(s => s.day === weekdayName);

    if (slot) {
      const sessionStart = DateTime.fromFormat(
        `${cursor.toFormat("yyyy-MM-dd")} ${slot.startTime}`,
        "yyyy-MM-dd HH:mm",
        { zone: timeZone }
      );

      const sessionEnd = DateTime.fromFormat(
        `${cursor.toFormat("yyyy-MM-dd")} ${slot.endTime}`,
        "yyyy-MM-dd HH:mm",
        { zone: timeZone }
      );

      const localStart = sessionStart.setZone(userZone);
      const localEnd = sessionEnd.setZone(userZone);

      const isPast = localEnd.toMillis() < now.toMillis();

      sessions.push({
        id: localStart.toMillis(), // unique key
        date: localStart.toFormat("dd MMM"), // e.g., "30 Dec"
        year: localStart.toFormat("yyyy"), // e.g., "2025",
        time: `${localStart.toFormat("hh:mm a")} - ${localEnd.toFormat("hh:mm a")}`,
        dayOfWeek: localStart.toFormat("cccc"), // "Tuesday"
        slotCount: groupSettings.maxParticipants, // or calculate based on your logic
        hasScheduled: false, // update later if needed
        isInactive: isPast,
        participants:0,
        startLocalISO: localStart.toISO(),
        endLocalISO: localEnd.toISO(),
        startLocalUTC: localStart.toUTC().toISO(),
        endLocalUTC: localEnd.toUTC().toISO(),
      });
    }

    cursor = cursor.plus({ days: 1 });
  }

  return sessions;
}
