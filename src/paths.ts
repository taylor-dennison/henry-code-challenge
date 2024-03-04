export const paths: {
  [key: string]: { route: string; handle: string }
} = {
  welcome: {
    route: "/",
    handle: "welcome",
  },
  signIn: {
    route: "/signIn",
    handle: "signIn",
  },
  providerHome: {
    route: "/provider/home",
    handle: "providerHome",
  },
  clientHome: { 
    route: "/client/home",
    handle: "clientHome",
  },
  updateAvailability: {
    route: "/provider/updateAvailability",
    handle: "updateAvailability",
  },
  updateSpecificDates: {
    route: "/provider/updateSpecificDates",
    handle: "updateSpecificDates",
  },
  reserveAppointment: {
    route: "/client/reserveAppointment",
    handle: "reserveAppointment",
  },
  error: {
    route: "/error",
    handle: "error",
  },
}
