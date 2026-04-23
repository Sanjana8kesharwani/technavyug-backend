import { Link } from "react-router-dom";
import { LuLinkedin, LuInstagram, LuMail, LuYoutube } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="bg-[#0b0f1a] text-gray-400">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-12">

          
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              
              <img src="/Technavyug Logo.jpeg" alt="logo" className="h-8 w-auto" />

              <span className="text-xl font-bold text-white"> Tech<span className="text-cyan-500">navyug</span>
              </span>
            </Link>

            <p className="text-sm text-gray-500 max-w-sm mb-6">
              Building the future of tech education. Learn from industry experts
              and grow your career with real-world skills.
            </p>

            
            <div className="flex gap-3">
              <a href="https://www.youtube.com/@technavyugofficial" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-cyan-600 hover:text-white transition">
                <LuYoutube />
              </a>

              <a href="https://www.linkedin.com/company/technavyug/posts/?feedView=all" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-cyan-600 hover:text-white transition">
                <LuLinkedin />
              </a>

              <a href="https://www.instagram.com/technavyug/" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-cyan-600 hover:text-white transition">
                <LuInstagram />
              </a>
            </div>
          </div>


          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-cyan-400">Home</Link></li>
              <li><Link to="/projects" className="hover:text-cyan-400">Projects</Link></li>
              <li><Link to="/achievements" className="hover:text-cyan-400">Achievements</Link></li>
              <li><Link to="/verify" className="hover:text-cyan-400">Verify</Link></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-cyan-400"> Contact</Link></li>
              <li>
                <a href="https://www.technavyug.com/" target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                  Official Website
                </a>
              </li>
              <li><Link to="/" className="hover:text-cyan-400">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">

          <p>© {new Date().getFullYear()} Technavyug. All rights reserved.</p>

          <div className="flex items-center gap-2 mt-4 md:mt-0 text-gray-600 hover:text-cyan-500 transition cursor-pointer">
          <LuMail />
          <span>support@technavyug.com</span>
        </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;