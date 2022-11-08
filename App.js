import React, { useEffect, useState } from "react";
import { Modal,Button,TextInput, Pressable, FlatList, ScrollView, Text, View,TouchableOpacity } from "react-native";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import RNU from 'react-native-units'
import { Form, FormItem, Picker } from 'react-native-form-component';
import RadioForm from 'react-native-radio-form';
import ToggleSwitch from 'toggle-switch-react-native'
import DatePicker from 'react-native-date-picker'


import styles from './styles/main'

const server = "https://testserver.louisat.repl.co/";
const troncComnmun = ['Français','Histoire Géo','EMC','Enseignement scientifique','Sport']

var nomProp = ''
var prenomProp = ''
var classeProp = ''
var speProp = {}
var langueProp = ''
var optionProp = ''

function sendUser(reload,valR) {
  console.log(server+`users/add?name=${nomProp}&fname=${prenomProp}&classe=${classeProp}&langue=${langueProp}&option=${optionProp}&maths=${speProp.Maths}&physique_chimie=${speProp['Physique-Chimie']}&nsi=${speProp.NSI}&svt=${speProp.SVT}&llce=${speProp.LLCE}&hggsp=${speProp.HGGSP}&ses=${speProp.SES}&hlp=${speProp.HLP}`)
  try{
    
      fetch(server+`users/add?name=${nomProp}&fname=${prenomProp}&classe=${classeProp}&langue=${langueProp}&option=${optionProp}&maths=${speProp.Maths}&physique_chimie=${speProp['Physique-Chimie']}&nsi=${speProp.NSI}&svt=${speProp.SVT}&llce=${speProp.LLCE}&hggsp=${speProp.HGGSP}&ses=${speProp.SES}&hlp=${speProp.HLP}`)
      .then(resp=>resp.json())
      .then((json) => {
        user = json;
        //storeUserStorage(json);
        console.log('Recieved user : ', json)
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
      })
      .finally(() => {reload(!valR)});
       //re render body
      //.catch((error) => console.log(error))
      //.finally(() => {
        //console.log('Final user : ', user)
        //setLoading(false);
      //});
    
  }catch(e) {console.error('ERROR SENDING USER :', e)}
    /*
    /// https://reactnative.dev/docs/asyncstorage ///
      AsyncStorage.setItem(
        'USER',
        JSON.stringify(user),
        () => {
          [callback]
        }
      );
      AsyncStorage.getItem('USER', (err, result) => {
          console.log(result);
      });
    */

}


/*const storeUserStorage = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('USER', jsonValue)
  } catch (e) {
    // saving error
  }
}*/

var user = {
  classe:"1D",
  first_name:"First Name",
  name:"Name",
  spe:{"Maths":true,"HGGSP":false,"HLP":false,"Physique-Chimie":true,"SVT":false,"SES":false,"NSI":true,"LLCE":false},
  langue:"Allemand",
  option:"∅",
  isTeacher:false,
  teacher:{},
  id:"23014af3-dee5-4629-a7c2-96ba40aa12f9"
}



function App () {
  const [valR,reload] = useState(false);
  const [homeworkAdd,setHomeworkAdd] = useState(false);
  const [homeworkVisibility,setHomeworkVisibility] = useState(false);
  const [hwId,setHwId] = useState(false);
  console.log(homeworkAdd)
  return(
  <>
    <PopUp reload={reload} valR={valR}/>
    <HomeworkAddView visible={homeworkAdd} setVisible={setHomeworkAdd} reload={reload} valR={valR} loadHw={setHwId}/>
    <HomeworkView visible={homeworkVisibility} setVisible={setHomeworkVisibility} id={hwId}/>
    <Carousel homeworkAdd={homeworkAdd} setHomeworkAdd={setHomeworkAdd} setHomeworkVisible={setHomeworkVisibility}/>
  </>
  );
}


