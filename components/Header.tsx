import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  avatar?: string;
};

const Header = ({ name, avatar }: Props) => {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <Image
          source={avatar ? { uri: avatar } : require("../assets/images/icon.png")}
          style={styles.avatar}
        />
        <View style={styles.textWrap}>
          <Text style={styles.hello}>Olá,</Text>
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
        </View>
      </View>
      <View style={styles.icons}>
        <View style={styles.iconPlaceholder} />
        <View style={styles.iconPlaceholder} />
      </View>
    </View>
  );
};

const colors = {
  primary: "#87084E",
  dusty: "#D4C4CA",
  dark: "#3A1224",
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  row: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12, backgroundColor: "#fff" },
  textWrap: { flex: 1 },
  hello: { color: "rgba(255,255,255,0.95)", fontSize: 12 },
  name: { color: "#fff", fontSize: 18, fontWeight: "700" },
  icons: { position: "absolute", right: 16, top: 22, flexDirection: "row" },
  iconPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginLeft: 8,
  },
});

export default Header;
