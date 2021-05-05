import React, { useState } from 'react';
import styled from 'styled-components/native';
import { List } from 'react-native-paper';
import { Text, Image } from 'react-native';

function ProductList({ id, category, name, date }) {
    var img;
    switch (category) {
        case "alcohol":
            img = require("../../../assets/images/category/alcohol.png");
            break;
        case "beverage":
            img = require("../../../assets/images/category/beverage.png");
            break;
        case "diary":
            img = require("../../../assets/images/category/diary.png");
            break;
        case "fresh":
            img = require("../../../assets/images/category/fresh.png");
            break;
        case "frozen":
            img = require("../../../assets/images/category/frozen.png");
            break;
        case "health":
            img = require("../../../assets/images/category/health.png");
            break;
        case "ices":
            img = require("../../../assets/images/category/ices.png");
            break;
        case "meat":
            img = require("../../../assets/images/category/meat.png");
            break;
        case "noodles":
            img = require("../../../assets/images/category/noodles.png");
            break;
        case "ocean":
            img = require("../../../assets/images/category/ocean.png");
            break;
        case "others":
            img = require("../../../assets/images/category/others.png");
            break;
        case "pickles":
            img = require("../../../assets/images/category/pickles.png");
            break;
        case "powder":
            img = require("../../../assets/images/category/powder.png");
            break;
        case "seasoning":
            img = require("../../../assets/images/category/seasoning.png");
            break;
        case "snack":
            img = require("../../../assets/images/category/snack.png");
            break;
    }
    return (
        <List.Item
            title={name}
            left={props => <Image source={img} style={{ width: 40, height: 40 }}/>}
            right={props => <Text style={{ padding: 7 }}>{date}</Text>}
        />
    );
}


export default ProductList;