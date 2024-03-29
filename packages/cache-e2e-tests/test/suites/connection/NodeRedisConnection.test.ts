import {
  createRedisNativeConnection,
  createRedisConnection,
} from '@soluble/cache-redis';
import { E2eDockerContainers } from '../../setup/E2eDockerContainers';

const startContainer = async (): Promise<string> => {
  const { dsn } = await E2eDockerContainers.getContainer('redis6');
  return dsn;
};

describe('redis-connection.factory', () => {
  let instanceDsn: string;
  beforeAll(async () => {
    instanceDsn = await startContainer();
  });

  describe('createRedisNativeConnection', () => {
    describe('when dsn is valid', () => {
      it('should create a lazy connection', async () => {
        const conn = createRedisNativeConnection(instanceDsn);
        const connected = conn.connected;
        await conn.quit();
        expect(connected).toStrictEqual(false);
      });
    });
  });
  describe('createRedisConnection', () => {
    describe('When conn is a valid string', () => {
      it('should be able to talk to the server and quit', async () => {
        const conn = createRedisConnection(instanceDsn);
        const native = conn.getNativeConnection();

        const echo = async () =>
          new Promise((resolve, reject) => {
            native.echo('cool', (err, reply) => {
              // eslint-disable-next-line jest/no-conditional-in-test
              if (err instanceof Error) {
                reject(err.message);
                return;
              }
              resolve(reply);
            });
          });

        await expect(echo()).resolves.toStrictEqual('cool');

        const resp = await conn.quit();
        expect(resp).toStrictEqual(true);
        await expect(echo()).rejects.toMatch(/closed/i);
      });
    });
  });
});
