export interface ICreateClassSchedule {
  trainerId: string;
  date: string;
  startTime: string;
  createdById: string;
}

export interface ICreateBooking {
  classId: string;
}