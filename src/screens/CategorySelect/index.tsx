import React from 'react';
import { FlatList } from 'react-native';
import { categories } from '../../Utils/categories';

import { Button } from '../../Components/Form/Button';

import { Container, Header, Title, Category, Icon, Name, Separator, Footer } from './styles';

interface CategoryProps {
    key: string;
    name: string;
}

interface Props {
    category: CategoryProps;
    setCategory: (category: CategoryProps) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({ category, closeSelectCategory, setCategory }: Props) {

    function handleCategorySelect(item: CategoryProps) {
        setCategory(item)
    }

    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList
                data={categories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />


            <Footer>
                <Button
                    title='Selecionar'
                    onPress={closeSelectCategory}
                />
            </Footer>
        </Container>
    )
}

