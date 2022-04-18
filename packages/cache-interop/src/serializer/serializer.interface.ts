import type { JsonType } from '../types/json.type';

export interface SerializerInterface {
  /**
   * @throws SyntaxError
   */
  decode<TOutput extends JsonType>(value: string): TOutput;

  /**
   * @throws TypeError
   */
  encode<TInput extends JsonType>(value: TInput): string;
}
