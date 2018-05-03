import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import { Card, CardSection } from './common';
import Dashboard from './Dashboard';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playerData: []
    }
  }

  componentWillMount() {

    axios.get('http://206.189.20.69')
      .then((response) => {

        this.setState(() => ({
          playerData: response.data.players
        }));
      });
  }

  renderCard(item) {
    return (
        <View style={styles.cardContainerStyle}>
          <Card key={item.id}>
            <CardSection>
              <Text style={styles.nameStyle}>{item.name}</Text>
            </CardSection>
            <CardSection>
              <Image
                style={{flex:1,height:300,width:null}}
                source={{uri: item.thumbnail_image}}
              />
            </CardSection>
            <CardSection>
              <Text style={styles.messageStyle}>{item.message}</Text>
            </CardSection>
          </Card>
        </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Dashboard 
        
          data={this.state.playerData}
          renderCard={this.renderCard}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainerStyle: {
    marginTop: 40
  },
  nameStyle: {
    fontSize: 24,
    padding: 20
  },
  messageStyle: {
    fontSize: 18,
    padding: 10
  }
});