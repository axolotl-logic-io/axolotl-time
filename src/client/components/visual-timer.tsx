"use client";

import { useEffect, useRef } from "react";
import { handleError } from "~/lib/error";
import { useTimer } from "../db";
import { syncWithServer } from "../hooks/sync";

export function VisualTimer({
  status,
  progress,
}: {
  status: "break" | "work";
  progress: number;
}) {
  const timer = useTimer();
  const lastStatus = useRef(status);

  useEffect(() => {
    if (status !== lastStatus.current && timer !== null) {
      lastStatus.current = status;
      syncWithServer(timer).catch(handleError);
    }
  }, [status, timer]);

  let radialColor: string;
  switch (status) {
    case "break":
      radialColor = "text-pink-400";
      break;
    case "work":
      radialColor = "text-purple-300";
      break;
  }

  return (
    <figure
      className={`radial-progress text-5xl ${radialColor}`}
      style={
        {
          "--value": Math.floor(progress * 100),
          "--size": "300px",
          "--thickness": "35px",
        } as React.CSSProperties
      }
    >
      {status}
    </figure>
  );
}
