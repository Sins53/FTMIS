import { generateFileUrl } from '..';

export const handleOpenFile = (fileUrl: string) => {
  if (fileUrl) {
    const url = generateFileUrl(fileUrl);
    window.open(url, '_target');
  }
};

export const handleDownloadFile = (fileUrl: string, filename?: string) => {
  if (fileUrl) {
    const url = generateFileUrl(fileUrl);
    if (url) {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = filename || 'download';
          link.click();
        })
        .catch(console.error);
    }
  }
};
