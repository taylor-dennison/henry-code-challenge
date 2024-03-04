type Client = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  confirmedAppointmentSlot: ClientAppointmentSlot | null,
}

export default Client