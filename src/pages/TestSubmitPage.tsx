import React, { useState } from 'react';

const TEST_PAYLOAD = {
  clientId: crypto.randomUUID(),
  fullName: 'Test Client',
  dob: '1990-01-15',
  ssn: '123-45-6789',
  address: '123 Test St',
  city: 'Scottsdale',
  state: 'AZ',
  zip: '85266',
  phone: '(623) 555-0100',
  email: 'daniel@rahoperations.com',
  goals: 'Remove late payments and collections from credit report.',
  timeline: '3-6 months',
  disputedAccounts: 'Capital One — late payments 2022',
  agreedToCroa: true,
  signatureName: 'Test Client',
  signatureDate: new Date().toISOString().split('T')[0],
  docPaths: {
    dlFront: 'test-client/dl-front.jpg',
    dlBack: 'test-client/dl-back.jpg',
    ssCard: 'test-client/ss-card.jpg',
    utilityBill: 'test-client/utility-bill.pdf',
    crEquifax: 'test-client/cr-equifax.pdf',
    crExperian: 'test-client/cr-experian.pdf',
    crTransunion: 'test-client/cr-transunion.pdf',
  },
};

const TestSubmitPage: React.FC = () => {
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const append = (msg: string) => setLog((prev) => [...prev, msg]);

  const handleSubmit = async () => {
    setBusy(true);
    setLog([]);

    const payload = { ...TEST_PAYLOAD, clientId: crypto.randomUUID() };
    append(`POST /api/intake`);
    append(`Payload: ${JSON.stringify(payload, null, 2)}`);

    let res: Response | null = null;
    try {
      res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      append(`\nNetwork error: ${err}`);
      setBusy(false);
      return;
    }

    const body = await res.text();
    append(`\nStatus: ${res.status} ${res.statusText}`);
    append(`Body: ${body}`);

    if (res.ok) {
      append('\n✓ Submission succeeded — check DB and email.');
    } else {
      append('\n✗ Submission failed.');
    }

    setBusy(false);
  };

  return (
    <div style={{ fontFamily: 'monospace', padding: '2rem', maxWidth: '700px' }}>
      <h1 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Intake Submit API Test</h1>
      <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1.5rem' }}>
        Sends a hardcoded POST to /api/intake. Check Supabase DB and daniel@rahoperations.com after clicking.
      </p>
      <button
        onClick={handleSubmit}
        disabled={busy}
        style={{ padding: '0.5rem 1.5rem', cursor: busy ? 'not-allowed' : 'pointer', marginBottom: '1.5rem' }}
      >
        {busy ? 'Submitting…' : 'Test Submit'}
      </button>
      {log.length > 0 && (
        <pre style={{
          background: '#111',
          color: '#e5e5e5',
          padding: '1rem',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          fontSize: '0.75rem',
          lineHeight: '1.6',
        }}>
          {log.join('\n')}
        </pre>
      )}
    </div>
  );
};

export default TestSubmitPage;
