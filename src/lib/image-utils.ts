/**
 * Image processing utilities for client-side local photo upload.
 * Compresses phone camera photos (5MB - 15MB) into lightweight JPEG data URLs (~100KB - 250KB)
 * using HTML5 Canvas before persisting to localStorage or state.
 */

export interface Dimensions {
  width: number;
  height: number;
}

/**
 * Calculates scaled down dimensions while preserving the original aspect ratio.
 * Images smaller than maxWidth and maxHeight are not upscaled.
 */
export function calculateTargetDimensions(
  origWidth: number,
  origHeight: number,
  maxDimension = 1000,
  maxHeight?: number
): Dimensions {
  if (origWidth <= 0 || origHeight <= 0) {
    return { width: maxDimension, height: maxHeight || maxDimension };
  }

  const maxWidth = maxDimension;
  const maxH = maxHeight ?? maxDimension;

  let width = origWidth;
  let height = origHeight;

  // Scale down if either dimension exceeds its maximum bound
  if (width > maxWidth || height > maxH) {
    const ratio = Math.min(maxWidth / width, maxH / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  return { width, height };
}

/**
 * Compresses a local File or Blob into a compressed JPEG Base64 Data URL.
 * Automatically downscales large phone camera pictures.
 */
export async function compressImageFile(
  file: File | Blob,
  maxWidth = 1000,
  quality = 0.8
): Promise<string> {
  // Check if running in a browser environment with Canvas support
  if (
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    typeof HTMLCanvasElement === 'undefined'
  ) {
    // Node.js test environment or SSR fallback: convert directly to base64 data URL
    return new Promise<string>((resolve, reject) => {
      if (typeof FileReader !== 'undefined') {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } else {
        // Fallback for Node buffer
        if (file instanceof Blob) {
          file.arrayBuffer().then((buf) => {
            const b64 = Buffer.from(buf).toString('base64');
            const type = file.type || 'image/jpeg';
            resolve(`data:${type};base64,${b64}`);
          }).catch(reject);
        } else {
          resolve('data:image/jpeg;base64,mockImage');
        }
      }
    });
  }

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const srcUrl = event.target?.result as string;
      if (!srcUrl) {
        reject(new Error('Failed to read image file data.'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          const { width, height } = calculateTargetDimensions(
            img.naturalWidth || img.width,
            img.naturalHeight || img.height,
            maxWidth
          );

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            // If canvas context unavailable, fallback to original data url
            resolve(srcUrl);
            return;
          }

          // Smooth rendering for downsizes
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Export compressed JPEG
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (err) {
          // Fallback if canvas export fails
          resolve(srcUrl);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for compression.'));
      };

      img.src = srcUrl;
    };

    reader.onerror = () => {
      reject(new Error('FileReader failed to read the file.'));
    };

    reader.readAsDataURL(file);
  });
}
