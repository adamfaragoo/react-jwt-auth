import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Image,TouchableOpacity,  } from 'react-native';
 


const ipcim="172.16.0.29";

export default class Sorozat extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      cim:'',
      aktmufaj:1,
      color: "#262626"
    }
  }

  
  componentDidMount(){
    document.body.style.backgroundColor = "#262626"
     fetch('http://'+ipcim+':3000/sorozat')
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
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20,}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={5}
          data={this.state.dataSource}
          keyExtractor={({sorozat_id}) => sorozat_id} 
          renderItem={({item}) =>
          <View>
            <TouchableOpacity>
            <Image 
            source={{uri:'http://'+ipcim+':3000/'+item.sorozat_kep}}
            style={{width:200,height:280,marginRight:10,marginTop:10,marginLeft:10,borderRadius:15}}
            />
            <Text style={{color:"white",marginLeft:15,marginTop:5,fontSize:16,fontWeight:"bold",width:155}}>{item.sorozat_cim}</Text>
            <Text style={{color:"white",marginLeft:15,marginTop:5,fontSize:12,width:60,borderWidth:1,borderRadius:5,borderColor:"white",textAlign:"center"}}>{item.mufaj_nev}</Text>
            </TouchableOpacity>
            
          </View>
        }
        />
    );
  }
  
}