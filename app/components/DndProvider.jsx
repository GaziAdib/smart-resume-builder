"use client";

import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';


const DndProviders = ({children}) => {
const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server side
  }
    return (
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    )
}
export default DndProviders
