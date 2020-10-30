import { JsonType } from '../types/json.type';
import { SerializerInterface } from '../serializer/serializer.interface';

export class NativeJsonSerializer implements SerializerInterface {
  /**
   * @throws SyntaxError
   */
  decode<TOutput extends JsonType>(value: string): TOutput {
    let decoded: TOutput | null;
    try {
      decoded = JSON.parse(value) as TOutput;
    } catch (e) {
      console.log('@todo decide what kind of exception');
      throw e;
    }
    return decoded;
  }

  /**
   * @throws TypeError
   */
  encode<TInput extends JsonType>(value: TInput): string {
    return JSON.stringify(value);
  }
}
