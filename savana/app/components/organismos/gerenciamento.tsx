import { Button } from "../atomos/button";
import Link from "next/link";

export const Gerenciamento = () => {
  return (
    <div data-cy="gerenciamento" className="flex flex-col justify-around rounded-sm gap-6 p-16 bg-backgroundClaro">
      
      <Link href="/cadastro/animal">
        <Button>Cadastrar Animal</Button>
      </Link>

      <Link href="/cadastro/produto">
        <Button>Cadastrar Produtos</Button>
      </Link>

      <Link href="/adocao">
        <Button>Visualizar Animais</Button>
      </Link>

      <Link href="/cardapio">
        <Button>Visualizar Cardápio</Button>
      </Link>

      <Link href="/usuarios">
        <Button>Visualizar Usuários</Button>
      </Link>
      
    </div>
  );
};