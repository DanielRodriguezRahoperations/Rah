import React, { useState } from 'react';
import WStep1Business from './WStep1Business';
import WStep2Vision from './WStep2Vision';
import WStep3Inspiration from './WStep3Inspiration';
import WStep4Budget from './WStep4Budget';
import WStep5Confirmation from './WStep5Confirmation';

const STEP_LABELS = ['Business Info', 'Your Vision', 'Inspiration', 'Budget', 'Confirmation'];

interface FormData {
  // Step 1
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  // Step 2
  siteFeeling: string;
  targetCustomer: string;
  primaryAction: string;
  primaryGoal: string;
  // Step 3
  brandsTheyLove: string;
  brandsTheyHate: string;
  hasLogo: string;
  hasPhotos: string;
  hasCopy: string;
  // Step 4
  budget: string;
  timeline: string;
  additionalNotes: string;
}

const INITIAL: FormData = {
  businessName: '',
  ownerName: '',
  email: '',
  phone: '',
  industry: '',
  location: '',
  siteFeeling: '',
  targetCustomer: '',
  primaryAction: '',
  primaryGoal: '',
  brandsTheyLove: '',
  brandsTheyHate: '',
  hasLogo: '',
  hasPhotos: '',
  hasCopy: '',
  budget: '',
  timeline: '',
  additionalNotes: '',
};

const WebsiteIntakeForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async () => {
    setError('');
    setSubmitting(true);
    try {
      // Combine primaryAction + primaryGoal into primary_goal field
      const combinedGoal = formData.primaryAction
        ? `Action: ${formData.primaryAction} — Goal: ${formData.primaryGoal}`
        : formData.primaryGoal;

      const res = await fetch('/api/website-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.ownerName,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          industry: formData.industry,
          targetCustomer: formData.targetCustomer,
          siteFeeling: formData.siteFeeling,
          brandsTheyLove: formData.brandsTheyLove,
          brandsTheyHate: formData.brandsTheyHate,
          hasLogo: formData.hasLogo === 'yes',
          hasPhotos: formData.hasPhotos === 'yes',
          hasCopy: formData.hasCopy === 'yes',
          primaryGoal: combinedGoal,
          budget: formData.budget,
          timeline: formData.timeline,
          additionalNotes: formData.additionalNotes,
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
          <WStep1Business
            data={{
              businessName: formData.businessName,
              ownerName: formData.ownerName,
              email: formData.email,
              phone: formData.phone,
              industry: formData.industry,
              location: formData.location,
            }}
            onChange={updateField}
            onNext={next}
          />
        )}

        {step === 2 && (
          <WStep2Vision
            data={{
              siteFeeling: formData.siteFeeling,
              targetCustomer: formData.targetCustomer,
              primaryAction: formData.primaryAction,
              primaryGoal: formData.primaryGoal,
            }}
            onChange={updateField}
            onNext={next}
            onBack={back}
          />
        )}

        {step === 3 && (
          <WStep3Inspiration
            data={{
              brandsTheyLove: formData.brandsTheyLove,
              brandsTheyHate: formData.brandsTheyHate,
              hasLogo: formData.hasLogo,
              hasPhotos: formData.hasPhotos,
              hasCopy: formData.hasCopy,
            }}
            onChange={updateField}
            onNext={next}
            onBack={back}
          />
        )}

        {step === 4 && (
          <WStep4Budget
            data={{
              budget: formData.budget,
              timeline: formData.timeline,
              additionalNotes: formData.additionalNotes,
            }}
            onChange={updateField}
            onSubmit={submit}
            onBack={back}
            submitting={submitting}
            error={error}
          />
        )}

        {step === 5 && (
          <WStep5Confirmation
            businessName={formData.businessName}
            email={formData.email}
            budget={formData.budget}
          />
        )}
      </div>
    </div>
  );
};

export default WebsiteIntakeForm;
