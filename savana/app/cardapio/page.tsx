"use client";

import { useEffect, useState } from "react";
import { CardProduto } from "../components/moleculas/cardProduto";
import { getToken } from "../services/authService";
import Link from "next/link";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
};

export default function CardapioPage() {
  const [itens, setItens] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  const fetchItens = async () => {
    const response = await fetch("http://localhost:3000/menu");
    const data = await response.json();
    setItens(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    const confirmar = confirm("Tem certeza que deseja excluir este item?");
    if (!confirmar) return;

    await fetch(`http://localhost:3000/menu/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setItens((prev) => prev.filter((i) => i.id !== id));
  };

  useEffect(() => {
    fetchItens();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2 text-white">Cardápio</h1>
      <p className="mb-6 text-white">Confira o nosso cardápio</p>

      {loading ? (
        <p className="text-white">Carregando...</p>
      ) : itens.length === 0 ? (
        <p className="text-white">Nenhum item cadastrado ainda.</p>
      ) : (
        <div className="grid gap-6 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {itens.map((item) => (
            <div key={item.id} data-cy="menu-item" className="flex flex-col items-center gap-2">
              <CardProduto
                image={item.image ? `http://localhost:3000${item.image}` : "/images/comidas/capucino.png"}
                imageAlt={item.name}
                title={item.name}
                description={`${item.description} — R$ ${item.price.toFixed(2)}`}
              />
              {token && (
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Excluir
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Link href="/gerenciamento" className="mt-8">
        <button className="text-white border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition text-sm">
          Voltar ao Gerenciamento
        </button>
      </Link>
    </div>
  );
}