"use client";

import { useEffect, useState } from "react";
import { CardAnimal } from "../components/moleculas/cardAnimal";
import { getToken } from "../services/authService";
import Link from "next/link";

type Pet = {
  id: number;
  name: string;
  species: string;
  age: number;
  breed: string;
  description: string;
  image?: string;
};

export default function AdocaoPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  const fetchPets = async () => {
    const response = await fetch("http://localhost:3000/pets");
    const data = await response.json();
    setPets(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    const confirmar = confirm("Tem certeza que deseja excluir este pet?");
    if (!confirmar) return;

    await fetch(`http://localhost:3000/pets/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setPets((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2 text-white">Nossos Pets</h1>
      <p className="mb-6 text-white">Conheça os animais do Savana Pet Café.</p>

      {loading ? (
        <p className="text-white">Carregando...</p>
      ) : pets.length === 0 ? (
        <p className="text-white">Nenhum pet cadastrado ainda.</p>
      ) : (
        <div className="grid gap-6 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {pets.map((pet) => (
            <div key={pet.id} data-cy="pet-item" className="flex flex-col items-center gap-2">
              <CardAnimal
                image={pet.image ? `http://localhost:3000${pet.image}` : "/images/animais/smiliguido.png"}
                imageAlt={pet.name}
                title={pet.name}
                description={pet.description}
                especie={pet.species}
                sexo="Não informado"
                idade={`${pet.age} anos`}
                raca={pet.breed}
              />
              {token && (
                <button
                  onClick={() => handleDelete(pet.id)}
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