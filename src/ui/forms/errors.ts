import type { InfraError } from '@/shared/result'

export const getInfraErrorMessage = (error: InfraError): string => {
  void error
  return 'Something went wrong. Please try again.'
}
