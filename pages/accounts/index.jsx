import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import {
    Avatar,
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
    Select,
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

const MoreModal = ({ user }) => {
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

    const editMutation = useMutation(
        (data) => api.update('/users', user._id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users')
                disclosure.onClose()
                setIsLoading(false)

                toast({
                    position: 'top',
                    duration: 1000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="User Updated successfully."
                        />
                    )
                })
            }
        }
    )

    const onSubmit = (data) => {
        setIsLoading(true)
        editMutation.mutate(data)
    }

    return (
        <Modal
            title="Edit User"
            toggle={(onOpen) => (
                <IconButton
                    size="xs"
                    icon={<FiMoreHorizontal size={12} />}
                    onClick={() => clearErrors() || reset() || onOpen()}
                />
            )}
            disclosure={disclosure}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <FormControl isInvalid={errors.name}>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                            defaultValue={user.name}
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
                            defaultValue={user.email}
                            size="lg"
                            cursor="not-allowed"
                            readOnly
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Role</FormLabel>

                        <Select
                            defaultValue={user.role}
                            size="lg"
                            {...register('role', { required: true })}
                        >
                            <option value="Admin">Admin</option>
                            <option value="Patient">Patient</option>
                        </Select>

                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Status</FormLabel>

                        <Select
                            defaultValue={user.status}
                            size="lg"
                            {...register('status', { required: true })}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Select>

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

const Accounts = () => {
    const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () =>
        api.all('users')
    )
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ]

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
                            Accounts
                        </Text>

                        <Button size="lg" colorScheme="brand">
                            Add New
                        </Button>
                    </Flex>

                    <Divider />

                    <Table
                        data={users}
                        fetched={isUsersFetched}
                        th={[
                            'Full Name',
                            'Email',
                            'Role',
                            'Status',
                            'Joined',
                            ''
                        ]}
                        td={(user) => (
                            <Tr key={user._id}>
                                <Td>
                                    <Flex align="center" gap={3}>
                                        <Avatar
                                            name={user.name}
                                            src={user.image}
                                        />
                                        <Text color="accent-1">
                                            {user.name}
                                        </Text>
                                    </Flex>
                                </Td>

                                <Td>
                                    <Text>{user.email}</Text>
                                </Td>

                                <Td>
                                    <Badge
                                        variant="tinted"
                                        colorScheme={
                                            user.role === 'Admin'
                                                ? 'yellow'
                                                : 'brand'
                                        }
                                    >
                                        {user.role}
                                    </Badge>
                                </Td>

                                <Td>
                                    <Badge
                                        variant="tinted"
                                        colorScheme={
                                            user.status === 'active'
                                                ? 'brand'
                                                : 'red'
                                        }
                                        textTransform="capitalize"
                                    >
                                        {user.status}
                                    </Badge>
                                </Td>

                                <Td>
                                    <Text>
                                        {
                                            months[
                                                user.created
                                                    .split(',')[0]
                                                    .split('/')[0] - 1
                                            ]
                                        }{' '}
                                        {
                                            user.created
                                                .split(',')[0]
                                                .split('/')[1]
                                        }
                                        ,{' '}
                                        {
                                            user.created
                                                .split(',')[0]
                                                .split('/')[2]
                                        }
                                    </Text>
                                </Td>

                                <Td textAlign="right">
                                    <MoreModal user={user} />
                                </Td>
                            </Tr>
                        )}
                        select={(register) => (
                            <Flex flex={1} justify="end" align="center" gap={3}>
                                <Select
                                    placeholder="Role"
                                    size="lg"
                                    w="auto"
                                    {...register('role')}
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Patient">Patient</option>
                                </Select>

                                <Select
                                    placeholder="Status"
                                    size="lg"
                                    w="auto"
                                    {...register('status')}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </Select>
                            </Flex>
                        )}
                        filters={(data, watch) => {
                            return data
                                .filter((data) =>
                                    ['name', 'email'].some((key) =>
                                        data[key]
                                            .toString()
                                            .toLowerCase()
                                            .includes(
                                                watch('search') &&
                                                    watch(
                                                        'search'
                                                    ).toLowerCase()
                                            )
                                    )
                                )
                                .filter((data) =>
                                    watch('role')
                                        ? watch('role') === data.role
                                        : data
                                )
                                .filter((data) =>
                                    watch('status')
                                        ? watch('status') === data.status
                                        : data
                                )
                        }}
                        effects={(watch) => [watch('role'), watch('status')]}
                    />
                </Flex>
            </Card>
        </Container>
    )
}

Accounts.authentication = {
    authorized: 'Admin'
}

export default Accounts
