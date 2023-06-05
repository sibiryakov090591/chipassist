import {
  userActivity,
  userActivitySessionDelay,
  // userActivitySessionMinimumDuration,
  userActivitySessionWhitespace,
} from "@src/constants/defaults";
import { useEffect, useRef, useState } from "react";
import * as rrweb from "rrweb";
import { useSocketClient } from "../SocketClient";

type ActivityType = () => (() => void)[];

// type
// DomContentLoaded = 0,
// Load = 1,
// FullSnapshot = 2,
// IncrementalSnapshot = 3,
// Meta = 4,
// Custom = 5,
// Plugin = 6

// source
// Mutation = 0,
// MouseMove = 1, // types 0 - MouseUp, 1 - MouseDown, 2 - Click, etc
// MouseInteraction = 2,
// Scroll = 3,
// ViewportResize = 4,
// Input = 5,
// TouchMove = 6,
// MediaInteraction = 7,
// StyleSheetRule = 8,
// CanvasMutation = 9,
// Font = 10,
// Log = 11,
// Drag = 12,
// StyleDeclaration = 13

const useUserActivity: ActivityType = () => {
  const [run, setRun] = useState(false);
  const recordStopRef = useRef<() => void>(null);
  const timeoutRef = useRef<any>(null);
  const events = useRef<any[]>([]);
  const socketClient = useSocketClient("user_events", true);

  useEffect(() => {
    if (run) {
      handleStartRecord();
    } else {
      handleStopRecord();
      handleSendEvents();
    }
    return () => {
      if (run) {
        handleStopRecord();
        handleSendEvents();
      }
    };
  }, [run]);

  const handleStartRecord = () => {
    recordStopRef.current = rrweb.record({
      sampling: { scroll: 150 },
      emit(event: any, isCheckout) {
        if (isCheckout) events.current = [];
        events.current.push(event);

        // if no clicks for userActivitySessionWhitespace make snapshot and clear events by isCheckout
        if (
          !events.current.some((v) => IsMouseClick(v)) &&
          events.current[events.current.length - 1].timestamp - events.current[0].timestamp >
            userActivitySessionWhitespace * 60 * 1000
        ) {
          rrweb.record.takeFullSnapshot(true);
        }

        if (IsMouseClick(event)) {
          handleDebounceSendEventsAndReload();
        }
      },
    });
  };

  const handleStopRecord = () => {
    if (recordStopRef.current) recordStopRef.current();
    recordStopRef.current = null;
  };

  const handleDebounceSendEventsAndReload = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleSendEvents();
      if (recordStopRef && recordStopRef.current) {
        recordStopRef.current();
      }
      handleStartRecord();
    }, userActivitySessionDelay * 60 * 1000);
  };

  const handleSendEvents = () => {
    if (events.current.length < 2) return;
    const durationInSeconds =
      (events.current[events.current.length - 1].timestamp - events.current[0].timestamp) / 1000;
    // if (durationInSeconds < (userActivitySessionMinimumDuration || 0.5) * 60) return;
    const activeEvents = events.current.filter((event) => IsMouseClick(event));
    if (!activeEvents.length) return;

    socketClient.send({
      events: events.current,
      host: document.location.origin,
      duration: durationInSeconds,
      activity: activeEvents.length,
    });
    rrweb.record.takeFullSnapshot(true);
  };

  const startRecord = () => setRun(true);
  const stopRecord = () => setRun(false);

  return [startRecord, stopRecord];
};

const IsMouseClick = (event: any) =>
  event.type === 3 && [2].includes(event.data.source) && [2].includes(event.data.type);

const conditionUserActivity: ActivityType = userActivity ? useUserActivity : () => [() => true, () => true];
export default conditionUserActivity;
