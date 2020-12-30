import { createIoRedisNativeConnection, createIoRedisConnection } from '@soluble/cache-ioredis';
import { E2eDockerContainers } from '../../config/docker-container.config';

const startContainer = async (): Promise<string> => {
  const { dsn } = await E2eDockerContainers.getContainer('redis6');
  return dsn;
};

describe('ioredis-connection.factory', () => {
  let instanceDsn: string;
  beforeAll(async () => {
    instanceDsn = await startContainer();
  });

  describe('createIoRedisNativeConnection', () => {
    describe('when dsn is valid', () => {
      it('should create a lazy connection', async () => {
        const conn = createIoRedisNativeConnection(instanceDsn);
        const status = conn.status;
        await conn.quit();
        expect(status).toStrictEqual('connecting');
      });
    });
  });
  describe('createIORedisConnection', () => {
    describe('When conn is a valid string', () => {
      it('should be able to talk to the server and quit', async () => {
        const conn = createIoRedisConnection(instanceDsn);
        const native = conn.getNativeConnection();

        const ping = await native.echo('cool');
        expect(ping).toStrictEqual('cool');

        const resp = await conn.quit();
        expect(resp).toStrictEqual(true);

        await expect(native.echo('hey')).rejects.toThrow(/closed/i);
      });
    });
  });
});
