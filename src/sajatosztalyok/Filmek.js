import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Image,TouchableOpacity,TextInput,StyleSheet,Modal,Pressable,ScrollView } from 'react-native-web';
import Iframe from 'react-iframe';






const ipcim="localhost:8080";

export default class Sorozat extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      cim:'',
      modalVisible:false,
      filmid:0,
      dataSource4:[],
      filmcim:"",
      korabbi:[],
      komment:"",
      nev:"",
      starCount:0,
      dataSource3:[],
      

      
    }
  }

  setModalVisible = (id,cim) => {
    this.setState({
      filmid: id,
      modalVisible:true,
      filmcim:cim,
    })

    let bemenet = {
      bevitel1:id
    }

    fetch('http://'+ipcim+'/filmlink', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource4: responseJson,
        }, function(){
 
        });
 
      })
      .catch((error) =>{
        console.error();
      });

      let bemenet1 = {
        bevitel3:id
      }
      fetch('http://'+ipcim+'/filmkommentek', {
        method: "POST",
        body: JSON.stringify(bemenet1),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        } )
        .then((response) => response.json())
        .then((responseJson) => {
    
          this.setState({
            isLoading: false,
            dataSource3: responseJson,
          }, function(){
    
          });
        })
        .catch((error) =>{
          console.error(error);
        });

        fetch('http://'+ipcim+'/filmsajatadatok', {
        method: "POST",
        body: JSON.stringify(bemenet1),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        } )
        .then((response) => response.json())
        .then((responseJson) => {
    
          this.setState({
            isLoading: false,
            dataSource5: responseJson,
          }, function(){
    
          });
        })
        .catch((error) =>{
          console.error(error);
        });
        let bemenet2 ={
          bevitel4:id
        }
        fetch('http://'+ipcim+'/filmlike', {
          method: "POST",
          body: JSON.stringify(bemenet2),
          headers: {"Content-type": "application/json; charset=UTF-8"}
          } )
          .then((response) => response.json())
          .then((responseJson) => {
      
            this.setState({
              isLoading: false,
              dataSource10: responseJson,
            }, function(){
      
            });
          })
          .catch((error) =>{
            console.error(error);
          });
        
          let bemenet3 ={
            bevitel4:id
          }
          fetch('http://'+ipcim+'/filmdislike', {
            method: "POST",
            body: JSON.stringify(bemenet2),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            } )
            .then((response) => response.json())
            .then((responseJson) => {
        
              this.setState({
                isLoading: false,
                dataSource11: responseJson,
              }, function(){
        
              });
            })
            .catch((error) =>{
              console.error(error);
            });
          

  }
  

  
  componentDidMount(){
    document.body.style.backgroundColor = "#262626";

   
     fetch('http://'+ipcim+'/filmek')
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

      fetch('http://'+ipcim+'/mufajok')
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

 
  

  felvitel = ()=> {
    let bemenet={
      bevitel1:this.state.nev,
      bevitel2:this.state.komment,
      bevitel3:this.state.filmid

    }
    let bemenet1 = {
      bevitel3:this.state.filmid
    }
    fetch('http://'+ipcim+'/filmkommentfelvitel', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.text())
      .then(() => {
        fetch('http://'+ipcim+'/filmkommentek', {
          method: "POST",
          body: JSON.stringify(bemenet1),
          headers: {"Content-type": "application/json; charset=UTF-8"}
          } )
          .then((response) => response.json())
          .then((responseJson) => {
      
            this.setState({
              isLoading: false,
              dataSource3: responseJson,
            }, function(){
      
            });
          })
          .catch((error) =>{
            console.error(error);
          });
        
  
      })
      .catch((error) =>{
        console.error(error);
      });

      this.setState({komment:""})
      this.setState({nev:""})

     
  
     
    }

  

    kereses=async () =>{
    //alert(this.state.cim)
    let bemenet ={
      bevitel1:this.state.cim,


    }
    fetch('http://'+ipcim+'/filmkereses', {
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
   tetszik = ()=>{
    let bemenet1 ={
      bevitel4:this.state.filmid
    }
     let bemenet ={
       bevitel4:this.state.filmid
     }
    fetch('http://'+ipcim+'/filmlikefelvitel', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.json())
      .then(() => {
        fetch('http://'+ipcim+'/filmlike', {
          method: "POST",
          body: JSON.stringify(bemenet1),
          headers: {"Content-type": "application/json; charset=UTF-8"}
          } )
          .then((response) => response.json())
          .then((responseJson) => {
      
            this.setState({
              isLoading: false,
              dataSource10: responseJson,
            }, function(){
      
            });
          })
          .catch((error) =>{
            console.error(error);
          });
        
      })
      .catch((error) =>{
        console.error(error);
      });

      
   }
   nemtetszik = ()=>{
     let bemenet1={
       bevitel4:this.state.filmid
     }
    let bemenet ={
      bevitel5:this.state.filmid
    }
   fetch('http://'+ipcim+'/filmdislikefelvitel', {
     method: "POST",
     body: JSON.stringify(bemenet),
     headers: {"Content-type": "application/json; charset=UTF-8"}
     } )
     .then((response) => response.json())
     .then(() => {

      fetch('http://'+ipcim+'/filmdislike', {
        method: "POST",
        body: JSON.stringify(bemenet1),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        } )
        .then((response) => response.json())
        .then((responseJson) => {
    
          this.setState({
            isLoading: false,
            dataSource11: responseJson,
          }, function(){
    
          });
        })
        .catch((error) =>{
          console.error(error);
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
    return fetch('http://'+ipcim+'/filmszures', {
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
    fetch('http://'+ipcim+'/filmek')
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
        style={{height: 35,backgroundColor:"#DCDCDC", borderRadius:10, padding:10, width:240,margin:20,marginRight:10, textAlign:"center", }}
        placeholder="Keresés"
        onChangeText={(cim) => this.setState({cim})}
        value={this.state.cim}
        />

        <TouchableOpacity 
          onPress={async ()=>this.kereses()}>
          <View style={{width:85,height:35,backgroundColor:"#2596be", borderRadius:10,padding:5,marginTop:20, marginRight:20}}>
        
            <Text style={{textAlign:"center",paddingTop:3}}>Keresés</Text>
          </View>
        </TouchableOpacity>
        </View>
        
        <View style={{height:50, marginBottom:10,flexDirection:'row', }}>

  <TouchableOpacity
      style={{borderWidth:1,borderRadius:10,height:30,margin:5,width:100,marginTop:13, backgroundColor:"#2596be",marginLeft:16}}
      onPress={async ()=>this.osszes()}
      >
    <Text style={{textAlign:"center",fontSize:15,color:"white", paddingTop:3,}}>Összes</Text>
    </TouchableOpacity>

    <ScrollView
     horizontal={true}
     showsHorizontalScrollIndicator={true}
     style={{height:60}}>
  <FlatList
    data={this.state.dataSource2}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{flex:1,flexDirection : "row", flexWrap : "wrap", justifyContent:'center', alignItems:'center',}} 
    style={{marginRight:17, marginLeft:10}} 
    renderItem={({item}) => 
   
    <View style={{alignItems:"center",marginTop:11,flexDirection:'row',marginBottom:19,flex:1,flexWrap:"wrap" }}>
    
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
  </ScrollView>

  </View>      

        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.dataSource}
          keyExtractor={({film_id}) => film_id} 
          contentContainerStyle={{flex:1,flexDirection : "row", flexWrap : "wrap", justifyContent:'center', alignItems:'center',}} 
          renderItem={({item}) =>
          <View style={{flex:1, alignItems:'center', textAlign:'center', justifyContent:'center'}} >
            <TouchableOpacity onPress={async()=>this.setModalVisible(item.film_id,item.film_cim)}>
            <Image 
            source={{uri:'http://'+ipcim+'/'+item.film_kep}}
            style={{width:200,height:280,marginRight:10,marginTop:10,marginLeft:10,borderRadius:15}}
            />
            <Text style={{color:"white",marginLeft:15,marginTop:5,fontSize:16,fontWeight:"bold",width:180,height:40}}>{item.film_cim}</Text>
            </TouchableOpacity>
            
            
          </View>
        }
        />
        
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
          >
            
              <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <Pressable
                  style={styles.button}
                  onPress={() => this.setState({modalVisible : false})}
                >
                  <Text style={styles.textStyle}>X</Text>
                  
                </Pressable>
                
               <View style={styles.modalView}>
                <View style={{alignItems:"center",justifyContent:"center"}}>
                <FlatList
                data={this.state.dataSource4}
                keyExtractor={({film_id}) => film_id}
                
                renderItem={({item}) => 

                <View>
                  {item.sorozat_link === "" ? <Text>Nincs link</Text>:
                  <Iframe
                  url ={item.film_link}
                  width="850px"
                  height="450px"
                  id="MyId"
                  className="MyClassName"
                  display = "initial"
                  position = "relative"
                  />
                }
                </View>
              }
              />
              
              </View>
              <View style={{flexDirection:"row",padding:10,justifyContent:"flex-end"}}>
                 <View>
                  <TouchableOpacity
                  onPress={()=>this.tetszik()}
                  style={{borderWidth:1,bordercolor:"grey",backgroundColor:"green", borderRadius:100, width:70}}
                  >
                    <Text style={{color:"white",padding:6, textAlign: "center"}}>Tetszik</Text>
                  </TouchableOpacity>
                   <FlatList
                   data={this.state.dataSource10}
                   keyExtractor={({film_id}) => film_id} 
                   renderItem={({item}) =>
                   <View style={{textAlign:'center'}}>
                   <Text style={{fontSize:16,color:"white", }}>{item.film_like}</Text>
                  </View>
                    }
                   />
                 </View>
                 <View>
                 <TouchableOpacity
                 onPress={()=>this.nemtetszik()}
                 style={{borderWidth:1,bordercolor:"grey",backgroundColor:"red",width:100, borderRadius:100,justifyContent:"center"}}
                 >
                 <Text style={{color:"white",textAlign: "center", padding:5, paddingBottom:8}}>Nem tetszik</Text>
                  </TouchableOpacity>
                  <FlatList
                   data={this.state.dataSource11}
                   keyExtractor={({film_komment_id}) => film_komment_id} 
                   renderItem={({item}) =>
                   <View style={{textAlign:'center'}}>
                   <Text style={{fontSize:16,color:"white", }}>{item.film_dislike}</Text>
                  </View>
                    }
                   />
                 </View>
                 </View>
              
              <View style={styles.infok}>
                <Text style={{color:"white",fontSize:25,textAlign:"center"}}>{this.state.filmcim}</Text>
                <FlatList
                data={this.state.dataSource5}
                keyExtractor={({film_komment_id}) => film_komment_id} 
                renderItem={({item}) =>
            <View style={{margin:10}} >
              <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold"}}>Leírás:</Text>
            <Text style={{fontSize:15,color:"white",padding:2}}>{item.film_leiras}</Text>
            <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold",marginTop:2}}>További infók:</Text>
            <Text>
              <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Műfaj: </Text>
              <Text style={{fontSize:16,color:"white"}}>{item.mufaj_nev}</Text>
            </Text>
            <Text>
              <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Megjelenés dátuma: </Text>
              <Text style={{fontSize:16,color:"white"}}>{item.film_ev}</Text>
            </Text>
            <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold",marginTop:2}}>Kommentek:</Text>
              
              
            </View>
          }
          />
          <TextInput
          style={{borderWidth:1,padding:5,marginBottom:10,color:"black",backgroundColor:"lightgrey",borderRadius:15,borderColor:"transparent",width:100,marginLeft:30}}
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
          multiline={true}
          placeholder='Név'
        />

        <TextInput
          style={{borderWidth:1,padding:5,marginBottom:10,color:"black",backgroundColor:"lightgrey",borderRadius:15,borderColor:"transparent",width:300,height:50,marginLeft:30}}
          onChangeText={(komment) => this.setState({komment})}
          value={this.state.komment}
          multiline={true}
          placeholder='Hozzászólás irása'
        />
        
        {this.state.nev === "" || this.state.komment === "" ?
         <TouchableOpacity 
         style={{borderWidth:1,width:200,alignSelf:"center",borderColor:"transparent",borderRadius:6,padding:2,backgroundColor:"grey",marginBottom:10}}
         >
           
           <Text style={{textAlign:"center",fontSize:19,color:"white"}}>Az egyik mezőt üresen hagytad</Text>
         </TouchableOpacity>
        :
        <TouchableOpacity 
        style={{borderWidth:1,width:100,alignSelf:"center",borderColor:"transparent",borderRadius:6,padding:2,backgroundColor:"grey",marginBottom:10}}
        onPress={()=> this.felvitel()}
        >
          
          <Text style={{textAlign:"center",fontSize:19,color:"white"}}>Mehet</Text>
        </TouchableOpacity>
        }

        {this.state.dataSource3.length === 0 ? <Text style={{color:"white",fontSize:22,textAlign:"center"}}>Ehhez a filmhez még nincsenek kommentek</Text> :<FlatList
          data={this.state.dataSource3}
          keyExtractor={({film_komment_id}) => film_komment_id} 
          renderItem={({item}) =>
          <View style={{borderWidth:1,alignSelf: 'flex-start',borderColor:"transparent",borderRadius:10,padding:8,backgroundColor:"lightgrey",margin:7,marginLeft:15}}>
            <Text style={{color:"black",fontWeight:"bold",fontSize:15}}>{item.film_komment_nev}</Text>
            <Text style={{fontSize:17}}>{item.film_komment_szoveg}</Text>
            
          </View>
        }
        />
        }
                </View>
              </View>
              </ScrollView>
          </Modal>
        
        </View>
      
      


    );
  }
}
const styles = StyleSheet.create({
  modalView: {
    borderRadius:5,
    backgroundColor:"#181818",
    margin:20,
    width:850,
    flex:1,
    alignSelf:"center",
  },

  infok:{
    padding:30,
  },

  button: {
    padding:10,
    backgroundColor:"#2596be",
    width:40,
    height:40,
    margin:8,
    borderRadius:50
    
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "center",
  }
});