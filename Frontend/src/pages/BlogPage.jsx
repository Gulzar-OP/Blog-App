import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  ChevronLeftIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { GiHearts } from "react-icons/gi";
import { IoHeartDislike } from "react-icons/io5";
import { FaArrowUpLong } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";
import ShareButton from "../components/ShareButton";

export default function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [liked, setLiked] = useState(true);
  const [shareCount, setShareCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked((prev) => !prev);
  };

  const API_URL = import.meta.env.VITE_API_URL;
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll();

  const topOfThePage = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ---------------- SCROLL PROGRESS ---------------- */
  useEffect(() => {
    const scroll = scrollYProgress.on("change", (val) => {
      setScrollProgress(val);
    });
    return scroll;
  }, [scrollYProgress]);

  /* ---------------- FETCH BLOG ---------------- */
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/blogs/single-blog/${id}`);
        setBlog(res.data.blog);
        // console.log(res.data.blog);
        // console.log(blog?.adminPhoto);
      } catch (err) {
        setError(err.response?.data?.message || "Blog not found");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  /* ---------------- MARKDOWN UI (Enhanced) ---------------- */
  const MarkdownUI = {
    code({ inline, className, children }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-12 rounded-3xl overflow-hidden border border-zinc-800/50 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl shadow-2xl"
        >
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            className="!bg-zinc-950/50 !p-8 !text-sm !border-none"
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </motion.div>
      ) : (
        <code className="bg-zinc-900/50 backdrop-blur-sm px-3 py-1.5 rounded-xl text-sm font-mono border border-zinc-700/50">
          {children}
        </code>
      );
    },
    h1: ({ children }) => (
      <motion.h1
        // initial={{ opacity: 0, y: 30 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        className="text-5xl md:text-7xl font-black mb-12 mt-20 bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent leading-tight"
      >
        {children}
      </motion.h1>
    ),
    h2: ({ children }) => (
      <motion.h2
        // initial={{ opacity: 0, x: -20 }}
        // whileInView={{ opacity: 1, x: 0 }}
        // viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black mt-20 mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
      >
        {children}
      </motion.h2>
    ),
    h3: ({ children }) => (
      <motion.h3
        // initial={{ opacity: 0, x: 20 }}
        // whileInView={{ opacity: 1, x: 0 }}
        // viewport={{ once: true }}
        className="text-3xl font-bold mt-16 mb-6 text-zinc-100"
      >
        {children}
      </motion.h3>
    ),
    p: ({ children }) => (
      <motion.p
        // initial={{ opacity: 0, y: 15 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        className="text-xl leading-10 text-zinc-200 mb-8 max-w-3xl"
      >
        {children}
      </motion.p>
    ),
    blockquote: ({ children }) => (
      <motion.blockquote
        // initial={{ opacity: 0, scale: 0.95 }}
        // whileInView={{ opacity: 1, scale: 1 }}
        // viewport={{ once: true }}
        className="border-l-[6px] border-gradient-to-b from-cyan-400 to-blue-500 pl-10 pr-8 py-8 my-16 bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl italic text-zinc-100 relative before:absolute before:-left-1 before:top-4 before:w-[3px] before:h-12 before:bg-gradient-to-b before:from-cyan-400 before:to-blue-500"
      >
        {children}
      </motion.blockquote>
    ),
    img: ({ src, alt }) => (
      <motion.div
        // initial={{ opacity: 0, scale: 0.9 }}
        // whileInView={{ opacity: 1, scale: 1 }}
        // viewport={{ once: true }}
        className="my-20"
      >
        <img
          src={src}
          alt={alt}
          className="rounded-3xl w-full max-w-4xl mx-auto shadow-2xl border border-zinc-800/50 backdrop-blur-sm"
          loading="lazy"
        />
      </motion.div>
    ),
    ul: ({ children }) => (
      <motion.ul
        // initial={{ opacity: 0, y: 20 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        className="my-8 space-y-4 max-w-2xl"
      >
        {children}
      </motion.ul>
    ),
    ol: ({ children }) => (
      <motion.ol
        // initial={{ opacity: 0, y: 20 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        className="my-8 space-y-4 max-w-2xl list-decimal list-inside pl-4"
      >
        {children}
      </motion.ol>
    ),
    li: ({ children }) => (
      <motion.li
        // initial={{ opacity: 0, x: -10 }}
        // whileInView={{ opacity: 1, x: 0 }}
        // viewport={{ once: true }}
        className="text-lg text-zinc-200 flex items-start gap-3"
      >
        <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2.5 flex-shrink-0"></span>
        {children}
      </motion.li>
    ),
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-zinc-800/50 border-t-gradient-to-r border-t-from-cyan-400 border-t-to-purple-500 rounded-full"
        />
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 to-black px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 max-w-md"
        >
          <div className="w-24 h-24 mx-auto bg-zinc-900/50 rounded-3xl flex items-center justify-center backdrop-blur-xl">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text">
            {error}
          </h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-gradient-to-r from-zinc-700 to-zinc-800/50 backdrop-blur-xl rounded-3xl font-semibold text-lg border border-zinc-700/50 shadow-2xl hover:shadow-cyan-500/25 hover:border-cyan-500/50 transition-all duration-300"
          >
            ← Go Back
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-zinc-100 overflow-x-hidden">
      {/* Gradient Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-lg"
        style={{ scaleX: scrollProgress }}
      />

      {/* Floating Back Button */}
      <motion.button
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        // box-shadow: x-offset y-offset blur spread color;
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="fixed top-25 left-8 z-10 bg-zinc-900/80 backdrop-blur-xl px-6 py-3 rounded-3xl border border-zinc-700/50 shadow-2xl hover:bg-zinc-800/90 hover:border-cyan-400/50 transition-all duration-300 font-semibold flex items-center gap-2"
      >
        <ChevronLeftIcon className="w-5 h-5" />
        Back
      </motion.button>

      {/* Hero Header */}
      <motion.section
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-32 pb-28 text-center  max-w-7xl mx-auto px-6 relative"
      >
        {/* Category Badge */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-full border border-cyan-400/30 font-mono uppercase text-sm tracking-widest text-cyan-300 shadow-2xl"
        >
          {blog.category}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-8xl lg:text-5xl font-black mt-8 mb-12 leading-tight bg-gradient-to-r from-zinc-100 via-white to-zinc-200 bg-clip-text text-transparent drop-shadow-2xl"
        >
          {blog.title}
        </motion.h1>

        {/* Author & Meta */}
        <Link to={`/creators/${blog.createdBy}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-6 bg-zinc-900/50 backdrop-blur-xl px-4 py-4 rounded-3xl border border-zinc-700/50 shadow-2xl"
          >
            <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
              {/* Author Info */}
              <div className="flex-shrink-0">
                <img
                  src={blog.writerPhoto}
                  alt={blog.writerName}
                  className="w-20 h-20 object-cover rounded-3xl ring-2 ring-slate-600/50 group-hover:ring-slate-400/75 transition-all duration-300 hover:scale-105 hover:rotate-3"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-zinc-100 leading-tight  group-hover:text-white transition-colors">
                  {blog.writerName}
                </h3>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-zinc-400 mb-3">
                  <div className="flex items-center gap-2 py-1.5 px-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:bg-slate-700/50 transition-all duration-200">
                    <CalendarIcon className="w-5 h-5 text-zinc-300 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-1.5 px-3 bg-emerald-500/10 backdrop-blur-sm rounded-2xl border border-emerald-500/30 hover:bg-emerald-500/20 transition-all duration-200">
                    <TagIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="font-mono text-sm font-semibold text-emerald-300">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Optional: Quick stats */}
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>⭐ 4.8</span>
                  <span>1.2k views</span>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.section>

      {/* Featured Image */}
      <AnimatePresence>
        {blog.blogImage?.url && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto px-6 mb-18"
          >
            <motion.img
              whileHover={{ scale: 1.02 }}
              src={blog.blogImage.url}
              alt={blog.title}
              className="rounded-4xl w-full h-[220px] md:h-[600px] object-cover shadow-3xl border-8 border-zinc-900/50 backdrop-blur-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <section className="max-w-5xl mx-auto text-center flex flex-col items-center px-6">
        <ReactMarkdown components={MarkdownUI}>{blog.about}</ReactMarkdown>
      </section>

      {/* Scroll to top floating button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{
          opacity: scrollProgress > 0.05 ? 1 : 0,
          y: scrollProgress > 0.1 ? 0 : 100,
        }}
        whileHover={{ scale: 1.1 }}
        className="cursor-pointer fixed bottom-8 right-8 z-40 w-14 h-14 rounded-3xl shadow-2xl border-4 border-blue-400 backdrop-blur-xl flex items-center justify-center"
        onClick={topOfThePage}
      >
        <FaArrowUpLong />
      </motion.button>

      <div className="fixed top-1/2 right-8 z-40 flex flex-col items-center gap-2">
        {/* <PiShareFat  className=" border-2 border-white/20 rounded-full p-2 text-6xl mx-auto shadow-2xl cursor-pointer bg-white/10 backdrop-blur-3xl "
        onClick={handleShare}/> */}

        <ShareButton />

        {/* <p className="text-white mb-6">{shareCount}</p> */}
        {liked ? (
          <GiHearts
            className="text-red-600 border-2 border-white/20 rounded-full p-2 text-6xl mx-auto shadow-2xl cursor-pointer bg-white/10 backdrop-blur-3xl"
            onClick={handleLike}
          />
        ) : (
          <IoHeartDislike
            className="text-red-600 border-2 border-white/20 rounded-full p-2 text-6xl mx-auto shadow-2xl cursor-pointer bg-white/10 backdrop-blur-3xl"
            onClick={handleLike}
          />
        )}
        {/* <p className="text-white mt-2">{likeCount}</p> */}
      </div>
    </div>
  );
}
