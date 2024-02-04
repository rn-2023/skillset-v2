import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Container, Row, Col } from 'react-native-flex-grid';

const SKILLS = ['Frontend', 'Backend', 'Mobile', 'Databases'];
const MIN = 0;
const MAX = 5;

export default function App() {

  const [values, setValues] = useState(new Array(SKILLS.length).fill(0));
  const [average, setAverage] = useState(0);

  useEffect(() => {
    calculateAverageSkill();  
  }, [values]);

  const SliderContainer = ({index}) => {
    return(
      <Container fluid>
        <Row>
          <Col><Text style={styles.min}>{MIN}</Text></Col>
          <Col xs="9">
            <Slider
              minimumValue={MIN}
              maximumValue={MAX}
              step={1}
              value={values[index]}
              minimumTrackTintColor="#006666"
              maximumTrackTintColor="#ff9900"
              onValueChange={(val) => setSkillValue(val, index)}/>
          </Col>
          <Col><Text>{MAX}</Text></Col>
        </Row>
      </Container>
    )
  }

  const items = [];
  for (let i = 0; i < SKILLS.length; i++) {
    items.push(
      <View key={"item" + i} style={styles.skills}>
        <Text style={styles.skill}>{SKILLS[i]}</Text>
        <Text style={styles.value}>Skill: {values[i]}</Text>
        <SliderContainer index={i} />
      </View>
    );
  }

  const setSkillValue = (val, i) => {
    let skillValues = [...values];
    skillValues[i] = val;
    setValues(skillValues);
  }

  const calculateAverageSkill = () => {
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = (sum / values.length) || 0;
    setAverage(avg);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Skill set</Text>
        <View>{items}</View>
        <Text style={styles.averageHeader}>Average</Text>
        <Text style={styles.averageValue}>{average}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 40
  },
  header: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold'
  },
  skills: {
    alignItems: 'center',
  },
  skill: {
    marginTop: 30,
    fontSize: 25
  },
  min: {
    marginLeft: 10
  },
  value: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20
  },
  averageHeader: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
  },
  averageValue: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 40,
  }
});