import React, { useRef, useState } from 'react';
import type { SelectedFiles } from './IntakeForm';

interface Props {
  selectedFiles: SelectedFiles;
  onFileSelect: (key: keyof SelectedFiles, file: File) => void;
  onNext: () => void;
  onBack: () => void;
  uploading: boolean;
  ftcReports: File[];
  additionalFiles: File[];
  onFtcReportAdd: (file: File) => void;
  onFtcReportRemove: (index: number) => void;
  onAdditionalFileAdd: (file: File) => void;
  onAdditionalFileRemove: (index: number) => void;
}

const DOCS: {
  key: keyof SelectedFiles;
  label: string;
  desc: string;
}[] = [
  {
    key: 'dlFront',
    label: "Driver's License — Front",
    desc: 'Clear photo or scan of the front of your state-issued ID.',
  },
  {
    key: 'dlBack',
    label: "Driver's License — Back",
    desc: 'Clear photo or scan of the back of your state-issued ID.',
  },
  {
    key: 'ssCard',
    label: 'Social Security Card',
    desc: 'Photo or scan of your Social Security card.',
  },
  {
    key: 'utilityBill',
    label: 'Utility Bill — Proof of Address',
    desc: 'Must show your name and current address. Issued within the last 60 days.',
  },
  {
    key: 'crEquifax',
    label: 'Equifax Credit Report',
    desc: 'Full report from Equifax. Free at AnnualCreditReport.com.',
  },
  {
    key: 'crExperian',
    label: 'Experian Credit Report',
    desc: 'Full report from Experian. Free at AnnualCreditReport.com.',
  },
  {
    key: 'crTransunion',
    label: 'TransUnion Credit Report',
    desc: 'Full report from TransUnion. Free at AnnualCreditReport.com.',
  },
];

const ACCEPTED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'pdf', 'heic', 'heif'];
const ACCEPTED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
  'image/heic',
  'image/heif',
];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPT_ATTR = '.jpg,.jpeg,.png,.pdf,.heic,.heif';
const ACCEPTED_LABEL = 'Accepted: JPG, PNG, PDF, HEIC — Max 10 MB';

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

type FieldErrors = Record<keyof SelectedFiles, string | null>;

const emptyErrors = (): FieldErrors => ({
  dlFront: null,
  dlBack: null,
  ssCard: null,
  utilityBill: null,
  crEquifax: null,
  crExperian: null,
  crTransunion: null,
  ftcReports: null,
  additionalFiles: null,
});

const validateFile = (file: File): string | null => {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  const typeOk =
    ACCEPTED_MIME_TYPES.includes(file.type.toLowerCase()) ||
    ACCEPTED_EXTENSIONS.includes(ext);

  if (!typeOk) {
    return 'This file type is not supported. Please upload a JPG, PNG, PDF, or HEIC file.';
  }
  if (file.size > MAX_BYTES) {
    return `File is too large (${formatSize(file.size)}). Maximum file size is 10 MB.`;
  }
  return null;
};

