import { useState } from "react";
import { LuMail, LuPhone, LuMapPin, LuSend } from "react-icons/lu";
import MainLayout from "../layouts/MainLayout"; // 🔥 IMPORTANT

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: LuMail,
      title: "Email Us",
      detail: "support@technavyug.com",
      desc: "We respond within 24 hours",
    },
    {
      icon: LuPhone,
      title: "Call Us",
      detail: "+91 9876543210",
      desc: "Monday to Friday, 9 AM - 6 PM",
    },
    {
      icon: LuMapPin,
      title: "Visit Us",
      detail: "India",
      desc: "Serving students worldwide",
    },
  ];

  return (
    <MainLayout> {/* 🔥 YAHI MAGIC HAI */}

      {/* HEADER */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50/30 text-center">
      <p className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-4">
              Get in Touch
            </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Contact Us
            </h1>
        
        <p className="text-gray-500">
          Have questions? We are here to help.
        </p>
      </section>

      {/* CONTACT INFO */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">

          {contactInfo.map((item, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl text-center hover:shadow-md transition"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-black rounded-lg flex items-center justify-center">
                <item.icon className="text-white" />
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-cyan-600">{item.detail}</p>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* FORM */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-6">

          <h2 className="text-2xl font-bold text-center mb-6">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              required
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="email"
              required
              placeholder="Your Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              required
              placeholder="Subject"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />

            <textarea
              required
              rows={4}
              placeholder="Your Message"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />

            <button className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2">
              <LuSend />
              Send Message
            </button>

          </form>
        </div>
      </section>

    </MainLayout>
  );
}