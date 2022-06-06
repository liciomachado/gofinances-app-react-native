import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../Components/Form/Button';
import { CategorySelectButton } from '../../Components/Form/CategorySelectButton';
import { InputForm } from '../../Components/Form/InputForm';
import { TransactionTypeButton } from '../../Components/Form/TransactionTypeButton';

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { CategorySelect } from '../CategorySelect';

export type FormData = {
    [name: string]: any;
}

type NavigationProps = {
    navigate: (screen: string) => void;
}

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Nome é obrigatório'),
    amount: Yup.number()
        .transform((_value, originalValue) => Number(originalValue.replace(/,/, '.')))
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório')
});

export function Register() {
    const navigation = useNavigation<NavigationProps>();
    const [transactionType, setTransactioType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });


    function handleTransactionTypeSelected(type: 'positive' | 'negative') {
        setTransactioType(type);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    async function handleRegister(form: FormData) {
        if (!transactionType)
            return Alert.alert('Selecione o tipo da transação');

        if (category.key === 'category')
            return Alert.alert('Selecione a categoria');

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const dataKey = '@gofinances:transactions';
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                ...currentData,
                newTransaction
            ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset();
            setTransactioType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });
            navigation.navigate('Listagem');
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possivel salvar');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder='Nome'
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            name="amount"
                            control={control}
                            placeholder='Preço'
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionTypes>
                            <TransactionTypeButton
                                title='Income'
                                type='up'
                                onPress={() => handleTransactionTypeSelected('positive')}
                                isActive={transactionType === 'positive'}
                            />

                            <TransactionTypeButton
                                title='Outcome'
                                type='down'
                                onPress={() => handleTransactionTypeSelected('negative')}
                                isActive={transactionType === 'negative'}
                            />

                        </TransactionTypes>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>
                    <Button
                        title='Enviar'
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    )
}

