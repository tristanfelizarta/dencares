import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import {
    Avatar,
    AvatarGroup,
    Badge,
    Button,
    Container,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    Skeleton,
    SkeletonCircle,
    Td,
    Text,
    Tr,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import Card from 'components/card'
import Modal from 'components/modal'
import Table from 'components/table'
import Toast from 'components/toast'
import { FiMoreHorizontal } from 'react-icons/fi'

const AddModal = () => {
    const queryClient = useQueryClient()
    const disclosure = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const {
        register,
        formState: { errors },
        clearErrors,
        reset,
        handleSubmit
    } = useForm()

    const addMutation = useMutation((data) => api.create('/schedule', data), {
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
                        description="Schedule added successfully."
                    />
                )
            })
        }
    })

    const onSubmit = (data) => {
        setIsLoading(true)
        addMutation.mutate({
            date: data.date,
            time: [
                {
                    label: '09:00 AM',
                    user: ''
                },
                {
                    label: '10:00 AM',
                    user: ''
                },
                {
                    label: '11:00 AM',
                    user: ''
                },
                {
                    label: '01:00 PM',
                    user: ''
                },
                {
                    label: '02:00 PM',
                    user: ''
                },
                {
                    label: '03:00 PM',
                    user: ''
                },
                {
                    label: '04:00 PM',
                    user: ''
                },
                {
                    label: '05:00 PM',
                    user: ''
                }
            ]
        })
    }

    return (
        <Modal
            title="Add Schedule"
            toggle={(onOpen) => (
                <Button
                    size="lg"
                    colorScheme="brand"
                    onClick={() => clearErrors() || reset() || onOpen()}
                >
                    Add New
                </Button>
            )}
            disclosure={disclosure}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <FormControl isInvalid={errors.date}>
                        <FormLabel>Date</FormLabel>
                        <Input
                            type="date"
                            size="lg"
                            {...register('date', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <Divider />

                    <Flex direction="column" gap={3}>
                        <Button
                            type="submit"
                            size="lg"
                            colorScheme="brand"
                            isLoading={isLoading}
                        >
                            Submit
                        </Button>

                        <Button size="lg" onClick={disclosure.onClose}>
                            Close
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </Modal>
    )
}

const ViewModal = ({ users, isUsersFetched, schedule }) => {
    const queryClient = useQueryClient()
    const disclosure = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
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
    const toast = useToast()

    const scheduleMutation = useMutation(
        (data) => api.update('/schedule', schedule._id, data),
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
                            description="Schedule updated successfully."
                        />
                    )
                })
            }
        }
    )

    const onOpenSchedule = () => {
        setIsLoading(true)

        scheduleMutation.mutate({
            status: true
        })
    }

    const onCloseSchedule = () => {
        setIsLoading(true)

        scheduleMutation.mutate({
            status: false
        })
    }

    return (
        <Modal
            title={
                months[schedule.date.split('-')[1] - 1] +
                ' ' +
                schedule.date.split('-')[2] +
                ', ' +
                schedule.date.split('-')[0]
            }
            size="xl"
            toggle={(onOpen) => (
                <IconButton
                    size="xs"
                    icon={<FiMoreHorizontal size={12} />}
                    onClick={onOpen}
                />
            )}
            disclosure={disclosure}
        >
            <Flex direction="column" gap={6}>
                <Table
                    data={schedule.time}
                    fetched={isUsersFetched}
                    th={[]}
                    td={(time) => (
                        <Tr key={time._id}>
                            <Td>
                                {time.user ? (
                                    users
                                        .filter(
                                            (user) => user._id === time.user
                                        )
                                        .map((user) => (
                                            <Flex
                                                key={user._id}
                                                align="center"
                                                gap={3}
                                            >
                                                <Avatar
                                                    name={user.name}
                                                    src={user.image}
                                                />

                                                <Text
                                                    textTransform="capitalize"
                                                    color="accent-1"
                                                >
                                                    {user.name}
                                                </Text>
                                            </Flex>
                                        ))
                                ) : (
                                    <Flex align="center" gap={3}>
                                        <SkeletonCircle h={8} w={8} />
                                        <Skeleton h={2} w={24} />
                                    </Flex>
                                )}
                            </Td>

                            <Td textAlign="center">
                                <Text color="accent-1">{time.label}</Text>
                            </Td>

                            <Td textAlign="center">
                                <Badge
                                    variant="tinted"
                                    colorScheme={
                                        time.user ? 'brand' : 'default'
                                    }
                                >
                                    {time.user ? 'Reserved' : 'Vacant'}
                                </Badge>
                            </Td>
                        </Tr>
                    )}
                    settings={{
                        search: 'off',
                        controls: 'off'
                    }}
                />

                <Divider />

                {schedule.status ? (
                    <Button
                        size="lg"
                        colorScheme="red"
                        onClick={onCloseSchedule}
                    >
                        Close this schedule
                    </Button>
                ) : (
                    <Button
                        size="lg"
                        colorScheme="brand"
                        onClick={onOpenSchedule}
                    >
                        Open this schedule
                    </Button>
                )}
            </Flex>
        </Modal>
    )
}

