'use client'
import { FormEvent, useState } from "react";
import {useRouter} from 'next/navigation';

export default function loginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();
    const handleSubmit = async (e: FormEvent) =>{
        e.preventDefault();
        setMessage(null);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt/create/`,
                {
                    method: 'POST',
                    headers: { 'Content-type': "application/json"},
                    body: JSON.stringify({
                        username: email,
                        password,
                    }),
                }
            );
            if (res.ok){
                const data = await res.json();
                localStorage.setItem('access', data.access);
                setMessage('Успешный вход!');
                router.push('/news')
            }else{
                const data = await res.json();
                setMessage('Ошибка входа');
            }
            }
            catch (err){
                setMessage('Ошибка сети')
            }
    };
    return(
        <main style={{padding: 40}}>
            <h1>Логин</h1>
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
                <button type="submit">Войти</button>
            </form>
            {message && <p>{message}</p>}
        </main>
    );
}