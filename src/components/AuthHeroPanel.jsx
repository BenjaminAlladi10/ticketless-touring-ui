import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import loginHero from '@/assets/login-hero.png';

export default function AuthHeroPanel() {
  return (
    <div className="relative hidden w-0 flex-1 lg:block">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={loginHero}
        alt="Taj Mahal at sunset"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60" />

      {/* Back to explore — top-left */}
      <div className="absolute top-10 left-10 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to explore
        </Link>
      </div>

      {/* Hero text — just below the back link */}
      <div className="absolute top-24 left-10 right-10 z-10 space-y-3 text-white">
        <h1 className="text-5xl font-black tracking-tighter leading-tight">
          Rediscover <br />
          <span className="text-primary italic">Heritage.</span>
        </h1>
        <p className="max-w-md text-base text-white/70 leading-relaxed">
          Secure your journey to India's most iconic landmarks with our seamless digital ticketing experience.
        </p>
      </div>
    </div>
  );
}
