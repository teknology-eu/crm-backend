class DockerManager {
  async start(containerId: string) {
    await exec(`docker start ${containerId}`);
    await exec(`docker attach ${containerId}`);
  }

  async stop(containerId: string) {
    await exec(`docker stop ${containerId}`);
  }

  async debug(containerId: string) {
    const logs = await exec(`docker logs -f ${containerId}`);
    const info = await exec(`docker inspect --format='{{json .State}}' ${containerId}`);
    return { logs, info };
  }

  private async exec(command: string) {
    const { stdout, stderr } = await execSync(command);
    if (stderr) throw new Error(`Error executing command: ${command}\n${stderr.toString()}`);
    return stdout.toString();
  }
}