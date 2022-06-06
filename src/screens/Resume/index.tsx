import React, { useEffect, useState } from 'react';
import { HistoryCard } from '../../Components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, Header, Title, Content } from './styles';
import { categories } from '../../Utils/categories';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: string;
    color: string;
}

export function Resume() {
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

    async function loadData() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives: TransactionData[] = responseFormatted.filter((expensive: TransactionData) => expensive.type === 'negative');

        const totalByCategory: CategoryData[] = [];

        console.log("EXPENSIVES: ", expensives)

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach(expensive => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount);
                }
            });

            if (categorySum > 0) {
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'brl'
                });

                totalByCategory.push({
                    name: category.name,
                    total,
                    color: category.color,
                    key: category.key
                })
            }


        })

        console.log("TOTAL CATEGORY: ", totalByCategory)
        setTotalByCategories(totalByCategory);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <Container>
            <Header >
                <Title>Resumo por categoria</Title>
            </Header>

            <Content>
                {
                    totalByCategories.map(item => (
                        <HistoryCard
                            key={item.key}
                            title={item.name}
                            amount={item.total}
                            color={item.color}
                        />
                    ))
                }
            </Content>
        </Container>
    )
}