const HomeworkView = (props) => { // pass hooks : ?visible
  const [loaded,setLoaded] = useState(false);
  if (loaded) {
    return(
      <Modal
          animationType="slide"
          transparent={false}
          visible={props.visible}
          onRequestClose={() => {
            props.setVisible(false);
          }}
          shouldComponentUpdate={()=>{return false;}}
        >
          <ScrollView>
          <View style={styles.centeredView} shouldComponentUpdate={()=>{return false;}}>
            <View style={styles.modalView} shouldComponentUpdate={()=>{return false;}}>
              
            </View>
          </View>
          </ScrollView>
        </Modal>
    );
  }else{
    return(
      <Modal
          animationType="slide"
          transparent={false}
          visible={props.visible}
          onRequestClose={() => {
            props.setVisible(false);
          }}
          shouldComponentUpdate={()=>{return false;}}
        >
          <ScrollView>
          <View style={styles.centeredView} shouldComponentUpdate={()=>{return false;}}>
            <View style={[]} shouldComponentUpdate={()=>{return false;}}>
              <Text>Loading...</Text>
            </View>
          </View>
          </ScrollView>
        </Modal>
    );
  }
}

const HomeworkAddView = (props) => { // pass hooks : ?visible
  const [course,setCourse] = useState("Maths"); // pass default value through props
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [isEval,setIsEval] = useState(false);
  const [isGraded,setIsGraded] = useState(false);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return(
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.setVisible(false);
        }}
        shouldComponentUpdate={()=>{return false;}}
      >
        <ScrollView>
        <View style={styles.centeredView} shouldComponentUpdate={()=>{return false;}}>
          <View style={styles.modalView} shouldComponentUpdate={()=>{return false;}}>
            <Text style={styles.modalTitle} >DEVOIR</Text>
            <Form 
              onButtonPress={() => {
                console.log(server+`homeworks/create?id=${user.id}&classe=${user.classe}&title=${title}&graded=${isGraded}&course=${course}&description=${description}&due_date=${date}`)
                fetch(server+`/homeworks/create?id=${user.id}&classe=${user.classe}&title=${title}&graded=${isGraded}&course=${course}&description=${description}&due_date=${date}`)
                    .then((response) => response.json())
                    .then((json) => {console.log(json);})
                    .catch((error) => console.log(error))
                    .finally(() => {
                      props.setVisible(false);
                      props.reload(!valR);
                    })
                      
              }}
              buttonTextStyle={styles.textStyle}
              buttonStyle={[styles.button, styles.buttonClose]}
              buttonText="Add homework"
              shouldComponentUpdate={()=>{return false;}}
            >
              <View style={{
                display :'flex',
                justifyContent :'flex-start',
                flexDirection:'row',
                marginBottom:10
              }}>
                <ToggleSwitch
                  isOn={isEval}
                  onColor="#6bd152"
                  offColor="#f01411"
                  label="Eval : "
                  labelStyle={{ color: "black", fontWeight: "900" }}
                  size="medium"
                  onToggle={setIsEval}
                />
                <ToggleSwitch
                  isOn={isGraded}
                  onColor="#6bd152"
                  offColor="#f01411"
                  label="Noté : "
                  labelStyle={{ color: "black", fontWeight: "900" }}
                  size="medium"
                  onToggle={setIsGraded}
                />
              </View>
              <FormItem
                textInputStyle={styles.input}
                labelStyle={styles.label}
                label="Titre :"
                isRequired
                value={title}
                onChangeText={setTitle}
              />
              <Picker
                items={[...Object.keys(user.spe).filter((k)=>{if(user.spe[k]){return k}}),...troncComnmun,user.langue,user.option].map(n=>{return({label:n,value:n})})} // [{label,value},...]
                label="Course :"
                isRequired
                selectedValue={course}
                style={styles.input}
                itemStyle={styles.input}
                onSelection={item => setCourse(item.value)}
              />
              
              <FormItem
                textInputStyle={styles.input}
                labelStyle={styles.label}
                label="Description :"
                isRequired
                value={description}
                onChangeText={setDescription}
                textArea={true}
              />
              <FormItem
                textInputStyle={styles.input}
                labelStyle={styles.label}
                label="Date :"
                isRequired
                value={date}
                onChangeText={setDate}
              />
            </Form>
            <TouchableOpacity activeOpacity={0.7} style={styles.touchableCancelButton} onPress={() => {props.setVisible(false)}}>
              <Text style={{fontSize:14*1,color:'#f01411',lineHeight:48/3,alignSelf:'center',}}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </Modal>
  );
}
/*
              
              
              
              
*/



