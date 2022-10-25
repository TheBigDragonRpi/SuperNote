import { StyleSheet } from 'react-native';
import RNU from 'react-native-units'

export default StyleSheet.create({
  checkbox :{
    margin :8,
  },
  CheckBoxContainer:{
    display :'flex',
    flexDirection :'row',
    alignItems :'center',
  },
  progressbar :{
    display :'flex',
    flexDirection :'row',
    alignItems :'center',
    justifyContent :'center',
  },
  dot:{
    width:10,
    height:10,
    backgroundColor :'#5285e8',
    borderRadius:5,
  },
  line:{
    width:(RNU.vw(15))-15,
    height:3,
    backgroundColor :'#5285e8',
  },
  dotG:{
    width:10,
    height:10,
    backgroundColor :'#909090',
    borderRadius:5,
  },
  lineG:{
    width:(RNU.vw(15))-15,
    height:3,
    backgroundColor: '#909090',
  },
  input:{
    borderColor:'#e3e3e3',
    borderRadius:12,
    borderWidth:1,
    width: RNU.vw(80),
    paddingLeft:12
  },
  label:{
    marginLeft:10,
  },
  centeredView :{
    flex :1,
    justifyContent :"center",
    alignItems :"center",
    marginTop :22
  },
  modalView :{
    width: RNU.vw(80),
    margin: 20,
    backgroundColor :'white',
    borderRadius :20,
    padding :35,
    alignItems :'center',
    shadowColor: '#2a2a2a',
    shadowOffset :{
      width :0,
      height :4,
    },
    shadowOpacity :0.010,
    shadowRadius :16,
    elevation :16
  },
  button :{
    borderRadius: 20,
    padding :10,
    elevation: 2
  },
  buttonClose :{
    width :RNU.vw(70),
    backgroundColor :'#3C3C3C',
  },
  textStyle :{
    color :'white',
    fontWeight :'bold',
    textAlign :'center'
  },
  modalTitle :{
    marginBottom :15,
    fontSize:40,
    fontWeight :'800',
    textAlign :'center',
    marginBottom:10,
  },
  modalText :{
    color:'#3d3d3d',
    marginBottom :15,
    textAlign :'left',
    alignSelf :'flex-start'
  },
    main :{
        width:RNU.vw(100),
    },
    container :{
        flex :1,
        backgroundColor :'#f02432',
        alignItems :'center',
        fontFamily :'sans-serif',
      },
      centerBtn :{
        width: RNU.vw(100),
        height:48,
        position :'absolute',
        bottom:14,
        display :'flex',
        justifyContent :'center',
        alignItems :'center',
      },
      touchableOpacityStyle :{
        width :48,
        height :48,
        alignItems :'center',
        justifyContent: 'center',
        backgroundColor:'#22343b',
        borderRadius:48,
        display :'flex',
        shadowColor :"#000",
        shadowOpacity :0.48,
        shadowRadius :11.95,
        elevation :10,
      },
      DocContainer:{
        width:150,
        height:250,
        margin:8,
        borderRadius:16,
        overflow:'hidden',
        backgroundColor:'white',
      },
      subTitles :{
        fontSize:'2em',
        fontFamily :'sans-serif',
        marginTop:20
      },
      top :{
        display :'flex',
        justifyContent :'center',
        flexDirection:'row',
      },
      textHour :{
        marginTop:30,
        fontSize :32,
        color:'#01040d',
        fontWeight:'normal',
      },
      flexelement :{
        width:90,
        textAlign :'center',
        alignItems :'center',
        marginTop:10,
        fontSize :40,
      },
      mid :{
        display :'flex',
        height :RNU.vh(61),
        width :RNU.vw(100),
        justifyContent :'center',
        textAlign:'center',
        alignItems :'center',
        justifyContent :'center',
        flexDirection:'row',
      },
      title :{
        marginLeft:60,
        marginRight:60,
      },
      classe :{
        alignSelf:'flex-end',
        fontFamily :'sans-serif',
        fontWeight:'bold',
        color:'#01040d',
      },
      bottom :{
        minHeight:'90%',
        width:"100%",
        backgroundColor:'#f6f7fb',
        borderRadius:30,
        padding:30,
        shadowColor: "#000",
        shadowOffset :{
          width :0,
          height: 20,
        },
        shadowOpacity: 0.88,
        shadowRadius :26.00,
    
        elevation :24,
      },
      scrollerH :{
        position :'relative',
        left:-30,
        width:RNU.vw(100),
        maxHeight:80,
        marginTop:16,
        marginBottom:16,
      },
      scrollerV :{
        position :'relative',
        left:-30,
        width:RNU.vw(100),
        marginTop:16,
        marginBottom:16,
        display :'flex',
        flexWrap:'wrap',
        overflow:'scroll',
        flexDirection:'row',
        alignContent :'flex-start',
        justifyContent :'center',
      },
      bottomCard :{
        display :'flex',
        alignItems :'flex-start',
        justifyContent :'space-between',
        flexDirection:'row',
        flexWrap:'nowrap',
        width :'100%',
    
      },
      graded :{
        width:10,
        height:10,
        borderRadius:14,
        backgroundColor:'red',
        alignSelf:'flex-end',
        shadowColor: "#f00",
        shadowOffset :{
          width :0,
          height: 2,
        },
        shadowOpacity :0.25,
        shadowRadius :3.84,
    
        elevation :5,
      },
      titleHW:{
        fontSize:'1.5em',
      },
      dueDate :{
        fontSize:16,
      },
      HWcontainer:{
        margin:8,
        alignSelf :'flex-start',
        width:130,
        borderRadius:12,
        backgroundColor:'#fefefe',
        padding:10,
        color:'black',
        shadowColor :"#ccc",
        shadowOpacity :0.08,
        shadowRadius :20,
        elevation :3,
      }
    }
);
