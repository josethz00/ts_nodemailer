import { Request, Response } from 'express';
import EmailService from '../services/EmailService';


class UserController{
  
    
  async index(req: Request, res: Response) {
    return res.json();
  }

  async create(req: Request, res: Response) {
    
    const emailService = new EmailService();
    const { service, emailSender, pass, name, email, subject, body } = req.body;

    emailService.sendMail({
      from: {
        service,
        emailSender,
        pass, 
      },
      to: { 
        name, 
        email,
      },
      message: { 
        subject, 
        body 
      }
    });

    return res.status(200).send(`E-mail enviado de ${emailSender}, para ${name}, o assunto é: ${subject}`);
  }
};

export default UserController;
