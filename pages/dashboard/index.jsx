import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import {
    Avatar,
    Badge,
    Button,
    Container,
    Divider,
    Flex,
    IconButton,
    Image,
    Td,
    Text,
    Tr,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/card'
import Table from 'components/table'
import Modal from 'components/modal'
import Toast from 'components/toast'

const ViewModal = ({ appoint }) => {
    const queryClient = useQueryClient()
    const disclosure = useDisclosure()
    const [isAcceptLoading, setIsAcceptLoading] = useState(false)
    const [isRejectLoading, setIsRejectLoading] = useState(false)
    const toast = useToast()

    const acceptMutation = useMutation(
        (data) => api.update('/appointment/accept', appoint._id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('appointment')
                setIsAcceptLoading(false)
                disclosure.onClose()

                toast({
                    position: 'top',
                    duration: 1000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Appointment accepted successfully"
                        />
                    )
                })
            }
        }
    )

    const rejectMutation = useMutation(
        (data) => api.update('/appointment/reject', appoint._id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('appointment')
                setIsRejectLoading(false)
                disclosure.onClose()

                toast({
                    position: 'top',
                    duration: 1000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Appointment rejected successfully"
                        />
                    )
                })
            }
        }
    )

    const onAccept = () => {
        setIsAcceptLoading(true)
        acceptMutation.mutate(appoint)
    }

    const onReject = () => {
        setIsRejectLoading(true)
        rejectMutation.mutate(appoint)
    }

    return (
        <Modal
            title="Proof Of Payment"
            size="xl"
            toggle={(onOpen) => (
                <IconButton
                    size="xs"
                    icon={<FiMoreHorizontal size={16} />}
                    onClick={onOpen}
                />
            )}
            disclosure={disclosure}
        >
            <Flex direction="column" gap={6}>
                <Image alt="img" src={appoint.proof_of_payment} />

                <Flex gap={3}>
                    <Button
                        size="lg"
                        colorScheme="red"
                        w="full"
                        isLoading={isRejectLoading}
                        onClick={onReject}
                    >
                        Reject
                    </Button>

                    <Button
                        size="lg"
                        colorScheme="brand"
                        w="full"
                        isLoading={isAcceptLoading}
                        onClick={onAccept}
                    >
                        Accept
                    </Button>
                </Flex>
            </Flex>
        </Modal>
    )
}

const Dashboard = () => {
    const queryClient = useQueryClient()
    const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () =>
        api.all('/users')
    )
    const { data: appointment, isFetched: isAppointmentFetched } = useQuery(
        ['appointment'],
        () => api.all('/appointment')
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
    const [isLoading, setIsLoading] = useState(false)

    const systemMutation = useMutation(
        (data) => api.update('/system', '6391fba3c3821ffcc613e367', data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('system')
                setIsLoading(false)
            }
        }
    )

    const onCloseSchedule = () => {
        setIsLoading(true)

        systemMutation.mutate({
            status: false
        })
    }

    const onOpenSchedule = () => {
        setIsLoading(true)

        systemMutation.mutate({
            status: true
        })
    }

    return (
        <Container>
            <Card>
                <Flex direction="column" gap={6}>
                    <Flex justify="space-between" align="center" gap={6}>
                        <Text
                            fontSize="2xl"
                            fontWeight="semibold"
                            color="accent-1"
                        >
                            Appointment
                        </Text>

                        {isSystemFetched && system.status ? (
                            <Button
                                variant="tinted"
                                size="lg"
                                colorScheme="red"
                                isLoading={isLoading}
                                onClick={onCloseSchedule}
                            >
                                Close Appointment
                            </Button>
                        ) : (
                            <Button
                                variant="tinted"
                                size="lg"
                                colorScheme="brand"
                                isLoading={isLoading}
                                onClick={onOpenSchedule}
                            >
                                Open Appointment
                            </Button>
                        )}
                    </Flex>

                    <Divider />

                    <Table
                        data={appointment}
                        fetched={isUsersFetched && isAppointmentFetched}
                        th={[
                            'Patient',
                            'Service',
                            'Date',
                            'Time',
                            'Status',
                            ''
                        ]}
                        td={(appoint) => (
                            <Tr key={appoint._id}>
                                <Td>
                                    {users
                                        .filter(
                                            (user) => user._id === appoint.user
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
                                        ))}
                                </Td>

                                <Td>
                                    <Text textTransform="capitalize">
                                        {appoint.service.name} - ₱
                                        {appoint.service.price}
                                    </Text>
                                </Td>

                                <Td>
                                    <Text>
                                        {
                                            months[
                                                appoint.schedule.date.split(
                                                    '-'
                                                )[1] - 1
                                            ]
                                        }{' '}
                                        {appoint.schedule.date.split('-')[2]},{' '}
                                        {appoint.schedule.date.split('-')[0]}
                                    </Text>
                                </Td>

                                <Td>
                                    <Text>{appoint.schedule.time}</Text>
                                </Td>

                                <Td>
                                    <Badge
                                        variant="tinted"
                                        colorScheme={
                                            appoint.status === 'accepted'
                                                ? 'brand'
                                                : appoint.status === 'rejected'
                                                ? 'red'
                                                : appoint.status ===
                                                      'pending' && 'yellow'
                                        }
                                        textTransform="capitalize"
                                    >
                                        {appoint.status}
                                    </Badge>
                                </Td>

                                <Td textAlign="right">
                                    <ViewModal appoint={appoint} />
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

Dashboard.authentication = {
    authorized: 'Admin'
}

export default Dashboard
