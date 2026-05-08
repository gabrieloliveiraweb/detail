/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Droplets, 
  ShieldCheck, 
  Sparkles, 
  Car, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Star, 
  ChevronDown, 
  ChevronUp,
  Award,
  Zap,
  Menu,
  X
} from 'lucide-react';

// --- Types ---
interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  benefits: string[];
}

interface Testimonial {
  name: string;
  car: string;
  content: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

// --- Data ---
const BRANDS = [
  'https://www.carlogos.org/car-logos/porsche-logo.png',
  'https://www.carlogos.org/car-logos/ferrari-logo.png',
  'https://www.carlogos.org/car-logos/lamborghini-logo.png',
  'https://www.carlogos.org/car-logos/mercedes-benz-logo.png',
  'https://www.carlogos.org/car-logos/bmw-logo.png',
  'https://www.carlogos.org/car-logos/audi-logo.png'
];

const SERVICES: Service[] = [
  {
    icon: Droplets,
    title: 'Higienização Interna',
    description: 'Limpeza térmica profunda com remoção de fungos e bactérias para garantir saúde a bordo.',
    benefits: ['Ação antibacteriana', 'Limpeza de Carpetes', 'Higiene completa']
  },
  {
    icon: Award,
    title: 'Polimento Técnico',
    description: 'Correção de pintura detalhada para restaurar a clareza e brilho espelhado do verniz.',
    benefits: ['Correção total', 'Corte e Refino', 'Acabamento fino']
  },
  {
    icon: ShieldCheck,
    title: 'Vitrificação',
    description: 'Proteção cerâmica de alta resistência que blinda o veículo contra agentes externos.',
    benefits: ['Dureza 9H', 'Proteção UV', 'Repelência extrema']
  },
  {
    icon: Zap,
    title: 'Detalhamento de Motor',
    description: 'Limpeza técnica segura com proteção de componentes eletrônicos e verniz de motor.',
    benefits: ['Descontaminação', 'Verniz Protetor', 'Segurança total']
  },
  {
    icon: Sparkles,
    title: 'Lavagem Técnica',
    description: 'Processo meticuloso com produtos de pH neutro e técnicas que evitam micro-riscos.',
    benefits: ['Pincelamento', 'Secagem segura', 'Proteção básica']
  },
  {
    icon: Car,
    title: 'Detalhamento de Motos',
    description: 'Cuidado técnico completo em motor, chassi e carenagem com proteção de metais.',
    benefits: ['Precisão total', 'Proteção de metais', 'Brilho em detalhes']
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ricardo Almeida',
    car: 'Porsche 911 Carrera',
    content: 'O cuidado com os detalhes é impressionante. Meu carro saiu da Elite Detail parecendo melhor do que quando tirei da concessionária.',
    rating: 5
  },
  {
    name: 'Juliana Mendes',
    car: 'BMW X5',
    content: 'Fiz a vitrificação e a higienização interna. O atendimento é impecável e o resultado final superou todas as minhas expectativas.',
    rating: 5
  },
  {
    name: 'Marcos Silveira',
    car: 'Audi RS6',
    content: 'Profissionais de alto nível. É difícil encontrar alguém em Curitiba que trabalhe com tanta paixão e técnica pelo que faz.',
    rating: 5
  }
];

const FAQS: FAQ[] = [
  {
    question: 'Quanto tempo demora um polimento completo?',
    answer: 'Dependendo do estado da pintura, o processo leva de 1 a 2 dias úteis para garantir a cura total dos produtos e a perfeição no acabamento.'
  },
  {
    question: 'Qual a diferença entre cera e vitrificação?',
    answer: 'A cera é uma proteção temporária (semanas), enquanto a vitrificação cria uma camada cerâmica permanente de alta dureza que dura anos.'
  },
  {
    question: 'Vocês atendem carros populares ou apenas luxo?',
    answer: 'Atendemos todos os tipos de veículos que buscam um padrão de estética superior. O cuidado e a técnica são os mesmos para qualquer projeto.'
  },
  {
    question: 'Como faço para agendar um horário?',
    answer: 'Você pode agendar diretamente pelo nosso WhatsApp ou visitando nossa oficina em Curitiba para uma avaliação técnica.'
  },
  {
    question: 'A vitrificação protege contra riscos de chave?',
    answer: 'A vitrificação protege contra micro-riscos de lavagem e agentes químicos, mas riscos intencionais profundos exigem a proteção PPF.'
  },
  {
    question: 'Onde vocês estão localizados em Curitiba?',
    answer: 'Estamos localizados em um ponto estratégico para fácil acesso, contando com segurança 24h e ambiente climatizado para os serviços.'
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-dark/95 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow flex items-center justify-center shrink-0">
            <Car className="text-dark w-6 h-6" />
          </div>
          <span className="font-display text-2xl font-black tracking-tight uppercase">
            Detail
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {['Início', 'Serviços', 'Portfolio', 'Depoimentos', 'Sobre', 'FAQ'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace('í', 'i')}`} 
              className="text-[11px] uppercase tracking-[0.2em] font-bold hover:text-yellow transition-colors"
            >
              {item}
            </a>
          ))}
          <a href="https://wa.me/5541999999999" className="button-yellow py-2 px-6 text-[10px]">Agendar</a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-charcoal border-b border-white/10 px-8 py-10 flex flex-col gap-6 md:hidden overflow-hidden"
          >
            {['Início', 'Serviços', 'Resultados', 'Depoimentos', 'FAQ', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace('í', 'i')}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-display uppercase tracking-[0.3em]"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const PortfolioMarquee = () => {
  const images = [
    'https://images.unsplash.com/photo-1620807538965-021966a33758?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800',
  ];

  return (
    <div className="py-20 bg-dark overflow-hidden border-y border-white/5" id="portfolio">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <SectionHeading subtitle="Smartphone Shots">Resultados Reais</SectionHeading>
        <div className="hidden md:flex gap-4 mb-20">
           <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40"><ChevronDown className="rotate-90" size={16} /></div>
           <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40"><ChevronDown className="-rotate-90" size={16} /></div>
        </div>
      </div>
      <div className="flex gap-4">
        <motion.div 
          animate={{ x: [0, -1200] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 items-center flex-nowrap"
        >
          {[...images, ...images].map((img, i) => (
            <div key={i} className="w-[280px] h-[500px] md:w-[350px] md:h-[600px] overflow-hidden rounded-[30px] border border-white/10 group flex-shrink-0 relative">
               <img src={img} alt="Portfolio car" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <span className="text-yellow text-[10px] uppercase font-bold tracking-widest mb-2">Curitiba • PR</span>
                  <h4 className="text-lg font-black uppercase italic tracking-tighter">Premium Finish</h4>
               </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const TestimonialMarquee = () => {
  const testimonialsWithVerified = TESTIMONIALS.map(t => ({...t, verified: true}));
  
  return (
    <div className="py-40 bg-charcoal overflow-hidden relative" id="depoimentos">
       {/* Background accent */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-yellow/5 blur-[120px] pointer-events-none rounded-full" />
       
       <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-yellow text-[10px] uppercase font-black tracking-[0.4em] mb-4 block">Depoimentos Reais</span>
              <h2 className="text-4xl md:text-7xl font-extrabold uppercase leading-[0.9] tracking-tighter italic">O que nossos <br /> <span className="text-white">clientes dizem</span></h2>
            </div>
            <p className="text-white/40 text-sm max-w-xs font-light">Mais de 250 avaliações com nota máxima no Google. Confira a experiência de quem já passou por aqui.</p>
          </div>
       </div>

       <div className="flex">
         <motion.div
           animate={{ x: [0, -1500] }}
           transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
           className="flex gap-8 px-4"
         >
           {[...testimonialsWithVerified, ...testimonialsWithVerified, ...testimonialsWithVerified].map((t, i) => (
             <div key={i} className="w-[350px] md:w-[450px] bg-[#0c0c0c] border border-white/5 p-10 md:p-12 rounded-[40px] flex flex-col relative shrink-0">
                <div className="absolute top-10 right-10 opacity-10">
                   <svg className="w-16 h-16 fill-yellow" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5C12.017 4.44772 12.4647 4 13.017 4H19.017C20.6739 4 22.017 5.34315 22.017 7V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.9124 16 4.01697 16H7.01697C7.56925 16 8.01697 15.5523 8.01697 15V9C8.01697 8.44772 7.56925 8 7.01697 8H3.01697C2.46468 8 2.01697 8.44772 2.01697 9V11C2.01697 11.5523 1.56925 12 1.01697 12H0.0169715V5C0.0169715 4.44772 0.464687 4 1.01697 4H7.01697C8.67383 4 10.017 5.34315 10.017 7V15C10.017 18.3137 7.33068 21 4.01697 21H2.01697Z" /></svg>
                </div>
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={12} className="fill-yellow text-yellow" />)}
                </div>
                <p className="text-white/70 text-lg md:text-xl font-light italic leading-relaxed mb-12">"{t.content}"</p>
                
                <div className="pt-8 border-t border-white/5 mt-auto flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-charcoal border border-white/10 flex items-center justify-center font-black text-yellow text-sm">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-white">{t.name}</h4>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{t.verified ? 'Cliente Verificado' : t.car}</span>
                  </div>
                </div>
             </div>
           ))}
         </motion.div>
       </div>
    </div>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-20">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-10 h-[2px] bg-yellow" />
      <span className="text-yellow text-[10px] tracking-[0.4em] uppercase font-black">{subtitle}</span>
    </div>
    <h2 className="text-4xl md:text-6xl font-extrabold uppercase leading-[1] tracking-tighter max-w-4xl italic">
      {children}
    </h2>
  </div>
);

const WhatsAppButton = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-[100] group flex items-center gap-4"
    >
      <div className="bg-dark/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none hidden md:block">
         <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white">Solicitar Orçamento</span>
      </div>
      <a 
        href="https://wa.me/5541999999999" 
        target="_blank" 
        rel="noreferrer"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white whatsapp-shadow animate-pulse-green hover:scale-110 transition-all"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </motion.div>
  );
};

const AccordionItem: React.FC<{ faq: FAQ, isOpen: boolean, onToggle: () => void }> = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button 
        className="w-full py-6 flex justify-between items-center text-left hover:text-yellow transition-colors"
        onClick={() => onToggle()}
      >
        <span className="text-xl md:text-2xl font-display uppercase tracking-tight">{faq.question}</span>
        {isOpen ? <ChevronUp className="text-yellow" /> : <ChevronDown className="text-white/40" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pb-6 text-white/60 leading-relaxed font-light"
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BrandSlider = () => {
  return (
    <div className="py-12 bg-dark border-y border-white/5 overflow-hidden">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 items-center whitespace-nowrap"
      >
        {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
          <img key={i} src={brand} alt="Brand" className={`h-10 opacity-40 grayscale hover:opacity-100 transition-all duration-500 hover:grayscale-0 brightness-[2] contrast-[1.2]`} referrerPolicy="no-referrer" />
        ))}
      </motion.div>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <main className="relative overflow-x-hidden" id="inicio">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center pt-20 overflow-hidden px-6 md:px-12">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 bg-[#0a0a0a] z-0">
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="absolute inset-y-0 right-0 w-full md:w-2/3 bg-cover bg-center grayscale opacity-40 md:opacity-60"
          >
            <img 
              src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=2000" 
              alt="Luxury detail car" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Dynamic Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-[#050505] z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <div className="mb-8 flex items-center gap-3">
               <span className="text-yellow text-[10px] tracking-[0.4em] uppercase font-bold">Estética Automotiva em Curitiba</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-8 italic">
              Para quem <br />
              <span className="text-white">Busca Qualidade</span>
            </h1>
            <p className="max-w-xl text-lg text-white/50 mb-10 font-light leading-relaxed">
              Serviços premium que valorizam seu investimento. Detalhamento, proteção e revitalização com tecnologia de ponta.
            </p>
            <div className="flex">
              <a href="https://wa.me/5541999999999" className="button-yellow">
                Solicitar Orçamento
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <BrandSlider />

      {/* Services Grid */}
      <section className="py-32 px-6 bg-[#050505]" id="servicos">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Especialidades">Serviços</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-charcoal p-10 rounded-[40px] border border-white/5 group hover:border-yellow/20 transition-all duration-500 relative flex flex-col"
              >
                <service.icon className="w-10 h-10 text-yellow mb-8" strokeWidth={1} />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4">{service.title}</h3>
                <p className="text-white/40 font-light leading-relaxed mb-8 text-sm h-auto md:h-12">{service.description}</p>
                
                <div className="flex flex-col gap-3 mb-10">
                  {service.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-white/60">
                      <ShieldCheck className="w-3 h-3 text-yellow" />
                      {benefit}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-white/5">
                   <a href="https://wa.me/5541999999999" className="w-full py-4 bg-white/5 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-yellow hover:text-dark transition-all">
                      Solicitar Orçamento 
                      <Zap size={14} className="fill-current" />
                   </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PortfolioMarquee />

      {/* Why Choose Us */}
      <section className="py-32 px-6 bg-dark relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="text-yellow text-[10px] uppercase font-black tracking-[0.4em] mb-6 block">Diferenciais</span>
            <h2 className="text-4xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-8 italic">
              A Excelência em <br /> <span className="text-white">Cada Centímetro</span>
            </h2>
            <p className="text-white/40 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Na Detail, transformamos a manutenção do seu veículo em uma experiência de alta performance. Combinamos tecnologia de ponta com o toque artesanal que só quem é apaixonado por carros pode oferecer.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
             {[
               { title: 'Protocolo de Elite', desc: 'Processos técnicos padronizados para resultados previsíveis e acabamento impecável em cada etapa.', icon: ShieldCheck, span: 'md:col-span-4' },
               { title: 'Química Avançada', desc: 'Uso exclusivo de produtos biodegradáveis e selantes premium.', icon: Droplets, span: 'md:col-span-2' },
               { title: 'Foco no Detalhe', desc: 'Atenção dedicada e técnica especializada em cada componente.', icon: Sparkles, span: 'md:col-span-2' },
               { title: 'Certificação Tech', desc: 'Profissionais certificados nas melhores escolas do país e em constante atualização tecnológica.', icon: Award, span: 'md:col-span-4' }
             ].map((item, i) => (
               <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-10 rounded-[40px] border border-white/5 transition-all duration-500 hover:border-yellow/20 hover:bg-white/[0.02] group flex flex-col justify-between min-h-[300px] ${item.span}`}
               >
                  <div className="w-16 h-16 bg-yellow/10 rounded-2xl flex items-center justify-center text-yellow shrink-0 group-hover:scale-110 group-hover:bg-yellow group-hover:text-dark transition-all duration-500">
                     <item.icon size={32} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-widest mb-4 italic">{item.title}</h4>
                    <p className="text-sm text-white/40 font-medium leading-relaxed uppercase tracking-tight max-w-md">{item.desc}</p>
                  </div>
               </motion.div>
             ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 flex flex-col items-center gap-10"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-dark bg-charcoal overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                  <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-dark bg-yellow flex items-center justify-center text-xs font-black text-dark">+5k</div>
            </div>
            <a href="https://wa.me/5541999999999" className="button-yellow px-16 py-6 text-sm">Quero agendar meu horário agora</a>
          </motion.div>
        </div>
      </section>

      <TestimonialMarquee />

      {/* FAQ */}
      <section className="py-32 px-6 bg-dark" id="faq">
        <div className="max-w-4xl mx-auto">
          <SectionHeading subtitle="Dúvidas">Perguntas Frequentes</SectionHeading>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem 
                key={`faq-${i}`} 
                faq={faq} 
                isOpen={activeFaq === i} 
                onToggle={() => { setActiveFaq(activeFaq === i ? null : i); }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section className="py-32 px-6 bg-[#111] overflow-hidden" id="sobre">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[40px] overflow-hidden"
            >
               <img 
                  src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1000" 
                  alt="Detail Specialist" 
                  className="w-full aspect-[4/5] object-cover"
                />
               <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading subtitle="Nossa História">Sobre Nós</SectionHeading>
              <p className="text-xl font-light text-white/50 leading-relaxed mb-8">
                A <span className="text-yellow font-bold uppercase italic">Detail</span> é o resultado de anos de dedicação técnica ao detalhamento automotivo premium em Curitiba.
              </p>
              <p className="text-white/40 mb-10 leading-relaxed font-light">
                Estabelecemos novos padrões de qualidade através de processos rigorosos e o uso exclusivo das melhores tecnologias de proteção do mundo. Nosso compromisso é com a perfeição em cada centímetro do seu veículo.
              </p>
              <a href="https://wa.me/5541999999999" className="button-dark rounded-xl">Solicitar Orçamento</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 md:py-48 px-6 relative overflow-hidden" id="contato">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551522435-a13afa10f103?auto=format&fit=crop&q=80&w=2000" 
            alt="Premium Detailing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none text-yellow italic">
              A melhor Estética Automotiva <br className="hidden md:block" /> em Curitiba para quem exige perfeição.
            </h2>
            <div className="flex flex-col gap-8 items-center">
              <a href="https://wa.me/5541999999999" target="_blank" rel="noreferrer" className="button-yellow px-10 md:px-16 py-5 md:py-7 text-xs md:text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-yellow/20">
                Agendar meu serviço agora
              </a>
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] md:text-[11px] uppercase font-black tracking-[0.4em] text-white/40">
                  Referência em Detalhamento Premium
                </p>
                <div className="w-12 h-[2px] bg-yellow" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] pt-32 pb-12 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-yellow flex items-center justify-center shrink-0">
                  <Car className="text-dark w-6 h-6" />
                </div>
                <span className="font-display text-2xl font-black uppercase tracking-tighter">Detail</span>
              </div>
              <p className="text-white/30 text-sm leading-relaxed max-w-sm mb-12 uppercase tracking-tighter">
                Realizamos serviços de estética automotiva em Curitiba com foco em acabamento impecável, proteção e valorização do seu carro.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-yellow hover:text-dark transition-all duration-300">
                  <Instagram size={20} />
                </a>
                <a href="https://wa.me/5541999999999" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-yellow hover:text-dark transition-all duration-300">
                  <Phone size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-yellow mb-10">Fale Conosco</h4>
              <ul className="space-y-6 text-xs text-white/40 font-bold uppercase tracking-widest">
                <li>Segunda a sexta, 8h às 18h.<br />Sábado, 8h às 14h.</li>
                <li className="text-[9px] text-white/20">Atendimento em Curitiba e Região.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-yellow mb-10">Localização</h4>
              <ul className="space-y-6 text-sm text-white/40 font-light">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-yellow shrink-0 mt-1" />
                  <span className="text-xs uppercase font-bold tracking-widest">Av. Batel, 1450 - Batel<br />Curitiba - PR</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-yellow shrink-0" />
                  <span className="text-xs font-black tracking-widest">(41) 9 9999-9999</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-white/20 uppercase font-black tracking-widest text-center md:text-left">
            <p>© 2026 Todos os direitos reservados - desenvolvido por Detail Co.</p>
            <p>Do tecido ao brilho na lataria: o capricho feito pelas mãos.</p>
          </div>
        </div>
      </footer>
      
      <WhatsAppButton />
    </main>
  );
}
