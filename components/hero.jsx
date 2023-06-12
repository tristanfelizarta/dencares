import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import api from 'instance'
import { useForm } from 'react-hook-form'
import {
    Badge,
    Button,
    chakra,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    Select,
    Td,
    Text,
    Tr,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import Modal from './modal'
import Table from './table'
import Toast from './toast'

const BookModal = ({ session }) => {
    const queryClient = useQueryClient()
    const { data: schedule, isFetched: isScheduleFetched } = useQuery(
        ['schedule'],
        () => api.all('/schedule')
    )
    const { data: services, isFetched: isServicesFetched } = useQuery(
        ['services'],
        () => api.all('/services')
    )
    const { data: system, isFetched: isSystemFetched } = useQuery(
        ['status'],
        () => api.get('/system', '6391fba3c3821ffcc613e367')
    )
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    const disclosure = useDisclosure()
    const [selectedSchedule, setSelectedSchedule] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const {
        register,
        watch,
        formState: { errors },
        clearErrors,
        reset,
        handleSubmit
    } = useForm()

    const handleImage = (e) => {
        const file = e.target.files[0]

        if (!file) return setImageError('file does not exists.')
        if (file.size > 5120 * 5120)
            return setImageError('Largest image size is 5mb.')
        if (file.type !== 'image/jpeg' && file.type !== 'image/png')
            return setImageError('Image format is incorrect.')

        setImage(file)
    }

    const addMutation = useMutation(
        (data) => api.create('/appointment', data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('schedule')
                setIsLoading(false)
                disclosure.onClose()

                toast({
                    position: 'top',
                    duration: 1000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Appointment submitted"
                        />
                    )
                })
            }
        }
    )

    const onSubmit = async (data) => {
        setIsLoading(true)

        if (selectedSchedule === null) {
            setIsLoading(false)

            toast({
                position: 'top',
                duration: 1000,
                render: () => (
                    <Toast
                        title="Error"
                        description="Please select schedule date."
                        status="error"
                    />
                )
            })

            return
        }

        if (selectedTime === null) {
            setIsLoading(false)

            toast({
                position: 'top',
                duration: 1000,
                render: () => (
                    <Toast
                        title="Error"
                        description="Please select schedule time."
                        status="error"
                    />
                )
            })

            return
        }

        if (image === null) {
            setIsLoading(false)

            toast({
                position: 'top',
                duration: 1000,
                render: () => (
                    <Toast
                        title="Error"
                        description="Please attach proof of payment."
                        status="error"
                    />
                )
            })

            return
        }

        let res = null

        for (const item of [image]) {
            const formData = new FormData()

            formData.append('file', item)
            formData.append('upload_preset', 'uploads')

            res = await axios.post(
                'https://api.cloudinary.com/v1_1/commence/image/upload',
                formData
            )
        }

        addMutation.mutate({
            id: session.user.id,
            name: data.name,
            age: data.age,
            gender: data.gender,
            address: data.address,
            service: data.services,
            date: selectedSchedule,
            time: selectedTime,
            proof_of_payment: res.data.secure_url
        })
    }

    return (
        <Modal
            title="Book an Appointment"
            size="xl"
            toggle={(onOpen) => (
                <Button
                    size="xl"
                    colorScheme="brand"
                    w={{ base: 'full', sm: 'auto' }}
                    onClick={() =>
                        clearErrors() ||
                        reset() ||
                        setSelectedSchedule(null) ||
                        setSelectedTime(null) ||
                        onOpen()
                    }
                >
                    Book Now
                </Button>
            )}
            disclosure={disclosure}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <FormControl isInvalid={errors.name}>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                            defaultValue={session.user.name}
                            size="lg"
                            {...register('name', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            value={session.user.email}
                            size="lg"
                            cursor="not-allowed"
                            readOnly
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <Flex align="start" gap={6}>
                        <FormControl isInvalid={errors.age}>
                            <FormLabel>Age</FormLabel>
                            <Input
                                type="number"
                                defaultValue={session.user.age}
                                size="lg"
                                {...register('age', { required: true })}
                            />
                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.gender}>
                            <FormLabel>Gender</FormLabel>

                            <Select
                                placeholder="Select"
                                defaultValue={session.user.gender}
                                size="lg"
                                {...register('gender', { required: true })}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Select>

                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>

                    <FormControl isInvalid={errors.address}>
                        <FormLabel>Address</FormLabel>
                        <Input
                            size="lg"
                            defaultValue={session.user.address}
                            {...register('address', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <Divider />

                    <FormControl isInvalid={errors.services}>
                        <FormLabel>Services</FormLabel>

                        <Select
                            placeholder="Select"
                            size="lg"
                            {...register('services', { required: true })}
                        >
                            {isServicesFetched &&
                                services.map((service) => (
                                    <option
                                        value={service._id}
                                        key={service._id}
                                    >
                                        {service.name} - ₱
                                        {service.price.toLocaleString(
                                            undefined,
                                            { maximumFractionDigits: 2 }
                                        )}
                                    </option>
                                ))}
                        </Select>

                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <Divider />

                    {isSystemFetched && system.status ? (
                        <>
                            <FormControl>
                                <FormLabel>Date</FormLabel>

                                <Table
                                    data={schedule}
                                    fetched={isScheduleFetched}
                                    th={[]}
                                    td={(schedule) => (
                                        <Tr key={schedule._id}>
                                            <Td>
                                                <Text color="accent-1">
                                                    {
                                                        months[
                                                            schedule.date.split(
                                                                '-'
                                                            )[1] - 1
                                                        ]
                                                    }{' '}
                                                    {
                                                        schedule.date.split(
                                                            '-'
                                                        )[2]
                                                    }
                                                    ,{' '}
                                                    {
                                                        schedule.date.split(
                                                            '-'
                                                        )[0]
                                                    }
                                                </Text>
                                            </Td>

                                            <Td>
                                                {
                                                    schedule.time.filter(
                                                        (time) =>
                                                            time.user !== ''
                                                    ).length
                                                }
                                                /8
                                            </Td>

                                            <Td textAlign="right">
                                                {selectedSchedule ? (
                                                    <IconButton
                                                        size="xs"
                                                        colorScheme="red"
                                                        icon={
                                                            <FiMinus
                                                                size={12}
                                                            />
                                                        }
                                                        onClick={() =>
                                                            setSelectedSchedule(
                                                                null
                                                            ) ||
                                                            setSelectedTime(
                                                                null
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <IconButton
                                                        size="xs"
                                                        colorScheme="brand"
                                                        icon={
                                                            <FiPlus size={12} />
                                                        }
                                                        onClick={() =>
                                                            setSelectedSchedule(
                                                                schedule
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Td>
                                        </Tr>
                                    )}
                                    filters={(data) => {
                                        return data
                                            .filter((data) => data.status)
                                            .filter((data) =>
                                                selectedSchedule
                                                    ? data._id ===
                                                      selectedSchedule._id
                                                    : data
                                            )
                                            .filter(
                                                (data) =>
                                                    data.time.filter(
                                                        (time) =>
                                                            time.user !== ''
                                                    ).length !== 8
                                            )
                                    }}
                                    settings={{
                                        search: 'off',
                                        controls: 'off'
                                    }}
                                />
                            </FormControl>

                            <Divider />
                        </>
                    ) : (
                        <Flex
                            bg="yellow.alpha"
                            justify="center"
                            align="center"
                            borderRadius={12}
                            p={6}
                        >
                            <Text
                                fontSize="sm"
                                textAlign="center"
                                color="yellow.default"
                            >
                                Sorry, the website for the dental clinic is no
                                longer available for an appointment at this
                                time. Please visit our website tomorrow at 7am
                                in the morning until 5pm in the evening. Thank
                                you.
                            </Text>
                        </Flex>
                    )}

                    {selectedSchedule && (
                        <>
                            <FormControl>
                                <FormLabel>Time</FormLabel>

                                <Table
                                    data={selectedSchedule.time}
                                    fetched={true}
                                    th={[]}
                                    td={(time) => (
                                        <Tr key={time._id}>
                                            <Td>
                                                <Text color="accent-1">
                                                    {time.label}
                                                </Text>
                                            </Td>

                                            <Td textAlign="center">
                                                <Badge
                                                    variant="tinted"
                                                    colorScheme={
                                                        time.user
                                                            ? 'brand'
                                                            : 'default'
                                                    }
                                                >
                                                    {time.user
                                                        ? 'Reserved'
                                                        : 'Vacant'}
                                                </Badge>
                                            </Td>

                                            <Td textAlign="right">
                                                {selectedTime ? (
                                                    <IconButton
                                                        size="xs"
                                                        colorScheme="red"
                                                        icon={
                                                            <FiMinus
                                                                size={12}
                                                            />
                                                        }
                                                        onClick={() =>
                                                            setSelectedTime(
                                                                null
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <IconButton
                                                        size="xs"
                                                        colorScheme="brand"
                                                        icon={
                                                            <FiPlus size={12} />
                                                        }
                                                        disabled={time.user}
                                                        onClick={() =>
                                                            setSelectedTime(
                                                                time
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Td>
                                        </Tr>
                                    )}
                                    filters={(data) => {
                                        return data.filter((data) =>
                                            selectedTime
                                                ? data._id === selectedTime._id
                                                : data
                                        )
                                    }}
                                    settings={{
                                        search: 'off',
                                        controls: 'off'
                                    }}
                                />
                            </FormControl>

                            <Divider />
                        </>
                    )}

                    {selectedSchedule && selectedTime && (
                        <>
                            <FormControl>
                                <FormLabel>Payment Method</FormLabel>

                                <Select size="lg">
                                    <option value="gcash">GCash</option>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Account Name</FormLabel>
                                <Input value="Dencares" size="lg" readOnly />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Account Number</FormLabel>
                                <Input value="09123456789" size="lg" readOnly />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Partial Payment</FormLabel>
                                <Input value="₱200.00" size="lg" readOnly />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Proof of Payment</FormLabel>
                                <Input
                                    type="file"
                                    size="lg"
                                    onChange={handleImage}
                                    readOnly
                                />
                            </FormControl>

                            <Divider />

                            <Flex
                                bg="yellow.alpha"
                                justify="center"
                                align="center"
                                borderRadius={12}
                                p={6}
                            >
                                <Text
                                    fontSize="sm"
                                    textAlign="center"
                                    color="yellow.default"
                                >
                                    Note: Your schedule will only be confirmed
                                    if you have paid the partial payment. The
                                    confirmation will be sent to your Gmail
                                    account immediately.
                                </Text>
                            </Flex>
                        </>
                    )}

                    <Button
                        type="submit"
                        size="lg"
                        colorScheme="brand"
                        isLoading={isLoading}
                    >
                        Submit
                    </Button>
                </Flex>
            </form>
        </Modal>
    )
}

const Hero = () => {
    const { data: session } = useSession()

    return (
        <chakra.section>
            <Flex align="center" gap={12} h={600}>
                <Flex flex={1} justify="start" align="center">
                    <Flex align="start" direction="column" gap={6}>
                        <Text
                            fontSize={{ base: 64, xl: 80 }}
                            fontWeight="bold"
                            lineHeight={1}
                            letterSpacing={0}
                            color="accent-1"
                        >
                            A better life starts with a{' '}
                            <chakra.span color="brand.default">
                                beautiful smile
                            </chakra.span>
                        </Text>

                        <Text fontSize="lg">
                            Everything in the world has beauty, but not everyone
                            sees it.
                            <br /> Every time you smile at someone, it is an act
                            of love.
                        </Text>

                        {session ? (
                            <BookModal session={session} />
                        ) : (
                            <Button
                                size="xl"
                                colorScheme="brand"
                                onClick={() => signIn('google')}
                            >
                                Book Now
                            </Button>
                        )}
                    </Flex>
                </Flex>

                <Flex
                    display={{ base: 'none', xl: 'flex' }}
                    flex={1}
                    justify="end"
                    align="center"
                >
                    <chakra.div
                        bgImage="url('/assets/hero.png')"
                        bgRepeat="no-repeat"
                        bgSize="contain"
                        h="full"
                        w="full"
                    >
                        <chakra.svg
                            width="144"
                            height="600"
                            viewBox="0 0 144 600"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <chakra.path
                                d="M143.269 0L0 600V0H143.269Z"
                                fill="system"
                            />
                        </chakra.svg>
                    </chakra.div>
                </Flex>
            </Flex>
        </chakra.section>
    )
}

export default Hero
