import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import {
    Button,
    Container,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Td,
    Text,
    Tr,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { FiEdit2, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'
import Card from 'components/card'
import Table from 'components/table'
import Modal from 'components/modal'
import Toast from 'components/toast'

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

    const addServices = useMutation((data) => api.create('/services', data), {
        onSuccess: () => {
            queryClient.invalidateQueries('services')
            setIsLoading(false)
            disclosure.onClose()

            toast({
                position: 'top',
                duration: 1000,
                render: () => (
                    <Toast
                        title="Success"
                        description="Services added successfully."
                    />
                )
            })
        }
    })

    const onSubmit = (data) => {
        setIsLoading(true)

        addServices.mutate({
            name: data.name.toLowerCase(),
            price: Number(data.price)
        })
    }

    return (
        <Modal
            title="Add Services"
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
                    <FormControl isInvalid={errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            size="lg"
                            {...register('name', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.price}>
                        <FormLabel>Price</FormLabel>
                        <Input
                            type="number"
                            size="lg"
                            {...register('price', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <Flex justify="end" align="center" gap={3}>
                        <Button size="lg" onClick={disclosure.onClose}>
                            Close
                        </Button>

                        <Button
                            type="submit"
                            size="lg"
                            colorScheme="brand"
                            isLoading={isLoading}
                        >
                            Submit
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </Modal>
    )
}

const EditModal = ({ service }) => {
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

    const editServices = useMutation(
        (data) => api.update('/services', service._id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('service')
                setIsLoading(false)
                disclosure.onClose()

                toast({
                    position: 'top',
                    duration: 1000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Service updated successfully."
                        />
                    )
                })
            }
        }
    )

    const onSubmit = (data) => {
        setIsLoading(true)

        editServices.mutate({
            name: data.name.toLowerCase(),
            price: Number(data.price)
        })
    }

    return (
        <Modal
            title="Edit Services"
            toggle={(onOpen) => (
                <MenuItem
                    icon={<FiEdit2 size={16} />}
                    onClick={() => clearErrors() || reset() || onOpen()}
                >
                    Edit
                </MenuItem>
            )}
            disclosure={disclosure}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <FormControl isInvalid={errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            defaultValue={service.name}
                            size="lg"
                            {...register('name', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.price}>
                        <FormLabel>Price</FormLabel>
                        <Input
                            defaultValue={service.price}
                            size="lg"
                            {...register('price', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <Flex justify="end" align="center" gap={3}>
                        <Button size="lg" onClick={disclosure.onClose}>
                            Close
                        </Button>

                        <Button
                            type="submit"
                            size="lg"
                            colorScheme="brand"
                            isLoading={isLoading}
                        >
                            Submit
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </Modal>
    )
}

const Services = () => {
    const queryClient = useQueryClient()
    const { data: services, isFetched: isServicesFetched } = useQuery(
        ['services'],
        () => api.all('/services')
    )
    const toast = useToast()

    const deleteServices = useMutation(
        (data) => api.remove('/services', data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('services')

                toast({
                    position: 'top',
                    duration: 1000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Services removed successfully."
                        />
                    )
                })
            }
        }
    )

    const onSubmit = (id) => {
        deleteServices.mutate(id)
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
                            Services
                        </Text>

                        <AddModal />
                    </Flex>

                    <Divider />

                    <Table
                        data={services}
                        fetched={isServicesFetched}
                        th={['Name', 'Price', '']}
                        td={(service) => (
                            <Tr key={service._id}>
                                <Td>
                                    <Text textTransform="capitalize">
                                        {service.name}
                                    </Text>
                                </Td>

                                <Td>
                                    <Text>
                                        {service.price.toLocaleString(
                                            undefined,
                                            { maximumFractionDigits: 2 }
                                        )}
                                    </Text>
                                </Td>

                                <Td textAlign="right">
                                    <Menu placement="bottom-end">
                                        <MenuButton
                                            as={IconButton}
                                            size="xs"
                                            icon={
                                                <FiMoreHorizontal size={12} />
                                            }
                                        />

                                        <MenuList>
                                            <EditModal service={service} />
                                            <MenuItem
                                                icon={<FiTrash2 size={16} />}
                                                onClick={() =>
                                                    onSubmit(service._id)
                                                }
                                            >
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
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

Services.authentication = {
    authorized: 'Admin'
}

export default Services