const Schedule = () => {
    const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () =>
        api.all('/users')
    )
    const { data: schedule, isFetched: isScheduleFetched } = useQuery(
        ['schedule'],
        () => api.all('/schedule')
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

    return (
        <Container>
            <Card>
                <Flex direction="column" gap={6}>
                    <Flex
                        direction={{ base: 'column', lg: 'row' }}
                        justify="space-between"
                        align="center"
                        gap={6}
                    >
                        <Text
                            fontSize="2xl"
                            fontWeight="semibold"
                            color="accent-1"
                        >
                            Schedule
                        </Text>

                        <Flex
                            direction={{ base: 'column', lg: 'row' }}
                            align="center"
                            gap={3}
                        >
                            <AddModal />
                        </Flex>
                    </Flex>

                    <Divider />

                    <Table
                        data={schedule}
                        fetched={isScheduleFetched}
                        th={['Date', 'Patients', 'Status', '']}
                        td={(schedule) => (
                            <Tr key={schedule._id}>
                                <Td>
                                    <Text>
                                        {
                                            months[
                                                schedule.date.split('-')[1] - 1
                                            ]
                                        }{' '}
                                        {schedule.date.split('-')[2]},{' '}
                                        {schedule.date.split('-')[0]}
                                    </Text>
                                </Td>

                                <Td>
                                    <Flex align="center" gap={3}>
                                        {schedule.time.filter(
                                            (time) => time.user
                                        ).length === 0 ? (
                                            <SkeletonCircle h={8} w={8} />
                                        ) : (
                                            <AvatarGroup>
                                                {schedule.time.map((time) =>
                                                    users
                                                        .filter(
                                                            (user) =>
                                                                time.user ===
                                                                user._id
                                                        )
                                                        .map((user) => (
                                                            <Avatar
                                                                name={user.name}
                                                                src={user.image}
                                                                key={user._id}
                                                            />
                                                        ))
                                                )}
                                            </AvatarGroup>
                                        )}
                                        {
                                            schedule.time.filter(
                                                (time) => time.user
                                            ).length
                                        }
                                    </Flex>
                                </Td>

                                <Td>
                                    <Badge
                                        variant="tinted"
                                        colorScheme={
                                            schedule.status ? 'brand' : 'red'
                                        }
                                    >
                                        {schedule.status ? 'Open' : 'Closed'}
                                    </Badge>
                                </Td>

                                <Td textAlign="right">
                                    <ViewModal
                                        users={users}
                                        isUsersFetched={isUsersFetched}
                                        schedule={schedule}
                                    />
                                </Td>
                            </Tr>
                        )}
                        settings={{
                            search: 'off'
                        }}
                    />
                </Flex>
            </Card>
        </Container>
    )
}

Schedule.authentication = {
    authorized: 'Admin'
}

export default Schedule
