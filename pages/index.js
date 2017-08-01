import About from '../components/About'
import ColorCycle from '../containers/ColorCycle'
import Layout from '../components/Layout'
import Projects from '../components/Projects'
import Theme from '../containers/Theme'

export default (props) => (
  <ColorCycle>
    <Theme>
      {(background, color, onClick) => (
        <Layout background={background} color={color} onClick={onClick}>
          <About background={background} color={color} />
          <Projects background={background} color={color} />
        </Layout>
      )}
    </Theme>
  </ColorCycle>
)
