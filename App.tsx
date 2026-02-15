
import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  MapPin, 
  Camera, 
  Sparkles, 
  Users, 
  Calendar, 
  Clock, 
  ChevronRight,
  Navigation,
  CheckCircle,
  Gamepad2,
  Ticket,
  Gift,
  Coffee,
  Utensils,
  Menu as MenuIcon,
  Image as ImageIcon,
  ArrowUp,
  X
} from 'lucide-react';
import { VenueFeature, GalleryImage } from './types';
import VibeMeter from './components/VibeMeter';

const features: VenueFeature[] = [
  { id: '1', title: 'Gorilla Dance', description: 'High-energy performance that will set the stage on fire and keep the crowd hyped.', icon: '🦍' },
  { id: '2', title: 'Fun Zone', description: 'Full access to games, challenges, and unlimited entertainment to capture amazing moments.', icon: '🎮' },
  { id: '3', title: 'Wristband Entry', description: 'Secure entry system with exclusive wristbands. No wristband, no entry.', icon: '🎟️' },
  { id: '4', title: 'Surprise Gifts', description: 'Special surprise gifts for all attendees to make the night truly memorable.', icon: '🎁' },
];

const menuData = {
  starters: ['Paneer Tikka', 'Veg Spring Roll', 'Noodles', 'Veg Manchurian (Dry)'],
  mainCourse: ['Dal Makhani', 'Mix Veg', 'Kadai Paneer', 'Jeera Rice', 'Assorted Breads', 'Green Salad', 'Boondi Raita', 'White Sauce Pasta'],
  dessert: ['Gulab Jamun with Ice Cream'],
  drinks: ['Welcome Drink on Arrival']
};

