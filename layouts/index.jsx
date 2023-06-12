import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { chakra, Flex, Spinner, useDisclosure } from '@chakra-ui/react'
import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'

const AppLayout = (props) => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const {
        isOpen: isSidebarOpen,
        onOpen: onSidebarOpen,
        onClose: onSidebarClose
    } = useDisclosure()

    if (status === 'loading') {
        return (
            <Flex justify="center" align="center" h="100vh" w="full">
                <Spinner
                    size="xl"
                    thickness={2}
                    speed="0.8s"
                    emptyColor="canvas-1"
                    color="brand.default"
                />
            </Flex>
        )
    } else {
        if (
            session &&
            session.user.role === 'Admin' &&
            router.pathname === '/'
        ) {
            router.push('/dashboard')
            return null
        }

        if (!session && props.authentication) {
            router.push('/')
            return null
        }

        if (
            session &&
            props.authentication &&
            props.authentication.authorized
        ) {
            if (session.user.role !== props.authentication.authorized) {
                router.push('/')
                return null
            }
        }

        return (
            <>
                <Header onSidebarOpen={onSidebarOpen} />
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    onSidebarClose={onSidebarClose}
                />
                <chakra.main {...props} />
                <Footer />
            </>
        )
    }
}

export default AppLayout
