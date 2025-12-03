'use client';
import { useEffect, useState } from "react";

interface NewsItem{
    id: number;
    title: string;
    content: string;
    created_at: string;
    author: string;
}
export default function NewsPage(){
    const [news, setNews] = useState<NewsItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() =>{
        const fetchNews = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/news/`,
                        {
                            headers: { Authorization: `Bearer ${localStorage.getItem('access')}`,},
                        }
                    );
                    if (res.ok){
                        const data = await res.json();
                        setNews(data);
                    }else{
                        setError("Ошибка загрузки новостей");
                    }
                    }
                    catch (e){
                        setError('Ошибка сети')
                    }
            };
            fetchNews();
        }, []);

return(
    <main style={{padding: 40}}>
        <h1>Новости</h1>
        <ul>
            {news.map((item) => (
                <li key={item.id}>
                    <strong>{item.title}</strong> ({new Date(item.created_at).toLocaleDateString()})
                    <div>{item.content}</div>
                    <small>Автор: {item.author}</small>
                </li>
            ))}
        </ul>
    </main>
);
}