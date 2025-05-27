"use client";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface CalendarInputProps {
  disabled?: (date: Date) => boolean;
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export function CalendarWithDateInput({
  disabled,
  selected,
  onSelect,
}: CalendarInputProps) {
  const today = new Date();
  const [month, setMonth] = useState(today);
  const [inputValue, setInputValue] = useState("");

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      onSelect(undefined);
    } else {
      onSelect(date);
      setMonth(date);
      setInputValue(format(date, "yyyy-MM-dd"));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const parsedDate = new Date(value);
      if (isValid(parsedDate)) {
        onSelect(parsedDate);
        setMonth(parsedDate);
      }
    } else {
      onSelect(undefined);
    }
  };

  useEffect(() => {
    if (selected) {
      setInputValue(format(selected, "yyyy-MM-dd"));
    }
  }, [selected]);

  return (
    <div>
      <div className="rounded-lg border border-border">
        <Calendar
          mode="single"
          className="p-2 bg-background"
          selected={selected}
          onSelect={handleDayPickerSelect}
          disabled={disabled}
          month={month}
          onMonthChange={setMonth}
        />
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3">
            <Label className="text-xs">Enter date</Label>
            <div className="relative grow">
              <Input
                type="date"
                value={inputValue}
                onChange={handleInputChange}
                className="peer ps-9 [&::-webkit-calendar-picker-indicator]:hidden"
                aria-label="Select date"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <CalendarIcon size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
