import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar';
import Step1PersonalInfo from './Step1PersonalInfo';
import Step2Documents from './Step2Documents';
import Step3CreditGoals from './Step3CreditGoals';
import Step4Disclosure from './Step4Disclosure';
import Step5Confirmation from './Step5Confirmation';

export interface IntakeData {
  fullName: string;
  dob: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  docDlFront: string | null;
  docDlBack: string | null;
  docSsCard: string | null;
  docUtilityBill: string | null;
  docCrEquifax: string | null;
  docCrExperian: string | null;
  docCrTransunion: string | null;
  goals: string;
  timeline: string;
  disputedAccounts: string;
  agreedToCroa: boolean;
  signatureName: string;
  signatureDate: string;
}

export interface SelectedFiles {
  dlFront: File | null;
  dlBack: File | null;
  ssCard: File | null;
  utilityBill: File | null;
  crEquifax: File | null;
  crExperian: File | null;
  crTransunion: File | null;
}

const INITIAL_DATA: IntakeData = {
  fullName: '',
  dob: '',
  ssn: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  email: '',
  docDlFront: null,
  docDlBack: null,
  docSsCard: null,
  docUtilityBill: null,
  docCrEquifax: null,
  docCrExperian: null,
  docCrTransunion: null,
  goals: '',
  timeline: '',
  disputedAccounts: '',
  agreedToCroa: false,
  signatureName: '',
  signatureDate: new Date().toISOString().split('T')[0],
};

const INITIAL_FILES: SelectedFiles = {
  dlFront: null,
  dlBack: null,
  ssCard: null,
  utilityBill: null,
  crEquifax: null,
  crExperian: null,
  crTransunion: null,
};

type DocDataKey = 'docDlFront' | 'docDlBack' | 'docSsCard' | 'docUtilityBill' | 'docCrEquifax' | 'docCrExperian' | 'docCrTransunion';

const FILE_MAP: { fileKey: keyof SelectedFiles; dataKey: DocDataKey; storageName: string }[] = [
  { fileKey: 'dlFront', dataKey: 'docDlFront', storageName: 'dl-front' },
  { fileKey: 'dlBack', dataKey: 'docDlBack', storageName: 'dl-back' },
  { fileKey: 'ssCard', dataKey: 'docSsCard', storageName: 'ss-card' },
  { fileKey: 'utilityBill', dataKey: 'docUtilityBill', storageName: 'utility-bill' },
  { fileKey: 'crEquifax', dataKey: 'docCrEquifax', storageName: 'cr-equifax' },
  { fileKey: 'crExperian', dataKey: 'docCrExperian', storageName: 'cr-experian' },
  { fileKey: 'crTransunion', dataKey: 'docCrTransunion', storageName: 'cr-transunion' },
];

const slideVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

const IntakeForm: React.FC = () => {
  const [clientId] = useState<string>(() => crypto.randomUUID());
  const [step, setStep] = useState(1);
  const [data, setData] = useState<IntakeData>(INITIAL_DATA);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFiles>(INITIAL_FILES);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof IntakeData, value: string | boolean | null) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (key: keyof SelectedFiles, file: File) => {
    setSelectedFiles((prev) => ({ ...prev, [key]: file }));
  };

  const uploadFiles = async (): Promise<boolean> => {
    setUploading(true);
    setError(null);

    const updatedPaths: Partial<Record<DocDataKey, string>> = {};

    for (const { fileKey, dataKey, storageName } of FILE_MAP) {
      const file = selectedFiles[fileKey];
      if (!file) continue;

      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';

      // Step 1: get a short-lived signed upload URL from our server (tiny request, no file data)
      const urlRes = await fetch(
        `/api/upload?clientId=${encodeURIComponent(clientId)}&storageName=${encodeURIComponent(storageName)}&ext=${encodeURIComponent(ext)}`
      ).catch(() => null);

      if (!urlRes || !urlRes.ok) {
        const body = urlRes ? await urlRes.json().catch(() => ({})) : {};
        setError(`Upload failed [${storageName}]: ${body.error ?? 'Could not prepare upload'}`);
        setUploading(false);
        return false;
      }

      const { signedUrl, path } = await urlRes.json();

      // Step 2: upload the file directly to Supabase via the signed URL.
      // No Authorization header → not a credentialed request → no CORS issues.
      // File never passes through Vercel so there's no 4.5 MB body limit.
      const uploadRes = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
      }).catch(() => null);

      if (!uploadRes || !uploadRes.ok) {
        console.error(`[intake] Signed upload failed for ${storageName}, status:`, uploadRes?.status);
        setError(`Upload failed [${storageName}]: file could not be stored. Please try again.`);
        setUploading(false);
        return false;
      }

      updatedPaths[dataKey] = path;
    }

    setData((prev) => ({ ...prev, ...updatedPaths }));
    setUploading(false);
    return true;
  };

  const handleStep2Next = async () => {
    const ok = await uploadFiles();
    if (ok) setStep(3);
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          fullName: data.fullName,
          dob: data.dob,
          ssn: data.ssn,
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          phone: data.phone,
          email: data.email,
          goals: data.goals,
          timeline: data.timeline,
          disputedAccounts: data.disputedAccounts,
          agreedToCroa: data.agreedToCroa,
          signatureName: data.signatureName,
          signatureDate: data.signatureDate,
          docPaths: {
            dlFront: data.docDlFront,
            dlBack: data.docDlBack,
            ssCard: data.docSsCard,
            utilityBill: data.docUtilityBill,
            crEquifax: data.docCrEquifax,
            crExperian: data.docCrExperian,
            crTransunion: data.docCrTransunion,
          },
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Submission failed');
      }

      setStep(5);
    } catch (err) {
      console.error('Submission error:', err);
      setError(
        'Submission failed. Please try again or contact us directly at daniel@rahoperations.com.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const isBusy = uploading || submitting;

  return (
    <div className="relative border border-neutral-200 bg-white shadow-[0_30px_90px_rgba(17,17,17,0.075)] p-8 sm:p-10 lg:p-14">
      {/* Loading overlay */}
      {isBusy && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/92">
          <div className="mb-4 h-8 w-8 border-2 border-luxury-red border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            {uploading ? 'Uploading Documents…' : 'Submitting Application…'}
          </p>
        </div>
      )}

      {step < 5 && <ProgressBar currentStep={step} />}

      {error && (
        <div className="mb-6 border border-luxury-red/30 bg-luxury-red/5 px-4 py-3">
          <p className="text-sm text-luxury-red">{error}</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <Step1PersonalInfo
              data={data}
              onChange={handleChange}
              onNext={() => setStep(2)}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <Step2Documents
              selectedFiles={selectedFiles}
              onFileSelect={handleFileSelect}
              onNext={handleStep2Next}
              onBack={() => setStep(1)}
              uploading={uploading}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <Step3CreditGoals
              data={data}
              onChange={handleChange}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <Step4Disclosure
              data={data}
              onChange={handleChange}
              onSubmit={handleFinalSubmit}
              onBack={() => setStep(3)}
              submitting={submitting}
            />
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="-m-8 sm:-m-10 lg:-m-14"
          >
            <Step5Confirmation name={data.fullName} email={data.email} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntakeForm;
