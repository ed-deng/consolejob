export const initialAppliedState = {
  tables: [
    
  ],
};
export const initialInProgressState = {
  tables: [
    
  ],
};
export const initialCompletedState = {
  tables: [
    
  ],
};
export const initialSavedState = {
  tables: [
    
  ],
};
export const columns = {
  1: {
    name: "Applied",
    items: initialAppliedState.tables,
  },
  2: {
    name: "In Progress",
    items: initialInProgressState.tables,
  },
  3: {
    name: "Completed",
    items: initialCompletedState.tables,
  },
  4: {
    name: "Saved",
    items: initialSavedState.tables,
  },
};

export const userInfoState = {
  username: "",
  firstName: "",
  profilePic: "",
  email: "",
};

// export const updateApplied = (state, action) => {
//   switch (action.type) {
//     case "ADD_APPLIED":
//       state.tables.push(action.payload);
//   }
// };

export const updateAppliedStateReducer = (state, action) => {
  switch (action.type) {
    case "APPLIED":
      return {
        ...state,
        tables: action.payload,
      };
    default: {
      return {
        ...state,
        tables: action.payload,
      };
    }
  }
};
export const updateInProgressStateReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TEST":
      return {
        ...state,
        boolean: !state.boolean,
      };
    default: {
      return state;
    }
  }
};
export const updateCompletedStateReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TEST":
      return {
        ...state,
        boolean: !state.boolean,
      };
    default: {
      return state;
    }
  }
};
export const updateSavedStateReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TEST":
      return {
        ...state,
        boolean: !state.boolean,
      };
    default: {
      return state;
    }
  }
};

export const columnsReducer = (state, action) => {
  switch (action.type) {
    case "APPLIED":
      return {
        ...state,
        tables: action.payload,
      };
    default: {
      return state;
    }
  }
};

/*
export const columns = {
  1: {
    name: "Applied",
    items: initialAppliedState.tables,
  },
  2: {
    name: "In Progress",
    items: initialInProgressState.tables,
  },
  3: {
    name: "Completed",
    items: initialCompletedState.tables,
  },
  4: {
    name: "Saved",
    items: initialSavedState.tables,
  },
};

*/
