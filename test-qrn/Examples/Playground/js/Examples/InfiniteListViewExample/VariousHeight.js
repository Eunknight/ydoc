'use strict'

import React, {
	Component,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	InfiniteListView,
} from 'qunar-react-native'

class InfiniteListViewExample extends Component {
    constructor(props){
        super(props)

        const ds = new InfiniteListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        })
        let rows = []
        for(let i = 0; i < 200; i++){
            rows.push(i)
        }
        this.state = {
            rows: rows,
        	dataSource: ds.cloneWithRows(rows),
        }
    }

    render() {
        // 通过configureRowHeight配置不同行高
        return (
            <View style={styles.container}>
                <InfiniteListView
                    ref="InfiniteListView"
                    dataSource={this.state.dataSource}
                    configureRowHeight={(rowData, rowIndex) => {return rowData % 10 === 0 ? 120 : 100}}
                    renderRow={(rowData) => <ListViewExampleRow title={rowData} text={this.state.text}/>}
                />
            </View>
        )
    }
}

class ListViewExampleRow extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const {title, text} = this.props
        const url = 'http://placeholdit.imgix.net/~text?txtsize=33&bg=666&txtclr=fff&txt=' + title + '&w=100&h=110',
            randomText = Number(title) % 100

        return (
            <View style={styles.row}>
                <Image
                    style={[styles.rowImg]}
                    source={{uri: 'http://placeholdit.imgix.net/~text?txtsize=33&bg=666&txtclr=fff&txt=' + title + '&w=100&h=110'}}
                />

                <View style={[styles.rowContent]}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <View>
                        <Text style={{color: '#25a4bb'}}>{randomText}分 / {randomText}条评论</Text>
                        <Text style={[styles.alignRight, {color: 'orange'}]}>{randomText}起</Text>
                    </View>
                    <View>
                        <View style={[styles.labelWrap]}>
                            <Text style={[styles.labelText]}>label{randomText}</Text>
                            <Text style={[styles.labelText]}>label{randomText}</Text>
                            <Text style={[styles.labelText]}>label{randomText}</Text>
                        </View>
                        <Text style={[styles.alignRight]}>{randomText}折vip</Text>
                    </View>
                    <View>
                        <Text style={styles.detailText}>地点：首都机场{randomText}</Text>
                        <TouchableOpacity style={[styles.alignRight]}>
                            <Text style={[styles.button]}>预定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    rowImg: {
        flex: 1,
        height: 100,
        resizeMode: 'stretch',
    },
    rowContent: {
        flex: 3,
        padding: 7,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    detailText: {
        marginTop: 3,
        color: '#999',
        fontSize: 12,
    },
    alignRight: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    button: {
        padding: 2,
        borderRadius: 4,
        color: '#fff',
        backgroundColor: '#09c',
    },
    labelWrap: {
        flexDirection: 'row',
    },
    labelText: {
        marginRight: 3,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#09c',
    },
	operationButton: {
		padding: 5,
		borderWidth: 1,
		borderColor: '#069',
		borderRadius: 5,
	}
})

module.exports = {
    title: 'ImageTextList',
    examples: [{
        render: () => {
            return <InfiniteListViewExample/>
        }
    }]
};