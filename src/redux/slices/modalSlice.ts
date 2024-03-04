import {PayloadAction,createSlice} from "@reduxjs/toolkit"
import {RootState} from "../store"

// Define a type for the slice state
export interface IModalState {
  open: boolean,
  title: string,
  message: string,
  dismissText: string,
}

// Define the initial state using that type
const initialState: IModalState = {
  open: false,
  title: "",
  message: "",
  dismissText: "",
}

export const modalSlice = createSlice({
  name: "modals",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    showModal: (state, action: PayloadAction<Partial<IModalState>>) => {
      return {
          ...state,
          open: true,
          ...action.payload,
      }
    },
    hideModal: () => {
      return {
         ...initialState,
      }
    },
  },
})

export const {
  showModal,
  hideModal,
} = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectModalState = (state: RootState) => state.modal

export default modalSlice.reducer
