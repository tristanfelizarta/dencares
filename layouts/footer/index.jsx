import { chakra, Flex, Text } from '@chakra-ui/react'

const Footer = () => {
    return (
        <chakra.footer>
            <Flex
                justify="center"
                align="center"
                gap={6}
                mx="auto"
                px={6}
                h="72px"
                w="full"
                maxW={1280}
            >
                <Text fontSize="xs">
                    COPYRIGHT © 2022 DENCARES DENTAL CLINIC.
                </Text>
            </Flex>
        </chakra.footer>
    )
}

export default Footer
