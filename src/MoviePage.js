import React from 'react'
import { graphql } from 'react-apollo'
import { TextField, RaisedButton, Card, CardText } from 'material-ui'
import gql from 'graphql-tag'
import update from 'react-addons-update'
import uuid from 'uuid'

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: '',
      mutationLoading: ''
    }

    this.submitForm = this.submitForm.bind(this)
    this.subscription = null
  }

  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.loading) {
      this.subscription = this.props.subscribeToMore({
        document: SUBSCRIPTION_QUERY,
        updateQuery: (prev, { subscriptionData }) => {
          const newComment = subscriptionData.data.commentAdded;

          // if (!prev.movie.comments.find(comment => comment.id === newComment.id)) {
          //   return prev
          // }

          return update(prev, {
            movie: {
              comments: {
                $unshift: [newComment]
              }
            }
          })
        },
      });
    }
  }
  submitForm(event) {
    event.preventDefault();
    const { movie, submit } = this.props
    const commentContent = this.state.newComment

    if (commentContent) {
      submit({
        movieId: movie.id,
        commentContent: commentContent
      })
    }
  }

  render() {
    const { loading, movie } = this.props
    const { mutationLoading } = this.state

    if (loading) {
      return <div>Loading...</div>
    }

    const updateInput = event => {
      this.setState({ newComment: event.target.value })
    }

    const loader = mutationLoading ? <div style={{paddingBottom: 20}}>Loading...</div> : null

    const comments = movie.comments.map(comment => <Card key={ comment.id }>
      <CardText>
        { comment.content }
      </CardText>
    </Card>)

    return <div style={ { margin: '20px 40px' }}>
      <h1>{ movie.title }</h1>

      <div>
        <form onSubmit={ this.submitForm }>
          <TextField
            value={ this.state.newComment }
            onChange={ updateInput }
            type="text"
            placeholder="Your comment"
          />
          <RaisedButton style={ { marginLeft: 20 } } type="submit">
            Send
          </RaisedButton>
        </form>
      </div>

      <br />
      <div>
        { comments }
      </div>
    </div>
  }
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation submitComment($movieId: ID!, $commentContent: String!) {
    submitComment(movieId: $movieId, commentContent: $commentContent) {
      id
      content
    }
  }
`

const withMutations = graphql(SUBMIT_COMMENT_MUTATION, {
  props: ({ ownProps, mutate, loading }) => ({
    submit: ({ movieId, commentContent }) => mutate({
      variables: { movieId, commentContent },
      optimisticResponse: {
        __typename: 'Mutation',
        submitComment: {
          __typename: 'Comment',
          id: uuid.v4(),
          content: commentContent,
        }
      },
      updateQueries: {
        getComments: (prev, { mutationResult }) => {
          const newComment = mutationResult.data.submitComment;
          return update(prev, {
            movie: {
              comments: {
                $unshift: [newComment]
              }
            }
          })
        }
      }
    })
  })
});

export const COMMENT_QUERY = gql`
  query getComments($id: ID!) {
    movie(id: $id) {
      id
      title
      comments {
        id
        content
      }
    }
  }
`

const SUBSCRIPTION_QUERY = gql`
  subscription onCommentAdded {
    commentAdded {
      id
      content
    }
  }
`

const withData = graphql(COMMENT_QUERY, {
  options: ({ params }) => ({
    variables: { id: params.id },
  }),
  props: ({ data: { loading, movie, subscribeToMore } }) => ({
    loading,
    movie,
    subscribeToMore
  }),
});

export default withData(withMutations(MoviePage))
