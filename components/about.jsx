import { Box, chakra, Flex, Heading, Stack, Text } from '@chakra-ui/react'

const About = () => {
    return (
        <chakra.section pt={100} id="about">
            <Flex direction="column" gap={12}>
                <Flex align="center" direction="column" textAlign="center">
                    <Text fontSize={32} fontWeight="semibold" color="accent-1">
                        About
                    </Text>

                    <Text>
                        We&apos;d Love For You To Dive Into Some Of Our
                        Carefully Written Pieces.
                    </Text>
                </Flex>

                <Stack
                    direction={{ base: 'column-reverse', lg: 'row' }}
                    align="center"
                    spacing={12}
                >
                    <Stack spacing={6} w="full">
                        <Heading
                            fontSize={{ base: 32, md: 48 }}
                            fontWeight="semibold"
                            textAlign={{ base: 'center', md: 'left' }}
                            color="accent-1"
                        >
                            Dencares Dental Clinic
                        </Heading>

                        <Text fontSize={{ base: 'md', md: 'lg' }} color="muted">
                            is a full-service dental clinic that utilizes
                            cutting-edge technology for the utmost care of our
                            patients. We specialize in offering patients a safe,
                            cost-effective, and relaxing experience, from dental
                            implants to dental treatments in the busy heart of
                            Las Piñas City. Here at Dencares Dental Clinic, we
                            strive to create the perfect smile while taking care
                            of you.
                        </Text>
                    </Stack>

                    <Box
                        bgImage="url('/assets/image-3.jpg')"
                        bgSize="cover"
                        bgPosition="center"
                        borderRadius="xl"
                        h={{ base: 250, md: 500 }}
                        w="full"
                    />
                </Stack>
            </Flex>
        </chakra.section>
    )
}

export default About
