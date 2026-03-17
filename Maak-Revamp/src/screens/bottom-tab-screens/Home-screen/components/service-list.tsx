import React from 'react';
import { FlatList, View } from 'react-native';
import { Colors, moderateScale } from '../../../../constants';
import { SerivceCard, TakeSpace } from '../../../../components';

type ServiceListProps = { data: Array<any> }

const Size16 = moderateScale(16);
const Space6 = () => <TakeSpace space={6} />;

const ServiceList = ({ data = [] }: ServiceListProps) => {
    return (
        <View>
            <FlatList
                horizontal
                data={data}
                renderItem={SerivceCard}
                ListHeaderComponent={Space6}
                ListFooterComponent={Space6}
                style={{ paddingBlock: Size16 }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ backgroundColor: Colors.white }}
            />
        </View>
    );
};

export default ServiceList;