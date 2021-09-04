import React, { Component } from "react";
import { StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Constants, View, Button } from 'react-native-ui-lib';
import axios from "axios"


class Setting extends Component{

  today_tmp = new Date();       //오늘날짜

  state = {
    todayDate : `${this.today_tmp.getFullYear()}-${this.today_tmp.getMonth()+1}-${this.today_tmp.getDate()}`, // 기본 날짜는 현재날짜 '2021-7-23' 형태
    notice_msg : "",
  };

  // State에 있는 메시지 설정
  setMsg = (i_msg) => {
    this.setState({notice_msg: i_msg})
  }


  // 공지내용받고 DB에 있는 공지테이블에 오늘날짜와 함꼐 입력하기
  insertData = async() =>{

    date_tmp = this.state.todayDate;
    msg_tmp = this.state.notice_msg;


    if (msg_tmp) {  // input이 모두 입력되어 있어야 서버와 연결해 데이터 넣음
      await axios.post('http://146.56.170.191/insert_notice.php', {
        msg: msg_tmp,
        date: date_tmp,
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
    }
    else{
      alert('입력 부족');
    }
    
  }

  // 공지DB에 있는 모든 공지 삭제하기
  deleteData = async () => {
    
    await axios.post('http://146.56.170.191/delete_notice.php', {
      
    }, { 
      headers:  {'Content-Type': 'application/json'} 
    }).then(function (response) {
      alert('삭제 완료');
      console.log(response);
    })
    .catch(function (error) {
      alert('삭제 불가');
      console.log(error.toJSON());
    });
  }

  render(){
    return(
      
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}      // 키보드 올라올떄 뷰들도 같이 올라가는거 방지하기 위한거
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false} flex-1 style={{marginTop:Constants.statusBarHeight}}>
          
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setMsg(text)}
            placeholder="공지사항을 입력하세요"
            keyboardType="default"
            autoFocus={true}
            multiline={true}
          />


          <Button label="제출" margin-10 onPress={this.insertData}></Button>

          <Button label="공지 삭제하기" margin-10 onPress={this.deleteData}></Button>

      </KeyboardAvoidingView>
     
      )
  }
}

// textinput (이름, 전화번호) 스타일 지정
const styles = StyleSheet.create({
  input: {
    height : '30%',
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
