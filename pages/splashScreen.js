import {Image,StyleSheet, View} from "react-native"
import logo from "../assets/logoGovi.png"


export default function SplashScreen() {
  return(
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.image}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image:{
    width: 200,
    height: 200,
    resizeMode: "cover",
  }
})