const Step2Documents: React.FC<Props> = ({
  selectedFiles,
  onFileSelect,
  onNext,
  onBack,
  uploading,
  ftcReports,
  additionalFiles,
  onFtcReportAdd,
  onFtcReportRemove,
  onAdditionalFileAdd,
  onAdditionalFileRemove,
}) => {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const ftcInputRef = useRef<HTMLInputElement>(null);
  const additionalInputRef = useRef<HTMLInputElement>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>(emptyErrors());

  const setError = (key: keyof SelectedFiles, msg: string | null) =>
    setFieldErrors((prev) => ({ ...prev, [key]: msg }));

  const handleFileChange = (key: keyof SelectedFiles, file: File) => {
    const error = validateFile(file);
    if (error) {
      setError(key, error);
      // Reset the input so the same file can be re-selected after fixing
      const input = inputRefs.current[key];
      if (input) input.value = '';
      return;
    }
    setError(key, null);
    onFileSelect(key, file);
  };

  const handleNext = () => {
    // Flag every missing document with a per-field error
    const missing: Partial<FieldErrors> = {};
    DOCS.forEach((doc) => {
      if (!selectedFiles[doc.key]) {
        missing[doc.key] = 'This document is required. Please choose a file to continue.';
      }
    });

    if (Object.keys(missing).length > 0) {
      setFieldErrors((prev) => ({ ...prev, ...missing }));
      return;
    }

    onNext();
  };

  const selectedCount = DOCS.filter((d) => selectedFiles[d.key]).length;

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow-red mb-3">Step 2 of 4</p>
        <h2 className="font-serif-display font-bold text-slate-dark text-2xl sm:text-3xl mb-2">
          Document Uploads
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed">
          These documents are required by the credit bureaus to process your disputes. Files are
          uploaded to a private, encrypted storage system — only your case team can access them.
        </p>
        <div className="mt-4 border border-neutral-200 bg-cream-50 px-4 py-3">
          <p className="text-xs text-neutral-500">
            <span className="font-semibold text-neutral-700">Need your credit reports?</span>{' '}
            Get all 3 free at{' '}
            <span className="font-medium text-luxury-red">AnnualCreditReport.com</span> — the only
            federally authorized source for free reports.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {DOCS.map((doc, i) => {
          const file = selectedFiles[doc.key];
          const hasFile = file !== null;
          const error = fieldErrors[doc.key];

          return (
            <div
              key={doc.key}
              className={[
                'border p-4 transition-colors duration-200',
                hasFile
                  ? 'border-green-300 bg-green-50'
                  : error
                  ? 'border-luxury-red/40 bg-luxury-red/5'
                  : 'border-neutral-200 bg-white',
              ].join(' ')}
            >
              {/* Top row: icon + label/desc + button */}
              <div className="flex items-start gap-4">
                {/* Status icon */}
                <div
                  className={[
                    'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors duration-200',
                    hasFile
                      ? 'border-green-500 bg-green-500 text-white'
                      : error
                      ? 'border-luxury-red/50 bg-luxury-red/10 text-luxury-red'
                      : 'border-neutral-300 bg-white text-neutral-400',
                  ].join(' ')}
                >
                  {hasFile ? '✓' : error ? '!' : i + 1}
                </div>

                {/* Label + desc */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-dark">{doc.label}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-0.5">{doc.desc}</p>
                </div>

                {/* Upload button */}
                <div className="shrink-0">
                  <input
                    ref={(el) => { inputRefs.current[doc.key] = el; }}
                    type="file"
                    accept={ACCEPT_ATTR}
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFileChange(doc.key, f);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => inputRefs.current[doc.key]?.click()}
                    disabled={uploading}
                    className={[
                      'border px-4 py-2 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-200 disabled:opacity-40',
                      hasFile
                        ? 'border-green-400 text-green-700 hover:bg-green-500 hover:text-white hover:border-green-500'
                        : 'border-neutral-300 text-neutral-600 hover:border-luxury-red hover:text-luxury-red',
                    ].join(' ')}
                  >
                    {hasFile ? 'Change' : 'Choose File'}
                  </button>
                </div>
              </div>

              {/* Bottom row: accepted formats / success / error */}
              <div className="mt-2 pl-12">
                {hasFile ? (
                  <div className="flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[11px] font-medium text-green-700 truncate">
                      {file.name}
                    </span>
                    <span className="text-[10px] text-green-500 shrink-0">
                      ({formatSize(file.size)})
                    </span>
                  </div>
                ) : error ? (
                  <p className="text-xs text-luxury-red leading-snug">{error}</p>
                ) : (
                  <p className="text-[10px] text-neutral-400">{ACCEPTED_LABEL}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-5 flex items-center gap-3">
        <div className="h-1.5 flex-1 rounded-full bg-neutral-100 overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${(selectedCount / DOCS.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-neutral-400 shrink-0">
          {selectedCount} / {DOCS.length} uploaded
        </span>
      </div>

      {/* Optional: FTC Identity Theft Report(s) */}
      <div className="mt-6 border border-neutral-200 bg-white p-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="text-sm font-semibold text-slate-dark">
              FTC Identity Theft Report(s){' '}
              <span className="text-neutral-400 font-normal text-xs">(Optional)</span>
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed mt-0.5">
              Upload any FTC Identity Theft Reports. These strengthen your dispute letters significantly.
              Get one free at{' '}
              <span className="font-medium text-luxury-red">IdentityTheft.gov</span>.
            </p>
          </div>
          <input
            ref={ftcInputRef}
            type="file"
            accept={ACCEPT_ATTR}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) { onFtcReportAdd(f); if (ftcInputRef.current) ftcInputRef.current.value = ''; }
            }}
          />
          <button
            type="button"
            onClick={() => ftcInputRef.current?.click()}
            disabled={uploading}
            className="shrink-0 border border-neutral-300 text-neutral-600 hover:border-luxury-red hover:text-luxury-red px-4 py-2 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-200 disabled:opacity-40"
          >
            + Add Report
          </button>
        </div>
        {ftcReports.length === 0 ? (
          <p className="text-[10px] text-neutral-400">{ACCEPTED_LABEL}</p>
        ) : (
          <div className="space-y-1.5">
            {ftcReports.map((file, i) => (
              <div key={i} className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <svg className="h-3.5 w-3.5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[11px] font-medium text-green-700 truncate">{file.name}</span>
                  <span className="text-[10px] text-green-500 shrink-0">({formatSize(file.size)})</span>
                </div>
                <button
                  type="button"
                  onClick={() => onFtcReportRemove(i)}
                  disabled={uploading}
                  className="ml-3 text-[10px] text-neutral-400 hover:text-luxury-red uppercase tracking-wider disabled:opacity-40"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optional: Additional Supporting Documents */}
      <div className="mt-4 border border-neutral-200 bg-white p-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="text-sm font-semibold text-slate-dark">
              Additional Supporting Documents{' '}
              <span className="text-neutral-400 font-normal text-xs">(Optional)</span>
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed mt-0.5">
              Prior dispute letters, bureau response letters, police reports, or any other case documents.
            </p>
          </div>
          <input
            ref={additionalInputRef}
            type="file"
            accept={ACCEPT_ATTR}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) { onAdditionalFileAdd(f); if (additionalInputRef.current) additionalInputRef.current.value = ''; }
            }}
          />
          <button
            type="button"
            onClick={() => additionalInputRef.current?.click()}
            disabled={uploading}
            className="shrink-0 border border-neutral-300 text-neutral-600 hover:border-luxury-red hover:text-luxury-red px-4 py-2 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-200 disabled:opacity-40"
          >
            + Add File
          </button>
        </div>
        {additionalFiles.length === 0 ? (
          <p className="text-[10px] text-neutral-400">{ACCEPTED_LABEL}</p>
        ) : (
          <div className="space-y-1.5">
            {additionalFiles.map((file, i) => (
              <div key={i} className="flex items-center justify-between bg-neutral-50 border border-neutral-200 px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[11px] font-medium text-neutral-700 truncate">{file.name}</span>
                  <span className="text-[10px] text-neutral-400 shrink-0">({formatSize(file.size)})</span>
                </div>
                <button
                  type="button"
                  onClick={() => onAdditionalFileRemove(i)}
                  disabled={uploading}
                  className="ml-3 text-[10px] text-neutral-400 hover:text-luxury-red uppercase tracking-wider disabled:opacity-40"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-neutral-100 pt-8">
        <button
          type="button"
          onClick={onBack}
          disabled={uploading}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 hover:text-luxury-red transition-colors disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={uploading}
          className="group relative inline-flex items-center justify-center overflow-hidden border border-neutral-950 bg-neutral-950 text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_18px_45px_rgba(17,17,17,0.16)] before:absolute before:inset-0 before:-translate-x-full before:bg-[#7a1c1c] before:transition-transform before:duration-300 hover:border-[#7a1c1c] hover:before:translate-x-0 disabled:opacity-60 disabled:pointer-events-none"
        >
          <span className="relative z-10">
            {uploading ? 'Uploading…' : 'Upload & Continue →'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Step2Documents;
