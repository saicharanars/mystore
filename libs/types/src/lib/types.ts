// In any library or application file
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});
export { schema };
export type User = z.infer<typeof schema>;
export function types(): string {
  return 'types';
}
