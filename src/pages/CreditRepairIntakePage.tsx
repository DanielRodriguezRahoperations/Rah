import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import IntakeForm from '../components/intake/IntakeForm';
import { absoluteUrl } from '../utils/url';
import { SITE_CONFIG } from '../config/site';

const CreditRepairIntakePage = () => {
  return (
    <>
      <SEOHead
        title="Credit Repair Intake — RAH Operations"
        description="Start your credit repair journey with RAH Operations. Complete our secure client intake form to begin your personalized credit improvement plan in Scottsdale and Phoenix, AZ."
        url={absoluteUrl('/credit-repair/intake')}
        noIndex={true}
      />

      {/* Hero header */}
      <section className="relative bg-[#0f0f0f] pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-luxury-red/8 rounded-full blur-[120px]" />
          <div className="absolute top-0 right-0 w-[20vw] h-[20vw] bg-luxury-red/5 rounded-full blur-[80px]" />
        </div>

        <div className="container-clean relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 0.66, 0.66, 1] }}
          >
            <p className="eyebrow-red mb-5">Secure Client Intake</p>
            <h1
              className="font-serif-display font-bold text-white leading-[1.0] mb-6"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
            >
              Let's Start Repairing
              <span className="block text-luxury-red">Your Credit.</span>
            </h1>
            <p className="text-neutral-400 font-serif-body text-lg max-w-xl mx-auto leading-relaxed mb-8">
              Complete all four steps below. This intake takes approximately 10–15 minutes. Your
              information is transmitted securely and only accessible to your RAH credit team.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { icon: '🔒', text: 'Encrypted & Secure' },
                { icon: '📋', text: 'CROA Compliant' },
                { icon: '🏦', text: 'All 3 Bureaus Covered' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form section */}
      <section className="relative py-16 lg:py-24 bg-cream-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-luxury-red/4 rounded-full blur-[100px]" />
        </div>

        <div className="container-clean relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 0.66, 0.66, 1] }}
          >
            <IntakeForm />
          </motion.div>

          {/* Footer note */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-xs text-neutral-400 leading-relaxed">
              Questions? Call us at{' '}
              <a
                href={`tel:${SITE_CONFIG.phoneTel}`}
                className="text-luxury-red hover:underline"
              >
                {SITE_CONFIG.phone}
              </a>{' '}
              or email{' '}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-luxury-red hover:underline"
              >
                {SITE_CONFIG.email}
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CreditRepairIntakePage;
