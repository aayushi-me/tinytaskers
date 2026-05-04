// src/types/global.d.ts
declare class BarcodeDetector {
    constructor(options: { formats: string[] });
    detect(video: HTMLVideoElement): Promise<Array<{ rawValue: string }>>;
  }
  
  // Optionally, you can extend the window object if you want to globally access BarcodeDetector
  interface Window {
    BarcodeDetector: typeof BarcodeDetector;
  }
  