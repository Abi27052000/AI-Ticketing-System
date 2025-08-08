import { useState } from "react";
import { Button } from "@/components/ui/button";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to AI Ticketing System
        </h1>
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
