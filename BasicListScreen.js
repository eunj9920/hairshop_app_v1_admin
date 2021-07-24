import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList, RefreshControl} from 'react-native';
import axios from "axios"
import {AnimatableManager, Colors, BorderRadiuses, ListItem, Text, View, Assets, Image, Button } from 'react-native-ui-lib'; //eslint-disable-line
import Loading from './Loading'


Assets.loadAssetsGroup('icons', {
  icon_flowline: require('./assets/noun_flowline.png'),
});

const time_data = [
  {
    time1: '10:00',
    time2: '10:15'
  },
  {
    time1: '10:15',
    time2: '10:30'
  },
  {
    time1: '10:30',
    time2: '10:45'
  },
  {
    time1: '10:45',
    time2: '11:00'
  },
  {
    time1: '11:00',
    time2: '11:15'
  },
  {
    time1: '11:15',
    time2: '11:30'
  },
  {
    time1: '11:30',
    time2: '11:45'
  },
  {
    time1: '11:45',
    time2: '12:00'
  },
  {
    time1: '12:00',
    time2: '12:15'
  },
  {
    time1: '12:15',
    time2: '12:30'
  },
  {
    time1: '12:30',
    time2: '12:45'
  },
  {
    time1: '12:45',
    time2: '13:00'
  },
  {
    time1: '13:00',
    time2: '13:15'
  },
  {
    time1: '13:15',
    time2: '13:30'
  },
  {
    time1: '13:30',
    time2: '13:45'
  },
  {
    time1: '13:45',
    time2: '14:00'
  },
  {
    time1: '14:00',
    time2: '14:15'
  },
  {
    time1: '14:15',
    time2: '14:30'
  },
  {
    time1: '14:30',
    time2: '14:45'
  },
  {
    time1: '14:45',
    time2: '15:00'
  },
  {
    time1: '15:00',
    time2: '15:15'
  },
  {
    time1: '15:15',
    time2: '15:30'
  },
  {
    time1: '15:30',
    time2: '15:45'
  },
  {
    time1: '15:45',
    time2: '16:00'
  },
  {
    time1: '16:00',
    time2: '16:15'
  },
  {
    time1: '16:15',
    time2: '16:30'
  },
  {
    time1: '16:30',
    time2: '16:45'
  },
  {
    time1: '16:45',
    time2: '17:00'
  },
  {
    time1: '17:00',
    time2: '17:15'
  },
  {
    time1: '17:15',
    time2: '17:30'
  },
  {
    time1: '17:30',
    time2: '17:45'
  },
  {
    time1: '17:45',
    time2: '18:00'
  },
  {
    time1: '18:00',
    time2: '18:15'
  },
  {
    time1: '18:15',
    time2: '18:30'
  },
  {
    time1: '18:30',
    time2: '18:45'
  },
  {
    time1: '18:45',
    time2: '19:00'
  },
  {
    time1: '19:00',
    time2: '19:15'
  },
  {
    time1: '19:15',
    time2: '19:30'
  },
  {
    time1: '19:30',
    time2: '19:45'
  },
  {
    time1: '19:45',
    time2: '20:00'
  }
]

class MyListItem extends React.PureComponent{

