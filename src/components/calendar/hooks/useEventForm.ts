import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { eventSchema } from "../../../validations/schemas";
import { CalendarEvent, EventFormValues } from "../../../types";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";

export const useEventForm = () => {
  const [openForm, setOpenForm] = useState(false);
  const [currenEventId, setCurrentEventId] = useState<string | undefined>(
    undefined
  );
  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
      description: "",
    },
  });

  const resetForm = useCallback(
    (data?: EventFormValues) => {
      if (data) {
        form.reset(data);
      } else {
        form.reset({
          title: "",
          start: new Date(),
          end: new Date(new Date().getTime() + 60 * 60 * 1000),
          description: "",
        });
      }
    },
    [form]
  );

  const handleCloseForm = useCallback(() => {
    setOpenForm(false);
    resetForm();
  }, [resetForm]);
  const handleOpenNewForm = useCallback(() => {
    resetForm();
    setCurrentEventId(undefined);
    setOpenForm(true);
  }, [resetForm]);

  const handleDateSelect = useCallback(
    (selectInfo: DateSelectArg) => {
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect();
      const adjustedStart = new Date(selectInfo.start);
      const adjustedEnd = new Date(selectInfo.end);
      adjustedStart.setHours(adjustedStart.getHours() + 3);
      adjustedEnd.setHours(adjustedEnd.getHours() + 3);

      resetForm({
        title: "",
        start: adjustedStart,
        end: adjustedEnd,
        description: "",
      });
      setCurrentEventId(undefined);
      setOpenForm(true);
    },
    [resetForm]
  );

  const handleEventClick = useCallback(
    (clickInfo: EventClickArg, events: CalendarEvent[]) => {
      const clickedEventId = clickInfo.event.id;
      const clickedEvent = events.find((e) => e.id === clickedEventId);
      if (clickedEvent) {
        const adjustedStart = new Date(clickedEvent.start);
        const adjustedEnd = new Date(clickedEvent.end);
        adjustedStart.setHours(adjustedStart.getHours() + 3);
        adjustedEnd.setHours(adjustedEnd.getHours() + 3);

        resetForm({
          title: clickedEvent.title,
          start: adjustedStart,
          end: adjustedEnd,
          description: clickedEvent.description || "",
        });

        setCurrentEventId(clickedEvent.id);
        setOpenForm(true);
      }
    },
    [resetForm]
  );

  return {
    form,
    openForm,
    setOpenForm,
    currenEventId,
    handleCloseForm,
    handleOpenNewForm,
    handleDateSelect,
    handleEventClick,
  };
};
