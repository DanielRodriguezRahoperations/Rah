import React, { useRef, useState } from 'react';

const TestUploadPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const append = (msg: string) => setLog((prev) => [...prev, msg]);

  const handleUpload = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) { append('No file selected.'); return; }

    setBusy(true);
    setLog([]);
    append(`File: ${file.name} (${(file.size / 1024).toFixed(1)} KB, ${file.type || 'unknown type'})`);

    const clientId = crypto.randomUUID();
    const storageName = 'test-file';
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
    const urlEndpoint = `/api/upload?clientId=${encodeURIComponent(clientId)}&storageName=${encodeURIComponent(storageName)}&ext=${encodeURIComponent(ext)}`;

    append(`\nStep 1 — GET ${urlEndpoint}`);

    let urlRes: Response | null = null;
    try {
      urlRes = await fetch(urlEndpoint);
    } catch (err) {
      append(`Network error: ${err}`);
      setBusy(false);
      return;
    }

    const urlBody = await urlRes.text();
    append(`Status: ${urlRes.status} ${urlRes.statusText}`);
    append(`Body: ${urlBody}`);

    if (!urlRes.ok) {
      append('\nFailed at Step 1 — signed URL not returned.');
      setBusy(false);
      return;
    }

    let signedUrl: string;
    let path: string;
    try {
      ({ signedUrl, path } = JSON.parse(urlBody));
    } catch {
      append('Could not parse JSON from Step 1 response.');
      setBusy(false);
      return;
    }

    append(`\nPath: ${path}`);
    append(`\nStep 2 — PUT ${signedUrl.slice(0, 80)}…`);

    let uploadRes: Response | null = null;
    try {
      uploadRes = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
      });
    } catch (err) {
      append(`Network error on PUT: ${err}`);
      setBusy(false);
      return;
    }

    const uploadBody = await uploadRes.text();
    append(`Status: ${uploadRes.status} ${uploadRes.statusText}`);
    append(`Body: ${uploadBody}`);

    if (uploadRes.ok) {
      append('\n✓ Upload succeeded.');
    } else {
      append('\n✗ Upload failed at Step 2 (PUT to Supabase).');
    }

    setBusy(false);
  };

  return (
    <div style={{ fontFamily: 'monospace', padding: '2rem', maxWidth: '700px' }}>
      <h1 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Upload API Test</h1>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <input ref={inputRef} type="file" />
        <button
          onClick={handleUpload}
          disabled={busy}
          style={{ padding: '0.5rem 1.2rem', cursor: busy ? 'not-allowed' : 'pointer' }}
        >
          {busy ? 'Testing…' : 'Test Upload'}
        </button>
      </div>
      {log.length > 0 && (
        <pre style={{
          background: '#111',
          color: '#e5e5e5',
          padding: '1rem',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          fontSize: '0.78rem',
          lineHeight: '1.6',
        }}>
          {log.join('\n')}
        </pre>
      )}
    </div>
  );
};

export default TestUploadPage;
