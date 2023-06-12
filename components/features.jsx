import { chakra, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'
import Card from './card'

const Features = () => {
    return (
        <chakra.section pt={100} id="features">
            <Flex direction="column" gap={12}>
                <Flex align="center" direction="column" textAlign="center">
                    <Text fontSize={32} fontWeight="semibold" color="accent-1">
                        Why Choose Us
                    </Text>

                    <Text>
                        We believe that a smile remains the most inexpensive
                        gift.
                    </Text>
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={12}>
                    <Card py={12}>
                        <Flex align="center" direction="column" gap={12}>
                            <Image
                                boxSize="96px"
                                alt="icon-1"
                                src="/icons/1.png"
                            />

                            <Flex
                                align="center"
                                direction="column"
                                gap={3}
                                textAlign="center"
                            >
                                <Text
                                    fontSize="xl"
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    Regular High Standard Care
                                </Text>

                                <Text>
                                    The dental clinic provides high standard
                                    care by continually improving and adding
                                    latest techniques for treatments of the
                                    patients. To ensure that patients would love
                                    and be confident of their smiles.
                                </Text>
                            </Flex>
                        </Flex>
                    </Card>

                    <Card py={12}>
                        <Flex align="center" direction="column" gap={12}>
                            <Image
                                boxSize="96px"
                                alt="icon-2"
                                src="/icons/2.png"
                            />

                            <Flex
                                align="center"
                                direction="column"
                                gap={3}
                                textAlign="center"
                            >
                                <Text
                                    fontSize="xl"
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    Concerned with safety
                                </Text>

                                <Text>
                                    Before treating you, dentists are trained to
                                    cleanse their hands. Clean, replace, and
                                    cover tools in between uses. More frequently
                                    disinfect all surfaces and tools. Wear
                                    additional protective equipment. Check the
                                    patient&apos;s temperature.
                                </Text>
                            </Flex>
                        </Flex>
                    </Card>

                    <Card py={12}>
                        <Flex align="center" direction="column" gap={12}>
                            <Image
                                boxSize="96px"
                                alt="icon-3"
                                src="/icons/3.png"
                            />

                            <Flex
                                align="center"
                                direction="column"
                                gap={3}
                                textAlign="center"
                            >
                                <Text
                                    fontSize="xl"
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    Comfortable Dental Care
                                </Text>

                                <Text>
                                    The dental office of Dencares Dental Clinic
                                    works hard to ensure that every dental
                                    diagnosis is accurate by using the most
                                    up-to-date technologies and every dental
                                    procedure is comfortable for its patients.
                                </Text>
                            </Flex>
                        </Flex>
                    </Card>
                </SimpleGrid>
            </Flex>
        </chakra.section>
    )
}

export default Features