const LoginName = () => {
  const [nom,setNom] = useState("");
  const [prenom,setPrenom] = useState("");
  nomProp = nom;
  prenomProp = prenom;
  console.log(nom,prenom)
  return(
    <>
      <FormItem
        textInputStyle={styles.input}
        labelStyle={styles.label}
        label="Nom :"
        isRequired
        value={nom}
        onChangeText={setNom}
      />
      <FormItem
        textInputStyle={styles.input}
        labelStyle={styles.label}
        label="Prenom :"
        isRequired
        value={prenom}
        onChangeText={setPrenom}
      />
    </>
  );
}
const LoginClasse = () => {
  const [classe,setClasse] = useState('1D');
  classeProp = classe;
  console.log(classe)
  return(
  <>
    <Picker
      items={[
        { label: '1D', value: '1D' },
      ]}
      label="Classe :"
      isRequired
      selectedValue={classe}
      style={styles.input}
      itemStyle={styles.input}
      onSelection={item => setClasse(item.value)}
    />
    
  </>);
}
const LoginSpe = () => { // must pass to higher scope to send
  const [spe,setSpe] = useState({
    'Maths':false,
    'HGGSP':false,
    'HLP':false,
    'Physique-Chimie':false,
    'SVT':false,
    'SES':false,
    'NSI':false,
    'LLCE':false,
  });
  speProp = spe;
  console.log(spe)
  return(
  <><Text style={{fontSize:14,fontWeight:'bold'}}>Sélectionnez vos spécialités : </Text>
    <View style={styles.CheckBoxContainer}>
    
      <CheckBox
        style={styles.checkbox}
        value={spe['Maths']}
        onValueChange={(newValue) => setSpe(spe => ({...spe,...{'Maths':newValue}}))}
      />
      <Text>Maths</Text>
    </View>
    <View style={styles.CheckBoxContainer}>
      <CheckBox
        style={styles.checkbox}
        value={spe['HGGSP']}
        onValueChange={(newValue) => setSpe(spe => ({...spe,...{'HGGSP':newValue}}))}
      />
      <Text>HGGSP</Text>
    </View>
    <View style={styles.CheckBoxContainer}>
      <CheckBox
        style={styles.checkbox}
        value={spe['HLP']}
        onValueChange={(newValue) => setSpe(spe => ({...spe,...{'HLP':newValue}}))}
      />
      <Text>HLP</Text>
    </View>
    <View style={styles.CheckBoxContainer}>
      <CheckBox
        style={styles.checkbox}
        value={spe['Physique-Chimie']}
        onValueChange={(newValue) => setSpe(spe => ({...spe,...{'Physique-Chimie':newValue}}))}
      />
      <Text>Physique-Chimie</Text>
    </View>
    <View style={styles.CheckBoxContainer}>
      <CheckBox
        style={styles.checkbox}
        value={spe['SVT']}
        onValueChange={(newValue) => setSpe(spe => ({...spe,...{'SVT':newValue}}))}
      />
      <Text>SVT</Text>
    </View>
    <View style={styles.CheckBoxContainer}>
      <CheckBox
        style={styles.checkbox}
        value={spe['NSI']}
        onValueChange={(newValue) => setSpe(spe => ({...spe,...{'NSI':newValue}}))}
      />
      <Text>NSI</Text>
    </View>
    <View style={styles.CheckBoxContainer}>
      <CheckBox
        style={styles.checkbox}
        value={spe['SES']}
        onValueChange={(newValue) => setSpe(spe => ({...spe,...{'SES':newValue}}))}
      />
      <Text>SES</Text>
    </View>
    <View style={styles.CheckBoxContainer}>
      <CheckBox
        style={styles.checkbox}
        value={spe['LLCE']}
        onValueChange={(newValue) => setSpe(spe => ({...spe,...{'LLCE':newValue}}))}
      />
      <Text>LLCE</Text>
    </View>
  </>);
}
const LoginOpt = () => {
  const mockData = [
    {value: 'Latin'},
    {value: 'Nissart'},
    {value: 'Espagnol Lv3'},
    {value: 'Maths Spécifiques'},
    {value: '∅'} 
  ];
  const [opt,setOpt] = useState({
    'Latin':false,
    'Nissart':false,
    'Espagnol Lv3':false,
    'Maths Spécifiques':false,
    '∅':true,
  });
  optionProp = (Object.keys(opt).filter((k)=>{if(opt[k]){return k}}))[0];
  var modif = Object.create({});
  return(
  <View style={{height:RNU.vh(28)}}>
    <Text style={{fontSize:14,fontWeight:'bold'}}>Sélectionnez votre option :</Text>
    <RadioForm
              style={{ width: RNU.vw(60),padding:0,margin:0}}
              dataSource={mockData}
              itemShowKey="value"
              itemRealKey="value"
              circleSize={14}
              initial={1}
              formHorizontal={false}
              labelHorizontal={true}
              onPress={(newValue) => {
                modif[newValue.value]={}
                Object.keys(opt).forEach(v => modif[v] = false),
                modif[newValue.value]=true
                setOpt(modif);
                console.log(modif)
              }}
    />
  </View>);
}
const LoginLang = (props) => {
  const [lang,setLang] = useState({
    'Allemand':false,
    'Espagnol':false,
    'Italien':false,
    'Italien Européenne':false,
  });
  langueProp = (Object.keys(lang).filter((k)=>{if(lang[k]){return k}}))[0];
  const mockData = [
    {value: 'Allemand'},
    {value: 'Espagnol'},
    {value: 'Italien'},
    {value: 'Italien Européenne'},
  ];
  var modif = Object.create({});
  return(
  <View style={{height:RNU.vh(25)}}>
    <Text style={{fontSize:14,fontWeight:'bold'}}>Sélectionnez votre LV2 :</Text>
    <RadioForm
              style={{ width: RNU.vw(60),padding:0,margin:0}}
              dataSource={mockData}
              itemShowKey="value"
              itemRealKey="value"
              circleSize={14}
              initial={1}
              formHorizontal={false}
              labelHorizontal={true}
              onPress={(newValue) => {
                modif[newValue.value]={}
                Object.keys(lang).forEach(v => modif[v] = false),
                modif[newValue.value]=true
                setLang(modif);
                console.log(modif)
              }}
    />
  </View>);
}

