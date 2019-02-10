
import React, { Component } from "react";
import { View,Text,StyleSheet,TouchableOpacity,Alert,Modal,Dimensions,Switch} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button,Item, Input, Label } from "native-base";
class Main extends Component{
    constructor(){
        super();
        this.state={
            grid:[
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            player:1,
            p1Score:0,
            p2Score:0,
            p1name:'Player 1',
            p2name:'Player 2',
            modalVisible:false,
            mode:false,
            ContainerColor:'#fff',
            TextColor:'#6c6b74',
        }
    }
    componentDidMount(){
        this.toggleMode();
        this.startGame(); 
    }
    startGame(){
        this.setState({
            grid:[
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            player:1
        })
    }
    resetScore(){
        this.setState({
            p1Score:0,
            p2Score:0
        })
        this.startGame();
    }
    renderIcon(row,col){   
        var stat=this.state.grid[row][col];
        switch(stat){
            case 1:return(<Icon name='circle-outline' style={styles.Icon}/>);
            case -1:return(<Icon name='close' style={styles.Icon}/>);
            default:return(<Icon/>);
        }
    }

    getWinner(){
        grid=this.state.grid;
        for(i=0;i<3;i++){
            rowSum=grid[0][i]+grid[1][i]+grid[2][i];
            if(rowSum==3){
                return 1;
            }
            if(rowSum==-3){
                return -1;
            }
            colSum=grid[i][0]+grid[i][1]+grid[i][2];
            if(colSum==3){
                return 1;
            }
            if(colSum==-3){
                return -1;
            }
        }
        //cross sum
        crossSum=grid[0][0]+grid[1][1]+grid[2][2];
        if(crossSum==3){
            return 1
        }
        else if(crossSum==-3){
            return -1
        }
        crossSum=grid[0][2]+grid[1][1]+grid[2][0]
        if(crossSum==3){
            return 1
        }
        else if(crossSum==-3){
            return -1
        }
    }
    updateWinner=(p)=>{
        if(p==1){
            this.setState({
                p1Score:this.state.p1Score+1
            })
        }
        if(p==-1){
            this.setState({
                p2Score:this.state.p2Score+1
            })
        }
    }
    handleTouch(row,col){
        mark=this.state.grid.slice('');
        if(mark[row][col] != 0 ) return;
        mark[row][col]=this.state.player;
        this.setState({
            grid:mark
        })
        player=this.state.player == 1 ? -1 : 1
        this.setState({
            player:player
        })
        winner=this.getWinner();
        if(winner==1){
            Alert.alert('Player 1 Win The Game')
            this.startGame();
            this.updateWinner(1)
        }
        if(winner==-1){
            Alert.alert('Player 2 Win The Game')
            this.startGame();
            this.updateWinner(-1)
        }
    }
    toggleModel(){
        this.setState({
            modalVisible:!this.state.modalVisible
        })
    }
    changeName(player,name){
        if(player==1){
            this.setState({
                p1name:name
            })
        }
        if(player==0){
            this.setState({
                p2name:name
            })
        }
    }
    toggleMode(){
        //togglemode
        this.setState({mode:!this.state.mode},()=>{
           // light mode
            if(this.state.mode==true){
                this.setState({
                    TextColor:'#6c6b74',
                    ContainerColor:'#fff'
                })
            }
            //Dark Mode
            else if(this.state.mode==false){
                this.setState({
                    TextColor:'#000',
                    ContainerColor:'#4c4c4c'
                })
            }
        });
        
    }
    render(){
        const {height,width}=Dimensions.get('window');
        return (
            <View style={[styles.container,{backgroundColor:this.state.ContainerColor}]}>
                <View style={styles.settingWrapper}>
                    <View style={{flex:1,alignItems:"flex-end"}}>
                        <Icon style={{fontSize:40}} onPress={()=>this.toggleModel()} name='settings'/>
                    </View>
                </View>
                <View style={[styles.scoreboard, {borderColor:this.state.TextColor} ]}>
                    <Text style={[styles.txt,{color:this.state.TextColor}]}>{this.state.p1name} : {this.state.p1Score} Wins</Text>
                        <View style={{borderRightWidth:0.8,borderColor:this.state.TextColor}}/>
                    <Text style={[styles.txt,{color:this.state.TextColor}]}>{this.state.p2name} : {this.state.p2Score} Wins</Text>
                </View>
                <View style={{flex:70,alignItems:"center",justifyContent:'center'}}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={()=>this.handleTouch(0,0)} style={[styles.box,{borderTopWidth:0,borderLeftWidth:0}]}>
                            {this.renderIcon(0,0)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.handleTouch(0,1)} style={[styles.box,{borderTopWidth:0}]}>
                            {this.renderIcon(0,1)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.handleTouch(0,2)} style={[styles.box,{borderTopWidth:0,borderRightWidth:0}]}>
                            {this.renderIcon(0,2)}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={()=>this.handleTouch(1,0)} style={[styles.box,{borderLeftWidth:0}]}>
                            {this.renderIcon(1,0)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.handleTouch(1,1)} style={[styles.box]}>
                            {this.renderIcon(1,1)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.handleTouch(1,2)} style={[styles.box,{borderRightWidth:0}]}>
                            {this.renderIcon(1,2)}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={()=>this.handleTouch(2,0)} style={[styles.box,{borderBottomWidth:0,borderLeftWidth:0}]}>
                            {this.renderIcon(2,0)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.handleTouch(2,1)} style={[styles.box,{borderBottomWidth:0}]}>
                            {this.renderIcon(2,1)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.handleTouch(2,2)} style={[styles.box,{borderBottomWidth:0,borderRightWidth:0}]}>
                            {this.renderIcon(2,2)}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.btns}>
                    <Button 
                    style={[{backgroundColor:this.state.TextColor},styles.btnX]}  olor={this.state.TextColor} onPress={()=>this.startGame()}>
                        <Text style={{color:this.state.ContainerColor,fontSize:16}}>New Game</Text>
                    </Button>
                    <Button 
                    style={[{backgroundColor:this.state.TextColor},styles.btnX]} onPress={()=>this.resetScore()}>
                        <Text style={{color:this.state.ContainerColor,fontSize:16}}>Reset Score</Text>
                    </Button>
                </View>
<Modal
    animationType="slide"
    transparent={true}
    onRequestClose={()=>{this.toggleMode()}}
    visible={this.state.modalVisible}>
    <TouchableOpacity style={styles.ModelContainer} onPress={()=>this.toggleModel()}>
        <TouchableOpacity 
            activeOpacity={100} 
            style={[styles.model,{height:(height/2)-20,width:((width/10)* (8)),backgroundColor:this.state.ContainerColor}]}>
            <View style={{flex:1}}>
                <View>
                    <Text style={{fontSize:30,textAlign:'center'}}>
                        Tic Tac Toe
                    </Text>
                </View>
                <View style={{borderBottomWidth:0.8,marginVertical:10,marginBottom:10}}/>
                <View style={{flex:3,justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={[{color:this.state.TextColor,fontSize:20}]}>Toggle To Dark Mode</Text>
                        <Switch value={!this.state.mode} onValueChange={()=>this.toggleMode()}/>
                    </View>
                    <Item fixedLabel>
                        <Label style={{color:this.state.TextColor}}>Player 1 :</Label>
                        <Input maxLength={13} 
                                style={{color:this.state.TextColor}}
                                placeholderTextColor={this.state.TextColor}
                                placeholder={this.state.p1name} 
                                onChangeText={(text)=>this.changeName(1,text)}/>
                    </Item>
                    <Item fixedLabel>
                        <Label style={{color:this.state.TextColor}}>Player 2 :</Label>
                        <Input maxLength={13} 
                                style={{color:this.state.TextColor}}
                                placeholderTextColor={this.state.TextColor}
                                placeholder={this.state.p2name}
                                onChangeText={(text)=>this.changeName(0,text)}/>
                    </Item>
                </View>
                <View style={{borderBottomWidth:0.8,marginVertical:10}}/>
                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <Text style={{textAlign:'center',fontSize:26}}>
                        About Creator
                    </Text>
                    <Text style={{textAlign:'center',fontSize:16}}>
                        Production Of Keval Dholakiya
                    </Text>
                </View>
            </View>

        </TouchableOpacity>
    </TouchableOpacity>
</Modal>
            </View>
        );
    }
}
export default Main;

const styles = StyleSheet.create({
    container:{
        flex:100,
    },
    row:{
        flexDirection:'row',
    },
    box:{
        borderWidth:3,
        height:100,
        width:100,
        justifyContent:'center',
        alignItems:'center'
    },
    Icon:{fontSize:45},
    btns:{
        flex:10,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    btn:{
       marginHorizontal:30,
       flex:1,
    },
    btnX:{
        flex:1,
        marginHorizontal:10,
        justifyContent:'center'
    },
    scoreboard:{
        marginHorizontal:30,
        flex:10,
        borderColor:'#000',
        borderWidth:0.8,
        flexDirection:'row',
        justifyContent:'center',
    },
    txt:{
        fontSize:20,
        fontWeight:'bold',
        textAlignVertical:'center',
        textAlign:'center',
        flex:1
    },
    settingWrapper:{
        flex:10,
    },
    model:{
        elevation: 8,
        padding:10,
        borderRadius:10,
    },
    ModelContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        
        backgroundColor:'rgba(192,192,192,0.7)',
    }
});