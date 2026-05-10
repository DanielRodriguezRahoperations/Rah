import React, { useState } from 'react';
import MStep1Business from './MStep1Business';
import MStep2Social from './MStep2Social';
import MStep3Services from './MStep3Services';
import MStep4Goals from './MStep4Goals';
import MStep5Confirmation from './MStep5Confirmation';

const STEP_LABELS = [
  'Business Info',
  'Social Media',
  'Services',
  'Goals & Budget',
  'Confirmation',
];

interface FormData {
  // Step 1
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessType: string;
  websiteUrl: string;
  location: string;
  // Step 2
  instagramHandle: string;
  facebookHandle: string;
  googleBusinessUrl: string;
  tiktokHandle: string;
  // Step 3
  servicesRequested: string[];
  // Step 4
  goals: string;
  budget: string;
  timeline: string;
}

const INITIAL: FormData = {
  businessName: '',
  ownerName: '',
  email: '',
  phone: '',
  businessType: '',
  websiteUrl: '',
  location: '',
  instagramHandle: '',
  facebookHandle: '',
  googleBusinessUrl: '',
  tiktokHandle: '',
  servicesRequested: [],
  goals: '',
  budget: '',
  timeline: '',
};

const MarketingIntakeForm: React.FC = () => {
  const [clientId] = useState<string>(() => crypto.randomUUID());
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateServices = (services: string[]) => {
    setFormData((prev) => ({ ...prev, servicesRequested: services }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async () => {
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/marketing-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          name: formData.ownerName,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          businessType: formData.businessType,
          websiteUrl: formData.websiteUrl,
          location: formData.location,
          instagramHandle: formData.instagramHandle,
          facebookHandle: formData.facebookHandle,
          googleBusinessUrl: formData.googleBusinessUrl,
          tiktokHandle: formData.tiktokHandle,
          servicesRequested: formData.servicesRequested,
          budget: formData.budget,
          goals: formData.goals,
          timeline: formData.timeline,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Submission failed. Please try again.');
        return;
      }

      setStep(5);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const progressPct = ((step - 1) / (STEP_LABELS.length - 1)) * 100;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress bar */}
      {step < 5 && (
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            {STEP_LABELS.slice(0, 4).map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                    i + 1 < step
                      ? 'bg-luxury-red text-white'
                      : i + 1 === step
                      ? 'bg-luxury-red text-white ring-2 ring-luxury-red/30'
                      : 'bg-neutral-800 text-neutral-600'
                  }`}
                >
                  {i + 1 < step ? (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 10 8">
                      <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-[9px] uppercase tracking-wider hidden sm:block ${i + 1 === step ? 'text-luxury-accent' : 'text-neutral-600'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-0.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-luxury-red rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-8 lg:p-10">
        {step < 5 && (
          <div className="mb-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-1">
              Step {step} of 4
            </p>
            <h2 className="font-serif-display text-2xl text-white">{STEP_LABELS[step - 1]}</h2>
          </div>
        )}

        {step === 1 && (
          <MStep1Business
            data={{
              businessName: formData.businessName,
              ownerName: formData.ownerName,
              email: formData.email,
              phone: formData.phone,
              businessType: formData.businessType,
              websiteUrl: formData.websiteUrl,
              location: formData.location,
            }}
            onChange={updateField}
            onNext={next}
          />
        )}

        {step === 2 && (
          <MStep2Social
            data={{
              instagramHandle: formData.instagramHandle,
              facebookHandle: formData.facebookHandle,
              googleBusinessUrl: formData.googleBusinessUrl,
              tiktokHandle: formData.tiktokHandle,
            }}
            onChange={updateField}
            onNext={next}
            onBack={back}
          />
        )}

        {step === 3 && (
          <MStep3Services
            data={{ servicesRequested: formData.servicesRequested }}
            onChange={updateServices}
            onNext={next}
            onBack={back}
          />
        )}

        {step === 4 && (
          <MStep4Goals
            data={{
              goals: formData.goals,
              budget: formData.budget,
              timeline: formData.timeline,
            }}
            onChange={updateField}
            onSubmit={submit}
            onBack={back}
            submitting={submitting}
            error={error}
          />
        )}

        {step === 5 && (
          <MStep5Confirmation
            businessName={formData.businessName}
            email={formData.email}
            servicesRequested={formData.servicesRequested}
          />
        )}
      </div>
    </div>
  );
};

export default MarketingIntakeForm;
