import { appWindow } from "@tauri-apps/api/window";
import { useCallback, useEffect, useState } from "react";
// import "./App.css";
// import { Play } from 'lucide-react';
import { PlayCircle, PauseCircle, StopCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

{/* <PauseCircle absoluteStrokeWidth /> */ }


function App() {

  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState({
    secs: 0,
    mins: 0
  })
  const [timerId, setTimerId] = useState<any>(null);

  const convertTimeToMinsAndSecs = useCallback((value: number) => {

    const secs = value % 60;
    const mins = Math.floor(value / 60);

    return { secs, mins };


  }, [])

  const showNumber = useCallback((num: number) => {
    return num > 10 ? String(num) : '0' + String(num)
  }, [])

  useEffect(() => {

    const { secs, mins } = convertTimeToMinsAndSecs(time);

    setTimer({
      secs,
      mins
    });

    // return () => {
    //   clearInterval(timerId);
    // }

  }, [time])

  useEffect(() => {

    return () => {
      if (timerId) {
        clearInterval(timerId)
      }
    }
  }, [])

  function toggleTimer() {
    if (timerId) {
      console.log("Pause timer")
      clearInterval(timerId);
      setTimerId(null);
      setIsTimerRunning(false);
    } else {
      console.log("Start timer");

      const _timerId = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1 * 1000);
      setTimerId(_timerId);
      setIsTimerRunning(true)
    }

  }

  function stopTimer() {
    if (timerId) {
      setIsTimerRunning(false);
      clearInterval(timerId);
      setTime(0);
      setTimerId(null);
    }
  }

  return (
    <div className="bg-zinc-900 min-h-screen rounded-md  flex flex-col" data-tauri-drag-region>

      <div className="flex justify-between items-center px-2 rounded-md h-screen" data-tauri-drag-region >


        {/* Timer  */}
        <main className="flex items-center gap-2 justify-center" onClick={(e: any) => e.preventDefault()} data-tauri-drag-region>
          <div
            className="cursor-pointer text-zinc-200"
          >
            {/* <Play size={24} color="white" onClick={toggleTimer} /> */}
            {isTimerRunning ?
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><PauseCircle absoluteStrokeWidth onClick={toggleTimer} size={20} className="hover:text-lime-400" /></TooltipTrigger>
                    <TooltipContent> Pause </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger><StopCircle absoluteStrokeWidth onClick={stopTimer} size={20} className="hover:text-lime-400" /></TooltipTrigger>
                    <TooltipContent> Stop </TooltipContent>
                  </Tooltip>



                </TooltipProvider>

              </div>
              :
              <div className="flex">

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <PlayCircle absoluteStrokeWidth onClick={toggleTimer} size={20} className="hover:text-lime-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Start
                    </TooltipContent>
                  </Tooltip>

                </TooltipProvider>
              </div>
            }
          </div>

          <div className="text-lg text-white select-none" data-tauri-drag-region>
            {showNumber(timer.mins)} : {showNumber(timer.secs)}
          </div>
        </main>

        {/* TitleBar  */}
        <div className="flex w-fit" >
          <div className="bg-red-500 p-1 text-xs h-3 w-3 rounded-full flex justify-center items-center" onClick={() => appWindow.close()}>
          </div>
        </div>
      </div>



    </div>
  );
}

export default App;
