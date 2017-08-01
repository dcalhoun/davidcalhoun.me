import ButtonTweet from '../ButtonTweet'
import CodeBlock from '../CodeBlock'
import IssueCTA from '../IssueCTA'
import Markdown from 'react-markdown'
import syntaxStyles from './index.css'
import { styled } from 'styletron-react'

const PostTitle = styled('h1', props => ({
  color: props.color,
  fontFamily: '"Avenir Next", sans-serif',
  fontSize: '1.5rem',
  fontWeight: 'normal',
  marginTop: '0rem',

  '@media (min-width: 48rem)': {
    fontSize: '2.625rem'
  }
}))

const PostDate = styled('span', props => ({
  color: props.color,
  display: 'inline-block',
  fontFamily: '"Avenir Next", sans-serif',
  fontSize: '0.75rem'
}))

const PostBody = styled(Markdown, props => ({
  color: props.color,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, sans-serif',
  fontSize: '1.125rem',
  lineHeight: 1.66,

  '@media (min-width: 48rem)': {
    fontSize: '1.5rem'
  }
}))

export default ({
  post,
  ...props
}) => (
  <article>
    <style dangerouslySetInnerHTML={{ __html: syntaxStyles }} />
    <PostDate color={props.color}>
      {post.date}
    </PostDate>

    <PostTitle color={props.color}>{post.title}</PostTitle>
    {/* <PostBody color={props.color} dangerouslySetInnerHTML={{ __html: post.bodyHtml }} /> */}
    <PostBody
      color={props.color}
      renderers={Object.assign({}, Markdown.renderers, { CodeBlock })}
      source={post.bodyContent}
    />

    <ButtonTweet title={post.title} />
    <IssueCTA background={props.background} color={props.color} title={post.title} />
  </article>
)