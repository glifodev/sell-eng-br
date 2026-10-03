import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <main id="conteudo" className="grid min-h-dvh place-items-center bg-abyss px-5 text-center text-white">
      <div>
        <LogoMark className="mx-auto h-14 w-auto text-white" />
        <p className="eyebrow mt-8 text-white/50">Erro 404</p>
        <h1 className="h-section mt-4">Fora da rota.</h1>
        <p className="mt-4 text-white/60">A página que você procura não existe ou mudou de endereço.</p>
        <Link href="/" className="btn btn-light mt-8">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