const ContentModalForm = (props) => {
  if (props.content == 1){return(<LoginName/>)}
  else if (props.content == 2){return(<LoginClasse/>)}
  else if (props.content == 3){return(<LoginSpe/>)}
  else if (props.content == 4){return(<LoginOpt/>)}
  else if (props.content == 5){return(<LoginLang reload={props.reload} valR={props.valR}/>)}
}

const PopUp = (props) => {
  const Pop = (props) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.Setvisible(false);
        }}
        shouldComponentUpdate={()=>{return false;}}
      >
        <View style={styles.centeredView} shouldComponentUpdate={()=>{return false;}}>
          <View style={styles.modalView} shouldComponentUpdate={()=>{return false;}}>
            <Text style={styles.modalTitle} >LOGIN</Text>
            <Form 
              onButtonPress={() => {
                props.Setvisible(false);
                props.NextSetvisible(true);
                if(props.content>=5){
                  console.log("Callback !!")
                  props.callback(props.reload,props.valR)
                };
              }}
              buttonTextStyle={styles.textStyle}
              buttonStyle={[styles.button, styles.buttonClose]}
              buttonText="Next"
              shouldComponentUpdate={()=>{return false;}}
            >
              <ContentModalForm content = {props.content} reload={props.reload} valR={props.valR}/>
            </Form>
            <View style={styles.progressbar}>
              <View style={props.content<1?styles.dotG:styles.dot}/>
              <View style={props.content<2?styles.lineG:styles.line}/>
              <View style={props.content<2?styles.dotG:styles.dot}/>
              <View style={props.content<3?styles.lineG:styles.line}/>
              <View style={props.content<3?styles.dotG:styles.dot}/>
              <View style={props.content<4?styles.lineG:styles.line}/>
              <View style={props.content<4?styles.dotG:styles.dot}/>
              <View style={props.content<5?styles.lineG:styles.line}/>
              <View style={props.content<5?styles.dotG:styles.dot}/>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  try {
    /*const jsonValue = await AsyncStorage.getItem('USER')
    
    console.log("LOCAL USER",jsonValue, 'condition : ',jsonValue==null || jsonValue==undefined)*/
    if(true){ // check if registered
        const [modal1Visible, setModal1Visible] = useState(true);
        const [modal2Visible, setModal2Visible] = useState(false);
        const [modal3Visible, setModal3Visible] = useState(false);
        const [modal4Visible, setModal4Visible] = useState(false);
        const [modal5Visible, setModal5Visible] = useState(false);
        const [empty, setEmpty] = useState(false);
  
      return(
        <>
            <Pop visible={modal1Visible} Setvisible={setModal1Visible} NextSetvisible={setModal2Visible} content={1}/>
            <Pop visible={modal2Visible} Setvisible={setModal2Visible} NextSetvisible={setModal3Visible} content={2}/>
            <Pop visible={modal3Visible} Setvisible={setModal3Visible} NextSetvisible={setModal4Visible} content={3}/>
            <Pop visible={modal4Visible} Setvisible={setModal4Visible} NextSetvisible={setModal5Visible} content={4}/>
            <Pop visible={modal5Visible} Setvisible={setModal5Visible} NextSetvisible={setEmpty} content={5} callback={sendUser} reload={props.reload} valR={props.valR}/>
        </>
      )
    }
    else{
      return(<></>)
    }
  } catch(error) {
    console.log('Error popup : ' + error.message);
    
  }

}



