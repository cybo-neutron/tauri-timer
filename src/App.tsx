import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
// import "./App.css";



function App() {

  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState<number | null>(null);

  useEffect(() => {

  }, [])

  return (
    <div className="bg-zinc-900/50 min-h-screen rounded-md p-1" data-tauri-drag-region>
      {/* TitleBar  */}
      <div className="flex w-fit" >
        <div className="bg-red-500 p-1 text-xs h-4 w-4 rounded-full flex justify-center items-center" onClick={() => appWindow.close()}>
          x
        </div>
      </div>
    </div>
  );
}

export default App;