const gallery: GalleryImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200', caption: 'Sky Bar & Restaurant' },
  { id: '2', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800', caption: 'Rooftop White Lounge' },
  { id: '3', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800', caption: 'Night Cityscape' },
  { id: '4', url: 'https://images.unsplash.com/photo-1544145945-f904253db0ad?auto=format&fit=crop&q=80&w=800', caption: 'Floral Indoor Dining' },
  { id: '5', url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=800', caption: 'Play Castle' },
  { id: '6', url: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&q=80&w=800', caption: 'Foam Pit Arena' },
  { id: '7', url: 'https://images.unsplash.com/photo-1551632432-c735e8299921?auto=format&fit=crop&q=80&w=800', caption: 'Trampoline Zone' },
  { id: '8', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800', caption: 'Slam Dunk Zone' },
  { id: '9', url: 'https://images.unsplash.com/photo-1566455430202-6020526a0f44?auto=format&fit=crop&q=80&w=800', caption: 'Slide & Foam' },
  { id: '10', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800', caption: 'Digital Score Board' },
  { id: '11', url: 'https://images.unsplash.com/photo-1520692883391-68fde15f01e8?auto=format&fit=crop&q=80&w=1200', caption: 'The Fun Zone' },
];

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    const targetDate = new Date('2026-03-28T19:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden text-white">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[150px] animate-pulse delay-700"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">A</div>
            <div className="flex flex-col md:flex-row md:items-baseline">
              <span className="text-xl font-bold tracking-tighter uppercase cursor-pointer" onClick={scrollToTop}>AfterParty<span className="text-purple-500">Luxe</span></span>
              <span className="text-[10px] md:text-xs font-medium text-gray-400 lowercase tracking-widest md:ml-2">by ARN</span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
            <a href="#venue" onClick={(e) => scrollToSection(e, 'venue')} className="hover:text-white transition-colors duration-300">Experience</a>
            <a href="#menu" onClick={(e) => scrollToSection(e, 'menu')} className="hover:text-white transition-colors duration-300">Menu</a>
            <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="hover:text-white transition-colors duration-300">Photos</a>
            <a href="#location" onClick={(e) => scrollToSection(e, 'location')} className="hover:text-white transition-colors duration-300">Location</a>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full glass hover:bg-white/10 transition-all border border-white/10"
              aria-label="Open Mobile Menu"
            >
              <MenuIcon size={20} className="text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex items-center z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest animate-bounce">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></span>
              <span>A Production by ARN</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter uppercase">
              The 12th <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                After Party
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              Experience the heart of Bhiwadi's nightlife at Sky Restaurant with Gorilla Dance, Fun Zone access, and a premium buffet.
            </p>

            {/* Countdown Timer */}
            <div className="flex flex-wrap gap-4 py-4">
              <div className="glass px-6 py-4 rounded-[1.5rem] border border-purple-500/20 min-w-[100px] flex flex-col items-center">
                <span className="text-4xl font-black text-white leading-none">{timeLeft.days}</span>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mt-2">Days</span>
              </div>
              <div className="glass px-6 py-4 rounded-[1.5rem] border border-purple-500/20 min-w-[100px] flex flex-col items-center">
                <span className="text-4xl font-black text-white leading-none">{timeLeft.hours}</span>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mt-2">Hours</span>
              </div>
              <div className="glass px-6 py-4 rounded-[1.5rem] border border-purple-500/20 min-w-[100px] flex flex-col items-center">
                <span className="text-4xl font-black text-white leading-none">{timeLeft.minutes}</span>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mt-2">Mins</span>
              </div>
              <div className="glass px-6 py-4 rounded-[1.5rem] border border-purple-500/20 min-w-[100px] flex flex-col items-center bg-purple-500/5">
                <span className="text-4xl font-black text-white leading-none animate-pulse">{timeLeft.seconds}</span>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mt-2">Secs</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button onClick={(e) => scrollToSection(e, 'venue')} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-bold transition-all shadow-xl shadow-purple-600/20 flex items-center space-x-2 group">
                <span>See Experience</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={(e) => scrollToSection(e, 'menu')} className="px-8 py-4 glass hover:bg-white/10 rounded-full font-bold transition-all flex items-center space-x-2">
                <span>Gourmet Menu</span>
                <Utensils size={18} />
              </button>
              <button onClick={(e) => scrollToSection(e, 'gallery')} className="px-8 py-4 glass hover:bg-white/10 rounded-full font-bold transition-all flex items-center space-x-2">
                <span>View Photos</span>
                <ImageIcon size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <Calendar className="text-purple-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Date</p>
                  <p className="font-bold">March 28, 2026</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Ticket className="text-purple-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Entry</p>
                  <p className="font-bold">Wristband Only</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <MapPin className="text-purple-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Venue</p>
                  <p className="font-bold">Sky Restaurant, Genesis</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 glass">
              <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200&auto=format&fit=crop" alt="Party Atmosphere" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <VibeMeter />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Features */}
      <section id="venue" className="py-32 px-6 bg-white/[0.02] z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black uppercase">The <span className="text-purple-500">Experience</span></h2>
              <p className="text-gray-400 max-w-xl">Curated entertainment that goes beyond just music.</p>
            </div>
            <Sparkles className="text-purple-500 animate-pulse hidden md:block" size={48} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.id} className="p-8 rounded-3xl glass border border-white/5 hover:border-purple-500/30 transition-all group">
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Menu Section */}
      <section id="menu" className="py-32 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase">Gourmet <span className="text-purple-500">Selection</span></h2>
            <p className="text-gray-400">Satisfy every craving with our premium buffet.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-[2rem] border border-white/5">
              <div className="flex items-center space-x-3 mb-6">
                <Utensils className="text-purple-500" />
                <h3 className="text-2xl font-bold">Starters</h3>
              </div>
              <ul className="space-y-4">
                {menuData.starters.map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-400">
                    <CheckCircle size={16} className="text-purple-500/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass p-8 rounded-[2rem] border border-purple-500/20 lg:scale-105 bg-purple-500/5">
              <div className="flex items-center space-x-3 mb-6">
                <Utensils className="text-purple-500" />
                <h3 className="text-2xl font-bold">Main Course</h3>
              </div>
              <ul className="space-y-4">
                {menuData.mainCourse.map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-100">
                    <CheckCircle size={16} className="text-purple-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass p-8 rounded-[2rem] border border-white/5">
              <div className="flex items-center space-x-3 mb-6">
                <Coffee className="text-purple-500" />
                <h3 className="text-2xl font-bold">Dessert & More</h3>
              </div>
              <div className="space-y-8">
                <div>
                  <p className="text-xs uppercase text-purple-400 mb-2 font-bold tracking-widest">Dessert</p>
                  <p className="text-gray-100">{menuData.dessert[0]}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-purple-400 mb-2 font-bold tracking-widest">Beverage</p>
                  <p className="text-gray-100">{menuData.drinks[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-32 px-6 bg-white/[0.02] z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase">Capture The <span className="text-purple-500">Moment</span></h2>
            <p className="text-gray-400">Step into Sky Bar, Rooftop Lounge, and the ultimate Fun Zone park.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
            {gallery.map((img, idx) => (
              <div 
                key={img.id} 
                className={`relative overflow-hidden rounded-[2.5rem] group border border-white/10 shadow-2xl
                  ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} 
                  ${idx === 3 ? 'md:row-span-2' : ''} 
                  ${idx === 6 ? 'md:col-span-2' : ''}
                  ${idx === 10 ? 'md:col-span-2' : ''}
                `}
              >
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 backdrop-blur-[2px]">
                  <p className="text-white font-black text-2xl tracking-tighter uppercase leading-none">{img.caption}</p>
                  <div className="w-12 h-1 bg-purple-500 mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-32 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-black uppercase">Find The <br/><span className="text-purple-500">Genesis</span></h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-500/10 rounded-2xl">
                  <MapPin className="text-purple-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Sky Restaurant</h4>
                  <p className="text-gray-400">Genesis Mall, Alwar Bypass Road<br/>Bhiwadi, Rajasthan 301019</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-500/10 rounded-2xl">
                  <Navigation className="text-purple-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Arrival Rules</h4>
                  <p className="text-gray-400">Ample parking available at Genesis Mall. Head to the top floor for Sky Restaurant. Secure entry requires digital wristband QR.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 rounded-[2.5rem] overflow-hidden glass h-[400px] relative group border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3513.565809315357!2d76.84279587524967!3d28.21443427589574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d402652b322a5%3A0x7d28742b667e4367!2sSky%20Restaurant%20Genesis%20Mall!5e0!3m2!1sen!2sin!4v1716300000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              title="Sky Restaurant Map"
            ></iframe>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
               <a 
                 href="https://maps.app.goo.gl/fMn4H6jn7R6QCadA8"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-6 py-3 bg-white text-black font-bold rounded-full shadow-2xl hover:scale-105 transition-transform opacity-90 hover:opacity-100 pointer-events-auto"
               >
                 Open Full Google Maps
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">See You <span className="text-purple-500 italic">There.</span></h2>
            <p className="text-gray-500 text-lg">Get ready for an unforgettable night full of energy, fun, and amazing vibes at Sky Restaurant!</p>
          </div>
          <div className="pt-20 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm gap-8">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-start cursor-pointer" onClick={scrollToTop}>
                <span className="font-bold text-white tracking-tighter uppercase">AfterParty<span className="text-purple-500">Luxe</span></span>
                <span className="text-[10px] text-gray-500 lowercase tracking-widest leading-none">by ARN</span>
              </div>
              <span className="ml-2">© 2026</span>
            </div>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-4 glass hover:bg-white/10 rounded-full shadow-2xl text-purple-400 z-40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
          aria-label="Scroll to Top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;
