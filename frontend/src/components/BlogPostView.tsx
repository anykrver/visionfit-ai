
import React from 'react';
import { BLOG_POSTS } from '../data/blogPosts';

interface BlogPostViewProps {
    slug: string;
    onBack: () => void;
    onPostClick: (slug: string) => void;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ slug, onBack, onPostClick }) => {
    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-black">Post Not Found</h2>
                    <button onClick={onBack} className="text-sm font-bold text-zinc-500 hover:text-black transition-colors underline underline-offset-4">
                        ← Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    // Get related posts (same category, excluding current)
    const relatedPosts = BLOG_POSTS
        .filter(p => p.id !== post.id)
        .sort((a, b) => (a.category === post.category ? -1 : 1) - (b.category === post.category ? -1 : 1))
        .slice(0, 3);

    // Simple markdown-like rendering for content
    const renderContent = (content: string) => {
        const lines = content.split('\n');
        const elements: React.ReactNode[] = [];
        let inTable = false;
        let tableRows: string[][] = [];
        let tableHeaders: string[] = [];

        const processInline = (text: string): React.ReactNode[] => {
            const parts: React.ReactNode[] = [];
            let remaining = text;
            let key = 0;

            while (remaining.length > 0) {
                // Bold
                const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
                if (boldMatch && boldMatch.index !== undefined) {
                    if (boldMatch.index > 0) {
                        parts.push(<span key={key++}>{remaining.slice(0, boldMatch.index)}</span>);
                    }
                    parts.push(<strong key={key++} className="font-bold text-black">{boldMatch[1]}</strong>);
                    remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
                    continue;
                }
                parts.push(<span key={key++}>{remaining}</span>);
                break;
            }
            return parts;
        };

        const flushTable = () => {
            if (tableHeaders.length > 0 || tableRows.length > 0) {
                elements.push(
                    <div key={`table-${elements.length}`} className="overflow-x-auto my-8 rounded-xl border border-zinc-200">
                        <table className="w-full text-sm">
                            {tableHeaders.length > 0 && (
                                <thead>
                                    <tr className="bg-zinc-50 border-b border-zinc-200">
                                        {tableHeaders.map((h, i) => (
                                            <th key={i} className="px-5 py-3 text-left font-black text-xs uppercase tracking-wider text-zinc-600">{processInline(h.trim())}</th>
                                        ))}
                                    </tr>
                                </thead>
                            )}
                            <tbody>
                                {tableRows.map((row, ri) => (
                                    <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'}>
                                        {row.map((cell, ci) => (
                                            <td key={ci} className="px-5 py-3 text-zinc-600 border-b border-zinc-100">{processInline(cell.trim())}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
                tableHeaders = [];
                tableRows = [];
            }
            inTable = false;
        };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();

            // Table rows
            if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
                const cells = trimmed.split('|').filter(c => c.trim() !== '');
                // Check if separator row
                if (cells.every(c => /^[\s\-:]+$/.test(c))) {
                    inTable = true;
                    continue;
                }
                if (!inTable && tableHeaders.length === 0) {
                    tableHeaders = cells;
                } else {
                    inTable = true;
                    tableRows.push(cells);
                }
                continue;
            } else if (inTable) {
                flushTable();
            }

            // Headers
            if (trimmed.startsWith('### ')) {
                elements.push(<h3 key={i} className="text-xl font-black tracking-tight mt-10 mb-4 text-black">{trimmed.slice(4)}</h3>);
            } else if (trimmed.startsWith('## ')) {
                elements.push(<h2 key={i} className="text-2xl font-black tracking-tight mt-12 mb-5 text-black">{trimmed.slice(3)}</h2>);
            } else if (trimmed.startsWith('#### ')) {
                elements.push(<h4 key={i} className="text-lg font-bold mt-8 mb-3 text-black">{trimmed.slice(5)}</h4>);
            }
            // Blockquote
            else if (trimmed.startsWith('> ')) {
                elements.push(
                    <blockquote key={i} className="border-l-4 border-black pl-5 py-2 my-6 bg-zinc-50 rounded-r-lg">
                        <p className="text-zinc-600 font-medium italic">{processInline(trimmed.slice(2))}</p>
                    </blockquote>
                );
            }
            // Numbered list
            else if (/^\d+\.\s/.test(trimmed)) {
                const content = trimmed.replace(/^\d+\.\s/, '');
                elements.push(
                    <div key={i} className="flex gap-3 mb-2 ml-1">
                        <span className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center text-[10px] font-black text-zinc-500 flex-shrink-0 mt-0.5">
                            {trimmed.match(/^(\d+)/)?.[1]}
                        </span>
                        <p className="text-zinc-600 leading-relaxed font-medium">{processInline(content)}</p>
                    </div>
                );
            }
            // Bullet list
            else if (trimmed.startsWith('- ')) {
                const content = trimmed.slice(2);
                elements.push(
                    <div key={i} className="flex gap-3 mb-2 ml-1">
                        <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0 mt-2.5"></span>
                        <p className="text-zinc-600 leading-relaxed font-medium">{processInline(content)}</p>
                    </div>
                );
            }
            // Empty line
            else if (trimmed === '') {
                elements.push(<div key={i} className="h-3"></div>);
            }
            // Paragraph
            else {
                elements.push(<p key={i} className="text-zinc-600 leading-[1.85] font-medium mb-1">{processInline(trimmed)}</p>);
            }
        }

        if (inTable || tableHeaders.length > 0) {
            flushTable();
        }

        return elements;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Back button */}
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-black transition-colors group"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blog
                </button>
            </div>

            {/* Article Header */}
            <article className="max-w-4xl mx-auto px-4 pt-8 pb-20">
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-zinc-100 text-zinc-600 border border-zinc-200">
                            {post.category}
                        </span>
                        <span className="text-xs text-zinc-400 font-bold">{post.readTime}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] mb-6">
                        {post.title}
                    </h1>
                    <p className="text-lg text-zinc-500 font-medium leading-relaxed mb-8">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 pb-8 border-b border-zinc-100">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg italic">S</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm">{post.author}</p>
                            <p className="text-xs text-zinc-400 font-medium">{formatDate(post.date)}</p>
                        </div>
                    </div>
                </header>

                {/* Cover Image */}
                <div className="rounded-2xl overflow-hidden mb-12 border border-zinc-100">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full aspect-[21/9] object-cover"
                    />
                </div>

                {/* Article Content */}
                <div className="prose-custom">
                    {renderContent(post.content)}
                </div>

                {/* Tags */}
                <div className="mt-16 pt-8 border-t border-zinc-100">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Tags</p>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-full text-xs font-bold text-zinc-500">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-black tracking-tight whitespace-nowrap">Keep Reading</h2>
                            <div className="h-px flex-1 bg-zinc-100"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((related) => (
                                <button
                                    key={related.id}
                                    onClick={() => { onPostClick(related.slug); window.scrollTo(0, 0); }}
                                    className="group text-left rounded-xl overflow-hidden bg-white border border-zinc-100 hover:border-zinc-200 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
                                >
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <img
                                            src={related.coverImage}
                                            alt={related.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2">{related.category}</p>
                                        <h3 className="font-bold text-sm tracking-tight line-clamp-2 group-hover:text-zinc-600 transition-colors leading-snug">
                                            {related.title}
                                        </h3>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
};

export default BlogPostView;
