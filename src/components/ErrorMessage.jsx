import { Mail, Phone } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';


function ExpireyMessage() {
  return (
    <div
      className="flex flex-col h-screen items-center justify-center p-4 py-2 rounded-lg max-w-md mx-auto text-center"
      style={{ backgroundColor: '#d6e9fb', color: '#333', boxShadow: '0 4px 12px rgba(110, 193, 246, 0.3)' }}
    >
      {/* Image at the top */}
      <img
        src="/logo.png"
        alt="Error Illustration"
        className="w-42 h-42"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      />

      <h2 className="text-2xl font-semibold mb-4">Your free trial has expired..</h2>
      <p className="mb-6">
        Upgrade now to restore access and keep your progress.
      </p>
      <p className="mb-4">
        contact our support team:
      </p>

      <div className="flex gap-4">
        <a
          href="tel:+201227139914"
          className="inline-flex items-center gap-2 px-1"
        >
          <Phone size={30} color="#6ec1f6" />
        </a>
        <a
          href="https://wa.me/201227139914"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-1"
        >
          <FaWhatsapp size={30} color="#6ec1f6" />
        </a>
        <a
          href="mailto:amjadtadmory@gmail.com"
          className="inline-flex items-center gap-2 px-1"
        >
          <Mail size={30} color="#6ec1f6" />
        </a>
      </div>
      <h1 className="font-bold text-[#6ec1f6] text-2xl mt-2">Support Contacts</h1>
    </div>
  );
}

export default ExpireyMessage;