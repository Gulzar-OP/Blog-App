import { useState } from "react";
import { PiShareFat } from "react-icons/pi";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const ShareButton = () => {
  const [open, setOpen] = useState(false);

  const handleShare = () => {
    setOpen(true);
  };

  return (
    <>
      <PiShareFat
        className="mb-5 border-2 border-white/20 rounded-full p-2 text-6xl mx-auto shadow-2xl cursor-pointer bg-white/10 backdrop-blur-3xl hover:scale-110 transition-transform"
        onClick={handleShare}
      />
      <ShareDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

// Move ShareDialog inside or define it first
const ShareDialog = ({ open, onClose }) => {
  if (!open) return null;

  const url = window.location.href;
  const title = "Check this out ";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 max-w-sm w-full shadow-2xl">
        <h3 className="text-white text-xl mb-6 text-center font-medium">
          Share this page
        </h3>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={48} round className="hover:scale-110 transition-transform" />
          </FacebookShareButton>
          
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={48} round className="hover:scale-110 transition-transform" />
          </WhatsappShareButton>
          
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={48} round className="hover:scale-110 transition-transform" />
          </TwitterShareButton>
          
          <LinkedinShareButton url={url} title={title}>
            <LinkedinIcon size={48} round className="hover:scale-110 transition-transform" />
          </LinkedinShareButton>
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-xl border border-white/30 transition-all text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShareButton;
