
import React from 'react';
import Button from './Button';

const ForBrands: React.FC = () => {
  const stats = [
    { label: "Conversion Uplift", value: "+45%", icon: "📈", desc: "Average conversion rate boost for integrated stores." },
    { label: "Return Reduction", value: "-40%", icon: "📦", desc: "Significant drop in size-related returns and logistics costs." },
    { label: "Session Duration", value: "4.5×", icon: "⏱️", desc: "Longer average time on product pages vs. static galleries." },
    { label: "Customer LTV", value: "+53%", icon: "💎", desc: "Higher lifetime value from confident, repeat purchasers." },
  ];

  const integrations = [
    {
      title: "Headless REST API",
      desc: "Full control for custom-built e-commerce platforms. Send user + garment images, receive rendered results in seconds.",
      tag: "DEVELOPERS",
      tagColor: "bg-blue-50 text-blue-600 border-blue-200",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Shopify Plugin",
      desc: "One-click install with automated catalog sync. Zero code required — live within 60 seconds of installation.",
      tag: "NO CODE",
      tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "White-Label Widget",
      desc: "Fully customised experience embedded in your product pages. Your branding, our engine — invisible integration.",
      tag: "ENTERPRISE",
      tagColor: "bg-violet-50 text-violet-600 border-violet-200",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    }
  ];

  const testimonials = [
    {
      quote: "Styll cut our return rate by 38% in the first quarter. The ROI was visible within weeks.",
      name: "Sarah Chen",
      role: "Head of E-Commerce, Luxe Collective",
      avatar: "SC"
    },
    {
      quote: "Our customers spend 3× longer on product pages with try-on enabled. Conversion jumped immediately.",
      name: "Marcus Wright",
      role: "CTO, UrbanThread",
      avatar: "MW"
    }
  ];

  const codeSnippet = `// Styll API — Try-On Request
const response = await fetch(
  'https://api.Styll.ai/v1/tryon',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer vf_sk_...',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_image: userPhotoUrl,
      garment_image: productImageUrl,
    })
  }
);

const { result_image } = await response.json();`;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-black tracking-[0.2em] text-zinc-600 mb-8 border border-zinc-200/50 shadow-sm">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            ENTERPRISE SOLUTION
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black max-w-5xl mx-auto leading-[0.92] mb-8">
            Drive Confidence,<br />
            <span className="text-zinc-400 italic font-serif font-normal">Eliminate</span> Returns.
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Integrate AI-powered virtual try-on into your e-commerce platform in minutes. Cut returns by 40%, boost conversions by 45%, and delight your customers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="shadow-2xl shadow-black/10 w-full sm:w-auto">
              Request a Demo
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View API Docs
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="relative p-8 bg-white rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group text-center hover:-translate-y-1 overflow-hidden">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-1">{stat.value}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 mb-3">{stat.label}</div>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Options */}
      <section className="bg-zinc-50 border-y border-zinc-100 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">Integration That Fits You</h2>
            <p className="text-zinc-500 font-medium leading-relaxed">From zero-code plugins to fully customisable APIs — choose the deployment method that matches your stack.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {integrations.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-zinc-100 hover:border-zinc-200 p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1 group flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-zinc-100 group-hover:bg-black group-hover:text-white rounded-xl flex items-center justify-center text-zinc-600 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-3">{item.title}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed flex-1">{item.desc}</p>
                <div className="mt-6 pt-5 border-t border-zinc-100">
                  <button className="text-xs font-bold text-black hover:text-zinc-600 transition-colors group/link flex items-center gap-1">
                    Learn more
                    <svg className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview + integration visual */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-5">Ship in Minutes,<br />Not Months.</h2>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Our RESTful API is designed for simplicity. Send two images — your customer and the garment —
                and receive a photorealistic composite. That's it. No ML expertise required.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-sm font-medium text-zinc-700">Single API endpoint — no complex flows</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-sm font-medium text-zinc-700">99.9% uptime SLA on enterprise plans</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-sm font-medium text-zinc-700">SDKs for JavaScript, Python, and Swift</p>
              </div>
            </div>
          </div>
          {/* Code block */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                </div>
                <span className="ml-3 text-[10px] font-mono font-bold text-zinc-500 tracking-wider">tryon.js</span>
              </div>
              <pre className="p-6 text-sm leading-relaxed overflow-x-auto">
                <code className="text-zinc-300 font-mono text-xs">
                  {codeSnippet.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-8 text-zinc-600 text-right mr-4 select-none flex-shrink-0">{i + 1}</span>
                      <span>{colorCode(line)}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-blue-500/5 to-violet-500/5 rounded-2xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-zinc-50 border-y border-zinc-100 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Trusted by Leading Brands</h2>
            <p className="text-zinc-500 font-medium">See what our partners have to say.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-zinc-100 p-8 hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
                <svg className="w-8 h-8 text-zinc-200 mb-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                </svg>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6 text-base">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-zinc-400 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="relative overflow-hidden rounded-[3rem] bg-black p-12 md:p-20">
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
              Let's Build Together
            </h2>
            <p className="text-zinc-400 font-medium mb-10 max-w-lg mx-auto leading-relaxed">
              Join hundreds of brands using Styll to transform their online shopping experience. Start with 100 free renders per month.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-2xl hover:shadow-white/20 hover:scale-105 transform duration-300">
                Schedule a Demo
              </button>
              <button className="px-8 py-4 bg-white/10 text-white border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                View Pricing
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
};

// Simple syntax coloring for the code snippet
function colorCode(line: string): React.ReactNode {
  // Comments
  if (line.trim().startsWith('//')) {
    return <span className="text-zinc-500">{line}</span>;
  }
  // Keywords
  let parts = line;
  const highlighted = parts
    .replace(/(const|await|fetch|method|headers|body|JSON\.stringify)/g, '<kw>$1</kw>')
    .replace(/('Bearer vf_sk_\.\.\.'|'Authorization'|'Content-Type'|'application\/json'|'POST'|'https:\/\/api\.Styll\.ai\/v1\/tryon')/g, '<str>$1</str>');

  if (highlighted === parts) {
    return <span>{line}</span>;
  }

  const fragments = highlighted.split(/(<kw>.*?<\/kw>|<str>.*?<\/str>)/);
  return (
    <>
      {fragments.map((f, i) => {
        if (f.startsWith('<kw>')) {
          return <span key={i} className="text-violet-400">{f.replace(/<\/?kw>/g, '')}</span>;
        }
        if (f.startsWith('<str>')) {
          return <span key={i} className="text-emerald-400">{f.replace(/<\/?str>/g, '')}</span>;
        }
        return <span key={i}>{f}</span>;
      })}
    </>
  );
}

export default ForBrands;
