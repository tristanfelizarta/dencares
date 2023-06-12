import { Container } from '@chakra-ui/react'
import Hero from 'components/hero'
import Features from 'components/features'
import Services from 'components/services'
import About from 'components/about'
import Contact from 'components/contact'

const Home = () => {
    return (
        <Container>
            <Hero />
            <Features />
            <Services />
            <About />
            <Contact />
        </Container>
    )
}

export default Home
