import React from 'react';
import { FlatList, ActivityIndicator,View, Text, TouchableOpacity, TextInput} from 'react-native-web';
import FileUpload from "./upload"


const ipcim="172.16.0.29";


export default class Kezdooldal extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      sorozatcim:''

    }
    
  }

  componentDidMount(){
    document.body.style.backgroundColor = "#262626"

    

  }

  render(){

    return(
      <View>
          <TextInput
          style={{borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderRadius:15,borderColor:"transparent",color:"black",width:300,height:50,marginLeft:30}}
          onChangeText={(sorozatcim) => this.setState({sorozatcim})}
          value={this.state.sorozatcim}
          multiline={true}
          placeholder='Hozzászólás irása'
        />

          <FileUpload></FileUpload>
    </View>
    );
  }
}