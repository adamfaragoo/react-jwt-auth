import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Image,TouchableOpacity,TextInput,Dimensions  } from 'react-native';
 
var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

const ipcim="localhost:8080";

export default class Sorozat extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      cim:'',
      aktmufaj:1,
      
    }
  }

  
  componentDidMount(){
    document.body.style.backgroundColor = "#262626"

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

      fetch('http://'+ipcim+'/mufaj')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource2: responseJson,
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

   kivalaszt = async(szam)=>{
    //alert(szam)
    this.setState({aktmufaj:szam})
    let bemenet={
      bevitel2:szam
    }
    return fetch('http://'+ipcim+'/sorozatszures', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
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

  osszes= async() =>
  {
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
 


  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={{flex:1,paddingTop:20,backgroundColor:"#262626",justifyContent:"center",alignItems:"center",paddingBottom:10,}}>
        <View style={{flexDirection:'row'}}>
        <TextInput
        placeholderTextColor="black"
        style={{height: 45,backgroundColor:"#DCDCDC", borderRadius:10, padding:10, width:240,margin:20,marginRight:10, textAlign:"center", }}
        placeholder="Keresés"
        onChangeText={(cim) => this.setState({cim})}
        value={this.state.cim}
        />

        <TouchableOpacity 
          onPress={async ()=>this.kereses()}>
          <View style={{width:85,height:50,backgroundColor:"#2596be", borderRadius:10,padding:5,marginTop:20, height:45,marginRight:20}}>
        
            <Text>Keresés</Text>
          </View>
        </TouchableOpacity>
        </View>
        
        <View style={{height:50, marginBottom:10,flexDirection:'row', }}>

  <TouchableOpacity
      style={{borderWidth:1,borderRadius:10,width:80,height:30,margin:5,width:100, backgroundColor:"#2596be",marginLeft:16}}
      onPress={async ()=>this.osszes()}
      >
    <Text style={{textAlign:"center",fontSize:15,color:"white", paddingTop:3,}}>Összes</Text>
    </TouchableOpacity>

  <FlatList
    data={this.state.dataSource2}
    horizontal
    showsHorizontalScrollIndicator={false}
    style={{marginRight:17, marginLeft:10}}
    renderItem={({item}) => 
    <View style={{alignItems:"center",marginTop:10,flexDirection:'row',marginBottom:19 }}>
    
      <TouchableOpacity
      style={{borderWidth:1,borderRadius:10,width:100,height:27,margin:5,backgroundColor:"#262626", borderColor:"white", }}
      onPress={async ()=>this.kivalaszt(item.mufaj_id)}
      >
      
    
    <Text style={{textAlign:"center",fontSize:15,color:"white", marginTop:1}}>{item.mufaj_nev} </Text>
    </TouchableOpacity>
    </View>

  }
    keyExtractor={({mufaj_id}, index) => mufaj_id}
  />


  </View>      

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={6}
          data={this.state.dataSource}
          keyExtractor={({sorozat_id}) => sorozat_id} 
          renderItem={({item}) =>
          <View>
            <TouchableOpacity onPress={async()=>this.props.navigation.navigate('Sorozatsajat',{sorozatnev:item.sorozat_cim,
            sorozathossz:item.sorozat_hossz,
            sorozatid:item.sorozat_id,
            sorozatleiras:item.sorozat_leiras,
            sorozatev:item.sorozat_ev,
            sorozatido:item.sorozat_hossz,
            sorozatevad:item.sorozat_evadszam,
            sorozatepizod:item.sorozat_epizodszam
            })}>
            <Image 
            source={{uri:'http://'+ipcim+'/'+item.sorozat_kep}}
            style={{width:width*0.14,height:300,marginRight:10,marginTop:10,marginLeft:10,borderRadius:15}}
            />
            <Text style={{color:"white",marginLeft:15,marginTop:5,fontSize:16,fontWeight:"bold",width:155}}>{item.sorozat_cim}</Text>
            <Text style={{color:"white",marginLeft:15,marginTop:5,fontSize:12,width:70,borderWidth:1,borderRadius:5,borderColor:"white",textAlign:"center"}}>{item.mufaj_nev}</Text>
            </TouchableOpacity>
            
          </View>
        }
        />

      </View>

    );
  }
}