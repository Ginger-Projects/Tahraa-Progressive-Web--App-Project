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
