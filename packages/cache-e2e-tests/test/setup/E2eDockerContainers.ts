import type { StartedTestContainer } from 'testcontainers';
import { GenericContainer } from 'testcontainers';

// Here configure all docker containers you need
const registeredE2eContainers = {
  redis6: { image: 'redis:6-alpine3.18', port: 6377, containerPort: 6379 },
  redis7: { image: 'redis:7-alpine3.18', port: 6378, containerPort: 6379 },
  dragonflyLatest: {
    image: 'docker.dragonflydb.io/dragonflydb/dragonfly',
    port: 6379,
    containerPort: 6379,
  },
} as const;

type ContainerKey = keyof typeof registeredE2eContainers;

type E2eContainer = { container: StartedTestContainer; dsn: string };

export class E2eDockerContainers {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static _instances: Map<ContainerKey, E2eContainer> = new Map();

  static async getContainer(key: ContainerKey): Promise<E2eContainer> {
    if (!E2eDockerContainers._instances.has(key)) {
      const { image, port, containerPort } = registeredE2eContainers[key];
      const container = await new GenericContainer(image)
        .withExposedPorts({
          container: containerPort,
          host: port,
        })
        .start();
      const dsn = `redis://${container.getHost()}:${container.getMappedPort(
        port
      )}`;
      console.log('STARTED', key, dsn);
      E2eDockerContainers._instances.set(key, {
        container,
        dsn,
      });
    }
    return E2eDockerContainers._instances.get(key) as E2eContainer;
  }

  static async shutdownAll(): Promise<true> {
    for (const [key, { container }] of E2eDockerContainers._instances) {
      try {
        await container.stop({
          timeout: 5000,
        });
      } catch (e) {
        console.error('Cannot stop container', key, e);
      } finally {
        E2eDockerContainers._instances.delete(key);
      }
    }
    return true;
  }
}
