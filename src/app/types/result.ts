export type Result<T, E> = IOk<T> | IErr<E>;

export const Ok = <T>(value: T): Result<T, never> => ({
  ok: true as const,
  err: false as const,
  value,
});
export const Err = <E>(error: E): Result<never, E> => ({
  ok: false as const,
  err: true as const,
  error,
});

interface IOk<T> {
  ok: true;
  err: false;
  value: T;
}

interface IErr<E> {
  ok: false;
  err: true;
  error: E;
}
