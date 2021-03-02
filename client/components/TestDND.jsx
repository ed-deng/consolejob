import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

function DND() {
  return (
    <div>
      <DragDropContext></DragDropContext>
    </div>
  );
}

export default DND;
