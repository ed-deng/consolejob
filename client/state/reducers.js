export const initialAppliedState = {
  tables: [
    {
      company: "Facebook",
      position: "",
      status: "",
      questions: "",
      notes: "",
    },
    {
      company: "Amazon",
      position: "",
      status: "",
      questions: "",
      notes: "",
    },
    {
      company: "Google",
      position: "",
      status: "",
      questions: "",
      notes: "",
    },
    {
      company: "Microsoft",
      position: "",
      status: "",
      questions: "",
      notes: "",
    },
    {
      company: "Bloomberg",
      position: "",
      status: "",
      questions: "",
      notes: "",
    },
  ],
};
export const initialInProgressState = {
  tables: [
    {
      company: "Spotify",
      position: "",
      status: "",
      questions: "",
      notes: "",
    },
  ],
};
export const initialCompletedState = {
  tables: [
    {
      company: "Microsoft",
      position: "",
      status: "",
      questions: "",
      notes: "",
    },
  ],
};
export const initialSavedState = {
  tables: [
    {
      company: "Apple",
      position: "",
      status: "",
      questions: "",
      notes: "",
    },
  ],
};

// export const initialTestContext = {
//   boolean: false,
// };

export const userInfoState = {
  username: "",
  firstName: "",
  profilePic: "",
  email: "",
};

export const updateApplied = (state, action) => {
  switch (action.type) {
    case "ADD_APPLIED":
      state.tables.push(action.payload);
  }
};

// export const updateTestReducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE_TEST":
//       return {
//         ...state,
//         boolean: !state.boolean,
//       };
//     default: {
//       return state;
//     }
//   }
// };

export const updateAppliedStateReducer = (state, action) => {
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
