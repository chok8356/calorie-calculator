import { getFilenameWithDate } from '@/shared/lib';

export const downloadJson = (content: any, filename: string) => {
  const a = document.createElement('a');
  const file = new Blob([JSON.stringify(content, null, 2)], { type: 'text/plain' });
  a.href = URL.createObjectURL(file);
  a.download = getFilenameWithDate(`${filename}.json`);
  a.click();
};
