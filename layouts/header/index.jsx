import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import {
    Avatar,
    Button,
    chakra,
    Flex,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react'
import { FiLogOut, FiMenu, FiMoon, FiSun } from 'react-icons/fi'

const Header = ({ onSidebarOpen }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const { toggleColorMode } = useColorMode()
    const colorModeIcon = useColorModeValue(
        <FiMoon size={16} fill="currentColor" />,
        <FiSun size={16} fill="currentColor" />
    )
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', () => {
                setIsScrolling(window.pageYOffset > 0)
            })
        }
    }, [])

    return (
        <chakra.header
            bg="white"
            position="sticky"
            top={0}
            shadow={isScrolling && 'sm'}
            transition=".4s"
            zIndex={99}
            _dark={{
                bg: isScrolling ? 'surface' : 'system',
                border: 'none',
                shadow: isScrolling && 'dark-xl'
            }}
        >
            <Flex
                align="center"
                gap={6}
                mx="auto"
                px={6}
                h={20}
                w="full"
                maxW={1280}
            >
                <Flex flex={1} justify="start" align="center">
                    <Flex align="center" gap={2}>
                        <Flex
                            bg="brand.default"
                            justify="center"
                            align="center"
                            h={8}
                            w={10}
                        >
                            <Text
                                fontSize="xl"
                                fontWeight="semibold"
                                color="white"
                            >
                                DC
                            </Text>
                        </Flex>

                        <Text
                            display={{ base: 'none', md: 'block' }}
                            fontSize="xl"
                            fontWeight="semibold"
                            color="accent-1"
                        >
                            Dencares
                        </Text>
                    </Flex>
                </Flex>

                <Flex
                    display={{ base: 'none', lg: 'flex' }}
                    flex={3}
                    justify="center"
                    align="center"
                >
                    {session && session.user.role === 'Admin' ? (
                        <Flex align="center" gap={10}>
                            <NextLink href="/dashboard" passHref>
                                <Link
                                    as="span"
                                    active={
                                        router.pathname.includes('dashboard')
                                            ? 1
                                            : 0
                                    }
                                >
                                    Appointment
                                </Link>
                            </NextLink>

                            <NextLink href="/schedule" passHref>
                                <Link
                                    as="span"
                                    active={
                                        router.pathname.includes('schedule')
                                            ? 1
                                            : 0
                                    }
                                >
                                    Schedule
                                </Link>
                            </NextLink>

                            <NextLink href="/services" passHref>
                                <Link
                                    as="span"
                                    active={
                                        router.pathname.includes('services')
                                            ? 1
                                            : 0
                                    }
                                >
                                    Services
                                </Link>
                            </NextLink>

                            <NextLink href="/accounts" passHref>
                                <Link
                                    as="span"
                                    active={
                                        router.pathname.includes('accounts')
                                            ? 1
                                            : 0
                                    }
                                >
                                    Accounts
                                </Link>
                            </NextLink>
                        </Flex>
                    ) : (
                        <Flex align="center" gap={10}>
                            <NextLink href="/" passHref>
                                <Link as="span">Home</Link>
                            </NextLink>

                            <Link href="#features">Features</Link>
                            <Link href="#services">Services</Link>
                            <Link href="#about">About Us</Link>
                            <Link href="#contact">Contact Us</Link>
                        </Flex>
                    )}
                </Flex>

                <Flex flex={1} justify="end" align="center">
                    <Flex align="center" gap={3}>
                        <Flex align="center">
                            <IconButton
                                variant="ghost"
                                icon={colorModeIcon}
                                onClick={toggleColorMode}
                            />
                        </Flex>

                        {session ? (
                            <Menu>
                                <MenuButton>
                                    <Avatar
                                        name={session.user.name}
                                        src={session.user.image}
                                    />
                                </MenuButton>

                                <MenuList w={256}>
                                    <MenuItem>
                                        <Flex align="center" gap={3}>
                                            <Avatar
                                                name={session.user.name}
                                                src={session.user.image}
                                            />

                                            <Text
                                                fontWeight="medium"
                                                color="accent-1"
                                                noOfLines={1}
                                            >
                                                {session.user.name}
                                            </Text>
                                        </Flex>
                                    </MenuItem>

                                    <MenuDivider />

                                    <MenuItem
                                        icon={<FiLogOut size={16} />}
                                        onClick={() => signOut()}
                                    >
                                        Log out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <Button
                                colorScheme="brand"
                                onClick={() => signIn('google')}
                            >
                                Sign in
                            </Button>
                        )}

                        <Menu>
                            <MenuButton
                                as={IconButton}
                                display={{ base: 'flex', lg: 'none' }}
                                variant="outline"
                                color="accent-1"
                                icon={<FiMenu size={16} />}
                            />

                            {session && session.user.role === 'Admin' ? (
                                <MenuList
                                    display={{ base: 'block', lg: 'none' }}
                                >
                                    <NextLink href="/dashboard" passHref>
                                        <MenuItem>Appointment</MenuItem>
                                    </NextLink>

                                    <NextLink href="/schedule" passHref>
                                        <MenuItem>Schedule</MenuItem>
                                    </NextLink>

                                    <NextLink href="/services" passHref>
                                        <MenuItem>Services</MenuItem>
                                    </NextLink>

                                    <NextLink href="/accounts" passHref>
                                        <MenuItem>Accounts</MenuItem>
                                    </NextLink>
                                </MenuList>
                            ) : (
                                <MenuList
                                    display={{ base: 'block', lg: 'none' }}
                                >
                                    <NextLink href="/">
                                        <MenuItem>Home</MenuItem>
                                    </NextLink>

                                    <MenuItem as="a" href="#features">
                                        Features
                                    </MenuItem>

                                    <a href="#services">
                                        <MenuItem>Services</MenuItem>
                                    </a>

                                    <a href="#about">
                                        <MenuItem>About Us</MenuItem>
                                    </a>

                                    <a href="#contact">
                                        <MenuItem>Contact Us</MenuItem>
                                    </a>
                                </MenuList>
                            )}
                        </Menu>
                    </Flex>
                </Flex>
            </Flex>
        </chakra.header>
    )
}

export default Header
