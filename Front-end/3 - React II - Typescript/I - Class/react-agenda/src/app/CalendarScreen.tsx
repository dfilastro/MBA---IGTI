import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { getEventsEndPoint, IEvent } from './backend';

const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

const tableStyling = {
  border: '1px solid rgb(224,224,224)',
  minHeight: '90vh',
};

export function CalendarScreen() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const weeks = generateCalendar(getToday(), events);
  const firstDay = weeks[0][0].date;
  const lastDay = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    getEventsEndPoint(firstDay, lastDay).then(setEvents);
  }, [firstDay, lastDay]);

  return (
    <Box display='flex'>
      <Box borderRight='1px solid rgb(224,224,224)' width='12em' padding='8px 16px'>
        <h2>Agenda React</h2>
        <Button variant='contained'>Novo Evento</Button>

        <Box marginTop='4rem'>
          <h3>Agendas</h3>
          <FormControlLabel control={<Checkbox defaultChecked />} label='Pessoal' />
          <FormControlLabel control={<Checkbox defaultChecked />} label='Trabalho' />
        </Box>
      </Box>

      <TableContainer component={'div'}>
        <Box display='flex' alignItems='center' padding='0.5rem 1rem'>
          <Box>
            <IconButton area-label='button last month'>
              <Icon>chevron_left</Icon>
            </IconButton>

            <IconButton area-label='button next month'>
              <Icon>chevron_right</Icon>
            </IconButton>
          </Box>

          <Box flex='1' marginLeft='1rem' component='h3'>
            Setembro de 2022
          </Box>
          <Box>
            <IconButton>
              <Avatar>
                <Icon>person</Icon>
              </Avatar>
            </IconButton>
          </Box>
        </Box>

        {/* <Table sx={{ minWidth: 650, height: '90vh' }} size='small' aria-label='a dense table'> */}
        <Table sx={tableStyling} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              {DAYS_OF_WEEK.map((day) => (
                <TableCell align='center'>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {weeks.map((week, i) => (
              <TableRow key={i}>
                {week.map((day) => (
                  <TableCell align='center' key={day.date}>
                    {day.date}
                    {day.events.map((e) => (
                      <div>{e}</div>
                    ))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

interface ICalendar {
  date: string;
  events: [];
}

function generateCalendar(date: string, allEvents: IEvent[]): ICalendar[][] {
  const weeks: ICalendar[][] = [];
  const jsDate = new Date(date + 'T12:00:00');
  const currentMonth = jsDate.getMonth();

  const firstCalendarDay = new Date(jsDate.valueOf());
  firstCalendarDay.setDate(1);
  const weekDay = firstCalendarDay.getDay();
  firstCalendarDay.setDate(1 - weekDay);

  do {
    const week: ICalendar[] = [];

    for (let i = 0; i < 7; i++) {
      const isoDate = `${firstCalendarDay.getFullYear()}-${(firstCalendarDay.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${firstCalendarDay.getDate().toString().padStart(2, '0')}`;
      week.push({ date: isoDate, events: allEvents.filter((e) => e.date === isoDate) });
      firstCalendarDay.setDate(firstCalendarDay.getDate() + 1);
    }
    weeks.push(week);
  } while (firstCalendarDay.getMonth() === currentMonth);

  return weeks;
}

function getToday() {
  return '2022-09-04';
}
