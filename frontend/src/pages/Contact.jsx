import { useState } from "react";

function Contact() {
  const [form, setForm]     = useState({ name: "", email: "", subject: "general", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", subject: "general", message: "" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mb-12 flex flex-col items-center justify-center rounded-2xl bg-slate-900 px-4 py-16 text-center text-white shadow-xl">
        <h1 className="mb-4 text-4xl font-black sm:text-5xl">💬 Contact Us</h1>
        <p className="max-w-xl text-lg text-slate-300">Have a question or need help? Our support team is here for you, 24/7.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Info cards */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-2xl">📧</div>
            <div>
              <h3 className="mb-1 text-lg font-bold text-slate-900">Email Support</h3>
              <p className="text-sm text-slate-600">support@gocart.com<br />We reply within 2 hours</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-50 text-2xl">📞</div>
            <div>
              <h3 className="mb-1 text-lg font-bold text-slate-900">Phone Support</h3>
              <p className="text-sm text-slate-600">1800-123-4567 (Toll Free)<br />Mon–Sat, 9 AM – 9 PM</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success-50 text-2xl">💬</div>
            <div>
              <h3 className="mb-1 text-lg font-bold text-slate-900">Live Chat</h3>
              <p className="text-sm text-slate-600">Chat with us directly<br />Average wait: &lt; 2 minutes</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-warning-50 text-2xl">📍</div>
            <div>
              <h3 className="mb-1 text-lg font-bold text-slate-900">Office Address</h3>
              <p className="text-sm text-slate-600">GoCart HQ, 14th Floor<br />Bandra-Kurla Complex, Mumbai 400051</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Send us a message</h2>

            {submitted && (
              <div className="mb-6 rounded-md bg-success-50 p-4 text-sm font-bold text-success-700 ring-1 ring-inset ring-success-600/20">
                ✅ Message sent successfully! We'll get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-bold text-slate-700">Full Name</label>
                  <input 
                    id="contact-name" 
                    name="name" 
                    type="text" 
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="Your full name" 
                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-bold text-slate-700">Email Address</label>
                  <input 
                    id="contact-email" 
                    name="email" 
                    type="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="you@example.com" 
                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    required 
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="mb-2 block text-sm font-bold text-slate-700">Subject</label>
                <select 
                  id="contact-subject" 
                  name="subject" 
                  value={form.subject} 
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 cursor-pointer"
                >
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Issue</option>
                  <option value="return">Return / Refund</option>
                  <option value="seller">Seller Support</option>
                  <option value="technical">Technical Problem</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-bold text-slate-700">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your issue or question in detail..."
                  rows={5}
                  className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 resize-y"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full rounded-lg bg-primary-600 px-4 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                id="contact-submit-btn"
              >
                📤 Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
