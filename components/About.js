import TextLink from './TextLink'
import { styled } from 'styletron-react'

const About = styled('section', {
  marginBottom: '6rem',
  padding: '0 1rem'
})

const Title = styled('p', {
  color: '#fff',
  fontFamily: '"Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, sans-serif',
  fontSize: '1.75rem',
  fontStyle: 'italic',
  lineHeight: '1.25',
  margin: '0 0 3rem',

  '@media (min-width: 40rem)': {
    fontSize: '3rem'
  },

  '@media (min-width: 60rem)': {
    fontSize: '3.75rem'
  }
})

const SubTitle = styled('p', {
  color: '#fff',
  fontFamily: '"Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, sans-serif',
  margin: '0'
})

const Break = styled('br', {
  display: 'none',

  '@media (min-width: 40rem)': {
    display: 'block'
  }
})

const BreakXS = styled('br', {
  '@media (min-width: 40rem)': {
    display: 'none'
  }
})

export default (props) => (
  <About>
    <Title>
      Software engineer <Break />
      specializing in UX design <Break />
      & front-end architecture.
    </Title>
    <SubTitle>
      Currently at
      {' '}
      <TextLink background={props.background} color={props.color} href='https://www.gonoodle.com'>GoNoodle</TextLink>.
      {' '}
      <BreakXS />
      Based in Nashville, TN.
    </SubTitle>
  </About>
)