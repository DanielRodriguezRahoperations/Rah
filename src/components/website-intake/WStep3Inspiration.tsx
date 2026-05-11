import React from 'react';

interface Props {
  data: {
    brandsTheyLove: string;
    brandsTheyHate: string;
    hasLogo: string;
    hasPhotos: string;
    hasCopy: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const inputClass =
  'w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-luxury-red transition-colors placeholder-neutral-600';
const labelClass = 'block text-xs uppercase tracking-widest text-neutral-400 mb-2';

const ASSET_OPTIONS = ['Yes', 'No', 'Need help'];

interface AssetRadioProps {
  label: string;
  field: string;
  value: string;
  noLabel?: string;
  needLabel?: string;
  onChange: (field: string, value: string) => void;
}

const AssetRadio: React.FC<AssetRadioProps> = ({
  label, field, value, noLabel = 'No', needLabel = 'Need one', onChange
}) => (
  <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-4">
    <p className={labelClass}>{label}</p>
    <div className="flex gap-3 flex-wrap">
      {['yes', 'no', 'need'].map((opt) => {
        const displayLabel = opt === 'yes' ? 'Yes' : opt === 'no' ? noLabel : needLabel;
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(field, opt)}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-sm border transition-all ${
              selected
                ? 'bg-luxury-red border-luxury-red text-white'
                : 'border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white'
            }`}
          >
            {displayLabel}
          </button>
        );
      })}
    </div>
  </div>
);

const WStep3Inspiration: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const isValid = data.brandsTheyLove.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-neutral-400 font-serif-body leading-relaxed">
        Design direction is easier to communicate through examples. Be honest — the more specific, the better.
      </p>

      <div>
        <label className={labelClass}>3 websites you love and why *</label>
        <textarea
          value={data.brandsTheyLove}
          onChange={(e) => onChange('brandsTheyLove', e.target.value)}
          required
          rows={5}
          placeholder={`apple.com — clean and premium feeling\nstripe.com — technical but approachable\nlinear.app — minimal and fast`}
          className={`${inputClass} resize-none leading-relaxed font-mono text-xs`}
        />
        <p className="mt-1.5 text-xs text-neutral-600">Include the URL and what you like about each one.</p>
      </div>

      <div>
        <label className={labelClass}>3 things you absolutely do NOT want</label>
        <textarea
          value={data.brandsTheyHate}
          onChange={(e) => onChange('brandsTheyHate', e.target.value)}
          rows={4}
          placeholder={`Cheap stock photos, cluttered layout, too much text, dark backgrounds`}
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </div>

      <div className="space-y-3">
        <p className={labelClass}>Assets you already have</p>
        <AssetRadio
          label="Do you have a logo?"
          field="hasLogo"
          value={data.hasLogo}
          noLabel="No"
          needLabel="Need one"
          onChange={onChange}
        />
        <AssetRadio
          label="Do you have photos or brand images?"
          field="hasPhotos"
          value={data.hasPhotos}
          noLabel="No"
          needLabel="Need them"
          onChange={onChange}
        />
        <AssetRadio
          label="Do you have website copy / content written?"
          field="hasCopy"
          value={data.hasCopy}
          noLabel="No"
          needLabel="Need help"
          onChange={onChange}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-neutral-700 text-neutral-400 hover:text-white py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="flex-1 bg-luxury-red hover:bg-luxury-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-sm transition-colors uppercase tracking-widest text-sm"
        >
          Continue →
        </button>
      </div>
    </form>
  );
};

export default WStep3Inspiration;
