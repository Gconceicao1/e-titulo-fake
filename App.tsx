import { StatusBar } from "expo-status-bar";
import Ionicons from '@expo/vector-icons/Ionicons';   
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";
import brasaoBr from "./assets/brasaoBr.png";
import qrcode from "./assets/qrcode.png";

interface person {
  id?: String;
  avatarUrl?: String;
  name?: String;
  birthDay?: String;
  city?: String;
  state?: String;
  session?: number;
  zone?: number;
}
export default function App() {
  const [personList, setPerson] = useState<person | null>(null);

  useEffect(() => {
    getPerson();
  }, []);

  const getPerson = async () => {
    const parms = {
      method: "GET",
    };

    const response = await fetch(
      "https://random-data-api.com/api/v2/users?size=1&is_xml=true",
      parms
    );

    const contextData = await response.json();

    setPerson({
      name: contextData["first_name"] + " " + contextData["last_name"],
      city: contextData["address"]["city"],
      state: contextData["address"]["state"],
      avatarUrl: contextData["avatar"],
      birthDay: contextData["date_of_birth"],
      session: generetedRadomNumber(0, 999),
      zone: generetedRadomNumber(0, 999),
      id: generetedRadomNumber(0, 9999999999999999).toString(),
    } as person);
  };

  function generetedRadomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={[styles.headerItemSpace, styles.headerItem1]}>
            <Image source={brasaoBr} style={styles.brasaoBr} />
            <Text style={styles.labelHeader}>
              REPÚBLICA FEDERATIVA DO BRASIL
            </Text>
          </View>
          <View style={[styles.headerItemSpace, styles.headerItem2]}>
            <Text style={styles.item2_label1}>JUSTIÇA ELEITORAL</Text>
          </View>
          <View style={[styles.headerItemSpace]}>
            <Text style={styles.item2_label2}>e-Título Fake</Text>
          </View>
        </View>
        <StatusBar style="auto" />
        <View style={styles.subHeader}></View>
        <View style={{ flex: 2 }}>
          <View style={{ alignItems: "center" }}>
            <View style={[styles.avatarView]}>
              <Image
                source={{ uri: personList?.avatarUrl  }}
                style={styles.avatar}
              />
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={styles.personName}>{personList?.name}</Text>
              <Text style={styles.personId}>Nº {personList?.id}</Text>
              <Text style={styles.info}>
                eleitor/eleitora com biometria coletada
              </Text>
            </View>
          </View>
          <View style={styles.labelSpace}>
            <Text style={styles.labelBody}>Data de Nascimento</Text>
            <Text style={styles.inputBody}>{personList?.birthDay}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <View style={styles.labelSpace}>
                <Text style={styles.labelBody}>Zona</Text>
                <Text style={styles.inputBody}>{personList?.zone}</Text>
              </View>
            </View>
            <View style={styles.labelSpace}>
              <Text style={styles.labelBody}>Sessão</Text>
              <Text style={styles.inputBody}>{personList?.session}</Text>
            </View>
          </View>
          <View style={styles.labelSpace}>
            <Text style={styles.labelBody}>Município/UF</Text>
            <Text style={styles.inputBody}>
              {personList?.city}/{personList?.state}{" "}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image source={qrcode} style={styles.qrcode} />
          </View>
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.touchableOpacityStyle}
        onPress={getPerson}
        >
         <Ionicons name="md-reload" size={52} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#15335e",
    padding: 25,
    paddingTop: 40,
    width: "100%",
    justifyContent: "center",
  },
  headerItemSpace: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headerItem1: {
    paddingBottom: 10,
  },
  headerItem2: {
    paddingBottom: 10,
  },
  labelHeader: {
    color: "#f7f4cb",
    fontWeight: "bold",
    width: 120,
    padding: 10,
  },
  subHeader: {
    width: "100%",
    height: 5,
    backgroundColor: "powderblue",
  },
  brasaoBr: {
    width: 100,
    height: 100,
  },
  avatar: {
    width: 174,
    height: 184,
  },
  avatarView: {
    width: 175,
    height: 185,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#000",
    top: -20,
    backgroundColor: "#fff",
  },
  item2_label1: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  item2_label2: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  personName: {
    fontSize: 25,
    fontWeight: "bold",
    width: 300,
    textAlign: "center",
    textTransform: "uppercase",
  },
  personId: {
    fontSize: 20,
    fontWeight: "bold",
    width: 300,
    color: "#1d1a87",
    textAlign: "center",
    textTransform: "uppercase",
  },
  info: {
    paddingTop: 20,
    width: "100%",
    fontSize: 15,
    textTransform: "uppercase",
  },

  labelSpace: {
    paddingTop: 20,
    marginLeft: 20,
  },
  labelBody: {
    color: "#1d1a87",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "left",
  },
  inputBody: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
  },
  scrollView: {
    marginHorizontal: 0,
    width: "100%",
  },
  qrcode: {
    width: 200,
    height: 200,
    marginTop: 50,
    marginBottom: 50,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    left: 120,
    bottom: 30,
    backgroundColor:'#15335e',
    borderRadius:100,
    borderWidth:1,
    borderColor:'#3f5f8c'
  },
});
