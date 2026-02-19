
import React, { useState } from 'react';

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Select Your Outfit",
      desc: "Browse our curated collection or paste a URL from any online store. Our engine works with virtually any garment — dresses, suits, streetwear, or haute couture.",
      detail: "Simply copy a garment image URL from any retailer, or browse the VisionFit curated catalogue. Our AI engine understands garment structure from any angle.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Upload Your Photo",
      desc: "Take a selfie or upload a clear photo. For photorealistic results, use natural lighting and a simple background.",
      detail: "Our body detection engine maps your pose in 3D space — identifying proportions, stance, and lighting conditions for pixel-perfect composition.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "AI Neural Mapping",
      desc: "Gemini 2.5 Flash analyses your body shape, skin tone, and environment to construct a dimensionally-accurate composite.",
      detail: "Identity encoding locks your facial features. Fabric physics simulate real-world draping. Lighting harmonisation matches shadows to your original scene.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "See Yourself — Instantly",
      desc: "In under 15 seconds, receive a studio-quality render of you wearing the garment. Save, share, or purchase with total confidence.",
      detail: "The result is a photorealistic image indistinguishable from a studio photo — your identity preserved, the garment rendered with physical accuracy.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  const techSpecs = [
    { label: "Model", value: "Gemini 2.5 Flash", sub: "Multimodal Foundation" },
    { label: "Latency", value: "< 15s", sub: "Average render time" },
    { label: "Accuracy", value: "98.2%", sub: "Identity preservation" },
    { label: "Resolution", value: "1024px", sub: "Output quality" },
  ];

  const pipeline = [
    { stage: "Identity Lock", desc: "Facial features encoded and frozen", color: "bg-emerald-500" },
    { stage: "Pose Estimation", desc: "3D body mapping in world space", color: "bg-blue-500" },
    { stage: "Garment Analysis", desc: "Fabric type, cut & draping physics", color: "bg-violet-500" },
    { stage: "Neural Composition", desc: "Identity-preserving image synthesis", color: "bg-amber-500" },
    { stage: "Light Harmonisation", desc: "Shadow & highlight matching", color: "bg-rose-500" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-black tracking-[0.2em] text-zinc-600 mb-8 border border-zinc-200/50 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              HOW IT WORKS
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black leading-[0.92] mb-8">
              Four Steps to<br />
              <span className="text-zinc-400 italic font-serif font-normal">Perfect</span> Fit.
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 max-w-2xl font-medium leading-relaxed">
              Our identity-preserving AI pipeline transforms any garment into a photorealistic try-on in under 15 seconds — no downloads, no apps, no fuss.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Steps */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Step selector */}
          <div className="space-y-2">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-500 group ${activeStep === idx
                    ? 'bg-black text-white shadow-2xl shadow-black/20 scale-[1.02]'
                    : 'bg-white hover:bg-zinc-50 border border-zinc-100 hover:border-zinc-200'
                  }`}
              >
                <div className="flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${activeStep === idx ? 'bg-white/15' : 'bg-zinc-100 group-hover:bg-zinc-200'
                    }`}>
                    <span className={activeStep === idx ? 'text-white' : 'text-black'}>{step.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-[10px] font-black tracking-widest ${activeStep === idx ? 'text-white/50' : 'text-zinc-300'
                        }`}>STEP {step.number}</span>
                    </div>
                    <h3 className={`text-lg font-bold tracking-tight mb-1 ${activeStep === idx ? 'text-white' : 'text-black'
                      }`}>{step.title}</h3>
                    <p className={`text-sm font-medium leading-relaxed ${activeStep === idx ? 'text-white/70' : 'text-zinc-500'
                      }`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Detail panel */}
          <div className="sticky top-24">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-10 md:p-14 min-h-[420px] flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center text-white">
                    {steps[activeStep].icon}
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-white/40">STEP {steps[activeStep].number}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-6">
                  {steps[activeStep].title}
                </h2>
                <p className="text-white/60 font-medium leading-relaxed text-base max-w-md">
                  {steps[activeStep].detail}
                </p>
              </div>
              <div className="flex gap-1.5 mt-10">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${activeStep === idx ? 'w-10 bg-white' : 'w-4 bg-white/20 hover:bg-white/40'
                      }`}
                  />
                ))}
              </div>
              {/* Gradient accents */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Pipeline */}
      <section className="bg-zinc-50 border-y border-zinc-100 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">The Rendering Pipeline</h2>
            <p className="text-zinc-500 font-medium leading-relaxed">Five stages execute in sequence — from identity encoding to light harmonisation — producing a studio-quality composite in a single inference pass.</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-200"></div>
            <div className="space-y-1">
              {pipeline.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-6 p-5 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-black/5 transition-all duration-300 group">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-black shadow-lg z-10`}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-lg tracking-tight mb-1">{item.stage}</h4>
                    <p className="text-sm text-zinc-500 font-medium">{item.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-zinc-300 group-hover:text-zinc-400 ml-auto mt-3 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techSpecs.map((spec, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 text-center space-y-2 hover:bg-white hover:shadow-xl hover:shadow-black/5 hover:border-zinc-200 transition-all duration-300 hover:-translate-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{spec.label}</p>
              <p className="text-3xl md:text-4xl font-black tracking-tighter text-black">{spec.value}</p>
              <p className="text-xs text-zinc-500 font-medium">{spec.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-[3rem] bg-black p-12 md:p-20 text-center">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
              Ready to See Yourself?
            </h2>
            <p className="text-zinc-400 font-medium mb-10 max-w-lg mx-auto leading-relaxed">
              Upload your photo, pick a garment, and experience the most realistic virtual try-on on the planet. No sign-up required.
            </p>
            <button className="px-8 py-4 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-2xl hover:shadow-white/20 hover:scale-105 transform duration-300">
              Try It Now — Free
            </button>
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none">
            <span className="text-[14rem] font-black tracking-tighter text-white whitespace-nowrap">VISIONFIT</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
