'use client';
import Link from 'next/link';
export default function Home() {
  return (
    <main style={{padding:40}}>
      <h1>Главная</h1>
      <p>
        <Link href="/register">Регистрация</Link> |{""}
        <Link href="/login"> Логин</Link> |{""}
        <Link href="/news"> Новости</Link>
      </p>
    </main>
  );
}
