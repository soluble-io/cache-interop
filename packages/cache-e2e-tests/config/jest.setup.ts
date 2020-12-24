import { E2eDockerContainers } from './docker-container.config';

jest.setTimeout(30000);

const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

afterAll(async () => {
  await E2eDockerContainers.shutdownAll();
});

export {};
