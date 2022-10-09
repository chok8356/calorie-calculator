import { getRandomInteger, wait } from '@/shared/lib';

export const waitingServerResponse = (value: any = undefined) => {
  return wait(getRandomInteger(50, 500), value);
};
