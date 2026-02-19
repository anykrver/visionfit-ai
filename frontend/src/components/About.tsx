
import React from 'react';

const About: React.FC = () => {
  const values = [
    {
      title: "Human-Centric",
      desc: "Technology should serve people, not replace them. We prioritize realistic body diversity in every model we train.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: "from-rose-500/10 to-pink-500/10"
    },
    {
      title: "Privacy-First",
      desc: "Your data and your image are yours. We process previews securely in-memory and never store personal biometric data.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: "from-blue-500/10 to-indigo-500/10"
    },
    {
      title: "Sustainable Impact",
      desc: "Every virtual try-on that prevents a return saves 2.4 kg of CO₂. We're on a mission to reduce fashion's environmental footprint.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-emerald-500/10 to-green-500/10"
    },
    {
      title: "Relentless Innovation",
      desc: "Built on Google's Gemini 2.5 Flash — we push the boundaries of what generative AI can do for fashion commerce.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "from-amber-500/10 to-orange-500/10"
    }
  ];

  const milestones = [
    { year: "2024", title: "Founded", desc: "Styll born from the idea that online shopping needs a fitting room." },
    { year: "2024", title: "Seed Round", desc: "Raised initial funding to build the core identity-preserving AI engine." },
    { year: "2025", title: "Gemini Integration", desc: "Partnered with Google to leverage Gemini 2.5 Flash for studio-quality rendering." },
    { year: "2025", title: "100+ Brands", desc: "Onboarded over 100 fashion brands across North America and Europe." },
    { year: "2026", title: "1M+ Try-Ons", desc: "Crossed one million virtual try-on renders served to happy shoppers." },
  ];

  const team = [
    { name: "Rahul Verma", role: "Founder & CEO", avatar: "RV", desc: "AI researcher turned fashion-tech entrepreneur. Believes shopping should be expressive, not stressful." },
    { name: "Priya Sharma", role: "Head of AI", avatar: "PS", desc: "Former Google DeepMind. Pioneered identity-preserving neural rendering techniques." },
    { name: "Alex Chen", role: "Head of Product", avatar: "AC", desc: "10+ years in e-commerce. Previously led product at a major fashion marketplace." },
    { name: "Jordan Okafor", role: "Head of Partnerships", avatar: "JO", desc: "Connecting Styll with the world's leading fashion brands and retailers." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-black tracking-[0.2em] text-zinc-600 mb-8 border border-zinc-200/50 shadow-sm">
                OUR STORY
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-[0.92] mb-8">
                Confidence<br />is <span className="text-zinc-400 italic font-serif font-normal">Personal</span>.
              </h1>
              <p className="text-lg text-zinc-500 font-medium leading-relaxed mb-8 max-w-lg">
                We started Styll with a simple observation: the digital shopping experience hasn't changed in 20 years. We're changing that by bringing the fitting room to your screen.
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-black tracking-tighter">1M+</p>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Try-ons served</p>
                </div>
                <div className="w-px bg-zinc-200"></div>
                <div>
                  <p className="text-3xl font-black tracking-tighter">100+</p>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Brand partners</p>
                </div>
                <div className="w-px bg-zinc-200"></div>
                <div>
                  <p className="text-3xl font-black tracking-tighter">40%</p>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Fewer returns</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop"
                  alt="Fashion and Technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-10">
                  <div className="text-white space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">FOUNDED 2024</p>
                    <h3 className="text-2xl font-bold tracking-tight">Pioneering Generative Fashion</h3>
                    <p className="text-white/60 text-sm font-medium">Where AI meets personal style</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-black rounded-2xl -z-10 opacity-10"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-zinc-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6">OUR MISSION</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-relaxed tracking-tight">
            "To make every online shopper as confident in their purchase as if they'd tried it on in person —
            <span className="text-zinc-400"> while reducing the fashion industry's environmental footprint, one virtual try-on at a time.</span>"
          </h2>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">What We Stand For</h2>
          <p className="text-zinc-500 font-medium leading-relaxed">The principles that guide every decision we make.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, idx) => (
            <div key={idx} className={`relative p-8 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group overflow-hidden hover:-translate-y-1`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-zinc-100 group-hover:bg-white rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-3">{v.title}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-zinc-50 border-y border-zinc-100 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">The Team</h2>
            <p className="text-zinc-500 font-medium leading-relaxed">Fashion veterans and deep-tech engineers building the future of shopping.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-zinc-100 hover:border-zinc-200 p-7 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group text-center hover:-translate-y-1">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">{member.avatar}</span>
                </div>
                <h4 className="font-bold text-base tracking-tight">{member.name}</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 mt-1 mb-3">{member.role}</p>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">Our Journey</h2>
          <p className="text-zinc-500 font-medium leading-relaxed">Key milestones on the path to transforming online fashion.</p>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-200"></div>
          <div className="space-y-2">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative flex items-start gap-6 p-5 rounded-2xl hover:bg-zinc-50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 text-white text-[10px] font-black z-10 group-hover:scale-110 transition-transform duration-300">
                  {m.year}
                </div>
                <div className="pt-1">
                  <h4 className="font-bold text-lg tracking-tight mb-1">{m.title}</h4>
                  <p className="text-sm text-zinc-500 font-medium">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-[3rem] bg-black p-12 md:p-20 text-center">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
              Join Our Mission
            </h2>
            <p className="text-zinc-400 font-medium mb-10 max-w-lg mx-auto leading-relaxed">
              We're always looking for talented people who believe in the power of AI to transform fashion. Let's build the future together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-2xl hover:shadow-white/20 hover:scale-105 transform duration-300">
                View Open Roles
              </button>
              <button className="px-8 py-4 bg-white/10 text-white border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                Contact Us
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
};

export default About;
