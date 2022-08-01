import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Client } from "@heroiclabs/nakama-js";

function App() {
  const [isHit, setIsHit] = useState(false);
  const setTimeOutRef = useRef(null);

  useEffect(() => {

    var useSSL = false;
    var client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);
  
    client.authenticateCustom("test_id").then(session => {
      console.log(session);
    })

  }, []);
  

  useEffect(() => {
    window.pc.app.on("boxHit", listener);

    return () => {
      window.pc.app.off("boxHit", listener);
    };

    //  window.addEventListener("message", listener);
    //
    //  return () => {
    //    window.removeEventListener("message", listener);
    //  }
  }, []);

  const listener = (event) => {
    //if(event.origin !== "http://localhost:3000")
    //  return;

    clearTimeout(setTimeOutRef.current);

    //if(event.data.type === "boxHit") {
    setIsHit(true);
    setTimeOutRef.current = setTimeout(() => {
      setIsHit(false);
    }, 1000);
    //}
  };

  return (
    <div className="App">
      {isHit && <div className="Popup">Box is hit!!!</div>}
    </div>
  );
}

export default App;
