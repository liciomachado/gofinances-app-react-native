import React, { useState } from 'react';
import { Button } from '../../Components/Form/Button';
import { Input } from '../../Components/Form/Input';
import { TransactionTypeButton } from '../../Components/Form/TransactionTypeButton';

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';

export function Register() {
    const [transactionType, setTransactioType] = useState('');

    function handleTransactionTypeSelected(type: 'up' | 'down') {
        setTransactioType(type);
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
                </Fields>
                <Button title='Enviar' />
            </Form>
        </Container>
    )
}

