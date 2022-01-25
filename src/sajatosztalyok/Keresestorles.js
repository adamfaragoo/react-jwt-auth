import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput } from 'react-native';


const ipcim="localhost:8080";

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
        isLoading: true,
        dataSource:[],
        szoveg:''
    }
  }

  componentDidMount(){
    document.body.style.backgroundColor = "#262626" 
  }

  
  kereses= () =>{
    let bemenet ={
      bevitel1:this.state.szoveg,
    }
    fetch('http://'+ipcim+'/osszessorozatkomment', {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
      )
        .then((response) => response.json())
        .then((responseJson) => {
   
          this.setState({
            isLoading: false,
            dataSource: responseJson,
          }, function(){
   
          });
   
        })
        .catch((error) =>{
          console.error(error);
        });
   
    
      }
   

  render(){

    return(
      <View style={{flex: 1, paddingTop:20}}>
       
       <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <TextInput
        placeholderTextColor="black"
        style={{height: 45,backgroundColor:"#DCDCDC", borderRadius:10, padding:10, width:240,margin:20,marginRight:10, textAlign:"center", }}
        placeholder="Keresés"
        onChangeText={(szoveg) => this.setState({szoveg})}
        value={this.state.szoveg}
        />
        <TouchableOpacity 
          onPress={ ()=>this.kereses()}>
          <View style={{width:85,height:50,backgroundColor:"#2596be", borderRadius:10,height:45, alignItems:'center', justifyContent:'center'}}>
        
            <Text>Keresés</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={this.state.dataSource}
        keyExtractor={({komment_id}) => komment_id}
        renderItem={({item}) => 
        <View>
            <Text>{item.komment_szoveg}</Text>
        </View>
         }
        />
      </View>
      

    );
  }
}
