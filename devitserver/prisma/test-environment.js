const NodeEnvironment = require("jest-environment-node").default;
const { PrismaClient } = require("@prisma/client");

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.client = new PrismaClient();
  }

  async setup() {
    await super.setup();
    await this.client.$connect();
  }

  async teardown() {
    await this.client.$disconnect();
    await super.teardown();
  }
}

module.exports = PrismaTestEnvironment;