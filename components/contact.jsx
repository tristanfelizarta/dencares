import api from 'instance'
import { useForm } from 'react-hook-form'
import {
    Button,
    chakra,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Icon,
    Input,
    SimpleGrid,
    Text,
    Textarea,
    useToast
} from '@chakra-ui/react'
import { FiHome, FiMail, FiMap, FiPhoneCall } from 'react-icons/fi'
import Card from './card'
import Toast from './toast'

const Contact = () => {
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit
    } = useForm()

    const toast = useToast()

    const onSubmit = (data) => {
        api.create('/mail', data)
        reset()

        toast({
            position: 'top',
            render: () => (
                <Toast
                    title="Message Sent!"
                    description="Your message successfully sent!"
                />
            )
        })
    }

    return (
        <chakra.section pt={100} id="contact">
            <Flex direction={{ base: 'column', lg: 'row' }} gap={12}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction="column" gap={6}>
                        <Flex direction="column">
                            <Text
                                fontSize={32}
                                fontWeight="semibold"
                                color="accent-1"
                            >
                                Contact Us
                            </Text>

                            <Text>
                                Our friendly team would love to hear from you!
                            </Text>
                        </Flex>

                        <FormControl isInvalid={errors.name}>
                            <FormLabel>Full Name</FormLabel>
                            <Input
                                size="lg"
                                {...register('name', { required: true })}
                            />
                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.email}>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                size="lg"
                                {...register('email', { required: true })}
                            />
                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.contact}>
                            <FormLabel>Phone Number</FormLabel>
                            <Input
                                size="lg"
                                {...register('contact', { required: true })}
                            />
                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.message}>
                            <FormLabel>Message</FormLabel>
                            <Textarea
                                minH={148}
                                {...register('message', { required: true })}
                            ></Textarea>
                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>

                        <Button type="submit" size="lg" colorScheme="brand">
                            Send Message
                        </Button>
                    </Flex>
                </form>

                <Flex flex={1}>
                    <chakra.div
                        bgImage="url('/assets/map.png')"
                        bgSize="cover"
                        bgPos="center"
                        borderRadius={12}
                        h="full"
                        w="full"
                    />
                </Flex>
            </Flex>

            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6} mt={12}>
                <Card>
                    <Flex direction="column" gap={6}>
                        <Flex
                            bg="brand.alpha"
                            justify="center"
                            align="center"
                            borderRadius={12}
                            h={12}
                            w={12}
                        >
                            <Icon
                                as={FiMail}
                                boxSize={6}
                                color="brand.default"
                            />
                        </Flex>

                        <Flex direction="column">
                            <Text fontWeight="semibold" color="accent-1">
                                Mail Us
                            </Text>

                            <Text fontSize="sm">
                                Speak to our friendly team.
                            </Text>
                        </Flex>

                        <Text fontWeight="semibold" color="accent-1">
                            touch@dencares.com
                        </Text>
                    </Flex>
                </Card>

                <Card>
                    <Flex direction="column" gap={6}>
                        <Flex
                            bg="brand.alpha"
                            justify="center"
                            align="center"
                            borderRadius={12}
                            h={12}
                            w={12}
                        >
                            <Icon
                                as={FiMap}
                                boxSize={6}
                                color="brand.default"
                            />
                        </Flex>

                        <Flex direction="column">
                            <Text fontWeight="semibold" color="accent-1">
                                Visit Us
                            </Text>

                            <Text fontSize="sm">Visit our clinic.</Text>
                        </Flex>

                        <Text fontWeight="semibold" color="accent-1">
                            Las Pinas City
                        </Text>
                    </Flex>
                </Card>

                <Card>
                    <Flex direction="column" gap={6}>
                        <Flex
                            bg="brand.alpha"
                            justify="center"
                            align="center"
                            borderRadius={12}
                            h={12}
                            w={12}
                        >
                            <Icon
                                as={FiHome}
                                boxSize={6}
                                color="brand.default"
                            />
                        </Flex>

                        <Flex direction="column">
                            <Text fontWeight="semibold" color="accent-1">
                                Established in 2015
                            </Text>

                            <Text fontSize="sm">Other information.</Text>
                        </Flex>

                        <Text fontWeight="semibold" color="accent-1">
                            By Dencares Dental Clinic
                        </Text>
                    </Flex>
                </Card>
            </SimpleGrid>
        </chakra.section>
    )
}

export default Contact
