import { dayjs } from '@/shared/lib/dayjs';

export const getFilenameWithDate = (filename: string) => {
  const extensionDotIndex = filename.lastIndexOf('.');
  const name = filename.slice(0, extensionDotIndex);
  const extension = filename.slice(extensionDotIndex + 1);
  return `${name} ${dayjs(new Date()).format('YYYY-MM-DD HH-mm-ss')}.${extension}`;
};
