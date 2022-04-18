import { E2eDockerContainers } from './E2eDockerContainers';

jest.setTimeout(60_000);

afterAll(async () => {
  await E2eDockerContainers.shutdownAll();
});

export {};
