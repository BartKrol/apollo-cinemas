const { PubSub, SubscriptionManager } = require('graphql-subscriptions')
const pubsub = new PubSub()

function createSubscriptionManager(schema) {
  return new SubscriptionManager({
    schema,
    pubsub,
    setupFunctions: {
      commentAdded: (options, args) => {
        return {
          commentAdded: () => true
        }
      }
    }
  })
}

module.exports = {
  createSubscriptionManager,
  pubsub
}
