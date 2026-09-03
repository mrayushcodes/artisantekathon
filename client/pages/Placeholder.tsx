import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function Placeholder() {
  const location = useLocation();
  const title = location.pathname.includes("login") ? "Welcome back to ArtisanAI" : location.pathname.includes("buyer") ? "Find your next craft partner" : "Your ArtisanAI workspace";
  const text = location.pathname.includes("login") ? "Sign in is ready for your Supabase Auth connection. For the demo, jump straight into the catalog studio." : "This workspace is part of the ArtisanAI product journey and is ready to connect to your live marketplace data.";
  return <div className="min-h-screen bg-paper text-ink"><header className="border-b border-line bg-white"><div className="mx-auto max-w-7xl px-6 py-5"><Link to="/" className="flex w-fit items-center gap-2 text-xl font-extrabold tracking-[-0.06em]"><span className="grid h-8 w-8 place-items-center rounded-full bg-saffron text-white"><Sparkles size={15} /></span>artisan<span className="text-saffron">AI</span></Link></div></header><main className="mx-auto flex min-h-[75vh] max-w-xl flex-col items-center justify-center px-6 text-center"><div className="eyebrow">Coming together</div><h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em]">{title}</h1><p className="mt-4 leading-7 text-muted">{text}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link to="/" className="rounded-full border border-line bg-white px-5 py-3 text-sm font-bold"><ArrowLeft className="mr-1 inline" size={15} /> Back home</Link><Link to="/artisan/products/new" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Try AI studio <ArrowRight className="ml-1 inline" size={15} /></Link></div></main></div>;
}
