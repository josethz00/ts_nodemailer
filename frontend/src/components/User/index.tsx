import React from 'react';

interface IUser {
    name: string;
    email?: string;
}
interface Props{
    user: IUser;
}

const User : React.FC<Props> = ( { user } )=>{
    return(
        <div>
            <strong>NOME: </strong> <p>{user.name}</p><br />
            <strong>EMAIL: </strong> <p>{user.email}</p><br /><br />
        </div>
    );
}


export default User;