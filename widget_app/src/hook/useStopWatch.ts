import React from "react";

export type LapTime = {
    id: string;
    time: number;
};

export const useStopwatch = () => {
    const [time, setTime] = React.useState<number>(0);
    const [isRunning, setIsRunning] = React.useState<boolean>(false);
    const [laps, setLaps] = React.useState<LapTime[]>([]);


    const intervalRef = React.useRef<number | null>(null);

    const start = () => {
        if (intervalRef.current) return;

        setIsRunning(true);

        intervalRef.current = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
    };

    const pause = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
    };

    const reset = () => {
        pause();
        setTime(0);
        setLaps([]);
    };

    const saveLap = () => {
        setLaps((prev) => [
            { id: Date.now().toString(), time },
            ...prev,
        ]);
    };

    const deleteLap = (id: string) => {
        setLaps((prev) => prev.filter((lap) => lap.id !== id));
    };

    React.useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return {
        time,
        isRunning,
        laps,
        start,
        pause,
        reset,
        saveLap,
        deleteLap,
    };
};