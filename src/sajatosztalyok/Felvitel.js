import React from 'react';
import { FlatList, ActivityIndicator,View, Text, TouchableOpacity, TextInput} from 'react-native-web';
import FileUpload from "./upload"


const ipcim="172.16.0.29";


export default class Kezdooldal extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      sorozatcim:'',
      sorozatev:'',
      sorozathossz:'',
      sorozatmufaj:'',
      sorozatleiras:'',
      sorozatevadszam:'',
      sorozatepizodszam:'',
      filmcim:'',
      filmev:'',
      filmhossz:'',
      filmmufaj:'',
      filmleiras:'',


    }
    
  }

  componentDidMount(){
    document.body.style.backgroundColor = "#262626"

    

  }

  render(){

    return(
        <View style={{flexDirection:"row"}}>
          <View style={{alignItems:"left", marginTop:30}}>
          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30,}}
          onChangeText={(sorozatcim) => this.setState({sorozatcim})}
          value={this.state.sorozatcim}
          multiline={true}
          placeholder='Sorozat címe'
        />

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(sorozatev) => this.setState({sorozatev})}
          value={this.state.sorozatev}
          multiline={true}
          placeholder='Sorozat év'
        />

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(sorozathossz) => this.setState({sorozathossz})}
          value={this.state.sorozathossz}
          multiline={true}
          placeholder='Sorozat hossz'
        />
            <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(sorozatmufaj) => this.setState({sorozatmufaj})}
          value={this.state.sorozatmufaj}
          multiline={true}
          placeholder='Sorozat műfaj'
        />

      

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(sorozatleiras) => this.setState({sorozatleiras})}
          value={this.state.sorozatleiras}
          multiline={true}
          placeholder='Sorozat leírás'
        />

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(sorozatevadszam) => this.setState({sorozatevadszam})}
          value={this.state.sorozatevadszam}
          multiline={true}
          placeholder='Sorozat évadszáma'
        />
        <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(sorozatepizodszam) => this.setState({sorozatepizodszam})}
          value={this.state.sorozatepizodszam}
          multiline={true}
          placeholder='Sorozat epizódszám'
        />
          <FileUpload 
          sorozatcim={this.state.sorozatcim} 
          sorozatev={this.state.sorozatev} 
          sorozathossz={this.state.sorozathossz}
          sorozatmufaj={this.state.sorozatmufaj}
          sorozatleiras={this.state.sorozatleiras}
          sorozatevadszam={this.state.sorozatevadszam}
          sorozatepizodszam={this.state.sorozatepizodszam}>
          </FileUpload>

    </View>

    <View style={{alignItems:"center", marginTop:30}}>
          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30,}}
          onChangeText={(filmcim) => this.setState({filmcim})}
          value={this.state.filmcim}
          multiline={true}
          placeholder='Film címe'
        />

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(filmev) => this.setState({filmev})}
          value={this.state.filmev}
          multiline={true}
          placeholder='Film év'
        />

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(filmhossz) => this.setState({filmhossz})}
          value={this.state.filmhossz}
          multiline={true}
          placeholder='Film hossz'
        />
            <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(filmmufaj) => this.setState({filmmufaj})}
          value={this.state.filmmufaj}
          multiline={true}
          placeholder='Film műfaj'
        />

      

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(filmleiras) => this.setState({filmleiras})}
          value={this.state.filmleiras}
          multiline={true}
          placeholder='Film leírás'
        />

          <FileUpload 
          filmcim={this.state.filmcim} 
          filmev={this.state.filmev} 
          filmhossz={this.state.filmhossz}
          filmmufaj={this.state.filmmufaj}
          filmleiras={this.state.filmleiras}>
          </FileUpload>

    </View>

</View>

      

    );
  }
}