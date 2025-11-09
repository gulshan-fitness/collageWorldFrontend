'use client';

import { useState, useContext } from 'react';
import { Context } from '../../../Context_holder';
import AnimatedText from '../components/extra/animation-charctor/index';
import { XMarkIcon, CheckBadgeIcon, AcademicCapIcon, UsersIcon, StarIcon, ClockIcon } from '@heroicons/react/24/outline';

const PremiumPopup = () => {
  const [show, setShow] = useState(true);
  const { setuserSignUp_popup, user } = useContext(Context);

  const expiresIn = 30;

  const close = () => setShow(false);
  const claim = () => {
    if (!user) setuserSignUp_popup(true);
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      {/* Fullscreen centered overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
        
        {/* Responsive glass card */}
        <div 
          className="relative w-full max-w-md mx-auto bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/40 
                     flex flex-col max-h-[90vh] overflow-hidden animate-bounceIn"
        >
          {/* Gradient top bar */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 pt-6 pb-20"> {/* pb-20 to make room for sticky CTA */}

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                  Seq‑Intaxour & New Life
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium text-gray-500">Exclusive</span>
                  <div className="flex items-center gap-1 px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-rose-500 rounded-full animate-pulse">
                    <ClockIcon className="w-3 h-3" />
                    {expiresIn}s
                  </div>
                </div>
              </div>
              <button
                onClick={close}
                className="p-1 rounded-full hover:bg-gray-100 transition-all hover:scale-110"
                aria-label="Close"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Hero Offer */}
            <div className="text-center mb-5">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Get Up To</p>
              <div className="mt-1 text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                $20,000
              </div>
              <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-full">
                <CheckBadgeIcon className="w-3.5 h-3.5" />
                Subsidy* (Cashback)
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: AcademicCapIcon, value: '80+', label: 'Speed' },
                { icon: UsersIcon, value: '1 Lakh+', label: 'Trusted' },
                { icon: StarIcon, value: '500+', label: 'Mentors' },
                { icon: StarIcon, value: '4.8/5', label: 'Rating', extra: '(3K)' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-3 bg-white/70 rounded-xl border border-white/50">
                  <item.icon className="w-5 h-5 mb-1 text-indigo-600" />
                  <div className="text-lg font-bold text-gray-900">{item.value}</div>
                  <div className="text-xs text-gray-600">{item.label}</div>
                  {item.extra && <div className="text-xs text-gray-400">{item.extra}</div>}
                </div>
              ))}
            </div>

            {/* Programs */}
            <div className="space-y-2 mb-5">
              {[
                { title: 'Online MBA', desc: '1 Year Online' },
                { title: 'Distance MBA', desc: 'Executive Program' },
                { title: 'Online Global', desc: 'Compare 37 Now' },
              ].map((p, i) => (
                <div key={i} className="flex justify-between items-center p-2.5 bg-white/60 rounded-lg border border-white/40 text-sm">
                  <span className="font-bold text-gray-800">{p.title}</span>
                  <span className="text-xs text-gray-500">{p.desc}</span>
                </div>
              ))}
            </div>

            {/* Comparison */}
            <div className="text-center">
              <p className="text-xs font-bold text-gray-600 mb-2">Compare Programs:</p>
              <div className="grid grid-cols-5 gap-1 text-xs">
                {['10', '15', '18', '4', '37'].map((n, i) => (
                  <div key={i} className="p-1.5 bg-gray-50 rounded border">
                    <div className="font-bold text-gray-700">Compare {n}</div>
                    <div className="text-gray-500 text-[10px]">{i === 1 ? '3Y' : i === 4 ? '1-2Y' : '2Y'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Premium CTA */}
          <div className="sticky bottom-0 left-0 right-0 p-6 pt-4 bg-gradient-to-t from-white/95 to-white/80 backdrop-blur-xl border-t border-white/50">
            <button
              onClick={claim}
              className="relative w-full overflow-hidden text-lg font-bold text-white rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-3.5 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] focus:ring-4 focus:ring-purple-500/30"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <AnimatedText course_name={user?.course} setShowPopup={setShow} />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shimmer" />
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes bounceparameterIn {
          0% { opacity: 0; transform: scale(0.8) translateY(-10px); }
          60% { transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .animate-bounceIn { animation: bounceIn 0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </>
  );
};

export default PremiumPopup;