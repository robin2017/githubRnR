/**
 * 直接从其他地方拷贝过来
 * */
import React, {Component} from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class ListItem extends Component {
    render() {
        const {item} = this.props;
        if (!item || !item.owner) return null;
        let favoriteButton = <TouchableOpacity
            style={{padding: 6}}
            underlayColor={'transparent'}
            onPress={() => {
            }}>

            <FontAwesome name={'star-o'}
                         size={26}
                         style={{color: 'red'}}/>

        </TouchableOpacity>


        return (
            <TouchableOpacity
                onPress={this.props.onSelect}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{item.full_name}</Text>

                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.row}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Author:</Text>
                            <Image style={{height: 22, width: 22}} source={{uri: item.owner.avatar_url}}></Image>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Star:</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        {favoriteButton}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    }
});
