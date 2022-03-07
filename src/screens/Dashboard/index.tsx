import React from 'react';
import { HighlightCard } from '../../Components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../Components/TransactionCard';

import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGretting, UserName, Icon, HighlightCards, Transactions, Title, TransactionList, LogoutButton } from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [{
        id: '1',
        type: 'positive',
        title: "Desenvolvimento de site",
        amount: "12.000,00",
        category: {
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date: "13/01/2022"
    }, {
        id: '2',
        type: 'negative',
        title: "Hamburgueria Pizzy",
        amount: "7.200,00",
        category: {
            name: 'Viagem',
            icon: 'coffee'
        },
        date: "13/01/2022"
    }, {
        id: '3',
        type: 'negative',
        title: "Aluguel da casa",
        amount: "1.200,00",
        category: {
            name: 'Casa',
            icon: 'shopping-bag'
        },
        date: "13/01/2022"
    }]

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://github.com/liciomachado.png' }} />

                        <User>
                            <UserGretting>Olá,</UserGretting>
                            <UserName>Mauricio</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => { }}>
                        <Icon name="power" />
                    </LogoutButton>
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type='up'
                    title='Entradas'
                    amount='17.400,00'
                    lastTransaction='Ultima entrada dia 14 de abril' />
                <HighlightCard
                    type='down'
                    title='Saidas'
                    amount='5.400,00'
                    lastTransaction='Ultima entrada dia 14 de abril' />
                <HighlightCard
                    type='total'
                    title='Total'
                    amount='12.000,00'
                    lastTransaction='Ultima entrada dia 14 de abril' />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    )
}

