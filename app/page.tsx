import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Benefits from "@/components/Benefits";
import Process from "@/components/Process";
import CTAForm from "@/components/CTAForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <Benefits />
      <Process />
      <CTAForm />
    </main>
  );
}
