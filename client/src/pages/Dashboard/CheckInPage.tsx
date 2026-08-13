import { useState } from "react";

import QRScanner from "../../features/ticket/QRScanner/QRScanner";

function CheckInPage() {
  const [scannedCode, setScannedCode] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const handleScan = (
    ticketCode: string
  ) => {
    setScannedCode(ticketCode);
    setError(null);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-white">
        Event Check-in
      </h1>

      <p className="mt-2 text-slate-400">
        Scan an attendee's QR ticket to
        check them in.
      </p>

      <div className="mt-8">
        <QRScanner
          onScan={handleScan}
          onError={setError}
        />
      </div>

      {scannedCode && (
        <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <p className="text-sm text-slate-400">
            Scanned Ticket
          </p>

          <p className="mt-2 font-mono text-lg font-semibold text-white">
            {scannedCode}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}

export default CheckInPage;