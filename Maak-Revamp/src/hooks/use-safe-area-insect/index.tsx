import React from 'react';
import { Colors } from '../../constants';
import { FlatList, FlatListProps, View, ViewStyle } from 'react-native';

type Props = React.PropsWithChildren<{
    style?: ViewStyle | ViewStyle[];
    backGroundColor?: string,
}> & FlatListProps<any>;

const SafeAreaInsect: React.FC<Props> = (props) => {
    const {
        style,
        renderItem,
        backGroundColor = Colors.primaryColor,
    } = props;

    const containerStyle = React.useMemo(() => ([{
        flex: 1,
        backgroundColor: Colors.white,
    }, style]
    ), [backGroundColor, style]);


    return (
        <View style={containerStyle}>
            <FlatList
                {...props}
                bounces={false}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default SafeAreaInsect;