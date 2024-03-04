import {createBrowserRouter} from "react-router-dom"
import RootLayout from './layouts'
import {
  ClientHomePage,
  ErrorPage,
  ProviderHomePage,
  ReserveAppointmentPage,
  SignInPage,
  UpdateProviderDefaultAvailabilityPage,
  UpdateSpecificDatesPage,
  WelcomePage
} from "./pages"


export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/signIn/client",
        element: <SignInPage type="client"/>,
      },
      {
        path: "/signIn/provider",
        element: <SignInPage type="provider"/>,
      },
      {
        path: "/provider/home",
        element: <ProviderHomePage />,
      },
      {
        path: "/client/home",
        element: <ClientHomePage />,
      },
      {
        path: "/provider/updateAvailability",
        element: <UpdateProviderDefaultAvailabilityPage />,
      },
      {
        path: "/provider/updateSpecificDates",
        element: <UpdateSpecificDatesPage />,
      },
      {
        path: "/client/reserveAppointment",
        element: <ReserveAppointmentPage />,
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
    ],
  },
])
