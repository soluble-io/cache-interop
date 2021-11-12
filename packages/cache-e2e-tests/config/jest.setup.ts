import { E2eDockerContainers } from './docker-container.config';

jest.setTimeout(60_000);

afterAll(async () => {
  await E2eDockerContainers.shutdownAll();
});

export {};