const GetDay = () => {
  const week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  const date = new Date();
  const today = week[date.getDay()];
  return {
    day : today, 
    time : date.getHours()*100+date.getMinutes() //hhmm
  };
}
const aOrb = () => {
  Date.prototype.getWeek = function() { //stolen from gh
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  }
  return (new Date()).getWeek()%2!=0 ? 'a' : 'b'
}
function Carousel (props) {
  const [dataCourses, setDataCourses] = useState({})
  const [loading, setLoading] = useState(true)
  const today = GetDay();
  useEffect(() => {
    fetch(server+`edt/getToday?day=${today.day}&time=${today.time}&classe=${user.classe}`)
      .then((response) => response.json())
      .then((json) => {setDataCourses(json);})
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const chooseCourse = (courses) => {
    var chosen = ''
    if(courses[0].a || courses[0].b){
      chosen = courses[0][aOrb()]
    }else{
      courses.forEach(i => {
        const courseList = [...Object.keys(user.spe).filter((k)=>{if(user.spe[k]){return k}}),...troncComnmun,user.langue,user.option]
        for(var cours of courseList){
          if(cours==i){
            chosen = i;
          }
        }
      })
    }
    return chosen
  }

  try{return(
    <>
      {loading ? <Text>Loading...</Text> : (
        <ScrollView
          horizontal= {true}
          decelerationRate={0.9}
          snapToInterval={RNU.vw(100)} //your element width
          snapToAlignment={"center"}
          contentOffset={{x:dataCourses.offset * RNU.vw(100),y:0}}>
            {
              dataCourses.courses.map((course) => {
                //return(<Text key={course.start.h+course.start.m}>{course.course[0]}</Text>) // create element to process data
                return(
                  <Main 
                    homeworkAdd = {props.homeworkAdd}
                    setHomeworkAdd = {props.setHomeworkAdd}
                    key = {course.start.h+course.start.m}
                    course = {chooseCourse(course.course)}
                    start = {course.start.h+"h"+course.start.m}
                    stop = {course.stop.h+"h"+course.stop.m}
                    classe = {course.class[chooseCourse(course.course)]}
                    setHomeworkVisible = {props.setHomeworkVisible}
                  />) ////// not [0], have to choose from spes ////////
              })
            }
        </ScrollView>
      )}
    </>
  );
  }catch (e){
    console.log(e);
    return(<Text>It seems like we encoutered an error :/ ...</Text>)
  }
}
function Main (props)  {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const Hw = () => {
    try{return(Object.values(data).map((item) => <Homework item={item} setHomeworkVisible={props.setHomeworkVisible} key={item.id}/>))}catch{return}
  }

  useEffect(() => {
    console.log("fetching from ",server+`homeworks/get?classe=${user.classe}&course=${props.course}`)
    fetch(server+`homeworks/get?classe=${user.classe}&course=${props.course}`)
      .then((response) => response.json())
      .then((json) => {console.log(json);return(setData(json));})
      .catch((error) => console.log(error))
      .finally(() => {setLoading(false)});
  }, []);
  if(props.course!=''){return(
          <View style={styles.main}>
            {isLoading ? <Text>Loading...</Text> : (
              <>
                <ScrollView>
                    <LinearGradient colors={['#f02432', '#f02468',  '#f02468']} style={styles.container}>
                      <View style={styles.top}>
                        <View style={styles.flexelement}>
                          <Text style={styles.textHour}>{props.start}</Text>
                        </View>
                        <View style={styles.flexelement}>
                          <Text style={styles.textHour}>⟶</Text>
                        </View>
                        <View style={styles.flexelement}>
                          <Text style={styles.textHour}>{props.stop}</Text>
                        </View>
                      </View>
                      <LinearGradient colors={['#f02432', '#f0245a']} style={styles.mid}>
                        <View>
                          <View style={styles.title}>
                            <Text style={{color: 'white',fontFamily: 'sans-serif',fontSize:14*4,}}>{props.course}</Text>
                          </View>
                          <View style={styles.classe}>
                            <Text style={{fontSize:1.1*14,fontWeight:'bold'}}>{props.classe}</Text>
                          </View>
                        </View>
                      </LinearGradient>
                      <View style={styles.bottom}>
                        <View style={styles.subTitles}><Text>Devoirs :</Text></View>
                        <ScrollView horizontal={true} style={[styles.scrollerH,]}>
                          <Hw setHomeworkVisible={props.setHomeworkVisible}/>
                        </ScrollView>
                        <View style={styles.subTitles}><Text>Documents :</Text></View>
                        <ScrollView style={{width: RNU.vw(100),position:'relative',left:-30,}}>
                          <View style={[styles.scrollerV,{marginLeft:30}]}>
                            <Documents />
                            <Documents />
                            <Documents />
                            <Documents />
                            <Documents />
                            <Documents />
                          </View>
                        </ScrollView>
                      </View>
                      

                    </LinearGradient>
                  </ScrollView>
                  <View style={styles.centerBtn}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.touchableOpacityStyle} onPress={() => {props.setHomeworkAdd(!props.homeworkAdd)}}>
                          <Text style={{fontSize:14*3,color:'white',lineHeight:48,alignSelf:'center',}}>+</Text>
                        </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
  );}else{return(<></>)}
}
function Graded(props) {
  const isGraded = props.graded == "true";
  if (isGraded) {
    return(
      <View style={styles.graded}></View>
    );
  }
  return;
}
function Homework(props) {
  console.log(props.item.id);
  return(
  <TouchableOpacity  activeOpacity={0.9} style={[]} onPress={() => {props.setHomeworkVisible(true)}}>
    <View style={styles.HWcontainer} key={props.item.id}>
      <View >
        <Text style={styles.titleHW}>{props.item["title"]}</Text>
      </View>
      <View style={styles.bottomCard}>
        <View>
          <Text style={styles.dueDate}>{props.item["due_date"]}</Text>
        </View>
        <Graded graded={props.item["graded"]}/>
      </View>
    </View>
  </TouchableOpacity>
)};
const Documents = () => (
  <View style={styles.DocContainer}>
    
  </View>
);


export default App;