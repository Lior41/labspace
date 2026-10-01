"use client";
import { useState, useRef, useEffect, useCallback } from "react";
export function useExperimentClock(duration: number) {
  const [time, setTime] = useState(0),
    [running, setRunning] = useState(false),
    [done, setDone] = useState(false);
  const frame = useRef(0),
    elapsed = useRef(0),
    origin = useRef(0);
  const stop = useCallback(() => {
    cancelAnimationFrame(frame.current);
    setRunning(false);
  }, []);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  useEffect(() => {
    const pause = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", pause);
    return () => document.removeEventListener("visibilitychange", pause);
  }, [stop]);
  function play() {
    cancelAnimationFrame(frame.current);
    if (done) {
      elapsed.current = 0;
      setTime(0);
      setDone(false);
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elapsed.current = duration;
      setTime(duration);
      setDone(true);
      setRunning(false);
      return;
    }
    origin.current = performance.now() - elapsed.current * 1000;
    setRunning(true);
    const tick = (now: number) => {
      elapsed.current = Math.min(duration, (now - origin.current) / 1000);
      setTime(elapsed.current);
      if (elapsed.current >= duration) {
        setRunning(false);
        setDone(true);
      } else frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }
  function finish() {
    cancelAnimationFrame(frame.current);
    elapsed.current = duration;
    setTime(duration);
    setRunning(false);
    setDone(true);
  }
  function reset() {
    cancelAnimationFrame(frame.current);
    elapsed.current = 0;
    setTime(0);
    setRunning(false);
    setDone(false);
  }
  return { time, running, done, play, stop, finish, reset };
}
