import {
    chakra,
    Flex,
    Image,
    SimpleGrid,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import Card from './card'
import Modal from './modal'

const Services = () => {
    const disclosure = useDisclosure()

    return (
        <chakra.section pt={100} id="services">
            <Modal
                title="Services"
                size="4xl"
                toggle={(onOpen) => (
                    <Flex
                        direction="column"
                        gap={12}
                        cursor="pointer"
                        onClick={onOpen}
                    >
                        <Flex
                            align="center"
                            direction="column"
                            textAlign="center"
                        >
                            <Text
                                fontSize={32}
                                fontWeight="semibold"
                                color="accent-1"
                            >
                                Services
                            </Text>

                            <Text>Dental services that you can trust.</Text>
                        </Flex>

                        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
                            <Card>
                                <Flex align="center" gap={6}>
                                    <Image
                                        boxSize={16}
                                        alt="icon-4"
                                        src="/icons/4.png"
                                    />

                                    <Text
                                        fontSize="lg"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        Consultation
                                    </Text>
                                </Flex>
                            </Card>

                            <Card>
                                <Flex align="center" gap={6}>
                                    <Image
                                        boxSize={16}
                                        alt="icon-5"
                                        src="/icons/5.png"
                                    />

                                    <Text
                                        fontSize="lg"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        Tooth Extraction
                                    </Text>
                                </Flex>
                            </Card>

                            <Card>
                                <Flex align="center" gap={6}>
                                    <Image
                                        boxSize={16}
                                        alt="icon-6"
                                        src="/icons/6.png"
                                    />

                                    <Text
                                        fontSize="lg"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        Restoration
                                    </Text>
                                </Flex>
                            </Card>

                            <Card>
                                <Flex align="center" gap={6}>
                                    <Image
                                        boxSize={16}
                                        alt="icon-7"
                                        src="/icons/7.png"
                                    />

                                    <Text
                                        fontSize="lg"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        Oral Prophylaxis
                                    </Text>
                                </Flex>
                            </Card>

                            <Card>
                                <Flex align="center" gap={6}>
                                    <Image
                                        boxSize={16}
                                        alt="icon-8"
                                        src="/icons/8.png"
                                    />

                                    <Text
                                        fontSize="lg"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        Removable Partial Denture
                                    </Text>
                                </Flex>
                            </Card>

                            <Card>
                                <Flex align="center" gap={6}>
                                    <Image
                                        boxSize={16}
                                        alt="icon-9"
                                        src="/icons/9.png"
                                    />

                                    <Text
                                        fontSize="lg"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        Complete Denture
                                    </Text>
                                </Flex>
                            </Card>

                            <Card>
                                <Flex align="center" gap={6}>
                                    <Image
                                        boxSize={16}
                                        alt="icon-10"
                                        src="/icons/10.png"
                                    />

                                    <Text
                                        fontSize="lg"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        Denture Repair
                                    </Text>
                                </Flex>
                            </Card>

                            <Card>
                                <Flex align="center" gap={6}>
                                    <Image
                                        boxSize={16}
                                        alt="icon-11"
                                        src="/icons/11.png"
                                    />

                                    <Text
                                        fontSize="lg"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        Orthodontic Treatment
                                    </Text>
                                </Flex>
                            </Card>

                            <Card>
                                <Flex align="center" gap={6}>
                                    <Image
                                        boxSize={16}
                                        alt="icon-12"
                                        src="/icons/12.png"
                                    />

                                    <Text
                                        fontSize="lg"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        Retainers
                                    </Text>
                                </Flex>
                            </Card>
                        </SimpleGrid>
                    </Flex>
                )}
                disclosure={disclosure}
            >
                <Flex direction="column" gap={12}>
                    <Flex direction="column" gap={3}>
                        <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color="accent-1"
                        >
                            Consultation
                        </Text>

                        <Text color="accent-3">
                            where you can discuss any issues that you&apos;re
                            experiencing, concerns and treatment options. If you
                            have anxieties about having dental work done, this
                            is also the time to express it.
                        </Text>

                        <Image alt="img-1" src="/assets/1.jpeg" />
                    </Flex>

                    <Flex direction="column" gap={3}>
                        <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color="accent-1"
                        >
                            Tooth Extraction
                        </Text>

                        <Text color="accent-3">
                            A dental extraction is the removal of teeth from the
                            dental alveolus (socket) in the alveolar bone. It is
                            also known as a tooth extraction, exodontia,
                            exodontics, or, colloquially, tooth pulling.
                        </Text>

                        <Image alt="img-1" src="/assets/2.jpg" />
                    </Flex>

                    <Flex direction="column" gap={3}>
                        <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color="accent-1"
                        >
                            Restoration per Surface
                        </Text>

                        <Text color="accent-3">
                            Fillings are unique materials that your dentist uses
                            to treat cavities and other surface flaws on your
                            teeth. The function and form of the tooth are
                            restored through fillings, also known as
                            restorations. Modern dental techniques and materials
                            offer new, efficient ways to rebuild teeth.
                        </Text>

                        <Image alt="img-1" src="/assets/3.jpg" />
                    </Flex>

                    <Flex direction="column" gap={3}>
                        <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color="accent-1"
                        >
                            Oral Prophylaxis
                        </Text>

                        <Text color="accent-3">
                            A dental prophylaxis is a cleaning technique used to
                            provide the teeth a thorough cleaning. Prophylaxis
                            is a crucial dental procedure for slowing the
                            progression of gingivitis and periodontal disease.
                        </Text>

                        <Image alt="img-1" src="/assets/4.png" />
                    </Flex>

                    <Flex direction="column" gap={3}>
                        <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color="accent-1"
                        >
                            Removable Partial Denture
                        </Text>

                        <Text color="accent-3">
                            Replacement teeth are typically fastened to a pink
                            or gum-colored plastic foundation in a detachable
                            partial denture or bridge. Occasionally, a metal
                            framework maintains the denture in place in the
                            mouth. When one or more natural teeth are still
                            present in the upper jaw or lower jaw, partial
                            dentures are used.
                        </Text>

                        <Image alt="img-1" src="/assets/5.jpg" />
                    </Flex>

                    <Flex direction="column" gap={3}>
                        <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color="accent-1"
                        >
                            Orthodontic Treatment
                        </Text>

                        <Text color="accent-3">
                            Replacement teeth are typically fastened to a pink
                            or gum-colored plastic foundation in a detachable
                            partial denture or bridge. Occasionally, a metal
                            framework maintains the denture in place in the
                            mouth. When one or more natural teeth are still
                            present in the upper jaw or lower jaw, partial
                            dentures are used.
                        </Text>

                        <Image alt="img-1" src="/assets/6.jpeg" />
                    </Flex>
                </Flex>
            </Modal>
        </chakra.section>
    )
}

export default Services
