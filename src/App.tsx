/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, ShoppingCart, User, Globe, ShieldCheck, Zap, Headset, ArrowRight, Star, Heart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import ChatBot from "./components/ChatBot";
import Globe3D from "./components/Globe";

const languages = [
// ... existing languages ...
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ht', name: 'Kreyòl', flag: '🇭🇹' },
];

const featuredProducts = [
// ... existing products ...
  {
    id: 1,
    name: "AeroPods Pro Gen 2",
    price: 99,
    oldPrice: 129,
    image: "https://images.unsplash.com/photo-1588423770574-f1093f66a147?auto=format&fit=crop&w=400&q=80",
    tag: "99$",
    rating: 4.9
  },
  {
    id: 2,
    name: "Titanium Watch Ultra",
    price: 249,
    oldPrice: 349,
    image: "https://images.unsplash.com/photo-1544117518-30dd5ff7a4b0?auto=format&fit=crop&w=400&q=80",
    tag: "BEST DEAL",
    rating: 4.8
  },
  {
    id: 3,
    name: "SonicWave Headphones",
    price: 179,
    oldPrice: 249,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    tag: "30% OFF",
    rating: 5.0
  },
  {
    id: 4,
    name: "SmartBand Elite",
    price: 179,
    oldPrice: 229,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=400&q=80",
    tag: "NEW",
    rating: 4.7
  }
];

const bestSellers = [
  {
    id: 5,
    name: "TurboBlend Portable",
    price: 49,
    oldPrice: 79,
    image: "https://images.unsplash.com/photo-1570222020676-00dc3d170412?auto=format&fit=crop&w=400&q=80",
    tag: "BEST SELLER",
    rating: 4.6
  },
  {
    id: 6,
    name: "ZenBuds Noise Cancel",
    price: 129,
    oldPrice: 189,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
    tag: "POPULAR",
    rating: 4.9
  },
  {
    id: 7,
    name: "Nomad Travel Pack",
    price: 139,
    oldPrice: 199,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    tag: "LIMITED",
    rating: 4.8
  },
  {
    id: 8,
    name: "ActiveBand Pro",
    price: 59,
    oldPrice: 89,
    image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=400&q=80",
    tag: "SALE",
    rating: 4.5
  }
];

export default function App() {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
              E
            </div>
            <span className="text-2xl font-display font-bold tracking-tight text-slate-900">
              ECROSSMAT
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {["Home", "Location", "Shop", "About", "Blog"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-indigo-600 text-white text-[10px] flex items-center justify-center rounded-full">
                2
              </span>
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all">
              <User className="w-5 h-5" />
            </button>

            {/* Language Selector */}
            <div className="relative group/lang">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                <span className="text-lg">{selectedLang.flag}</span>
                <span className="text-xs font-bold uppercase tracking-wider">{selectedLang.code}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsLangOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-20"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLang(lang);
                            setIsLangOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                            selectedLang.code === lang.code ? 'text-indigo-600 font-semibold' : 'text-slate-600'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 h-[800px] flex items-center justify-center overflow-hidden bg-black">
        <Globe3D />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl pointer-events-none"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            L'Élite de la Technologie <br />
            <span className="text-indigo-400">À Votre Portée</span>
          </h1>
          <p className="text-lg text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            Découvrez une sélection exclusive de gadgets premium conçus pour sublimer votre quotidien. 
            Performance, design et innovation réunis dans une seule boutique.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2 group">
              Acheter Maintenant
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-all">
              Voir le Catalogue
            </button>
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Produits Vedettes</h2>
              <p className="text-slate-500">Les dernières innovations technologiques sélectionnées pour vous.</p>
            </div>
            <button className="text-indigo-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Tout voir <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Login Nudge Section */}
      <section className="py-16 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Rejoignez l'Élite Ecrossmat
              </h2>
              <p className="text-slate-400 text-lg mb-0 font-light">
                Créez votre compte aujourd'hui et bénéficiez de <span className="text-indigo-400 font-bold">-10% sur votre première commande</span>, ainsi qu'un accès prioritaire à nos lancements limités.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                Créer mon compte
              </button>
              <button className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all">
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-12 bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: "Livraison Mondiale", desc: "Partout dans le monde" },
              { icon: ShieldCheck, title: "Paiement Sécurisé", desc: "Transactions cryptées" },
              { icon: Zap, title: "Expédition Rapide", desc: "Sous 24/48 heures" },
              { icon: Headset, title: "Support 24/7", desc: "Toujours à votre écoute" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Nos Meilleures Ventes</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Rejoignez des milliers de clients satisfaits qui ont déjà adopté nos produits phares.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Prêt à transformer votre expérience ?
              </h2>
              <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto font-light">
                Ne manquez plus aucune opportunité. Nos membres reçoivent des offres personnalisées, 
                un suivi de commande simplifié et des invitations exclusives.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-10 py-5 bg-white text-indigo-600 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl">
                  S'inscrire gratuitement
                </button>
                <p className="text-indigo-200 text-sm">
                  Déjà membre ? <button className="text-white font-bold hover:underline">Connectez-vous</button>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">E</div>
                <span className="text-xl font-display font-bold">ECROSSMAT</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Votre destination ultime pour les gadgets technologiques de luxe. 
                Nous redéfinissons votre expérience numérique avec style et efficacité.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholder */}
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 bg-slate-800 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer" />
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Boutique</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Nouveautés</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Montres Connectées</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Audio & Son</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessoires</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Informations</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">À Propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Nos Magasins</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog Tech</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Newsletter</h4>
              <p className="text-slate-400 text-sm mb-6">Inscrivez-vous pour recevoir nos offres exclusives et actualités.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="flex-1 bg-slate-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
            <p>© 2026 ECROSSMAT. Tous droits réservés.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions de Vente</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}

function ProductCard({ name, price, oldPrice, image, tag, rating }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all relative"
    >
      <div className="absolute top-6 left-6 z-10">
        <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full shadow-lg">
          {tag}
        </span>
      </div>
      <button className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-rose-500 transition-colors shadow-sm">
        <Heart className="w-4 h-4" />
      </button>

      <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-50">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="px-2">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-[10px] font-bold text-slate-600">{rating}</span>
        </div>
        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{name}</h3>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-indigo-600">{price}€</span>
          <span className="text-sm text-slate-400 line-through">{oldPrice}€</span>
        </div>
      </div>

      <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-semibold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        Ajouter au Panier
      </button>
    </motion.div>
  );
}
