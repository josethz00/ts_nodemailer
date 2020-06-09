import nodemailer from 'nodemailer';

interface IMailTo{
    name: string;
    email: string;
}
interface IMailFrom{
    service: string;
    emailSender: string;
    pass :string;
}
interface IMailMessage{
    subject: string;
    body: string;
    attachment ?: Array<string>;
}
interface IMessageDTO {
    from: IMailFrom;
    to: IMailTo;
    message: IMailMessage;
}

interface IEmailService{
    sendMail(request: IMessageDTO) : void 
}

class EmailService implements IEmailService{

    sendMail( { from, to , message } : IMessageDTO ){
        const sender = nodemailer.createTransport({
            service: from.service,
            auth: {
              user: from.emailSender,
              pass: from.pass
            }
        });
        const mailOptions = {
            from: from.emailSender,
            to: to.email,
            subject: message.subject,
            text: message.body
        };

        sender.sendMail(mailOptions, (error, info)=>{
            if (error) {
              console.log(error);
            } else {
                console.log(`E-mail enviado de ${from.emailSender}, para ${to.name}: ${message.subject}`);
            }
        });
        
    }
}

export default EmailService;
