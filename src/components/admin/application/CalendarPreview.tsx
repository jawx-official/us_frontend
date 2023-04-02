import { Box } from '@chakra-ui/react'
import React from 'react'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { CalendarEvent } from '@/components/onboarding/Calendar'
const localizer = momentLocalizer(moment)

export default function CalendarPreview({ calendarSlots }: { calendarSlots: CalendarEvent[] }) {
    return (
        <Box>
            <BigCalendar
                localizer={localizer}
                events={calendarSlots}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </Box>
    )
}
