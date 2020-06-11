import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import api from './services/api';

import User from './components/User/index';

interface IUser {
  name: string;
  email?: string;
}

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  
  const [mailData, setMailData] = useState({
    service: '',
    emailSender: '',
    pass: ''
  });
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    subject:'',
    body:''
  });


  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target;
    setFormData({
        ...formData, [name]:value
    });
    console.log(formData);

  }  
  function handleSectionChange(event: ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target;
    setMailData({
        ...mailData, [name]:value
    });


  }

  async function handleSubmit( event: FormEvent ){
    event.preventDefault();
    const { service, emailSender, pass } = mailData; 

    const { name, email, subject, body } = formData; 
    const data = {
        service,
        emailSender,
        pass,
        name,
        email, 
        subject,
        body
    }


    await api.post('users', data);
    alert(' E-mail disparado para o destino!');
  }

  useEffect(() => {
    api.get<IUser[]>('users').then(response => {
      setUsers(response.data);
    })
  }, []);

  
  return (
    <div className="App">
       {users.map(user => <User key={user.email} user={user} />) }
       <form onSubmit={handleSubmit}>
           <input type="text" name="service" onChange={handleSectionChange} required/>
           <input type="email" name="emailSender" onChange={handleSectionChange} required/>
           <input type="password" name="pass" onChange={handleSectionChange} required/>
           <input type="text" name="name" onChange={handleInputChange} required/>
           <input type="email" name="email" onChange={handleInputChange} required/>
           <input type="text" name="subject" onChange={handleInputChange} required/>
           <input type="text" name="body"  onChange={handleInputChange} required/>
           <br/>
           <button type="submit">Enviar e-mail</button>
       </form>
    </div>
  );
}

export default App;