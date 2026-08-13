import { useEffect, useRef } from "react";
import {
  Html5Qrcode,
  Html5QrcodeScannerState,
} from "html5-qrcode";

interface QRScannerProps {
  onScan: (ticketCode: string) => void;
  onError?: (error: string) => void;
}

function QRScanner({
  onScan,
  onError,
}: QRScannerProps) {
  const scannerRef =
    useRef<Html5Qrcode | null>(null);

  const hasScannedRef =
    useRef(false);

  useEffect(() => {
    const scanner = new Html5Qrcode(
      "qr-reader"
    );

    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        await scanner.start(
          {
            facingMode: "environment",
          },
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },
          (decodedText) => {
            // Prevent multiple callbacks
            if (hasScannedRef.current) {
              return;
            }

            hasScannedRef.current = true;

            onScan(decodedText);
          },
          () => {
            // Ignore normal scan failures.
            // Scanner continuously tries to detect QR codes.
          }
        );
      } catch (error) {
        console.error(
          "QR scanner failed:",
          error
        );

        onError?.(
          "Unable to access camera. Please allow camera permission."
        );
      }
    };

    startScanner();

    return () => {
      const currentScanner =
        scannerRef.current;

      if (
        currentScanner &&
        currentScanner.getState() ===
          Html5QrcodeScannerState.SCANNING
      ) {
        currentScanner
          .stop()
          .catch((error) => {
            console.error(
              "Failed to stop QR scanner:",
              error
            );
          });
      }
    };
  }, [onScan, onError]);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
      <div
        id="qr-reader"
        className="w-full"
      />
    </div>
  );
}

export default QRScanner;