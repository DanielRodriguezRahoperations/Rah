import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const NotaryServicesPage = () => {
  return (
    <>
      <SEOHead
        title="Arizona Notary Services Scottsdale Phoenix | RAH Operations"
        description="Professional notary services in Scottsdale and Phoenix Arizona. Business documents, real estate signings, loan documents, and mobile notary appointments throughout Arizona."
        url={absoluteUrl('/notary-services')}
      />

      {/* HERO — ink-stamp editorial: deep black, clean white, red seal accent */}
      <section className="relative min-h-screen bg-[#0d0d0d] flex items-center overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'repeat',
            }}
          />
          <div className="absolute top-0 right-0 w-[45vw] h-full bg-luxury-red/5 blur-[100px]" />
        </div>

        <div className="container-clean relative z-10">
          <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-12 lg:gap-20 items-center">
            <div>
              <motion.p
                className="eyebrow-red mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Arizona Notary Services — Scottsdale & Phoenix
              </motion.p>

              <motion.h1
                className="font-serif-display font-bold text-white leading-[0.88] mb-10"
                style={{ fontSize: 'clamp(3rem, 9vw, 8.5rem)' }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.33, 0.66, 0.66, 1] }}
              >
                Certified.
                <span className="block text-luxury-red">Official.</span>
                Handled.
              </motion.h1>

              <motion.p
                className="text-xl text-neutral-300 font-serif-body max-w-xl leading-relaxed mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Professional notarization for business documents, real estate signings,
                loan closings, and personal records across Arizona — done right, without the hassle.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <Button to="/contact" size="lg">Schedule Notary Service</Button>
                <Button variant="secondary" size="lg" href="tel:+16236408884">(623) 640-8884</Button>
              </motion.div>
            </div>

            {/* Seal visual */}
            <motion.div
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.33, 0.66, 0.66, 1] }}
            >
              <div className="relative w-56 h-56 flex items-center justify-center">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-[3px] border-luxury-red/60" />
                <div className="absolute inset-3 rounded-full border border-luxury-red/30" />
                {/* Inner content */}
                <div className="text-center relative z-10">
                  <p className="text-luxury-red text-xs uppercase tracking-[0.25em] font-semibold mb-2">Notary Public</p>
                  <p className="text-white font-serif-display font-bold text-3xl leading-none">AZ</p>
                  <div className="w-8 h-px bg-luxury-red/50 mx-auto my-3" />
                  <p className="text-white/50 text-xs uppercase tracking-widest">Arizona</p>
                </div>
                {/* Dashed outer decoration */}
                <div className="absolute -inset-4 rounded-full border border-dashed border-white/10" />
              </div>
            </motion.div>
          </div>

          {/* Quick facts */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { val: 'Mobile', label: 'Available' },
              { val: 'Same', label: 'Day Possible' },
              { val: 'All', label: 'AZ Counties' },
              { val: 'Bus + Personal', label: 'Documents' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-serif-display font-bold text-luxury-red text-2xl">{item.val}</p>
                <p className="text-xs uppercase tracking-widest text-white/40 mt-1">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="section bg-cream-50 overflow-hidden">
        <div className="container-clean">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow-red mb-6">Why It Matters</p>
              <h2
                className="font-serif-display font-bold text-slate-dark leading-[1.05] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Important Documents Need to Be Handled Correctly the First Time.
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Notary mistakes don't just delay — they can void documents entirely,
                trigger legal complications, or require full refiling. Professional
                notarization eliminates those risks.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                We provide clear scheduling, proper identity verification, and accurate
                document execution so your notarization holds up — every time.
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {[
                { title: 'No Document Errors', body: 'Every detail verified before the seal goes on.' },
                { title: 'Clear Scheduling', body: 'Easy appointment booking — in-office or mobile.' },
                { title: 'Fast Turnaround', body: 'Same-day and next-day availability in most cases.' },
                { title: 'Arizona-Certified', body: 'Licensed notary public operating throughout AZ.' },
              ].map((item) => (
                <div key={item.title}
                  className="flex gap-5 items-start bg-white border border-neutral-200 p-6 hover:border-luxury-red/30 transition-colors">
                  <div className="w-1 h-full min-h-[40px] bg-luxury-red shrink-0 self-stretch" />
                  <div>
                    <h3 className="font-serif-display font-bold text-slate-dark text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-500">{item.body}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS WE HANDLE — dark stamp grid */}
      <section className="section section-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-luxury-red/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-clean relative z-10">
          <motion.div
            className="mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow-red mb-4">Documents We Support</p>
            <h2
              className="font-serif-display font-bold text-white leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Any Document That Requires an Official Seal.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              { doc: 'Business Documents', detail: 'Contracts, agreements, authorizations, and corporate records.' },
              { doc: 'Real Estate', detail: 'Deeds, disclosures, title documents, and purchase agreements.' },
              { doc: 'Loan Signings', detail: 'Mortgage closings and loan package execution for lenders.' },
              { doc: 'Power of Attorney', detail: 'General, limited, and financial POA documents.' },
              { doc: 'Affidavits', detail: 'Sworn statements, declarations, and legal affirmations.' },
              { doc: 'Wills & Trusts', detail: 'Estate planning documents requiring certified witnesses.' },
              { doc: 'Contracts', detail: 'Business and personal agreements requiring notarization.' },
              { doc: 'Mobile Appointments', detail: 'We come to your office, home, or location of choice.' },
            ].map((item, i) => (
              <motion.div
                key={item.doc}
                className="bg-[#1a1a1a] p-7 hover:bg-[#222] transition-colors"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <div className="w-6 h-px bg-luxury-red mb-4" />
                <h4 className="text-white font-serif-display font-bold text-base mb-2">{item.doc}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-cream-50">
        <div className="container-clean">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-4">How It Works</p>
            <h2
              className="font-serif-display font-bold text-slate-dark"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Four Steps to Notarized.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Schedule', desc: 'Contact us to set the appointment — in-office or we come to you.' },
              { num: '02', title: 'Prepare', desc: 'Bring valid government-issued photo ID and your unsigned documents.' },
              { num: '03', title: 'Verify', desc: 'Identity is confirmed and all document details are reviewed for accuracy.' },
              { num: '04', title: 'Notarize', desc: 'Documents are properly executed, signed, and officially sealed.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <p
                  className="font-serif-display font-bold text-luxury-red/30 mb-4"
                  style={{ fontSize: '4rem', lineHeight: 1 }}
                >
                  {step.num}
                </p>
                <h3 className="text-xl font-serif-display font-bold text-slate-dark mb-3">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES — SEO internal links */}
      <section className="section section-dark">
        <div className="container-clean">
          <p className="eyebrow-red mb-6">Related Services</p>
          <h2
            className="font-serif-display font-bold text-white mb-12"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            Build the Full Business Foundation
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'New Business Setup',
                desc: 'Notarization is often required during business formation. We handle the full setup process.',
                link: '/new-business-setup',
                anchor: 'new business setup Scottsdale Arizona',
              },
              {
                title: 'LLC Setup & Structuring',
                desc: 'Proper entity formation in Arizona requires correctly executed documents — we do both.',
                link: '/llc-setup',
                anchor: 'LLC formation Arizona notary',
              },
              {
                title: 'Website Design & SEO',
                desc: 'Grow your Arizona business online. Professional web development and SEO near Scottsdale.',
                link: '/website-design-and-seo',
                anchor: 'website design SEO Scottsdale Phoenix',
              },
            ].map((s) => (
              <Link
                key={s.title}
                to={s.link}
                title={s.anchor}
                className="block border border-white/10 p-7 hover:border-luxury-red/50 hover:bg-white/5 transition-all duration-300 group"
              >
                <h3 className="text-lg font-serif-display font-bold text-white mb-3 group-hover:text-luxury-red transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">{s.desc}</p>
                <span className="text-xs uppercase tracking-widest text-luxury-red">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section bg-cream-50">
        <div className="container-clean max-w-3xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-4">Schedule Today</p>
            <h2
              className="font-serif-display font-bold text-slate-dark"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Need Documents Notarized? Let's Handle It.
            </h2>
          </motion.div>
          <ContactForm
            title="Schedule Your Notary Appointment"
            subtitle="Tell us what you need notarized and we will get it handled promptly."
          />
        </div>
      </section>
    </>
  );
};

export default NotaryServicesPage;
