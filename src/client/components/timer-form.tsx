"use client";

// react-hook-form
import { useForm } from "react-hook-form";

// Ours - Utils
import { timeInWords } from "~/lib/time";
import { useTimer } from "~/client/db";
import { Button } from "./ui/button";

const TIME_PRESETS = [
  // 10 minutes
  10,
  // 15 minutes
  15,
  // 25 minutes
  25,
  // 30 minutes
  30,
  // 45 minutes
  45,
  // 50 minutes
  50,
  // 1 hour
  1 * 60,
  // 2 hours
  2 * 60,
].map((minutes) => minutes * 60 * 1000);

const DEFAULT_FORM = {
  workLength: TIME_PRESETS[5],
  breakLength: TIME_PRESETS[0],
};

type FormValues = typeof DEFAULT_FORM;

export function TimerForm() {
  const timer: {
    startTime: number;
    breakLength: number;
    workLength: number;
  } | null = useTimer();

  const { register } = useForm<FormValues>({
    defaultValues: {
      breakLength: timer?.breakLength ?? DEFAULT_FORM.breakLength,
      workLength: timer?.workLength ?? DEFAULT_FORM.workLength,
    },
  });

  return (
    <form
      method="GET"
      action="/timer"
      role="form"
      className="flex flex-col gap-4"
    >
      <div className="flex flex-wrap gap-2">
        <label className="select select-primary">
          <span className="label">Work for</span>
          <select
            defaultValue={DEFAULT_FORM.workLength}
            {...register("workLength", { required: true })}
          >
            {TIME_PRESETS.map((num) => (
              <option key={num} value={num}>
                {timeInWords(num)}
              </option>
            ))}
          </select>
        </label>
        <label className="select">
          <span className="label">Break for</span>
          <select
            defaultValue={DEFAULT_FORM.breakLength}
            {...register("breakLength", { required: true })}
          >
            {TIME_PRESETS.map((num) => (
              <option key={num} value={num}>
                {timeInWords(num)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          data-testid="timer-start"
          type="submit"
          name="startTime"
          value={0}
          onClick={(event) => {
            // Start a private timer from the moment of the click
            event.currentTarget.value = String(Date.now());
          }}
        >
          Start
        </Button>
        <Button
          data-testid="timer-global"
          type="submit"
          variant="secondary"
          name="startTime"
          value={0}
        >
          SCP-2317
        </Button>
      </div>
    </form>
  );
}
