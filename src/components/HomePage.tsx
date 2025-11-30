import { useEffect, useState } from "react";
import { Card } from "./Card";
import axios from "axios";

interface Cat {
    id: string;
    tags: string[];
    created_at: string;
    url: string;
    mimetype: string
}

export function HomePage() {
    const [cats, setCats] = useState<Cat[]>([]);

    const fetchCats = async () => {
        const catPromises = Array.from({ length: 20 }, async () => {
            const response = await axios.get('https://cataas.com/cat?type=medium&fit=inside&position=center&json=true');
            return response.data;
        });

        const fetchedCats = await Promise.all(catPromises);
        setCats(fetchedCats);
    }

    useEffect(() => {
        fetchCats();
    }, [])


    return (
        <div className="grid place-items-center min-h-screen">
            <div className="relative w-72 h-96">
                {cats.map((cat) => {
                    return (
                        <Card key={cat.id} url={cat.url} id={cat.id}></Card>
                    )
                })}
            </div>
        </div>
    );
}