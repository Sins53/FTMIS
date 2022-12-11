export const downloadBlob = (fileName: string, blob: Blob): void => {
  const w = window as any;
  if (w.navigator?.msSaveOrOpenBlob) {
    w.navigator?.msSaveBlob(blob, fileName);
  } else {
    const anchor = window.document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(anchor.href);
  }
};
