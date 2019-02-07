import { Server } from './config/server';

class UserBarcode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            valueOfBarcode: '0',
        };
    }

    componentDidMount() {
        this.getBarcode();
    }

    getBarcode = () => {
        var request = new XMLHttpRequest();
        var comp = this;
        request.open('GET', Server.path + '/getBarcode?uid=jifUBEXSfGVpkLHKyOHZDsVGS042');
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            console.log(request.response);
            comp.setState({
                isLoading: false,
                valueOfBarcode: request.response.barcode_num,
            });
        };

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'column' }}>
                        <TouchableWithoutFeedback onPress={this.getBarcode}>
                            <Image source={require('../img/coin.png')} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column' , justifyContent: 'center',}}>
                <Barcode value={this.state.valueOfBarcode} format="CODE128" />
                <Text style={styles.valueBarcode}>{this.state.valueOfBarcode}</Text>
            </View>
        );
    }
}