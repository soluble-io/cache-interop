import { JsonType } from '../types/json.type';
import { SerializerInterface } from '../serializer/serializer.interface';

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
