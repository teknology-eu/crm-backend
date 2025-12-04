interface Container {
  id: string;
}

interface DockerClient {
  containers: { [id: string]: Container };
  start(containerId: string): Promise<void>;
  stop(containerId: string): Promise<void>;
  inspect(containerId: string): Promise<Container>;
}

class DockerManager {
  private readonly dockerClient: DockerClient;

  constructor() {
    this.dockerClient = new DockerClientImpl(); // TODO: Implement DockerClient interface
  }

  public async start(containerId: string): Promise<void> {
    console.log(`Starting container ${containerId}`);
    await this.dockerClient.start(containerId);
  }

  public async stop(containerId: string): Promise<void> {
    console.log(`Stopping container ${containerId}`);
    await this.dockerClient.stop(containerId);
  }

  public async debug(): Promise<void> {
    console.log("Showing container information");
    for (const id in this.dockerClient.containers) {
      const container = await this.dockerClient.inspect(id);
      console.log(`Container ${container.id}:`, container);
    }
  }
}