'use client';
import { FormEvent, useState } from "react";

export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) =>{
        e.preventDefault();
        setMessage(null);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/`,
                {
                    method: 'POST',
                    headers: { 'Content-type': "application/json"},
                    body: JSON.stringify({
                        email,
                        username: email,
                        password,
                        re_password: password,
                    }),
                }
            );
            if (res.ok){
                setMessage('Регистрация прошла успешно!');
            }else{
                const data = await res.json();
                setMessage('Ошибка');
            }
            }
            catch (err){
                setMessage('Ошибка сети')
            }
    };
    return(
        <main style={{padding: 40}}>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Ваш Email или имя пользователя"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Ваш пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Зарегаться</button>
            </form>
            {message && <p>{message}</p>}
        </main>
    );
}
