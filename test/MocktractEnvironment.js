const NodeEnvironment = require('jest-environment-node')
const Mocktract = require('../index')
const TestABI = require('./TestABI')

module.exports = class MocktractEnvironment extends NodeEnvironment {
  async setup() {
    this.global.M = new Mocktract('0xMOCKTRACT', TestABI.abi)
  }
}
