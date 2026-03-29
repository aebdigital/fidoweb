"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseSmoothedNumberOptions = {
  initialValue: number;
  stiffness?: number;
  precision?: number;
};

export function useSmoothedNumber({
  initialValue,
  stiffness = 0.14,
  precision = 0.001,
}: UseSmoothedNumberOptions) {
  const [value, setValue] = useState(initialValue);
  const currentRef = useRef(initialValue);
  const targetRef = useRef(initialValue);
  const frameRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    const delta = targetRef.current - currentRef.current;
    const isSettled = Math.abs(delta) <= precision;
    const nextValue = isSettled ? targetRef.current : currentRef.current + delta * stiffness;

    currentRef.current = nextValue;
    setValue(nextValue);

    if (isSettled) {
      frameRef.current = null;
      return;
    }

    frameRef.current = window.requestAnimationFrame(animate);
  }, [precision, stiffness]);

  const stop = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const setTarget = useCallback(
    (nextValue: number) => {
      targetRef.current = nextValue;

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    },
    [animate]
  );

  const jumpTo = useCallback(
    (nextValue: number) => {
      stop();
      targetRef.current = nextValue;
      currentRef.current = nextValue;
      setValue(nextValue);
    },
    [stop]
  );

  useEffect(() => stop, [stop]);

  return {
    value,
    setTarget,
    jumpTo,
  };
}
