export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export async function getCalendarEndPoint() {
  const resp = await fetch('http://localhost:8080/calendars');
  return resp.json();
}

export async function getEventsEndPoint() {
  const resp = await fetch('http://localhost:8080/events');
  return resp.json();
}
