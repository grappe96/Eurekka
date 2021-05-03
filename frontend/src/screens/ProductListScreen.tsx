import React, { useState } from 'react';
import styled from 'styled-components/native';
import { List, Text } from 'react-native-paper';
import axios from 'axios'
import ProductList from '../components/Product/ProductList'

const ProductListScreen = ({ navigation }) => {
    // const [products, setResult] = useState<Object>([]);

    // const getProducts = async () => {
    //     axios
    //         .get("/refrigerator/{refrigerId}")
    //         .then(({ data }) => {
    //             setResult(data.data);
    //           })
    //           .catch(e => {  // API 호출이 실패한 경우
    //             console.error(e);  // 에러표시
    //           });
    //  };

    const products = [
        {
            id: 0,
            category: "diary",
            name: "서울우유",
            date: "D-5",
        },
        {
            id: 1,
            category: "diary",
            name: "서울우유",
            date: "D-7",
        },
        {
            id: 2,
            category: "fresh",
            name: "대파",
            date: "D-10",
        },
    ];

    const Container = styled.View`
      flex: 1;
      background-color: ${({ theme }) => theme.background};
    `;
  
    return (
        // {products.map((product) => (
        //     <ProductList
        //         key={product.id}
        //         id={product.id}
        //         category={product.category}
        //         name={product.name}
        //         date={product.date}
        //     />
        // ))}
        <Container>
            {products.map((product) => (
                <ProductList
                    key={product.id}
                    id={product.id}
                    category={product.category}
                    name={product.name}
                    date={product.date}
                />
            ))}
        </Container>
    );
  };

export default ProductListScreen;