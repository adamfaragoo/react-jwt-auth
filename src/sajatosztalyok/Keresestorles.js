import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput } from 'react-native';


const ipcim="localhost:8080";

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    document.body.style.backgroundColor = "#262626" 
    return fetch('http://'+ipcim+'/sorozat')
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

  torles=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch('http://'+ipcim+'/sorozattorles', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  fetch('http://'+ipcim+'/sorozat')
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
  kereses=async () =>{
    //alert(this.state.cim)
    let bemenet ={
      bevitel1:this.state.cim,


    }
    fetch('http://'+ipcim+'/kereses', {
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
        //alert(JSON.stringify(this.state.dataSource))

       });

     })
     .catch((error) =>{
       console.error(error);
     });

 
   }


  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
       
       <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <TextInput
        placeholderTextColor="black"
        style={{height: 45,backgroundColor:"#DCDCDC", borderRadius:10, padding:10, width:240,margin:20,marginRight:10, textAlign:"center", }}
        placeholder="Keresés"
        onChangeText={(cim) => this.setState({cim})}
        value={this.state.cim}
        />
        <TouchableOpacity 
          onPress={async ()=>this.kereses()}>
          <View style={{width:85,height:50,backgroundColor:"#2596be", borderRadius:10,height:45, alignItems:'center', justifyContent:'center'}}>
        
            <Text>Keresés</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      </View>
      

    );
  }
}
