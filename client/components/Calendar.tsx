import React, { useMemo, useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from "date-fns";
import { Storage } from "@/lib/storage";

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO date
  description?: string;
}

export function useEvents(): EventItem[] {
  return Storage.getEvents ? Storage.getEvents() : [];
}

export default function Calendar() {
  const today = new Date();
  const [current, setCurrent] = useState<Date>(today);
  const [selected, setSelected] = useState<Date | null>(today);
  const events = useEvents();

  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(current);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const weeks = useMemo(() => {
    const days = [] as Date[];
    let d = startDate;
    while (d <= endDate) {
      days.push(d);
      d = addDays(d, 1);
    }
    return days;
  }, [startDate, endDate]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const e of events) {
      try {
        const dt = parseISO(e.date);
        const key = format(dt, "yyyy-MM-dd");
        const arr = map.get(key) || [];
        arr.push(e);
        map.set(key, arr);
      } catch {}
    }
    return map;
  }, [events]);

  const onPrev = () => setCurrent((d) => subMonths(d, 1));
  const onNext = () => setCurrent((d) => addMonths(d, 1));

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{format(current, "MMMM yyyy")}</h3>
            <div className="text-sm text-muted-foreground">{format(current, "PPP")}</div>
          </div>
          <div className="flex gap-2">
            <button className="btn" onClick={onPrev} aria-label="Previous month">◀</button>
            <button className="btn" onClick={onNext} aria-label="Next month">▶</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-sm text-center">
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
            <div key={d} className="text-xs text-muted-foreground py-1">{d}</div>
          ))}
          {weeks.map((day) => {
            const inMonth = isSameMonth(day, current);
            const key = format(day, "yyyy-MM-dd");
            const dayEvents = eventsByDay.get(key) || [];
            return (
              <button key={key} onClick={() => setSelected(day)} className={`p-2 rounded text-left h-20 border ${inMonth ? '' : 'opacity-40'} ${isSameDay(day, selected || new Date(0)) ? 'ring-2 ring-primary' : ''}`}>
                <div className="flex justify-between items-start">
                  <span className="font-medium">{format(day, 'd')}</span>
                </div>
                <div className="mt-2 space-y-1">
                  {dayEvents.slice(0,2).map(ev => (
                    <div key={ev.id} className="rounded bg-primary/10 px-1 text-xs">{ev.title}</div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="md:col-span-1">
        <div className="sticky top-20">
          <h4 className="font-semibold">Events</h4>
          <div className="mt-3">
            {selected ? (
              (eventsByDay.get(format(selected, 'yyyy-MM-dd')) || []).map(ev => (
                <div key={ev.id} className="mb-3 border rounded p-3">
                  <div className="font-medium">{ev.title}</div>
                  <div className="text-xs text-muted-foreground">{format(parseISO(ev.date), 'PPP')}</div>
                  {ev.description && <div className="mt-2 text-sm">{ev.description}</div>}
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">No day selected</div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
