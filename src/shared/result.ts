export type AsyncResult<T, E> = Promise<Result<T, E>>
export type Err<E> = { error: E; ok: false }
export type InfraError = { _t: 'infra' }
export type Ok<T> = { ok: true; value: T }

export type Result<T, E> = Err<E> | Ok<T>

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value })
export const err = <E>(error: E): Err<E> => ({ error, ok: false })

export const toInfraError = (): InfraError => ({ _t: 'infra' })

