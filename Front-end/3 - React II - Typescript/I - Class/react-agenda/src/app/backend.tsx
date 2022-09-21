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

export async function getEventsEndPoint(from: string, to: string): Promise<IEvent[]> {
  const resp = await fetch(
    `http://localhost:8080/events?date_gte=${from}&date_lte=${to}&_sort=date,time`
  );
  return resp.json();
}
