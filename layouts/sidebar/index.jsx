import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { chakra, Flex, Icon, Text } from '@chakra-ui/react'

const Sidebar = ({ isSidebarOpen, onSidebarClose }) => {
    const router = useRouter()
    const links = [{ pathname: '', icon: '' }]

    return (
        <>
            <chakra.div
                bg="hsla(0, 0%, 0%, 0.4)"
                position="fixed"
                top={0}
                left={0}
                h="100vh"
                w="full"
                visibility={isSidebarOpen ? 'visible' : 'hidden'}
                opacity={isSidebarOpen ? 1 : 0}
                transition="0.4s ease-in-out"
                zIndex={99}
                onClick={onSidebarClose}
            />

            <chakra.aside
                bg="white"
                position="fixed"
                top={0}
                left={isSidebarOpen ? 0 : -256}
                h="100vh"
                w={256}
                transition="0.4s ease-in-out"
                zIndex={100}
                _dark={{ bg: 'surface' }}
            >
                <Flex
                    justify="space-between"
                    align="center"
                    px={6}
                    py={3}
                    h={20}
                ></Flex>

                <Flex direction="column" p={3}>
                    {links.map((data, index) => (
                        <NextLink
                            href={`/${data.pathname}`}
                            passHref
                            key={index}
                        >
                            <Flex
                                bg={
                                    router.pathname.includes(data.pathname)
                                        ? 'canvas-1'
                                        : 'transparent'
                                }
                                justify="space-between"
                                align="center"
                                gap={6}
                                borderRadius={12}
                                px={3}
                                h="48px"
                                color={
                                    router.pathname.includes(data.pathname)
                                        ? 'accent-1'
                                        : 'accent-3'
                                }
                                transition=".4s"
                                _hover={{ color: 'accent-1' }}
                            >
                                <Flex align="center" gap={3}>
                                    <Icon as={data.icon} boxSize={4} />

                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        textTransform="capitalize"
                                    >
                                        {data.pathname}
                                    </Text>
                                </Flex>
                            </Flex>
                        </NextLink>
                    ))}
                </Flex>
            </chakra.aside>
        </>
    )
}

export default Sidebar
