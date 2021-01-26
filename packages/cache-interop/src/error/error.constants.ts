export const errorReasons = {
  INVALID_KEY: 'Invalid key argument',
  WRITE_ERROR: "Can't write to the cache",
  READ_ERROR: "Can't read from the cache",
  COMMAND_ERROR: "Can't execute operation",
  VALUE_PROVIDER_ERROR: "Can't execute the cache value provider function",
  UNEXPECTED_REPLY: 'Unexpected response from driver',
  UNSUPPORTED_VALUE: 'Unsupported value',
  UNEXPECTED_ERROR: 'Unexpected error',
} as const;

export type ErrorReasons = keyof typeof errorReasons;
