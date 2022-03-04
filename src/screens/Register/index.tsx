import React, { useState } from 'react';
import { Modal } from 'react-native';

import { Button } from '../../Components/Form/Button';
import { CategorySelectButton } from '../../Components/Form/CategorySelectButton';
import { Input } from '../../Components/Form/Input';
import { TransactionTypeButton } from '../../Components/Form/TransactionTypeButton';

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { CategorySelect } from '../CategorySelect';
export function Register() {
    const [transactionType, setTransactioType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });


    function handleTransactionTypeSelected(type: 'up' | 'down') {
        setTransactioType(type);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input
                        placeholder='Nome'
                    />

                    <Input
                        placeholder='Preço'
                    />
                    <TransactionTypes>
                        <TransactionTypeButton
                            title='Income'
                            type='up'
                            onPress={() => handleTransactionTypeSelected('up')}
                            isActive={transactionType === 'up'}
                        />

                        <TransactionTypeButton
                            title='Outcome'
                            type='down'
                            onPress={() => handleTransactionTypeSelected('down')}
                            isActive={transactionType === 'down'}
                        />

                    </TransactionTypes>
                    <CategorySelectButton
                        title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>
                <Button title='Enviar' />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    )
}

