import {PayloadAction,createSlice} from "@reduxjs/toolkit"
import initialProvidersData from '../../data/providersData'
import {DailySchedule,Provider,ProviderAppointmentSlot,TimeRange} from '../../types'
import {RootState} from "../store"

// Define a type for the slice state
export interface IProviderState {
  providers: Provider[],
  currentProvider: Provider | null,
}

// Define the initial state using that type
const initialState: IProviderState = {
  providers: initialProvidersData,
  currentProvider: null,
}

export const providersSlice = createSlice({
  name: "providers",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeDefaultDailyHours: (state, action: PayloadAction<{id: number, ranges: TimeRange[]}>) => {
      const {id,ranges} = action.payload
      const activeProviderIndex = state.providers.findIndex(provider => provider.id === id)

      return {
        ...state,
        currentProvider: {
          ...state.providers[activeProviderIndex],
          defaultDailyHours: ranges,
        },
        providers: [
          ...state.providers.slice(0, activeProviderIndex),
          {
            ...state.providers[activeProviderIndex],
            defaultDailyHours: ranges,
          },
          ...state.providers.slice(activeProviderIndex + 1),
        ],
      }
    },
    updateCustomDailySchedule: (state, action: PayloadAction<{id: number, customDailySchedule: DailySchedule}>) => {
      const {id, customDailySchedule} = action.payload
      const activeProviderIndex = state.providers.findIndex(provider => provider.id === id)
      return {
        ...state,
        currentProvider: {
          ...state.providers[activeProviderIndex],
          customDailySchedules: [
            ...state.providers[activeProviderIndex].customDailySchedules,
            {...customDailySchedule},
          ],
        },
        providers: [
          ...state.providers.slice(0, activeProviderIndex),
          {
            ...state.providers[activeProviderIndex],
            customDailySchedules: [
              ...state.providers[activeProviderIndex].customDailySchedules,
              {...customDailySchedule},
            ],
          },
          ...state.providers.slice(activeProviderIndex + 1),
        ],
      }
    },
    updateCurrentProvider: (state, action: PayloadAction<{provider: Provider}>) => {
      return {
        ...state,
        currentProvider: action.payload.provider,
      }
    },
    createBookedAppointmentSlot: (state, action: PayloadAction<{providerId: number, bookedAppointmentSlot: ProviderAppointmentSlot}>) => {
      const {providerId, bookedAppointmentSlot} = action.payload
      const activeProviderIndex = state.providers.findIndex(provider => provider.id === providerId)
      return {
        ...state,
        currentProvider: {
          ...state.providers[activeProviderIndex],
          bookedAppointmentSlots: [
            ...state.providers[activeProviderIndex].bookedAppointmentSlots,
            {...bookedAppointmentSlot},
          ],
        },
        providers: [
          ...state.providers.slice(0, activeProviderIndex),
          {
            ...state.providers[activeProviderIndex],
            bookedAppointmentSlots: [
              ...state.providers[activeProviderIndex].bookedAppointmentSlots,
              {...bookedAppointmentSlot},
            ],
          },
          ...state.providers.slice(activeProviderIndex + 1),
        ],
      }
    }
  },
})

export const {
  changeDefaultDailyHours,
  updateCustomDailySchedule,
  updateCurrentProvider,
  createBookedAppointmentSlot
} = providersSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProvidersState = (state: RootState) => state.providers

export default providersSlice.reducer
