import { GenericContainer, StoppedTestContainer, StartedTestContainer, TestContainers } from 'testcontainers';

// Here configure all docker containers you need
const registeredE2eContainers = {
  redis5: { image: 'redis:5-alpine', port: 6379 },
  redis6: { image: 'redis:6-alpine', port: 6379 },
} as const;

type ContainerKey = keyof typeof registeredE2eContainers;

type E2eContainer = { container: StartedTestContainer; dsn: string };

export class E2eDockerContainers {
  static _instances: Map<ContainerKey, E2eContainer> = new Map();

  static async getContainer(key: ContainerKey): Promise<E2eContainer> {
    if (!E2eDockerContainers._instances.has(key)) {
      const { image, port } = registeredE2eContainers[key];
      const container = await new GenericContainer(image).withExposedPorts(port).start();
      const dsn = `redis://${container.getHost()}:${container.getMappedPort(port)}`;
      console.log('STARTED', key, dsn);
      E2eDockerContainers._instances.set(key, {
        container,
        dsn,
      });
    }
    return E2eDockerContainers._instances.get(key) as E2eContainer;
  }

  static async shutdownAll(): Promise<true> {
    for (const [key, { container, dsn }] of E2eDockerContainers._instances) {
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
