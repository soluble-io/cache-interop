import type { SerializerInterface } from '../serializer/serializer.interface';
import type { JsonType } from '../types/json.type';

export class NativeJsonSerializer implements SerializerInterface {
  /**
   * @throws SyntaxError
   */
  decode<TOutput extends JsonType>(value: string): TOutput {
    let decoded: TOutput | null;
    return JSON.parse(value) as TOutput;
  }

  /**
   * @throws TypeError
   */
  encode<TInput extends JsonType>(value: TInput): string {
    if (value === undefined) {
      throw new TypeError('Cannot encode undefined value');
    }
    return JSON.stringify(value);
  }
}
