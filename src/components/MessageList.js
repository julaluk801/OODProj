// MessageList.js
import { useAuth } from "../contexts/AuthContext"
import React, {Component} from 'react';
import Message from './Message';
import _ from 'lodash';
import Login from './Login';

class MessageList extends Component {

    constructor(props){
        super(props);
        this.state = {
          emaillogin: localStorage.getItem('emaillogin'),
          messages: []
        };
      }
      componentDidMount(){
        let app = this.props.db.database().ref('messages');
        app.orderByChild('rid').equalTo(this.props.rid).on("value", snapshot=> {
          console.log('Hello world',snapshot.val());
          this.getData(snapshot.val());
        });
      }
       getData(values){
        let messagesVal = values;
        let messages = _(messagesVal).keys().map(messageKey => {
                              let cloned = _.clone(messagesVal[messageKey]);
                              cloned.key = messageKey;
                              return cloned;
                          }).value();
        this.setState({
          messages: messages
        });
      }

      render() {
        let messageNodes = this.state.messages?.map((message) => {
          return (
            <div className="card" style={{width : '745px'}} >
              <div className="card-content">
                {message?.email}
                <br/>
                <Message msgKey={message.key} msg = {message.message} db={this.props.db} />
              </div>
            </div>
          )
        });
        
        return (
          <div>
            {messageNodes}
          </div>
        );
      }
}

export default MessageList