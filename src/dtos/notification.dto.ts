export type NotificationDTO={
    to: string, // Email of recipient
    subject: string, // Subject of email
    templateID: string, // ID of email template to use 
    params: Record<string,any>, // Parameters to replace in the template
}