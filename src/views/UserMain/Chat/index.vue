<template>
  <div class="user-page">
    <div class="user-navbar">
      <div class="logo">
        <img src="@/assets/logo.png" alt="">
      </div><!-- logo -->

      <div class="container">
        <ul class="items">
          <li v-for='(item,index) in navbars'
            :key="index"
            :class="{'active':navbarIndex==index}"
            @click="navbarIndex = index;$router.push(item.url)">
            {{item.title}}
          </li>
        </ul><!-- items -->

        <div class="right">
          <div class="face-container">
            <img :src="$user.get('logo')" class="face" alt="">
          </div>
          <span>{{$user.get('name')}}<i class="el-icon-arrow-down"></i></span>
        </div><!-- right -->

      </div><!-- container -->

    </div><!-- user-navbar -->    
    
    <div class="chat">
      <div class="chat-inner">
        <div class="left">
          <div class="header"></div>
          <ul class="members">
            <li v-for="i in members" class="member" @click="selectMember(i.id)" :class='{"active":i.id == current_chat}'>
              <div class="logo-container">
                <img src="@/assets/logo.png" alt="" class="logo">
              </div>
              <div>用户{{i.id}}</div>
            </li>
          </ul>
        </div>

        <div class="room">
          <div class="header">
            {{current_chat}}
          </div>
          <ul class="messages">
            <li v-for="item in history">
              <div v-if="item.from == uid" class="message me">
                <p class="bubble">{{changeTo(item.content)}}</p>
                <div class="face">
                  <img src="@/assets/logo.png" alt="">
                </div>
              </div>
              <div v-if="item.from != uid" class="message other">
                <div class="face">
                  <img src="@/assets/logo.png" alt="">
                </div>
                <p class="bubble">{{item.content}}</p>
              </div>
            </li>
            <div ref="messagesBottom"></div>
          </ul>

          <div class="more">
            
            <el-button size="middle" @click="$refs.file.click()"> <i class="el-icon-picture-outline"></i> <input type="file" style="display: none;" ref="file"/> 
            </el-button>
            <el-popover
              style="margin: 0 10px;"
              placement="top"
              width="400"
              @show="handleShowEmoji($event)"
              trigger="click">
              <ul>
                <li v-for="(i,index) in emoji" :key="index" class="emoji" @click="addEmoji(i)">
                  {{i}}
                </li>
              </ul>
              <el-button size="middle" slot="reference"> 😊 </el-button>
            </el-popover>
          </div>

          <div class="tablet" contenteditable="true" @paste.prevent="putFilterText($event)" v-html="tablet" @input="handleInput($event)" @blur="handleBlur($event)" ref="tablet" @keyup.enter.prevent = "sendTo()">
          </div>

          <!-- <el-input
            type="textarea"
            class='tablet'
            resize="none"
          /> -->
          <div class="send">
            <el-button type="primary" size="middle" @click="sendTo()"> 发 送 </el-button>
          </div>
        </div>
      </div>
    </div>
  </div><!-- user-main -->

</template>

