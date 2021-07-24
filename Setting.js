import React, { Component } from "react";
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { TopNav, themeColor} from "react-native-rapi-ui";
import { Ionicons } from '@expo/vector-icons'; 
import { Constants, View, Button } from 'react-native-ui-lib';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-picker/picker';
import axios from "axios"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


class Setting extends Component{

  today_tmp = new Date();       //오늘날짜

  state = {
    datePickerVisibility: false,
    selectedDate : `${this.today_tmp.getFullYear()}-${this.today_tmp.getMonth()+1}-${this.today_tmp.getDate()}`, // 기본 날짜는 현재날짜 '2021-7-23' 형태
    selectedTime1 : 1,
    selectedTime2 : 1,
    name : "",
    phone_num : "",
  };

  // Date Picker 관련 함수 아래 3개
  showDatePicker = () => {
    this.setState({datePickerVisibility : true});
  };

  hideDatePicker = () => {
    this.setState({datePickerVisibility : false});
  };
  
  handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    var date_tmp = JSON.stringify(date);
    this.setState({selectedDate : date_tmp.substring(1,11)});

    this.hideDatePicker();
  };

  // State에 있는 name 설정
  setName = (i_name) => {
    this.setState({name: i_name})
  }

  // State에 있는 phone_num 설정
  setPhoneNum = (i_num) => {
    this.setState({phone_num: i_num})
  }

  // 예약정보받고 DB에 있는 예약테이블 업데이트
  insertData = async() =>{

    selectedDate_tmp = this.state.selectedDate,
    selectedTime1_tmp = this.state.selectedTime1,
    selectedTime2_tmp = this.state.selectedTime2,
    name_tmp = this.state.name;
    phone_num_tmp = this.state.phone_num,

    //if (selectedDate_tmp && selectedTime1_tmp && selectedTime2_tmp && name_tmp && phone_num_tmp) {
    await axios.post('http://146.56.170.191/update_res.php', {
      //date와 time_id 로 유저 찾고, name 과 phone_num과 res_ok 업데이트
      name: name_tmp,
      phone_num: phone_num_tmp,
      res_ok: 1,
      date: selectedDate_tmp,
      time_id1: selectedTime1_tmp,
      time_id2 : selectedTime2_tmp
    }, { 
      headers:  {'Content-Type': 'application/json'} 
    }).then(function (response) {
      alert('제출 완료');
      console.log(response);
    })
    .catch(function (error) {
      alert('제출 불가');
      console.log(error.toJSON());
    });
    //}
    
  }

  render(){
    return(
      
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}      // 키보드 올라올떄 뷰들도 같이 올라가는거 방지하기 위한거
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false} flex-1 style={{marginTop:Constants.statusBarHeight}}>

          <Button label="날짜 선택" margin-10 onPress={this.showDatePicker}></Button>
          <DateTimePickerModal
            isVisible={this.state.datePickerVisibility}
            mode="date"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
          />

          <View style={{flex: 0.1, margin: 10}}>

            <Text style={{ marginHorizontal: 10, marginBottom: 5}}>{'시작시간'}</Text>
            
            <Picker style={{}}
              selectedValue={this.state.selectedTime1}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({selectedTime1 : itemValue})
              }>
              <Picker.Item label="10:00 ~ 10:15" value="1" />
              <Picker.Item label="10:15 ~ 10:30" value="2" />
              <Picker.Item label="10:30 ~ 10:45" value="3" />
              <Picker.Item label="10:45 ~ 11:00" value="4" />

              <Picker.Item label="11:00 ~ 11:15" value="5" />
              <Picker.Item label="11:15 ~ 11:30" value="6" />
              <Picker.Item label="11:30 ~ 11:45" value="7" />
              <Picker.Item label="11:45 ~ 12:00" value="8" />

              <Picker.Item label="12:00 ~ 12:15" value="9" />
              <Picker.Item label="12:15 ~ 12:30" value="10" />
              <Picker.Item label="12:30 ~ 12:45" value="11" />
              <Picker.Item label="12:45 ~ 13:00" value="12" />

              <Picker.Item label="13:00 ~ 13:15" value="13" />
              <Picker.Item label="13:15 ~ 13:30" value="14" />
              <Picker.Item label="13:30 ~ 13:45" value="15" />
              <Picker.Item label="13:45 ~ 14:00" value="16" />

              <Picker.Item label="14:00 ~ 14:15" value="17" />
              <Picker.Item label="14:15 ~ 14:30" value="18" />
              <Picker.Item label="14:30 ~ 14:45" value="19" />
              <Picker.Item label="14:45 ~ 15:00" value="20" />

              <Picker.Item label="15:00 ~ 15:15" value="21" />
              <Picker.Item label="15:15 ~ 15:30" value="22" />
              <Picker.Item label="15:30 ~ 15:45" value="23" />
              <Picker.Item label="15:45 ~ 16:00" value="24" />

              <Picker.Item label="16:00 ~ 16:15" value="25" />
              <Picker.Item label="16:15 ~ 16:30" value="26" />
              <Picker.Item label="16:30 ~ 16:45" value="27" />
              <Picker.Item label="16:45 ~ 17:00" value="28" />

              <Picker.Item label="17:00 ~ 17:15" value="29" />
              <Picker.Item label="17:15 ~ 17:30" value="30" />
              <Picker.Item label="17:30 ~ 17:45" value="31" />
              <Picker.Item label="17:45 ~ 18:00" value="32" />

              <Picker.Item label="18:00 ~ 18:15" value="33" />
              <Picker.Item label="18:15 ~ 18:30" value="34" />
              <Picker.Item label="18:30 ~ 18:45" value="35" />
              <Picker.Item label="18:45 ~ 19:00" value="36" />

              <Picker.Item label="19:00 ~ 19:15" value="37" />
              <Picker.Item label="19:15 ~ 19:30" value="38" />
              <Picker.Item label="19:30 ~ 19:45" value="39" />
              <Picker.Item label="19:45 ~ 20:00" value="40" />

            </Picker>
          </View>

          <View style={{flex: 0.1, marginTop: 50, marginLeft: 10, marginBottom: 40, marginRight: 10}}>

            <Text style={{ marginHorizontal: 10, marginBottom: 5}}>{'끝나는시간'}</Text>
            
            <Picker style={{}}
              selectedValue={this.state.selectedTime2}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({selectedTime2 : itemValue})
              }>
              <Picker.Item label="10:00 ~ 10:15" value="1" />
              <Picker.Item label="10:15 ~ 10:30" value="2" />
              <Picker.Item label="10:30 ~ 10:45" value="3" />
              <Picker.Item label="10:45 ~ 11:00" value="4" />

              <Picker.Item label="11:00 ~ 11:15" value="5" />
              <Picker.Item label="11:15 ~ 11:30" value="6" />
              <Picker.Item label="11:30 ~ 11:45" value="7" />
              <Picker.Item label="11:45 ~ 12:00" value="8" />

              <Picker.Item label="12:00 ~ 12:15" value="9" />
              <Picker.Item label="12:15 ~ 12:30" value="10" />
              <Picker.Item label="12:30 ~ 12:45" value="11" />
              <Picker.Item label="12:45 ~ 13:00" value="12" />

              <Picker.Item label="13:00 ~ 13:15" value="13" />
              <Picker.Item label="13:15 ~ 13:30" value="14" />
              <Picker.Item label="13:30 ~ 13:45" value="15" />
              <Picker.Item label="13:45 ~ 14:00" value="16" />

              <Picker.Item label="14:00 ~ 14:15" value="17" />
              <Picker.Item label="14:15 ~ 14:30" value="18" />
              <Picker.Item label="14:30 ~ 14:45" value="19" />
              <Picker.Item label="14:45 ~ 15:00" value="20" />

              <Picker.Item label="15:00 ~ 15:15" value="21" />
              <Picker.Item label="15:15 ~ 15:30" value="22" />
              <Picker.Item label="15:30 ~ 15:45" value="23" />
              <Picker.Item label="15:45 ~ 16:00" value="24" />

              <Picker.Item label="16:00 ~ 16:15" value="25" />
              <Picker.Item label="16:15 ~ 16:30" value="26" />
              <Picker.Item label="16:30 ~ 16:45" value="27" />
              <Picker.Item label="16:45 ~ 17:00" value="28" />

              <Picker.Item label="17:00 ~ 17:15" value="29" />
              <Picker.Item label="17:15 ~ 17:30" value="30" />
              <Picker.Item label="17:30 ~ 17:45" value="31" />
              <Picker.Item label="17:45 ~ 18:00" value="32" />

              <Picker.Item label="18:00 ~ 18:15" value="33" />
              <Picker.Item label="18:15 ~ 18:30" value="34" />
              <Picker.Item label="18:30 ~ 18:45" value="35" />
              <Picker.Item label="18:45 ~ 19:00" value="36" />

              <Picker.Item label="19:00 ~ 19:15" value="37" />
              <Picker.Item label="19:15 ~ 19:30" value="38" />
              <Picker.Item label="19:30 ~ 19:45" value="39" />
              <Picker.Item label="19:45 ~ 20:00" value="40" />

            </Picker>
          </View>

          
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setName(text)}
            placeholder="이름을 입력하세요"
            keyboardType="default"
            autoFocus={false}
          />
          

          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setPhoneNum(text)}
            placeholder="전화번호를 입력하세요"
            keyboardType="numeric"
            autoFocus={false}

          />    

          <Button label="제출" margin-10 marginT-20 onPress={this.insertData}></Button>

          {/* <Text>{this.state.selectedDate}</Text>
          <Text>{this.state.selectedTime1}</Text>
          <Text>{this.state.selectedTime2}</Text>
          <Text>{this.state.name}</Text>
          <Text>{this.state.phone_num}</Text> */}

          {/* <Button label="뒤로가기" margin-10 onPress={ () => this.props.navigation.goBack() }></Button> */}

      </KeyboardAvoidingView>
     
      )
  }
}


const styles = StyleSheet.create({
  input: {
    height : '9%',
    paddingLeft : 10,
    marginTop : 20,
    marginLeft : 12,
    marginRight : 12,
    borderWidth: 2,
    borderColor : '#5847FF',
    borderRadius : 10,
    fontSize : 15
  },
});

export default Setting;
