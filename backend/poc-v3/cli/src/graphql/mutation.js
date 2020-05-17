const gql = require('graphql-tag')
const client = require('./client')

module.exports.startOneBlockMutation = async ({ id, userId }) => {
  const {
    data: { updateOneBlock },
  } = await client.mutate({
    mutation: gql`
      mutation startOneBlockMutation(
        $data: BlockUpdateInput!
        $where: BlockWhereUniqueInput!
      ) {
        updateOneBlock(data: $data, where: $where) {
          id
          state
        }
      }
    `,
    variables: {
      data: { state: 'ACTIVE' },
      where: { id: id },
    },
  })
  return updateOneBlock
}

module.exports.completeOneBlockMutation = async ({ id, userId }) => {
  const {
    data: { updateOneBlock },
  } = await client.mutate({
    mutation: gql`
      mutation completeOneBlockMutation(
        $data: BlockUpdateInput!
        $where: BlockWhereUniqueInput!
      ) {
        updateOneBlock(data: $data, where: $where) {
          id
          state
        }
      }
    `,
    variables: {
      data: { state: 'COMPLETE' },
      where: { id: id },
    },
  })
  return updateOneBlock
}

module.exports.addOneResponderMutation = async ({ id, userId }) => {
  const {
    data: { updateOneBlock },
  } = await client.mutate({
    mutation: gql`
      mutation addOneResponderMutation(
        $data: BlockUpdateInput!
        $where: BlockWhereUniqueInput!
      ) {
        updateOneBlock(data: $data, where: $where) {
          id
          responders {
            name
          }
        }
      }
    `,
    variables: {
      data: { responders: { connect: { id: userId } } },
      where: { id: id },
    },
  })
  return updateOneBlock
}

module.exports.createOneRootBlockMutation = async ({ data }) => {
  const {
    data: { createOneBlock },
  } = await client.mutate({
    mutation: gql`
      mutation createRootBlock($data: BlockCreateInput!) {
        createOneBlock(data: $data) {
          id
          name
          description
          parent {
            id
            name
            state
          }
          children {
            id
          }
          state
          control
          type
          inCatalog
          requestors {
            id
            name
            email
          }
          responders {
            id
            name
            email
          }
        }
      }
    `,
    variables: { data: data },
  })
  return createOneBlock
}
