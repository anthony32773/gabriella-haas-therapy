export type Message = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  messageInput: string;
  dateAdded: Date;
  message: {
    subject: string;
    text: string;
  }
  to: string;
};
export type MessageNoEmail = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  messageInput: string;
  dateAdded: Date;
};