<script>
import { filterCopyText,getCursorPosition,setCursorPosition } from '@/util/cursor.js'
export default {
  name: '',

  data () {
    return {
      navbarIndex:1,
      navbars:[],
      current_cursor:0,
      tablet:'',
      current_chat:'',
      chat:[],
      history:[],
      members:[],
      // resume:false,
      emoji:{
      '[眨眼]':'😉',
      '[微笑]':'😊',
      '[尴尬]':'😂',
      '[笑哭]':'🤣',
      '[哈哈]':'😆',
      '[想]':'🤔',
      '[恶心]':'🤢',
      '[喜欢]':'😍',
      '[不屑]':'😒',
      '[中意]':'😘',
      '[大笑]':'😁',
      '[开心]':'😃',
      '[委屈]':'😢',
      '[调皮]':'😜',
      '[耍帅]':'😎',
      '[ok]':'👌',
      '[爱你]':'💕',
      '[点赞]':'👍',
      // '🤦‍',
      // '🤷‍',
      // '🤷‍',
      '[yes]':'✌',
      '[比心]':'🤞',
      '[音乐]':'🎶',
      '[心]':'💖',
      '[鼓掌]':'👏',
      '[玫瑰]':'🌹',
      '[恭喜]':'🎉',
      '[蛋糕]':'🎂',
      '[自拍]':'🤳',
      },
      messges:[
        {
          from:3,
          to:2,
          content:'123'
        },
      ],
      uid:''
    }
  },
  mounted(){
    // console.log(this.$user.getInfo());
    this.navbars = this.$store.USER_NAVBAR;
    // this.resume = this.$store.USER_INFO;
    this.uid = this.$user.get('user_id');
    if (this.$store.state.WS.alive == 1 && this.members==false) {
        let ws = this.$store.state.WS;
        ws.send(JSON.stringify({type:'init'}))

    }

  },
  methods: {
    changeTo(text){
      // let re = '';
      // for(var i in this.emoji){
      //   let des = i.slice(1,-1)
      //   re = re + '\\[' + des  + '\\]' + '|'
      // }
      // re = '(' + re.slice(0,-1) +')'
      // console.log(re,text)
      // // let tablet = this.tablet
      // text.replace(new RegExp(re,'g'),($0,$1)=>{
      //   return this.emoji[$1];
      // })
      text = text.replace(/\[(.{1,5})\]/,($0,$1)=>{
        // console.log($1)

        // console.log(this.emoji['['+$1+']'])
        return this.emoji['['+$1+']']
      })

      return text

    },
    sendTo(){
      if (!this.tablet) {
        return;
      }
      // console.log(this.current_chat)
      if (!this.current_chat) {
        this.tablet = ''
        return;
      }

      // let re = '';
      // for(var i in this.remoji){
      //   re = re + i  + '|'
      // }
      // re = '(' + re.slice(0,-1) +')'
      
      // console.log(re)

      let tablet = this.tablet
      tablet = tablet.replace(/(\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F])/g,($0,$1) =>{
        console.log(this.remoji[$1])
        return this.remoji[$1];
      })

      // console.log(tablet)



      this.$store.state.WS.send(JSON.stringify({type:'chat',to:this.current_chat,content:tablet}));
      this.tablet = ''

    },
    selectMember(member){
      this.$store.state.WS.send(JSON.stringify({type:'history',with:member}))
      this.history = [];
      this.current_chat = member;
    },
    handleShowEmoji(e){
      setCursorPosition(this.$refs.tablet,this.current_cursor)
    },
    handleBlur(e){
      this.current_cursor = getCursorPosition(e.target)
    },
    handleInput(e){
      this.current_cursor = getCursorPosition(e.target)

      this.tablet = e.target.innerText;
      // console.log(this.tablet.length);
      this.$nextTick(()=>setCursorPosition(e.target,this.current_cursor))
    },
    putFilterText(e){
      let text = filterCopyText(e);
      this.current_cursor = getCursorPosition(e.target)
      let textLen = text.length;
      let tabletLen = this.tablet.length;
      let left = this.tablet.slice(0,this.current_cursor)
      let right = this.tablet.slice(this.current_cursor)
      this.tablet = left+text+right
      this.$nextTick(()=>setCursorPosition(e.target,this.current_cursor+textLen))

    },
    addEmoji(text){
      // text = this.remoji[text]
      let left = this.tablet.slice(0,this.current_cursor)
      let right = this.tablet.slice(this.current_cursor)
      this.tablet = left+text+right
      /*检测前面有无emoji 因为一个标签为2个utf8*/
      if (this.current_cursor != 0) {
        this.current_cursor['']
      }
      this.$nextTick(()=>setCursorPosition(this.$refs.tablet,this.current_cursor+text.length))

    },
    tell(e){
      // console.log(e)
    }
  },

  components: {

  },
  

  computed: {
    remoji(){
      let tmp = {};
      Object.keys(this.emoji).forEach((key)=>{
        tmp[this.emoji[key]] = key
      })
      return tmp;
    }
  },
  watch: {
    '$store.state.WS_MSG':{
      handler(val,old){
        switch(val['type']){
          case 'init':
            this.members = val.data
            // let members_id = []
            // for (var i = 0; i < val.data.length; i++) {
            //   val.data[i].
            // }
            break;
          case 'history':
            this.history = val.data
            this.$nextTick(()=>{
              this.$refs.messagesBottom.scrollIntoView(false);
            })
            break;
          default:
            if (val.status !== 0) {
              // this.chat = val;
              if (val['from'] == this.current_chat || val['to'] == this.current_chat) {
                this.history.push(val);
                this.$nextTick(()=>{
                  this.$refs.messagesBottom.scrollIntoView(false);
                })
              }

            }
            break;
        }
      },
      // immediate:true,
      deep:true,
    },
    '$store.state.WS.alive':{
      handler(val,old){
        // console.log(123)
        if (val == 1 && this.members==false) {
          let ws = this.$store.state.WS;
          ws.send(JSON.stringify({type:'init'}))

        }
      },
      immediate:true,
      deep:true,
    }
  },
};
</script>

