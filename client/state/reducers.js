export const initialAppliedState = {
  tables: [],
};
export const initialInProgressState = {
  tables: [],
};
export const initialCompletedState = {
  tables: [],
};
export const initialSavedState = {
  tables: [],
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
