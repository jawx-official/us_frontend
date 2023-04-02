import { StepsProps } from '@/data/steps.interface'
import { Box, Button, Center, CircularProgress, Flex, useBreakpointValue } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import userApi from "@/apis/users"
import shortid from "shortid"
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
const localizer = momentLocalizer(moment)

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
}

export default function Calendar({ disabled, prevFn, nextFn }: StepsProps) {
    const [progress, setProgress] = useState<boolean>(false)
    const [calenderSlots, setCalendarSlots] = useState<CalendarEvent[]>([

    ])
    const handleSelectEvent = useCallback(
        (event: CalendarEvent) => {
            let compounded = [...calenderSlots]
            let index = compounded.findIndex(evt => {
                return evt.id === event.id
            })
            if (index >= 0) {
                compounded.splice(index, 1);
                updateAvailability(compounded)
                setCalendarSlots(compounded)
            }
        },
        [calenderSlots, setCalendarSlots]
    )

    const loadAvailability = useCallback(
        async () => {
            const { data: { code, message, data } } = await userApi.fetchMyAvailability();
            if (code === 200 && data) {
                setCalendarSlots(data)
            }
        },
        [calenderSlots, setCalendarSlots]
    )
    const updateAvailability = useCallback(
        async (update: CalendarEvent[]) => {
            setProgress(true)
            const { data: { code, message, data } } = await userApi.updateMyAvailability(update);
            if (code === 200 && data) {
                setCalendarSlots(data)
            }
            setProgress(false)
        },
        [calenderSlots, setCalendarSlots]
    )
    const handleSelectSlot = useCallback(
        ({ start, end }: { start: Date, end: Date }) => {
            if (!moment().isBefore(start)) return
            let currentDate = new Date(start),
                endDate = new Date(end);

            let compounded = [...calenderSlots]
            while (currentDate < endDate) {
                let startMoment = moment(new Date(currentDate)).set('hours', 8).toDate()
                let endMoment = moment(new Date(currentDate)).set('hours', 18).toDate()

                if (moment().isBefore(startMoment) && !compounded.find(evt => moment(startMoment).isSame(evt.start))) {
                    compounded.push({
                        start: startMoment, end: endMoment, title: "Available", id: shortid.generate()
                    })
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }
            updateAvailability(compounded)
            setCalendarSlots(compounded)
        },
        [calenderSlots]
    )

    useEffect(() => {
        loadAvailability()
    }, [])
    return (
        <Box mt={useBreakpointValue({
            base: '0px',
            lg: "30px",
        })} display={"flex"} justifyContent="center">
            <Box bg={'white'} p={5} borderRadius={5} w={useBreakpointValue({
                base: '100%',
                lg: "800px",
            })} minH={"300px"}>
                <Center mb={10}>
                    <strong>
                        Click a slot to remove, or drag the mouse over the calendar
                        to select a date or a date range.
                    </strong>
                    <Box h={8} w={8}>
                        {progress && <CircularProgress ml={4} isIndeterminate size={8} color='green.300' />}
                    </Box>
                </Center>
                <BigCalendar
                    localizer={localizer}
                    events={calenderSlots}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
                <Flex width="100%" mt={5} justify="flex-end">
                    <Button
                        isDisabled={disabled}
                        mr={4} color={'gray.700'}
                        onClick={prevFn}
                        size="sm" _hover={{ bg: 'transparent' }} bg='transparent'
                        variant="ghost"
                    >
                        Previous
                    </Button>
                    <Button size="sm" _hover={{ bg: 'yellow.300' }} color='brand.darker' bg={'brand.highlight'} onClick={() => {
                        if (calenderSlots.length >= 10) {
                            nextFn()
                        }
                    }}>
                        Save and continue
                    </Button>
                </Flex>
            </Box>
        </Box>
    )
}
