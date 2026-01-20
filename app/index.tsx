import { useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(result.toString());
      setPreviousValue(result);
    }
    
    setOperation(op);
    setShouldResetDisplay(true);
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setShouldResetDisplay(true);
    }
  };
  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    if (display !== '0') {
      setDisplay('0');
    } else {
      setDisplay('0');
      setPreviousValue(null);
      setOperation(null);
      setShouldResetDisplay(false);
    }
  };

  const handleToggleSign = () => {
    setDisplay((parseFloat(display) * -1).toString());
  };

  const handlePercent = () => {
    setDisplay((parseFloat(display) / 100).toString());
  };



  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      default:
        return current;
    }
  };

  const clearButtonText = display === '0' && previousValue === null ? 'AC' : 'C';

  return (
    <SafeAreaView style={styles.constainer}>
      <StatusBar barStyle="light-content"/>

      <View style={styles.inputDisplayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {/*first button section*/}
        <View style={styles.sectionButton}>
          <TouchableOpacity 
            style={[styles.button, styles.functionButton]}
            onPress={handleClear}
          >
            <Text style={styles.functionButtonText}>{clearButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.functionButton]}
            onPress={handleToggleSign}
          >
            <Text style={styles.functionButtonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.functionButton]}
            onPress={handlePercent}
          >
            <Text style={styles.functionButtonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton, operation === '÷' && styles.operatorActive]}
            onPress={() => handleOperation('÷')}
          >
            <Text style={[styles.text, operation === '÷' && styles.operatorActiveText]}>÷</Text>
          </TouchableOpacity>
        </View>

        {/*second button section*/}
        <View style={styles.sectionButton}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleNumber('7')}
          >
            <Text style={styles.text}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleNumber('8')}
          >
            <Text style={styles.text}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleNumber('9')}
          >
            <Text style={styles.text}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton, operation === '×' && styles.operatorActive]}
            onPress={() => handleOperation('×')}
          >
            <Text style={[styles.text, operation === '×' && styles.operatorActiveText]}>×</Text>
          </TouchableOpacity>
        </View>

        {/*third button section*/}
        <View style={styles.sectionButton}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleNumber('4')}
          >
            <Text style={styles.text}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleNumber('5')}
          >
            <Text style={styles.text}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleNumber('6')}
          >
            <Text style={styles.text}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton, operation === '-' && styles.operatorActive]}
            onPress={() => handleOperation('-')}
          >
            <Text style={[styles.text, operation === '-' && styles.operatorActiveText]}>-</Text>
          </TouchableOpacity>
        </View>

        {/*fourth button section*/}
        <View style={styles.sectionButton}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleNumber('1')}
          >
            <Text style={styles.text}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleNumber('2')}
          >
            <Text style={styles.text}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleNumber('3')}
          >
            <Text style={styles.text}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton, operation === '+' && styles.operatorActive]}
            onPress={() => handleOperation('+')}
          >
            <Text style={[styles.text, operation === '+' && styles.operatorActiveText]}>+</Text>
          </TouchableOpacity>
        </View>

        {/*fifth button section*/}
        <View style={styles.sectionButton}>
          <TouchableOpacity 
            style={styles.buttonZero}
            onPress={() => handleNumber('0')}
          >
            <Text style={styles.text}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleDecimal}
          >
            <Text style={styles.text}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton]}
            onPress={handleEquals}
          >
            <Text style={styles.text}>=</Text>
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  inputDisplayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  displayText: {
    fontSize: 70,
    fontWeight: '200',
    color: '#fff',
  },
  buttonContainer: {
    flex: 2,
    paddingBottom: 200
  },
  sectionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center'
  },
  button:{
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: 80,
    borderRadius: 80/2,
    backgroundColor: '#505050',
  },
  buttonZero: {
      width: 170,
      height: 80,
      borderRadius: 80 / 2,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 32,
      marginLeft: 8,
      backgroundColor: '#505050',
    },
  operatorButton: {
    backgroundColor: '#ff9500',
  },
  operatorActive: {
    backgroundColor: '#fff',
  },
  operatorActiveText: {
    color: '#ff9500',
  },
  functionButton: {
    backgroundColor: '#ccccccff',
  },
  functionButtonText: {
    fontSize: 29,
    color: '#000',
  },
  text: {
    fontSize: 35,
    color: "#fff"
  }    
});