import {PayloadAction,createSlice} from "@reduxjs/toolkit"
import initialClientsData from '../../data/clientsData'
import Client from '../../types/client'
import {RootState} from "../store"

// Define a type for the slice state
export interface IClientState {
  currentClient: Client | null,
  clients: Client[],
}

// Define the initial state using that type
const initialState: IClientState = {
  currentClient: null,
  clients: initialClientsData,
}

export const clientsSlice = createSlice({
  name: "clients",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    createClientAppointmentSlot: (
      state,
      action: PayloadAction<{clientEmail: string; providerId: number; startTime: string, date: string}>
    ) => {
      const {clientEmail,providerId,startTime, date} = action.payload
      const activeClientIndex = state.clients.findIndex(client => client.email === clientEmail)
      return {
        ...state,
        currentClient: {
          ...state.clients[activeClientIndex],
          confirmedAppointmentSlot: {
            date,
            startTime,
            createdAt: new Date().toLocaleTimeString(),
            isConfirmed: false,
            providerId,
          }
        },
        clients: [
          ...state.clients.slice(0, activeClientIndex),
          {
            ...state.clients[activeClientIndex],
            confirmedAppointmentSlot: {
              date,
              startTime,
              createdAt: new Date().toLocaleTimeString(),
              isConfirmed: false,
              providerId,
            }
          },
          ...state.clients.slice(activeClientIndex + 1),
        ],
      }
    },
    updateCurrentClient: (state, action: PayloadAction<{currentClient: Client}>) => {
      const {currentClient} = action.payload
      return {
        ...state,
        currentClient,
      }
    }
  },
})

export const {
  createClientAppointmentSlot,
  updateCurrentClient,
} = clientsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectClientsSlice = (state: RootState) => state.clients

export default clientsSlice.reducer
