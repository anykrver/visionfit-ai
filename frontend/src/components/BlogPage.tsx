
import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost as BlogPostType } from '../data/blogPosts';

interface BlogPageProps {
    onPostClick: (slug: string) => void;
}

const categoryColors: Record<string, string> = {
    Technology: 'bg-blue-50 text-blue-700 border-blue-200',
    Industry: 'bg-amber-50 text-amber-700 border-amber-200',
    'Style Guide': 'bg-pink-50 text-pink-700 border-pink-200',
    Sustainability: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Tips & Tricks': 'bg-violet-50 text-violet-700 border-violet-200',
    Trends: 'bg-orange-50 text-orange-700 border-orange-200',
    Business: 'bg-cyan-50 text-cyan-700 border-cyan-200',
};

const allCategories = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];

const BlogPage: React.FC<BlogPageProps> = ({ onPostClick }) => {
    const [activeCategory, setActiveCategory] = useState('All');

    const featuredPost = BLOG_POSTS[0];
    const filteredPosts = activeCategory === 'All'
        ? BLOG_POSTS.slice(1)
        : BLOG_POSTS.filter(p => p.category === activeCategory && p.id !== '1');

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-20 pb-12 md:pt-28 md:pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-black tracking-[0.2em] text-zinc-600 mb-8 border border-zinc-200/50 shadow-sm">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            INSIGHTS & STYLE INTEL
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black leading-[0.92] mb-6">
                            The VisionFit<br />
                            <span className="text-zinc-400 italic font-serif font-normal">Journal</span>
                        </h1>
                        <p className="text-lg text-zinc-500 max-w-2xl font-medium leading-relaxed">
                            AI fashion insights, style guides, and the future of virtual try-on technology — straight from the team building it.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="max-w-7xl mx-auto px-4 mb-12">
                <button
                    onClick={() => onPostClick(featuredPost.slug)}
                    className="w-full group relative overflow-hidden rounded-3xl bg-zinc-950 hover:shadow-2xl hover:shadow-black/20 transition-all duration-500"
                >
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 aspect-[16/10] md:aspect-auto overflow-hidden">
                            <img
                                src={featuredPost.coverImage}
                                alt={featuredPost.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                            />
                        </div>
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-white/10 text-white/80 border border-white/10">
                                    {featuredPost.category}
                                </span>
                                <span className="text-[10px] font-black tracking-widest uppercase text-white/30">
                                    FEATURED
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4 text-white group-hover:text-zinc-200 transition-colors leading-tight">
                                {featuredPost.title}
                            </h2>
                            <p className="text-white/50 font-medium leading-relaxed mb-6 line-clamp-3">
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-white/30 font-bold">
                                <span>{formatDate(featuredPost.date)}</span>
                                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                <span>{featuredPost.readTime}</span>
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors flex items-center gap-1">
                                    Read Article
                                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </button>
            </section>

            {/* Category Filter */}
            <section className="max-w-7xl mx-auto px-4 mb-10">
                <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex-shrink-0">Filter:</span>
                    {allCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex-shrink-0 ${activeCategory === cat
                                    ? 'bg-black text-white shadow-lg shadow-black/10'
                                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Blog Grid */}
            <section className="max-w-7xl mx-auto px-4 pb-24">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black tracking-tight">
                        {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
                        <span className="text-zinc-300 font-normal ml-2">({filteredPosts.length})</span>
                    </h2>
                    <div className="h-px flex-1 bg-zinc-100 ml-6"></div>
                </div>
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <BlogCard key={post.id} post={post} onClick={() => onPostClick(post.slug)} formatDate={formatDate} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-zinc-400 font-medium">No articles in this category yet.</p>
                    </div>
                )}
            </section>

            {/* Newsletter CTA */}
            <section className="bg-zinc-950 py-20 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-white mb-4">Stay in the Loop</h2>
                    <p className="text-zinc-400 font-medium mb-8">Get the latest AI fashion insights, style guides, and product updates delivered weekly.</p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-full text-white placeholder-zinc-600 text-sm font-medium focus:outline-none focus:border-white/30 transition-colors"
                        />
                        <button className="px-6 py-3.5 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-lg hover:shadow-white/20">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-[10px] text-zinc-600 mt-4 font-medium">No spam, ever. Unsubscribe anytime.</p>
                </div>
            </section>
        </div>
    );
};

// Individual Blog Card
interface BlogCardProps {
    post: BlogPostType;
    onClick: () => void;
    formatDate: (d: string) => string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick, formatDate }) => (
    <button
        onClick={onClick}
        className="group text-left rounded-2xl overflow-hidden bg-white border border-zinc-100 hover:border-zinc-200 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
    >
        <div className="aspect-[16/10] overflow-hidden relative">
            <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase border ${categoryColors[post.category] || 'bg-zinc-100 text-zinc-600 border-zinc-200'}`}>
                    {post.category}
                </span>
                <span className="text-[10px] text-zinc-400 font-bold">{post.readTime}</span>
            </div>
            <h3 className="font-bold text-base tracking-tight mb-2 group-hover:text-zinc-600 transition-colors leading-snug line-clamp-2">
                {post.title}
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-4">
                {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-bold">
                    {formatDate(post.date)}
                </span>
                <span className="text-xs font-bold text-zinc-300 group-hover:text-black transition-colors flex items-center gap-1">
                    Read
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                </span>
            </div>
        </div>
    </button>
);

export default BlogPage;