<style lang="scss" scoped="scoped">
  @import "@/style/var.scss";

  .user-navbar{
    border-bottom: 1px solid $border1;
  }
  .chat{
    color: $font1;
    overflow: hidden;
    background-color: #f8f8f8;
    flex:1;
    padding: 20px;
    // display: flex;
    // align-items:center;
    // justify-content:center;
    position: relative;
    .chat-inner{
      // height: 100%;
      position: absolute;
      width: 900px;
      height: calc(100% - 50px);
      // height: 550px;
      min-height: 500px;
      left: 0;
      right: 0;
      margin: 0 auto;
      // margin: auto;
      // border: 1px solid $border1;
      display: flex;
      justify-content:space-between;
    }
    .left{
      width: 250px;
      border-radius: 5px 5px 0 0;
      border: 1px solid $border1;
      background-color: #fff;
      .header{
        height: 40px;
        border-bottom: 1px solid $border1;
      }

      .member{
        // background-color: $bgc1;
        border-bottom: 1px solid #eee;
        box-sizing:border-box;
        height: 70px;
        padding: 0 15px;
        display: flex;
        align-items:center;
        &.active{
          cursor: default;
          background-color: rgba(64, 158, 255,.4);

        }
        &:hover{
          cursor: pointer;
          background-color: rgba(64, 158, 255,.2);
        }
        .logo{
          max-height: 45px;
          max-width: 45px;
          // border: 1px solid $border0;
          margin-right: 10px;

        }
      }
    }
    .room{
      width: 620px;
      border-radius: 5px 5px 0 0;
      border: 1px solid $border1;
      display: flex;
      flex-direction:column;
      background-color: #fff;
      .header{
        // height: 80px;
        font-size: 25px;
        padding: 20px;
        border-bottom: 1px solid $border1;

      }
      .messages{
        flex:1;
        padding:  20px;
        overflow: auto;
        background-color: #f5f5f5;
        .face{
          height: 40px;
          width: 40px;
          border:1px solid #ddd;
          border-radius: 20px;
          overflow: hidden;
          img{
            max-height: 40px;
            max-width: 40px;
          }
          
        }
        .message{
          // position: relative;
          // position: relative;
          display: flex;
          margin-bottom: 20px;
          // flex-direction:column;
          &.other{
            // margin-left: 50px;
            justify-content:flex-start;
            .bubble{
              margin-left: 10px;
            }
          }
          &.me{
            justify-content:flex-end;
            .bubble{
              margin-right: 10px;
            }
            // margin-right: 50px;
          }
        }
        .bubble{
          word-break:break-all;
          padding: 10px;
          background-color: rgba(64, 158, 255,.5);
          max-width: 30%;
          border-radius: 10px;
          // position: relative;
          // position: absolute;
        }
        
      }

      .tablet{
        height: 120px;
        border-top: 1px solid $border1;
        outline: none;
        padding: 10px;
        overflow: auto;
      }
      .send{
        // display: flex;
        // justify-content:flex-end;
        border-top: 1px solid $border1;
        height: 50px;
        line-height: 50px;
        
        padding-right: 20px;
        text-align: right;
        background-color: #fafafa;
      }
    }
  }
  .more{
    margin-top: 0;
    padding: 5px 20px;
  }
  .emoji{
    font-size: 22px;
    display: inline-block;
    margin:7px;
    cursor: pointer;
    transition:transform .2s ease-in-out;
    &:hover{
      transform:translateY(-5px) scale(1.5);
    }
  }

</style>