  render() {
    
    // 전화번호에 - (하이픈) 추가하는 거
    var p_num = this.props.phone_num;
    {this.props.phone_num ? p_num = `${p_num.substring(0,3)}-${p_num.substring(3,7)}-${p_num.substring(7,11)}`: p_num = "" }
    
    return (      // ListData 이용해 List만들기
      <View>
        <ListItem containerStyle={[styles.border]} height={72}
        >
          <ListItem.Part left row marginL-10 >
            <Image assetName="icon_flowline" tintColor='#5847FF' style={{width:30 , height:60}} ></Image>  
            <ListItem.Part column flex-2>
              <View flex-2></View>
              <Text flex-4 dark30 text90 >{this.props.time1}</Text>
              <View flex-3></View>
              <Text flex-4 dark30 text90 >{this.props.time2}</Text>
              <View flex-2></View>
            </ListItem.Part>
          </ListItem.Part>

          
          <ListItem.Part middle column marginL-20 >
            { !this.props.name  ? <View flex-5></View> : <View flex-1></View> }

            { !this.props.name  ? <Text flex-10 dark10 text70 numberOfLines={1}>{'예약자 없음'}</Text> : 
              <Text flex-4 dark10 text70 numberOfLines={1}>{this.props.name}</Text> }
            { !this.props.name  ? <View></View> : <View flex-2></View> }

            { !this.props.phone_num  ? <View></View> : 
            <Text flex-4 dark90 text90 >{p_num}</Text> }

            <View flex-1></View>
          </ListItem.Part>

          <ListItem.Part right column center marginR-20>             
            {this.props.res_ok == 0 ? <Button label="예약가능" size={Button.sizes.small} outline></Button> : <Button label="예약완료" size={Button.sizes.small}></Button>}
          </ListItem.Part>

        </ListItem>
      </View>
    );
  }
}

export default class BasicListScreen extends Component {

  today = this.props.today; // 오늘날짜 받아온거- ex) 2021-7-21

  constructor(props) {
    super(props);

    this.state = {
      onEdit: false,
      updating: false,
      isLoading: true,
      listData: [],
      isRefreshing: false,
      id: 0,
    };
  }

  // 새로고침 함수 (변수 초기화 후 getData 함수 호출)
  handleRefresh = () => {
    console.log("리프레시");
    this.setState({
      isRefreshing: true,
      id: 0,
      listData: []
    },
    () => {
      this.getData();
      this.setState({
        isRefreshing: false
      })
    });
  }
  

  // 예약DB에서 날짜에 따라 정보 가져오기
  getData = async () => {
    try{
      const { data : { data } } = await axios.get('http://146.56.170.191/select_with_date2.php', {
        // date와 time_id로 찾기
        params:{
          date: this.today,
        }  
      });

      const {listData} = this.state;

      // 임시 배열 만든다음, 임시배열에 가져온 데이터 다 집어놓고, 그런다음 setState 마지막에 한번만
      listTmp = [];
      for (let i = 0; i < 40; i++) {
        //console.log(`${data[i].id} + ${data[i].time_range_id}`);

        listTmp = listTmp.concat({
            id: data[i].id,
            name: data[i].name,
            phone_num: data[i].phone_num,
            date : data[i].res_date,
            res_ok : data[i].res_ok,
            time_range_id : data[i].time_range_id,
            time1 : time_data[i].time1,
            time2 : time_data[i].time2
        })

      }
      
      // setState를 for문으로 연속으로 하면 안됨. 왜냐, setState는 비동기함수기때문에 for문으로 해도 마지막 반복실행되는 setState한번만 호출함
      // 그래서 임시 배열만들어서 다 넣은다음 setState한번만 하게끔
      this.setState({                           // 받아온 데이터를 listData 배열에 추가하기
          listData : listData.concat(listTmp)
      })

      this.setState({
        isLoading: false
      })


    } catch (error){
      console.error(error);
    }
  
  }
  
  componentDidMount() {
    console.log(this.today);
    this.getData();
  }

  keyExtractor = item => item.time_range_id;

  render() {
    const {isLoading,listData,isRefreshing} = this.state;
  
    // 리스트에 데이터 불러오고있는 중이면 Loading 화면 다 불러오면 리스트 출력
    return (
        isLoading == true ? <Loading></Loading> :   
          <FlatList
          data={listData}
          //data={orders}
          //renderItem={ ({item,index}) => this.renderRow(item, index) }
          renderItem={ ({item}) => (
            <MyListItem id={item.id} name={item.name} phone_num={item.phone_num} time_range_id={item.time_range_id} time1={item.time1} time2={item.time2} res_ok={item.res_ok}></MyListItem>
          ) }
          keyExtractor={this.keyExtractor}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={this.handleRefresh} />}
          />
      
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark70
  }
});